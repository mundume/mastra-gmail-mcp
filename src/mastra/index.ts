import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { weatherWorkflow } from "./workflows";
import { weatherAgent } from "./agents";
import { gmailMcpAgent } from "./mcp/mcp";

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, gmailMcpAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
