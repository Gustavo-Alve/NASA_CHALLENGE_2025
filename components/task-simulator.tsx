"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, ArrowRight } from "lucide-react"

type Task = {
  id: string
  title: string
  description: string
  steps: string[]
  difficulty: "easy" | "medium" | "hard"
}

const missions: Task[] = [
  {
    id: "hatch",
    title: "Airlock Hatch Operation",
    description: "Practice entering and exiting the ISS airlock, a critical skill for spacewalks.",
    steps: [
      "Check suit pressure and oxygen levels",
      "Open inner hatch using manual controls",
      "Enter airlock chamber carefully",
      "Close inner hatch and verify seal",
      "Depressurize airlock chamber",
      "Open outer hatch to begin EVA",
    ],
    difficulty: "easy",
  },
  {
    id: "repair",
    title: "Solar Panel Repair",
    description: "Simulate repairing a damaged solar panel on the ISS exterior.",
    steps: [
      "Navigate to solar panel location",
      "Secure safety tether to handrails",
      "Inspect damaged panel section",
      "Remove damaged components",
      "Install replacement parts",
      "Test panel functionality",
      "Return to airlock safely",
    ],
    difficulty: "medium",
  },
  {
    id: "lunar",
    title: "Lunar Sample Collection",
    description: "Practice collecting rock samples on a simulated lunar surface at the pool bottom.",
    steps: [
      "Descend to pool floor (lunar surface)",
      "Adjust buoyancy for lunar gravity simulation",
      "Identify target rock samples",
      "Use collection tools to gather samples",
      "Store samples in collection bag",
      "Document sample locations",
      "Ascend back to surface",
    ],
    difficulty: "hard",
  },
]

export function TaskSimulator() {
  const [selectedMission, setSelectedMission] = useState<Task | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [missionComplete, setMissionComplete] = useState(false)

  const handleStepComplete = () => {
    if (selectedMission) {
      const newCompleted = [...completedSteps, currentStep]
      setCompletedSteps(newCompleted)

      if (currentStep < selectedMission.steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setMissionComplete(true)
      }
    }
  }

  const resetMission = () => {
    setSelectedMission(null)
    setCurrentStep(0)
    setCompletedSteps([])
    setMissionComplete(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500 bg-green-500/10"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10"
      case "hard":
        return "text-red-500 bg-red-500/10"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  if (!selectedMission) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-balance">Select Your Mission</h2>
          <p className="text-muted-foreground text-pretty">
            Choose a training mission to practice essential spacewalk skills
          </p>
        </div>

        <div className="grid gap-6">
          {missions.map((mission) => (
            <Card
              key={mission.id}
              className="p-6 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => setSelectedMission(mission)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-balance">{mission.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors ml-4" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Circle className="h-4 w-4" />
                <span>{mission.steps.length} steps</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-balance">{selectedMission.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{selectedMission.description}</p>
          </div>
          <Button variant="outline" onClick={resetMission}>
            Change Mission
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">
                {completedSteps.length} / {selectedMission.steps.length} steps
              </span>
            </div>
            <Progress value={(completedSteps.length / selectedMission.steps.length) * 100} className="h-2" />
          </div>

          {!missionComplete ? (
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {currentStep + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Current Step</h3>
                    <p className="text-lg leading-relaxed">{selectedMission.steps[currentStep]}</p>
                  </div>
                </div>
                <Button onClick={handleStepComplete} className="w-full" size="lg">
                  Complete Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 bg-green-500/10 border-green-500/20">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="h-12 w-12 text-green-500 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-500 mb-2">Mission Complete!</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Excellent work! You've successfully completed the {selectedMission.title} training mission.
                    Astronauts repeat these tasks hundreds of times to build muscle memory.
                  </p>
                </div>
              </div>
              <Button onClick={resetMission} className="w-full mt-4">
                Try Another Mission
              </Button>
            </Card>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold text-sm">All Steps</h3>
            <div className="space-y-2">
              {selectedMission.steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    completedSteps.includes(index)
                      ? "bg-green-500/10 border-green-500/20"
                      : index === currentStep
                        ? "bg-primary/10 border-primary/20"
                        : "bg-muted/50 border-border"
                  }`}
                >
                  {completedSteps.includes(index) ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                  <span className={completedSteps.includes(index) ? "text-green-500" : ""}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-3">Training Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              In the real NBL, safety divers assist astronauts throughout training to ensure their safety and help with
              equipment.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              Each training session can last 6-7 hours, and astronauts must maintain focus despite the physical demands
              of working in a spacesuit underwater.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              The NBL contains full-scale mockups of ISS modules and equipment, allowing astronauts to practice exact
              procedures they'll perform in space.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
