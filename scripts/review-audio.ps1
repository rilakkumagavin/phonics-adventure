[CmdletBinding()]
param(
    [switch]$DryRun,
    [string]$ResultsPath = "docs/acceptance/audio-listening-session.json"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$manifestDirectory = Join-Path $projectRoot "docs/assets"
$resolvedResultsPath = Join-Path $projectRoot $ResultsPath

function Get-AudioType {
    param([object]$Asset)

    if ($Asset.relativePath -like "*/letter-sound.wav") {
        return "字母音"
    }

    if ($Asset.id -like "*-sentence-*") {
        return "句子"
    }

    return "單字"
}

$assets = @(
    Get-ChildItem -LiteralPath $manifestDirectory -Filter "*-audio-manifest.json" |
        Sort-Object Name |
        ForEach-Object {
            $manifest = Get-Content -LiteralPath $_.FullName -Raw -Encoding utf8 |
                ConvertFrom-Json
            $letter = $manifest.courseId.Substring($manifest.courseId.Length - 1).ToUpperInvariant()

            foreach ($asset in $manifest.assets) {
                $audioPath = Join-Path $projectRoot (
                    Join-Path "public" ($asset.relativePath -replace "/", "\")
                )

                [pscustomobject]@{
                    id = $asset.id
                    letter = $letter
                    type = Get-AudioType -Asset $asset
                    transcript = $asset.transcript
                    relativePath = $asset.relativePath
                    audioPath = $audioPath
                }
            }
        }
)

if ($assets.Count -ne 42) {
    throw "預期載入 42 個音訊，實際載入 $($assets.Count) 個。"
}

$missingAssets = @($assets | Where-Object { -not (Test-Path -LiteralPath $_.audioPath) })
if ($missingAssets.Count -gt 0) {
    $missingPaths = $missingAssets.audioPath -join [Environment]::NewLine
    throw "下列音訊不存在：$([Environment]::NewLine)$missingPaths"
}

if ($DryRun) {
    $grouped = $assets | Group-Object letter
    Write-Host "音訊驗收工具檢查通過："
    Write-Host "- manifest：$($grouped.Count) 課"
    Write-Host "- 音訊：$($assets.Count) 個"

    foreach ($group in $grouped) {
        Write-Host "- $($group.Name)：$($group.Count) 個"
    }

    exit 0
}

Add-Type -AssemblyName System

$savedResults = @{}
if (Test-Path -LiteralPath $resolvedResultsPath) {
    $existingRecords = @(
        Get-Content -LiteralPath $resolvedResultsPath -Raw -Encoding utf8 |
            ConvertFrom-Json
    )

    foreach ($record in $existingRecords) {
        $savedResults[$record.id] = $record
    }
}

function Save-Results {
    $records = foreach ($asset in $assets) {
        if ($savedResults.ContainsKey($asset.id)) {
            $savedResults[$asset.id]
        }
    }

    $resultDirectory = Split-Path -Parent $resolvedResultsPath
    if (-not (Test-Path -LiteralPath $resultDirectory)) {
        New-Item -ItemType Directory -Path $resultDirectory | Out-Null
    }

    ConvertTo-Json -InputObject @($records) -Depth 5 |
        Set-Content -LiteralPath $resolvedResultsPath -Encoding utf8
}

Write-Host ""
Write-Host "A～F 音訊人工聆聽"
Write-Host "Enter：通過　R：需重錄　?：需確認　P：重播　Q：儲存並離開"
Write-Host ""

for ($index = 0; $index -lt $assets.Count; $index++) {
    $asset = $assets[$index]

    if ($savedResults.ContainsKey($asset.id)) {
        continue
    }

    while ($true) {
        Write-Host "[$($index + 1)/$($assets.Count)] $($asset.letter) $($asset.type)：$($asset.transcript)"

        try {
            $player = New-Object System.Media.SoundPlayer $asset.audioPath
            $player.PlaySync()
        }
        catch {
            Write-Warning "播放失敗：$($_.Exception.Message)"
        }

        $choice = Read-Host "結果"
        $normalizedChoice = $choice.Trim().ToLowerInvariant()

        if ($normalizedChoice -eq "p") {
            continue
        }

        if ($normalizedChoice -eq "q") {
            Save-Results
            Write-Host "已儲存至 $resolvedResultsPath"
            exit 0
        }

        $result = switch ($normalizedChoice) {
            "" { "通過" }
            "r" { "需重錄" }
            "?" { "需確認" }
            default { $null }
        }

        if (-not $result) {
            Write-Host "請按 Enter，或輸入 R、?、P、Q。"
            continue
        }

        $note = ""
        if ($result -ne "通過") {
            $note = Read-Host "請記錄問題"
        }

        $savedResults[$asset.id] = [pscustomobject]@{
            id = $asset.id
            letter = $asset.letter
            type = $asset.type
            transcript = $asset.transcript
            relativePath = $asset.relativePath
            result = $result
            note = $note
            reviewedAt = (Get-Date).ToString("o")
        }

        Save-Results
        Write-Host "已記錄：$result"
        Write-Host ""
        break
    }
}

$completedRecords = @($savedResults.Values)
$passedCount = @($completedRecords | Where-Object { $_.result -eq "通過" }).Count
$rerecordCount = @($completedRecords | Where-Object { $_.result -eq "需重錄" }).Count
$confirmCount = @($completedRecords | Where-Object { $_.result -eq "需確認" }).Count

Save-Results
Write-Host "全部音訊已完成。"
Write-Host "通過：$passedCount；需重錄：$rerecordCount；需確認：$confirmCount"
Write-Host "結果：$resolvedResultsPath"
