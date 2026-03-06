"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import { Fab } from "@/components/fab"
import { getSchedules, getDays } from "@/lib/mock-store"

export default function DayDetailPage({
  params,
}: {
  params: Promise<{ tripId: string; dayId: string }>
}) {
  const { tripId, dayId } = use(params)
  const allDays = getDays(tripId)
  const day = allDays.find((d) => d.id === dayId)
  const scheduleItems = getSchedules(dayId)

  if (!day) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center bg-card">
        <p className="text-sm text-muted-foreground">日程が見つかりません</p>
        <Link href={`/trips/${tripId}`} className="mt-2 text-sm underline underline-offset-4">
          戻る
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-card">
      <header className="flex items-center gap-3 px-5 pt-5 pb-3">
        <Link
          href={`/trips/${tripId}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          aria-label="戻る"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-semibold">{day.day_number}日目</h1>
          <p className="text-xs text-muted-foreground">{day.date}</p>
        </div>
      </header>

      <div className="flex-1 px-5 pt-4 pb-20">
        {scheduleItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Clock className="mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">まだ予定がありません</p>
            <p className="mt-1 text-xs text-muted-foreground">+ をタップして予定を追加しましょう</p>
          </div>
        ) : (
          /* Timeline */
          <div className="relative ml-4 border-l-2 border-border pl-6">
            {scheduleItems.map((item, i) => (
              <div key={item.id} className={`relative pb-8 ${i === scheduleItems.length - 1 ? "pb-0" : ""}`}>
                {/* Timeline dot */}
                <span className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-border bg-card">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                </span>

                {/* Card */}
                <div className="rounded-xl border border-border bg-card p-3.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>
                      {item.start_time} - {item.end_time}
                    </span>
                  </div>
                  <p className="mt-1.5 font-medium">{item.spot_name}</p>
                  {item.memo && (
                    <p className="mt-1 text-xs text-muted-foreground">{item.memo}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Fab href={`/trips/${tripId}/days/${dayId}/schedule/new`} label="予定を追加" />
    </div>
  )
}
