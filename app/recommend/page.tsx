"use client"

import { useState, useCallback } from "react"
import { Loader2 } from "lucide-react"
import { MobileShell } from "@/components/mobile-shell"
import { RecommendForm, type RecommendFormData } from "@/components/recommend-form"
import { RecommendationCard, type Recommendation } from "@/components/recommendation-card"
import { useAuth } from "@/lib/auth-context"

export default function RecommendPage() {
  const { user, isLoading: authLoading } = useAuth()
  const [results, setResults] = useState<Recommendation[] | null>(null)
  const [showForm, setShowForm] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(async (data: RecommendFormData) => {
    setResults(null)
    setError(null)
    setIsLoading(true)
    setShowForm(false)

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()
      
      if (!res.ok) {
        console.log("[v0] API error response:", json)
        throw new Error(json?.error || "提案の取得に失敗しました")
      }

      if (json?.recommendations) {
        setResults(json.recommendations)
      } else {
        console.log("[v0] Unexpected response format:", json)
        throw new Error("提案データが不正です")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました")
      setShowForm(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  function handleReset() {
    setResults(null)
    setError(null)
    setShowForm(true)
  }

  if (authLoading || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-card">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <MobileShell>
      <header className="px-5 pt-5 pb-2">
        <h1 className="text-xl font-semibold tracking-tight">旅行先を提案</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          条件を入力して、AIにぴったりの旅行先を提案してもらおう
        </p>
      </header>

      <div className="flex flex-col gap-5 px-5 pb-8 pt-3">
        {/* Error message */}
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <RecommendForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center gap-3 py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">AIが旅行先を考えています...</p>
          </div>
        )}

        {/* Final results */}
        {!isLoading && results && results.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                {results.length}件の提案
              </p>
              <button
                onClick={handleReset}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                条件を変更
              </button>
            </div>
            {results.map((rec, i) => (
              <RecommendationCard key={`${rec.name}-${i}`} rec={rec} index={i} />
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  )
}
