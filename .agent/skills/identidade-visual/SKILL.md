---
name: identidade-visual
description: Detailed guidelines for the ArchFlow project's visual identity, including color palettes, typography, and component styling. Use this when implementing or updating UI components.
---

# ArchFlow UI Skill

## When to use this skill
- When creating new UI components.
- When styling pages or layouts.
- When ensuring compliance with the ArchFlow visual identity.

## Context
You are the UI/UX specialist for the ArchFlow ERP project. Your responsibility is to ensure strict visual consistency across all generated components. The project uses **Next.js**, **Tailwind CSS**, and **Radix UI**.

## Style Rules & Design Tokens

### 1. Paleta de Cores (Tailwind Config)
*   **Modo Claro (Pastel):**
    *   `bg-background`: `#FBF2ED` (Bege Claro)
    *   `bg-primary`: `#CDD5C6` (Verde Pastel)
    *   `bg-secondary`: `#B7BCBF` (Cinza)
    *   `bg-accent`: `#E8D4C6` (Bege Médio)
    *   `bg-highlight`: `#FFE2C3` (Pêssego)
*   **Modo Escuro:**
    *   `bg-background`: `#152026` (Azul Profundo) ou `#0D0D0D` (Preto Profundo) - *Preferência: #0D0D0D para fundo principal, #152026 para superfícies.*
    *   `bg-surface`: `#253840` (Slate)
    *   `bg-border`: `#516973` (Cinza Azulado)
    *   `text-primary`: `#92A4A6` (Cinza Claro)
*   **Superfícies (Cards/Modais):** `bg-card`, `bg-popover`, `bg-surface-dark` (#1a2620)
*   **Bordas:** `border-border` ou `border-border-dark` (#29382f)
*   **Status (Tarefas/Projetos):**
    *   A Fazer/Pendente: `text-[#FFC107]` (status-todo)
    *   Em Progresso: `text-[#2196F3]` (status-progress)
    *   Concluído: `text-[#4CAF50]` (status-done)

### 2. Tipografia
*   **Títulos/Display:** Use `font-display` (Família: Spline Sans, Manrope).
*   **Corpo/Texto:** Use `font-body` (Família: Noto Sans, Inter).
*   **Cor de Texto Secundário:** `text-text-secondary` (#9eb7a8).

### 3. Componentes & Formas
*   **Arredondamento:** Use as classes `rounded-lg`, `rounded-md`, `rounded-sm` (baseadas em var(--radius)). Evite `rounded-none` ou `rounded-full` a menos que estritamente necessário (ex: avatares).
*   **Cards:** Devem ter borda sutil e fundo contrastante. Ex: `bg-card border border-border shadow-sm`.

### 4. Responsividade (Mobile-First)
*   **Abordagem:** Todo layout deve ser pensado primeiramente para telas pequenas (mobile) e expandido para telas maiores (md, lg, xl).
*   **Grid/Layout:** Use flexbox e grid responsivos. Ex: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
*   **Espaçamento:** Ajuste margens e paddings conforme o breakpoint. Ex: `p-4 md:p-6 lg:p-8`.
*   **Componentes:** Elementos complexos (tabelas, sidebars) devem se adaptar ou colapsar em mobile (ex: Sidebar vira Drawer).

## Diretriz de Implementação
Ao criar um componente, priorize a estrutura do **Radix UI** para acessibilidade e estilize com as classes do Tailwind acima. Se o usuário pedir um "botão de destaque", use a cor `primary`. Se pedir um "painel lateral", use `surface-dark`.
