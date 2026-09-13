---
name: starry-fig-migrate
description: Batch inspect, convert, validate, or migrate Starry `.fig` and `.pen` files without overwriting sources.
---

# Starry file migration

Use this skill for batch `.fig`/`.pen` conversion, format migration, fixture upgrades, or repeatable document processing.

## Workflow

1. Inventory each input with `starryai info`, `pages`, and a focused `tree`/`find` query before changing it.
2. Use explicit input and output paths. Prefer `starryai convert` for format changes and `starryai export` for derived PNG/SVG/JSX/PDF artifacts.
3. Never overwrite a source file unless the user explicitly requests in-place migration. Write outputs to a separate directory with deterministic names.
4. Validate every output with `starryai info`, a focused tree/query, and `starryai lint --json`; record failures per file and continue independent files when safe.
5. Preserve pages, node IDs, variables, and source metadata where the target format supports them. Report lossy conversions explicitly.

Use shell scripting only to orchestrate the documented CLI commands. Use the live MCP interface only when the user asks to migrate the document currently open in Starry.
