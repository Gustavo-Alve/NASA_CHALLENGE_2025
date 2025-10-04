"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Satellite } from "lucide-react"
import { getISSLocation, type ISSLocation } from "@/lib/nasa-api"

export function ISSTracker() {
  const [location, setLocation] = useState<ISSLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchLocation = async () => {
      const data = await getISSLocation()
      if (data) {
        setLocation(data)
        setError(false)
      } else {
        setError(true)
      }
      setLoading(false)
    }

    fetchLocation()
    const interval = setInterval(fetchLocation, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <Satellite className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Live ISS Position</h3>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto" />
        </div>
      ) : error ? (
        <p className="text-xs text-muted-foreground">Unable to fetch ISS location</p>
      ) : location ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Latitude</p>
              <p className="font-mono font-semibold">{location.latitude.toFixed(4)}°</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Longitude</p>
              <p className="font-mono font-semibold">{location.longitude.toFixed(4)}°</p>
            </div>
          </div>
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Altitude: {location.altitude.toFixed(2)} km • Speed: {location.velocity.toFixed(0)} km/h
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs text-muted-foreground">Live tracking active</p>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
