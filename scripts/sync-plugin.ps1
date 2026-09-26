$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Split-Path $PSScriptRoot -Parent))
$wpRoot = Join-Path $projectRoot 'runtime\wordpress\app\public'
if (!(Test-Path -LiteralPath (Join-Path $wpRoot 'wp-load.php'))) { throw 'Create the new Local site at runtime\wordpress first. No files were copied.' }
$target = [IO.Path]::GetFullPath((Join-Path $wpRoot 'wp-content\plugins\inkora-core'))
if (!$target.StartsWith($projectRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Target is outside this project.' }
if (Test-Path -LiteralPath $target) {
    if ((Get-Item -LiteralPath $target).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Refusing a linked plugin target.' }
}
New-Item -ItemType Directory -Path $target -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $projectRoot 'wordpress\plugins\inkora-core\inkora-core.php') -Destination (Join-Path $target 'inkora-core.php') -Force
Write-Output "Copied inkora-core to $target. Activate it in the NEW site's WordPress admin."
