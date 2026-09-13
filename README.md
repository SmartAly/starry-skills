# Starry Skills

Agent skills for [Starry](https://github.com/SmartAly/starry), the open-source design editor.

## Install

Once this directory is published as the `starryai/skills` repository:

```sh
npx skills add starryai/skills@starryai
```

The skill expects the Starry CLI and MCP packages:

```sh
bun add -g @starryai/cli @starryai/mcp
```

## Available skills

| Skill | Description |
| --- | --- |
| `starryai` | Use Starry CLI and MCP to inspect, edit, analyze, export, and verify `.fig` design documents. |

This directory is prepared as the source for the standalone `starryai/skills` repository. Do not advertise the install command until that repository is published.
