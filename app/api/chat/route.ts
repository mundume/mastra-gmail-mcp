import { mastra } from "@/src/mastra";
import { MastraMCPClient } from "@mastra/mcp";

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();
  const simpleMcpClient = new MastraMCPClient({
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

  const agent = mastra.getAgent("simpleMcpAgent");

  try {
    // Connect to the MCP server

    await simpleMcpClient.connect();
    console.log("Connected to MCP server");

    // Get available tools
    const simpleMcpTools = await simpleMcpClient.tools();
    console.log("Available tools:", simpleMcpTools);

    // Use the agent with the Sequential Thinking tool
    const response = await agent.stream(messages, {
      toolsets: {
        simpleMcp: simpleMcpTools,
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
    console.log(response.text);
    return response.toDataStreamResponse();
  } finally {
    console.log("disconnecting");
    // Always disconnect when done
    await simpleMcpClient.disconnect();
  }
}
