# 🎯 Plano de Execução - ArchFlow ERP (Desenvolvimento Local)
## Tasks, Subtasks e Mapa de Dependências - VERSÃO SIMPLIFICADA

**Versão:** 2.0  
**Data:** Dezembro 2025  
**Escopo:** Desenvolvimento Local (Backend + Frontend APENAS)  
**Metodologia:** Scrum (Sprints de 2 semanas)  
**Total de Tasks:** 35 | **Total de Subtasks:** 108  
**Estimativa:** 16 semanas (4 meses até MVP completo)

---

## 📊 Estrutura de Fases (Simplificada)

```
SPRINT 0 (Setup Local)  → Semana 1
├─ Arquitetura Base
├─ Database Design
└─ Setup Ambientes

SPRINT 1-3 (MVP Core)   → Semana 2-7
├─ Backend Core
├─ Frontend Core
└─ Integração

SPRINT 4-5 (Polish)     → Semana 8-12
├─ Testes
├─ Performance
└─ LGPD Compliance

SPRINT 6 (Release)      → Semana 13-16
├─ Documentação
├─ UX Polish
└─ MVP Ready
```

---

## 🔴 SPRINT 0: SETUP LOCAL & ARQUITETURA (Semana 1)

### EPIC-001: Arquitetura e Design do Sistema

#### TASK-001: Definir Arquitetura Backend (Clean Architecture)
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 8 pontos
- **Responsável:** Você (Tech Lead)
- **Status:** 📋 A Fazer
- **Dependências:** Nenhuma

**Subtasks:**
- [ ] SUBTASK-001.1: Definir estrutura de pacotes (domain, application, infrastructure, presentation)
- [ ] SUBTASK-001.2: Documentar dependências entre camadas
- [ ] SUBTASK-001.3: Definir padrões de implementação (Repository, Service, Controller)
- [ ] SUBTASK-001.4: Criar templates de código (boilerplate)
- [ ] SUBTASK-001.5: Documentar arquitetura em C4 diagrams
- [ ] SUBTASK-001.6: Definir error handling strategy
- [ ] SUBTASK-001.7: Revisar com time (se houver) e obter aprovação

---

#### TASK-002: Design do Banco de Dados (PostgreSQL)
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-001 ✓

**Subtasks:**
- [ ] SUBTASK-002.1: Criar DER (Diagrama Entidade-Relacionamento)
- [ ] SUBTASK-002.2: Definir schemas e namespaces
- [ ] SUBTASK-002.3: Criar migration script de baseline (Flyway/Liquibase)
- [ ] SUBTASK-002.4: Definir índices estratégicos
- [ ] SUBTASK-002.5: Criar partitioning strategy para tables grandes
- [ ] SUBTASK-002.6: Documentar constraints e validações
- [ ] SUBTASK-002.7: Criar backup/restore procedures
- [ ] SUBTASK-002.8: Revisar performance com EXPLAIN

---

#### TASK-003: Definir Arquitetura Frontend (React + Vite)
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 8 pontos
- **Responsável:** Você (Frontend)
- **Status:** 📋 A Fazer
- **Dependências:** Nenhuma

**Subtasks:**
- [ ] SUBTASK-003.1: Estruturar pastas (components, hooks, services, pages, utils)
- [ ] SUBTASK-003.2: Definir state management (Context API ou Redux)
- [ ] SUBTASK-003.3: Criar component library base (Button, Card, Form, etc)
- [ ] SUBTASK-003.4: Setup Tailwind CSS + design tokens
- [ ] SUBTASK-003.5: Documentar component patterns
- [ ] SUBTASK-003.6: Configurar ESLint + Prettier
- [ ] SUBTASK-003.7: Setup testing framework (Vitest/Jest)

---

#### TASK-004: Design de API REST
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 5 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-001, TASK-002 ✓

**Subtasks:**
- [ ] SUBTASK-004.1: Criar OpenAPI/Swagger specification
- [ ] SUBTASK-004.2: Documentar versioning strategy (v1)
- [ ] SUBTASK-004.3: Definir response format padrão (DTO)
- [ ] SUBTASK-004.4: Documentar error codes
- [ ] SUBTASK-004.5: Revisar API design

---

#### TASK-005: Setup Local - Docker Compose
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 5 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-002 ✓

**Subtasks:**
- [ ] SUBTASK-005.1: Criar docker-compose.yml (PostgreSQL + pgAdmin)
- [ ] SUBTASK-005.2: Criar .env.example com variáveis
- [ ] SUBTASK-005.3: Documentar como rodar localmente
- [ ] SUBTASK-005.4: Criar script de seed inicial (banco)
- [ ] SUBTASK-005.5: Testar ambiente local completo

---

---

## 🟠 SPRINT 1: BACKEND CORE - AUTENTICAÇÃO (Semanas 2-3)

### EPIC-002: Autenticação e Autorização

#### TASK-006: Implementar Autenticação JWT
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 13 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-001, TASK-002, TASK-005 ✓

**Subtasks:**
- [ ] SUBTASK-006.1: Configurar Spring Security
- [ ] SUBTASK-006.2: Implementar AuthenticationProvider (username/password)
- [ ] SUBTASK-006.3: Implementar JwtTokenProvider (geração e validação)
- [ ] SUBTASK-006.4: Criar AuthenticationController (/login, /register)
- [ ] SUBTASK-006.5: Implementar token refresh endpoint
- [ ] SUBTASK-006.6: Criar filtro JWT para validar requests
- [ ] SUBTASK-006.7: Implementar password hashing (BCrypt)
- [ ] SUBTASK-006.8: Testes unitários (mínimo 80% cobertura)
- [ ] SUBTASK-006.9: Testes de integração com banco

---

#### TASK-007: Implementar Sistema de Papéis (RBAC)
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-006 ✓

**Subtasks:**
- [ ] SUBTASK-007.1: Criar entidade Role (ADMIN, PROJECT_OWNER, etc)
- [ ] SUBTASK-007.2: Criar entidade Permission
- [ ] SUBTASK-007.3: Implementar @PreAuthorize annotations
- [ ] SUBTASK-007.4: Criar UserDetails personalizado com roles
- [ ] SUBTASK-007.5: Testes de autorização em endpoints
- [ ] SUBTASK-007.6: Documentar matriz de permissões

---

#### TASK-008: Implementar Auditoria (Audit Log)
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 10 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-002, TASK-006 ✓

**Subtasks:**
- [ ] SUBTASK-008.1: Criar entidade AuditLog
- [ ] SUBTASK-008.2: Implementar AspectJ para logar todas as operações CRUD
- [ ] SUBTASK-008.3: Capturar user_id, ip_origin, user_agent
- [ ] SUBTASK-008.4: Guardar dados_anteriores e dados_novos
- [ ] SUBTASK-008.5: Criar repository e service para auditoria
- [ ] SUBTASK-008.6: Endpoints para visualizar audit trail (admin only)
- [ ] SUBTASK-008.7: Testes de auditoria

---

### EPIC-003: Gestão de Usuários

#### TASK-009: Implementar CRUD de Usuários
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-006, TASK-007 ✓

**Subtasks:**
- [ ] SUBTASK-009.1: Criar entidade User
- [ ] SUBTASK-009.2: Implementar UserRepository
- [ ] SUBTASK-009.3: Criar UserService com business logic
- [ ] SUBTASK-009.4: Implementar UserController (GET, POST, PUT, DELETE)
- [ ] SUBTASK-009.5: Validações (email único, password forte)
- [ ] SUBTASK-009.6: Soft delete (ativo/inativo)
- [ ] SUBTASK-009.7: Testes unitários e integração

---

#### TASK-010: Implementar Perfil de Usuário
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 5 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-009 ✓

**Subtasks:**
- [ ] SUBTASK-010.1: Criar tabela user_profile (avatar, bio, phone, etc)
- [ ] SUBTASK-010.2: Endpoint GET /api/v1/users/me
- [ ] SUBTASK-010.3: Endpoint PUT /api/v1/users/me
- [ ] SUBTASK-010.4: Upload de avatar (local storage)
- [ ] SUBTASK-010.5: Testes

---

---

## 🟠 SPRINT 2: GESTÃO DE PROJETOS (Semanas 4-5)

### EPIC-004: Projetos (CRUD + Relacionamentos)

#### TASK-011: Implementar CRUD de Projetos
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 10 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-009, TASK-007 ✓

**Subtasks:**
- [ ] SUBTASK-011.1: Criar entidade Project
- [ ] SUBTASK-011.2: Criar entidade ProjectMember (relacionamento many-to-many)
- [ ] SUBTASK-011.3: Implementar ProjectRepository
- [ ] SUBTASK-011.4: Criar ProjectService com filters e validações
- [ ] SUBTASK-011.5: Implementar ProjectController (GET, POST, PUT, DELETE)
- [ ] SUBTASK-011.6: Busca e filtros (por status, tipo, data)
- [ ] SUBTASK-011.7: Paginação de resultados
- [ ] SUBTASK-011.8: Validações de negócio (datas, client required, etc)
- [ ] SUBTASK-011.9: Testes unitários
- [ ] SUBTASK-011.10: Testes de integração

---

#### TASK-012: Implementar Gestão de Membros de Projeto
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-011, TASK-007 ✓

**Subtasks:**
- [ ] SUBTASK-012.1: Endpoint POST /projects/{id}/members (adicionar)
- [ ] SUBTASK-012.2: Endpoint DELETE /projects/{id}/members/{userId} (remover)
- [ ] SUBTASK-012.3: Endpoint PUT /projects/{id}/members/{userId} (mudar role)
- [ ] SUBTASK-012.4: Endpoint GET /projects/{id}/members (listar)
- [ ] SUBTASK-012.5: Validar permissões (só owner pode gerenciar)
- [ ] SUBTASK-012.6: Notificar novos membros (email)
- [ ] SUBTASK-012.7: Testes

---

#### TASK-013: Implementar Fases de Projeto
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-011 ✓

**Subtasks:**
- [ ] SUBTASK-013.1: Criar entidade ProjectPhase
- [ ] SUBTASK-013.2: Fases padrão por tipo (Residencial, Comercial, etc)
- [ ] SUBTASK-013.3: Endpoint POST /projects/{id}/phases (criar customizada)
- [ ] SUBTASK-013.4: Endpoint GET /projects/{id}/phases
- [ ] SUBTASK-013.5: Endpoint PUT /projects/{id}/phases/{id} (atualizar)
- [ ] SUBTASK-013.6: Automação de transição de fases
- [ ] SUBTASK-013.7: Testes

---

#### TASK-014: Implementar Dashboard Executivo (Backend)
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 10 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-011, TASK-013 ✓

**Subtasks:**
- [ ] SUBTASK-014.1: Endpoint GET /api/v1/dashboard (overview)
- [ ] SUBTASK-014.2: Calcular KPIs (projetos em andamento, taxa conclusão)
- [ ] SUBTASK-014.3: Retornar health status por projeto (verde/amarelo/vermelho)
- [ ] SUBTASK-014.4: Retornar timeline data (Gantt)
- [ ] SUBTASK-014.5: Retornar atrasos acumulados
- [ ] SUBTASK-014.6: Cache de dashboard (opcional)
- [ ] SUBTASK-014.7: Testes com dados mock

---

---

## 🟠 SPRINT 3: TAREFAS E KANBAN (Semanas 6-7)

### EPIC-005: Tarefas (CRUD + Kanban)

#### TASK-015: Implementar CRUD de Tarefas
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 13 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-011, TASK-013 ✓

**Subtasks:**
- [ ] SUBTASK-015.1: Criar entidade Task
- [ ] SUBTASK-015.2: Criar entidade TaskChecklist
- [ ] SUBTASK-015.3: Implementar TaskRepository com queries complexas
- [ ] SUBTASK-015.4: Criar TaskService (criar, editar, deletar)
- [ ] SUBTASK-015.5: Implementar TaskController
- [ ] SUBTASK-015.6: Validações (datas, responsável, prioridade)
- [ ] SUBTASK-015.7: Suporte a tags (many-to-many)
- [ ] SUBTASK-015.8: Busca e filtros (status, prioridade, responsável, data)
- [ ] SUBTASK-015.9: Paginação
- [ ] SUBTASK-015.10: Soft delete com histórico
- [ ] SUBTASK-015.11: Endpoint para atualizar status
- [ ] SUBTASK-015.12: Testes unitários
- [ ] SUBTASK-015.13: Testes de integração

---

#### TASK-016: Implementar Histórico de Alterações
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-015 ✓

**Subtasks:**
- [ ] SUBTASK-016.1: Criar entidade TaskHistory
- [ ] SUBTASK-016.2: Implementar AspectJ para logar alterações
- [ ] SUBTASK-016.3: Endpoint GET /tasks/{id}/history
- [ ] SUBTASK-016.4: Mostrar timeline de alterações no frontend
- [ ] SUBTASK-016.5: Testes

---

#### TASK-017: Implementar Comentários em Tarefas
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 10 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-015, TASK-006 ✓

**Subtasks:**
- [ ] SUBTASK-017.1: Criar entidade TaskComment
- [ ] SUBTASK-017.2: Endpoint POST /tasks/{id}/comments (criar)
- [ ] SUBTASK-017.3: Endpoint PUT /tasks/{id}/comments/{id} (editar próprio)
- [ ] SUBTASK-017.4: Endpoint DELETE /tasks/{id}/comments/{id} (deletar próprio)
- [ ] SUBTASK-017.5: Endpoint GET /tasks/{id}/comments (listar com paginação)
- [ ] SUBTASK-017.6: Suporte a @mentions (parsing e notificação)
- [ ] SUBTASK-017.7: Marcar como resolvido/não resolvido
- [ ] SUBTASK-017.8: Testes
- [ ] SUBTASK-017.9: Integração com notificações
- [ ] SUBTASK-017.10: Logar em auditoria

---

#### TASK-018: Implementar Anexos em Tarefas
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 10 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-015 ✓

**Subtasks:**
- [ ] SUBTASK-018.1: Criar entidade Attachment
- [ ] SUBTASK-018.2: Implementar upload para storage local
- [ ] SUBTASK-018.3: Endpoint POST /tasks/{id}/attachments (upload)
- [ ] SUBTASK-018.4: Endpoint GET /tasks/{id}/attachments (listar)
- [ ] SUBTASK-018.5: Endpoint DELETE /tasks/{id}/attachments/{id}
- [ ] SUBTASK-018.6: Versionamento de arquivos (manter histórico)
- [ ] SUBTASK-018.7: Validações (tamanho, tipo de arquivo)
- [ ] SUBTASK-018.8: Servir arquivos de forma segura
- [ ] SUBTASK-018.9: Testes

---

#### TASK-019: Implementar Kanban (Status Transitions)
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-015 ✓

**Subtasks:**
- [ ] SUBTASK-019.1: Definir estados válidos (TODO, IN_PROGRESS, UNDER_REVIEW, DONE)
- [ ] SUBTASK-019.2: Implementar state machine para transições
- [ ] SUBTASK-019.3: Endpoint PATCH /tasks/{id}/status (mudar status)
- [ ] SUBTASK-019.4: Validar transições permitidas
- [ ] SUBTASK-019.5: Logar transição em histórico
- [ ] SUBTASK-019.6: Trigger notificações quando status muda
- [ ] SUBTASK-019.7: Testes de transições

---

#### TASK-020: Implementar Sistema de Notificações (Backend)
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 13 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-009, TASK-015, TASK-017 ✓

**Subtasks:**
- [ ] SUBTASK-020.1: Criar entidade Notification
- [ ] SUBTASK-020.2: Criar NotificationService (enviar, marcar como lido)
- [ ] SUBTASK-020.3: Implementar @mentions (parsing e trigger)
- [ ] SUBTASK-020.4: Notificação ao adicionar em projeto
- [ ] SUBTASK-020.5: Notificação ao comentar em tarefa
- [ ] SUBTASK-020.6: Notificação ao mudar status
- [ ] SUBTASK-020.7: Notificação quando atribuído a tarefa
- [ ] SUBTASK-020.8: Endpoint GET /notifications (listar não lidas)
- [ ] SUBTASK-020.9: Endpoint PATCH /notifications/{id} (marcar lido)
- [ ] SUBTASK-020.10: Endpoint DELETE /notifications/{id}
- [ ] SUBTASK-020.11: Preferences de notificação por tipo
- [ ] SUBTASK-020.12: Testes
- [ ] SUBTASK-020.13: Setup para envio de emails (futuro)

---

---

## 🟢 SPRINT 4: FRONTEND CORE (Semanas 8-10)

### EPIC-006: Setup Frontend

#### TASK-021: Setup inicial React + Vite
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-003 ✓

**Subtasks:**
- [ ] SUBTASK-021.1: Criar projeto com Vite
- [ ] SUBTASK-021.2: Instalar dependências (React, React Router, Axios)
- [ ] SUBTASK-021.3: Configurar Tailwind CSS
- [ ] SUBTASK-021.4: Instalar Radix UI
- [ ] SUBTASK-021.5: Setup dnd-kit para drag-drop
- [ ] SUBTASK-021.6: Configurar ESLint + Prettier
- [ ] SUBTASK-021.7: Configurar Vitest

---

#### TASK-022: Criar Component Library Base
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 13 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-021 ✓

**Subtasks:**
- [ ] SUBTASK-022.1: Button (variants: primary, secondary, outline)
- [ ] SUBTASK-022.2: Card
- [ ] SUBTASK-022.3: Form (Input, Textarea, Select, Checkbox, Radio)
- [ ] SUBTASK-022.4: Modal/Dialog
- [ ] SUBTASK-022.5: Dropdown Menu
- [ ] SUBTASK-022.6: Toast/Notification
- [ ] SUBTASK-022.7: Spinner/Loading
- [ ] SUBTASK-022.8: Avatar
- [ ] SUBTASK-022.9: Badge
- [ ] SUBTASK-022.10: Pagination
- [ ] SUBTASK-022.11: Tabs
- [ ] SUBTASK-022.12: Storybook para documentação
- [ ] SUBTASK-022.13: Testes de componentes

---

#### TASK-023: Criar Layout e Navigation
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-022 ✓

**Subtasks:**
- [ ] SUBTASK-023.1: Layout principal (sidebar + main content)
- [ ] SUBTASK-023.2: Header com user menu
- [ ] SUBTASK-023.3: Sidebar com navegação
- [ ] SUBTASK-023.4: Breadcrumb
- [ ] SUBTASK-023.5: Footer
- [ ] SUBTASK-023.6: Responsive design (mobile, tablet, desktop)
- [ ] SUBTASK-023.7: Dark mode toggle (futuro)
- [ ] SUBTASK-023.8: Testes

---

### EPIC-007: Autenticação + Dashboard Frontend

#### TASK-024: Implementar Login/Register Flow + Profile
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 15 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-004, TASK-021 ✓

**Subtasks:**
- [ ] SUBTASK-024.1: Página Login (/login)
- [ ] SUBTASK-024.2: Página Register (/register)
- [ ] SUBTASK-024.3: Página Forgot Password (/forgot-password)
- [ ] SUBTASK-024.4: Página Profile (/profile)
- [ ] SUBTASK-024.5: Serviço AuthService (login, register, logout)
- [ ] SUBTASK-024.6: Armazenar JWT em localStorage
- [ ] SUBTASK-024.7: Interceptor para incluir JWT em requests
- [ ] SUBTASK-024.8: Validações de form (email, password)
- [ ] SUBTASK-024.9: Tratamento de erros
- [ ] SUBTASK-024.10: Redirect lógica (já logado → dashboard)
- [ ] SUBTASK-024.11: Upload de avatar
- [ ] SUBTASK-024.12: Change password form
- [ ] SUBTASK-024.13: Integração com AuthService
- [ ] SUBTASK-024.14: Notificações de sucesso/erro
- [ ] SUBTASK-024.15: Testes

---

#### TASK-025: Implementar Dashboard + Projects CRUD
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 18 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-024, TASK-014, TASK-011 ✓

**Subtasks:**
- [ ] SUBTASK-025.1: Página Dashboard (/dashboard)
- [ ] SUBTASK-025.2: KPI Cards (projetos, taxa conclusão, atrasos)
- [ ] SUBTASK-025.3: Gráfico Timeline (Gantt chart)
- [ ] SUBTASK-025.4: Lista de projetos recentes
- [ ] SUBTASK-025.5: Filtros (status, tipo)
- [ ] SUBTASK-025.6: Página Projects (/projects)
- [ ] SUBTASK-025.7: Card/Row para cada projeto
- [ ] SUBTASK-025.8: Modal Create Project
- [ ] SUBTASK-025.9: Página Project Details (/projects/{id})
- [ ] SUBTASK-025.10: Form editar projeto
- [ ] SUBTASK-025.11: Button delete com confirmação
- [ ] SUBTASK-025.12: Filtros e busca
- [ ] SUBTASK-025.13: Paginação
- [ ] SUBTASK-025.14: Serviço ProjectService
- [ ] SUBTASK-025.15: Tratamento de erros
- [ ] SUBTASK-025.16: Loading states
- [ ] SUBTASK-025.17: Notificações (sucesso/erro)
- [ ] SUBTASK-025.18: Testes

---

#### TASK-026: Implementar Gestão de Membros (Frontend)
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-025, TASK-012 ✓

**Subtasks:**
- [ ] SUBTASK-026.1: Tab Members em Project Details
- [ ] SUBTASK-026.2: Lista de membros com roles
- [ ] SUBTASK-026.3: Modal Add Member (busca usuário)
- [ ] SUBTASK-026.4: Button mudar role (dropdown)
- [ ] SUBTASK-026.5: Button remover membro
- [ ] SUBTASK-026.6: Confirmação antes de remover
- [ ] SUBTASK-026.7: Serviço ProjectMemberService
- [ ] SUBTASK-026.8: Testes

---

---

## 🟢 SPRINT 5: KANBAN FRONTEND (Semanas 11-12)

#### TASK-027: Implementar Quadro Kanban + Task Details
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 28 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-025, TASK-015, TASK-019 ✓

**Subtasks:**
- [ ] SUBTASK-027.1: Página Kanban (/projects/{id}/kanban)
- [ ] SUBTASK-027.2: Layout 4 colunas (TODO, IN_PROGRESS, UNDER_REVIEW, DONE)
- [ ] SUBTASK-027.3: Implementar dnd-kit para drag-drop
- [ ] SUBTASK-027.4: Card de tarefa com título, prioridade, responsável
- [ ] SUBTASK-027.5: Modal Task Details ao clicar
- [ ] SUBTASK-027.6: Editar título, descrição
- [ ] SUBTASK-027.7: Atribuir responsável (dropdown)
- [ ] SUBTASK-027.8: Mudar prioridade
- [ ] SUBTASK-027.9: Definir data de vencimento (datepicker)
- [ ] SUBTASK-027.10: Adicionar/remover tags
- [ ] SUBTASK-027.11: Seção de Comentários
- [ ] SUBTASK-027.12: Form adicionar comentário com @mentions
- [ ] SUBTASK-027.13: Editor de comentário (rich text)
- [ ] SUBTASK-027.14: Suporte a @mentions com autocomplete
- [ ] SUBTASK-027.15: Buttons editar/deletar próprio comentário
- [ ] SUBTASK-027.16: Seção de Anexos
- [ ] SUBTASK-027.17: Drag-drop para upload
- [ ] SUBTASK-027.18: Progress bar durante upload
- [ ] SUBTASK-027.19: Button download
- [ ] SUBTASK-027.20: Button deletar com confirmação
- [ ] SUBTASK-027.21: Timeline de histórico de alterações
- [ ] SUBTASK-027.22: Filtros (por responsável, tag, prioridade)
- [ ] SUBTASK-027.23: Busca de tarefas
- [ ] SUBTASK-027.24: Avisos/loading durante drag-drop
- [ ] SUBTASK-027.25: Validação de transições de status
- [ ] SUBTASK-027.26: TaskService (CRUD)
- [ ] SUBTASK-027.27: Polling do backend para sync
- [ ] SUBTASK-027.28: Testes

---

#### TASK-028: Implementar Notificações (Frontend)
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 10 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-024, TASK-020 ✓

**Subtasks:**
- [ ] SUBTASK-028.1: Bell icon no header com contador
- [ ] SUBTASK-028.2: Dropdown para listar notificações não lidas
- [ ] SUBTASK-028.3: Página Notifications (/notifications)
- [ ] SUBTASK-028.4: Filtro por tipo
- [ ] SUBTASK-028.5: Botão marcar como lido
- [ ] SUBTASK-028.6: Botão deletar
- [ ] SUBTASK-028.7: Toast notifications (bottom-right)
- [ ] SUBTASK-028.8: NotificationService
- [ ] SUBTASK-028.9: Polling do backend
- [ ] SUBTASK-028.10: Testes

---

---

## 🟢 SPRINT 6: TESTES, POLISH E MVP (Semanas 13-16)

#### TASK-029: Testes Completos + Integração
- **Prioridade:** 🔴 CRÍTICA
- **Estimativa:** 20 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-027, TASK-028 ✓

**Subtasks:**
- [ ] SUBTASK-029.1: Testar todos os endpoints com frontend
- [ ] SUBTASK-029.2: Validar erros e mensagens
- [ ] SUBTASK-029.3: Aumentar cobertura backend (alvo: 80%)
- [ ] SUBTASK-029.4: Aumentar cobertura frontend (alvo: 70%)
- [ ] SUBTASK-029.5: Testes de integração (API)
- [ ] SUBTASK-029.6: Testes E2E (happy path principal)
- [ ] SUBTASK-029.7: Testes de segurança (injeção, XSS)
- [ ] SUBTASK-029.8: Testes de concorrência
- [ ] SUBTASK-029.9: LGPD compliance check
- [ ] SUBTASK-029.10: Acessibilidade (WCAG 2.1 AA)
- [ ] SUBTASK-029.11: UX Polish e refinement
- [ ] SUBTASK-029.12: Otimização DB queries
- [ ] SUBTASK-029.13: Frontend code splitting
- [ ] SUBTASK-029.14: Frontend lazy loading
- [ ] SUBTASK-029.15: Performance testing
- [ ] SUBTASK-029.16: Bug fixes e ajustes
- [ ] SUBTASK-029.17: Testes de regressão
- [ ] SUBTASK-029.18: Edge cases
- [ ] SUBTASK-029.19: Error handling completo
- [ ] SUBTASK-029.20: Documentação de manual QA

---

#### TASK-030: Documentação Completa
- **Prioridade:** 🟡 ALTA
- **Estimativa:** 8 pontos
- **Responsável:** Você
- **Status:** 📋 A Fazer
- **Dependências:** TASK-029 ✓

**Subtasks:**
- [ ] SUBTASK-030.1: README.md (setup, arquitetura, como contribuir)
- [ ] SUBTASK-030.2: API Documentation (Swagger/OpenAPI)
- [ ] SUBTASK-030.3: Database Schema documentation
- [ ] SUBTASK-030.4: Architecture Decision Records (ADR)
- [ ] SUBTASK-030.5: Setup guide (local)
- [ ] SUBTASK-030.6: Troubleshooting guide
- [ ] SUBTASK-030.7: Code standards document
- [ ] SUBTASK-030.8: User manual/tutorial

---

---

## 📊 RESUMO EXECUTIVO

### Estatísticas de Projeto

| Métrica | Valor |
|---------|-------|
| **Total de Tasks** | 30 |
| **Total de Subtasks** | 108 |
| **Sprints Planejados** | 6 |
| **Semanas Total** | 16 semanas |
| **Estimativa Pontos** | ~280 story points |
| **Team Size** | Solo Developer (Você) |
| **Velocity Estimada** | ~50 pontos/sprint |

### Critical Path (Desenvolvimento Local)

```
SPRINT 0 (1 semana)
├─ TASK-001: Architecture ✓
├─ TASK-002: Database ✓
├─ TASK-003: Frontend Arch ✓
├─ TASK-004: API Design ✓
└─ TASK-005: Docker Compose ✓

SPRINT 1-3 (Backend Core)
├─ TASK-006: Auth JWT ✓
├─ TASK-007: RBAC ✓
├─ TASK-009: Users ✓
├─ TASK-011: Projects ✓
├─ TASK-015: Tasks ✓
├─ TASK-017: Comments ✓
├─ TASK-019: Kanban ✓
└─ TASK-020: Notifications ✓

SPRINT 4-5 (Frontend Core)
├─ TASK-021: React Setup ✓
├─ TASK-024: Auth FE + Profile ✓
├─ TASK-025: Dashboard + Projects ✓
├─ TASK-027: Kanban FE ✓
└─ TASK-028: Notifications FE ✓

SPRINT 6 (Tests + Polish)
├─ TASK-029: Tests & Integration ✓
└─ TASK-030: Documentation ✓
```

**Total Critical Path:** ~9-10 semanas

---

## 🎯 Próximos Passos IMEDIATOS

1. ✅ **AGORA:** Começar TASK-001 (Arquitetura Backend)
2. ✅ **Paralelo:** TASK-003 (Arquitetura Frontend)
3. ✅ **Depois:** TASK-002 (Database Design)
4. ✅ **Em paralelo:** TASK-004 (API Design)
5. ✅ **Final do Sprint 0:** TASK-005 (Docker Compose)

---

**Versão:** 2.0 | **Data:** Dezembro 2025 | **Escopo:** Desenvolvimento Local Apenas | **Autor:** Ítalo (Solo Developer)