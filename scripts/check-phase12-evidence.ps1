[CmdletBinding()]
param(
    [switch]$AllowIncomplete,
    [switch]$Json,
    [string]$AudioResultsPath = "docs/acceptance/audio-listening-session.json",
    [string]$DeviceResultsPath = "docs/acceptance/device-and-workflow-results.md"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$resolvedAudioResultsPath = Join-Path $projectRoot $AudioResultsPath
$resolvedDeviceResultsPath = Join-Path $projectRoot $DeviceResultsPath
$manifestDirectory = Join-Path $projectRoot "docs/assets"

$blockers = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]
$expectedAudioIds = New-Object System.Collections.Generic.HashSet[string]
$audioResultsCount = 0
$passedAudioCount = 0
$deviceUntestedCount = 0
$deviceNeedsFixCount = 0
$deviceNeedsConfirmCount = 0
$deviceBlankInfoCount = 0
$deviceMimeUntestedCount = 0
$deviceFormBlockerCount = 0
$deviceSections = @()
$audioResultsExists = Test-Path -LiteralPath $resolvedAudioResultsPath
$deviceResultsExists = Test-Path -LiteralPath $resolvedDeviceResultsPath

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
    $json = Get-Content -LiteralPath $Path -Raw -Encoding utf8
    $parsed = $json | ConvertFrom-Json
    return $parsed
}

if (-not $Json) {
    Write-Host "Phase 12 外部證據檢查"
    Write-Host ""
}

$manifestFiles = @(Get-ChildItem -LiteralPath $manifestDirectory -Filter "*-audio-manifest.json")
if ($manifestFiles.Count -ne 6) {
    Add-Blocker "音訊 manifest 數量應為 6，目前 $($manifestFiles.Count) 個。"
}

foreach ($manifestFile in $manifestFiles) {
    $manifest = Read-JsonFile -Path $manifestFile.FullName

    foreach ($asset in $manifest.assets) {
        $expectedAudioIds.Add($asset.id) | Out-Null
    }

    if ($manifest.reviewStatus -eq "needs-human-listening") {
        Add-Blocker "$($manifestFile.Name) 仍標記為 needs-human-listening。"
    }
    elseif (-not $manifest.reviewStatus) {
        Add-Warning "$($manifestFile.Name) 缺少 reviewStatus。"
    }
}

if ($expectedAudioIds.Count -ne 42) {
    Add-Blocker "音訊 manifest 應列出 42 個唯一音訊 ID，目前 $($expectedAudioIds.Count) 個。"
}

if (-not $audioResultsExists) {
    Add-Blocker "缺少音訊人工聆聽結果：$AudioResultsPath"
}
else {
    $audioResults = @(Read-JsonFile -Path $resolvedAudioResultsPath)
    $audioResultsCount = $audioResults.Count
    $validAudioResults = @("通過", "需重錄", "需確認")
    $reviewedAudioIds = New-Object System.Collections.Generic.HashSet[string]
    $duplicateAudioIds = New-Object System.Collections.Generic.List[string]
    $unknownAudioIds = New-Object System.Collections.Generic.List[string]
    $invalidResultIds = New-Object System.Collections.Generic.List[string]

    foreach ($record in $audioResults) {
        if (-not $record.id) {
            Add-Blocker "音訊人工聆聽結果包含缺少 id 的紀錄。"
            continue
        }

        if (-not $reviewedAudioIds.Add([string]$record.id)) {
            $duplicateAudioIds.Add([string]$record.id) | Out-Null
        }

        if (-not $expectedAudioIds.Contains([string]$record.id)) {
            $unknownAudioIds.Add([string]$record.id) | Out-Null
        }

        if ($record.result -notin $validAudioResults) {
            $invalidResultIds.Add([string]$record.id) | Out-Null
        }
    }

    $passedAudio = @($audioResults | Where-Object { $_.result -eq "通過" })
    $needsRerecord = @($audioResults | Where-Object { $_.result -eq "需重錄" })
    $needsConfirm = @($audioResults | Where-Object { $_.result -eq "需確認" })
    $passedAudioCount = $passedAudio.Count
    $missingAudioIds = @(
        foreach ($expectedAudioId in $expectedAudioIds) {
            if (-not $reviewedAudioIds.Contains($expectedAudioId)) {
                $expectedAudioId
            }
        }
    )

    if ($audioResults.Count -ne 42) {
        Add-Blocker "音訊人工聆聽結果未滿 42 個，目前 $($audioResults.Count) 個。"
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

    if ($invalidResultIds.Count -gt 0) {
        Add-Blocker "音訊人工聆聽結果包含不合法 result，相關 ID：$($invalidResultIds -join ', ')。"
    }

    if ($passedAudio.Count -ne 42) {
        Add-Blocker "音訊尚未全部通過，目前通過 $($passedAudio.Count) / 42。"
    }

    if ($needsRerecord.Count -gt 0) {
        Add-Blocker "仍有 $($needsRerecord.Count) 個音訊標記為需重錄。"
    }

    if ($needsConfirm.Count -gt 0) {
        Add-Blocker "仍有 $($needsConfirm.Count) 個音訊標記為需確認。"
    }
}

if (-not $deviceResultsExists) {
    Add-Blocker "缺少實機與人工流程驗收紀錄：$DeviceResultsPath"
}
else {
    $deviceResultsText = Get-Content -LiteralPath $resolvedDeviceResultsPath -Raw -Encoding utf8
    $currentSection = "文件整體"
    $sectionRows = @{}
    $deviceTableCells = @(
        $deviceResultsText -split "`r?`n" |
            ForEach-Object {
                $line = $_
                $sectionMatch = [regex]::Match($line, "^##\s+\d+\.\s+(.+)$")
                if ($sectionMatch.Success) {
                    $currentSection = $sectionMatch.Groups[1].Value.Trim()
                }

                if ($line.TrimStart().StartsWith("|")) {
                    if (-not $sectionRows.ContainsKey($currentSection)) {
                        $sectionRows[$currentSection] = New-Object System.Collections.Generic.List[string]
                    }

                    $cells = @(
                        $line -split "\|" |
                            ForEach-Object { $_.Trim() } |
                            Where-Object { $_ -ne "" }
                    )

                    foreach ($cell in $cells) {
                        $sectionRows[$currentSection].Add($cell) | Out-Null
                        $cell
                    }
                }
            }
    )
    $untestedCount = @($deviceTableCells | Where-Object { $_ -eq "未測" }).Count
    $needsFixCount = @($deviceTableCells | Where-Object { $_ -eq "需修正" }).Count
    $needsConfirmCount = @($deviceTableCells | Where-Object { $_ -eq "需確認" }).Count
    $deviceUntestedCount = $untestedCount
    $deviceNeedsFixCount = $needsFixCount
    $deviceNeedsConfirmCount = $needsConfirmCount
    $deviceSections = @(
        foreach ($sectionName in ($sectionRows.Keys | Sort-Object)) {
            $cells = @($sectionRows[$sectionName])

            [pscustomobject]@{
                name = $sectionName
                untestedCount = @($cells | Where-Object { $_ -eq "未測" }).Count
                needsFixCount = @($cells | Where-Object { $_ -eq "需修正" }).Count
                needsConfirmCount = @($cells | Where-Object { $_ -eq "需確認" }).Count
                passedCount = @($cells | Where-Object { $_ -eq "通過" }).Count
            }
        }
    )

    if ($untestedCount -gt 0) {
        Add-Blocker "實機與人工流程紀錄仍有 $untestedCount 個未測標記。"
    }

    if ($needsFixCount -gt 0) {
        Add-Blocker "實機與人工流程紀錄仍有 $needsFixCount 個需修正標記。"
    }

    if ($needsConfirmCount -gt 0) {
        Add-Blocker "實機與人工流程紀錄仍有 $needsConfirmCount 個需確認標記。"
    }

    Push-Location $projectRoot
    try {
        $deviceFormJsonText = & powershell -NoProfile -ExecutionPolicy Bypass -File "scripts/check-device-workflow-form.ps1" -Json -AllowIncomplete -DeviceResultsPath $DeviceResultsPath
        if ($LASTEXITCODE -ne 0) {
            Add-Blocker "實機驗收表完整性檢查無法執行。"
        }
        else {
            $deviceForm = $deviceFormJsonText | ConvertFrom-Json
            $deviceBlankInfoCount = [int]$deviceForm.blankDeviceInfoCount
            $deviceMimeUntestedCount = [int]$deviceForm.mimeUntestedCount
            $deviceFormBlockerCount = [int]$deviceForm.blockerCount

            if ($deviceForm.blankDeviceInfoCount -gt 0) {
                Add-Blocker "實機裝置資訊仍有 $($deviceForm.blankDeviceInfoCount) 個空白欄位。"
            }

            if ($deviceForm.mimeUntestedCount -gt 0) {
                Add-Blocker "錄音 MIME 類型仍有 $($deviceForm.mimeUntestedCount) 個未測或空白。"
            }
        }
    }
    finally {
        Pop-Location
    }
}

if ($Json) {
    [pscustomobject]@{
        isComplete = $blockers.Count -eq 0
        blockerCount = $blockers.Count
        warningCount = $warnings.Count
        blockers = @($blockers)
        warnings = @($warnings)
        audio = [pscustomobject]@{
            resultsPath = $AudioResultsPath
            resultsExists = $audioResultsExists
            expectedIdCount = $expectedAudioIds.Count
            resultCount = $audioResultsCount
            passedCount = $passedAudioCount
        }
        deviceAndWorkflow = [pscustomobject]@{
            resultsPath = $DeviceResultsPath
            resultsExists = $deviceResultsExists
            untestedCount = $deviceUntestedCount
            needsFixCount = $deviceNeedsFixCount
            needsConfirmCount = $deviceNeedsConfirmCount
            blankDeviceInfoCount = $deviceBlankInfoCount
            mimeUntestedCount = $deviceMimeUntestedCount
            formBlockerCount = $deviceFormBlockerCount
            sections = @($deviceSections)
        }
    } | ConvertTo-Json -Depth 5

    if (($blockers.Count -gt 0) -and (-not $AllowIncomplete)) {
        exit 1
    }

    exit 0
}

if ($warnings.Count -gt 0) {
    Write-Host "警告："
    foreach ($warning in $warnings) {
        Write-Host "- $warning"
    }
    Write-Host ""
}

if ($blockers.Count -gt 0) {
    Write-Host "Phase 12 尚未完成，阻擋項目："
    foreach ($blocker in $blockers) {
        Write-Host "- $blocker"
    }
    Write-Host ""
    Write-Host "這代表仍需要人耳、實機或人工流程證據，不能宣告 MVP 整合驗收完成。"

    if ($AllowIncomplete) {
        exit 0
    }

    exit 1
}

Write-Host "Phase 12 外部證據已齊備。仍需確認測試、lint、型別檢查、建置與格式檢查通過。"
exit 0
