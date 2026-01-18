---
name: project-management
description: |
  Habilidades para gerenciamento de projetos arquitetônicos.
  Permite criar, consultar, atualizar e analisar projetos no ArchFlow ERP.
version: 1.0.0
category: core
---

# Project Management Skills

This skill module provides tools for managing the lifecycle of architectural projects within the ArchFlow ERP system. It handles creation, tracking, status updates, and analytics.

## Capabilities

The agent can perform the following actions:

1.  **Create Project**: Start a new architectural project record.
2.  **Get Project Details**: Retrieve full information about a specific project.
3.  **List Projects**: Search and filter projects based on criteria.
4.  **Update Project**: Modify project details, status, or progress.
5.  **Delete Project**: Soft-delete a project (archive).
6.  **Project Stats**: Analyze project metrics (budget, time, progress).

## Usage Instructions

### 1. Create Project (`create_project`)

Create a new project entry. Requires a valid client ID.

**Trigger Phrases:**
- "create new project"
- "start new architectural project"
- "novo projeto"
- "criar projeto"

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | **Yes** | UUID of the client. |
| `project_name` | string | **Yes** | Name of the project. |
| `project_type` | enum | **Yes** | `RESIDENTIAL`, `COMMERCIAL`, `INSTITUTIONAL`, `INDUSTRIAL`, `LANDSCAPE`, `INTERIOR` |
| `location` | object | **Yes** | Address object (`address`, `city`, `state`, `zip_code`, `lat`, `lng`). |
| `budget` | number | No | Budget in BRL (R$). |
| `estimated_hours` | number | No | Total estimated hours. |
| `deadline` | date | No | Project deadline (ISO 8601). |

---

### 2. Get Project (`get_project`)

Retrieve detailed information about a single project.

**Trigger Phrases:**
- "show project details"
- "ver projeto"
- "status do projeto"

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | **Yes** | UUID of the project. |

---

### 3. List Projects (`list_projects`)

List projects with optional filtering.

**Trigger Phrases:**
- "list all projects"
- "meus projetos"
- "projetos em andamento"

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | No | Filter by client. |
| `status` | enum | No | `CONCEPTUAL`, `PRELIMINARY`, `EXECUTIVE`, `CONSTRUCTION`, `COMPLETED`, `ARCHIVED` |
| `sort_by` | enum | No | `created_at` (default), `deadline`, `progress`. |
| `limit` | number | No | Max results (default: 10). |

---

### 4. Update Project (`update_project`)

Update fields of an existing project.

**Trigger Phrases:**
- "update project status"
- "atualizar projeto"
- "mudar status do projeto"

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | **Yes** | UUID of the project. |
| `status` | enum | No | New status. |
| `progress` | number | No | Progress percentage (0-100). |
| `budget` | number | No | New budget amount. |

---

### 5. Project Statistics (`get_project_stats`)

Get analytics for a project.

**Trigger Phrases:**
- "project analytics"
- "estatísticas do projeto"
- "como está o projeto"

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | **Yes** | UUID of the project. |

