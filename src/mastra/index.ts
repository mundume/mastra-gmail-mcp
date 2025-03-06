import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { weatherWorkflow } from "./workflows";
import { weatherAgent } from "./agents";
import { mcpSequential } from "./mcp/mcp";

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, mcpSequential },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
