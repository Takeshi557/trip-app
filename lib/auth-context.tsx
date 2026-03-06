"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"

export interface AuthUser {
  id: string
  name: string
  email: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  signUp: (name: string, email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const SESSION_KEY = "travel-app-session"
const USERS_KEY = "travel-app-users"

interface StoredUser {
  id: string
  name: string
  email: string
  password: string
}

// Default demo user
const DEFAULT_USERS: StoredUser[] = [
  {
    id: "user-1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password",
  },
]

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return DEFAULT_USERS
  try {
    const stored = localStorage.getItem(USERS_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return DEFAULT_USERS
}

function saveUsers(users: StoredUser[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return null
}

function saveSession(user: AuthUser | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

const PUBLIC_PATHS = ["/", "/sign-up"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Restore session on mount
  useEffect(() => {
    const session = getSession()
    setUser(session)
    setIsLoading(false)
  }, [])

  // Route protection
  useEffect(() => {
    if (isLoading) return
    const isPublic = PUBLIC_PATHS.includes(pathname)
    if (!user && !isPublic) {
      router.replace("/")
    }
    if (user && isPublic) {
      router.replace("/recommend")
    }
  }, [user, isLoading, pathname, router])

  const login = useCallback((email: string, password: string) => {
    const users = getStoredUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      return { success: false, error: "メールアドレスまたはパスワードが正しくありません" }
    }
    const authUser: AuthUser = { id: found.id, name: found.name, email: found.email }
    setUser(authUser)
    saveSession(authUser)
    return { success: true }
  }, [])

  const signUp = useCallback((name: string, email: string, password: string) => {
    const users = getStoredUsers()
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return { success: false, error: "このメールアドレスは既に登録されています" }
    }
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
    }
    const updatedUsers = [...users, newUser]
    saveUsers(updatedUsers)
    const authUser: AuthUser = { id: newUser.id, name: newUser.name, email: newUser.email }
    setUser(authUser)
    saveSession(authUser)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    saveSession(null)
    router.replace("/")
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
