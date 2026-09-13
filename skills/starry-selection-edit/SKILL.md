---
name: starry-selection-edit
description: Inspect and make targeted edits to selected nodes in the live Starry canvas.
---

# Starry selection editing

Use this skill when the user asks to change an existing Starry selection: fills, strokes, text, effects, layout, size, visibility, naming, or structure.

## Workflow

1. Start with `get_selection`; if the selection is empty or broader than the request, report that before mutating.
2. Read the affected nodes with `get_node`, `node_bounds`, `describe`, or `get_jsx` as needed. Confirm the node IDs and the relevant current values.
3. Use the narrowest dedicated MCP operation: `update_node`, `set_fill`, `set_stroke`, `set_layout`, `set_layout_child`, `set_text`, `set_text_properties`, `set_effects`, `node_resize`, `reparent_node`, `group_nodes`, or `arrange`.
4. In app mode, reselect the changed nodes and call `viewport_zoom_to_fit` when the user needs to see the result.
5. Verify by rereading the changed nodes or running `verify_design`, `lint`, or a focused export. Do not treat a successful mutation response as verification.

Use `mcp.starryai.*` for live Starry work. Use CLI commands with an explicit input file for repeatable headless edits. Preserve unrelated nodes and do not use `eval` when a dedicated tool is available.
