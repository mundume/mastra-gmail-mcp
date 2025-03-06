import { mastra } from "@/src/mastra";
import { sequentialThinkingClient } from "@/src/mastra/mcp/mcp";
import { openai } from "@ai-sdk/openai";
import { jsonSchema, streamText } from "ai";

export const maxDuration = 30;
export const revalidate = 1;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();
  const agent = mastra.getAgent("mcpSequential");

  try {
    // Connect to the MCP server
    await sequentialThinkingClient.connect();

    // Get available tools
    const sequentialThinkingTools = await sequentialThinkingClient.tools();

    // Use the agent with the Sequential Thinking tool
    const response = await agent.stream(messages, {
      toolsets: {
        sequentialThinking: sequentialThinkingTools,
      },
    });

    for await (const part of response.fullStream) {
      switch (part.type) {
        case "error":
          console.error(part.error);
          break;
        case "text-delta":
          process.stdout.write(part.textDelta);
          break;
        case "tool-call":
          console.info(`\n-> Tool call: ${part.toolName}\n`);
      }
    }
    return response.toDataStreamResponse();
  } finally {
    // Always disconnect when done
    await sequentialThinkingClient.disconnect();
  }
}
