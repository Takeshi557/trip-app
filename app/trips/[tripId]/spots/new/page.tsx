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
import { createSpot } from "@/lib/mock-store"
import type { Spot } from "@/lib/types"

export default function AddSpotPage({
  params,
}: {
  params: Promise<{ tripId: string }>
}) {
  const { tripId } = use(params)
  const router = useRouter()
  const [name, setName] = useState("")
  const [category, setCategory] = useState<Spot["category"]>("spot")
  const [address, setAddress] = useState("")
  const [memo, setMemo] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return
    createSpot({ trip_id: tripId, name, category, address, memo })
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
        <h1 className="text-lg font-semibold">スポットを追加</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 px-5 pt-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="spot-name">スポット名</Label>
          <Input
            id="spot-name"
            placeholder="例: 東京スカイツリー"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="category">カテゴリ</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as Spot["category"])}>
            <SelectTrigger className="h-11" id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hotel">ホテル</SelectItem>
              <SelectItem value="food">グルメ</SelectItem>
              <SelectItem value="spot">観光地</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="address">住所</Label>
          <Input
            id="address"
            placeholder="住所または場所"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-11"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="memo">メモ</Label>
          <Textarea
            id="memo"
            placeholder="このスポットについてのメモ..."
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
