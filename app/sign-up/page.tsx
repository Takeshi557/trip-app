"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function SignUpPage() {
  const { signUp, isLoading, user } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("名前を入力してください")
      return
    }
    if (!email.trim()) {
      setError("メールアドレスを入力してください")
      return
    }
    if (password.length < 4) {
      setError("パスワードは4文字以上で入力してください")
      return
    }

    setSubmitting(true)
    const result = signUp(name.trim(), email.trim(), password)
    if (!result.success) {
      setError(result.error || "登録に失敗しました")
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
          <h1 className="text-2xl font-semibold tracking-tight">アカウント作成</h1>
          <p className="text-sm text-muted-foreground">AIと一緒に旅行先を見つけよう</p>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              type="text"
              placeholder="お名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11"
            />
          </div>
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
              placeholder="4文字以上のパスワード"
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
              "登録する"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {"アカウントをお持ちですか？ "}
          <Link href="/" className="font-medium text-foreground underline underline-offset-4">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  )
}
