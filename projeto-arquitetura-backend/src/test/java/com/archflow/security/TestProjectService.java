package com.archflow.security;

import com.archflow.model.Role;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Serviço de teste para validar o funcionamento do @RequiresRole aspect.
 */
@Service
public class TestProjectService {

    /**
     * Ação que requer role PROJECT_OWNER.
     */
    @RequiresRole(Role.PROJECT_OWNER)
    public void manageMembersAction(UUID projectId) {
        // Simula uma ação que requer PROJECT_OWNER
    }

    /**
     * Ação que requer apenas role VIEWER (qualquer membro do projeto).
     */
    @RequiresRole(Role.VIEWER)
    public void viewProjectAction(UUID projectId) {
        // Simula uma ação de visualização
    }

    /**
     * Ação que requer role MANAGER.
     */
    @RequiresRole(Role.MANAGER)
    public void manageTasksAction(UUID projectId) {
        // Simula gerenciamento de tarefas
    }
}
