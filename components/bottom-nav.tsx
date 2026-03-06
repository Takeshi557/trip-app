"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Bookmark, User } from "lucide-react"

const navItems = [
  { href: "/recommend", label: "提案", icon: Sparkles },
  { href: "/saved", label: "保存済み", icon: Bookmark },
  { href: "/profile", label: "マイページ", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card" role="navigation" aria-label="メインナビゲーション">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 text-xs transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.5} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
