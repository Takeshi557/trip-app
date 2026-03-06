"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const { login, isLoading, user } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("メールアドレスとパスワードを入力してください")
      return
    }

    setSubmitting(true)
    const result = login(email, password)
    if (!result.success) {
      setError(result.error || "ログインに失敗しました")
      setSubmitting(false)
    }
  }

  // Show loading state while checking session
  if (isLoading || user) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-card">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center bg-card px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground">
            <Sparkles className="h-6 w-6 text-background" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Tabisaki</h1>
          <p className="text-sm text-muted-foreground">AIがあなたにぴったりの旅行先を提案</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">{error}</p>
          )}

          <Button type="submit" className="mt-2 h-11 w-full" disabled={submitting}>
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "ログイン"
            )}
          </Button>
        </form>

        <div className="mt-4 rounded-lg border border-border bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground">
            {"デモアカウント: demo@example.com / password"}
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {"アカウントをお持ちでないですか？ "}
          <Link href="/sign-up" className="font-medium text-foreground underline underline-offset-4">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  )
}
