"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createSchedule, getSpots } from "@/lib/mock-store"

export default function AddSchedulePage({
  params,
}: {
  params: Promise<{ tripId: string; dayId: string }>
}) {
  const { tripId, dayId } = use(params)
  const router = useRouter()
  const spots = getSpots(tripId)

  const [spotId, setSpotId] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [memo, setMemo] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!startTime || !endTime) return
    const selectedSpot = spots.find((s) => s.id === spotId)
    createSchedule({
      day_id: dayId,
      spot_id: spotId || null,
      spot_name: selectedSpot?.name ?? "Custom",
      start_time: startTime,
      end_time: endTime,
      memo,
    })
    router.push(`/trips/${tripId}/days/${dayId}`)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-card">
      <header className="flex items-center gap-3 px-5 pt-5 pb-3">
        <Link
          href={`/trips/${tripId}/days/${dayId}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          aria-label="戻る"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-semibold">予定を追加</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 px-5 pt-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="spot">スポット</Label>
          <Select value={spotId} onValueChange={setSpotId}>
            <SelectTrigger className="h-11" id="spot">
              <SelectValue placeholder="スポットを選択（任意）" />
            </SelectTrigger>
            <SelectContent>
              {spots.map((spot) => (
                <SelectItem key={spot.id} value={spot.id}>
                  {spot.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="start-time">開始時間</Label>
            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="end-time">終了時間</Label>
            <Input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="h-11"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="memo">メモ</Label>
          <Textarea
            id="memo"
            placeholder="この予定についてのメモ..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={3}
          />
        </div>
        <Button type="submit" className="mt-4 h-11 w-full">
          保存
        </Button>
      </form>
    </div>
  )
}
