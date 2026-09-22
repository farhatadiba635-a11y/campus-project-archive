import OpenAI from "openai";

export type ArchiveAiProviderStatus = {
  enabled: boolean;
  provider: "openai" | null;
  model: string;
  embeddingModel: string;
  missingEnv: string[];
};

export function getArchiveAiConfig(): ArchiveAiProviderStatus {
  const provider = (process.env.AI_PROVIDER ?? "openai").toLowerCase();
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const embeddingModel = process.env.OPENAI_EMBEDDING_MODEL?.trim() || "text-embedding-3-small";

  const missingEnv: string[] = [];

  if (provider === "openai" && !apiKey) {
    missingEnv.push("OPENAI_API_KEY");
  }

  return {
    enabled: provider === "openai" && Boolean(apiKey),
    provider: provider === "openai" ? "openai" : null,
    model,
    embeddingModel,
    missingEnv,
  };
}

export function getArchiveAiClient() {
  const config = getArchiveAiConfig();

  if (!config.enabled || !process.env.OPENAI_API_KEY) {
    return null;
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: false,
  });
}

export async function generateArchiveEmbedding(text: string) {
  const client = getArchiveAiClient();

  if (!client) {
    return null;
  }

  const config = getArchiveAiConfig();

  const response = await client.embeddings.create({
    model: config.embeddingModel,
    input: text,
  });

  return response.data[0]?.embedding ?? null;
}

export async function generateArchiveAnswer({
  question,
  context,
  citations,
}: {
  question: string;
  context: string;
  citations?: Array<{ title?: string; projectName?: string; snippet?: string }>; 
}) {
  const config = getArchiveAiConfig();

  if (!config.enabled) {
    return {
      ok: false,
      status: "not_configured",
      message: "Archive AI is not configured. Set OPENAI_API_KEY and optionally OPENAI_MODEL/OPENAI_EMBEDDING_MODEL in the server environment before enabling inference.",
    } as const;
  }

  const client = getArchiveAiClient();

  if (!client) {
    return {
      ok: false,
      status: "not_configured",
      message: "Archive AI is not configured. Set OPENAI_API_KEY in the server environment before enabling inference.",
    } as const;
  }

  const citationList = (citations ?? [])
    .slice(0, 5)
    .map((citation) => `${citation.title ?? "Source"} (${citation.projectName ?? "Archive"})`)
    .join("\n");

  const completion = await client.chat.completions.create({
    model: config.model,
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "You are a campus archive assistant. Use only the retrieved project and document context. Do not invent project-specific facts. If information is not present in the supplied context, say it clearly. Keep answers concise, useful, and grounded in the archive evidence. Include citations for factual claims when citing is possible.",
      },
      {
        role: "user",
        content: `Question: ${question}\n\nRetrieved context:\n${context}\n\nRelevant citations:\n${citationList || "No citations available."}`,
      },
    ],
  });

  const answer = completion.choices[0]?.message?.content?.trim();

  if (!answer) {
    return {
      ok: false,
      status: "empty_response",
      message: "The AI provider returned an empty response. Please try again with a different question.",
    } as const;
  }

  return {
    ok: true,
    status: "ok",
    answer,
  } as const;
}
