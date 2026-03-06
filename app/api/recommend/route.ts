import { generateText, Output } from "ai"
import { z } from "zod"

export const maxDuration = 30

const recommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      name: z.string().describe("旅行先の名前"),
      area: z.string().describe("エリア・地方（例: 関東、北海道、沖縄）"),
      reason: z.string().describe("おすすめの理由（2-3文）"),
      estimatedBudget: z.string().describe("一人あたりの目安予算（例: 30,000円〜50,000円）"),
      days: z.string().describe("おすすめ日数（例: 2泊3日）"),
      bestSeason: z.string().describe("ベストシーズン（例: 春〜初夏）"),
      tags: z.array(z.string()).describe("特徴タグ（3-5個）"),
    })
  ),
})

export async function POST(req: Request) {
  try {
    const { departure, days, budget, companion, preferences, mood, transport } =
      await req.json()

    const numResults = Math.min(Math.max(3, Number(days) || 3), 6)

    const prompt = `あなたは日本国内の旅行エキスパートです。以下の条件に合う旅行先を${numResults}件提案してください。

条件:
- 出発地: ${departure}
- 日数: ${days}日
- 予算: ${budget}円（一人あたり）
- 同行者: ${companion}
- 好み: ${Array.isArray(preferences) ? preferences.join("、") : preferences}
- 雰囲気: ${mood}
- 移動手段: ${transport}

提案のルール:
- 日本国内の実在する旅行先を提案すること
- 条件に合った具体的で実用的な提案にすること
- 各提案は異なるエリアから選ぶこと
- おすすめ理由は条件に紐づけた具体的な内容にすること
- 予算は交通費・宿泊費・食費を含めた目安を提示すること`

    const result = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      output: Output.object({
        schema: recommendationSchema,
      }),
    })

    return Response.json(result.output)
  } catch (error) {
    console.error("[v0] API recommend error:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
