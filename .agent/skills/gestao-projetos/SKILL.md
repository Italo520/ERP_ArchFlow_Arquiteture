---
name: gestao-projetos
description: Conjunto de skills para gerenciamento de projetos arquitetônicos. Inclui criação, atualização, filtragem e análise de projetos.
---

# Project Management Skill

## When to use this skill
- When creating, updating, or deleting architectural projects (Residential, Commercial, etc.).
- When retrieving project details, statistics, or listing projects with filters.
- When managing project budgets, timelines, and progress.

## How to use it

### Create Project
Use when the user wants to start a new project.
**Required Parameters:**
- `client_id`: ID of the client.
- `project_name`: Name of the project.
- `project_type`: One of [RESIDENTIAL, COMMERCIAL, INSTITUTIONAL, INDUSTRIAL, LANDSCAPE, INTERIOR].
- `location`: Object with address details.

### Get Project
Retrieve details for a specific project ID.

### List Projects
List projects with optional filtering by:
- `client_id`
- `status` [CONCEPTUAL, PRELIMINARY, EXECUTIVE, CONSTRUCTION, COMPLETED, ARCHIVED]
- `project_type`

### Update Project
Update fields like status, progress, budget, deadline, etc.

### Delete Project
Soft delete/archive a project.

### Get Project Stats
Retrieve analytics like budget spent, hours logged, progress percentage.

For detailed schema definitions, refer to `resources/project-management.yaml`.
