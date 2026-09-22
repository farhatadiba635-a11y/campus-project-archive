import { NextResponse } from "next/server";
import { generateArchiveAnswer, getArchiveAiConfig } from "@/src/lib/ai";
import { retrieveArchiveContext } from "@/src/lib/archive-ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { question?: string; userRole?: string };
    const question = (body.question ?? "").trim();
    const userRole = typeof body.userRole === "string" ? body.userRole.toUpperCase() : "STUDENT";

    if (!question) {
      return NextResponse.json({ error: "A question is required." }, { status: 400 });
    }

    if (userRole !== "FACULTY" && userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "You do not have permission to query the archive AI knowledge base." },
        { status: 403 },
      );
    }

    const retrieval = retrieveArchiveContext(question, {
      limit: 6,
      user: { role: userRole },
    });

    const aiConfig = getArchiveAiConfig();

    if (!aiConfig.enabled) {
      return NextResponse.json(
        {
          error:
            "Archive AI is not configured. Set OPENAI_API_KEY in the server environment to enable AI generation.",
          citations: retrieval.citations,
          answer:
            "I couldn't find enough information in the available archive sources to answer reliably because the AI provider is not configured yet.",
          configurationRequired: aiConfig.missingEnv,
        },
        { status: 503 },
      );
    }

    const context = retrieval.chunks
      .slice(0, 6)
      .map((chunk) => `[${chunk.projectName}] ${chunk.title}: ${chunk.text}`)
      .join("\n\n");

    const aiResult = await generateArchiveAnswer({
      question,
      context,
      citations: retrieval.citations,
    });

    if (!aiResult.ok) {
      return NextResponse.json(
        {
          error: aiResult.message,
          citations: retrieval.citations,
          answer:
            "I couldn't find enough information in the available archive sources to answer reliably.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      answer: aiResult.answer,
      citations: retrieval.citations,
      documentAccess: retrieval.documentAccess,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Archive AI request failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
