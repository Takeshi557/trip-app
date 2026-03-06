import { BottomNav } from "./bottom-nav"

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-card">
      <div className="flex-1 pb-16">{children}</div>
      <BottomNav />
    </div>
  )
}
