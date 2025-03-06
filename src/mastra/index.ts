import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { weatherWorkflow } from "./workflows";
import { weatherAgent } from "./agents";
import { simpleMcpAgent } from "./mcp/mcp";

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, simpleMcpAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
