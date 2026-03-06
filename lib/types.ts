export interface Trip {
  id: string
  title: string
  start_date: string
  end_date: string
  user_id: string
}

export interface Destination {
  id: string
  trip_id: string
  name: string
  country: string
  memo: string
}

export interface Spot {
  id: string
  trip_id: string
  name: string
  category: "hotel" | "food" | "spot"
  address: string
  memo: string
}

export interface ItineraryDay {
  id: string
  trip_id: string
  day_number: number
  date: string
}

export interface Schedule {
  id: string
  day_id: string
  spot_id: string | null
  spot_name: string
  start_time: string
  end_time: string
  memo: string
}
