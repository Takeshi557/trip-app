export interface SavedTrip {
  id: string
  name: string
  area: string
  reason: string
  estimatedBudget: string
  days: string
  bestSeason: string
  tags: string[]
  savedAt: string
}

const STORAGE_KEY = "tabisaki-saved-trips"

// ---------------------------------------------------------------------------
// Supabase stubs (ready for future integration)
// ---------------------------------------------------------------------------
// import { createClient } from "@supabase/supabase-js"
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
//
// export async function saveTripToSupabase(trip: Omit<SavedTrip, "id" | "savedAt">) {
//   return supabase.from("saved_trips").insert({
//     name: trip.name,
//     area: trip.area,
//     reason: trip.reason,
//     estimated_budget: trip.estimatedBudget,
//     days: trip.days,
//     best_season: trip.bestSeason,
//     tags: trip.tags,
//   })
// }
//
// export async function deleteTripFromSupabase(id: string) {
//   return supabase.from("saved_trips").delete().eq("id", id)
// }
//
// export async function getSavedTripsFromSupabase() {
//   return supabase.from("saved_trips").select("*").order("created_at", { ascending: false })
// }
// ---------------------------------------------------------------------------

function getStored(): SavedTrip[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persist(trips: SavedTrip[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips))
}

export function getSavedTrips(): SavedTrip[] {
  return getStored()
}

export function saveTrip(trip: Omit<SavedTrip, "id" | "savedAt">): SavedTrip {
  const saved: SavedTrip = {
    ...trip,
    id: `saved-${Date.now()}`,
    savedAt: new Date().toISOString(),
  }
  const all = getStored()
  persist([saved, ...all])
  return saved
}

export function deleteTrip(id: string) {
  const all = getStored()
  persist(all.filter((t) => t.id !== id))
}

export function isTripSaved(name: string, area: string): boolean {
  return getStored().some((t) => t.name === name && t.area === area)
}
