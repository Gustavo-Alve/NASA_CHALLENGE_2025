"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import type { CharacterOptions } from "@/app/customize/page"
import { CharacterPreview } from "@/components/character-preview"

interface Location {
  id: string
  name: string
  country: string
  coordinates: { lat: number; lng: number }
  description: string
  facts: string[]
  imageQuery: string
}

interface CupolaViewerProps {
  location: Location
}

export function CupolaViewer({ location }: CupolaViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [character, setCharacter] = useState<CharacterOptions | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("astronautCharacter")
      if (saved) {
        setCharacter(JSON.parse(saved))
      }
    }

    return () => clearTimeout(timer)
  }, [location.id])

  return (
    <Card className="relative overflow-hidden bg-black border-2 border-primary/30 shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-smooth">
      {/* Cupola Frame */}
      <div className="relative aspect-[16/10] w-full">
        {/* Window Frame Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Outer frame with glow */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect
              x="20"
              y="20"
              width="760"
              height="460"
              fill="none"
              stroke="rgba(99, 102, 241, 0.5)"
              strokeWidth="8"
              rx="20"
              filter="url(#glow)"
            />

            {/* Window panes - creating the cupola grid */}
            <line x1="400" y1="20" x2="400" y2="480" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="4" />
            <line x1="20" y1="250" x2="780" y2="250" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="4" />

            {/* Corner details with glow */}
            <circle cx="50" cy="50" r="8" fill="rgba(99, 102, 241, 0.6)" filter="url(#glow)" />
            <circle cx="750" cy="50" r="8" fill="rgba(99, 102, 241, 0.6)" filter="url(#glow)" />
            <circle cx="50" cy="450" r="8" fill="rgba(99, 102, 241, 0.6)" filter="url(#glow)" />
            <circle cx="750" cy="450" r="8" fill="rgba(99, 102, 241, 0.6)" filter="url(#glow)" />
          </svg>
        </div>

        {/* Earth View */}
        <div className="absolute inset-0 z-10">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-primary/10 to-black">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-primary mx-auto" />
                  <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-primary/30 mx-auto" />
                </div>
                <p className="text-sm text-primary font-medium animate-pulse">Loading Earth view...</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full animate-in fade-in duration-700">
              <Image
                src={`/.jpg?height=800&width=1280&query=${encodeURIComponent(location.imageQuery)}`}
                alt={`View of ${location.name} from ISS`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            </div>
          )}
        </div>

        <div className="absolute bottom-6 left-6 z-30 bg-black/90 backdrop-blur-md px-5 py-3 rounded-xl border border-primary/50 shadow-lg shadow-primary/20 animate-in slide-in-from-bottom-4 duration-500">
          <p className="text-sm font-semibold text-white">{location.name}</p>
          <p className="text-xs text-white/70 font-mono">
            {location.coordinates.lat.toFixed(2)}°, {location.coordinates.lng.toFixed(2)}°
          </p>
        </div>

        <div className="absolute top-6 right-6 z-30 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/60 shadow-lg shadow-primary/30 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <p className="text-xs font-mono text-primary font-semibold">ISS CUPOLA</p>
          </div>
        </div>

        {character && (
          <div className="absolute bottom-20 right-6 z-30 scale-75 opacity-90 animate-in slide-in-from-right-4 duration-700 hover:scale-90 transition-smooth">
            <CharacterPreview character={character} />
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-card via-primary/5 to-card border-t border-primary/30 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Altitude: 408 km
          </span>
          <span>Orbital Velocity: 7.66 km/s</span>
          <span>View Angle: Nadir</span>
        </div>
      </div>
    </Card>
  )
}
