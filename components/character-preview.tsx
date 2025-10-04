"use client"

import type { CharacterOptions } from "@/app/customize/page"

interface CharacterPreviewProps {
  character: CharacterOptions
}

export function CharacterPreview({ character }: CharacterPreviewProps) {
  const getSkinColor = () => {
    const colors = {
      light: "#FFE0BD",
      medium: "#D4A574",
      tan: "#C68642",
      dark: "#8D5524",
    }
    return colors[character.skinTone as keyof typeof colors]
  }

  const getHairColor = () => {
    const colors = {
      black: "#2C2C2C",
      brown: "#6F4E37",
      blonde: "#F4E4C1",
      red: "#A0522D",
      gray: "#9E9E9E",
    }
    return colors[character.hairColor as keyof typeof colors]
  }

  const getSuitColor = () => {
    const colors = {
      white: "#FFFFFF",
      orange: "#FF6B35",
      blue: "#4A90E2",
    }
    return colors[character.suitColor as keyof typeof colors]
  }

  const getVisorOpacity = () => {
    const opacities = {
      clear: 0.2,
      tinted: 0.5,
      gold: 0.7,
    }
    return opacities[character.helmetVisor as keyof typeof opacities]
  }

  return (
    <div className="relative w-64 h-80">
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Space Suit Body */}
        <ellipse cx="100" cy="200" rx="60" ry="80" fill={getSuitColor()} stroke="#333" strokeWidth="2" />

        {/* Suit Details */}
        <rect x="70" y="160" width="60" height="80" fill={getSuitColor()} stroke="#333" strokeWidth="2" rx="5" />

        {/* NASA Patch */}
        <circle cx="85" cy="180" r="8" fill="#0B3D91" />
        <text x="85" y="184" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">
          NASA
        </text>

        {/* Helmet */}
        <circle cx="100" cy="80" r="45" fill="rgba(200, 220, 255, 0.3)" stroke="#666" strokeWidth="3" />

        {/* Helmet Visor */}
        <ellipse
          cx="100"
          cy="80"
          rx="35"
          ry="30"
          fill={character.helmetVisor === "gold" ? "#FFD700" : "#4A90E2"}
          opacity={getVisorOpacity()}
          stroke="#333"
          strokeWidth="2"
        />

        {/* Face (visible through visor) */}
        <circle cx="100" cy="80" r="30" fill={getSkinColor()} />

        {/* Eyes */}
        <circle cx="90" cy="75" r="3" fill="#2C2C2C" />
        <circle cx="110" cy="75" r="3" fill="#2C2C2C" />

        {/* Smile */}
        <path d="M 90 88 Q 100 93 110 88" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Hair (if not bald) */}
        {character.hairStyle !== "bald" && (
          <>
            {character.hairStyle === "short" && (
              <path
                d="M 70 65 Q 100 50 130 65"
                fill={getHairColor()}
                stroke={getHairColor()}
                strokeWidth="8"
                strokeLinecap="round"
              />
            )}
            {character.hairStyle === "long" && (
              <>
                <path
                  d="M 65 70 Q 100 45 135 70"
                  fill={getHairColor()}
                  stroke={getHairColor()}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <ellipse cx="65" cy="85" rx="8" ry="15" fill={getHairColor()} />
                <ellipse cx="135" cy="85" rx="8" ry="15" fill={getHairColor()} />
              </>
            )}
            {character.hairStyle === "curly" && (
              <>
                <circle cx="75" cy="60" r="8" fill={getHairColor()} />
                <circle cx="90" cy="55" r="8" fill={getHairColor()} />
                <circle cx="105" cy="55" r="8" fill={getHairColor()} />
                <circle cx="120" cy="60" r="8" fill={getHairColor()} />
              </>
            )}
          </>
        )}

        {/* Arms */}
        <rect x="40" y="180" width="20" height="60" fill={getSuitColor()} stroke="#333" strokeWidth="2" rx="10" />
        <rect x="140" y="180" width="20" height="60" fill={getSuitColor()} stroke="#333" strokeWidth="2" rx="10" />

        {/* Gloves */}
        <circle cx="50" cy="245" r="12" fill="#E0E0E0" stroke="#333" strokeWidth="2" />
        <circle cx="150" cy="245" r="12" fill="#E0E0E0" stroke="#333" strokeWidth="2" />
      </svg>
    </div>
  )
}
