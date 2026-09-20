import { google } from "@ai-sdk/google";

// Central model config — import this anywhere you need the model or system prompt
export const chatModel = google("gemini-2.5-flash");
export const SYSTEM_PROMPT =
  "You are a fast, helpful AI assistant embedded in a capstone project. " +
  "Keep responses clear and concise unless the user asks for depth.";