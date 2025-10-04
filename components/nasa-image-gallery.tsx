"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink, ImageIcon, Video, Play } from "lucide-react"
import { searchNASAImages, type NASAImage } from "@/lib/nasa-api"

interface NASAImageGalleryProps {
  query: string
}

export function NASAImageGallery({ query }: NASAImageGalleryProps) {
  const [images, setImages] = useState<NASAImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<NASAImage | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      const results = await searchNASAImages(query, 12)
      setImages(results)
      setLoading(false)
    }

    fetchImages()
  }, [query])

  if (loading) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">NASA Media Library</h3>
        </div>
        <div className="text-center py-8">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-primary mx-auto" />
            <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border border-primary/30 mx-auto" />
          </div>
          <p className="text-sm text-muted-foreground mt-4 animate-pulse">Loading NASA media...</p>
        </div>
      </Card>
    )
  }

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">NASA Media Library</h3>
          <span className="text-xs text-muted-foreground ml-auto">{images.length} items</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-smooth group"
            >
              <Image
                src={image.href || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {image.media_type === "video" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-primary/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-xs font-medium line-clamp-2 text-balance">{image.title}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="h-4 w-4 text-white drop-shadow-lg" />
              </div>
            </button>
          ))}
        </div>
      </Card>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <Card className="max-w-5xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full bg-black">
              {selectedImage.media_type === "video" ? (
                <video src={selectedImage.href} controls autoPlay className="w-full h-full" poster={selectedImage.href}>
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
            <div className="p-6 space-y-4 bg-gradient-to-b from-card to-card/80">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-balance flex-1">{selectedImage.title}</h3>
                {selectedImage.media_type === "video" && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/30">
                    <Video className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-primary">Video</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedImage.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="font-medium">{selectedImage.center}</span>
                  <span>{new Date(selectedImage.date_created).toLocaleDateString()}</span>
                </div>
                <span className="text-primary font-mono">NASA ID: {selectedImage.nasa_id}</span>
              </div>
              <Button onClick={() => setSelectedImage(null)} className="w-full">
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
