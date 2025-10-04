"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Sparkles, Play, ExternalLink } from "lucide-react"
import { searchNASAImages, type NASAImage } from "@/lib/nasa-api"

const FEATURED_QUERIES = [
  "Hubble telescope nebula",
  "Mars rover Perseverance",
  "James Webb telescope galaxy",
  "ISS spacewalk astronaut",
  "Saturn rings Cassini",
  "Jupiter Great Red Spot",
]

export function SpaceGallery() {
  const [images, setImages] = useState<NASAImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<NASAImage | null>(null)

  useEffect(() => {
    const fetchFeaturedImages = async () => {
      setLoading(true)
      const allImages: NASAImage[] = []

      for (const query of FEATURED_QUERIES) {
        const results = await searchNASAImages(query, 2)
        allImages.push(...results)
      }

      setImages(allImages.slice(0, 12))
      setLoading(false)
    }

    fetchFeaturedImages()
  }, [])

  if (loading) {
    return (
      <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="text-center py-12">
          <div className="relative inline-block">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-primary" />
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-primary/30" />
          </div>
          <p className="text-sm text-muted-foreground mt-6 animate-pulse">Loading NASA's Universe...</p>
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card className="p-8 bg-gradient-to-br from-card/80 via-primary/5 to-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold">Explore the Universe</h2>
        </div>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Discover stunning images and videos from NASA's missions exploring our solar system, distant galaxies, and the
          International Space Station.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-square rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-smooth group"
            >
              <Image
                src={image.href || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {image.media_type === "video" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-primary rounded-full p-4 group-hover:scale-125 transition-transform">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-sm font-semibold line-clamp-2 text-balance">{image.title}</p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <Card className="max-w-6xl w-full max-h-[95vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full bg-black">
              {selectedImage.media_type === "video" ? (
                <video src={selectedImage.href} controls autoPlay className="w-full h-full">
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={selectedImage.href || "/placeholder.svg"}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="p-8 space-y-4 bg-gradient-to-b from-card to-card/90">
              <h3 className="text-2xl font-bold text-balance">{selectedImage.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedImage.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{selectedImage.center}</span>
                  <span>{new Date(selectedImage.date_created).toLocaleDateString()}</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://images.nasa.gov/details/${selectedImage.nasa_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on NASA
                  </a>
                </Button>
              </div>
              <Button onClick={() => setSelectedImage(null)} className="w-full mt-4">
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
