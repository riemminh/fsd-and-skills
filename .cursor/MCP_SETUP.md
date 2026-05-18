# Cursor MCP setup

This project uses two project-scoped MCP servers in `.cursor/mcp.json`.

## Servers

- `agentmemory`: persistent agent memory.
- `claude-context`: semantic codebase retrieval.

## Required local setup

Install/use Node.js 20+ for `claude-context`.

Set secrets in your shell or Cursor launch environment, not in `mcp.json`:

```sh
export OPENAI_API_KEY="sk-..."
export MILVUS_ADDRESS="your-zilliz-cloud-public-endpoint"
export MILVUS_TOKEN="your-zilliz-cloud-api-key"
```

Start agentmemory before using Cursor memory tools:

```sh
npx -y @agentmemory/agentmemory
```

The Cursor MCP entry uses the canonical MCP command:

```sh
npx -y @agentmemory/agentmemory mcp
```

If Cursor previously showed `crypto is not defined` from `memory_save`, restart Cursor after this config change and try `memory_save` again.

Then restart Cursor and open Settings -> Cursor Settings -> MCP. The project should show:

- `agentmemory`
- `claude-context`

## First use

Ask Cursor to index this codebase with `claude-context` before semantic code search.

Use `agentmemory` only for durable project decisions, preferences, bug history, and handoff notes. Do not save temporary task noise.
