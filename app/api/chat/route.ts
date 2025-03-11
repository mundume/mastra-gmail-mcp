import { mastra } from "@/src/mastra";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { MastraMCPClient } from "@mastra/mcp";

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  const user = await currentUser();
  const access = await clerkClient();
  if (!user) {
    throw new Error("No user found");
  }
  const token = await access.users.getUserOauthAccessToken(user.id, "google");
  if (token.totalCount < 1) throw new Error("No tokens for user");
  const accessToken = token.data[0].token;
  console.log({ accessToken });

  const gmailMcpClient = new MastraMCPClient({
    name: "gmail-email-lister",
    server: {
      command: "npx",
      args: [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@mundume/gmail-mcp",
        "--config",
        `{
          "gmailApiKey": "${accessToken}"
        }`,
      ],
      // env: {
      //   GMAIL_API_KEY: accessToken,
      //   GMAIL_USER_ID: user.id,
      // },
    },
  });

  const agent = mastra.getAgent("gmailMcpAgent");

  try {
    // Connect to the MCP server

    await gmailMcpClient.connect();
    console.log("Connected to MCP server");

    // Get available tools
    const gmailMcpTools = await gmailMcpClient.tools();
    console.log("Available tools:", gmailMcpTools);

    // Use the agent with the Sequential Thinking tool
    const response = await agent.stream(messages, {
      toolsets: {
        gmailMcp: gmailMcpTools,
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
    // // Always disconnect when done
    await gmailMcpClient.disconnect();
  }
}
