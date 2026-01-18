# ArchFlow Frontend - Next.js

Sistema de gestão de projetos de arquitetura construído com Next.js 15.

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- Backend Spring Boot rodando em `http://localhost:8080`

### Instalação

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

A aplicação estará disponível em **http://localhost:3000**

## 📁 Estrutura do Projeto

```
frontend-nextjs/
├── app/                      # App Router (Next.js 15)
│   ├── (auth)/              # Rotas públicas (Login, Registro)
│   ├── (dashboard)/         # Rotas protegidas (Dashboard, Clientes, etc.)
│   ├── layout.js            # Layout raiz
│   ├── page.jsx             # Página inicial (redirect)
│   └── globals.css          # Estilos globais
├── components/              # Componentes React
│   ├── ui/                  # Componentes de UI (Radix)
│   ├── layout/              # Componentes de layout
│   ├── NotificationBell.jsx # Sino de notificações (WebSocket)
│   └── Layout.jsx           # Layout principal com sidebar
├── services/                # Serviços de API
│   ├── api.js              # Cliente Axios
│   ├── authService.js      # Autenticação
│   └── *.service.js        # Outros serviços
├── hooks/                   # Custom Hooks
│   └── useWebSocket.js     # Hook para WebSocket/STOMP
├── lib/                     # Utilitários
│   └── utils.js            # Funções auxiliares
├── middleware.js            # Middleware de autenticação
└── .env.local              # Variáveis de ambiente
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Backend

Certifique-se de que o backend esteja configurado com:
- CORS habilitado para `http://localhost:3000`
- Endpoint WebSocket em `/ws`
- Endpoints de API em `/api/v1/*`

## ✨ Funcionalidades

### ✅ Implementadas

- **Autenticação**
  - Login/Registro
  - Proteção de rotas via middleware
  - Armazenamento seguro com cookies

- **Dashboard Financeiro**
  - Gráficos com Recharts
  - Métricas em tempo real
  - Visão geral de receitas/despesas

- **Gestão de Projetos**
  - Kanban com drag-and-drop (@dnd-kit)
  - Visualização de detalhes
  - Status e progresso

- **Clientes e Documentos**
  - CRUD completo
  - Upload de arquivos
  - Busca e filtros

- **Agenda/Cronograma**
  - Visualização de tarefas
  - Datas e prazos

- **Notificações em Tempo Real** ⭐ NOVO!
  - WebSocket/STOMP
  - Sino de notificações com contador
  - Notificações do navegador
  - Reconexão automática

## 🔌 WebSocket (Notificações)

### Como Funciona

O sistema usa **STOMP** sobre **SockJS** para comunicação em tempo real com o backend.

**Hook:** `useWebSocket.js`
```javascript
const { notifications, isConnected, unreadCount } = useWebSocket();
```

**Componente:** `NotificationBell.jsx`
- Exibe contador de não lidas
- Dropdown com lista de notificações
- Indicador de conexão (verde/cinza)

### Endpoints Subscritos

- `/user/queue/notifications` - Notificações específicas do usuário
- `/topic/notifications` - Notificações gerais (broadcast)

### Como Testar

1. Fazer login na aplicação
2. Abrir console do navegador (F12)
3. Verificar mensagem: `"WebSocket connected!"`
4. Enviar notificação do backend
5. Observar atualização em tempo real

## 🧪 Testes

Veja o guia completo em [TESTING_GUIDE.md](./TESTING_GUIDE.md)

**Checklist rápido:**
- [ ] Login/Logout funcionando
- [ ] Rotas protegidas
- [ ] Navegação entre páginas
- [ ] Dashboard carrega dados
- [ ] Kanban drag-and-drop
- [ ] CRUD de clientes/documentos
- [ ] Notificações em tempo real (WebSocket)
- [ ] Responsividade (mobile/tablet/desktop)

## 🛠️ Tecnologias

- **Framework:** Next.js 16.1.1 (App Router)
- **React:** 19.1.1
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Charts:** Recharts
- **Drag & Drop:** @dnd-kit
- **Rich Text:** TipTap
- **HTTP Client:** Axios
- **WebSocket:** STOMP.js + SockJS
- **State:** React Hooks + Context

## 📝 Scripts

```bash
# Desenvolvimento com hot reload
npm run dev

# Build de produção
npm run build

# Rodar build de produção
npm start

# Linting
npm run lint
```

## 🚨 Troubleshooting

### Build falha
```bash
rm -rf .next node_modules
npm install
npm run build
```

### WebSocket não conecta
- Verificar se backend está rodando
- Verificar endpoint `/ws` no backend
- Verificar logs do console (F12)
- Verificar token de autenticação nos cookies

### Páginas em branco
- Abrir console (F12) e verificar erros
- Verificar se backend está respondendo
- Verificar variável `NEXT_PUBLIC_API_URL`

## 📄 Documentação Adicional

- [Guia de Testes](./TESTING_GUIDE.md)
- [Walkthrough da Migração](/.gemini/antigravity/brain/.../walkthrough.md)

## 🎯 Próximos Passos

- [ ] Testes automatizados (Jest, Cypress)
- [ ] Deploy em produção (Vercel/servidor)
- [ ] Otimização de imagens (next/image)
- [ ] Internacionalização (i18n)
- [ ] PWA (Service Workers)

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar [TESTING_GUIDE.md](./TESTING_GUIDE.md)
2. Consultar logs do console/network
3. Verificar status do backend

---

**Versão:** 1.0.0  
**Data:** 04/01/2026  
**Status:** ✅ Produção
