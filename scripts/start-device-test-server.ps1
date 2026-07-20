[CmdletBinding()]
param(
    [switch]$DryRun,
    [int]$Port = 5173
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot

function Get-LanIPv4Address {
    $addresses = @()

    try {
        $addresses = @(
            Get-NetIPAddress -AddressFamily IPv4 -ErrorAction Stop |
                Where-Object {
                    $_.IPAddress -notlike "127.*" -and
                    $_.IPAddress -notlike "169.254.*" -and
                    $_.PrefixOrigin -ne "WellKnown"
                } |
                Select-Object -ExpandProperty IPAddress -Unique
        )
    }
    catch {
        $addresses = @()
    }

    if ($addresses.Count -gt 0) {
        return @($addresses | Sort-Object)
    }

    return @(
        [System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) |
            Where-Object {
                $_.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork -and
                $_.IPAddressToString -notlike "127.*" -and
                $_.IPAddressToString -notlike "169.254.*"
            } |
            ForEach-Object { $_.IPAddressToString } |
            Sort-Object -Unique
    )
}

$addresses = @(Get-LanIPv4Address)
$command = @("npm.cmd", "run", "dev", "--", "--host", "0.0.0.0", "--port", "$Port")

Write-Host "Phase 12 實機測試伺服器"
Write-Host ""
Write-Host "用途：讓 iPad Safari 或 Android Chrome 在同一個 Wi-Fi / LAN 開啟本機 Vite 測試站。"
Write-Host "限制：這不是部署；只供目前區域網路人工驗收使用。"
Write-Host "提醒：若 Windows 防火牆詢問，請只允許私人網路。"
Write-Host ""

if ($addresses.Count -eq 0) {
    Write-Warning "找不到可用的 LAN IPv4 位址。請確認電腦已連上 Wi-Fi 或區域網路。"
}
else {
    Write-Host "平板測試網址："
    foreach ($address in $addresses) {
        Write-Host "- http://$address`:$Port/"
    }
}

Write-Host ""
Write-Host "桌機本機網址："
Write-Host "- http://127.0.0.1:$Port/"
Write-Host ""
Write-Host "即將執行：$($command -join ' ')"

if ($DryRun) {
    Write-Host ""
    Write-Host "Dry run 完成：未啟動伺服器。"
    exit 0
}

Push-Location $projectRoot
try {
    & $command[0] @($command | Select-Object -Skip 1)
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}
