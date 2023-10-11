// Import the required packages.
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";

export const runtime = "edge";

// Define the system prompt.
const SYSTEM_PROMPT = `Your task is to generate a poem`;

export async function POST(req: Request) {
  // Extract the prompt from the request body.
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  // Extract the OpenAI API key from the environment.
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response("Missing env var from OpenAI", { status: 500 });
  }

  // Standard OpenAI SDK configuration.
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  try {
    // Stream the response from OpenAI.
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: SYSTEM_PROMPT,
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: prompt,
        },
      ],
    });

    // Surface errors from OpenAI directly to the user.
    if (response.status >= 300) {
      const body = await response.json();
      return NextResponse.json(
        { error: `OpenAI error encountered: ${body?.error?.message}.` },
        { status: response.status }
      );
    }

    // Use Vercel AI APIs to effectively and efficiently stream the response.
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (e) {
    // Generic error handling for unexpected errors.
    console.error(e);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
