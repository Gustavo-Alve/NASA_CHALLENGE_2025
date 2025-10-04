// NASA API integration utilities

const NASA_IMAGE_API = "https://images-api.nasa.gov"
const ISS_LOCATION_API = "https://api.open-notify.org/iss-now.json"

export type NASAImage = {
  href: string
  title: string
  description: string
  date_created: string
  center: string
  keywords: string[]
}

export type ISSLocation = {
  latitude: number
  longitude: number
  altitude: number
  velocity: number
  timestamp: number
}

/**
 * Fetch images from NASA Image and Video Library
 * This API is public and doesn't require authentication
 */
export async function searchNASAImages(query: string, limit = 10): Promise<NASAImage[]> {
  try {
    const response = await fetch(
      `${NASA_IMAGE_API}/search?q=${encodeURIComponent(query)}&media_type=image&page_size=${limit}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch NASA images")
    }

    const data = await response.json()

    if (!data.collection?.items) {
      return []
    }

    return data.collection.items.map((item: any) => ({
      href: item.links?.[0]?.href || "",
      title: item.data?.[0]?.title || "Untitled",
      description: item.data?.[0]?.description || "",
      date_created: item.data?.[0]?.date_created || "",
      center: item.data?.[0]?.center || "NASA",
      keywords: item.data?.[0]?.keywords || [],
    }))
  } catch (error) {
    console.error("[v0] Error fetching NASA images:", error)
    return []
  }
}

/**
 * Get current ISS location
 * Uses server-side API route to avoid CORS issues
 */
export async function getISSLocation(): Promise<ISSLocation | null> {
  try {
    const response = await fetch("/api/iss-location")

    if (!response.ok) {
      throw new Error("Failed to fetch ISS location")
    }

    const data = await response.json()

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      altitude: data.altitude,
      velocity: data.velocity,
      timestamp: data.timestamp,
    }
  } catch (error) {
    console.error("[v0] Error fetching ISS location:", error)
    return null
  }
}
