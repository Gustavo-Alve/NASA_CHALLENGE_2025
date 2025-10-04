"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Sparkles, Rocket } from "lucide-react"
import { BuoyancyGame } from "@/components/buoyancy-game"
import { TaskSimulator } from "@/components/task-simulator"

export default function NBLPage() {
  const [gameMode, setGameMode] = useState<"buoyancy" | "tasks" | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="nebula" />
        <div className="starfield" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-secondary/10" />
      </div>

      <header className="border-b border-secondary/20 backdrop-blur-xl bg-background/60 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="hover:bg-secondary/10">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-secondary animate-pulse-glow" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                NBL Training Simulator
              </h1>
            </div>
            {gameMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGameMode(null)}
                className="border-secondary/30 hover:border-secondary/50"
              >
                Change Mode
              </Button>
            )}
            {!gameMode && <div className="w-32" />}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {!gameMode ? (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary/20 via-accent/20 to-primary/20 border border-secondary/40 rounded-full text-sm font-medium text-secondary mb-4 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 animate-pulse-glow" />
                Astronaut Training
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text">
                Neutral Buoyancy Laboratory
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                Train like a real astronaut in NASA's 6.2 million gallon pool. Master buoyancy control and complete
                underwater missions that simulate spacewalks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card
                className="p-8 space-y-6 bg-gradient-to-br from-card/80 via-card/60 to-primary/5 backdrop-blur-md border-primary/30 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 transition-smooth hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
                onClick={() => setGameMode("buoyancy")}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center group-hover:from-primary/40 group-hover:to-primary/20 transition-smooth group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-primary/20">
                    <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-balance">Buoyancy Challenge</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Calculate your weight and adjust ballast to achieve neutral buoyancy. Learn the physics of floating
                    in water just like astronauts do.
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-primary text-lg group-hover/item:scale-125 transition-transform">⚖️</span>
                      <span>Input your weight and suit specifications</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-primary text-lg group-hover/item:scale-125 transition-transform">🎯</span>
                      <span>Add or remove weights to achieve neutral float</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-primary text-lg group-hover/item:scale-125 transition-transform">🔬</span>
                      <span>Learn about buoyancy physics</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-smooth">
                    Start Buoyancy Challenge
                  </Button>
                </div>
              </Card>

              <Card
                className="p-8 space-y-6 bg-gradient-to-br from-card/80 via-card/60 to-secondary/5 backdrop-blur-md border-secondary/30 hover:border-secondary/60 hover:shadow-2xl hover:shadow-secondary/20 transition-smooth hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
                onClick={() => setGameMode("tasks")}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center group-hover:from-secondary/40 group-hover:to-secondary/20 transition-smooth group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-secondary/20">
                    <svg className="h-7 w-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-balance">Mission Tasks</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Complete simulated spacewalk tasks underwater. Practice repairs, hatch operations, and lunar surface
                    exploration missions.
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-secondary text-lg group-hover/item:scale-125 transition-transform">🚪</span>
                      <span>Navigate through ISS modules</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-secondary text-lg group-hover/item:scale-125 transition-transform">🔧</span>
                      <span>Perform equipment repairs</span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="text-secondary text-lg group-hover/item:scale-125 transition-transform">🌙</span>
                      <span>Collect lunar samples</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 shadow-lg shadow-secondary/20 group-hover:shadow-xl group-hover:shadow-secondary/30 transition-smooth">
                    Start Mission Tasks
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 backdrop-blur-md border-secondary/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  About the NBL
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  The Neutral Buoyancy Laboratory at NASA's Johnson Space Center contains a 6.2 million gallon pool that
                  is 40 feet deep. Astronauts train in full spacesuits underwater because neutral buoyancy simulates the
                  weightlessness of space. For every hour of spacewalk, astronauts train for 7 hours in the NBL.
                </p>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-secondary/20">
                    <p className="text-3xl font-bold text-secondary mb-1">6.2M</p>
                    <p className="text-xs text-muted-foreground">Gallons</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-secondary/20">
                    <p className="text-3xl font-bold text-secondary mb-1">40ft</p>
                    <p className="text-xs text-muted-foreground">Deep</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-secondary/20">
                    <p className="text-3xl font-bold text-secondary mb-1">7:1</p>
                    <p className="text-xs text-muted-foreground">Training Ratio</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : gameMode === "buoyancy" ? (
          <BuoyancyGame />
        ) : (
          <TaskSimulator />
        )}
      </div>
    </div>
  )
}
