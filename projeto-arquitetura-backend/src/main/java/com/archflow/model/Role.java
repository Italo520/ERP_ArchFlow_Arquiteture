package com.archflow.model;

public enum Role {
    ADMIN(1), // Administrator of the system or organization
    PROJECT_OWNER(2), // Creator/Owner of the project (Full Access)
    MANAGER(3), // Project Manager (Can manage tasks and members)
    ARCHITECT(4), // Team member/Architect (Can edit tasks)
    VIEWER(5), // Read-only access
    CLIENT(6); // Client access (Restricted view)

    private final int hierarchy;

    Role(int hierarchy) {
        this.hierarchy = hierarchy;
    }

    public int getHierarchy() {
        return hierarchy;
    }

    public boolean hasPermission(Role required) {
        return this.hierarchy <= required.hierarchy;
    }
}
