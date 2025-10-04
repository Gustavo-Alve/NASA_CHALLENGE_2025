"use server"

// Server-side NASA API functions that require authentication
// These functions use the NASA API key securely on the server

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY"

/**
 * Get NASA Astronomy Picture of the Day
 * Server Action - API key is kept secure on the server
 */
export async function getAPOD() {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)

    if (!response.ok) {
      throw new Error("Failed to fetch APOD")
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching APOD:", error)
    return null
  }
}

/**
 * Get Earth imagery from NASA EPIC API
 * Server Action - API key is kept secure on the server
 */
export async function getEarthImagery() {
  try {
    const response = await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`)

    if (!response.ok) {
      throw new Error("Failed to fetch Earth imagery")
    }

    const data = await response.json()

    if (!data || data.length === 0) {
      return null
    }

    // Get the most recent image
    const latest = data[0]
    const date = latest.date.split(" ")[0].replace(/-/g, "/")

    return {
      url: `https://api.nasa.gov/EPIC/archive/natural/${date.replace(/\//g, "/")}/png/${latest.image}.png?api_key=${NASA_API_KEY}`,
      caption: latest.caption,
      date: latest.date,
      coords: latest.centroid_coordinates,
    }
  } catch (error) {
    console.error("[v0] Error fetching Earth imagery:", error)
    return null
  }
}
