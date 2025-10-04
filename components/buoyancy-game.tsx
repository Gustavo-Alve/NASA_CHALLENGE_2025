"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Plus, Minus, CheckCircle2 } from "lucide-react"

export function BuoyancyGame() {
  const [bodyWeight, setBodyWeight] = useState(70)
  const [addedWeights, setAddedWeights] = useState(0)
  const [floats, setFloats] = useState(0)
  const [isNeutral, setIsNeutral] = useState(false)

  const suitWeight = 130 // kg - typical EMU suit weight
  const totalWeight = bodyWeight + suitWeight + addedWeights - floats * 2

  // Neutral buoyancy is achieved when total weight is close to 0 (within 5kg)
  const checkBuoyancy = () => {
    const neutral = Math.abs(totalWeight) < 5
    setIsNeutral(neutral)
    return neutral
  }

  const getBuoyancyStatus = () => {
    if (totalWeight > 5) return { status: "Sinking", color: "text-destructive", bg: "bg-destructive/10" }
    if (totalWeight < -5) return { status: "Rising", color: "text-blue-500", bg: "bg-blue-500/10" }
    return { status: "Neutral", color: "text-green-500", bg: "bg-green-500/10" }
  }

  const status = getBuoyancyStatus()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-balance">Achieve Neutral Buoyancy</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Adjust weights and floats to achieve neutral buoyancy. In the NBL, astronauts must float perfectly still - not
          sinking or rising - to simulate the weightlessness of space.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="weight">Your Body Weight (kg)</Label>
              <div className="flex gap-2">
                <Input
                  id="weight"
                  type="number"
                  value={bodyWeight}
                  onChange={(e) => setBodyWeight(Number(e.target.value))}
                  min={40}
                  max={120}
                />
                <div className="flex flex-col gap-1">
                  <Button size="sm" variant="outline" onClick={() => setBodyWeight((w) => Math.min(120, w + 5))}>
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setBodyWeight((w) => Math.max(40, w - 5))}>
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">EMU Spacesuit Weight</p>
              <p className="text-2xl font-bold">{suitWeight} kg</p>
              <p className="text-xs text-muted-foreground mt-1">Standard Extravehicular Mobility Unit</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Lead Weights: {addedWeights} kg</Label>
                <Slider
                  value={[addedWeights]}
                  onValueChange={(value) => setAddedWeights(value[0])}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Add lead weights to increase sinking force</p>
              </div>

              <div className="space-y-2">
                <Label>Foam Floats: {floats} units</Label>
                <Slider
                  value={[floats]}
                  onValueChange={(value) => setFloats(value[0])}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Add foam floats to increase buoyancy (2kg each)</p>
              </div>
            </div>

            <Button onClick={checkBuoyancy} className="w-full" size="lg">
              Test Buoyancy
            </Button>
          </div>

          {/* Visualization Section */}
          <div className="space-y-4">
            <Card className={`p-6 ${status.bg} border-2`}>
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                <p className={`text-3xl font-bold ${status.color}`}>{status.status}</p>
                <p className="text-sm text-muted-foreground">Net Force: {totalWeight.toFixed(1)} kg</p>
              </div>
            </Card>

            {/* Pool Visualization */}
            <Card className="p-4 bg-gradient-to-b from-blue-500/10 to-blue-500/30 border-blue-500/20">
              <div className="relative h-64 bg-blue-500/20 rounded-lg overflow-hidden">
                {/* Water lines */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px bg-blue-500/20"
                      style={{ top: `${(i + 1) * 12.5}%` }}
                    />
                  ))}
                </div>

                {/* Astronaut */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out"
                  style={{
                    top: `${Math.max(10, Math.min(80, 50 + totalWeight * 2))}%`,
                  }}
                >
                  <div className="w-12 h-16 bg-white rounded-lg border-2 border-primary flex items-center justify-center">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="8" r="3" strokeWidth="2" />
                      <path d="M12 11v6m-3 0h6m-3-6l-3 3m6-3l-3 3" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Surface indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/50" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-900/50" />
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">40 feet deep NBL pool simulation</p>
            </Card>

            {isNeutral && (
              <Card className="p-4 bg-green-500/10 border-green-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-semibold text-green-500">Perfect Neutral Buoyancy!</p>
                    <p className="text-sm text-muted-foreground">
                      You're ready for spacewalk training. Astronauts spend hours perfecting this balance.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-3">Understanding Buoyancy</h3>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Neutral buoyancy</strong> occurs when an object's weight equals the buoyant force of the water,
            causing it to neither sink nor float.
          </p>
          <p>
            In the NBL, divers carefully adjust lead weights and foam floats on the spacesuit until the astronaut
            achieves perfect neutral buoyancy, simulating the weightlessness experienced during spacewalks.
          </p>
          <p>
            This training is crucial because in space, there's no up or down, and astronauts must learn to work
            efficiently in a three-dimensional environment without gravity.
          </p>
        </div>
      </Card>
    </div>
  )
}
