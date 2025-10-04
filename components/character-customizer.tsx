"use client"

import { Label } from "@/components/ui/label"
import type { CharacterOptions } from "@/app/customize/page"

interface CharacterCustomizerProps {
  character: CharacterOptions
  onUpdate: (key: keyof CharacterOptions, value: string) => void
}

const options = {
  skinTone: [
    { value: "light", label: "Light", color: "#FFE0BD" },
    { value: "medium", label: "Medium", color: "#D4A574" },
    { value: "tan", label: "Tan", color: "#C68642" },
    { value: "dark", label: "Dark", color: "#8D5524" },
  ],
  hairStyle: [
    { value: "short", label: "Short" },
    { value: "long", label: "Long" },
    { value: "curly", label: "Curly" },
    { value: "bald", label: "Bald" },
  ],
  hairColor: [
    { value: "black", label: "Black", color: "#2C2C2C" },
    { value: "brown", label: "Brown", color: "#6F4E37" },
    { value: "blonde", label: "Blonde", color: "#F4E4C1" },
    { value: "red", label: "Red", color: "#A0522D" },
    { value: "gray", label: "Gray", color: "#9E9E9E" },
  ],
  suitColor: [
    { value: "white", label: "White", color: "#FFFFFF" },
    { value: "orange", label: "Orange", color: "#FF6B35" },
    { value: "blue", label: "Blue", color: "#4A90E2" },
  ],
  helmetVisor: [
    { value: "clear", label: "Clear" },
    { value: "tinted", label: "Tinted" },
    { value: "gold", label: "Gold" },
  ],
}

export function CharacterCustomizer({ character, onUpdate }: CharacterCustomizerProps) {
  return (
    <div className="space-y-6">
      {/* Skin Tone */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Skin Tone</Label>
        <div className="grid grid-cols-4 gap-2">
          {options.skinTone.map((option) => (
            <button
              key={option.value}
              onClick={() => onUpdate("skinTone", option.value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                character.skinTone === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div
                className="w-10 h-10 rounded-full border-2 border-border"
                style={{ backgroundColor: option.color }}
              />
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hair Style */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Hair Style</Label>
        <div className="grid grid-cols-2 gap-2">
          {options.hairStyle.map((option) => (
            <button
              key={option.value}
              onClick={() => onUpdate("hairStyle", option.value)}
              className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                character.hairStyle === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hair Color */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Hair Color</Label>
        <div className="grid grid-cols-5 gap-2">
          {options.hairColor.map((option) => (
            <button
              key={option.value}
              onClick={() => onUpdate("hairColor", option.value)}
              className={`flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all ${
                character.hairColor === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="w-8 h-8 rounded-full border-2 border-border" style={{ backgroundColor: option.color }} />
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suit Color */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Space Suit Color</Label>
        <div className="grid grid-cols-3 gap-2">
          {options.suitColor.map((option) => (
            <button
              key={option.value}
              onClick={() => onUpdate("suitColor", option.value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                character.suitColor === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="w-10 h-10 rounded-lg border-2 border-border" style={{ backgroundColor: option.color }} />
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Helmet Visor */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Helmet Visor</Label>
        <div className="grid grid-cols-3 gap-2">
          {options.helmetVisor.map((option) => (
            <button
              key={option.value}
              onClick={() => onUpdate("helmetVisor", option.value)}
              className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                character.helmetVisor === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
