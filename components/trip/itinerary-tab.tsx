"use client"

import Link from "next/link"
import { Calendar, ChevronRight } from "lucide-react"
import { Fab } from "@/components/fab"
import { getDays } from "@/lib/mock-store"
import { format } from "date-fns"

export function ItineraryTab({ tripId }: { tripId: string }) {
  const allDays = getDays(tripId)

  if (allDays.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Calendar className="mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No days planned yet</p>
          <p className="mt-1 text-xs text-muted-foreground">Tap + to add a day</p>
        </div>
        <Fab href={`/trips/${tripId}/days/new`} label="Add day" />
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {allDays.map((day) => (
          <Link
            key={day.id}
            href={`/trips/${tripId}/days/${day.id}`}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors active:bg-secondary"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">Day {day.day_number}</span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(day.date), "EEE, MMM d")}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
      <Fab href={`/trips/${tripId}/days/new`} label="Add day" />
    </>
  )
}
