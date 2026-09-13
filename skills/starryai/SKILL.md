---
name: starryai
description: General Starry CLI and MCP guidance for design work not covered by a focused Starry skill.
---

# Starry

Use the focused skills when they match the request:

- `starry-design-create` — create new design content, components, or pages
- `starry-selection-edit` — make targeted edits to an existing selection
- `starry-visual-compare` — compare or visually verify output
- `starry-token-extract` — extract colors, typography, spacing, and variables
- `starry-fig-migrate` — batch inspect, convert, and validate `.fig`/`.pen` files

This skill remains the fallback for cross-cutting Starry work and general CLI/MCP routing.

Starry provides a CLI and an MCP server for `.fig` design files and the running editor.

Use one of two modes:

- **App mode**: omit the file argument to operate on the document open in Starry.
- **Headless mode**: pass a `.fig` or `.pen` path to operate on that file.

```sh
# App mode
starryai tree

# Headless mode
starryai tree design.fig
```

## Requirements

```sh
bun add -g @starryai/cli @starryai/mcp
```

The desktop app starts its bundled MCP sidecar automatically. For external or headless use, run `starryai-mcp-http`.

## Choose the right interface

- Use **MCP** to control a live Starry canvas or when an MCP client is already connected.
- Use the **CLI** for repeatable headless inspection, export, linting, and scripting.
- Prefer a dedicated MCP tool over `eval`. Use `eval` only when no dedicated operation exists and the requested scope is understood.
- In the Starry desktop ACP session, use only `mcp.starryai.*` for live-canvas work. Do not substitute another editor's MCP server.

## CLI

All commands support app mode without a file path when Starry is running.

```sh
# Inspect structure and selection
starryai info design.fig
starryai tree design.fig
starryai tree --page "Components" --depth 3
starryai pages design.fig
starryai node design.fig --id 1:23
starryai selection --json

# Find nodes and query with XPath
starryai find design.fig --name "Button"
starryai find design.fig --type FRAME --page "Home"
starryai query design.fig "//COMPONENT//TEXT"
starryai query design.fig "//FRAME[@width < 300]"

# Analyze and validate
starryai analyze colors design.fig
starryai analyze typography design.fig --group-by size
starryai analyze spacing design.fig --grid 8
starryai analyze clusters design.fig --min-count 3
starryai lint design.fig --json

# Export and convert
starryai export design.fig -o preview.png
starryai export design.fig --node 1:23 -s 2 -o button@2x.png
starryai export design.fig -f svg --node 1:23 -o icon.svg
starryai export design.fig -f jsx -o component.jsx
starryai convert design.fig -f pen -o output.pen
```

Use `--json` whenever CLI output will be consumed by another command or script.

## MCP setup

For stdio MCP clients:

```json
{
  "mcpServers": {
    "starryai": {
      "command": "starryai-mcp"
    }
  }
}
```

For Streamable HTTP:

```sh
export STARRYAI_MCP_ROOT=/absolute/path/to/designs
export STARRYAI_MCP_AUTH_TOKEN=secret
starryai-mcp-http
```

The default endpoint is `http://127.0.0.1:7600/mcp`. `STARRYAI_MCP_ROOT` scopes disk access; without it, do not assume `open_file`, `new_document`, or disk-writing exports are available. `eval` is disabled by default and requires `STARRYAI_MCP_EVAL=1`.

## MCP workflow

For a substantive design task, follow this loop:

1. **Read** the minimum useful context: `get_selection`, `get_node`, `find_nodes`, `get_page_tree`, `query_nodes`, or `get_jsx`.
2. **Inspect** before a nontrivial change: use `describe`, `diff_jsx`, `node_bounds`, or `export_image` as appropriate.
3. **Change** with the narrowest dedicated tool. Use `render` for a component tree; use tools such as `set_fill`, `set_layout`, `set_text`, `update_node`, or `batch_update` for targeted edits.
4. **Show** the result in app mode: call `select_nodes` and `viewport_zoom_to_fit`, or use `node_bounds` with `viewport_set` when needed.
5. **Verify** the requested outcome. Use `verify_design`, `export_image`, `diff_show`, `lint`, or a focused read of the changed nodes. Do not claim success solely because a mutation returned without error.
6. **Save/export** only when requested or required by the workflow.

## Tool selection

- Read/search: `get_selection`, `get_node`, `find_nodes`, `query_nodes`, `get_page_tree`, `get_jsx`, `describe`.
- Create: `render`, `create_shape`, `create_component`, `create_instance`, `import_svg`, `insert_icon`.
- Modify: `update_node`, `batch_update`, `set_fill`, `set_stroke`, `set_layout`, `set_layout_child`, `set_text`, `set_text_properties`, `set_effects`.
- Structure: `reparent_node`, `group_nodes`, `clone_node`, `delete_node`, `arrange`, `node_resize`.
- Analyze/verify: `analyze_colors`, `analyze_typography`, `analyze_spacing`, `analyze_clusters`, `verify_design`, `diff_create`, `diff_show`.
- Export: `export_image`, `export_svg`, `export_pdf`.

Tool availability and parameters come from the connected MCP server. Query its tool definitions when an operation is not listed here instead of inventing a tool name or parameter.

## JSX rendering

Use `render` to create a design tree. If frontend/code generation is involved, call `get_codegen_prompt` first.

```jsx
<Frame name="Card" w={320} h="hug" flex="col" gap={16} p={24} bg="#FFF" rounded={16}>
  <Text size={18} weight="bold" color="#111">Title</Text>
  <Text size={14} color="#666">Description text</Text>
  <Frame w={80} h={36} bg="#3B82F6" rounded={8} justify="center" items="center">
    <Text size={14} weight="600" color="#FFF">Action</Text>
  </Frame>
</Frame>
```

Use design-JSX props such as `w`, `h`, `flex`, `gap`, `p`, `bg`, `rounded`, `size`, `weight`, and `color`; do not substitute Figma Plugin API property names in JSX.

## Safety and scope

- Start with a focused query on large documents; do not fetch or rewrite the full tree without need.
- Preserve unrelated nodes, pages, styles, variables, and files.
- For destructive or broad edits, report the target set before applying the change when the user has not clearly identified it.
- Treat `eval` as a last resort. Keep it narrow and verify the affected nodes afterward.
- In app mode, mutations change the live canvas. In headless mode, do not overwrite a source file unless the user requested it.
