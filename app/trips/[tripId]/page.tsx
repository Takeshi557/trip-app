"use client"

import { use, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getTrip } from "@/lib/mock-store"
import { DestinationsTab } from "@/components/trip/destinations-tab"
import { SpotsTab } from "@/components/trip/spots-tab"
import { ItineraryTab } from "@/components/trip/itinerary-tab"

const tabs = ["目的地", "スポット", "スケジュール"] as const
type TabKey = (typeof tabs)[number]

export default function TripDetailPage({
  params,
}: {
  params: Promise<{ tripId: string }>
}) {
  const { tripId } = use(params)
  const trip = getTrip(tripId)
  const [activeTab, setActiveTab] = useState<TabKey>("目的地")

  if (!trip) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center bg-card">
        <p className="text-sm text-muted-foreground">旅行が見つかりません</p>
        <Link href="/home" className="mt-2 text-sm underline underline-offset-4">
          ホームに戻る
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-card">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-5 pb-2">
        <Link
          href="/home"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          aria-label="戻る"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-semibold truncate">{trip.title}</h1>
      </header>

      {/* Tab navigation */}
      <div className="flex border-b border-border px-5" role="tablist" aria-label="旅行セクション">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 px-5 pt-4 pb-20">
        {activeTab === "目的地" && <DestinationsTab tripId={tripId} />}
        {activeTab === "スポット" && <SpotsTab tripId={tripId} />}
        {activeTab === "スケジュール" && <ItineraryTab tripId={tripId} />}
      </div>
    </div>
  )
}
