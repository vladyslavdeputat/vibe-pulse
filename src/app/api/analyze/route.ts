import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const analysisSchema = z.object({
  mood: z.string(),
  stress_level: z.number(),
  topic: z.string(),
  summary: z.string(),
  advice: z.string(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to analyze journal entries." },
        { status: 401 }
      );
    }

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

    const supabase = createAdminClient();
    const { data, error: insertError } = await supabase
      .from("journal_entries")
      .insert({
        user_id: userId,
        text,
        mood: object.mood,
        stress_level: object.stress_level,
        topic: object.topic,
        advice: object.advice,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("[analyze] Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save journal analysis." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      mood: object.mood,
      stress_level: object.stress_level,
      topic: object.topic,
      summary: object.summary,
      advice: object.advice,
      record: data,
    });
  } catch (error) {
    console.error("[analyze] Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze journal entry." },
      { status: 500 }
    );
  }
}
