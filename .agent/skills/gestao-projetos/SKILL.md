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

**Optional Architectural Parameters:**
- `architectural_style`: [MODERNISTA, CLASSICO, CONTEMPORANEO, ORGANICO, MINIMALISTA, OTHER].
- `construction_type`: [ALVENARIA, STEEL_FRAME, CONCRETO_ARMADO, MADEIRA, HIBRIDA, OTHER].
- `total_area`: Float (m²).
- `number_of_floors`: Integer.
- `has_basement`: Boolean.
- `environmental_license`: Boolean.

### Get Project
Retrieve details for a specific project ID, including architectural specs.

### List Projects
List projects with optional filtering by:
- `client_id`
- `status` [CONCEPTUAL, PRELIMINARY, EXECUTIVE, CONSTRUCTION, COMPLETED, ARCHIVED]
- `project_type`
- `architectural_style`

### Update Project
Update fields like status, progress, budget, deadline, phases, and architectural details.

### Delete Project
Soft delete/archive a project.

### Get Project Metrics
Retrieve analytics like budget spent, hours logged, progress percentage, and time distribution.

For detailed schema definitions, refer to `resources/project-management.yaml`.
