---
name: rastreamento-atividades
description: Skills para rastreamento de atividades, time tracking e produtividade. Inclui criação de atividades, logs de tempo, relatórios e analytics.
---

# Activities & Time Tracking Skill

## When to use this skill
- When logging meetings, calls, or other activities.
- When tracking time (start/stop timer or manual log).
- When generating time reports or productivity statistics.

## How to use it

### Log Activity
Record an activity like MEETING, CALL, EMAIL, etc.
**Required:** `type`, `title`, `duration_minutes`.

### Time Tracking
- `start_time_tracking`: Start a timer for an activity type.
- `stop_time_tracking`: Stop the timer and save the log.
- `log_time_manual`: Manually record hours for a date.

### List Activities
Filter by client, project, type, status, or date range.

### Get Time Report
Generate reports (billing, hours) grouped by project, user, etc.

### Get Productivity Stats
Get metrics on hours logged, billable percentage, and top activities.

For detailed schema definitions, refer to `resources/activities-tracking.yaml`.
