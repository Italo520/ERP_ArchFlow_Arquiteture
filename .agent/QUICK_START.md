# 🚀 Quick Start - ArchFlow Antigravity Agent

Guia rápido para começar a usar o agente Antigravity no ArchFlow ERP.

**Tempo de Setup:** ~5 minutos  
**Versão:** 1.0.0  
**Data:** 18/01/2026  

---

## 1️⃣ Instalação

### 1.1 Instalar Antigravity CLI

```bash
# Via npm
npm install -g @antigravity/cli

# Verificar instalação
ag --version
```

### 1.2 Configurar Credenciais

```bash
# Login no Antigravity
ag login

# Inserir suas credenciais do Google
# Isso criará um arquivo ~/.antigravity/config.json
```

### 1.3 Clonar/Acessar o Repositório

```bash
cd ~/seu_workspace
git clone https://github.com/Italo520/ERP_ArchFlow_Arquiteture.git
cd ERP_ArchFlow_Arquiteture
```

---

## 2️⃣ Configuração do Agente

### 2.1 Preparar Variáveis de Ambiente

```bash
# Copiar template
cp .env.example .env.local

# Editar variáveis
nano .env.local
```

**Variáveis Obrigatórias:**

```bash
# API do ArchFlow
ARCHFLOW_API_BASE_URL=http://localhost:3000/api
AGENT_API_KEY=seu_token_aqui

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/archflow_dev

# Storage
STORAGE_BUCKET=archflow-files-dev
```

### 2.2 Validar Configuração

```bash
# Validar sintaxe YAML
ag config validate .agent/agent-config.yaml

# Validar skills
ag skills validate .agent/skills/

# Output esperado:
# ✅ All skills are valid!
```

---

## 3️⃣ Iniciar o Agente

### 3.1 Carregar Configuração

```bash
# Carregar arquivo principal
ag config load .agent/agent-config.yaml

# Carregar skills
ag skills load .agent/skills/
```

### 3.2 Iniciar Agente

```bash
# Iniciar em modo desenvolvimento
ag agent start --mode dev

# Output esperado:
# [INFO] ArchFlow Agent initialized
# [INFO] Skills loaded: 3
#   - project-management (8 skills)
#   - client-management (8 skills)
#   - activities-tracking (8 skills)
# [INFO] Agent ready at http://localhost:3001
```

### 3.3 Testar Conexão

```bash
# Em outro terminal
ag agent health

# Output esperado:
# ✅ Agent Status: OK
# ✅ API Connection: OK
# ✅ Database: OK
# ✅ Skills Loaded: 24
```

---

## 4️⃣ Exemplos de Uso

### Teste 1: Criar Cliente

```bash
ag skill call client-management create_client \
  --name "Cliente Teste" \
  --email "teste@example.com" \
  --legal_type "PJ" \
  --document "12.345.678/0001-90" \
  --category "COMMERCIAL"
```

**Resposta Esperada:**
```json
{
  "success": true,
  "id": "cli_550e8400e29b41d4",
  "name": "Cliente Teste",
  "status": "PROSPECT",
  "created_at": "2026-01-18T20:50:00Z",
  "message": "Cliente criado com sucesso!"
}
```

### Teste 2: Listar Clientes

```bash
ag skill call client-management list_clients \
  --category "COMMERCIAL" \
  --status "ACTIVE" \
  --limit 10
```

### Teste 3: Criar Projeto

```bash
ag skill call project-management create_project \
  --client_id "cli_550e8400e29b41d4" \
  --project_name "Projeto Teste" \
  --project_type "RESIDENTIAL" \
  --location '{"address": "Rua A", "city": "João Pessoa", "state": "PB", "zip_code": "58000-000"}' \
  --budget 50000
```

### Teste 4: Registrar Atividade

```bash
ag skill call activities-tracking log_activity \
  --type "MEETING" \
  --title "Reunião de Briefing" \
  --client_id "cli_550e8400e29b41d4" \
  --duration_minutes 60 \
  --description "Alinhamento de requisitos do projeto"
```

---

## 5️⃣ Modo Interativo (Recomendado)

### Iniciar Console Interativo

```bash
# Abrir interface interativa
ag console

# Ou usar via API REST
curl -X POST http://localhost:3001/skills/execute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AGENT_API_KEY" \
  -d '{
    "skill": "client-management",
    "action": "create_client",
    "params": {
      "name": "Novo Cliente",
      "email": "novo@example.com",
      "legal_type": "PF",
      "document": "123.456.789-00",
      "category": "RESIDENTIAL"
    }
  }'
```

---

## 6️⃣ Estrutura de Arquivos

```
.agent/
├── agent-config.yaml                 # Configuração principal
├── skills/
│   ├── project-management.yaml       # Skills de projetos
│   ├── client-management.yaml        # Skills de clientes  
│   ├── activities-tracking.yaml      # Skills de atividades
│   └── README.md                      # Documentação de skills
├── SKILLS_GUIDE.md                # Guia detalhado de uso
├── QUICK_START.md                 # Este arquivo
└── examples/
    ├── create-client.sh             # Exemplo: criar cliente
    ├── create-project.sh            # Exemplo: criar projeto
    ├── log-activity.sh              # Exemplo: registrar atividade
    └── time-tracking.sh             # Exemplo: rastrear tempo
```

---

## 7️⃣ Comandos Üteis

### Status e Monitoramento

```bash
# Ver status do agente
ag agent status

# Ver logs
ag logs --follow

# Ver métricas
ag metrics
```

### Gerenciamento de Skills

```bash
# Listar skills
ag skills list

# Validar skill especísfica
ag skills validate .agent/skills/client-management.yaml

# Recarregar skills (sem reiniciar agente)
ag skills reload
```

### Debug

```bash
# Modo debug ativado
ag agent start --debug

# Testar skill com parâmetros
ag skill test client-management create_client \
  --name "Teste" \
  --email "teste@local.dev" \
  --legal_type "PF" \
  --document "000.000.000-00" \
  --category "RESIDENTIAL" \
  --verbose
```

---

## 8️⃣ Troubleshooting

### Erro: "Agent not responding"

```bash
# Verificar status
ag agent status

# Reiniciar agente
ag agent restart

# Verificar logs
ag logs | grep -i error
```

### Erro: "Connection refused"

```bash
# Verificar se servidor está rodando
netstat -tuln | grep 3001

# Verificar variáveis de ambiente
echo $ARCHFLOW_API_BASE_URL

# Testar conexão
curl -I $ARCHFLOW_API_BASE_URL/health
```

### Erro: "Permission denied"

```bash
# Renovar credenciais
ag auth renew

# Verificar token
ag auth status

# Fazer login novamente
ag login
```

---

## 9️⃣ Próximos Passos

1. **Ler Documentação Completa**
   - Abrir `.agent/SKILLS_GUIDE.md` para guia detalhado
   - Revisar arquivo de configuração: `.agent/agent-config.yaml`

2. **Integrar com ArchFlow**
   - Implementar Server Actions que chamam skills
   - Criar endpoints de API que expõem skills
   - Integrar com componentes React

3. **Customizar Skills**
   - Adicionar novas skills conforme necessidade
   - Estender parâmetros existentes
   - Criar workflows automatizados

4. **Testar em Produção**
   - Deploy em staging: `.env.staging`
   - Monitoramento: configure alertas
   - Performance: profile e otimize

---

## 📚 Recursos

- **Documentação Oficial:** https://antigravity.google/docs/skills
- **API Reference:** `.agent/skills/` (cada arquivo YAML)
- **Chat Interativo:** `ag console`
- **Community:** https://discord.gg/antigravity-community

---

## 🤝 Suporte

Problemas? Verifique:

1. Logs: `ag logs --follow`
2. Status: `ag agent health`  
3. Issues: https://github.com/Italo520/ERP_ArchFlow_Arquiteture/issues
4. Documentação: `.agent/SKILLS_GUIDE.md`

---

**Pronto para começar!** 🊀

Execute:
```bash
ag agent start
```

E visite: `http://localhost:3001`

---

✅ **Setup Concluído!** Agora você pode usar o ArchFlow Agent com todos os seus superpowers! 🎉
