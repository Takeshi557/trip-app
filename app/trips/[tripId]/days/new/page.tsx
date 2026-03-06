"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createDay, getDays } from "@/lib/mock-store"

export default function AddDayPage({
  params,
}: {
  params: Promise<{ tripId: string }>
}) {
  const { tripId } = use(params)
  const router = useRouter()
  const existingDays = getDays(tripId)
  const nextDayNumber = existingDays.length + 1

  const [date, setDate] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!date) return
    createDay({ trip_id: tripId, day_number: nextDayNumber, date })
    router.push(`/trips/${tripId}`)
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
        <h1 className="text-lg font-semibold">日程を追加</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 px-5 pt-4">
        <div className="rounded-xl border border-border bg-secondary/50 p-4 text-center">
          <p className="text-2xl font-semibold">{nextDayNumber}日目</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="date">日付</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11"
          />
        </div>
        <Button type="submit" className="mt-4 h-11 w-full">
          日程を追加
        </Button>
      </form>
    </div>
  )
}
