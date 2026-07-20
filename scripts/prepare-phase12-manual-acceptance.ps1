[CmdletBinding()]
param(
    [switch]$Json
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$audioResultsPath = Join-Path $projectRoot "docs/acceptance/audio-listening-session.json"
$deviceResultsPath = Join-Path $projectRoot "docs/acceptance/device-and-workflow-results.md"

Push-Location $projectRoot
try {
    $evidenceJsonText = & powershell -NoProfile -ExecutionPolicy Bypass -File "scripts/check-phase12-evidence.ps1" -Json -AllowIncomplete
    if ($LASTEXITCODE -ne 0) {
        throw "Phase 12 外部證據 JSON 盤點失敗。"
    }

    $audioManifestSyncJsonText = & powershell -NoProfile -ExecutionPolicy Bypass -File "scripts/sync-audio-manifest-review.ps1" -DryRun -Json
    if ($LASTEXITCODE -ne 0) {
        throw "音訊 manifest 同步 dry run JSON 盤點失敗。"
    }

    $deviceFormJsonText = & powershell -NoProfile -ExecutionPolicy Bypass -File "scripts/check-device-workflow-form.ps1" -Json -AllowIncomplete
    if ($LASTEXITCODE -ne 0) {
        throw "實機驗收表 JSON 盤點失敗。"
    }
}
finally {
    Pop-Location
}

$evidence = $evidenceJsonText | ConvertFrom-Json
$audioManifestSync = $audioManifestSyncJsonText | ConvertFrom-Json
$deviceForm = $deviceFormJsonText | ConvertFrom-Json
$audioResultsExists = Test-Path -LiteralPath $audioResultsPath
$deviceResultsExists = Test-Path -LiteralPath $deviceResultsPath
$nextActions = @(
    [pscustomobject]@{
        order = 1
        title = "先確認自動檢查通過"
        command = "npm.cmd run phase12:auto-checks"
        purpose = "確認格式、lint、型別、測試、建置、音訊檔案與實機網址工具都可用。"
    },
    [pscustomobject]@{
        order = 2
        title = "執行音訊人工聆聽"
        command = "npm.cmd run phase12:audio:review"
        purpose = "逐一播放 42 個音訊，建立 docs/acceptance/audio-listening-session.json。"
    },
    [pscustomobject]@{
        order = 3
        title = "啟動平板實機測試站"
        command = "npm.cmd run phase12:device-server"
        purpose = "讓 iPad Safari 與 Android Chrome 使用 LAN URL 連到本機 Vite。"
    },
    [pscustomobject]@{
        order = 4
        title = "填寫實機與人工流程紀錄"
        command = "docs/acceptance/device-and-workflow-results.md"
        purpose = "只把實際測過的項目改成通過、需修正或需確認。"
    },
    [pscustomobject]@{
        order = 5
        title = "最後執行正式證據閘門"
        command = "npm.cmd run phase12:evidence"
        purpose = "確認人耳、實機與人工流程證據都已齊備。"
    }
)

$summary = [pscustomobject]@{
    isReadyForManualAcceptance = $true
    isPhase12Complete = [bool]$evidence.isComplete
    blockerCount = [int]$evidence.blockerCount
    blockers = @($evidence.blockers)
    audio = [pscustomobject]@{
        resultsPath = "docs/acceptance/audio-listening-session.json"
        resultsExists = $audioResultsExists
        expectedIdCount = [int]$evidence.audio.expectedIdCount
        resultCount = [int]$evidence.audio.resultCount
        passedCount = [int]$evidence.audio.passedCount
        manifestReadyToSync = [bool]$audioManifestSync.readyToSync
        manifestSyncBlockerCount = [int]$audioManifestSync.blockerCount
        manifestSyncBlockers = @($audioManifestSync.blockers)
    }
    deviceAndWorkflow = [pscustomobject]@{
        resultsPath = "docs/acceptance/device-and-workflow-results.md"
        resultsExists = $deviceResultsExists
        untestedCount = [int]$evidence.deviceAndWorkflow.untestedCount
        needsFixCount = [int]$evidence.deviceAndWorkflow.needsFixCount
        needsConfirmCount = [int]$evidence.deviceAndWorkflow.needsConfirmCount
        formIsComplete = [bool]$deviceForm.isComplete
        blankDeviceInfoCount = [int]$deviceForm.blankDeviceInfoCount
        mimeUntestedCount = [int]$deviceForm.mimeUntestedCount
        formBlockerCount = [int]$deviceForm.blockerCount
        formBlockers = @($deviceForm.blockers)
        sections = @($evidence.deviceAndWorkflow.sections)
    }
    nextActions = @($nextActions)
    note = "此檢查只整理人工驗收準備狀態，不會把任何未測項目標成通過。"
}

if ($Json) {
    $summary | ConvertTo-Json -Depth 6
    exit 0
}

Write-Host "Phase 12 人工驗收啟動前檢查"
Write-Host ""

if ($summary.isPhase12Complete) {
    Write-Host "狀態：外部證據已齊備，可進行最終自動檢查。"
}
else {
    Write-Host "狀態：尚未完成，仍需補齊人耳與實機證據。"
}

Write-Host ""
Write-Host "外部證據缺口：$($summary.blockerCount) 項"
foreach ($blocker in $summary.blockers) {
    Write-Host "- $blocker"
}

Write-Host ""
Write-Host "音訊人工聆聽："
Write-Host "- 結果檔：$($summary.audio.resultsPath)"
Write-Host "- 是否存在：$($summary.audio.resultsExists)"
Write-Host "- 已記錄：$($summary.audio.resultCount) / $($summary.audio.expectedIdCount)"
Write-Host "- 已通過：$($summary.audio.passedCount) / $($summary.audio.expectedIdCount)"
Write-Host "- manifest 可同步：$($summary.audio.manifestReadyToSync)"

if ($summary.audio.manifestSyncBlockerCount -gt 0) {
    Write-Host "- manifest 同步阻擋：$($summary.audio.manifestSyncBlockerCount)"
    foreach ($blocker in $summary.audio.manifestSyncBlockers) {
        Write-Host "  - $blocker"
    }
}

Write-Host ""
Write-Host "實機與人工流程："
Write-Host "- 紀錄檔：$($summary.deviceAndWorkflow.resultsPath)"
Write-Host "- 是否存在：$($summary.deviceAndWorkflow.resultsExists)"
Write-Host "- 未測：$($summary.deviceAndWorkflow.untestedCount)"
Write-Host "- 需修正：$($summary.deviceAndWorkflow.needsFixCount)"
Write-Host "- 需確認：$($summary.deviceAndWorkflow.needsConfirmCount)"
Write-Host "- 表格完整：$($summary.deviceAndWorkflow.formIsComplete)"
Write-Host "- 空白裝置資訊：$($summary.deviceAndWorkflow.blankDeviceInfoCount)"
Write-Host "- 未測 MIME 類型：$($summary.deviceAndWorkflow.mimeUntestedCount)"

if ($summary.deviceAndWorkflow.formBlockerCount -gt 0) {
    Write-Host "- 表格阻擋：$($summary.deviceAndWorkflow.formBlockerCount)"
    foreach ($blocker in $summary.deviceAndWorkflow.formBlockers) {
        Write-Host "  - $blocker"
    }
}

Write-Host ""
Write-Host "各區段狀態："
foreach ($section in $summary.deviceAndWorkflow.sections) {
    Write-Host "- $($section.name)：通過 $($section.passedCount)，未測 $($section.untestedCount)，需修正 $($section.needsFixCount)，需確認 $($section.needsConfirmCount)"
}

Write-Host ""
Write-Host "建議人工驗收順序："
foreach ($action in $summary.nextActions) {
    Write-Host "$($action.order). $($action.title)"
    Write-Host "   $($action.command)"
    Write-Host "   $($action.purpose)"
}

Write-Host ""
Write-Host $summary.note
exit 0
