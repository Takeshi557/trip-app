"use client"

import { useState } from "react"
import { User, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileShell } from "@/components/mobile-shell"
import { useAuth } from "@/lib/auth-context"

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth()
  const [showConfirm, setShowConfirm] = useState(false)

  if (isLoading || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-card">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <MobileShell>
      <header className="px-5 pt-5 pb-3">
        <h1 className="text-xl font-semibold tracking-tight">プロフィール</h1>
      </header>

      <div className="flex flex-col items-center gap-3 px-5 py-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5">
        {!showConfirm ? (
          <Button
            variant="outline"
            className="h-11 w-full gap-2"
            onClick={() => setShowConfirm(true)}
          >
            <LogOut className="h-4 w-4" />
            ログアウト
          </Button>
        ) : (
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-secondary/50 p-4">
            <p className="text-center text-sm">ログアウトしますか？</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-10 flex-1"
                onClick={() => setShowConfirm(false)}
              >
                キャンセル
              </Button>
              <Button
                variant="destructive"
                className="h-10 flex-1"
                onClick={logout}
              >
                ログアウト
              </Button>
            </div>
          </div>
        )}
      </div>
    </MobileShell>
  )
}
