"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface LogoProps {
  className?: string
  animated?: boolean
}

export function Logo({ className = "", animated = false }: LogoProps) {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (animated) {
      setIsAnimated(true)
    }
  }, [animated])

  return (
    <div
      className={`relative overflow-hidden ${className} ${
        animated ? "transition-all duration-700 ease-in-out" : ""
      } ${isAnimated ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
    >
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3ce57013-ebbb-440b-b328-2d7b97cc5690.jfif-jiNZkx8yToUBqPSzVeZs6znIcLBCvy.jpeg"
        alt="PayGo Logo"
        width={500}
        height={167}
        className={`w-full ${
          animated ? "transition-transform duration-500 ease-in-out" : ""
        } ${isAnimated ? "hover:scale-105" : ""}`}
        onLoad={() => setIsAnimated(true)}
      />
      {animated && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 to-orange-500/20 transition-opacity duration-1000 ${
            isAnimated ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </div>
  )
}
