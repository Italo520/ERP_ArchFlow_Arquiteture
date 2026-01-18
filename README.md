# ArchFlow ERP - Full Stack Next.js

Sistema de gestão de projetos de arquitetura (ERP) migrado para uma arquitetura Full Stack monolítica moderna com **Next.js 16**, **Prisma ORM** e **PostgreSQL**.

Este projeto substitui a antiga arquitetura desacoplada (Frontend React + Backend Java Spring Boot) por uma solução unificada, performática e pronta para PWA.

## 🚀 Tecnologias

- **Framework:** [Next.js 16.1.1](https://nextjs.org/) (App Router & Server Actions)
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL (via Supabase)
- **ORM:** [Prisma](https://www.prisma.io/) 7.2
- **Autenticação:** [NextAuth.js v5](https://authjs.dev/) (Beta)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** Radix UI, Lucide React, Shadcn/UI (padrões)
- **Funcionalidades:** 
  - Kanban Drag & Drop (@dnd-kit)
  - Editor de Texto Rico (TipTap)
  - Gráficos (Recharts)
  - PWA (Progressive Web App)

## 🏗️ Arquitetura

O sistema utiliza **Server Actions** para comunicação direta com o banco de dados, eliminando a necessidade de uma API REST separada para a maioria das operações.

### Estrutura de Pastas

```
frontend-nextjs/
├── actions/                 # Server Actions (Lógica de Backend)
│   ├── auth.ts             # Autenticação (Login, Registro)
│   ├── project.ts          # CRUD de Projetos
│   ├── task.ts             # Gestão de Tarefas
│   └── stage.ts            # Movimentação de Stages
├── app/                     # Next.js App Router
│   ├── (auth)/             # Rotas públicas
│   ├── (dashboard)/        # Rotas protegidas da aplicação
│   └── api/                # Route Handlers (se necessário)
├── prisma/                  # Schema do Banco de Dados
│   └── schema.prisma       # Definição de tabelas e relações
├── components/              # Componentes React (Server & Client)
├── lib/                     # Utilitários e Configurações
└── public/                  # Assets estáticos
```

## 🛠️ Configuração e Instalação

### Pré-requisitos

- Node.js 20+
- PostgreSQL (Local ou Cloud/Supabase)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Italo520/ERP_ArchFlow_Arquiteture.git
   cd ERP_ArchFlow_Arquiteture
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente**
   Crie um arquivo `.env` na raiz do projeto:

   ```env
   # Banco de Dados (PostgreSQL)
   DATABASE_URL="postgresql://user:password@localhost:5432/archflow?schema=public"

   # NextAuth
   AUTH_SECRET="sua-chave-secreta-aqui" # Gere com: openssl rand -base64 32
   ```

4. **Inicialize o Banco de Dados (Prisma)**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Inicie o Servidor de Desenvolvimento**
   ```bash
   npm run dev
   ```
   Acesse: `http://localhost:3000`

## ✨ Funcionalidades Atuais

- **Gestão de Projetos:** Criação, listagem e detalhamento de projetos arquitetônicos.
- **Kanban Board:** Movimentação de tarefas entre estágios (To Do, In Progress, Done) com persistência via Server Actions.
- **Tarefas:** Criação, edição e exclusão de tarefas com prioridades e prazos.
- **Autenticação Segura:** Login e Registro com validação e sessões persistentes via NextAuth v5.
- **Dashboard:** Visão geral (em desenvolvimento).

## 🚧 Status do Projeto

⚠️ **Em Migração Ativa**

O projeto está em fase de transição da arquitetura legada (Java) para Next.js Full Stack. Algumas funcionalidades listadas no PRD (como WebSockets e notificações em tempo real) estão sendo refatoradas para utilizar tecnologias nativas do ecossistema Next.js ou serviços serverless.

---
**Desenvolvido por:** Italo520
