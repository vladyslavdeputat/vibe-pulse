import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const analysisSchema = z.object({
  mood: z.string(),
  stress_level: z.number(),
  topic: z.string(),
  summary: z.string(),
  advice: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = typeof body?.text === "string" ? body.text.trim() : "";

    if (!text) {
      return NextResponse.json(
        { error: "Missing journal entry text." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "OpenAI API key is missing. Please set the OPENAI_API_KEY environment variable.",
        },
        { status: 500 }
      );
    }

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: analysisSchema,
      prompt: `
        Analyze this journal entry and return an object describing the user's emotional state.
        Entry: "${text}"
      `,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("[analyze] Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze journal entry." },
      { status: 500 }
    );
  }
}
