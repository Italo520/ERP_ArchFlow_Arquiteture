# 📋 PRD Completo - ArchFlow ERP v3.0
## Sistema de Gestão de Projetos Arquitetônicos e Carteira de Clientes

**Versão:** 3.0  
**Data de Atualização:** 18 de Janeiro de 2026  
**Status:** Em Desenvolvimento - MVP Focus  
**Autor:** Italo520  
**Foco Principal:** ERP full-stack para escritórios de arquitetura  

---

## 📑 Índice

1. [Visão Geral do Produto](#visão-geral-do-produto)
2. [Fundamentação e Contexto](#fundamentação-e-contexto)
3. [Stack Técnico Detalhado](#stack-técnico-detalhado)
4. [Arquitetura do Sistema](#arquitetura-do-sistema)
5. [Fase 1: Consolidação do Backend](#fase-1-consolidação-do-backend)
6. [Fase 2: Gestão de Clientes](#fase-2-gestão-de-clientes)
7. [Fase 3: Gestão de Projetos Arquitetônicos](#fase-3-gestão-de-projetos-arquitetônicos)
8. [Fase 4: Gestão de Atividades do Arquiteto](#fase-4-gestão-de-atividades-do-arquiteto)
9. [Fase 5: Dashboard e Relatórios](#fase-5-dashboard-e-relatórios)
10. [Fase 6: Colaboração e Comunicação](#fase-6-colaboração-e-comunicação)
11. [Fase 7: Funcionalidades Avançadas](#fase-7-funcionalidades-avançadas)
12. [Fase 8: PWA, Performance e Deployment](#fase-8-pwa-performance-e-deployment)
13. [Fase 9: Integrações Externas](#fase-9-integrações-externas)
14. [Fase 10: DevOps e Produção](#fase-10-devops-e-produção)
15. [Cronograma Realista](#cronograma-realista)
16. [Matriz de Riscos](#matriz-de-riscos)
17. [KPIs de Sucesso](#kpis-de-sucesso)

---

## 🎯 Visão Geral do Produto

### Missão
Criar uma plataforma integrada que simplifica a gestão completa de escritórios de arquitetura, desde o relacionamento com clientes até a entrega de projetos, com foco em produtividade, rastreabilidade e inteligência de negócios.

### Visão
Ser o ERP padrão para arquitetos e escritórios de arquitetura no Brasil, oferecendo ferramentas especialistas que entendem o workflow único da profissão, desde briefing até execução.

### Valores Principais
- **Especialização**: Features pensadas especificamente para arquitetura
- **Integração**: Todos os módulos conversam de forma fluida
- **Produtividade**: Reduce overhead, maximiza tempo em design
- **Rastreabilidade**: Auditoria completa de tudo
- **Escalabilidade**: Cresce com o escritório

### Público-Alvo
- **Primário**: Escritórios de arquitetura (5-50 pessoas)
- **Secundário**: Arquitetos freelancers, Construtoras com departamento de arquitetura
- **Geográfico**: Brasil, potencial América Latina

### Diferenciais Competitivos
1. **Workflow especializado**: Designed for architects, not generic project management
2. **Inteligência de tempo**: Tracking detalhado de atividades por tipo
3. **Gestão de clientes integrada**: Não é add-on, é core
4. **Relatórios financeiros**: Revenue attribution, profitability analysis
5. **Mobile-first**: PWA com offline capability
6. **LGPD compliance**: Pensado desde o início

---

## 📚 Fundamentação e Contexto

### Problema a Resolver
Arquitetos e escritórios de arquitetura enfrentam:
- Fragmentação de ferramentas (email, Whatsapp, drives, planilhas)
- Dificuldade em rastrear tempo e atividades
- Falta de visibilidade financeira por projeto
- Relacionamento com cliente desorganizado
- Difícil calcular lucratividade real

### Oportunidade de Mercado
- ~15.000 escritórios de arquitetura no Brasil
- Migração em massa de planilhas para SaaS
- Market size estimado: R$ 100-200M
- Baixa concorrência direta no segmento específico

### Estratégia de Go-to-Market
1. **Phase 1 (Meses 1-3)**: Beta privado com 5-10 arquitetos conhecidos
2. **Phase 2 (Meses 4-6)**: Soft launch para 50-100 usuários
3. **Phase 3 (Meses 7-12)**: Growth phase, partnerships com CAU, softwares aliados
4. **Phase 4 (Year 2)**: Expansion para contractors, designers, urbanistas

---

## 🛠 Stack Técnico Detalhado

### Frontend
```
Framework: Next.js 16.1.1 (App Router)
React: 19.0+
TypeScript: 5.3+
Styling: Tailwind CSS v4 + PostCSS
Component Library: 
  - Radix UI (primitivos acessíveis)
  - shadcn/ui (built on Radix)
  - Custom components (ArchFlow specific)
UI State: Zustand (lightweight)
Forms: React Hook Form + Zod (validation)
Tables: TanStack Table (React Table v8)
Rich Text: TipTap v2
Drag & Drop: @dnd-kit (modern, performant)
Charts: Recharts v2 + Framer Motion
Date: date-fns + React Calendar
Icons: Lucide React
Toast/Modals: Sonner (toasts) + Radix Dialog
Testing: Jest + React Testing Library
E2E: Playwright v1.40+
```

### Backend
```
Runtime: Node.js 20 LTS
Framework: Next.js Server Actions + API Routes
Database: PostgreSQL 15+ (Supabase)
ORM: Prisma 7.2
Authentication: NextAuth.js v5 (beta)
File Storage: Supabase Storage + AWS S3 (optional)
Caching: Redis (optional, for performance)
Job Queue: Bull (Redis) for async tasks
Email: Resend (preferred) or SendGrid
Session Management: NextAuth sessions + JWT
Real-time: Supabase Realtime (optional)
```

### DevOps & Infrastructure
```
VCS: GitHub
CI/CD: GitHub Actions
Deployment: Vercel (primary) + AWS/DigitalOcean (backup)
Monitoring: Sentry (errors) + PostHog (analytics)
Database Backups: Supabase built-in + automated snapshots
CDN: Vercel Edge Network
DNS: Cloudflare
Secrets Management: GitHub Secrets + Vercel Environment
```

### Development Tools
```
Package Manager: npm (stable choice)
Build Tool: Next.js built-in (Turbopack)
Linting: ESLint + Prettier
Version Control: Git + conventional commits
Code Quality: SonarQube (optional)
API Testing: Postman + Thunder Client
Database GUI: pgAdmin + DBeaver
Local Dev: Docker Compose for local Postgres
```

---

## 🏗 Arquitetura do Sistema

### Diagrama de Módulos
```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│  ┌──────────────┬──────────────┬──────────────┐              │
│  │ Dashboard    │ Projects     │ Clients      │              │
│  ├──────────────┼──────────────┼──────────────┤              │
│  │ Activities   │ Deliverables │ Time Logs    │              │
│  ├──────────────┼──────────────┼──────────────┤              │
│  │ Reports      │ Team         │ Settings     │              │
│  └──────────────┴──────────────┴──────────────┘              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              API Layer (Server Actions)                      │
│  ┌──────────────┬──────────────┬──────────────┐              │
│  │ Auth         │ Projects API │ Clients API  │              │
│  ├──────────────┼──────────────┼──────────────┤              │
│  │ Activities   │ Time Tracking│ Deliverables │              │
│  ├──────────────┼──────────────┼──────────────┤              │
│  │ Reports      │ Analytics    │ Files        │              │
│  └──────────────┴──────────────┴──────────────┘              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│            Business Logic & Validations                      │
│  ┌──────────────┬──────────────┬──────────────┐              │
│  │ Auth Service │ Project Mgmt │ Analytics    │              │
│  ├──────────────┼──────────────┼──────────────┤              │
│  │ Workflow     │ Notifications│ Automations  │              │
│  └──────────────┴──────────────┴──────────────┘              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              Data Layer (Prisma ORM)                         │
│  PostgreSQL 15+ (Supabase)                                  │
│  ├─ Users, Auth, Sessions                                   │
│  ├─ Clients, Projects, Tasks                                │
│  ├─ Activities, TimeLogs, Deliverables                      │
│  ├─ Comments, Notifications                                 │
│  ├─ Files, AuditLog, Reports                                │
│  └─ Preferences, Settings                                   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              External Services                              │
│  ├─ Supabase (Database + Storage)                           │
│  ├─ S3 / Supabase Storage (Files)                           │
│  ├─ Resend / SendGrid (Email)                               │
│  ├─ Google Maps API (Location)                              │
│  ├─ Slack / Discord (Notifications)                         │
│  └─ Analytics Platforms (PostHog, GA4)                      │
└─────────────────────────────────────────────────────────────┘
```

### Estrutura de Pastas
```
archflow/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── clients/
│   │   ├── projects/
│   │   ├── activities/
│   │   ├── time-tracking/
│   │   ├── deliverables/
│   │   ├── reports/
│   │   ├── team/
│   │   └── settings/
│   ├── api/
│   │   ├── auth/
│   │   ├── clients/
│   │   ├── projects/
│   │   ├── activities/
│   │   ├── files/
│   │   └── webhooks/
│   ├── actions/ (Server Actions)
│   │   ├── auth.ts
│   │   ├── client.ts
│   │   ├── project.ts
│   │   ├── activity.ts
│   │   ├── deliverable.ts
│   │   └── ...
│   └── layout.tsx
├── components/
│   ├── ui/ (shadcn/ui)
│   ├── dashboard/
│   ├── clients/
│   ├── projects/
│   ├── activities/
│   ├── reports/
│   ├── layouts/
│   └── shared/
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── validations.ts
│   ├── constants.ts
│   └── utils.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useProject.ts
│   ├── useClients.ts
│   └── ...
├── services/
│   ├── supabase.ts
│   ├── email.ts
│   ├── file-upload.ts
│   ├── analytics.ts
│   └── ...
├── types/
│   ├── index.ts
│   ├── api.ts
│   └── database.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── icons/
│   ├── images/
│   └── manifest.json
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .github/
│   └── workflows/
│       ├── test.yml
│       ├── lint.yml
│       └── deploy.yml
├── .env.example
├── .env.local
├── next.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

# ✅ FASE 1: Consolidação do Backend
## Estrutura de dados robusta e Server Actions base

## 1.1 Schema Prisma - Novos Models
### Status: 60% (base ok, need new models)

#### Subtarefa 1.1.1: Client Model Estendido
- [ ] **Criar modelo completo de Cliente**
  - [x] Model User básico
  - [ ] Estender com campos arquitetônicos
    - [ ] `id` (UUID)
    - [ ] `name` (string, required)
    - [ ] `email` (string, unique)
    - [ ] `phone` (string)
    - [ ] `website` (string, nullable)
    - [ ] `legalType` (enum: PF, PJ)
    - [ ] `document` (CPF/CNPJ, unique, validated)
    - [ ] `razaoSocial` (string, for PJ)
    - [ ] `inscricaoEstadual` (string, nullable)
    - [ ] `address` (JSON: rua, numero, cep, cidade, estado, complemento)
    - [ ] `geoLocation` (JSON: lat, lng, for maps)
    - [ ] `category` (enum: RESIDENTIAL, COMMERCIAL, INSTITUTIONAL, INDUSTRIAL, DESIGNER)
    - [ ] `status` (enum: ACTIVE, INACTIVE, PROSPECT, BLOCKED)
    - [ ] `rating` (float, 0-5)
    - [ ] `totalSpent` (decimal, calculated)
    - [ ] `avatar` (string, url)
    - [ ] `notes` (text)
    - [ ] `contactPreference` (enum: EMAIL, PHONE, WHATSAPP)
    - [ ] `userId` (FK to User who owns the client record)
    - [ ] `tags` (string[], for categorization)
    - [ ] `metadata` (JSON, for extensibility)
    - [ ] `createdAt`, `updatedAt`, `deletedAt` (soft delete)
    - [ ] `lastInteractionAt` (to detect inactive)
  - [ ] Adicionar indexes: `email`, `document`, `userId`, `status`, `createdAt`
  - [ ] Add relations to: Project (1:N), Activity (1:N), TimeLog (1:N)

#### Subtarefa 1.1.2: Activity Model
- [ ] **Rastreamento de atividades do arquiteto**
  - [ ] `id` (UUID)
  - [ ] `type` (enum: MEETING, CALL, EMAIL, SITE_VISIT, DESIGN, REVISION, APPROVAL, ADMIN, OTHER)
  - [ ] `title` (string)
  - [ ] `description` (text)
  - [ ] `duration` (int, em minutos)
  - [ ] `startTime` (datetime)
  - [ ] `endTime` (datetime)
  - [ ] `location` (string, nullable)
  - [ ] `participants` (string[], array de IDs de usuários)
  - [ ] `clientId` (FK)
  - [ ] `projectId` (FK, nullable)
  - [ ] `taskId` (FK, nullable)
  - [ ] `createdById` (FK to User)
  - [ ] `attachments` (JSON[], file references)
  - [ ] `notes` (text)
  - [ ] `status` (enum: SCHEDULED, COMPLETED, CANCELLED)
  - [ ] `createdAt`, `updatedAt`
  - [ ] Indexes: `clientId`, `projectId`, `createdById`, `startTime`
  - [ ] Relations: Client, Project, Task, User

#### Subtarefa 1.1.3: Deliverable Model
- [ ] **Gestão de entregas de projeto**
  - [ ] `id` (UUID)
  - [ ] `name` (string)
  - [ ] `type` (enum: SKETCH, RENDER_3D, DRAWING_2D, DOCUMENT, PDF, VIDEO, PHOTO, OTHER)
  - [ ] `description` (text)
  - [ ] `fileUrl` (string)
  - [ ] `fileSize` (int, em bytes)
  - [ ] `mimeType` (string)
  - [ ] `version` (int, starts at 1)
  - [ ] `status` (enum: DRAFT, PENDING_REVIEW, APPROVED, APPROVED_WITH_CHANGES, REJECTED, DELIVERED)
  - [ ] `taskId` (FK)
  - [ ] `projectId` (FK)
  - [ ] `createdById` (FK to User)
  - [ ] `approvedById` (FK, nullable)
  - [ ] `reviewComments` (JSON[], with timestamps)
  - [ ] `revisionCount` (int)
  - [ ] `dueDates` (string[], milestones)
  - [ ] `tags` (string[])
  - [ ] `metadata` (JSON, for specific types)
  - [ ] `createdAt`, `updatedAt`, `deletedAt`
  - [ ] Indexes: `projectId`, `taskId`, `status`, `version`
  - [ ] Relations: Task, Project, User

#### Subtarefa 1.1.4: TimeLog Model
- [ ] **Rastreamento de tempo dedicado**
  - [ ] `id` (UUID)
  - [ ] `duration` (float, em horas)
  - [ ] `category` (enum: DESIGN, REVIEW, MEETING, ADMIN, DELIVERY, OTHER)
  - [ ] `description` (text)
  - [ ] `date` (date)
  - [ ] `startTime` (time, optional)
  - [ ] `endTime` (time, optional)
  - [ ] `userId` (FK)
  - [ ] `projectId` (FK)
  - [ ] `taskId` (FK, nullable)
  - [ ] `clientId` (FK, nullable)
  - [ ] `billable` (boolean)
  - [ ] `billRate` (decimal, hourly rate)
  - [ ] `invoiceId` (FK, nullable)
  - [ ] `tags` (string[])
  - [ ] `createdAt`, `updatedAt`
  - [ ] Indexes: `userId`, `projectId`, `date`, `billable`
  - [ ] Relations: User, Project, Task, Client

#### Subtarefa 1.1.5: Estimate Model
- [ ] **Estimativas de projeto**
  - [ ] `id` (UUID)
  - [ ] `projectId` (FK)
  - [ ] `estimatedHours` (float)
  - [ ] `estimatedCost` (decimal)
  - [ ] `actualHours` (float, calculated)
  - [ ] `actualCost` (decimal, calculated)
  - [ ] `status` (enum: DRAFT, APPROVED, IN_PROGRESS, COMPLETED)
  - [ ] `notes` (text)
  - [ ] `createdAt`, `updatedAt`
  - [ ] Indexes: `projectId`

#### Subtarefa 1.1.6: Budget Model
- [ ] **Orçamento por projeto**
  - [ ] `id` (UUID)
  - [ ] `projectId` (FK, unique)
  - [ ] `totalBudget` (decimal)
  - [ ] `spentAmount` (decimal, calculated)
  - [ ] `remainingAmount` (decimal, calculated)
  - [ ] `budgetBreakdown` (JSON: {phase: amount})
  - [ ] `status` (enum: DRAFT, APPROVED, ACTIVE, EXCEEDED, COMPLETED)
  - [ ] `createdAt`, `updatedAt`

#### Subtarefa 1.1.7: Notification Model
- [ ] Expandir modelo existente
  - [ ] `id` (UUID)
  - [ ] `userId` (FK)
  - [ ] `type` (enum: TASK_ASSIGNED, COMMENT, APPROVAL_PENDING, DEADLINE_APPROACHING, PROJECT_UPDATE, MENTION, SYSTEM)
  - [ ] `title` (string)
  - [ ] `message` (text)
  - [ ] `relatedEntityId` (string, id do objeto - project, task, etc)
  - [ ] `relatedEntityType` (enum: PROJECT, TASK, CLIENT, ACTIVITY, DELIVERABLE)
  - [ ] `read` (boolean)
  - [ ] `readAt` (datetime, nullable)
  - [ ] `actionUrl` (string, link para abrir notificação)
  - [ ] `createdAt`
  - [ ] Indexes: `userId`, `read`, `createdAt`

#### Subtarefa 1.1.8: AuditLog Model
- [ ] Expandir para rastrear tudo
  - [ ] `id` (UUID)
  - [ ] `userId` (FK)
  - [ ] `action` (enum: CREATE, UPDATE, DELETE, APPROVE, REJECT)
  - [ ] `entityType` (string: "Project", "Task", "Client", etc)
  - [ ] `entityId` (string)
  - [ ] `changes` (JSON: {field: {oldValue, newValue}})
  - [ ] `ipAddress` (string)
  - [ ] `userAgent` (string)
  - [ ] `createdAt`
  - [ ] Indexes: `userId`, `entityType`, `entityId`, `createdAt`

#### Subtarefa 1.1.9: Relations Completas
- [ ] **Mapear todas as relações**
  - [ ] User → Projects (1:N)
  - [ ] User → Tasks (1:N)
  - [ ] User → Activities (1:N)
  - [ ] User → TimeLogs (1:N)
  - [ ] Client → Projects (1:N)
  - [ ] Client → Activities (1:N)
  - [ ] Client → TimeLogs (1:N)
  - [ ] Project → Tasks (1:N)
  - [ ] Project → Deliverables (1:N)
  - [ ] Project → Activities (1:N)
  - [ ] Project → Budget (1:1)
  - [ ] Project → Estimate (1:1)
  - [ ] Project → TimeLogs (1:N)
  - [ ] Project → Stages (1:N)
  - [ ] Task → Deliverables (1:N)
  - [ ] Task → Activities (1:N)
  - [ ] Task → TimeLogs (1:N)
  - [ ] Task → Comments (1:N)
  - [ ] Deliverable → Reviews (1:N, comments)
  - [ ] User → ProjectMembers (1:N, para colaboração)
  - [ ] ProjectMember → User (N:1)
  - [ ] ProjectMember → Project (N:1)

#### Subtarefa 1.1.10: Validações em Prisma
- [ ] **Cascade delete rules**
  - [ ] Deletar Cliente → Deletar Activities, TimeLogs (soft delete Projects)
  - [ ] Deletar Project → Deletar Tasks, Deliverables, Budget, Estimate (soft)
  - [ ] Deletar Task → Deletar Deliverables, Activities, TimeLogs (soft)
- [ ] **Unique constraints**
  - [ ] Client.email
  - [ ] Client.document
  - [ ] User.email
  - [ ] Project.id per client combo (opcional)
- [ ] **Default values**
  - [ ] Client.status = "PROSPECT"
  - [ ] Activity.status = "SCHEDULED"
  - [ ] Deliverable.status = "DRAFT"
  - [ ] Deliverable.version = 1
  - [ ] Project.progress = 0

## 1.2 Prisma Migrations
### Status: 0% (TODO)

#### Subtarefa 1.2.1: Criar Migration Inicial
- [ ] **`prisma/migrations/add_core_models`**
  - [ ] Executar `npx prisma migrate dev --name add_core_models`
  - [ ] Verificar SQL gerado
  - [ ] Testar localmente
  - [ ] Backup do banco antes de executar em staging

#### Subtarefa 1.2.2: Criar Migration para Soft Deletes
- [ ] **Adicionar `deletedAt` aos models**
  - [ ] User, Project, Client, Task, Deliverable, TimeLog
  - [ ] `npx prisma migrate dev --name add_soft_deletes`

#### Subtarefa 1.2.3: Criar Seed Script
- [ ] **`prisma/seed.ts`**
  - [ ] Limpar dados existentes (truncate)
  - [ ] Criar 3-5 usuários de teste
    - [ ] Admin, Editor, Viewer roles
    - [ ] Email: admin@archflow.local, etc
    - [ ] Senhas: temporárias (dev only)
  - [ ] Criar 10-15 clientes fictícios
    - [ ] Mix de PF e PJ
    - [ ] Diferentes categorias (residential, commercial, etc)
    - [ ] Diferentes status (active, prospect, inactive)
  - [ ] Criar 15-20 projetos relacionados
    - [ ] Diferentes tipos (residencial, comercial, reforma)
    - [ ] Diferentes status (conceitual, executivo, finalizado)
    - [ ] Diferentes clientes
    - [ ] Com áreas, andares, ambientes
  - [ ] Criar 30-50 tasks relacionadas aos projetos
    - [ ] Diferentes stages (briefing, design, revision, etc)
    - [ ] Diferentes assignees
    - [ ] Diferentes prioridades
  - [ ] Criar activities, time logs, deliverables de exemplo
  - [ ] Executar: `npx prisma db seed`

#### Subtarefa 1.2.4: Validar Schema
- [ ] **`npx prisma validate`** ✓
- [ ] **`npx prisma introspect`** - se houver BD existente
- [ ] Verificar tipos TypeScript gerados
- [ ] Compilar TypeScript sem erros

## 1.3 Índices e Performance
### Status: 0% (TODO)

#### Subtarefa 1.3.1: Adicionar Índices Críticos
- [ ] **Em schema.prisma**
  ```prisma
  model Client {
    // ... fields
    @@index([userId])
    @@index([status])
    @@index([createdAt])
    @@index([document])
    @@unique([email])
  }
  ```
- [ ] Migração: `npx prisma migrate dev --name add_performance_indexes`
- [ ] Testar query performance em staging

#### Subtarefa 1.3.2: Otimizar Queries
- [ ] **Usar `select` para reduzir dados transferidos**
- [ ] Documentar padrão em `lib/db.ts`

#### Subtarefa 1.3.3: N+1 Query Prevention
- [ ] **Usar `include` com cuidado**
- [ ] **Batch queries when possible**

## 1.4 Server Actions Fundamentais
### Status: 30% (basic structure exists)

#### Subtarefa 1.4.1: Auth Server Actions
- [ ] **`app/actions/auth.ts`** - MELHORAR existente
  - [ ] `signUp(email, password, name)` - Registrar
  - [ ] `signIn(email, password)` - Login
  - [ ] `signOut()` - Logout
  - [ ] `resetPassword(email)` - Solicitar reset
  - [ ] `updatePassword(token, newPassword)` - Confirmar reset
  - [ ] `getCurrentUser()` - Get user da session
  - [ ] `updateProfile(data)` - Atualizar perfil

#### Subtarefa 1.4.2: Client Server Actions
- [ ] **`app/actions/client.ts`** - NOVO arquivo
  - [ ] `createClient(formData)` - Criar novo cliente
  - [ ] `getClientById(id)` - Recuperar cliente específico
  - [ ] `listClients(filters, pagination)` - Listar com filtros
  - [ ] `updateClient(id, data)` - Atualizar cliente
  - [ ] `softDeleteClient(id)` - Deletar (soft)
  - [ ] `restoreClient(id)` - Restaurar cliente deletado
  - [ ] `getClientProjects(clientId)` - Projects do cliente
  - [ ] `getClientStats(clientId)` - Estatísticas
  - [ ] `bulkUploadClients(csvFile)` - Import de CSV
  - [ ] `exportClientsCSV(filters)` - Export para CSV

#### Subtarefa 1.4.3: Project Server Actions
- [ ] **`app/actions/project.ts`** - EXPANDIR existente
  - [ ] Todas as ações CRUD básicas

#### Subtarefa 1.4.4: Activity Server Actions
- [ ] **`app/actions/activity.ts`** - NOVO arquivo
  - [ ] Todas as ações de atividades

#### Subtarefa 1.4.5: TimeLog Server Actions
- [ ] **`app/actions/timeLog.ts`** - NOVO arquivo
  - [ ] Todas as ações de time tracking

#### Subtarefa 1.4.6: Deliverable Server Actions
- [ ] **`app/actions/deliverable.ts`** - NOVO arquivo
  - [ ] Todas as ações de deliverables

#### Subtarefa 1.4.7: Error Handling & Validation
- [ ] **`lib/validations.ts`** - Schemas Zod centralizados
- [ ] **Error boundaries em Server Actions**

## 1.5 Middleware e Guards
### Status: 20% (basic exists)

#### Subtarefa 1.5.1: Auth Middleware
- [ ] **`middleware.ts`** - Melhorar existente

#### Subtarefa 1.5.2: Permission Checks
- [ ] **`lib/permissions.ts`** - NOVO arquivo

#### Subtarefa 1.5.3: API Route Protection
- [ ] **Em cada `app/api/` route**

## 1.6 Testes Unitários - Fase 1
### Status: 0% (TODO)

#### Subtarefa 1.6.1: Setup Jest + RTL
- [ ] **`jest.config.js` + `jest.setup.js`**

#### Subtarefa 1.6.2: Testes de Validação
- [ ] **`tests/unit/validations.test.ts`**

#### Subtarefa 1.6.3: Testes de Server Actions
- [ ] **`tests/unit/actions.test.ts`**

#### Subtarefa 1.6.4: Testes de Permissions
- [ ] **`tests/unit/permissions.test.ts`**

---

# ✅ FASE 2: Gestão de Clientes
## Módulo completo de carteira de clientes

### Status: 0% (TODO)

## 2.1 Server Actions para Clientes (Continuação)
- [ ] Todas as ações listadas em `app/actions/client.ts`

## 2.2 Frontend - Listagem de Clientes
### Status: 0% (TODO)

#### Subtarefa 2.2.1: Página Principal de Clientes
- [ ] **`app/(dashboard)/clients/page.tsx`** - Listagem

#### Subtarefa 2.2.2: Tabela de Clientes
- [ ] **`components/clients/ClientsTable.tsx`**

#### Subtarefa 2.2.3: Filtros Avançados
- [ ] **`components/clients/ClientFilters.tsx`**

#### Subtarefa 2.2.4: Ações Rápidas
- [ ] **Em cada linha da tabela**

#### Subtarefa 2.2.5: Exportar Dados
- [ ] **`components/clients/ExportButton.tsx`**

## 2.3 Frontend - Detalhe de Cliente
### Status: 0% (TODO)

#### Subtarefa 2.3.1: Página de Detalhe
- [ ] **`app/(dashboard)/clients/[id]/page.tsx`**

#### Subtarefa 2.3.2: Aba Overview
- [ ] **Informações gerais do cliente**

#### Subtarefa 2.3.3: Aba Projetos
- [ ] **Lista de projetos do cliente**

#### Subtarefa 2.3.4: Aba Atividades
- [ ] **Timeline de atividades com cliente**

#### Subtarefa 2.3.5: Aba Documentos
- [ ] **Arquivos relacionados ao cliente**

#### Subtarefa 2.3.6: Aba Financeiro
- [ ] **Histórico financeiro**

#### Subtarefa 2.3.7: Aba Histórico
- [ ] **Audit log do cliente**

## 2.4 Frontend - Criar/Editar Cliente
### Status: 0% (TODO)

#### Subtarefa 2.4.1: Formulário de Cliente
- [ ] **`components/clients/ClientForm.tsx`**

#### Subtarefa 2.4.2: Página Criar Novo
- [ ] **`app/(dashboard)/clients/new/page.tsx`**

#### Subtarefa 2.4.3: Modal Editar (In-place)
- [ ] **Em detalhe de cliente**

#### Subtarefa 2.4.4: Integração CEP
- [ ] **Auto-fetch de endereço via CEP**

#### Subtarefa 2.4.5: Upload de Logo
- [ ] **`components/shared/ImageUpload.tsx`**

## 2.5 Componentes Reutilizáveis - Clientes
### Status: 0% (TODO)

#### Subtarefa 2.5.1: ClientCard
- [ ] **`components/clients/ClientCard.tsx`**

#### Subtarefa 2.5.2: ClientStats
- [ ] **`components/clients/ClientStats.tsx`**

#### Subtarefa 2.5.3: ClientSelect
- [ ] **`components/clients/ClientSelect.tsx`**

#### Subtarefa 2.5.4: ClientAvatar
- [ ] **`components/clients/ClientAvatar.tsx`**

## 2.6 Testes - Gestão de Clientes
### Status: 0% (TODO)

#### Subtarefa 2.6.1: Testes de Integração
- [ ] **`tests/integration/clients.test.ts`**

#### Subtarefa 2.6.2: E2E Tests
- [ ] **`tests/e2e/clients.spec.ts`** (Playwright)

---

# ✅ FASE 3: Gestão de Projetos Arquitetônicos
## Ampliação de features específicas para arquitetura

### Status: 40% (structure ok, need expansion)

(Segue padrão similar às Phases 1 e 2, com foco em campos arquitetônicos específicos)

---

# ✅ FASE 4: Gestão de Atividades do Arquiteto
## Rastreamento completo de atividades e produtividade

### Status: 0% (TODO)

(Activity Calendar, Time Logging, Activity Analytics)

---

# ✅ FASE 5: Dashboard e Relatórios
## Visão consolidada de KPIs e métricas

### Status: 20% (Dashboard exists, need expansion)

(KPI Cards, Charts, Reports, Analytics)

---

# ✅ FASE 6: Colaboração e Comunicação
## Ferramentas de trabalho em equipe

### Status: 30% (Comments exist, need enhancement)

(Comments, Notifications, Client Portal, Email Integration)

---

# ✅ FASE 7: Funcionalidades Avançadas
## Features premium e diferenciais

### Status: 0% (TODO)

(Workflow Automation, Budgeting, Resource Planning, AI Features)

---

# ✅ FASE 8: PWA, Performance e Deployment
## Funcionalidades offline e hospedagem

### Status: 0% (TODO)

(PWA Setup, Performance Optimization, Security, Testing, CI/CD)

---

# ✅ FASE 9: Integrações Externas
## APIs e conectores com ferramentas populares

### Status: 0% (TODO)

(Google Maps, Google Drive, Slack, Zapier, Make.com)

---

# ✅ FASE 10: DevOps e Produção
## Infraestrutura robusta e monitoramento

### Status: 0% (TODO)

(CI/CD Pipeline, Monitoring, Database Management, Security Hardening)

---

## 📊 Cronograma Realista

```
TIMELINE ESTIMADA: 6-9 meses para MVP completo

Fase 1 (Backend Consolidation)
├─ Sprint 1 (2 semanas): Schema design + Migration
├─ Sprint 2 (2 semanas): Server Actions basics
└─ Sprint 3 (1 semana): Testing + Validation
   → 5 semanas total

Fase 2 (Client Management)
├─ Sprint 4-5 (4 semanas): Frontend + Pages
├─ Sprint 6 (2 semanas): Forms + Validations
└─ Sprint 7 (1 semana): Testing + Polish
   → 7 semanas total

Fase 3 (Projects)
├─ Sprints 8-10 (6 semanas): Similar pattern
   → 6 semanas total

Fase 4 (Activities)
├─ Sprints 11-12 (4 semanas): Activity tracking + Calendar
   → 4 semanas total

Fase 5 (Dashboard)
├─ Sprint 13 (2 semanas): Dashboard KPIs
├─ Sprint 14 (2 semanas): Reports
   → 4 semanas total

Fase 6 (Collaboration)
├─ Sprint 15 (2 semanas): Comments + Notifications
   → 2 semanas total

Fase 7 (Advanced Features)
├─ Sprint 16-17 (4 semanas): Automation, Budgeting
   → 4 semanas total

Fase 8 (PWA + Deploy)
├─ Sprint 18 (2 semanas): PWA Setup
├─ Sprint 19 (2 semanas): Performance + Security
└─ Sprint 20 (2 semanas): Testing + Deployment
   → 6 semanas total

Fase 9 (Integrations)
├─ Sprint 21-22 (4 semanas): Google Maps, Slack, etc
   → 4 semanas total

Fase 10 (DevOps + Launch)
├─ Sprint 23-24 (4 semanas): CI/CD, Monitoring, Launch
   → 4 semanas total

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: ~52 semanas (1 ano full-time)
MVP (Phases 1-5): 24 semanas (6 meses)
```

### Velocidade de Desenvolvimento
- **Assumindo**: 1 desenvolvedor full-time
- **Story points por sprint**: 25-35 points
- **Commits por dia**: 5-10
- **PRs por sprint**: 15-20

### Milestones Críticos
| Milestone | Data | Status |
|-----------|------|--------|
| MVP Phase (Clients + Projects) | Semana 12 | Em desenvolvimento |
| Beta Launch (5-10 users) | Semana 16 | Planned |
| Activities + Time Tracking | Semana 20 | Planned |
| Dashboard + Reports | Semana 24 | Planned |
| Public Soft Launch | Semana 28 | Planned |

---

## 🚨 Matriz de Riscos

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Database schema needs rework | Medium (30%) | High | Dedicate time to Phase 1, review with experienced architect |
| Scope creep during development | High (60%) | High | Strict feature freeze, MVP focus, cut features to roadmap |
| Performance issues in production | Medium (40%) | Critical | Optimize early, load testing in staging, caching strategy |
| Supabase outage/limits | Low (10%) | Medium | Have backup to AWS/DigitalOcean, monitoring alerts |
| Authentication complexity | Low (15%) | Medium | Use NextAuth best practices, security audit early |
| Timeline slippage (1-2 months) | High (70%) | High | Buffer time built in, ruthless prioritization, reduce scope |
| Team scaling (multi-person) | Medium (35%) | Medium | Good code organization, documentation, PR processes |
| User adoption/retention | High (65%) | Critical | User feedback loop, MVP must solve real problems, pricing strategy |
| Regulatory changes (LGPD) | Low (5%) | Medium | Consult legal early, compliance checklist |
| Third-party API changes | Low (10%) | Low | Abstraction layer, fallbacks, monitoring |

---

## 🎯 KPIs de Sucesso

### Produto
```
- MVP completo (Phases 1-5) em ≤ 24 semanas
- 100% code coverage em funcionalidades críticas
- Page load time < 2s (Core Web Vitals Green)
- Zero critical bugs na primeira release
- API response time < 200ms (P95)
```

### Usuários
```
- Beta phase: 10+ usuários pagantes
- Soft launch: 50+ usuários em 3 meses
- NPS score > 50 (desejável)
- Churn < 5% mensal
- Feature adoption > 70% (users using all main modules)
```

### Negócio
```
- Cost per user < R$ 100/ano (infrastructure)
- Gross margin > 80%
- CAC (customer acquisition cost) < R$ 500
- LTV (lifetime value) > R$ 5.000
- ARR growth > 20% MoM (month over month)
```

### Technical
```
- Deployment frequency: 2-3x por semana
- MTTR (Mean time to recovery): < 15 minutos
- Uptime: 99.9%
- Automated test coverage: > 80%
- Database query performance: < 100ms (P95)
```

---

## 📝 Notas Importantes

### Prioridades
1. **MVP First**: Foco em Phases 1-5 (Backend, Clients, Projects, Activities, Dashboard)
2. **User Feedback**: Depois de cada phase, coletar feedback
3. **Code Quality**: Testes desde o início, code review rigoroso
4. **Documentation**: README, inline comments, API docs

### Decisões Técnicas
1. **Server Actions over API Routes**: Mais simples, menos boilerplate
2. **Prisma over raw SQL**: Type safety, migrations, easier refactoring
3. **Tailwind + shadcn/ui**: Produtivo, componentes prontos
4. **Supabase over self-hosted DB**: Managed service, backups automáticos
5. **Vercel for deployment**: Native Next.js support, edge functions

### Escalabilidade
- Sempre pensar em índices de banco de dados
- Usar `select` em queries para reduzir dados
- Implementar caching layer (Redis) quando necessário
- Async jobs para operações pesadas (Bull queue)
- Database replication/sharding se >1M records

### Segurança
- HTTPS only
- CSRF protection (NextAuth)
- XSS prevention (React escaping)
- SQL injection prevention (Prisma)
- Rate limiting em endpoints críticos
- LGPD compliance (consent, data retention, right to be forgotten)

### Performance
- Lazy load components pesados
- Image optimization (`next/image`)
- Code splitting automático (Next.js)
- Service Worker para offline (PWA)
- CDN para assets estáticos
- Database indexes estratégicos

---

## 🚀 Next Steps

### Próximo Sprint (Semana Atual)
- [ ] Finalizar Phase 1 schema design
- [ ] Create Prisma migration
- [ ] Implement Client CRUD Server Actions
- [ ] Start Client Frontend pages
- [ ] Setup testing infrastructure

### Within 2 Weeks
- [ ] Clientes CRUD 100% funcional
- [ ] Projetos CRUD expandido
- [ ] Activities básico
- [ ] Dashboard com KPIs

### Within 4 Weeks
- [ ] Time tracking implementado
- [ ] Relatórios básicos
- [ ] Notificações
- [ ] Beta testing com usuários reais

---

**Last Updated:** 18 de Janeiro de 2026  
**Maintained By:** Italo520  
**Review Frequency:** A cada 2 sprints  
**Status:** MVP em Desenvolvimento