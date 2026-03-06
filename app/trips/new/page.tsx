"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTrip } from "@/lib/mock-store"

export default function NewTripPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !startDate || !endDate) return
    createTrip({ title, start_date: startDate, end_date: endDate })
    router.push("/home")
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-card">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-5 pb-3">
        <Link
          href="/home"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          aria-label="戻る"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-semibold">新しい旅行</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 px-5 pt-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">旅行タイトル</Label>
          <Input
            id="title"
            placeholder="例: イタリアの夏休み"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="start">開始日</Label>
          <Input
            id="start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-11"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="end">終了日</Label>
          <Input
            id="end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-11"
          />
        </div>
        <Button type="submit" className="mt-4 h-11 w-full">
          旅行を作成
        </Button>
      </form>
    </div>
  )
}
