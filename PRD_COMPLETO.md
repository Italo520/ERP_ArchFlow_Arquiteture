# 📋 PRD Completo - ArchFlow ERP
## Sistema de Gestão de Projetos Arquitetônicos e Carteira de Clientes

**Versão:** 2.0  
**Data:** Janeiro 2026  
**Status:** Em Desenvolvimento  
**Foco:** Gestão de atividades de arquiteto + Carteira de clientes  

---

## 📑 Índice

1. [Visão Geral](#visão-geral)
2. [Fase 1: Consolidação do Backend](#fase-1-consolidação-do-backend)
3. [Fase 2: Gestão de Clientes](#fase-2-gestão-de-clientes)
4. [Fase 3: Gestão de Projetos Arquitetônicos](#fase-3-gestão-de-projetos-arquitetônicos)
5. [Fase 4: Gestão de Atividades do Arquiteto](#fase-4-gestão-de-atividades-do-arquiteto)
6. [Fase 5: Dashboard e Relatórios](#fase-5-dashboard-e-relatórios)
7. [Fase 6: Colaboração e Comunicação](#fase-6-colaboração-e-comunicação)
8. [Fase 7: Funcionalidades Avançadas](#fase-7-funcionalidades-avançadas)
9. [Fase 8: PWA e Deployment](#fase-8-pwa-e-deployment)

---

## 🎯 Visão Geral

O **ArchFlow ERP** é um sistema full-stack Next.js 16 para gestão completa de projetos arquitetônicos, com foco em:

- **Carteira de Clientes:** Gestão centralizada de clientes, contatos e histórico
- **Gestão de Projetos:** Acompanhamento desde conceitual até execução
- **Atividades do Arquiteto:** Tarefas, prazos, entregas e produtividade
- **Colaboração:** Comunicação interna e com clientes
- **Relatórios:** Análise de performance, receitas e utilização de tempo

### Stack Técnico Atual
- **Framework:** Next.js 16.1.1 (App Router & Server Actions)
- **Banco de Dados:** PostgreSQL via Supabase
- **ORM:** Prisma 7.2
- **UI:** Tailwind CSS v4, Radix UI, Shadcn/UI
- **Autenticação:** NextAuth v5 Beta
- **Drag & Drop:** @dnd-kit
- **Rich Text:** TipTap
- **Gráficos:** Recharts

---

# ✅ FASE 1: Consolidação do Backend
## Estrutura de dados e Server Actions base

## 1.1 Esquema Prisma Avançado
- [x] User model com roles (OWNER, EDITOR, VIEWER)
- [x] Project model com campos arquitetônicos
- [x] Stage model para workflow
- [x] Task model com prioridades e tags
- [x] ProjectMember para colaboração
- [x] AuditLog para rastreabilidade
- [x] Notification model
- [ ] **Client Model (NOVO)**
  - [ ] Estender com campos específicos: CNPJ/CPF, razão social, endereço
  - [ ] Adicionar relacionamento com Projects (1:N)
  - [ ] Histórico de transações
  - [ ] Rating e avaliação
  - [ ] Campos de contato (telefone, email, website)
  - [ ] Categoria/Segmento de negócio
  - [ ] Status (Ativo, Inativo, Prospect)
- [ ] **Activity Model (NOVO)** - Para rastreamento de atividades do arquiteto
  - [ ] type (MEETING, CALL, EMAIL, SITE_VISIT, DESIGN, REVISION, APPROVAL)
  - [ ] duration (em minutos)
  - [ ] description
  - [ ] participants (array de IDs de usuários)
  - [ ] relação com Task, Project e Client
  - [ ] dataTime (quando ocorreu)
- [ ] **Deliverable Model (NOVO)**
  - [ ] type (SKETCH, RENDER, DRAWING, DOCUMENT, VIDEO)
  - [ ] status (IN_PROGRESS, PENDING_APPROVAL, APPROVED, DELIVERED)
  - [ ] fileUrl
  - [ ] version
  - [ ] revisionsRequired (array de comentários)
  - [ ] relação com Task e Project
- [ ] **TimeLog Model (NOVO)** - Para rastreamento de tempo dedicado
  - [ ] duration (horas)
  - [ ] taskId
  - [ ] projectId
  - [ ] userId
  - [ ] description
  - [ ] date
  - [ ] category (Design, Revision, Meeting, Admin)

## 1.2 Prisma Migrations e Seed
- [ ] Criar migration para novos models
  - [ ] Cliente model
  - [ ] Activity model
  - [ ] Deliverable model
  - [ ] TimeLog model
- [ ] Executar `npx prisma migrate dev`
- [ ] Criar seed script (`prisma/seed.ts`)
  - [ ] 3-5 usuários de teste
  - [ ] 5-10 clientes fictícios
  - [ ] 10-15 projetos relacionados
  - [ ] Executar com `npx prisma db seed`

## 1.3 Melhorias no Schema Prisma
- [ ] Adicionar indexes para performance
  - [ ] `@@index([userId])` em vários modelos
  - [ ] `@@index([projectId])` em vários modelos
  - [ ] `@@index([clientId])` em Project
  - [ ] `@@index([createdAt])` para queries de data
- [ ] Validações em cascade delete
- [ ] Soft deletes (adicionar campo `deletedAt`)
  - [ ] User model
  - [ ] Project model
  - [ ] Client model

---

# ✅ FASE 2: Gestão de Clientes
## Módulo completo de carteira de clientes

## 2.1 Server Actions para Clientes
- [ ] **`actions/client.ts`** - Criar novo arquivo
  - [ ] `createClient(data)` - Criar novo cliente
    - [ ] Validar CPF/CNPJ
    - [ ] Verificar duplicidade de email
    - [ ] Enviar email de boas-vindas (queue)
  - [ ] `getClientById(id)` - Recuperar cliente específico
  - [ ] `getAllClients()` - Listar todos com paginação
  - [ ] `updateClient(id, data)` - Atualizar dados
  - [ ] `deleteClient(id)` - Soft delete
  - [ ] `getClientProjects(clientId)` - Projetos do cliente
  - [ ] `getClientStats(clientId)` - Estatísticas (total gasto, projetos, atividades)

## 2.2 Páginas do Frontend - Clientes
- [ ] **`app/(dashboard)/clients/page.tsx`** - Listagem
  - [ ] Tabela com paginação
    - [ ] Nome, status, email, telefone
    - [ ] Total de projetos
    - [ ] Data de cadastro
    - [ ] Ações (editar, excluir, visualizar projetos)
  - [ ] Filtros
    - [ ] Por status (Ativo/Inativo/Prospect)
    - [ ] Por segmento
    - [ ] Busca por nome/email
    - [ ] Ordenação (A-Z, data, valor total)
  - [ ] Botão "+ Novo Cliente"
  - [ ] Export em CSV/PDF
- [ ] **`app/(dashboard)/clients/[id]/page.tsx`** - Detalhe cliente
  - [ ] Informações gerais
    - [ ] Logo/Avatar
    - [ ] Dados básicos (nome, CNPJ, email, telefone, site)
    - [ ] Endereço completo
    - [ ] Status
  - [ ] Aba "Projetos"
    - [ ] Lista de todos os projetos
    - [ ] Status e progresso
    - [ ] Data início/fim
  - [ ] Aba "Atividades"
    - [ ] Timeline de encontros, calls, emails
    - [ ] Últimas interações
  - [ ] Aba "Documentos"
    - [ ] Contratos
    - [ ] Orçamentos
    - [ ] Autorizações
  - [ ] Aba "Histórico Financeiro"
    - [ ] Faturas
    - [ ] Pagamentos
    - [ ] Saldo
  - [ ] Formulário de edição (Modal ou inline)
  - [ ] Histórico de alterações (audit log)
- [ ] **`app/(dashboard)/clients/new/page.tsx`** - Criar novo
  - [ ] Formulário completo
    - [ ] Nome/Razão Social
    - [ ] CPF/CNPJ com validação
    - [ ] Email
    - [ ] Telefone
    - [ ] Website (opcional)
    - [ ] Endereço (rua, número, CEP, cidade, estado)
    - [ ] Segmento/Categoria
    - [ ] Status inicial
    - [ ] Observações
  - [ ] Upload de logo (imagem)
  - [ ] Validação em tempo real
  - [ ] Salvar e abrir ficha ou criar novo

## 2.3 Componentes React - Clientes
- [ ] **`components/clients/ClientForm.tsx`**
  - [ ] Formulário reutilizável (create/edit)
  - [ ] Validação com Zod
  - [ ] Campos obrigatórios destacados
- [ ] **`components/clients/ClientCard.tsx`**
  - [ ] Card compacto com info resumida
  - [ ] Usado em listas e dashboards
- [ ] **`components/clients/ClientTable.tsx`**
  - [ ] Tabela com sorting e filtering
  - [ ] Seleção múltipla (bulk actions)
- [ ] **`components/clients/ClientStats.tsx`**
  - [ ] Cards mostrando:
    - [ ] Total de clientes
    - [ ] Clientes ativos
    - [ ] Prospects
    - [ ] Receita total anual

---

# ✅ FASE 3: Gestão de Projetos Arquitetônicos
## Ampliação de campos específicos para arquitetura

## 3.1 Extensão do Model Project
- [ ] Adicionar campos arquitetônicos:
  - [ ] `projectType` - Enum (RESIDENCIAL, COMERCIAL, INSTITUCIONAL, INDUSTRIAL, REFORMA, INTERIORES)
  - [ ] `address` - Endereço completo do projeto
  - [ ] `totalArea` - Área total em m²
  - [ ] `constructionArea` - Área de construção
  - [ ] `builtArea` - Área já construída
  - [ ] `zoneType` - Tipo de zoneamento
  - [ ] `environmentCount` - Número de ambientes
  - [ ] `buildingLevels` - Quantos andares
  - [ ] `registrationNumber` - Número de matrícula do imóvel
  - [ ] `propertyDetails` - JSON com especificidades

## 3.2 Server Actions para Projetos (EXPANDIR)
- [ ] Expandir `actions/project.ts`
  - [ ] `duplicateProject(id)` - Duplicar projeto
  - [ ] `changeProjectStatus(id, status)` - Workflow
    - [ ] BRIEFING → CONCEITUAL → ANTEPROJETO → PROJETO_EXECUTIVO → EXECUÇÃO → FINALIZADO
  - [ ] `addProjectMember(projectId, userId, role)` - Adicionar colaborador
  - [ ] `removeProjectMember(projectId, userId)`
  - [ ] `updateProjectProgress(id, percentage)`
  - [ ] `getProjectTimeline(id)` - Retornar milestones
  - [ ] `attachFileToProject(projectId, file)` - Upload
  - [ ] `generateProjectReport(id)` - Gerar relatório

## 3.3 Páginas Expandidas - Projetos
- [ ] **`app/(dashboard)/projects/page.tsx`** - Listagem (MELHORAR)
  - [ ] Modo Grid (cards visuais) + Modo Tabela
    - [ ] Alternar com botões
    - [ ] Salvar preferência do usuário
  - [ ] Filtros avançados
    - [ ] Por tipo de projeto
    - [ ] Por status
    - [ ] Por cliente
    - [ ] Por período (data início/fim)
    - [ ] Por área (range)
  - [ ] Busca por nome/cliente/endereço
  - [ ] Ordenação múltipla
  - [ ] Ações em bulk
    - [ ] Mudar status em lote
    - [ ] Atribuir a usuário
    - [ ] Exportar
- [ ] **`app/(dashboard)/projects/[id]/page.tsx`** - Detalhe projeto (EXPANDIR)
  - [ ] Aba "Overview"
    - [ ] Info gerais com mapa (Google Maps API)
    - [ ] Status e progresso (barra visual)
    - [ ] Timeline de fases
    - [ ] Próximas atividades
  - [ ] Aba "Kanban" (já existe, MANTER)
    - [ ] Drag & drop de tasks
    - [ ] Visualização de colaboradores
  - [ ] Aba "Documentos"
    - [ ] Sketches, renders, plantas
    - [ ] Versioning de desenhos
    - [ ] Histórico de revisões
  - [ ] Aba "Galeria"
    - [ ] Visualização de imagens/renders
    - [ ] Comparação antes/depois
  - [ ] Aba "Colaboradores"
    - [ ] Lista de membros + roles
    - [ ] Histórico de contribuições
  - [ ] Aba "Financeiro"
    - [ ] Orçamento original vs. realizado
    - [ ] Custos por fase
    - [ ] Faturas geradas
  - [ ] Aba "Histórico"
    - [ ] Timeline completa de alterações
    - [ ] Quem alterou o quê e quando
- [ ] **`app/(dashboard)/projects/new/page.tsx`** - Criar novo (EXPANDIR)
  - [ ] Wizard de 3 passos
    - [ ] Passo 1: Dados básicos
      - [ ] Nome, cliente, tipo de projeto
      - [ ] Data de início (sugerida)
    - [ ] Passo 2: Dados arquitetônicos
      - [ ] Endereço completo com CEP autocomplete
      - [ ] Áreas, níveis, ambientes
      - [ ] Zoneamento, matrícula
    - [ ] Passo 3: Configuração
      - [ ] Membros iniciais
      - [ ] Templates de stages (customizável)
      - [ ] Deadline (opcional)
  - [ ] Salvar como template para reutilizar

## 3.4 Componentes - Projetos
- [ ] **`components/projects/ProjectWizard.tsx`**
  - [ ] Wizard de criação com validação
- [ ] **`components/projects/ProjectMap.tsx`**
  - [ ] Integração Google Maps
  - [ ] Mostrar localização do projeto
- [ ] **`components/projects/ProjectGallery.tsx`**
  - [ ] Lightbox de imagens
  - [ ] Upload de novos renders/fotos
- [ ] **`components/projects/VersionHistory.tsx`**
  - [ ] Timeline de versões
  - [ ] Comparação entre versões
  - [ ] Rollback de versão (admin)

---

# ✅ FASE 4: Gestão de Atividades do Arquiteto
## Rastreamento completo de atividades e produtividade

## 4.1 Server Actions para Atividades
- [ ] **`actions/activity.ts`** - Novo arquivo
  - [ ] `createActivity(data)` - Registrar nova atividade
    - [ ] Validar tipo e duração
    - [ ] Auto-update de tempo total no projeto
  - [ ] `getActivitiesByProject(projectId, filter)` - Timeline do projeto
  - [ ] `getActivitiesByUser(userId, dateRange)` - Atividades do usuário
  - [ ] `getActivitiesByClient(clientId)` - Atividades com cliente
  - [ ] `updateActivity(id, data)` - Editar atividade
  - [ ] `deleteActivity(id)` - Remover
  - [ ] `logTimeActivity(data)` - Registrar tempo dedicado
  - [ ] `bulkCreateActivities(data[])` - Criar múltiplas
  - [ ] `getActivityAnalytics(userId, dateRange)` - Estatísticas
    - [ ] Tempo por categoria
    - [ ] Tempo por cliente
    - [ ] Tempo por projeto
    - [ ] Atividades mais frequentes

## 4.2 Páginas - Atividades
- [ ] **`app/(dashboard)/activities/page.tsx`** - Dashboard de atividades
  - [ ] Vista de calendário (Month view padrão)
    - [ ] Clicar em dia para ver atividades
    - [ ] Cores diferentes por tipo
    - [ ] Indicador de horas dedicadas
  - [ ] Vista semanal (Week view)
  - [ ] Vista diária (Day view)
  - [ ] Vista em lista
  - [ ] Filtros
    - [ ] Por tipo
    - [ ] Por período
    - [ ] Por projeto
    - [ ] Por cliente
  - [ ] Botão "+Nova atividade"
- [ ] **`app/(dashboard)/activities/log-time/page.tsx`** - Registrar tempo
  - [ ] Formulário rápido de time tracking
    - [ ] Projeto (dropdown com buscador)
    - [ ] Tarefa (related ao projeto selecionado)
    - [ ] Categoria (Design/Meeting/Revision/Admin/etc)
    - [ ] Duração (horas/minutos com spinner)
    - [ ] Descrição breve
    - [ ] Data (default hoje)
  - [ ] Timer pomodoro integrado (opcional)
  - [ ] Histórico das últimas atividades
  - [ ] Sugestões baseado em padrões
- [ ] **`app/(dashboard)/activities/[id]/page.tsx`** - Detalhe atividade
  - [ ] Informações completas
  - [ ] Comentários relacionados
  - [ ] Atividades similares
  - [ ] Edição inline

## 4.3 Componentes - Atividades
- [ ] **`components/activities/ActivityCalendar.tsx`**
  - [ ] Calendário customizado
  - [ ] Integração com bibliotecas (react-big-calendar, full-calendar)
- [ ] **`components/activities/ActivityForm.tsx`**
  - [ ] Formulário com tipos: MEETING, CALL, EMAIL, SITE_VISIT, DESIGN, REVISION
  - [ ] Auto-suggest de projetos/clientes
- [ ] **`components/activities/TimeLogger.tsx`**
  - [ ] Interface rápida para registrar tempo
  - [ ] Timer integrado
  - [ ] Sugestões smart
- [ ] **`components/activities/ActivityTimeline.tsx`**
  - [ ] Timeline visual de atividades
  - [ ] Agrupado por período
- [ ] **`components/activities/ActivityStats.tsx`**
  - [ ] Gráficos de distribuição de tempo
  - [ ] Horas por categoria
  - [ ] Horas por cliente

## 4.4 Deliverables Management
- [ ] **`actions/deliverable.ts`** - Novo arquivo
  - [ ] `createDeliverable(data)` - Upload de entrega
    - [ ] Salvar arquivo (S3 ou Supabase)
    - [ ] Gerar preview se imagem
    - [ ] Versioning automático
  - [ ] `updateDeliverableStatus(id, status)` - Mudar status
    - [ ] IN_PROGRESS → PENDING_APPROVAL → APPROVED → DELIVERED
  - [ ] `addRevisionRequest(deliverableId, comment)` - Solicitar revisão
  - [ ] `approveDeliverable(id)`
  - [ ] `getDeliverablesByProject(projectId)`
  - [ ] `getDeliverablesByTask(taskId)`

- [ ] **Páginas e Componentes**
  - [ ] **`components/deliverables/DeliverableUpload.tsx`**
    - [ ] Drag & drop zone
    - [ ] Validação de tipo de arquivo
    - [ ] Preview antes de salvar
    - [ ] Metadata (tipo, descrição, versão)
  - [ ] **`components/deliverables/DeliverableViewer.tsx`**
    - [ ] Viewer de imagens/PDFs
    - [ ] Download button
    - [ ] Comentários/Revisões
  - [ ] **`components/deliverables/RevisionHistory.tsx`**
    - [ ] Timeline de versões
    - [ ] Diff visual (se imagem)
    - [ ] Rollback option (admin)

## 4.5 Time Tracking Avançado
- [ ] **`actions/timeLog.ts`** - Novo arquivo
  - [ ] `logTime(data)` - Registrar horas gastas
  - [ ] `getTimeLogsByUser(userId, dateRange)` - Relatório de horas
  - [ ] `getTimeLogsByProject(projectId)` - Horas por projeto
  - [ ] `getTimeLogsByTask(taskId)` - Horas por tarefa
  - [ ] `getTimeAnalytics(userId/projectId, dateRange)` - Análises
  - [ ] `bulkImportTimeLogs(data[])` - Importar de spreadsheet

- [ ] **Páginas**
  - [ ] **`app/(dashboard)/time-tracking/page.tsx`** - Dashboard de horas
    - [ ] Resumo da semana/mês
    - [ ] Progresso vs. meta
    - [ ] Horas por projeto (pie chart)
    - [ ] Horas por cliente (bar chart)
    - [ ] Timeline de horas dia a dia
  - [ ] **`app/(dashboard)/time-tracking/reports/page.tsx`** - Relatórios detalhados
    - [ ] Filtros: período, projeto, cliente, usuário
    - [ ] Exportar para Excel
    - [ ] Gráficos customizáveis

---

# ✅ FASE 5: Dashboard e Relatórios
## Visão consolidada de KPIs e métricas

## 5.1 Dashboard Principal
- [ ] **`app/(dashboard)/dashboard/page.tsx`** - Expandir e melhorar
  - [ ] **Seção de Bem-vindo**
    - [ ] Saudação personalizada
    - [ ] Próximas atividades (3 próximas)
    - [ ] Tarefas urgentes
  - [ ] **KPIs Cards** (4 cards principais)
    - [ ] Projetos Ativos
    - [ ] Tarefas em Atraso
    - [ ] Atividades esta semana
    - [ ] Receita este mês
  - [ ] **Gráfico 1: Projeto por Status**
    - [ ] Donut chart (Recharts)
    - [ ] Cores por status
  - [ ] **Gráfico 2: Timeline de Projetos**
    - [ ] Gantt chart simplificado
    - [ ] Mostrar upcoming vs. ongoing
  - [ ] **Gráfico 3: Utilização de Tempo**
    - [ ] Stack bar chart
    - [ ] Por projeto/cliente
  - [ ] **Gráfico 4: Pipeline de Clientes**
    - [ ] Funnel de prospects → clientes ativos
  - [ ] **Tabela: Projetos em Atraso**
    - [ ] Top 5 com mais atrasos
    - [ ] Ações rápidas
  - [ ] **Tabela: Próximas Entregas**
    - [ ] Top 5 de próximos deliverables
    - [ ] Tempo restante

## 5.2 Relatórios Analíticos
- [ ] **`app/(dashboard)/reports/page.tsx`** - Hub de relatórios
  - [ ] Menu de seleção de relatório
  - [ ] Filtros comuns (período, projeto, cliente, usuário)

- [ ] **`app/(dashboard)/reports/performance/page.tsx`** - Performance
  - [ ] Projetos concluídos vs. planejado
  - [ ] Atrasos médios
  - [ ] Taxa de retrabalho
  - [ ] NPS de clientes (se houver survey)
  - [ ] Tempo médio por projeto
  - [ ] Custo real vs. orçado

- [ ] **`app/(dashboard)/reports/financial/page.tsx`** - Financeiro
  - [ ] Receita por mês (line chart)
  - [ ] Receita por cliente (bar chart)
  - [ ] Receita por tipo de projeto (pie chart)
  - [ ] Margem de lucro por projeto
  - [ ] Contas a receber
  - [ ] Fluxo de caixa projetado
  - [ ] Ticket médio

- [ ] **`app/(dashboard)/reports/team-utilization/page.tsx`** - Utilização de Equipe
  - [ ] Horas por pessoa (bar chart)
  - [ ] Utilização vs. meta
  - [ ] Horas por tipo de atividade
  - [ ] Produtividade por hora
  - [ ] Ociosidade identificada

- [ ] **`app/(dashboard)/reports/client-analysis/page.tsx`** - Análise de Clientes
  - [ ] Total de clientes por período
  - [ ] Clientes mais lucrativos
  - [ ] Lifetime value por cliente
  - [ ] Retenção de clientes
  - [ ] Clientes inativos (inatividade > 6 meses)
  - [ ] Oportunidades de upsell

- [ ] **`app/(dashboard)/reports/project-analysis/page.tsx`** - Análise de Projetos
  - [ ] Status de todos os projetos
  - [ ] Projetos em risco (com atraso)
  - [ ] Complexidade média
  - [ ] Distribuição de workload

## 5.3 Componentes Dashboard
- [ ] **`components/dashboard/KPICard.tsx`**
  - [ ] Card customizável de KPI
  - [ ] Suporte a trend (up/down/neutral)
- [ ] **`components/dashboard/ChartSection.tsx`**
  - [ ] Wrapper para gráficos
  - [ ] Loadings, errors, empty states
- [ ] **`components/dashboard/ReportFilter.tsx`**
  - [ ] Filtros compartilhados
  - [ ] Salvar filtros predefinidos
- [ ] **`components/dashboard/ExportButton.tsx`**
  - [ ] Export para PDF, CSV, Excel
  - [ ] Email de relatório agendado (opcional)

---

# ✅ FASE 6: Colaboração e Comunicação
## Ferramentas de trabalho em equipe

## 6.1 Comments e Discussões
- [ ] Expandir **`components/comments/CommentThread.tsx`**
  - [ ] Comentários nested em tasks/projetos
  - [ ] Mention de usuários (@usuario)
  - [ ] Rich text editing (TipTap já instalado)
  - [ ] Anexar arquivos
  - [ ] Reações com emoji
  - [ ] Edição e exclusão com auditoria
  - [ ] Notificações quando mencionado

## 6.2 Notificações (Melhorar)
- [ ] Expandir **`components/NotificationBell.jsx`**
  - [ ] Categorias de notificação
    - [ ] Tarefa atribuída
    - [ ] Comentário em tarefa
    - [ ] Approvals pendentes
    - [ ] Prazo próximo
    - [ ] Projeto atualizado
    - [ ] Menção
  - [ ] Mark as read/unread
  - [ ] Delete notificação
  - [ ] Email notifications (opcional)
  - [ ] Preferências de notificação por usuário

## 6.3 Comunicação com Cliente
- [ ] **`app/(dashboard)/projects/[id]/client-portal/page.tsx`** (NOVO)
  - [ ] Link compartilhável para cliente
  - [ ] Visualização limitada (read-only)
  - [ ] Galeria de renders/projetos
  - [ ] Formulário de feedback
  - [ ] Timeline de atualizações
  - [ ] Documentos para download
- [ ] **Client Portal Link Generator**
  - [ ] Gerar link com expiração (opcional)
  - [ ] Controle de acesso granular

## 6.4 Integração Email
- [ ] Envio de notificações por email
  - [ ] Usando Resend ou SendGrid
  - [ ] Templates personalizados
  - [ ] Agendamento de emails
- [ ] Confirmação de email para novos usuários
- [ ] Digest semanal/mensal (opcional)

---

# ✅ FASE 7: Funcionalidades Avançadas
## Features premium e diferenciais

## 7.1 Workflow Automation
- [ ] **Automações baseadas em regras**
  - [ ] Criar tasks automaticamente ao fazer upload de deliverable
  - [ ] Notificar quando task fica 3 dias atrasada
  - [ ] Mover task para status automático
  - [ ] Gerar relatório automático (weekly/monthly)
  - [ ] Faturar automaticamente ao terminar projeto

## 7.2 Estimativas e Orçamentação
- [ ] **Model: Estimate**
  - [ ] Estimar horas por task
  - [ ] Estimar custo por task
  - [ ] Compare: real vs. estimado
  - [ ] Análise de acurácia de estimativas
- [ ] **Páginas**
  - [ ] `app/(dashboard)/projects/[id]/budget/page.tsx`
    - [ ] Budget overview
    - [ ] Spend by phase
    - [ ] Variance analysis
    - [ ] Forecast até fim do projeto

## 7.3 Recursos
- [ ] **Model: Resource**
  - [ ] Alocação de recursos por projeto
  - [ ] Capacidade de recursos
  - [ ] Disponibilidade
- [ ] **`app/(dashboard)/resources/capacity/page.tsx`** - Planejamento de capacidade
  - [ ] Matriz de alocação
  - [ ] Identificar gargalos
  - [ ] Sugerir realocação

## 7.4 Histórico e Auditoria
- [ ] Explorar **AuditLog model**
  - [ ] Rastrear todas as alterações
  - [ ] Quem, o quê, quando
- [ ] **`app/(dashboard)/admin/audit-log/page.tsx`** - Log de auditoria
  - [ ] Filtrar por usuário/entidade/data
  - [ ] Exportar relatório
  - [ ] Visualizar antes/depois

## 7.5 Integração com APIs Externas
- [ ] **Google Maps API**
  - [ ] Mostrar localização de projetos
  - [ ] Distância entre cliente/projeto
- [ ] **Google Drive / OneDrive**
  - [ ] Importar arquivos de nuvem
  - [ ] Sincronizar automático (optional)
- [ ] **Slack Integration**
  - [ ] Notificações no Slack
  - [ ] Comandos de slash
  - [ ] Updates de projetos
- [ ] **Zapier ou Make.com**
  - [ ] Automação com outras tools
  - [ ] Webhook triggers

## 7.6 IA e Machine Learning
- [ ] **Sugestões inteligentes**
  - [ ] Sugerir próxima task baseado em padrões
  - [ ] Detectar atrasos com antecedência
  - [ ] Recomendações de cliente relacionado
- [ ] **Análise de dados**
  - [ ] Previsão de receita
  - [ ] Clustering de clientes
  - [ ] Detecção de anomalias

---

# ✅ FASE 8: PWA e Deployment
## Funcionalidades offline e hospedagem

## 8.1 Progressive Web App (PWA)
- [ ] **Configuração next-pwa**
  - [x] Pacote já instalado
  - [ ] Configurar em `next.config.mjs`
    - [ ] manifest.json
    - [ ] icons (192x192, 512x512)
    - [ ] theme colors
    - [ ] offline page
  - [ ] Testar instalação em mobile
  - [ ] Testar funcionalidade offline (cached pages)
  - [ ] Service Worker registration
  - [ ] Background Sync (opcional)

## 8.2 Performance Optimization
- [ ] Image Optimization
  - [ ] Usar `next/image` em toda parte
  - [ ] Lazy loading
  - [ ] Responsive images
  - [ ] AVIF format support
- [ ] Code Splitting
  - [ ] Dynamic imports para components pesados
  - [ ] Route-based code splitting (Next.js default)
- [ ] Caching Strategy
  - [ ] Server-side caching com Redis (opcional)
  - [ ] CDN caching headers
  - [ ] Browser cache headers
- [ ] Database Optimization
  - [ ] Prisma query optimization
  - [ ] Indexes review
  - [ ] N+1 query prevention

## 8.3 SEO e Metadados
- [ ] Adicionar `generateMetadata` às páginas públicas
  - [ ] Open Graph tags
  - [ ] Twitter cards
  - [ ] Schema.org markup
- [ ] Sitemap.xml (opcional)
- [ ] robots.txt

## 8.4 Testing
- [ ] **Unit Tests** (Jest + React Testing Library)
  - [ ] Componentes principais
  - [ ] Utility functions
  - [ ] Target: 70%+ coverage
- [ ] **Integration Tests**
  - [ ] Fluxos críticos
  - [ ] CRUD operations
- [ ] **E2E Tests** (Playwright ou Cypress)
  - [ ] Login flow
  - [ ] Create project → Create task → Log time
  - [ ] Client management flow
  - [ ] Generate report
  - [ ] Mobile responsiveness

## 8.5 Segurança
- [ ] **OWASP Top 10 Review**
  - [ ] SQL Injection (Prisma protege)
  - [ ] XSS Prevention (React + escaping)
  - [ ] CSRF Protection (NextAuth)
  - [ ] Sensitive Data Exposure
    - [ ] Hash de senhas (bcryptjs)
    - [ ] HTTPS only
    - [ ] Env vars seguros
  - [ ] Authentication & Session
    - [ ] NextAuth configured
    - [ ] Session timeouts
    - [ ] Password reset flow
  - [ ] Authorization
    - [ ] Role-based access (RBAC)
    - [ ] Row-level security (RLS) em Supabase
- [ ] **Rate Limiting**
  - [ ] Em endpoints críticos
  - [ ] DDoS protection
- [ ] **LGPD Compliance** (se BR)
  - [ ] Política de privacidade
  - [ ] Consentimento de cookies
  - [ ] Data retention policy
  - [ ] Right to be forgotten

## 8.6 Monitoring e Logging
- [ ] **Error Tracking**
  - [ ] Integrar Sentry ou similar
  - [ ] Alertas para erros críticos
- [ ] **Analytics**
  - [ ] Google Analytics 4 ou Posthog
  - [ ] Track user behavior
  - [ ] Identify bottlenecks
- [ ] **Performance Monitoring**
  - [ ] Core Web Vitals
  - [ ] Page load time
  - [ ] API response time

## 8.7 Deployment
- [ ] **Preparação para produção**
  - [ ] Variáveis de ambiente finais
  - [ ] Database backups configurados
  - [ ] Email service configured
  - [ ] File storage (S3 ou Supabase) ready
  - [ ] DNS setup
  - [ ] SSL certificates

- [ ] **Opções de Deploy**
  - [ ] **Vercel** (Recomendado para Next.js)
    - [ ] GitHub integration
    - [ ] Preview deployments
    - [ ] Auto-scaling
  - [ ] **Alternatives:**
    - [ ] Netlify
    - [ ] AWS (EC2, ECS, Lambda)
    - [ ] DigitalOcean
    - [ ] Self-hosted

- [ ] **CI/CD Pipeline**
  - [ ] GitHub Actions
    - [ ] Run tests on PR
    - [ ] Build check
    - [ ] Deploy on merge to main
  - [ ] Automated backups
  - [ ] Database migrations on deploy

## 8.8 Documentação
- [ ] **README.md** (já existe, MANTER ATUALIZADO)
- [ ] **DEPLOYMENT.md** - Guia de deploy
- [ ] **API Documentation** - Se houver endpoints públicos
- [ ] **User Guide / Help** - Em-app
- [ ] **Admin Guide** - Para administradores
- [ ] **Developer Setup** - Como rodar localmente
- [ ] **Troubleshooting** - FAQ

---

# 📊 Resumo de Tarefas por Fase

## Status Geral

```
┌─────────────────────────────┬──────┐
│ FASE                        │ % OK │
├─────────────────────────────┼──────┤
│ 1. Backend Consolidation    │ 60%  │ (Schema base ok, need new models)
│ 2. Client Management        │  0%  │ (TODO)
│ 3. Architecture Projects    │ 40%  │ (Structure ok, need extension)
│ 4. Architect Activities     │  0%  │ (TODO)
│ 5. Dashboard & Reports      │ 20%  │ (Dashboard exists, need expansion)
│ 6. Collaboration            │ 30%  │ (Comments exist, need enhancement)
│ 7. Advanced Features        │  0%  │ (TODO)
│ 8. PWA & Deployment         │  0%  │ (TODO - Critical for prod)
└─────────────────────────────┴──────┘

TOTAL PROJETO: ~20% COMPLETO
TAREFAS RESTANTES: ~150+ tasks
ESTIMATIVA: 3-6 meses para MVP completo
```

---

# 🎯 Roadmap de Prioridades

## Priority 1 (MVP - Semanas 1-4)
- [ ] Finalizar models Prisma (Phase 1.3)
- [ ] Client CRUD completo (Phase 2.1-2.3)
- [ ] Activity logging básico (Phase 4.1-4.2)
- [ ] Dashboard KPIs (Phase 5.1)
- [ ] Autenticação robusta (melhorar NextAuth)

## Priority 2 (Core Features - Semanas 5-8)
- [ ] Deliverables management (Phase 4.4)
- [ ] Time tracking (Phase 4.5)
- [ ] Project details expandido (Phase 3.3-3.4)
- [ ] Relatórios (Phase 5.2)
- [ ] Notificações melhoradas (Phase 6.2)

## Priority 3 (Polish - Semanas 9-12)
- [ ] Automations (Phase 7.1)
- [ ] Client portal (Phase 6.3)
- [ ] Advanced features (Phase 7.2-7.5)
- [ ] Testing (Phase 8.4)
- [ ] Security hardening (Phase 8.5)

## Priority 4 (Launch - Semanas 13-16)
- [ ] PWA setup (Phase 8.1)
- [ ] Performance optimization (Phase 8.2)
- [ ] Monitoring setup (Phase 8.6)
- [ ] Deploy pipeline (Phase 8.7)
- [ ] Documentation (Phase 8.8)

---

# 📝 Notas Importantes

1. **Banco de Dados**: Todas as migrations do Prisma devem ser testadas em ambiente de staging antes de produção
2. **Performance**: Adicionar indexes conforme dados crescerem
3. **Escalabilidade**: Considerar sharding/replicação se > 100k projetos
4. **User Feedback**: Coletar feedback após cada phase
5. **Documentação**: Manter atualizada conforme desenvolvimento
6. **Testes**: Cada feature deve ter tests antes de merge
7. **Code Review**: Todas as PRs precisam de revisão
8. **Monitoring**: Setup de alertas desde o MVP

---

**Last Updated:** 18/01/2026  
**Next Review:** A cada 2 sprints  
**Owner:** Italo520
