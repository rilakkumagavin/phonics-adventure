[CmdletBinding()]
param(
    [switch]$DryRun,
    [switch]$Json,
    [string]$ResultsPath = "docs/acceptance/audio-listening-session.json",
    [string]$ReviewStatus = "human-listening-passed"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$manifestDirectory = Join-Path $projectRoot "docs/assets"
$resolvedResultsPath = Join-Path $projectRoot $ResultsPath
$blockers = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]
$expectedAudioIds = New-Object System.Collections.Generic.HashSet[string]
$reviewedAudioIds = New-Object System.Collections.Generic.HashSet[string]
$duplicateAudioIds = New-Object System.Collections.Generic.List[string]
$unknownAudioIds = New-Object System.Collections.Generic.List[string]
$notPassedAudioIds = New-Object System.Collections.Generic.List[string]
$manifestRecords = @()
$resultCount = 0
$passedCount = 0

function Add-Blocker {
    param([string]$Message)
    $blockers.Add($Message) | Out-Null
}

function Add-Warning {
    param([string]$Message)
    $warnings.Add($Message) | Out-Null
}

function Read-JsonFile {
    param([string]$Path)
    return Get-Content -LiteralPath $Path -Raw -Encoding utf8 | ConvertFrom-Json
}

$manifestFiles = @(Get-ChildItem -LiteralPath $manifestDirectory -Filter "*-audio-manifest.json" | Sort-Object Name)
if ($manifestFiles.Count -ne 6) {
    Add-Blocker "音訊 manifest 數量應為 6，目前 $($manifestFiles.Count) 個。"
}

foreach ($manifestFile in $manifestFiles) {
    $manifest = Read-JsonFile -Path $manifestFile.FullName

    foreach ($asset in $manifest.assets) {
        $expectedAudioIds.Add([string]$asset.id) | Out-Null
    }

    $manifestRecords += [pscustomobject]@{
        path = $manifestFile.FullName
        name = $manifestFile.Name
        manifest = $manifest
    }
}

if ($expectedAudioIds.Count -ne 42) {
    Add-Blocker "音訊 manifest 應列出 42 個唯一音訊 ID，目前 $($expectedAudioIds.Count) 個。"
}

if (-not (Test-Path -LiteralPath $resolvedResultsPath)) {
    Add-Blocker "缺少音訊人工聆聽結果：$ResultsPath"
}
else {
    $results = @(Read-JsonFile -Path $resolvedResultsPath)
    $resultCount = $results.Count

    foreach ($record in $results) {
        if (-not $record.id) {
            Add-Blocker "音訊人工聆聽結果包含缺少 id 的紀錄。"
            continue
        }

        $recordId = [string]$record.id
        if (-not $reviewedAudioIds.Add($recordId)) {
            $duplicateAudioIds.Add($recordId) | Out-Null
        }

        if (-not $expectedAudioIds.Contains($recordId)) {
            $unknownAudioIds.Add($recordId) | Out-Null
        }

        if ($record.result -eq "通過") {
            $passedCount += 1
        }
        else {
            $notPassedAudioIds.Add($recordId) | Out-Null
        }
    }

    $missingAudioIds = @(
        foreach ($expectedAudioId in $expectedAudioIds) {
            if (-not $reviewedAudioIds.Contains($expectedAudioId)) {
                $expectedAudioId
            }
        }
    )

    if ($results.Count -ne 42) {
        Add-Blocker "音訊人工聆聽結果未滿 42 個，目前 $($results.Count) 個。"
    }

    if ($reviewedAudioIds.Count -ne 42) {
        Add-Blocker "音訊人工聆聽結果應包含 42 個唯一 ID，目前 $($reviewedAudioIds.Count) 個。"
    }

    if ($missingAudioIds.Count -gt 0) {
        Add-Blocker "音訊人工聆聽結果缺少 manifest 音訊 ID：$($missingAudioIds -join ', ')。"
    }

    if ($duplicateAudioIds.Count -gt 0) {
        Add-Blocker "音訊人工聆聽結果包含重複 ID：$($duplicateAudioIds -join ', ')。"
    }

    if ($unknownAudioIds.Count -gt 0) {
        Add-Blocker "音訊人工聆聽結果包含未知 ID：$($unknownAudioIds -join ', ')。"
    }

    if ($notPassedAudioIds.Count -gt 0) {
        Add-Blocker "仍有非通過音訊，相關 ID：$($notPassedAudioIds -join ', ')。"
    }

    if ($passedCount -ne 42) {
        Add-Blocker "音訊尚未全部通過，目前通過 $passedCount / 42。"
    }
}

$readyToSync = $blockers.Count -eq 0
$updatedManifests = @()

if ($readyToSync -and (-not $DryRun)) {
    foreach ($record in $manifestRecords) {
        $record.manifest.reviewStatus = $ReviewStatus
        $record.manifest.reviewedAt = (Get-Date).ToString("o")
        $record.manifest.reviewEvidence = $ResultsPath

        $record.manifest |
            ConvertTo-Json -Depth 10 |
            Set-Content -LiteralPath $record.path -Encoding utf8

        $updatedManifests += $record.name
    }
}
elseif ($readyToSync -and $DryRun) {
    foreach ($record in $manifestRecords) {
        $updatedManifests += $record.name
    }
}

$summary = [pscustomobject]@{
    readyToSync = $readyToSync
    dryRun = [bool]$DryRun
    resultsPath = $ResultsPath
    resultsExists = Test-Path -LiteralPath $resolvedResultsPath
    expectedIdCount = $expectedAudioIds.Count
    resultCount = $resultCount
    passedCount = $passedCount
    reviewStatus = $ReviewStatus
    updatedManifestCount = @($updatedManifests).Count
    updatedManifests = @($updatedManifests)
    blockerCount = $blockers.Count
    blockers = @($blockers)
    warningCount = $warnings.Count
    warnings = @($warnings)
}

if ($Json) {
    $summary | ConvertTo-Json -Depth 6

    if ((-not $DryRun) -and (-not $readyToSync)) {
        exit 1
    }

    exit 0
}

Write-Host "音訊 manifest 人耳驗收狀態同步"
Write-Host ""
Write-Host "結果檔：$ResultsPath"
Write-Host "結果檔存在：$($summary.resultsExists)"
Write-Host "已記錄：$($summary.resultCount) / $($summary.expectedIdCount)"
Write-Host "已通過：$($summary.passedCount) / $($summary.expectedIdCount)"
Write-Host "準備同步：$($summary.readyToSync)"
Write-Host "Dry run：$($summary.dryRun)"

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "警告："
    foreach ($warning in $warnings) {
        Write-Host "- $warning"
    }
}

if ($blockers.Count -gt 0) {
    Write-Host ""
    Write-Host "尚不能同步 manifest："
    foreach ($blocker in $blockers) {
        Write-Host "- $blocker"
    }
    Write-Host ""
    Write-Host "這是預期的安全阻擋：必須先完成 42 個音訊的人耳聆聽，且全部為通過。"

    if ($DryRun) {
        exit 0
    }

    exit 1
}

Write-Host ""
if ($DryRun) {
    Write-Host "Dry run 通過：正式執行時會更新 $($summary.updatedManifestCount) 份 manifest。"
}
else {
    Write-Host "已更新 $($summary.updatedManifestCount) 份 manifest："
    foreach ($manifestName in $updatedManifests) {
        Write-Host "- $manifestName"
    }
}

exit 0
