import type { Trip, Destination, Spot, ItineraryDay, Schedule } from "./types"

// Mock data for prototype
const initialTrips: Trip[] = [
  {
    id: "1",
    title: "Tokyo Adventure",
    start_date: "2026-03-15",
    end_date: "2026-03-22",
    user_id: "user-1",
  },
  {
    id: "2",
    title: "Paris Getaway",
    start_date: "2026-05-01",
    end_date: "2026-05-08",
    user_id: "user-1",
  },
  {
    id: "3",
    title: "New York City",
    start_date: "2026-07-10",
    end_date: "2026-07-15",
    user_id: "user-1",
  },
]

const initialDestinations: Destination[] = [
  { id: "d1", trip_id: "1", name: "Shibuya", country: "Japan", memo: "Famous crossing and shopping area" },
  { id: "d2", trip_id: "1", name: "Asakusa", country: "Japan", memo: "Traditional temple district" },
  { id: "d3", trip_id: "2", name: "Le Marais", country: "France", memo: "Historic district with cafes" },
]

const initialSpots: Spot[] = [
  { id: "s1", trip_id: "1", name: "Hotel Shinjuku", category: "hotel", address: "1-2-3 Shinjuku", memo: "Check-in at 15:00" },
  { id: "s2", trip_id: "1", name: "Ichiran Ramen", category: "food", address: "Shibuya Center Street", memo: "Famous tonkotsu ramen" },
  { id: "s3", trip_id: "1", name: "Meiji Shrine", category: "spot", address: "1-1 Yoyogi", memo: "Visit early morning" },
  { id: "s4", trip_id: "1", name: "Tsukiji Outer Market", category: "food", address: "Tsukiji", memo: "Fresh sushi breakfast" },
]

const initialDays: ItineraryDay[] = [
  { id: "day1", trip_id: "1", day_number: 1, date: "2026-03-15" },
  { id: "day2", trip_id: "1", day_number: 2, date: "2026-03-16" },
  { id: "day3", trip_id: "1", day_number: 3, date: "2026-03-17" },
]

const initialSchedules: Schedule[] = [
  { id: "sch1", day_id: "day1", spot_id: "s3", spot_name: "Meiji Shrine", start_time: "10:00", end_time: "12:00", memo: "Morning visit" },
  { id: "sch2", day_id: "day1", spot_id: "s2", spot_name: "Ichiran Ramen", start_time: "13:00", end_time: "14:00", memo: "Lunch" },
  { id: "sch3", day_id: "day1", spot_id: "s1", spot_name: "Hotel Shinjuku", start_time: "16:00", end_time: "17:00", memo: "Check-in" },
  { id: "sch4", day_id: "day2", spot_id: "s4", spot_name: "Tsukiji Outer Market", start_time: "07:00", end_time: "09:00", memo: "Sushi breakfast" },
]

let trips = [...initialTrips]
let destinations = [...initialDestinations]
let spots = [...initialSpots]
let days = [...initialDays]
let schedules = [...initialSchedules]

let idCounter = 100

function nextId() {
  idCounter++
  return String(idCounter)
}

// Trip CRUD
export function getTrips(): Trip[] {
  return trips
}

export function getTrip(id: string): Trip | undefined {
  return trips.find((t) => t.id === id)
}

export function createTrip(data: Omit<Trip, "id" | "user_id">): Trip {
  const trip: Trip = { ...data, id: nextId(), user_id: "user-1" }
  trips = [...trips, trip]
  return trip
}

export function deleteTrip(id: string) {
  trips = trips.filter((t) => t.id !== id)
  destinations = destinations.filter((d) => d.trip_id !== id)
  spots = spots.filter((s) => s.trip_id !== id)
  const dayIds = days.filter((d) => d.trip_id === id).map((d) => d.id)
  schedules = schedules.filter((s) => !dayIds.includes(s.day_id))
  days = days.filter((d) => d.trip_id !== id)
}

// Destination CRUD
export function getDestinations(tripId: string): Destination[] {
  return destinations.filter((d) => d.trip_id === tripId)
}

export function createDestination(data: Omit<Destination, "id">): Destination {
  const dest: Destination = { ...data, id: nextId() }
  destinations = [...destinations, dest]
  return dest
}

export function deleteDestination(id: string) {
  destinations = destinations.filter((d) => d.id !== id)
}

// Spot CRUD
export function getSpots(tripId: string): Spot[] {
  return spots.filter((s) => s.trip_id === tripId)
}

export function createSpot(data: Omit<Spot, "id">): Spot {
  const spot: Spot = { ...data, id: nextId() }
  spots = [...spots, spot]
  return spot
}

export function deleteSpot(id: string) {
  spots = spots.filter((s) => s.id !== id)
}

// Itinerary Day CRUD
export function getDays(tripId: string): ItineraryDay[] {
  return days.filter((d) => d.trip_id === tripId).sort((a, b) => a.day_number - b.day_number)
}

export function createDay(data: Omit<ItineraryDay, "id">): ItineraryDay {
  const day: ItineraryDay = { ...data, id: nextId() }
  days = [...days, day]
  return day
}

export function deleteDay(id: string) {
  schedules = schedules.filter((s) => s.day_id !== id)
  days = days.filter((d) => d.id !== id)
}

// Schedule CRUD
export function getSchedules(dayId: string): Schedule[] {
  return schedules.filter((s) => s.day_id === dayId).sort((a, b) => a.start_time.localeCompare(b.start_time))
}

export function createSchedule(data: Omit<Schedule, "id">): Schedule {
  const schedule: Schedule = { ...data, id: nextId() }
  schedules = [...schedules, schedule]
  return schedule
}

export function deleteSchedule(id: string) {
  schedules = schedules.filter((s) => s.id !== id)
}
