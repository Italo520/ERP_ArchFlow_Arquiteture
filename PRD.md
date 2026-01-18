# Product Requirement Document (PRD) - Migração para Full Stack Next.js & PWA

Este documento detalha o plano de execução para transformar o ERP ArchFlow em uma aplicação Full Stack utilizando Next.js, eliminando o backend Java Spring Boot e implementando funcionalidades PWA.

---

## 1. Reestruturação da Arquitetura (Unificação)

Objetivo: Preparar o ambiente Next.js e migrar a modelagem de dados para o novo ORM.

- [ ] **Inicializar Projeto Next.js**
    - Criar uma nova estrutura Next.js (App Router) na raiz ou renomear `projeto-arquitetura-frontend` para adaptar.
    - Instalar dependências iniciais: `next`, `react`, `react-dom`, `typescript`, `@types/node`, `@types/react`.
    - Configurar `tsconfig.json` para TypeScript.
    - Garantir que o `tailwind.config.js` e `postcss.config.js` estejam configurados corretamente no novo ambiente.

- [ ] **Configurar Prisma ORM**
    - Instalar Prisma: `npm install prisma --save-dev` e `npm install @prisma/client`.
    - Inicializar Prisma: `npx prisma init`.
    - Configurar `schema.prisma` para conectar ao PostgreSQL via `DATABASE_URL` (definir em `.env.local`).

- [ ] **Migração de Modelos (Java -> Prisma)**
    - [ ] Criar model `User` no `schema.prisma` baseado em `User.java` (campos: id, name, email, password, role, etc.).
    - [ ] Criar model `Project` no `schema.prisma` baseado em `Project.java` (campos: id, title, description, startDate, endDate, status, etc.).
    - [ ] Criar model `Task` no `schema.prisma` baseado em `Task.java` (campos: id, title, description, deadline, priority, stageId, projectId, assigneeId).
    - [ ] Criar model `Stage` no `schema.prisma` baseado em `Stage.java` (campos: id, name, order, projectId).
    - [ ] Definir relacionamentos (1:N, N:M) entre Users, Projects, Tasks e Stages.
    - [ ] Rodar `npx prisma migrate dev --name init_migration` para gerar as tabelas no banco.

- [ ] **Limpeza do Legado**
    - [ ] Remover completamente a pasta `projeto-arquitetura-backend`.
    - [ ] Remover arquivo `pom.xml` da raiz (se existir).
    - [ ] Consolidar variáveis de ambiente do backend e frontend em um único `.env.local`.

---

## 2. Implementação do Backend no Next.js (API Routes & Server Actions)

Objetivo: Recriar a lógica de negócios do Spring Boot utilizando recursos nativos do Next.js.

- [ ] **Configuração de Autenticação (NextAuth.js)**
    - Instalar `next-auth`: `npm install next-auth`.
    - Configurar `auth.ts` (ou `pages/api/auth/[...nextauth].ts` dependendo da versão) para gerenciar credenciais (email/senha).
    - Implementar provider de `Credentials` que valida o usuário contra o banco via Prisma.
    - Substituir a lógica de `JwtService.java` e `AuthController.java` pelo gerenciamento de sessão do NextAuth.
    - Criar rota de login e registro.

- [ ] **Middleware de Segurança**
    - Criar `middleware.ts` na raiz do projeto.
    - Configurar proteção de rotas (ex: `/dashboard`, `/projects`) para redirecionar usuários não autenticados para `/login`.
    - Substituir a lógica do `SecurityConfig.java`.

- [ ] **Migração de Serviços (Service Layer -> Server Actions/Route Handlers)**
    - **Projetos (`ProjectService.java`):**
        - [ ] Criar Server Actions ou Route Handlers para: `createProject`, `getAllProjects`, `getProjectById`, `updateProject`, `deleteProject`.
        - [ ] Validar dados de entrada (Zod recomendado).
    - **Tarefas (`TaskService.java`):**
        - [ ] Criar Server Actions ou Route Handlers para: `createTask`, `updateTask`, `deleteTask`, `moveTask` (atualizar `stageId`).
        - [ ] Implementar lógica de persistência de movimentação do Kanban.

---

## 3. Adaptação do Frontend e Funcionalidades PWA

Objetivo: Migrar componentes React para Next.js e habilitar PWA.

- [ ] **Migração de Componentes e Páginas**
    - Mover componentes de `src/components` para a estrutura do Next.js.
    - Converter `Dashboard.jsx` para `app/dashboard/page.tsx`.
    - **Refatoração para Server Components:**
        - Identificar chamadas de API (Axios/useEffect) que buscam dados iniciais.
        - Substituir por chamadas diretas ao banco (Prisma) dentro do componente (tornando-o `async`).
        - Passar dados iniciais como props para Client Components (ex: Kanban Board).

- [ ] **Configuração PWA (`next-pwa`)**
    - Instalar pacote: `npm install next-pwa`.
    - Configurar `next.config.js` para usar o plugin PWA.
    - [ ] Criar `manifest.json` em `public/`:
        - Definir `name`, `short_name`, `theme_color`, `background_color`.
        - Adicionar ícones (192x192, 512x512) na pasta `public/icons`.
    - [ ] Testar registro do Service Worker e funcionamento offline.

- [ ] **Kanban e Gerenciamento de Estado**
    - Manter uso do `@dnd-kit`.
    - Criar uma Server Action `updateTaskStage(taskId, newStageId)`.
    - No evento `onDragEnd` do Kanban, chamar essa Server Action para persistir a mudança no banco de dados.
    - Implementar "Optimistic UI" (atualizar a interface antes da resposta do servidor) para sensação de instantaneidade.

---

## 4. Correções e Melhorias Críticas

Objetivo: Polimento final e funcionalidades essenciais.

- [ ] **Tratamento de Datas**
    - Instalar `date-fns`: `npm install date-fns`.
    - Substituir qualquer manipulação de data legada (Java Date/Calendar logic) por funções do `date-fns` no frontend e backend.
    - Garantir formatação correta nos formulários e exibições.

- [ ] **Refinamento de UI/UX**
    - Verificar consistência do Tailwind CSS após migração.
    - Garantir responsividade dos componentes Radix UI.
    - Testar navegação entre páginas (Link component do Next.js).

- [ ] **Testes Finais**
    - Validar fluxo completo: Cadastro -> Login -> Criar Projeto -> Criar Tarefa -> Mover no Kanban -> Logout.
    - Verificar persistência de dados no PostgreSQL.
    - Auditar segurança (rotas protegidas).

---
