# ✅ Tarefa 5 - Sistema RBAC e Membros de Projeto

## Status Geral
**3 de 4 Subtarefas Concluídas** (75% de progresso)

---

## ✅ Subtarefa 1: Implementar Entity ProjectMember e Role Enum
**Status**: COMPLETA

### Implementações:
- ✅ Enum `Role` com hierarquia (1-6)
- ✅ Método `hasPermission()` para validação hierárquica
- ✅ Entidade `ProjectMember` com JSONB para permissões
- ✅ Unique constraint `(project_id, user_id)`
- ✅ Testes unitários (5/5 passando)

**Arquivos modificados:**
- `src/main/java/com/archflow/model/Role.java`
- `src/main/java/com/archflow/model/ProjectMember.java`
- `src/test/java/com/archflow/model/RoleTest.java`

---

## ✅ Subtarefa 2: Desenvolver ProjectMemberService com métodos CRUD
**Status**: COMPLETA

### Implementações:
- ✅ `addMember()` com validação de permissão (PROJECT_OWNER+)
- ✅ `removeMember()` com validação de permissão (PROJECT_OWNER+)
- ✅ `getProjectMembers()` lista todos os membros
- ✅ `getPermissions()` retorna permissões JSONB de um membro
- ✅ `checkPermission()` valida hierarquia de roles
- ✅ `getAuthenticatedUser()` obtém usuário do contexto de segurança
- ✅ Tratamento de `AccessDeniedException`

**Arquivos modificados:**
- `src/main/java/com/archflow/service/ProjectMemberService.java`

---

## ✅ Subtarefa 3: Criar Controller e Endpoints para Gerenciamento de Membros
**Status**: COMPLETA

### Endpoints implementados:

#### 1. POST `/api/v1/projects/{projectId}/members`
- **Descrição**: Adiciona novo membro ao projeto
- **Autorização**: PROJECT_OWNER ou superior
- **Validação**: @Valid com JSR303
- **Response**: 201 Created com MemberResponseDTO
- **Erros**: 400 (dados inválidos), 403 (sem permissão)

#### 2. GET `/api/v1/projects/{projectId}/members`
- **Descrição**: Lista todos os membros do projeto
- **Response**: 200 OK com List<MemberResponseDTO>

#### 3. GET `/api/v1/projects/{projectId}/members/{userId}/permissions`
- **Descrição**: Obtém permissões específicas de um membro
- **Response**: 200 OK com Map<String, Object> (JSONB)
- **Erros**: 404 (membro não encontrado)

#### 4. DELETE `/api/v1/projects/{projectId}/members/{memberId}`
- **Descrição**: Remove um membro do projeto
- **Autorização**: PROJECT_OWNER ou superior
- **Response**: 204 No Content
- **Erros**: 403 (sem permissão)

### Validações JSR303:
- ✅ `AddMemberRequest`: `@NotNull` e `@Email` no campo email
- ✅ `@NotNull` no campo role
- ✅ Validação automática com `@Valid` no controller

**Arquivos modificados:**
- `src/main/java/com/archflow/controller/ProjectMemberController.java`
- `src/main/java/com/archflow/dto/member/AddMemberRequest.java`
- `src/main/java/com/archflow/dto/member/MemberResponseDTO.java`
- `pom.xml` (adicionada dependência spring-boot-starter-validation)

---

## 🔄 Subtarefa 4: Implementar JWT Interceptor para Verificação de Role por Projeto
**Status**: PENDENTE

### O que precisa ser feito:
1. Criar interceptor/filter que intercepta requisições para `/api/v1/projects/{id}/**`
2. Extrair `projectId` da URL
3. Obter `userId` do token JWT
4. Consultar `ProjectMemberRepository` para verificar role do usuário no projeto
5. Validar permissões necessárias para cada endpoint
6. Retornar 403 Forbidden se não tiver permissão

### Abordagem sugerida:
- Criar anotação custom `@RequiresRole(Role.PROJECT_OWNER)` para endpoints
- Implementar `HandlerInterceptorAdapter` ou usar AOP com `@Aspect`
- Integrar com o `SecurityContext` do Spring Security

---

## 📊 Resumo de Compilação

```bash
mvn clean compile -DskipTests
```
**Resultado**: ✅ BUILD SUCCESS

```bash
mvn test -Dtest=RoleTest
```
**Resultado**: ✅ Tests run: 5, Failures: 0, Errors: 0, Skipped: 0

---

## 🎯 Próximas Ações

1. **Implementar Subtarefa 4** (JWT Interceptor)
   - Criar interceptor para validação automática de roles
   - Adicionar testes de integração com MockMvc

2. **Testes de Integração para Controller**
   - Testar endpoints com diferentes roles
   - Validar códigos HTTP corretos (200, 201, 400, 403, 404)
   - Testar validação JSR303

3. **Documentação OpenAPI/Swagger**
   - Adicionar anotações `@Operation`, `@ApiResponse`
   - Documentar esquemas de permissões JSONB

---

## 📝 Notas Importantes

- **JSONB Support**: Requer PostgreSQL. Hibernate criará a coluna automaticamente com `ddl-auto=update`.
- **Segurança**: Todas as operações de gerenciamento de membros exigem autenticação JWT.
- **Hierarquia de Roles**: ADMIN (1) > PROJECT_OWNER (2) > MANAGER (3) > ARCHITECT (4) > VIEWER (5) > CLIENT (6)
- **Permissões Customizadas**: O campo `permissoes` (JSONB) permite granularidade adicional além das roles.

---

**Progresso**: 3/4 subtarefas completas = **75%** ✅
