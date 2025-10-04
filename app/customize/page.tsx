"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Sparkles, Rocket } from "lucide-react"
import { CharacterPreview } from "@/components/character-preview"
import { CharacterCustomizer } from "@/components/character-customizer"

export type CharacterOptions = {
  skinTone: string
  hairStyle: string
  hairColor: string
  suitColor: string
  helmetVisor: string
}

const defaultCharacter: CharacterOptions = {
  skinTone: "light",
  hairStyle: "short",
  hairColor: "brown",
  suitColor: "white",
  helmetVisor: "clear",
}

export default function CustomizePage() {
  const router = useRouter()
  const [character, setCharacter] = useState<CharacterOptions>(defaultCharacter)

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("astronautCharacter", JSON.stringify(character))
    }
    router.push("/cupola")
  }

  const updateCharacter = (key: keyof CharacterOptions, value: string) => {
    setCharacter((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="nebula" />
        <div className="starfield" />
      </div>

      <header className="border-b border-primary/20 backdrop-blur-xl bg-background/60 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="hover:bg-primary/10">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary animate-pulse-glow" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Customize Your Astronaut
              </h1>
            </div>
            <div className="w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border border-primary/40 rounded-full text-sm font-medium text-primary mb-4 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 animate-pulse-glow" />
              Character Creation
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-balance bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
              Create Your Space Explorer
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Customize your astronaut character before exploring the ISS Cupola and experiencing life in space
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 flex items-center justify-center bg-gradient-to-br from-card/80 via-card/60 to-primary/5 backdrop-blur-md border-primary/30 hover:border-primary/50 transition-smooth relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />
              <div className="relative z-10 astronaut-float">
                <CharacterPreview character={character} />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card/80 via-card/60 to-accent/5 backdrop-blur-md border-accent/30 hover:border-accent/50 transition-smooth">
              <CharacterCustomizer character={character} onUpdate={updateCharacter} />
            </Card>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <Button
              variant="outline"
              onClick={() => setCharacter(defaultCharacter)}
              className="px-6 bg-background/30 backdrop-blur-md hover:bg-background/50 border-2 border-primary/30 hover:border-primary/50 transition-bounce"
            >
              Reset to Default
            </Button>
            <Button
              size="lg"
              onClick={handleSave}
              className="px-10 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 transition-bounce group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center">
                Continue to Cupola
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
