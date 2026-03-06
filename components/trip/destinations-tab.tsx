"use client"

import { MapPin } from "lucide-react"
import { Fab } from "@/components/fab"
import { getDestinations } from "@/lib/mock-store"

export function DestinationsTab({ tripId }: { tripId: string }) {
  const destinations = getDestinations(tripId)

  if (destinations.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <MapPin className="mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">目的地がまだありません</p>
          <p className="mt-1 text-xs text-muted-foreground">+ をタップして追加しましょう</p>
        </div>
        <Fab href={`/trips/${tripId}/destinations/new`} label="目的地を追加" />
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="font-medium">{dest.name}</p>
            <p className="text-xs text-muted-foreground">{dest.country}</p>
            {dest.memo && (
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{dest.memo}</p>
            )}
          </div>
        ))}
      </div>
      <Fab href={`/trips/${tripId}/destinations/new`} label="目的地を追加" />
    </>
  )
}
