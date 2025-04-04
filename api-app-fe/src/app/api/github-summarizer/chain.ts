import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

// Define the structure for the output
const outputSchema = z.object({
  summary: z.string().describe("A concise summary of the GitHub repository based on its README"),
  coolFacts: z.array(z.string()).describe("A list of interesting facts or key features found in the README")
});

// Create an output parser
const outputParser = StructuredOutputParser.fromZodSchema(outputSchema);

// Create the prompt template
const prompt = PromptTemplate.fromTemplate(`
You are a technical analyst who excels at summarizing GitHub repositories.
Based on the following README content from a GitHub repository, provide a structured analysis.

README Content:
{readme_content}

{format_instructions}

Remember to be concise but informative in the summary, and extract the most interesting technical details or features for the cool facts.`);

// Initialize the model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY
});

// Create the chain
export const createGitHubSummaryChain = () => {
  return RunnableSequence.from([
    {
      readme_content: (input: { readme: string }) => input.readme,
      format_instructions: async () => outputParser.getFormatInstructions(),
    },
    prompt,
    model,
    outputParser,
  ]);
};

// Type for the chain output
export type GitHubSummaryOutput = z.infer<typeof outputSchema>; 