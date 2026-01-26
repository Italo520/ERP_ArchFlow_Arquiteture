# Guia de Skills - ArchFlow ERP com Antigravity

Documentação completa de como usar o agente IA especializado em ERP para escritórios de arquitetura.

**Última Atualização:** 18 de Janeiro de 2026
**Versão:** 1.0.0

## Índice

1. [Introdução](#introdução)
2. [Configuração Inicial](#configuração-inicial)
3. [Skills Disponíveis](#skills-disponíveis)
   - [Core ERP](#1-client-management-gestão-de-clientes)
   - [Development](#4-development-skills)
   - [Workflow & Tools](#5-workflow--utility-skills)
4. [Exemplos de Uso](#exemplos-de-uso)
5. [Boas Práticas](#boas-práticas)
6. [Troubleshooting](#troubleshooting)

---

## Introdução

O **ArchFlow Agent** é um agente de IA especializado em gerenciamento de ERP para arquitetos. Ele fornece capabilities de:

- ✅ Gestão de Clientes (CRUD completo, filtros, analytics)
- ✅ Gestão de Projetos (criação, atualização, rastreamento)
- ✅ Rastreamento de Atividades (logs, time tracking, relatórios)
- ✅ Analytics e Relatórios (KPIs, métricas de produtividade)

### Arquivos de Configuração

```
.agent/
├── agent-config.yaml              # Configuração principal
├── skills/
│   ├── project-management.yaml    # Skills de projetos
│   ├── client-management.yaml     # Skills de clientes
│   ├── activities-tracking.yaml   # Skills de atividades
│   └── deliverables.yaml          # Skills de entregas (em breve)
└── SKILLS_GUIDE.md               # Este arquivo
```

---

## Configuração Inicial

### Pré-requisitos

- Node.js 20+ instalado
- Antigravity CLI instalado: `npm install -g @antigravity/cli`
- Acesso à API do ArchFlow
- Token de autenticação

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# API
ARCHFLOW_API_BASE_URL=http://localhost:3000/api
AGENT_API_KEY=seu_token_aqui

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/archflow

# Storage
STORAGE_BUCKET=archflow-files

# Redis (opcional, para caching)
REDIS_URL=redis://localhost:6379

# Slack (opcional, para notificações)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# Email (opcional)
ADMIN_EMAIL=admin@archflow.local
```

### Ativação do Agente

```bash
# Login no Antigravity
ag login

# Carregar configuração
ag config load .agent/agent-config.yaml

# Validar skills
ag skills validate .agent/skills/

# Iniciar agente
ag agent start
```

---

## Skills Disponíveis

### 1. **Client Management** (Gestão de Clientes)

#### 1.1 Criar Novo Cliente

**Trigger:**
```
"Criar novo cliente"
"Adicionar cliente"
"New customer"
```

**Exemplo de Uso:**
```
Usuario: Criar novo cliente com nome 'Projeto XYZ Ltda', categoria COMMERCIAL
Agente: Entendido. Preciso de mais informações:
        - Email do cliente
        - Tipo legal (PF/PJ)
        - Documento (CPF/CNPJ)
        
Usuario: Email: contato@projetoxyz.com, PJ, CNPJ: 12.345.678/0001-90
Agente: [CRIANDO CLIENTE] ✅ Cliente criado com sucesso!
        ID: 550e8400-e29b-41d4-a716-446655440000
```

**Parâmetros:**
- `name` (obrigatório): Nome do cliente
- `email` (obrigatório): Email principal
- `legal_type` (obrigatório): PF ou PJ
- `document` (obrigatório): CPF ou CNPJ
- `category` (obrigatório): RESIDENTIAL, COMMERCIAL, INSTITUTIONAL, INDUSTRIAL, DESIGNER
- `phone`: Teléfono (opcional)
- `address`: Endereço (opcional)
- `contact_preference`: EMAIL, PHONE, WHATSAPP (padrão: EMAIL)

#### 1.2 Listar Clientes com Filtros

**Trigger:**
```
"Listar clientes"
"Mostrar todos os clientes"
"Buscar clientes"
```

**Exemplo:**
```
Usuario: Listar clientes COMMERCIAL que gastaram mais de R$50000
Agente: [BUSCANDO CLIENTES] ✅ Encontrados 3 clientes
        
        1. Projeto XYZ Ltda
           Email: contato@projetoxyz.com
           Gasto Total: R$ 85.500
           Projetos: 5
           Status: ACTIVE
        
        2. Construtura ABC
           Email: obras@abc.com
           Gasto Total: R$ 62.300
           Projetos: 3
           Status: ACTIVE
        
        (mais resultados...)
```

**Opções de Filtro:**
- `search`: Busca por nome, email ou documento
- `category`: RESIDENTIAL, COMMERCIAL, etc
- `status`: ACTIVE, PROSPECT, INACTIVE, BLOCKED
- `legal_type`: PF ou PJ
- `rating_min`: Avaliação mínima (0-5)
- `spent_min`: Gasto mínimo em reais
- `sort_by`: created_at, name, rating, total_spent
- `page`, `limit`: Paginação

#### 1.3 Obter Detalhes de Cliente

**Trigger:**
```
"Ver cliente"
"Detalhes do cliente"
"Show client info"
```

**Exemplo:**
```
Usuario: Ver detalhes do cliente Projeto XYZ Ltda
Agente: [CARREGANDO CLIENTE]
        
        🆒 Projeto XYZ Ltda
        ────────────────────
        Email: contato@projetoxyz.com
        Telefone: (83) 98765-4321
        CNPJ: 12.345.678/0001-90
        Tipo: PJ
        Categoria: COMMERCIAL
        Status: ACTIVE
        Avaliação: 4.8/5.0
        
        💲 Financeiro
        Gasto Total: R$ 85.500,00
        Projetos: 5
        Projetos Ativos: 2
        Projetos Completados: 3
        Valor Médio: R$ 17.100,00
        
        📄 Última Interação
        Data: 15 de Jan, 2026
        Tipo: MEETING
        Duração: 1h
```

#### 1.4 Atualizar Cliente

**Trigger:**
```
"Atualizar cliente"
"Editar cliente"
"Modificar cliente"
```

**Exemplo:**
```
Usuario: Atualizar cliente XYZ - status para PROSPECT
Agente: [ATUALIZANDO CLIENTE] ✅ Cliente atualizado!
        Campos alterados: status (ACTIVE -> PROSPECT)
```

#### 1.5 Importar Clientes (Bulk)

**Trigger:**
```
"Importar clientes"
"Upload em lote"
"Bulk import"
```

**Formato CSV esperado:**
```csv
name,email,phone,legal_type,document,category,city,state
Cliente A,cliente@a.com,8399999999,PJ,12.345.678/0001-90,COMMERCIAL,João Pessoa,PB
Cliente B,cliente@b.com,8388888888,PF,123.456.789-00,RESIDENTIAL,Campina Grande,PB
```

---

### 2. **Project Management** (Gestão de Projetos)

#### 2.1 Criar Novo Projeto

**Trigger:**
```
"Criar novo projeto"
"Novo projeto arquitetônico"
"Create new project"
```

**Exemplo:**
```
Usuario: Criar projeto para cliente XYZ, residencial, localização: João Pessoa - PB
Agente: [CRIANDO PROJETO] ✅ Projeto criado!
        ID: proj_12345678
        Status: CONCEPTUAL
        Criado em: 18/01/2026
        Cliente: Projeto XYZ Ltda
```

**Parâmetros:**
- `client_id` (obrigatório): ID do cliente
- `project_name` (obrigatório): Nome do projeto
- `project_type` (obrigatório): RESIDENTIAL, COMMERCIAL, INSTITUTIONAL, INDUSTRIAL, LANDSCAPE, INTERIOR
- `location` (obrigatório): Endereço (com lat/lng para mapa)
- `description`: Descrição
- `budget`: Orçamento em reais
- `estimated_hours`: Horas estimadas
- `deadline`: Data limite

#### 2.2 Listar Projetos

**Exemplo:**
```
Usuario: Listar meus projetos COMMERCIAL em progress
Agente: [BUSCANDO PROJETOS] ✅ Encontrados 3 projetos
        
        1. Prédio Comercial Centro
           Cliente: Construtura ABC
           Status: PRELIMINARY
           Progresso: 45%
           Orçamento: R$ 120.000
           Deadline: 30/03/2026
        
        (mais resultados...)
```

#### 2.3 Obter Estatísticas de Projeto

**Trigger:**
```
"Estações do projeto"
"Project analytics"
"Project metrics"
```

**Exemplo:**
```
Usuario: Mostrar métricas do projeto Prédio Comercial Centro
Agente: [ANALISANDO PROJETO]
        
        📊 Prédio Comercial Centro
        ────────────────────
        
        📄 Orçamento
        Total: R$ 120.000
        Gasto: R$ 54.000 (45%)
        Restante: R$ 66.000
        
        ⏰ Tempo
        Estimado: 480h
        Registrado: 215h (45%)
        Restante: 265h
        
        ✅ Progresso
        Geral: 45%
        Tarefas Completas: 12
        Tarefas Pendentes: 15
        
        👥 Equipe
        Membros: 4
        Papel Principal: Arquiteto
```

---

### 3. **Activities Tracking** (Rastreamento de Atividades)

#### 3.1 Registrar Atividade

**Trigger:**
```
"Registrar atividade"
"Nova atividade"
"Log activity"
```

**Exemplo:**
```
Usuario: Registrar reunião com cliente XYZ - 1.5 horas, hoje
Agente: [REGISTRANDO ATIVIDADE] ✅ Atividade criada!
        ID: act_87654321
        Tipo: MEETING
        Duração: 1h 30min
        Cliente: Projeto XYZ Ltda
        Data: 18/01/2026
        Status: COMPLETED
```

**Tipos de Atividades:**
- MEETING: Reunião
- CALL: Telefonema
- EMAIL: Correspondência
- SITE_VISIT: Visita ao local
- DESIGN: Trabalho de design
- REVISION: Revisão
- APPROVAL: Aprovação
- ADMIN: Tarefa administrativa
- OTHER: Outro

#### 3.2 Time Tracking (Rastreamento de Tempo)

**Iniciar Timer:**
```
Usuario: Começar rastreamento de tempo - desenhando fachada do projeto XYZ
Agente: [INICIANDO TIMER] ⏱️ Timer iniciado!
        Hora de Início: 14:30
        Tipo: DESIGN
        Projeto: Prédio Comercial Centro
        
        (timer rodando...)
```

**Parar Timer:**
```
Usuario: Parar rastreamento de tempo
Agente: [PARANDO TIMER] ✅ Tempo registrado!
        Duração: 2h 15min
        Horas: 2.25
        Valor (R$ 150/h): R$ 337,50
        Faturável: Sim
        Registrado em: Time Log #TL-2026-001
```

**Registrar Tempo Manual:**
```
Usuario: Registrar 3 horas de design para projeto XYZ em 15/01/2026
Agente: [REGISTRANDO TEMPO] ✅ Tempo registrado!
        Horas: 3.0
        Data: 15/01/2026
        Categoria: DESIGN
        Projeto: Prédio Comercial Centro
        Faturável: Sim
```

#### 3.3 Relatório de Tempo

**Trigger:**
```
"Relatório de horas"
"Time report"
"Resumo de tempo"
```

**Exemplo:**
```
Usuario: Relatório de tempo de janeiro
Agente: [GERANDO RELATÓRIO]
        
        ⏰ Janeiro 2026
        ────────────────────
        Total de Horas: 165.5h
        Horas Faturáveis: 145.0h (87.6%)
        Horas Não-Faturáveis: 20.5h (12.4%)
        Receita Potencial: R$ 21.750,00 (@ R$ 150/h)
        
        Por Tipo de Atividade:
        🔜 Design: 85.5h (51.6%)
        📁 Review: 40.0h (24.2%)
        👥 Meeting: 25.0h (15.1%)
        📋 Admin: 15.0h (9.1%)
        
        Dias Mais Produtivos:
        - Segunda: 12.5h
        - Terça: 11.8h
        - Quarta: 10.2h
```

#### 3.4 Estatísticas de Produtividade

**Trigger:**
```
"Minha produtividade"
"Productivity metrics"
"Estatísticas de produtividade"
```

**Exemplo:**
```
Usuario: Mostrar minha produtividade de janeiro
Agente: [ANALISANDO PRODUTIVIDADE]
        
        📈 Janeiro 2026
        ────────────────────
        Média de Horas/Dia: 7.9h
        Dias Trabalhados: 21
        
        % Faturável: 87.6% 👏
        Pico de Produtividade: 14:00 - 16:00
        Dia Mais Produtivo: Segunda (12.5h)
        
        Top 3 Atividades:
        1. Design (51.6%) - 85.5h
        2. Review (24.2%) - 40.0h
        3. Meeting (15.1%) - 25.0h
        
        Top 3 Projetos:
        1. Prédio Comercial Centro - 65.0h
        2. Casa Residencial - 48.5h
        3. Reformão Comercial - 35.0h
```

---

### 4. **Development Skills**

Estas skills fornecem diretrizes e padrões para o desenvolvimento do sistema. O agente as utiliza para garantir qualidade e consistência no código.

| Skill | Descrição e Uso |
|-------|-----------------|
| **backend-guidelines** | **Uso:** Criar endpoints, services e repositories.<br>**Descrição:** Padrões para Node.js/Express, camadas (Controller/Service), tratamento de erros e validação Zod. |
| **frontend-design** | **Uso:** Criar novas telas e componentes.<br>**Descrição:** Diretrizes de UI/UX para interfaces modernas, vibrantes e responsivas. Evita designs genéricos. |
| **react-ui-patterns** | **Uso:** Implementar lógica de UI.<br>**Descrição:** Patterns para loading states, error boundaries, data fetching e feedback visual. |
| **senior-fullstack** | **Uso:** Arquitetura geral e stack.<br>**Descrição:** Melhores práticas para Next.js 14+, Server Actions, Prisma e integração fullstack. |
| **software-architecture** | **Uso:** Revisão e planejamento.<br>**Descrição:** Princípios de Clean Architecture, SOLID e modularização. |
| **testing-patterns** | **Uso:** Escrever testes.<br>**Descrição:** Guia para testes unitários e de integração com Jest, incluindo factories e mocks. |
| **identidade-visual** | **Uso:** Estilização.<br>**Descrição:** Paleta de cores oficial, tipografia e design tokens do ArchFlow. |

### 5. **Workflow & Utility Skills**

Skills que auxiliam no fluxo de trabalho do agente e do desenvolvedor.

| Skill | Descrição e Uso |
|-------|-----------------|
| **git-pushing** | **Uso:** `ag commit` ou "push changes".<br>**Descrição:** Gera mensagens de commit convencionais e realiza push automático. |
| **systematic-debugging** | **Uso:** "Debugar erro X".<br>**Descrição:** Checklists e procedimentos para isolar e corrigir bugs complexos. |
| **verification-before-completion** | **Uso:** Antes de marcar tarefa como "Done".<br>**Descrição:** Garante que testes e builds rodem antes de finalizar. |
| **concise-planning** | **Uso:** "Planeje a task X".<br>**Descrição:** Cria planos de implementação detalhados e atômicos. |
| **workflow-automation** | **Uso:** Criar automações.<br>**Descrição:** Padrões para n8n e background jobs duráveis. |
| **pdf** | **Uso:** "Ler PDF" ou "Gerar relatório PDF".<br>**Descrição:** Extração de texto/tabelas e geração de documentos PDF. |
| **xlsx** | **Uso:** "Criar planilha".<br>**Descrição:** Manipulação avançada de Excel e CSV. |

---

## Exemplos de Uso

### Caso de Uso 1: Onboarding de Novo Cliente

```
Usuario: Vou trabalhar com um novo cliente. Deixa eu registrar?

Agente: Claro! Vou ajudar. Quais são as informações do cliente?

Usuario: Nome: Casa dos Sonhos Arquitetura, CPF: 123.456.789-00, 
         Email: contato@casadossonhos.com, Tipo: PF, Categoria: RESIDENTIAL

Agente: [CRIANDO CLIENTE]
        ✅ Cliente "Casa dos Sonhos Arquitetura" criado com sucesso!
        ID: cli_550e8400e29b41d4
        Status: PROSPECT
        
        Próximos passos:
        1. Criar primeiro projeto?
        2. Agendar atividade de contato?
        3. Adicionar como favorito?
```

### Caso de Uso 2: Gerenciar Projeto do Início ao Fim

```
# Criar Projeto
Usuario: Criar novo projeto residencial para Casa dos Sonhos, 
         João Pessoa, orçamento R$80k, prazo 90 dias

Agente: [CRIANDO PROJETO]
        ✅ Projeto "Casa dos Sonhos - Residencial" criado!
        ID: proj_a1b2c3d4
        Status: CONCEPTUAL
        Orçamento: R$ 80.000
        Prazo: 17/04/2026 (90 dias)

# Registrar Reunião de Briefing
Usuario: Registrar reunião de briefing com cliente - 2 horas

Agente: [REGISTRANDO ATIVIDADE]
        ✅ Atividade "Briefing" registrada!
        Cliente: Casa dos Sonhos
        Projeto: Casa dos Sonhos - Residencial
        Duração: 2h
        Horas Faturáveis: 2h (R$ 300 @ R$ 150/h)

# Iniciar Time Tracking para Design
Usuario: Começar a desenhar - projeto Casa dos Sonhos

Agente: [INICIANDO TIMER]
        ⏱️ Timer ativo para DESIGN
        Projeto: Casa dos Sonhos - Residencial
        Início: 14:35
        
        (2 horas depois...)

Usuario: Parar timer

Agente: [TEMPO REGISTRADO]
        ✅ 2.0h registradas para DESIGN
        Projeto: Casa dos Sonhos - Residencial
        Valor: R$ 300 (faturável)

# Ver Métricas do Projeto
Usuario: Como está o projeto?

Agente: [CONSULTANDO PROJETO]
        🆒 Casa dos Sonhos - Residencial
        Status: PRELIMINARY (30%)
        Orçamento: R$ 80.000 (Gasto: R$ 600 / 0.75%)
        Tempo: 4.0h de 532h estimadas
        Progresso: 4 tarefas de 20 completas
        Prazo: 17/04/2026 (89 dias)
```

### Caso de Uso 3: Relatório Gerencial

```
Usuario: Fazer relatório de produtividade janeiro vs dezembro

Agente: [GERANDO RELATÓRIO COMPARATIVO]
        
        📈 Produção: Janeiro vs Dezembro
        ────────────────────
        
        ⏰ Horas Registradas
        Janeiro: 165.5h (↑ 15%)
        Dezembro: 143.8h
        
        📄 Faturamento
        Janeiro: R$ 24.825 (↑ 18%)
        Dezembro: R$ 21.570
        
        ✅ Clientes Ativos
        Janeiro: 12 (↑ 3 novos)
        Dezembro: 9
        
        🆘 Top Cliente
        Construtura ABC: R$ 8.500
        
        📁 Top Projeto
        Prédio Comercial Centro: 65.0h (R$ 9.750)
```

---

## Boas Práticas

### 1. **Consistência de Dados**

- Sempre fornecer documentos válidos (CPF/CNPJ formatados)
- Usar códigos de status corretos (ACTIVE, PROSPECT, INACTIVE)
- Manter informações de contato atualizadas

### 2. **Segurança**

- Não compartilhar dados sensíveis em logs públicos
- Usar tokens API com expiração
- Auditar ações destrutivas regularmente

### 3. **Organização**

- Usar tags para categorizar clientes/projetos
- Manter descrições claras e concísas
- Registrar atividades no mesmo dia (evitar backlog)

### 4. **Faturamento**

- Sempre marcar atividades como "faturável" ou não
- Registrar horas com precisão (evitar arredondamentos)
- Revisar relatórios mensalmente

---

## Troubleshooting

### Problema: "Agent not responding"

**Solução:**
1. Verificar variáveis de ambiente
2. Validar token API: `ag auth status`
3. Testar conexão: `ag health check`
4. Reiniciar agente: `ag agent restart`

### Problema: "Permission denied"

**Solução:**
1. Verificar permissões do usuário
2. Validar escopo do token
3. Usar `ag auth renew` para renovar credenciais

### Problema: "Skill not found"

**Solução:**
1. Validar arquivo de configuração: `ag config validate`
2. Recarregar skills: `ag skills reload`
3. Verificar sintaxe YAML

### Problema: "Database connection timeout"

**Solução:**
1. Verificar DATABASE_URL
2. Testar conexão: `psql $DATABASE_URL`
3. Aumentar timeout em agent-config.yaml

---

## Suporte

- **GitHub Issues**: [projeto/issues](https://github.com/Italo520/ERP_ArchFlow_Arquiteture/issues)
- **Documentação Antigravity**: https://antigravity.google/docs/skills
- **Email**: italo520@example.com

---

**Última Atualização:** 18/01/2026 ✅
