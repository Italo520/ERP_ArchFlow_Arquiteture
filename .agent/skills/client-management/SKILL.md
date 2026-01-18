---
name: client-management
description: |
  Skills para gerenciar clientes, contatos e relacionamento.
  Inclui CRUD, filtros, analytics e operações em lote.
version: 1.0.0
category: core
---

# Client Management Skills

This skill module handles the complete lifecycle of client management within ArchFlow, from prospecting to active portfolio management.

## Capabilities

1.  **Create Client**: Register new individual (PF) or corporate (PJ) clients.
2.  **Get Client**: Retrieve full client profile including financial stats.
3.  **List Clients**: Search and filter the client database.
4.  **Update Client**: Modify contact info, status, or categorization.
5.  **Client Analytics**: Get insights on client spending and projects.
6.  **Bulk Operations**: Import/Export client data.

## Usage Instructions

### 1. Create Client (`create_client`)

Register a new client.

**Trigger Phrases:**
- "create new client"
- "novo cliente"
- "adicionar cliente"

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | **Yes** | Client full name. |
| `email` | email | **Yes** | Primary email address. |
| `legal_type` | enum | **Yes** | `PF` (Individual) or `PJ` (Corporate). |
| `document` | string | **Yes** | CPF or CNPJ. |
| `category` | enum | **Yes** | `RESIDENTIAL`, `COMMERCIAL`, `INSTITUTIONAL`, etc. |
| `phone` | string | No | Contact number. |

---

### 2. List Clients (`list_clients`)

Search for clients.

**Trigger Phrases:**
- "list clients"
- "buscar clientes"
- "show all clients"

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | No | Search by name, email, or document. |
| `category` | string | No | Filter by category. |
| `status` | enum | No | `ACTIVE`, `PROSPECT`, `INACTIVE`, `BLOCKED`. |
| `limit` | number | No | Results per page. |

---

### 3. Get Client (`get_client`)

Get detailed profile.

**Trigger Phrases:**
- "ver cliente"
- "detalhes do cliente"

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | **Yes** | UUID of the client. |

---

### 4. Bulk Import (`bulk_import_clients`)

Import clients from a CSV source.

**Trigger Phrases:**
- "importar clientes"
- "upload de clientes"

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `csv_file_url` | string | **Yes** | URL to the CSV file. |
