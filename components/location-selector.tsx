"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Location {
  id: string
  name: string
  country: string
  coordinates: { lat: number; lng: number }
  description: string
  facts: string[]
  imageQuery: string
}

interface LocationSelectorProps {
  locations: Location[]
  selectedLocation: Location
  onSelectLocation: (location: Location) => void
}

export function LocationSelector({ locations, selectedLocation, onSelectLocation }: LocationSelectorProps) {
  return (
    <div className="space-y-2">
      {locations.map((location) => (
        <Button
          key={location.id}
          variant={selectedLocation.id === location.id ? "default" : "outline"}
          className={cn(
            "w-full justify-start text-left h-auto py-3",
            selectedLocation.id === location.id && "bg-primary text-primary-foreground",
          )}
          onClick={() => onSelectLocation(location)}
        >
          <div className="flex flex-col items-start gap-1">
            <span className="font-semibold">{location.name}</span>
            <span className="text-xs opacity-80">{location.country}</span>
          </div>
        </Button>
      ))}
    </div>
  )
}
