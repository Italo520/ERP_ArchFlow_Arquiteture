#!/bin/bash

# Função para matar processos nas portas padrão
cleanup() {
    echo "Parando serviços..."
    fuser -k 8080/tcp 2>/dev/null
    fuser -k 5173/tcp 2>/dev/null
}

# Trap para limpar ao sair com Ctrl+C
trap cleanup EXIT

cleanup

echo "🚀 Iniciando ArchFlow..."

# Iniciar Backend
echo "Backend: Iniciando Spring Boot..."
cd projeto-arquitetura-backend
mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend rodando (PID: $BACKEND_PID). Logs em backend.log"

# Aguardar um pouco para o backend começar a subir
sleep 5

# Iniciar Frontend
echo "Frontend: Iniciando Vite..."
cd ../projeto-arquitetura-frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend rodando (PID: $FRONTEND_PID). Logs em frontend.log"

echo ""
echo "✅ Aplicação iniciada!"
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo ""
echo "Pressione Ctrl+C para parar tudo."

wait
