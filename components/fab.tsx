"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

interface FabProps {
  href: string
  label?: string
}

export function Fab({ href, label }: FabProps) {
  return (
    <Link
      href={href}
      className="fixed bottom-20 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105 active:scale-95"
      aria-label={label ?? "Add new item"}
    >
      <Plus className="h-6 w-6" />
    </Link>
  )
}
