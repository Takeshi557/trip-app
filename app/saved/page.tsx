"use client"

import { useState, useEffect, useCallback } from "react"
import { Loader2, Trash2, MapPin, Calendar, Wallet, Sun, BookmarkX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileShell } from "@/components/mobile-shell"
import { useAuth } from "@/lib/auth-context"
import { getSavedTrips, deleteTrip, type SavedTrip } from "@/lib/saved-trips"

export default function SavedPage() {
  const { user, isLoading: authLoading } = useAuth()
  const [trips, setTrips] = useState<SavedTrip[]>([])
  const [loaded, setLoaded] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadTrips = useCallback(() => {
    setTrips(getSavedTrips())
    setLoaded(true)
  }, [])

  useEffect(() => {
    loadTrips()
  }, [loadTrips])

  function handleDelete(id: string) {
    setDeletingId(id)
    setTimeout(() => {
      deleteTrip(id)
      loadTrips()
      setDeletingId(null)
    }, 200)
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
        <h1 className="text-xl font-semibold tracking-tight">保存済み</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          気になる旅行先をあとで見返そう
        </p>
      </header>

      <div className="flex flex-col gap-3 px-5 pb-8 pt-3">
        {loaded && trips.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <BookmarkX className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">保存した旅行先がありません</p>
              <p className="mt-1 text-xs text-muted-foreground">
                提案ページで旅行先を保存しましょう
              </p>
            </div>
          </div>
        )}

        {trips.map((trip) => (
          <article
            key={trip.id}
            className={`flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all ${
              deletingId === trip.id ? "scale-95 opacity-50" : ""
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-semibold leading-tight text-card-foreground">
                  {trip.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{trip.area}</span>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(trip.id)}
                aria-label={`${trip.name}を削除`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Reason */}
            <p className="text-sm leading-relaxed text-muted-foreground">{trip.reason}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5">
                <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-card-foreground">{trip.estimatedBudget}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-card-foreground">{trip.days}</span>
              </div>
              <div className="col-span-2 flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5">
                <Sun className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-card-foreground">{trip.bestSeason}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {trip.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </MobileShell>
  )
}
