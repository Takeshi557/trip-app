"use client"

import { useState } from "react"
import { Compass } from "lucide-react"
import { Fab } from "@/components/fab"
import { getSpots } from "@/lib/mock-store"
import type { Spot } from "@/lib/types"

const categories = ["all", "hotel", "food", "spot"] as const
type Filter = (typeof categories)[number]

const categoryLabels: Record<string, string> = {
  all: "すべて",
  hotel: "ホテル",
  food: "グルメ",
  spot: "観光地",
}

function categoryColor(cat: Spot["category"]) {
  switch (cat) {
    case "hotel":
      return "bg-secondary text-secondary-foreground"
    case "food":
      return "bg-secondary text-secondary-foreground"
    case "spot":
      return "bg-secondary text-secondary-foreground"
  }
}

export function SpotsTab({ tripId }: { tripId: string }) {
  const [filter, setFilter] = useState<Filter>("all")
  const allSpots = getSpots(tripId)
  const spots = filter === "all" ? allSpots : allSpots.filter((s) => s.category === filter)

  return (
    <>
      {/* Category chips */}
      <div className="mb-4 flex gap-2 overflow-x-auto" role="tablist" aria-label="カテゴリフィルター">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              filter === cat
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {spots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Compass className="mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">スポットがまだありません</p>
          <p className="mt-1 text-xs text-muted-foreground">+ をタップして追加しましょう</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {spots.map((spot) => (
            <div
              key={spot.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium">{spot.name}</p>
                {spot.address && (
                  <p className="text-xs text-muted-foreground">{spot.address}</p>
                )}
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${categoryColor(spot.category)}`}>
                {categoryLabels[spot.category]}
              </span>
            </div>
          ))}
        </div>
      )}

      <Fab href={`/trips/${tripId}/spots/new`} label="Add spot" />
    </>
  )
}
