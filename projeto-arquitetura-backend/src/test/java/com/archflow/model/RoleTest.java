package com.archflow.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RoleTest {

    @Test
    void testRoleHierarchy() {
        // ADMIN tem maior privilégio (hierarchy = 1)
        assertTrue(Role.ADMIN.hasPermission(Role.PROJECT_OWNER));
        assertTrue(Role.ADMIN.hasPermission(Role.MANAGER));
        assertTrue(Role.ADMIN.hasPermission(Role.ARCHITECT));
        assertTrue(Role.ADMIN.hasPermission(Role.VIEWER));
        assertTrue(Role.ADMIN.hasPermission(Role.CLIENT));
    }

    @Test
    void testProjectOwnerHierarchy() {
        // PROJECT_OWNER tem permissões até CLIENT
        assertFalse(Role.PROJECT_OWNER.hasPermission(Role.ADMIN));
        assertTrue(Role.PROJECT_OWNER.hasPermission(Role.PROJECT_OWNER));
        assertTrue(Role.PROJECT_OWNER.hasPermission(Role.MANAGER));
        assertTrue(Role.PROJECT_OWNER.hasPermission(Role.ARCHITECT));
        assertTrue(Role.PROJECT_OWNER.hasPermission(Role.VIEWER));
        assertTrue(Role.PROJECT_OWNER.hasPermission(Role.CLIENT));
    }

    @Test
    void testViewerHierarchy() {
        // VIEWER tem permissões limitadas
        assertFalse(Role.VIEWER.hasPermission(Role.ADMIN));
        assertFalse(Role.VIEWER.hasPermission(Role.PROJECT_OWNER));
        assertFalse(Role.VIEWER.hasPermission(Role.MANAGER));
        assertFalse(Role.VIEWER.hasPermission(Role.ARCHITECT));
        assertTrue(Role.VIEWER.hasPermission(Role.VIEWER));
        assertTrue(Role.VIEWER.hasPermission(Role.CLIENT));
    }

    @Test
    void testClientHierarchy() {
        // CLIENT é o nível mais baixo
        assertFalse(Role.CLIENT.hasPermission(Role.ADMIN));
        assertFalse(Role.CLIENT.hasPermission(Role.PROJECT_OWNER));
        assertFalse(Role.CLIENT.hasPermission(Role.MANAGER));
        assertFalse(Role.CLIENT.hasPermission(Role.ARCHITECT));
        assertFalse(Role.CLIENT.hasPermission(Role.VIEWER));
        assertTrue(Role.CLIENT.hasPermission(Role.CLIENT));
    }

    @Test
    void testHierarchyValues() {
        assertEquals(1, Role.ADMIN.getHierarchy());
        assertEquals(2, Role.PROJECT_OWNER.getHierarchy());
        assertEquals(3, Role.MANAGER.getHierarchy());
        assertEquals(4, Role.ARCHITECT.getHierarchy());
        assertEquals(5, Role.VIEWER.getHierarchy());
        assertEquals(6, Role.CLIENT.getHierarchy());
    }
}
