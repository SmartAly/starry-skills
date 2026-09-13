---
name: starry-token-extract
description: Extract and analyze Starry colors, typography, spacing, variables, and reusable design tokens.
---

# Starry token extraction

Use this skill when the task is to discover, summarize, export, or audit design tokens from a Starry document.

## Workflow

1. Use focused reads first: `get_page_tree`, `find_nodes`, `query_nodes`, `get_variables`, `get_node`, or `describe`.
2. Use the CLI analyzers for repeatable headless reports: `starryai analyze colors`, `starryai analyze typography`, `starryai analyze spacing`, and `starryai analyze clusters`.
3. Distinguish explicit variables/styles from values inferred by clustering or frequency. Include source node IDs and page names for extracted values.
4. Prefer machine-readable output (`--json`) when producing a token file or passing results to another command.
5. Only bind or normalize values in the document when the user explicitly asks for an edit; token extraction itself is read-only.

For live-canvas work use `mcp.starryai.*`. Preserve the document and report missing or conflicting variables instead of silently inventing tokens.
