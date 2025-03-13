import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";
import { instructions } from "../instructions";

// Sequential Thinking server as an example:
// https://smithery.ai/server/@smithery-ai/server-sequential-thinking
// Initialize the MCP client

// Create a Mastra Agent
export const gmailMcpAgent = new Agent({
  name: "gmail-mcp",
  instructions,
  model: google("gemini-2.0-flash-001"),
});

// npx -y @smithery/cli@latest run @mundume/simple-mcp --config "{}"
