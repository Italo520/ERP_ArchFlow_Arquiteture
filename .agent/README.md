# 🤘 ArchFlow Antigravity Agent

Agente de IA especializado em ERP para escritórios de arquitetura, com suporte a gerenciamento de clientes, projetos, atividades e relatórios.

<div align="center">

[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![Status](https://img.shields.io/badge/status-active-green)]()
[![Python](https://img.shields.io/badge/language-YAML%2FAPI-orange)]()
[![License](https://img.shields.io/badge/license-MIT-success)]()

**Acesse:** [📖 Quick Start](./QUICK_START.md) | [📘 Skills Guide](./SKILLS_GUIDE.md) | [🖮️ FAQ](#faq)

</div>

---

## 🌟 Características

### 👥 Gestão de Clientes
- Criar/editar/deletar clientes
- Filtros avançados (categoria, status, gasto mínimo)
- Analytics por cliente (receita, projetos, atividades)
- Import/export em lote (CSV)
- Rastreamento de últimas interações

### 📊 Gestão de Projetos  
- Ciclo de vida completo (CONCEPTUAL → COMPLETED)
- Rastreamento de orçamento vs. gasto real
- Progressão visual
- Está de tarefas e entregas
- Integração com mapa (lat/lng)

### ⏰ Rastreamento de Atividades
- Timer em tempo real
- Registro manual de tempo
- 9 tipos de atividades (meeting, design, review, etc)
- Relação com clientes/projetos/tarefas
- Rastreamento de faturabilidade

### 📈 Analytics e Relatórios
- Produtividade por período
- Receita potencial
- Top clientes/projetos
- Taxa de faturamento
- Tendências mensais

---

## 🚀 Começar Rapidamente

### 1. Instalar Antigravity CLI

```bash
npm install -g @antigravity/cli
ag login  # Fazer login com Google
```

### 2. Clonar Repositório

```bash
git clone https://github.com/Italo520/ERP_ArchFlow_Arquiteture.git
cd ERP_ArchFlow_Arquiteture
```

### 3. Configurar Ambiente

```bash
cp .env.example .env.local
# Editar variáveis: DATABASE_URL, AGENT_API_KEY, etc
```

### 4. Iniciar Agente

```bash
ag config load .agent/agent-config.yaml
ag skills load .agent/skills/
ag agent start
```

### 5. Testar

```bash
# Em outro terminal
ag skill call client-management create_client \
  --name "Teste" \
  --email "teste@example.com" \
  --legal_type "PJ" \
  --document "12.345.678/0001-90" \
  --category "COMMERCIAL"
```

퉰5 Pronto! Agente rodando em `http://localhost:3001`

---

## 📃 Arquivos de Configuração

### agent-config.yaml
Configuração principal do agente (permissões, integrações, limites).

```yaml
name: ArchFlow Agent
capabilities:
  - client_management
  - project_management
  - activities_tracking
  - reporting
```

### skills/
Arquivos YAML definindo each skill (ações que o agente pode executar).

| Arquivo | Skills | Descrição |
|---------|--------|-------------|
| **project-management.yaml** | 6 | Criação, atualização, listagem e analytics de projetos |
| **client-management.yaml** | 8 | CRUD completo de clientes + import/export |
| **activities-tracking.yaml** | 8 | Time tracking, registros de atividades, relatórios |

**Total:** 22 skills disponibles

---

## 🧅 Skills Disponíveis

### Client Management (8 Skills)

```yaml
1. create_client              # Criar novo cliente
2. get_client                 # Obter detalhes
3. list_clients               # Listar com filtros
4. update_client              # Atualizar informações
5. get_client_projects        # Listar projetos
6. get_client_stats           # Analytics do cliente
7. bulk_import_clients        # Import CSV
8. export_clients             # Export CSV/JSON
```

### Project Management (6 Skills)

```yaml
1. create_project             # Criar novo projeto
2. get_project                # Obter detalhes
3. list_projects              # Listar com filtros
4. update_project             # Atualizar
5. delete_project             # Deletar (soft)
6. get_project_stats          # Estatísticas
```

### Activities Tracking (8 Skills)

```yaml
1. log_activity               # Registrar atividade
2. start_time_tracking        # Iniciar timer
3. stop_time_tracking         # Parar e registrar
4. log_time_manual            # Registrar tempo manualmente
5. list_activities            # Listar atividades
6. get_time_report            # Relatório de tempo
7. get_productivity_stats     # Estatísticas de produtividade
8. update_activity            # Atualizar atividade
```

---

## 📢 Exemplos de Uso

### Criar Cliente

```bash
ag skill call client-management create_client \
  --name "Casa Arquitetura" \
  --email "contato@casa.com" \
  --phone "83987654321" \
  --legal_type "PJ" \
  --document "12.345.678/0001-90" \
  --category "RESIDENTIAL" \
  --contact_preference "WHATSAPP"
```

**Resposta:**
```json
{
  "id": "cli_550e8400e29b41d4",
  "name": "Casa Arquitetura",
  "status": "PROSPECT",
  "created_at": "2026-01-18T20:50:00Z",
  "message": "Cliente criado com sucesso!"
}
```

### Criar Projeto

```bash
ag skill call project-management create_project \
  --client_id "cli_550e8400e29b41d4" \
  --project_name "Casa de Sonhos - Residencial" \
  --project_type "RESIDENTIAL" \
  --location '{
    "address": "Rua das Flores, 123",
    "city": "João Pessoa",
    "state": "PB",
    "zip_code": "58000-000",
    "latitude": -7.1156,
    "longitude": -34.8450
  }' \
  --budget 80000 \
  --estimated_hours 480 \
  --deadline "2026-04-18"
```

### Iniciar Time Tracking

```bash
# Iniciar
ag skill call activities-tracking start_time_tracking \
  --activity_type "DESIGN" \
  --description "Desenhando fachada principal" \
  --project_id "proj_a1b2c3d4" \
  --billable true

# (2 horas depois)

# Parar
ag skill call activities-tracking stop_time_tracking \
  --timer_id "timer_xyz123"
```

### Gerar Relatório

```bash
ag skill call activities-tracking get_time_report \
  --period "month" \
  --group_by "project" \
  --include_billable true
```

---

## 🗐️ Estrutura de Dados

### Cliente
```typescript
type Client = {
  id: string                      // UUID
  name: string                    // Nome do cliente
  email: string                   // Email (unique)
  phone?: string                  // Telefone
  legal_type: "PF" | "PJ"         // Tipo legal
  document: string                // CPF ou CNPJ (unique)
  category: ClientCategory        // Categoria
  status: "ACTIVE" | "PROSPECT" | "INACTIVE" | "BLOCKED"
  rating: 0-5                     // Avaliação
  total_spent: number             // Total gasto (calculated)
  address: Address                // Endereço completo
  contact_preference: "EMAIL" | "PHONE" | "WHATSAPP"
  tags: string[]                  // Tags de categorização
  last_interaction?: DateTime     // Última interação
  created_at: DateTime
  updated_at: DateTime
  deleted_at?: DateTime           // Soft delete
}
```

### Projeto
```typescript
type Project = {
  id: string
  name: string
  client_id: string               // FK to Client
  type: ProjectType               // RESIDENTIAL, COMMERCIAL, etc
  status: ProjectStatus           // CONCEPTUAL, PRELIMINARY, etc
  description?: string
  location: GeoLocation          // Com lat/lng para mapa
  budget?: number                 // Orçamento em reais
  spent: number                   // Gasto atual (calculated)
  progress: 0-100                 // Percentual (0-100)
  estimated_hours?: number        // Horas estimadas
  logged_hours: number            // Horas registradas
  deadline?: DateTime
  created_at: DateTime
  updated_at: DateTime
  deleted_at?: DateTime
}
```

### Atividade
```typescript
type Activity = {
  id: string
  type: ActivityType              // MEETING, CALL, DESIGN, etc
  title: string
  description?: string
  client_id: string               // FK
  project_id?: string             // FK (opcional)
  task_id?: string                // FK (opcional)
  duration_minutes: number        // Duração em minutos
  start_time: DateTime
  end_time?: DateTime
  location?: string
  participants: string[]          // IDs de usuários
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
  created_at: DateTime
}
```

---

## 💾 Variáveis de Ambiente

```bash
# API
ARCHFLOW_API_BASE_URL=http://localhost:3000/api
AGENT_API_KEY=seu_token_secreto_aqui

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/archflow_dev

# Storage (Supabase)
STORAGE_BUCKET=archflow-files-dev
STORAGE_API_KEY=sua_chave_supabase

# Cache (Redis, opcional)
REDIS_URL=redis://localhost:6379

# Notificações (opcional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
ADMIN_EMAIL=admin@archflow.local

# Debug
DEBUG=true
LOG_LEVEL=info
```

---

## 🎧 Arquitetura

```
┌──────────────────────────────┐
│        Frontend (Next.js + React)               │
│     (Components usando skills)                 │
└──────────────────────────────┘
            │
            ↓
┌──────────────────────────────┐
│    API Layer (Server Actions)                  │
│     (endpoints que chamam skills)              │
└──────────────────────────────┘
            │
            ↓
┌──────────────────────────────┐
│  Antigravity Agent (22 Skills)                │
│  - Client Management (8)                      │
│  - Project Management (6)                     │
│  - Activities Tracking (8)                    │
└──────────────────────────────┘
            │
            ↓
┌──────────────────────────────┐
│     Database (PostgreSQL + Prisma)           │
│     - Clients, Projects, Activities           │
│     - Time Logs, Deliverables                 │
└──────────────────────────────┘
```

---

## 🗘️ FAQ

### P: Como adicionar novas skills?
**R:** Criar arquivo YAML em `.agent/skills/` seguindo o formato existente e recarregar com `ag skills reload`.

### P: Como integrar com servidor externo?
**R:** Configurar `ARCHFLOW_API_BASE_URL` no `.env.local` e ajustar `integrations` em `agent-config.yaml`.

### P: Posso usar em ambiente de produção?
**R:** Sim, com as devidas configurações de segurança (HTTPS, JWT, rate limiting, etc).

### P: Como fazer backup dos dados?
**R:** Use ferramentas nativas de PostgreSQL: `pg_dump` ou configure snapshots automáticos em Supabase.

### P: Qual o limite de requisições?
**R:** 60 req/minuto, 1000 req/hora (configurável em `agent-config.yaml`).

---

## 📚 Documentação

- **Quick Start:** [QUICK_START.md](./QUICK_START.md) - Setup em 5 minutos
- **Skills Guide:** [SKILLS_GUIDE.md](./SKILLS_GUIDE.md) - Documentação completa com exemplos
- **API Config:** [agent-config.yaml](./agent-config.yaml) - Configuração do agente
- **Projeto:** [ArchFlow ERP](https://github.com/Italo520/ERP_ArchFlow_Arquiteture)

---

## 🤛 Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit suas mudanças: `git commit -am 'Add: descrição'`
4. Push: `git push origin feature/sua-feature`
5. Abra um Pull Request

---

## 📄 License

MIT License - veja [LICENSE](../LICENSE) para detalhes.

---

## 👋 Suporte

- **Issues:** [GitHub Issues](https://github.com/Italo520/ERP_ArchFlow_Arquiteture/issues)
- **Email:** italo520@example.com
- **Docs:** https://antigravity.google/docs/skills

---

<div align="center">

**Desenvolvido com ❤️ por [Itálo Santos](https://github.com/Italo520)**

**Última Atualização:** 18 de Janeiro de 2026

[🔜 Skills Guide](./SKILLS_GUIDE.md) • [🚀 Quick Start](./QUICK_START.md) • [🌐 GitHub](https://github.com/Italo520/ERP_ArchFlow_Arquiteture)

</div>
