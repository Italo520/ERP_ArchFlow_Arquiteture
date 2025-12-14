#!/bin/bash

# ArchFlow Backend - Script de Inicialização com Variáveis de Desenvolvimento

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ArchFlow Backend - Inicializando...${NC}"
echo -e "${GREEN}========================================${NC}"

# Variáveis de Ambiente Padrão (DEV)
export JWT_SECRET="dev-secret-key-archflow-2024-change-in-production-this-is-very-important"
export DB_URL="jdbc:postgresql://localhost:5432/archflow"
export DB_USERNAME="postgres"
export DB_PASSWORD="postgres"

echo -e "${YELLOW}Usando configurações de desenvolvimento:${NC}"
echo "  DB_URL: $DB_URL"
echo "  DB_USERNAME: $DB_USERNAME"
echo "  JWT_SECRET: [OCULTO]"
echo ""

# Iniciar aplicação
echo -e "${GREEN}Iniciando Spring Boot...${NC}"
mvn spring-boot:run
