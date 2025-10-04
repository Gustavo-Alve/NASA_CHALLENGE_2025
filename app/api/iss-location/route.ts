import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
  try {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544")

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      latitude: data.latitude,
      longitude: data.longitude,
      altitude: data.altitude,
      velocity: data.velocity,
      timestamp: data.timestamp,
    })
  } catch (error) {
    console.error("[v0] Error fetching ISS location:", error)
    return NextResponse.json({ error: "Failed to fetch ISS location" }, { status: 500 })
  }
}
