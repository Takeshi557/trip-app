"use client"

import { useState, useEffect } from "react"
import { MapPin, Calendar, Wallet, Sun, Bookmark, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { saveTrip, isTripSaved } from "@/lib/saved-trips"

export interface Recommendation {
  name: string
  area: string
  reason: string
  estimatedBudget: string
  days: string
  bestSeason: string
  tags: string[]
}

interface RecommendationCardProps {
  rec: Recommendation
  index: number
  onSaved?: () => void
}

export function RecommendationCard({ rec, index, onSaved }: RecommendationCardProps) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isTripSaved(rec.name, rec.area))
  }, [rec.name, rec.area])

  function handleSave() {
    if (saved) return
    saveTrip({
      name: rec.name,
      area: rec.area,
      reason: rec.reason,
      estimatedBudget: rec.estimatedBudget,
      days: rec.days,
      bestSeason: rec.bestSeason,
      tags: rec.tags,
    })
    setSaved(true)
    onSaved?.()
  }

  return (
    <article
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-semibold leading-tight text-card-foreground">{rec.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{rec.area}</span>
          </div>
        </div>
        <Button
          size="sm"
          variant={saved ? "secondary" : "outline"}
          className="shrink-0 gap-1.5"
          onClick={handleSave}
          disabled={saved}
        >
          {saved ? (
            <>
              <Check className="h-3.5 w-3.5" />
              保存済み
            </>
          ) : (
            <>
              <Bookmark className="h-3.5 w-3.5" />
              保存
            </>
          )}
        </Button>
      </div>

      {/* Reason */}
      <p className="text-sm leading-relaxed text-muted-foreground">{rec.reason}</p>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5">
          <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-card-foreground">{rec.estimatedBudget}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-card-foreground">{rec.days}</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5">
          <Sun className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-card-foreground">{rec.bestSeason}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {rec.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
