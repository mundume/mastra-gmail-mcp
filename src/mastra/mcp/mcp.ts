import { Agent } from "@mastra/core/agent";
import { MastraMCPClient } from "@mastra/mcp";
import { google } from "@ai-sdk/google";

// Sequential Thinking server as an example:
// https://smithery.ai/server/@smithery-ai/server-sequential-thinking
// Initialize the MCP client
export const simpleMcpClient = new MastraMCPClient({
  name: "simple-mcp",
  server: {
    command: "npx",
    args: [
      "-y",
      "@smithery/cli@latest",
      "run",
      "@mundume/simple-mcp",
      "--config",
      "{}",
    ],
  },
});

// Create a Mastra Agent
export const simpleMcpAgent = new Agent({
  name: "notes mcp",
  instructions:
    "You are a helpful assistant that helps users manage their notes.",
  model: google("gemini-2.0-flash-001"),
});

// npx -y @smithery/cli@latest run @mundume/simple-mcp --config "{}"
