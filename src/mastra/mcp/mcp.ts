import { Agent } from "@mastra/core/agent";
import { MastraMCPClient } from "@mastra/mcp";
import { google } from "@ai-sdk/google";

// Sequential Thinking server as an example:
// https://smithery.ai/server/@smithery-ai/server-sequential-thinking
// Initialize the MCP client
export const sequentialThinkingClient = new MastraMCPClient({
  name: "sequential-thinking",
  server: {
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-sequential-thinking"],
  },
});

// Create a Mastra Agent
export const mcpSequential = new Agent({
  name: "Reasoning agent",
  instructions:
    "You solve problems by breaking them down into sequential steps. Use the sequential thinking tool to walk through your reasoning process step by step.",
  model: google("gemini-2.0-flash-001"),
});
