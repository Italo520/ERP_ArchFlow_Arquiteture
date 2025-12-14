# Tarefa 5 - Sistema RBAC e Membros de Projeto
## Subtarefa 1: Implementar Entity ProjectMember e Role Enum

### ✅ Implementação Concluída

#### 1. **Enum Role com Hierarquia**
- **Localização**: `src/main/java/com/archflow/model/Role.java`
- **Funcionalidades implementadas**:
  - Hierarquia de roles (1 = maior privilégio, 6 = menor privilégio)
    - `ADMIN (1)` - Administrador do sistema/organização
    - `PROJECT_OWNER (2)` - Criador/Dono do projeto (Acesso total)
    - `MANAGER (3)` - Gerente de projeto (Gerencia tarefas e membros)
    - `ARCHITECT (4)` - Membro da equipe/Arquiteto (Edita tarefas)
    - `VIEWER (5)` - Acesso somente leitura
    - `CLIENT (6)` - Acesso de cliente (Vista restrita)
  
  - Método `hasPermission(Role required)`: valida se a role atual tem permissão para executar ações que requerem a role especificada
  - Método `getHierarchy()`: retorna o nível hierárquico da role

#### 2. **Entidade ProjectMember**
- **Localização**: `src/main/java/com/archflow/model/ProjectMember.java`
- **Campos**:
  - `id` (UUID) - Identificador único
  - `project` (ManyToOne) - Relação com o projeto
  - `user` (ManyToOne) - Relação com o usuário
  - `role` (Enum) - Papel do membro no projeto
  - `permissoes` (JSONB) - Mapa de permissões específicas (Map<String, Object>)
  - `joinedAt` (Timestamp) - Data de entrada no projeto

- **Constraints**:
  - Unique constraint em `(project_id, user_id)` - um usuário não pode ser adicionado duas vezes ao mesmo projeto

#### 3. **Serviço ProjectMemberService**
- **Localização**: `src/main/java/com/archflow/service/ProjectMemberService.java`
- **Métodos principais**:
  - `addMember(UUID projectId, AddMemberRequest request)`: Adiciona um membro ao projeto
    - ✅ Validação de permissão: apenas `PROJECT_OWNER` ou superior pode adicionar membros
    - ✅ Verifica se o usuário já é membro do projeto
    - ✅ Suporta campo `permissoes` customizado
  
  - `removeMember(UUID projectId, UUID memberId)`: Remove um membro do projeto
    - ✅ Validação de permissão: apenas `PROJECT_OWNER` ou superior
  
  - `getProjectMembers(UUID projectId)`: Lista todos os membros do projeto
  
  - `getPermissions(UUID projectId, UUID userId)`: Retorna as permissões específicas de um membro
  
  - `checkPermission(UUID projectId, Role requiredRole)` (privado): Valida se o usuário autenticado tem permissão suficiente

#### 4. **DTOs Atualizados**
- **AddMemberRequest**: Adicionado campo `permissoes` (Map<String, Object>)
- **MemberResponseDTO**: Adicionado campo `permissoes` para retornar permissões customizadas

#### 5. **Segurança Implementada**
- Validação de autenticação via `SecurityContextHolder`
- Verificação de hierarquia de roles antes de executar ações sensíveis
- Lançamento de `AccessDeniedException` para acesso negado

#### 6. **Testes Unitários**
- **Localização**: `src/test/java/com/archflow/model/RoleTest.java`
- **Cobertura**:
  - ✅ Validação de hierarquia ADMIN (pode tudo)
  - ✅ Validação de hierarquia PROJECT_OWNER
  - ✅ Validação de hierarquia VIEWER (limitada)
  - ✅ Validação de hierarquia CLIENT (mais restrita)
  - ✅ Valores corretos de hierarquia (1-6)
  
**Resultado**: 5 testes, 0 falhas ✅

#### 7. **Compilação**
```bash
mvn clean compile -DskipTests
```
**Status**: ✅ BUILD SUCCESS

---

### 📝 Observações Técnicas

1. **JSONB Support**: 
   - Uso de anotação `@org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.JSON)`
   - PostgreSQL suporta nativamente tipo JSONB
   - Hibernate em modo `update` criará a coluna automaticamente

2. **Herança de Permissões**:
   - A lógica implementada permite que roles superiores tenham acesso a ações de roles inferiores
   - Exemplo: `ADMIN.hasPermission(Role.VIEWER)` retorna `true`

3. **Extensibilidade**:
   - O campo `permissoes` (JSONB) permite adicionar permissões customizadas por projeto sem alterar o schema
   - Estrutura flexível para futuras implementações de permissões granulares

---

### 🔜 Próximos Passos

**Subtarefa 2**: Desenvolver ProjectMemberService com métodos CRUD
- ✅ Já implementado parcialmente nesta subtarefa
- Pendente: Adicionar mais validações de autorização e testes de integração

**Subtarefa 3**: Criar Controller e Endpoints para Gerenciamento de Membros
- Verificar e possivelmente estender o `ProjectMemberController` existente

**Subtarefa 4**: Implementar JWT Interceptor para Verificação de Role por Projeto
- Criar interceptor para validação automática de roles em todos os endpoints de projetos
