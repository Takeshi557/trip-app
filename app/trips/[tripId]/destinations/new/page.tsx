"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createDestination } from "@/lib/mock-store"

export default function AddDestinationPage({
  params,
}: {
  params: Promise<{ tripId: string }>
}) {
  const { tripId } = use(params)
  const router = useRouter()
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [memo, setMemo] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return
    createDestination({ trip_id: tripId, name, country, memo })
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
        <h1 className="text-lg font-semibold">目的地を追加</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 px-5 pt-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="dest-name">目的地名</Label>
          <Input
            id="dest-name"
            placeholder="例: 京都"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="country">国</Label>
          <Input
            id="country"
            placeholder="例: 日本"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="h-11"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="memo">メモ</Label>
          <Textarea
            id="memo"
            placeholder="この目的地についてのメモ..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={4}
          />
        </div>
        <Button type="submit" className="mt-4 h-11 w-full">
          保存
        </Button>
      </form>
    </div>
  )
}
