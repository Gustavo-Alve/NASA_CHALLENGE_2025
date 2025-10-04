"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapPin, Info } from "lucide-react"
import { CupolaViewer } from "@/components/cupola-viewer"
import { ISSTracker } from "@/components/iss-tracker"
import { NASAImageGallery } from "@/components/nasa-image-gallery"

type Location = {
  id: string
  name: string
  country: string
  coordinates: { lat: number; lng: number }
  description: string
  facts: string[]
  imageQuery: string
}

const locations: Location[] = [
  {
    id: "amazon",
    name: "Amazon Rainforest",
    country: "Brazil",
    coordinates: { lat: -3.4653, lng: -62.2159 },
    description:
      "The world's largest tropical rainforest, visible from space as a vast green expanse. Astronauts observe deforestation patterns and seasonal changes.",
    facts: [
      "Produces 20% of Earth's oxygen",
      "Home to 10% of all species on Earth",
      "Deforestation visible from ISS orbit",
    ],
    imageQuery: "Amazon rainforest from space ISS Earth observation",
  },
  {
    id: "sahara",
    name: "Sahara Desert",
    country: "Africa",
    coordinates: { lat: 23.8859, lng: 8.5217 },
    description:
      "The world's largest hot desert, appearing as golden sand dunes from orbit. Dust storms from the Sahara can be tracked across the Atlantic.",
    facts: [
      "Covers 9 million square kilometers",
      "Dust feeds Amazon rainforest nutrients",
      "Temperature extremes visible via thermal imaging",
    ],
    imageQuery: "Sahara desert from space ISS sand dunes Earth",
  },
  {
    id: "himalayas",
    name: "Himalayan Mountains",
    country: "Asia",
    coordinates: { lat: 28.5983, lng: 83.9956 },
    description:
      "The highest mountain range on Earth, with snow-capped peaks clearly visible from the ISS. Mount Everest stands out among the dramatic terrain.",
    facts: [
      "Contains 9 of the 10 highest peaks on Earth",
      "Glaciers provide water to 2 billion people",
      "Visible atmospheric effects at high altitude",
    ],
    imageQuery: "Himalayan mountains from space ISS Mount Everest snow peaks",
  },
  {
    id: "great-barrier-reef",
    name: "Great Barrier Reef",
    country: "Australia",
    coordinates: { lat: -18.2871, lng: 147.6992 },
    description:
      "The world's largest coral reef system, visible from space as turquoise waters. Astronauts monitor coral bleaching and ocean health.",
    facts: [
      "Largest living structure on Earth",
      "Visible from space without magnification",
      "Home to 1,500 species of fish",
    ],
    imageQuery: "Great Barrier Reef from space ISS coral reef ocean",
  },
  {
    id: "aurora",
    name: "Aurora Borealis",
    country: "Arctic Circle",
    coordinates: { lat: 64.8378, lng: -147.7164 },
    description:
      "The Northern Lights as seen from above, a spectacular display of Earth's magnetic field interacting with solar wind.",
    facts: ["Caused by solar wind particles", "Occurs at 100-300 km altitude", "ISS orbits through aurora at 408 km"],
    imageQuery: "Aurora Borealis from space ISS Northern Lights Earth atmosphere",
  },
  {
    id: "nile-delta",
    name: "Nile River Delta",
    country: "Egypt",
    coordinates: { lat: 31.0, lng: 31.2 },
    description:
      "The Nile Delta at night, illuminated by city lights, shows human civilization's impact on Earth's geography.",
    facts: [
      "Longest river in the world",
      "Supports 95% of Egypt's population",
      "Night lights reveal population density",
    ],
    imageQuery: "Nile River Delta from space ISS Egypt night lights",
  },
]

export default function CupolaPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0])
  const [showInfo, setShowInfo] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background relative">
      <div className="starfield opacity-30" />

      <header className="border-b border-border/50 backdrop-blur-md bg-background/90 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="hover:bg-primary/10 transition-smooth" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              ISS Cupola Experience
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowInfo(!showInfo)}
              className="hover:bg-primary/10 transition-smooth"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Viewer */}
          <div className="lg:col-span-2 space-y-6">
            <CupolaViewer location={selectedLocation} />

            {showInfo && (
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold mb-3 text-balance">{selectedLocation.name}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{selectedLocation.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary">Key Facts:</h4>
                  <ul className="space-y-2">
                    {selectedLocation.facts.map((fact, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-3 group/fact hover:text-foreground transition-smooth"
                      >
                        <span className="text-primary mt-1 text-lg group-hover/fact:scale-125 transition-transform">
                          •
                        </span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}

            <NASAImageGallery query={selectedLocation.imageQuery} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ISSTracker />

            {/* Location Selector */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                <MapPin className="h-4 w-4" />
                Select Location
              </h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full text-left p-3 rounded-lg border transition-smooth ${
                      selectedLocation.id === location.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]"
                        : "border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01]"
                    }`}
                  >
                    <p className="font-medium text-sm">{location.name}</p>
                    <p className="text-xs text-muted-foreground">{location.country}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Educational Info */}
            <Card className="p-4 bg-gradient-to-br from-muted/50 to-primary/5 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-2 text-sm text-primary">About Earth Observations</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Astronauts on the ISS conduct Earth observations to study climate change, natural disasters, and human
                impact on the environment. The Cupola provides a 360-degree view of Earth.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
