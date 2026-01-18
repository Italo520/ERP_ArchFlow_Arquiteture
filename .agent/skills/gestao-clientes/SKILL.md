---
name: gestao-clientes
description: Skills para gerenciar clientes, contatos e relacionamento. Inclui CRUD, filtros, analytics e operações em lote.
---

# Client Management Skill

## When to use this skill
- When creating, updating, or deleting client records.
- When retrieving client details, including associated projects and statistics.
- When importing or exporting client data.

## How to use it

### Create Client
Create a new client (PF or PJ).
**Required:** `name`, `email`, `legal_type` [PF, PJ], `document` (CPF/CNPJ), `category`.

### Get Client
Get full details including projects and activities (optional).

### List Clients
Search and filter clients by status, category, legal_type, rating, or spending.

### Update Client
Update contact info, status, rating, or tags.

### Get Client Projects
List all projects associated with a client.

### Get Client Stats
Get analytics like total spent, active projects, and interaction frequency.

### Bulk Import/Export
- `bulk_import_clients`: Import from CSV.
- `export_clients`: Export to CSV/XLSX/JSON.

For detailed schema definitions, refer to `resources/client-management.yaml`.
