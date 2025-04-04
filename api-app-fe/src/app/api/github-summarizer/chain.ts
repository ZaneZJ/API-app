import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

// Define the structure for the output
const outputSchema = z.object({
  summary: z.string().describe("A concise summary of the GitHub repository based on its README"),
  coolFacts: z.array(z.string()).describe("A list of interesting facts or key features found in the README")
});

// Create the prompt template
const prompt = PromptTemplate.fromTemplate(`
You are a technical analyst who excels at summarizing GitHub repositories.
Based on the following README content from a GitHub repository, provide a structured analysis.

README Content:
{readme_content}

Provide a concise summary of the repository and extract the most interesting technical details or features as cool facts.`);

// Initialize the model with structured output
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY
}).withStructuredOutput(outputSchema);

// Create the chain
export const createGitHubSummaryChain = () => {
  return RunnableSequence.from([
    {
      readme_content: (input: { readme: string }) => input.readme,
    },
    prompt,
    model,
  ]);
};

// Type for the chain output
export type GitHubSummaryOutput = z.infer<typeof outputSchema>; 