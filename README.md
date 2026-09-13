# Starry Skills

Agent skills for Starry, the SmartAly design editor.

## Install

```sh
npx skills add SmartAly/starry-skills@starryai
```

The skill expects the Starry CLI and MCP packages:

```sh
bun add -g @starryai/cli @starryai/mcp
```

## Available skills

| Skill | Description |
| --- | --- |
| `starryai` | General Starry CLI/MCP routing for cross-cutting work. |
| `starry-design-create` | Create design content, components, and pages. |
| `starry-selection-edit` | Make targeted edits to selected live-canvas nodes. |
| `starry-visual-compare` | Compare and verify visual output. |
| `starry-token-extract` | Extract colors, typography, spacing, and variables. |
| `starry-fig-migrate` | Batch inspect, convert, and validate `.fig`/`.pen` files. |

Published from [SmartAly/starry-skills](https://github.com/SmartAly/starry-skills).

## License

This repository is public so compatible agents can install the skill. The skill is
proprietary and may only be used with Starry. See [LICENSE](LICENSE) for the
usage terms; Starry source code is not included or licensed by this repository.
