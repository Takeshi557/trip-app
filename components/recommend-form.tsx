"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles } from "lucide-react"

const COMPANIONS = ["一人", "友達", "恋人", "家族"] as const
const PREFERENCES = ["自然", "温泉", "グルメ", "観光", "アクティブ"] as const
const MOODS = ["静か", "にぎやか"] as const
const TRANSPORTS = ["電車", "車", "飛行機"] as const

export interface RecommendFormData {
  departure: string
  days: number
  budget: number
  companion: string
  preferences: string[]
  mood: string
  transport: string
}

interface RecommendFormProps {
  onSubmit: (data: RecommendFormData) => void
  isLoading: boolean
}

export function RecommendForm({ onSubmit, isLoading }: RecommendFormProps) {
  const [departure, setDeparture] = useState("東京")
  const [days, setDays] = useState(2)
  const [budget, setBudget] = useState(50000)
  const [companion, setCompanion] = useState<string>("一人")
  const [preferences, setPreferences] = useState<string[]>(["グルメ"])
  const [mood, setMood] = useState<string>("静か")
  const [transport, setTransport] = useState<string>("電車")

  function togglePreference(pref: string) {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (preferences.length === 0) return
    onSubmit({ departure, days, budget, companion, preferences, mood, transport })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Departure */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="departure">出発地</Label>
        <Input
          id="departure"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          placeholder="例: 東京、大阪"
          className="h-11"
          required
        />
      </div>

      {/* Days + Budget row */}
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <Label htmlFor="days">日数</Label>
          <div className="flex items-center gap-2">
            <Input
              id="days"
              type="number"
              min={1}
              max={7}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="h-11"
            />
            <span className="shrink-0 text-sm text-muted-foreground">日</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <Label htmlFor="budget">予算</Label>
          <div className="flex items-center gap-2">
            <Input
              id="budget"
              type="number"
              min={5000}
              max={500000}
              step={5000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="h-11"
            />
            <span className="shrink-0 text-sm text-muted-foreground">円</span>
          </div>
        </div>
      </div>

      {/* Companion */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium leading-none">同行者</legend>
        <div className="flex flex-wrap gap-2">
          {COMPANIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCompanion(c)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                companion === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Preferences (multi-select) */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium leading-none">
          {"好み（複数選択可）"}
        </legend>
        <div className="flex flex-wrap gap-2">
          {PREFERENCES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => togglePreference(p)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                preferences.includes(p)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        {preferences.length === 0 && (
          <p className="text-xs text-destructive">1つ以上選択してください</p>
        )}
      </fieldset>

      {/* Mood */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium leading-none">雰囲気</legend>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                mood === m
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Transport */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium leading-none">移動手段</legend>
        <div className="flex flex-wrap gap-2">
          {TRANSPORTS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTransport(t)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                transport === t
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Submit */}
      <Button type="submit" className="mt-1 h-12 w-full gap-2 text-base" disabled={isLoading || preferences.length === 0}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            AIが提案中...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            おすすめを提案
          </>
        )}
      </Button>
    </form>
  )
}
