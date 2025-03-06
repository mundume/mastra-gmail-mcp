import { mastra } from "@/src/mastra";
import { openai } from "@ai-sdk/openai";
import { jsonSchema, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  const res = await mastra.getAgent("weatherAgent");
  const response = await res.stream(messages, {});

  // const result = streamText({
  //   model: openai("gpt-4o"),
  //   messages,
  //   system,
  //   // tools: Object.fromEntries(
  //   //   Object.keys(tools).map((name) => [
  //   //     name,
  //   //     { ...tools[name], parameters: jsonSchema(tools[name].parameters) },
  //   //   ])
  //   // ),
  // });

  return response.toDataStreamResponse();
}
