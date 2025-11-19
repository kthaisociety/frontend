"use client"

import { useEffect, useRef } from "react"

interface AsciiGlobeProps {
  className?: string
  size?: number
  fontSize?: number
  color?: string
}

export function AsciiGlobe({ 
  className, 
  size = 600, 
  fontSize = 12,
  color = "#1954A6" 
}: AsciiGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let angle = 0

    const width = size
    const height = size
    canvas.width = width
    canvas.height = height

    // Globe parameters
    const radius = size * 0.35
    const rows = 30
    const cols = 60
    
    const chars = " .:-=+*#%@" // Density characters

    const render = () => {
      // Clear background
      ctx.clearRect(0, 0, width, height)
      
      // Optional: Draw a subtle grid or background
      
      ctx.font = `${fontSize}px monospace`
      ctx.fillStyle = color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const centerX = width / 2
      const centerY = height / 2

      // Rotate the globe
      angle += 0.005

      for (let i = 0; i < rows; i++) {
        // Latitude (phi) from -PI/2 to PI/2
        const phi = Math.PI * (i / rows - 0.5)
        const cosPhi = Math.cos(phi)
        const sinPhi = Math.sin(phi)

        for (let j = 0; j < cols; j++) {
          // Longitude (theta) from 0 to 2*PI
          const theta = 2 * Math.PI * (j / cols) + angle
          
          // 3D coordinates on unit sphere
          const x = Math.cos(theta) * cosPhi
          const y = sinPhi
          const z = Math.sin(theta) * cosPhi

          // Project to 2D (simple orthographic + Z-scaling for depth effect)
          // Only draw if on the front side of the sphere (z > 0) or draw everything for transparency?
          // Let's draw everything but fade the back
          
          // Perspective projection
          const scale = 1 / (2 - z) // Simple perspective
          const projX = centerX + x * radius 
          const projY = centerY + y * radius 

          // Calculate character based on z-depth or lighting
          // Lighting source from (1, -1, 1)
          // Normal vector is just (x, y, z)
          
          // Let's just use z for brightness/character selection
          // z goes from -1 (back) to 1 (front)
          
          const brightness = Math.max(0, z + 0.2) // -0.8 to 1.2
          const charIndex = Math.floor((brightness / 1.2) * (chars.length - 1))
          const char = chars[Math.max(0, Math.min(chars.length - 1, charIndex))]
          
          const alpha = (z + 1) / 2 // 0 to 1 opacity
          
          ctx.globalAlpha = alpha * 0.8 + 0.2
          
          // Only draw "dense" points or random noise to look like the reference?
          // The reference shows a techy map.
          // Let's just stick to the ASCII sphere for now, it looks techy.
          
          if (z > -0.5) { // Don't draw the very back
            ctx.fillText(char, projX, projY)
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [size, fontSize, color])

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ width: size, height: size }}
    />
  )
}


