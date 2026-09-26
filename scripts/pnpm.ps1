param([Parameter(ValueFromRemainingArguments=$true)][string[]]$Arguments)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
Set-Location -LiteralPath $projectRoot
$existing = Get-Command pnpm.cmd -ErrorAction SilentlyContinue
if ($existing) { & $existing.Source @Arguments; exit $LASTEXITCODE }
$bundled = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node'
$pnpm = Join-Path $bundled 'node_modules\pnpm\bin\pnpm.cjs'
$node = Join-Path $bundled 'bin\node.exe'
if (!(Test-Path -LiteralPath $pnpm) -or !(Test-Path -LiteralPath $node)) { throw 'Node/pnpm not found. Install Node LTS and pnpm or use the existing Codex runtime.' }
$env:PATH = (Join-Path $bundled 'bin') + ';' + $env:PATH
& $node $pnpm @Arguments
exit $LASTEXITCODE
