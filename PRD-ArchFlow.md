# 📋 Product Requirements Document (PRD)
## ArchFlow - Sistema de Gestão para Arquitetura

**Versão:** 1.0  
**Data:** Dezembro 2025  
**Status:** Documentação de Especificação  
**Autor:** Ítalo (Arquiteto de Sistemas)

---

## 🏢 Executive Summary

O **ArchFlow** é uma plataforma SaaS (Software as a Service) inovadora projetada especificamente para escritórios de arquitetura gerenciarem seus projetos, etapas e tarefas de forma visual, intuitiva e escalável. Utilizando metodologia Kanban, o sistema permite que arquitetos, gestores de projetos e equipes colaboradoras acompanhem o progresso de cada obra desde a concepção até a entrega final, garantindo cumprimento de prazos, qualidade de execução e transparência total.

O projeto segue princípios de **Arquitetura Limpa**, **Design Patterns** avançados e **Escalabilidade em Nuvem** (GCP/Kubernetes), posicionando-se como uma solução enterprise-ready para empresas de qualquer porte.

---

## 1️⃣ Visão Geral do Produto

### 1.1 Propósito

Eliminar a fragmentação de informações em projetos arquitetônicos tradicionais, que frequentemente utilizam planilhas, emails e comunicação manual. ArchFlow centraliza:

- **Gestão de Projetos**: Organize residências, obras comerciais, reformas
- **Rastreamento de Tarefas**: Acompanhe etapas com metodologia Kanban visual
- **Colaboração em Tempo Real**: Equipes sincronizadas e alinhadas
- **Histórico e Auditoria**: Compliance com LGPD e rastreabilidade completa

### 1.2 Visão do Produto

**"Transformar a gestão de projetos arquitetônicos através de uma plataforma moderna, intuitiva e escalável que integra equipes, otimiza workflows e garante entrega de qualidade com prazos cumpridos."**

### 1.3 Público-Alvo (User Personas)

#### Persona 1: Arquiteto Senior (Proprietário)
- **Objetivo**: Supervisionar múltiplos projetos simultaneamente
- **Necessidade**: Dashboard executivo, relatórios, análise de progresso
- **Desafio**: Falta de visibilidade centralizada em projetos em paralelo

#### Persona 2: Gerente de Projeto
- **Objetivo**: Coordenar equipes e garantir cronograma
- **Necessidade**: Atribuição de tarefas, acompanhamento de prazos, escalação
- **Desafio**: Comunicação descentralizada entre arquitetos, fornecedores, clientes

#### Persona 3: Arquiteto Executivo/Estagiário
- **Objetivo**: Executar tarefas e colaborar com a equipe
- **Necessidade**: Clareza de responsabilidades, feedback rápido, documentação
- **Desafio**: Falta de contexto e foco do escopo

#### Persona 4: Cliente/Stakeholder
- **Objetivo**: Acompanhar progresso do projeto
- **Necessidade**: Visualização simplificada, atualizações periódicas
- **Desafio**: Falta de transparência e controle

---

## 2️⃣ Problemas e Oportunidades

### 2.1 Problemas Identificados

| Problema | Impacto | Solução Atual |
|----------|---------|---------------|
| **Fragmentação de dados** | Informações dispersas em emails, WhatsApp, planilhas | Erro humano, retrabalho |
| **Falta de visibilidade** | Não há perspectiva unificada do progresso | Atrasos não detectados à tempo |
| **Comunicação ineficiente** | Equipes desalinhadas, decisões lentificadas | Conflitos, retrabalho |
| **Ausência de auditoria** | Impossível rastrear quem fez o quê e quando | Problemas legais, LGPD |
| **Gestão de recursos** | Desconhecimento de capacidade da equipe | Gargalos não identificados |
| **Falta de documentação** | Conhecimento disperso, onboarding lento | Turnover impacta continuidade |

### 2.2 Oportunidades de Mercado

- **Brasil**: ~15.000 escritórios de arquitetura (ASBEA)
- **Mercado SaaS em Arquitetura**: Pouco explorado comparado a construção
- **Tendência Digital**: Aceleração pós-pandemia em transformação digital
- **Compliance**: Demanda crescente por LGPD e rastreabilidade

---

## 3️⃣ Objetivos do Produto

### 3.1 Objetivos Primários (OKRs)

**O1: Facilitar Gestão de Projetos**
- ✅ Arquitetos devem visualizar status completo em <2 segundos
- ✅ Criar projeto novo em <5 cliques
- ✅ 95% de satisfação de facilidade de uso

**O2: Melhorar Colaboração Intra-Equipe**
- ✅ Reduzir emails sobre projetos em 80%
- ✅ Suportar comentários, @mentions, notificações
- ✅ Histórico completo de comunicação por tarefa

**O3: Assegurar Conformidade e Segurança**
- ✅ LGPD 100% implementado
- ✅ Auditoria completa de todas as ações
- ✅ Criptografia end-to-end em dados sensíveis

**O4: Escalar para Enterprise**
- ✅ Arquitetura de Microserviços
- ✅ 99.9% uptime (SLA)
- ✅ Suporte a 10.000+ usuários simultâneos

### 3.2 Sucesso do Produto

**Métricas de Negócio**
- Retenção mensal de clientes: >95%
- Customer Lifetime Value (CLV): >$5.000
- Net Revenue Retention (NRR): >110%

**Métricas de Produto**
- Daily Active Users (DAU): Crescimento 20% mês
- Task Completion Rate: >85%
- Platform Availability: 99.9% uptime

---

## 4️⃣ Funcionalidades Principais

### 4.1 Módulo de Gestão de Projetos

#### F1.1: Criar e Organizar Projetos
```
Funcionalidade: Criar novo projeto arquitetônico
Atores: Arquiteto Senior, Gerente de Projeto
Pré-requisito: Usuário autenticado com permissão de criação
Fluxo Principal:
  1. Usuário acessa menu "Novos Projetos"
  2. Preenche formulário: Nome, Descrição, Data Início, Data Fim, Cliente
  3. Seleciona Tipo: Residencial, Comercial, Reforma, Outro
  4. Atribui membros da equipe ao projeto
  5. Clica "Criar Projeto"
  6. Sistema cria estrutura padrão de Kanban (TODO, IN PROGRESS, REVIEW, DONE)
Pós-requisito: Projeto criado e visível no dashboard
Restrição: Projeto deve ter pelo menos um membro
```

#### F1.2: Dashboard Executivo
- **Timeline Visual**: Cronograma Gantt com milestones
- **Indicadores KPI**:
  - Projetos em andamento
  - Taxa de conclusão de tarefas
  - Atraso acumulado
  - Saúde geral do projeto (verde/amarelo/vermelho)

#### F1.3: Configuração de Fases Customizáveis
- Padrão: Conceituação → Projeto → Orçamento → Construção → Entrega
- Permite customizar fases por tipo de projeto
- Automatização de transição de fases

### 4.2 Módulo de Tarefas (Kanban)

#### F2.1: Quadro Kanban Visual
- **Colunas dinâmicas**: TODO, IN PROGRESS, UNDER REVIEW, DONE
- **Drag & Drop**: Interface intuitiva com dnd-kit
- **Atualizações Real-Time**: WebSockets para sincronização instantânea

#### F2.2: Gerenciamento de Tarefas

```json
{
  "id": "uuid",
  "titulo": "Desenhar Planta Baixa",
  "descricao": "Detalhe completo da distribuição de ambientes",
  "projeto_id": "uuid",
  "responsavel_id": "uuid",
  "status": "IN_PROGRESS",
  "prioridade": "HIGH",
  "data_inicio": "2025-01-15",
  "data_vencimento": "2025-01-20",
  "tags": ["planta-baixa", "urgente"],
  "anexos": [],
  "checklist": [],
  "comentarios": [],
  "historico_alteracoes": [],
  "criado_em": "2025-01-10T10:00:00Z",
  "atualizado_em": "2025-01-15T14:30:00Z"
}
```

#### F2.3: Comentários e Colaboração
- Comentários com @mentions
- Notificações em tempo real
- Histórico completo de discussão
- Anexos (imagens, PDFs, documentos)
- Edição e exclusão com auditoria

#### F2.4: Anexos e Versionamento
- Upload de arquivos (plantas, renders, orçamentos)
- Versionamento automático de arquivos
- Histórico de mudanças
- Suporte a formatos: PDF, DWG, PNG, JPG, DOCX

### 4.3 Módulo de Usuários e Permissões

#### F3.1: Sistema de Papéis (RBAC)
```
Papéis Disponíveis:

├── ADMIN
│   └── Acesso total ao sistema e configurações
├── PROJECT_OWNER
│   └── Propriedade de projeto, gestão de membros
├── PROJECT_MANAGER
│   └── Gestão de tarefas, atribuições, prazos
├── ARCHITECT
│   └── Criação e execução de tarefas
├── VIEWER
│   └── Apenas leitura de projetos e tarefas
└── CLIENT
    └── Acesso restrito ao progresso do projeto
```

#### F3.2: Controle de Acesso Granular
- Permissões por projeto
- Permissões por tarefa (visibilidade e edição)
- Auditoria de acesso
- Login com autenticação JWT + 2FA (futuro)

### 4.4 Módulo de Notificações

#### F4.1: Sistema de Notificações Inteligente
- **Email**: Resumo diário/semanal de atividades
- **In-App**: Notificações em tempo real
- **Push (Futuro)**: Notificações mobile

#### F4.2: Preferências de Notificação
- Usuário controla quais eventos disparam notificações
- Silenciar notificações por período
- Digest inteligente (agrupa notificações similares)

### 4.5 Módulo de Relatórios e Analytics

#### F5.1: Relatórios Pré-construídos
- **Progresso de Projeto**: Timeline vs. Atual
- **Performance da Equipe**: Tarefas completadas, velocidade média
- **Atividade**: Log completo de quem fez o quê
- **Financeiro (Futuro)**: Horas-homem, custos

#### F5.2: Exportação
- PDF com branding customizado
- Excel com dados brutos para análise
- CSV para integração

---

## 5️⃣ Arquitetura Técnica

### 5.1 Stack Tecnológico (Confirmado)

**Backend**
```
├── Linguagem: Java 17
├── Framework: Spring Boot 3.0+
├── Segurança: Spring Security + JWT
├── ORM: Hibernate/JPA
├── Banco: PostgreSQL 15
├── Containerização: Docker
└── Orquestração: Kubernetes (GKE - Google Cloud)
```

**Frontend**
```
├── Framework: React 18+
├── Build Tool: Vite
├── UI Components: Radix UI
├── Styling: Tailwind CSS
├── Drag & Drop: dnd-kit
├── State: Redux/Context API
└── WebSockets: Socket.io
```

**DevOps & Infraestrutura**
```
├── VCS: GitHub
├── CI/CD: GitHub Actions
├── IaC: Terraform
├── Cloud Provider: Google Cloud Platform (GCP)
│   ├── Compute: Google Cloud Run (serverless) / GKE (Kubernetes)
│   ├── Database: Cloud SQL (PostgreSQL)
│   ├── Storage: Cloud Storage (arquivos)
│   └── CDN: Cloud CDN
├── Monitoramento: Cloud Logging, Cloud Monitoring
└── Segurança: Cloud Armor, VPC
```

### 5.2 Padrões de Arquitetura

**Backend (Clean Architecture)**
```
projeto-arquitetura-backend/
├── src/
│   ├── main/java/com/archflow/
│   │   ├── domain/               # Entidades e Business Logic
│   │   ├── application/          # Use Cases e DTOs
│   │   ├── infrastructure/       # Implementações (DB, Email, etc)
│   │   ├── presentation/         # Controllers (REST API)
│   │   └── config/               # Configurações Spring
│   └── test/
├── pom.xml                        # Dependências Maven
└── Dockerfile
```

**Design Patterns Aplicados**
- **Repository Pattern**: Abstração de dados
- **Strategy Pattern**: Diferentes algoritmos de priorização/agendamento
- **Observer Pattern**: Notificações e eventos
- **Singleton Pattern**: Configurações e pools de conexão
- **Builder Pattern**: Construção complexa de objetos
- **Factory Pattern**: Criação de entidades

### 5.3 Banco de Dados (PostgreSQL)

**Entidades Principais**
```sql
-- Usuários
users (id, email, password_hash, nome, ativo, criado_em, atualizado_em)

-- Projetos
projects (id, nome, descricao, owner_id, cliente, tipo, status, 
          data_inicio, data_fim, criado_em, atualizado_em)

-- Membros do Projeto
project_members (id, project_id, user_id, role, permissoes, 
                 adicionado_em, removido_em)

-- Fases do Projeto
project_phases (id, project_id, nome, ordem, status, 
                data_inicio_estimada, data_inicio_real, 
                data_fim_estimada, data_fim_real)

-- Tarefas
tasks (id, project_id, fase_id, titulo, descricao, responsavel_id, 
       status, prioridade, data_vencimento, criado_em, atualizado_em)

-- Comentários
comments (id, task_id, user_id, conteudo, criado_em, atualizado_em)

-- Anexos
attachments (id, task_id, arquivo_url, nome_original, tipo_mime, 
             tamanho_bytes, versao, criado_em)

-- Auditoria
audit_log (id, usuario_id, tabela, operacao, registro_id, 
           dados_anteriores, dados_novos, ip_origem, 
           user_agent, timestamp)

-- Notificações
notifications (id, usuario_id, tipo, titulo, conteudo, 
               lido, criado_em, lido_em)
```

### 5.4 API REST (Endpoints Principais)

**Autenticação**
```
POST   /api/v1/auth/register         # Registro de usuário
POST   /api/v1/auth/login            # Login (retorna JWT)
POST   /api/v1/auth/refresh          # Refresh token
POST   /api/v1/auth/logout           # Logout
```

**Projetos**
```
GET    /api/v1/projects              # Listar projetos do usuário
POST   /api/v1/projects              # Criar novo projeto
GET    /api/v1/projects/{id}         # Detalhes do projeto
PUT    /api/v1/projects/{id}         # Atualizar projeto
DELETE /api/v1/projects/{id}         # Arquivar/deletar projeto
GET    /api/v1/projects/{id}/members # Listar membros
POST   /api/v1/projects/{id}/members # Adicionar membro
```

**Tarefas**
```
GET    /api/v1/projects/{id}/tasks   # Listar tarefas (com filtros)
POST   /api/v1/projects/{id}/tasks   # Criar tarefa
GET    /api/v1/tasks/{id}            # Detalhes da tarefa
PUT    /api/v1/tasks/{id}            # Atualizar tarefa
DELETE /api/v1/tasks/{id}            # Deletar tarefa
PATCH  /api/v1/tasks/{id}/status     # Mudar status (drag-drop)
POST   /api/v1/tasks/{id}/comments   # Adicionar comentário
POST   /api/v1/tasks/{id}/attachments # Upload de arquivo
```

**Relatórios**
```
GET    /api/v1/projects/{id}/report  # Relatório de progresso
GET    /api/v1/projects/{id}/analytics # Analytics do projeto
GET    /api/v1/team/analytics        # Analytics da equipe
```

### 5.5 Segurança e Conformidade

**Autenticação & Autorização**
- JWT (JSON Web Tokens) para stateless authentication
- Refresh tokens com expiração
- Password hashing com BCrypt
- 2FA (Futuro): TOTP ou SMS

**LGPD Compliance**
- ✅ Consentimento explícito para coleta de dados
- ✅ Direito ao esquecimento (GDPR-like deletion)
- ✅ Portabilidade de dados (exportação em XML/JSON)
- ✅ Auditoria completa de acesso e modificação
- ✅ Criptografia em repouso (AES-256)
- ✅ Criptografia em trânsito (HTTPS/TLS)

**Validação e Sanitização**
- Input validation em todas as APIs
- SQL injection prevention (Prepared Statements via ORM)
- XSS prevention (escaping de conteúdo)
- CSRF protection (tokens)

**Logging e Monitoramento**
- Todos os acessos logados em `audit_log`
- Tentativas de acesso não autorizado
- Mudanças em dados críticos
- Erros e exceções rastreadas

### 5.6 Performance e Escalabilidade

**Backend**
- Connection pooling (HikariCP): 20-50 conexões
- Caching em camadas (Redis futuro): queries frequentes
- Paginação obrigatória: 50 itens por página default
- Índices no banco: user_id, project_id, status, task_id
- Load balancing: Round-robin via Kubernetes

**Frontend**
- Code splitting: lazy loading de rotas
- Bundle size: <200KB gzipped (meta)
- Image optimization: WebP com fallback PNG
- Service Worker: offline capability

**Infraestrutura**
- Horizontal scaling: auto-scaling em 70% CPU
- Vertical scaling: pods de 512MB-2GB RAM
- Database replicas: read-replicas para analytics
- CDN: cache de static assets (30 dias)

---

## 6️⃣ Roadmap e Fases

### MVP (v1.0) - Q1 2025

✅ **Completado/Em Progresso**
- [x] Autenticação e gestão de usuários
- [x] CRUD de projetos básico
- [x] Quadro Kanban funcional
- [x] Tarefas com comentários
- [x] Notificações por email
- [x] Auditoria básica
- [x] Deploy em GKE

### v1.1 - Q2 2025

🔄 **Planejado**
- [ ] 2FA (autenticação de dois fatores)
- [ ] Relatórios em PDF/Excel
- [ ] Timeline visual (Gantt)
- [ ] Busca avançada e filtros salvos
- [ ] Integração com Google Calendar
- [ ] Mobile responsive refinement

### v1.2 - Q3 2025

📋 **Roadmap**
- [ ] Integração com Figma/AutoCAD
- [ ] Versionamento avançado de arquivos
- [ ] Colaboração real-time em documentos
- [ ] Webhooks para integrações customizadas
- [ ] API GraphQL (adicional ao REST)
- [ ] Multi-idioma (PT, EN, ES)

### v2.0 - Q4 2025

🚀 **Visão de Longo Prazo**
- [ ] Gestão financeira integrada (budgets, invoicing)
- [ ] Module de Recursos Humanos (timesheet, capacidade)
- [ ] AI-powered insights (previsão de atrasos)
- [ ] Mobile app nativa (iOS/Android)
- [ ] Integração com Slack/Teams
- [ ] White-label para resellers

---

## 7️⃣ Critérios de Aceitação (User Stories)

### US-001: Criar Projeto Novo
```
Como: Arquiteto Senior
Quero: Criar um novo projeto arquitetônico
Para: Iniciar acompanhamento de uma nova obra

Critérios de Aceitação:
  ✓ Formulário com campos obrigatórios: Nome, Tipo, Data Início
  ✓ Possibilidade de adicionar descrição (opcional)
  ✓ Validação de datas (fim deve ser > início)
  ✓ Mensagem de sucesso ao criar
  ✓ Projeto aparece no dashboard imediatamente
  ✓ Criar estrutura Kanban automática
  ✓ Enviar notificação aos membros adicionados
```

### US-002: Mover Tarefa no Kanban
```
Como: Arquiteto Executivo
Quero: Mover uma tarefa entre colunas do Kanban
Para: Refletir o progresso real do trabalho

Critérios de Aceitação:
  ✓ Drag & Drop intuitivo de tarefas
  ✓ Feedback visual durante o arraste
  ✓ Atualização instantânea no backend (WebSocket)
  ✓ Histórico registrado com timestamp e usuário
  ✓ Notificar responsável da mudança
  ✓ Suportar múltiplas seleções (shift-click) - futuro
```

### US-003: Comentar em Tarefa
```
Como: Membro da equipe
Quero: Adicionar comentário em uma tarefa
Para: Comunicar progresso, problemas ou feedback

Critérios de Aceitação:
  ✓ Editor de texto rich (bold, italic, links)
  ✓ Suporte a @mentions de outros membros
  ✓ Notificar usuários mencionados
  ✓ Histórico completo de comentários
  ✓ Editar/deletar próprio comentário
  ✓ Timestamp e autor visíveis
  ✓ Anexar imagens inline
```

---

## 8️⃣ Métricas de Sucesso

### Engagement
- DAU (Daily Active Users) > 100 no 1º mês
- MAU (Monthly Active Users) > 300 no 3º mês
- Task completion rate > 85%
- Session duration média > 15 min

### Retenção
- Month 1 Retention > 80%
- Month 3 Retention > 70%
- Churn rate < 5% mensal

### Performance
- Time to First Interaction < 2s
- API Response time < 200ms (p95)
- Uptime > 99.9%
- Erro rate < 0.1%

### Adoção
- Onboarding completion rate > 90%
- Feature adoption (por feature) > 60%
- NPS > 50

---

## 9️⃣ Riscos e Mitigação

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Indisponibilidade de DB | Média | Alto | Replicas + Backups automatizados |
| Data breach/LGPD | Baixa | Crítico | Criptografia + Auditoria rigorosa |
| Falta de adoção de usuários | Média | Alto | UX refinement + suporte dedicado |
| Competição (Asana, Monday) | Alta | Médio | Foco em nichos arquitetura |
| Problemas de performance | Média | Médio | Load testing + otimização contínua |
| Turnover de desenvolvedores | Média | Médio | Documentação + pair programming |

---

## 🔧 Conclusão

O **ArchFlow** é posicionado como a solução mais intuitiva e escalável para gestão de projetos arquitetônicos no Brasil. Com foco em **experiência do usuário**, **conformidade regulatória** (LGPD) e **arquitetura moderna** (Cloud-Native), o produto atende às demandas crescentes do mercado de arquitetura por digitalização e eficiência operacional.

A implementação seguirá **metodologia ágil** (Scrum), com sprints de 2 semanas, testes automatizados (TDD) e deploy contínuo (CI/CD) garantindo qualidade e velocidade de iteração.

---

**Próximas Ações:**
1. ✅ Apresentar PRD ao time de stakeholders
2. ✅ Refinamento de user stories com product management
3. ✅ Estimativa de esforço (planning poker)
4. ✅ Sprint 0: Setup infraestrutura, documentação
5. ✅ Sprint 1+: Desenvolvimento das features do MVP

**Contato:** Ítalo (Arquiteto de Sistemas)  
**Repositório:** [GitHub - ERP_ArchFlow_Arquiteture](https://github.com/Italo520/ERP_ArchFlow_Arquiteture)