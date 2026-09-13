---
name: starry-design-create
description: Create new Starry design content, components, or pages from a brief or design-JSX request.
---

# Starry design creation

Use this skill when the task is primarily to create new design content in Starry. For editing an existing selection, use `starry-selection-edit`; for visual QA, use `starry-visual-compare`.

## Workflow

1. Read the current page and nearby structure before creating anything.
2. Prefer dedicated Starry MCP create tools (`render`, `create_shape`, `create_component`, `create_instance`, `import_svg`, `insert_icon`). Use `mcp.starryai.*` for live-canvas work.
3. If the request is code-to-design or JSX-based, call `get_codegen_prompt` when code generation is involved, then use `render` with design-JSX props (`w`, `h`, `flex`, `gap`, `p`, `bg`, `rounded`, `size`, `weight`, `color`).
4. Keep new content scoped to the requested page/container and preserve existing nodes, variables, and styles.
5. Show and verify the result with `select_nodes`, `viewport_zoom_to_fit`, `node_bounds`, `get_node`, or `verify_design` as appropriate.

Do not use `eval` when a dedicated tool exists. Do not overwrite a source file or make broad structural changes unless the user explicitly asks for them.
