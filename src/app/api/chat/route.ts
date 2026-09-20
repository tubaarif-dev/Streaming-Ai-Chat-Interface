import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY in environment.");
    }

    const { messages }: { messages: UIMessage[] } = await req.json();
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: process.env.SYSTEM_PROMPT || "You are a helpful AI assistant.",
      messages: modelMessages,
      onError: ({ error }) => {
        console.error("streamText upstream error:", error);
      },
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        if (error instanceof Error) return error.message;
        return "Something went wrong while generating a response.";
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}