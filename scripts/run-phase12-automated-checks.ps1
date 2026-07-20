[CmdletBinding()]
param(
    [switch]$Json
)

$ErrorActionPreference = "Continue"
$projectRoot = Split-Path -Parent $PSScriptRoot

function Invoke-Phase12Check {
    param(
        [string]$Name,
        [string[]]$Command,
        [switch]$Quiet
    )

    if (-not $Quiet) {
        Write-Host ""
        Write-Host "== $Name =="
    }

    Push-Location $projectRoot
    try {
        $commandOutput = & $Command[0] @($Command | Select-Object -Skip 1) 2>&1
        $exitCode = $LASTEXITCODE
    }
    finally {
        Pop-Location
    }

    if (-not $Quiet) {
        foreach ($line in $commandOutput) {
            Write-Host $line
        }
    }

    if (-not $Quiet) {
        if ($exitCode -eq 0) {
            Write-Host "通過：$Name"
        }
        else {
            Write-Host "失敗：$Name（exit $exitCode）"
        }
    }

    return ,([pscustomobject]@{
        name = $Name
        exitCode = $exitCode
        passed = $exitCode -eq 0
        outputLineCount = @($commandOutput).Count
    })
}

$checks = @(
    [pscustomobject]@{
        name = "格式檢查"
        command = @("npm.cmd", "run", "format:check")
        required = $true
    },
    [pscustomobject]@{
        name = "Lint"
        command = @("npm.cmd", "run", "lint")
        required = $true
    },
    [pscustomobject]@{
        name = "型別檢查"
        command = @("npm.cmd", "run", "typecheck")
        required = $true
    },
    [pscustomobject]@{
        name = "單元與驗收測試"
        command = @("npm.cmd", "test", "--", "--run")
        required = $true
    },
    [pscustomobject]@{
        name = "建置"
        command = @("npm.cmd", "run", "build")
        required = $true
    },
    [pscustomobject]@{
        name = "音訊驗收工具 dry run"
        command = @("npm.cmd", "run", "phase12:audio:dry-run")
        required = $true
    },
    [pscustomobject]@{
        name = "音訊 manifest 同步 dry run"
        command = @("npm.cmd", "run", "phase12:audio:sync-manifests:dry-run")
        required = $true
    },
    [pscustomobject]@{
        name = "實機測試伺服器 dry run"
        command = @("npm.cmd", "run", "phase12:device-server:dry-run")
        required = $true
    },
    [pscustomobject]@{
        name = "實機驗收表狀態檢查"
        command = @("npm.cmd", "run", "phase12:device-form:status")
        required = $true
    },
    [pscustomobject]@{
        name = "人工驗收啟動前檢查"
        command = @("npm.cmd", "run", "phase12:manual-ready")
        required = $true
    },
    [pscustomobject]@{
        name = "外部證據狀態盤點"
        command = @("npm.cmd", "run", "phase12:evidence:status")
        required = $false
    }
)

$results = foreach ($check in $checks) {
    $result = Invoke-Phase12Check -Name $check.name -Command $check.command -Quiet:$Json
    $result | Add-Member -NotePropertyName required -NotePropertyValue $check.required
    $result
}

$requiredFailures = @($results | Where-Object { $_.required -and -not $_.passed })

if ($Json) {
    [pscustomobject]@{
        requiredChecksPassed = $requiredFailures.Count -eq 0
        requiredFailureCount = $requiredFailures.Count
        checkCount = @($results).Count
        checks = @($results)
        note = "外部證據狀態盤點只列出人耳與實機缺口，不代表 Phase 12 已完成。"
    } | ConvertTo-Json -Depth 5

    if ($requiredFailures.Count -gt 0) {
        exit 1
    }

    exit 0
}

Write-Host ""
Write-Host "Phase 12 自動檢查摘要"
foreach ($result in $results) {
    $status = if ($result.passed) { "通過" } else { "失敗" }
    $requiredLabel = if ($result.required) { "必要" } else { "盤點" }
    Write-Host "- $($result.name)：$status（$requiredLabel）"
}

if ($requiredFailures.Count -gt 0) {
    Write-Host ""
    Write-Host "仍有必要自動檢查失敗，不能進入人工收斂。"
    exit 1
}

Write-Host ""
Write-Host "所有必要自動檢查已通過。外部證據仍需依盤點結果由人耳與實機補齊。"
exit 0
