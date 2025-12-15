# Script para iniciar o ambiente de desenvolvimento no Windows

function Stop-PortProcess {
    param([int]$port)
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($process) {
        Write-Host "Matando processo na porta $port (PID: $process)..."
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
    }
}

# Limpar portas
Write-Host "Limpando portas 8080 e 5173..."
Stop-PortProcess 8080
Stop-PortProcess 5173

# Iniciar Backend
Write-Host "Iniciando Backend (Spring Boot)..."
$backendProcess = Start-Process -FilePath "mvn" -ArgumentList "spring-boot:run" -WorkingDirectory ".\projeto-arquitetura-backend" -PassThru -NoNewWindow
Write-Host "Backend iniciado (PID: $($backendProcess.Id))"

# Aguardar um pouco
Start-Sleep -Seconds 5

# Iniciar Frontend
Write-Host "Iniciando Frontend (Vite)..."
$frontendProcess = Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory ".\projeto-arquitetura-frontend" -PassThru -NoNewWindow
Write-Host "Frontend iniciado (PID: $($frontendProcess.Id))"

Write-Host ""
Write-Host "✅ Aplicação iniciada!"
Write-Host "Backend: http://localhost:8080"
Write-Host "Frontend: http://localhost:5173"
Write-Host ""
Write-Host "Pressione qualquer tecla para parar os servidores..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Parar processos ao sair
Write-Host "Parando serviços..."
Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue
Stop-Process -Id $frontendProcess.Id -Force -ErrorAction SilentlyContinue
Stop-PortProcess 8080
Stop-PortProcess 5173
Write-Host "Serviços parados."
