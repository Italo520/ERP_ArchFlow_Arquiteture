# Guia de Testes - ArchFlow Frontend (Next.js)

## 🚀 Como Iniciar

### 1. Subir o Backend
Certifique-se de que o backend Spring Boot está rodando:
```bash
# No diretório do backend
./mvnw spring-boot:run
```
Backend deve estar em: `http://localhost:8080`

### 2. Iniciar Frontend Next.js
```bash
cd /home/italo/Área\ de\ Trabalho/backend_archflow/ArchFlow/frontend-nextjs
npm run dev
```
Frontend estará em: `http://localhost:3000`

---

## ✅ Checklist de Testes

### 1. Autenticação

#### Login com Credenciais Válidas
- [ ] Abrir `http://localhost:3000`
- [ ] Verificar redirecionamento automático para `/login`
- [ ] Inserir email e senha válidos
- [ ] Clicar em "Entrar"
- [ ] **Resultado esperado:** Redirecionamento para `/dashboard` e cookie `token` salvo

#### Login com Credenciais Inválidas
- [ ] Tentar login com email/senha incorretos
- [ ] **Resultado esperado:** Mensagem de erro "Falha no login. Verifique suas credenciais."

#### Logout
- [ ] Estando logado, clicar no botão "Sair" na sidebar
- [ ] **Resultado esperado:** Cookies limpos e redirecionamento para `/login`

#### Proteção de Rotas
- [ ] Sem estar logado, tentar acessar `http://localhost:3000/dashboard` diretamente
- [ ] **Resultado esperado:** Redirecionamento automático para `/login`
- [ ] Com login válido, tentar acessar `/login` ou `/register`
- [ ] **Resultado esperado:** Redirecionamento para `/dashboard`

#### Registro de Novo Usuário
- [ ] Clicar em "Criar uma conta" na página de login
- [ ] Preencher nome completo, email e senha
- [ ] Clicar em "Criar Conta"
- [ ] **Resultado esperado:** Conta criada e possibilidade de fazer login

---

### 2. Navegação

#### Menu Lateral
- [ ] Clicar em "Dashboard" → Verificar URL `/dashboard`
- [ ] Clicar em "Projetos" → Verificar URL `/projects`
- [ ] Clicar em "Cronograma" → Verificar URL `/schedule`
- [ ] Clicar em "Clientes" → Verificar URL `/clients`
- [ ] Clicar em "Documentos" → Verificar URL `/documents`
- [ ] Clicar em "Configurações" → Verificar URL `/settings`

#### Rota Ativa Destacada
- [ ] Verificar que o item do menu correspondente à rota atual está destacado (background diferente, ícone e texto coloridos)

#### Navegação pelo Navegador
- [ ] Navegar entre várias páginas
- [ ] Usar o botão "Voltar" do navegador
- [ ] **Resultado esperado:** Navegação funciona corretamente

---

### 3. Dashboard Financeiro

#### Renderização de Gráficos
- [ ] Abrir `/dashboard`
- [ ] **Verificar se aparecem:**
  - Gráfico de receitas/despesas
  - Cards com métricas
  - Tabelas de dados

#### Carregamento de Dados da API
- [ ] Abrir DevTools (F12) → Aba Network
- [ ] Recarregar a página do dashboard
- [ ] Verificar chamadas para `http://localhost:8080/api/v1/...`
- [ ] **Resultado esperado:** Dados carregados da API e exibidos corretamente

---

### 4. Kanban (Drag and Drop)

#### Funcionalidade de Arrastar e Soltar
- [ ] Abrir `/projects`
- [ ] Tentar arrastar um card de projeto
- [ ] Soltar em outra coluna
- [ ] **Resultado esperado:** Card muda de coluna visualmente

#### Persistência das Mudanças
- [ ] Após mover um card, recarregar a página
- [ ] **Resultado esperado:** Card permanece na nova coluna (se o backend persistir)

---

### 5. CRUD de Clientes

#### Criar Novo Cliente
- [ ] Abrir `/clients`
- [ ] Clicar em "Novo Cliente" ou botão similar
- [ ] Preencher formulário (nome, email, telefone, etc.)
- [ ] Salvar
- [ ] **Resultado esperado:** Cliente aparece na lista

#### Editar Cliente Existente
- [ ] Clicar no botão de editar de um cliente
- [ ] Modificar informações
- [ ] Salvar
- [ ] **Resultado esperado:** Alterações refletidas na lista

#### Excluir Cliente
- [ ] Clicar no botão de excluir
- [ ] Confirmar exclusão
- [ ] **Resultado esperado:** Cliente removido da lista

---

### 6. CRUD de Documentos

#### Upload de Documento
- [ ] Abrir `/documents`
- [ ] Clicar em "Upload" ou "Novo Documento"
- [ ] Selecionar arquivo
- [ ] **Resultado esperado:** Documento enviado e listado

#### Download/Visualização
- [ ] Clicar em um documento
- [ ] **Resultado esperado:** Download iniciado ou visualização aberta

#### Exclusão de Documento
- [ ] Clicar em excluir documento
- [ ] **Resultado esperado:** Documento removido

---

### 7. Responsividade

#### Desktop (> 1024px)
- [ ] Sidebar visível à esquerda
- [ ] Header com busca e notificações
- [ ] Layouts em colunas quando aplicável

#### Tablet (768px - 1023px)
- [ ] Sidebar oculta
- [ ] Menu hambúrguer visível
- [ ] Conteúdo adaptado

#### Mobile (< 768px)
- [ ] Sidebar completamente oculta
- [ ] Menu hambúrguer no header
- [ ] Cards/tabelas em coluna única
- [ ] Botões e textos legíveis

**Como testar:**
- Usar DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
- Testar em diferentes resoluções

---

### 8. WebSocket/Notificações (NOVO!)

#### Conexão WebSocket
- [ ] Fazer login
- [ ] Abrir DevTools → Console
- [ ] Verificar mensagens: `"WebSocket connected!"`
- [ ] Verificar indicador verde de conexão no sino de notificações

#### Recebimento de Notificações
- [ ] Manter aplicação aberta
- [ ] Gerar evento no backend que emita notificação
- [ ] **Resultado esperado:**
  - Badge de contador atualizado no sino
  - Notificação aparece no dropdown ao clicar no sino
  - Notificação do navegador (se permissão concedida)

#### Gerenciamento de Notificações
- [ ] Clicar no sino de notificações
- [ ] Verificar lista de notificações
- [ ] Clicar em uma notificação não lida
- [ ] **Resultado esperado:** Marcada como lida
- [ ] Clicar em "Limpar tudo"
- [ ] **Resultado esperado:** Todas as notificações removidas

---

## 🐛 Debugging

### Verificar Logs no Console
Abra DevTools (F12) → Console e verifique mensagens de:
- Erros de API
- Status do WebSocket
- Avisos do React/Next.js

### Verificar Network
DevTools → Network para:
- Ver requisições à API
- Verificar status codes (200, 401, 404, etc.)
- Inspecionar payloads de requisição/resposta

### Verificar Cookies
DevTools → Application → Cookies → `http://localhost:3000`
- Verificar se cookie `token` está presente após login
- Verificar se é removido após logout

---

## ⚠️ Problemas Comuns

### Backend não responde
- Verificar se Spring Boot está rodando em `localhost:8080`
- Verificar logs do backend

### WebSocket não conecta
- Verificar se endpoint `/ws` está habilitado no backend
- Verificar CORS no backend
- Verificar token de autenticação

### Páginas em branco
- Verificar console do navegador para erros JavaScript
- Verificar se todas as dependências foram instaladas (`npm install`)

### Build falha
- Limpar cache: `rm -rf .next`
- Reinstalar dependências: `rm -rf node_modules && npm install`
- Rodar build novamente: `npm run build`

---

## 📊 Resultado Esperado

Ao final dos testes, todas as funcionalidades devem estar:
- ✅ Funcionando corretamente
- ✅ Sem erros no console
- ✅ Responsivas em diferentes dispositivos
- ✅ Integradas com o backend
- ✅ WebSocket conectado e notificações funcionando

---

**Data:** 04/01/2026  
**Versão:** Next.js 16.1.1  
**Status:** Pronto para testes! 🚀
