import { NextResponse } from "next/server";
import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

const affirmationSchema = z.object({
  affirmation: z.string(),
});

export async function GET() {
  try {
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
      schema: affirmationSchema,
      prompt: `
        You are a compassionate well-being coach. Generate one concise daily affirmation (max 25 words) that encourages balance, resilience, and self-kindness for someone tracking their mood and stress.
        Return only the affirmation text.
      `,
    });

    return NextResponse.json({ affirmation: object.affirmation });
  } catch (error) {
    console.error("[affirmation] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate affirmation." },
      { status: 500 }
    );
  }
}
