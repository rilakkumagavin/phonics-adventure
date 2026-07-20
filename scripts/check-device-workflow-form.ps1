[CmdletBinding()]
param(
    [switch]$AllowIncomplete,
    [switch]$Json,
    [string]$DeviceResultsPath = "docs/acceptance/device-and-workflow-results.md"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$resolvedDeviceResultsPath = Join-Path $projectRoot $DeviceResultsPath
$blockers = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]
$allowedResults = @("通過", "需修正", "需確認", "未測")
$sectionRows = @{}
$invalidResultCells = New-Object System.Collections.Generic.List[string]
$untestedCount = 0
$needsFixCount = 0
$needsConfirmCount = 0
$passedCount = 0
$blankDeviceInfoFields = New-Object System.Collections.Generic.List[string]
$mimeUntestedCount = 0

function Add-Blocker {
    param([string]$Message)
    $blockers.Add($Message) | Out-Null
}

function Add-Warning {
    param([string]$Message)
    $warnings.Add($Message) | Out-Null
}

function Split-MarkdownRow {
    param([string]$Line)

    $trimmedLine = $Line.Trim()
    if ($trimmedLine.StartsWith("|")) {
        $trimmedLine = $trimmedLine.Substring(1)
    }

    if ($trimmedLine.EndsWith("|")) {
        $trimmedLine = $trimmedLine.Substring(0, $trimmedLine.Length - 1)
    }

    return @($trimmedLine -split "\|" | ForEach-Object { $_.Trim() })
}

if (-not (Test-Path -LiteralPath $resolvedDeviceResultsPath)) {
    Add-Blocker "缺少實機與人工流程驗收紀錄：$DeviceResultsPath"
}
else {
    $text = Get-Content -LiteralPath $resolvedDeviceResultsPath -Raw -Encoding utf8
    $lines = @($text -split "`r?`n")
    $currentSection = "文件整體"

    for ($index = 0; $index -lt $lines.Count; $index++) {
        $line = $lines[$index]
        $sectionMatch = [regex]::Match($line, "^##\s+\d+\.\s+(.+)$")
        if ($sectionMatch.Success) {
            $currentSection = $sectionMatch.Groups[1].Value.Trim()
        }

        if ($line.TrimStart().StartsWith("|")) {
                if (-not $sectionRows.ContainsKey($currentSection)) {
                $sectionRows[$currentSection] = New-Object System.Collections.ArrayList
            }

            $cells = @(Split-MarkdownRow -Line $line)
            $isSeparatorRow = ($cells.Count -gt 0) -and @($cells | Where-Object { $_ -notmatch "^-+$" }).Count -eq 0

            if ($cells.Count -gt 0 -and -not $isSeparatorRow) {
                $sectionRows[$currentSection].Add([pscustomobject]@{
                    lineNumber = $index + 1
                    cells = $cells
                }) | Out-Null
            }

            foreach ($cell in $cells) {
                if ($cell -eq "未測") {
                    $untestedCount += 1
                }
                elseif ($cell -eq "需修正") {
                    $needsFixCount += 1
                }
                elseif ($cell -eq "需確認") {
                    $needsConfirmCount += 1
                }
                elseif ($cell -eq "通過") {
                    $passedCount += 1
                }
            }
        }
    }

    $requiredSections = @(
        "桌機完整人工流程",
        "iPad Safari 實機驗收",
        "Android Chrome 實機驗收",
        "麥克風拒絕流程",
        "本機進度與損壞資料",
        "Phase 12 外部證據總結"
    )

    foreach ($requiredSection in $requiredSections) {
        if (-not $sectionRows.ContainsKey($requiredSection)) {
            Add-Blocker "缺少必要區段：$requiredSection"
        }
    }

    foreach ($sectionName in $sectionRows.Keys) {
        foreach ($row in $sectionRows[$sectionName]) {
            foreach ($cell in $row.cells) {
                if ($cell -in $allowedResults) {
                    continue
                }

                if ($cell -match "^(結果|狀態|項目|備註|驗收者|日期|裝置|裝置型號|iPadOS 版本|Safari 版本|Android 版本|Chrome 版本|測試網址|證據項目|證據位置或備註|拒絕權限後顯示友善提示|其他學習功能仍可使用|不產生空白錄音|裝置與瀏覽器)$") {
                    continue
                }

                if ($cell -match "^-+$") {
                    continue
                }

                if ($sectionName -eq "麥克風拒絕流程" -and $cell -in @("桌機瀏覽器", "iPad Safari", "Android Chrome")) {
                    continue
                }
            }
        }
    }

    foreach ($sectionName in @("iPad Safari 實機驗收", "Android Chrome 實機驗收")) {
        $rows = @($sectionRows[$sectionName])
        if ($rows.Count -lt 2) {
            Add-Blocker "$sectionName 缺少裝置資訊表。"
            continue
        }

        $deviceInfoRows = @($rows | Where-Object { $_.cells.Count -ge 6 })
        if ($deviceInfoRows.Count -lt 2) {
            Add-Blocker "$sectionName 裝置資訊表格式不完整。"
            continue
        }

        $header = @($deviceInfoRows[0].cells)
        $data = @($deviceInfoRows[1].cells)

        for ($index = 0; $index -lt $header.Count; $index++) {
            if ($index -ge $data.Count -or [string]::IsNullOrWhiteSpace($data[$index])) {
                $blankDeviceInfoFields.Add("$sectionName：$($header[$index])") | Out-Null
            }
        }
    }

    $mimeMatches = [regex]::Matches($text, '錄音 MIME 類型：\s*```text\s*(.*?)\s*```', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($mimeMatches.Count -lt 2) {
        Add-Blocker "缺少 iPad 或 Android 的錄音 MIME 類型紀錄區塊。"
    }
    else {
        foreach ($match in $mimeMatches) {
            $mimeValue = $match.Groups[1].Value.Trim()
            if ($mimeValue -eq "未測" -or [string]::IsNullOrWhiteSpace($mimeValue)) {
                $mimeUntestedCount += 1
            }
        }
    }

    if ($invalidResultCells.Count -gt 0) {
        Add-Blocker "實機驗收表包含不合法狀態：$($invalidResultCells -join ', ')。"
    }

    if ($untestedCount -gt 0) {
        Add-Blocker "實機與人工流程紀錄仍有 $untestedCount 個未測標記。"
    }

    if ($needsFixCount -gt 0) {
        Add-Blocker "實機與人工流程紀錄仍有 $needsFixCount 個需修正標記。"
    }

    if ($needsConfirmCount -gt 0) {
        Add-Blocker "實機與人工流程紀錄仍有 $needsConfirmCount 個需確認標記。"
    }

    if ($blankDeviceInfoFields.Count -gt 0) {
        Add-Blocker "實機裝置資訊仍有空白欄位：$($blankDeviceInfoFields -join ', ')。"
    }

    if ($mimeUntestedCount -gt 0) {
        Add-Blocker "錄音 MIME 類型仍有 $mimeUntestedCount 個未測或空白。"
    }
}

$summary = [pscustomobject]@{
    isComplete = $blockers.Count -eq 0
    blockerCount = $blockers.Count
    blockers = @($blockers)
    warningCount = $warnings.Count
    warnings = @($warnings)
    resultsPath = $DeviceResultsPath
    resultsExists = Test-Path -LiteralPath $resolvedDeviceResultsPath
    passedCount = $passedCount
    untestedCount = $untestedCount
    needsFixCount = $needsFixCount
    needsConfirmCount = $needsConfirmCount
    blankDeviceInfoCount = $blankDeviceInfoFields.Count
    mimeUntestedCount = $mimeUntestedCount
    sections = @(
        foreach ($sectionName in ($sectionRows.Keys | Sort-Object)) {
            $cells = @($sectionRows[$sectionName] | ForEach-Object { $_.cells })
            [pscustomobject]@{
                name = $sectionName
                passedCount = @($cells | Where-Object { $_ -eq "通過" }).Count
                untestedCount = @($cells | Where-Object { $_ -eq "未測" }).Count
                needsFixCount = @($cells | Where-Object { $_ -eq "需修正" }).Count
                needsConfirmCount = @($cells | Where-Object { $_ -eq "需確認" }).Count
            }
        }
    )
}

if ($Json) {
    $summary | ConvertTo-Json -Depth 6

    if (($blockers.Count -gt 0) -and (-not $AllowIncomplete)) {
        exit 1
    }

    exit 0
}

Write-Host "Phase 12 實機驗收表檢查"
Write-Host ""
Write-Host "紀錄檔：$DeviceResultsPath"
Write-Host "存在：$($summary.resultsExists)"
Write-Host "通過：$passedCount"
Write-Host "未測：$untestedCount"
Write-Host "需修正：$needsFixCount"
Write-Host "需確認：$needsConfirmCount"
Write-Host "空白裝置資訊：$($blankDeviceInfoFields.Count)"
Write-Host "未測 MIME 類型：$mimeUntestedCount"

if ($blockers.Count -gt 0) {
    Write-Host ""
    Write-Host "尚未完成："
    foreach ($blocker in $blockers) {
        Write-Host "- $blocker"
    }

    if ($AllowIncomplete) {
        exit 0
    }

    exit 1
}

Write-Host ""
Write-Host "實機驗收表已填寫完整。"
exit 0
