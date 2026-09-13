---
name: starry-visual-compare
description: Compare Starry designs visually before and after edits or against a reference image.
---

# Starry visual comparison

Use this skill for visual regression checks, before/after comparisons, pixel-oriented review, or requests to show the visual result of a Starry change.

Use `mcp.starryai.*` for live-canvas capture and viewport operations.

## Workflow

1. Establish the exact page or node target and capture a baseline with `export_image`, `export_svg`, or the CLI `starryai export` command.
2. For a live canvas, use `node_bounds`, `select_nodes`, and `viewport_zoom_to_fit` so the compared viewport is deterministic.
3. After the change, capture the same target with the same scale and format. Use `diff_create` and `diff_show` when a structured diff is available.
4. Report meaningful differences separately from expected changes; include the node/page target and export settings.
5. If the result is ambiguous, inspect the focused node tree or export rather than claiming visual parity.

Keep comparison artifacts outside the source document unless the user asks to save them. Do not rewrite source files as part of a visual check.
