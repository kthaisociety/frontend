"use client"

import { useEffect, useRef } from "react"

interface AsciiGridProps {
  className?: string
  color?: string
  cellSize?: number
  logoSrc?: string
  logoPosition?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
  logoScale?: number
  enableDripping?: boolean
}

export function AsciiGrid({ 
  className, 
  color = "#1954A6",
  cellSize = 16,
  logoSrc,
  logoPosition = "center",
  logoScale = 0.6,
  enableDripping = true
}: AsciiGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const startTime = Date.now()
    
    // Mouse tracking
    const mouse = { x: -1000, y: -1000 } // Start off-screen
    const mouseRadius = 40 // Smaller radius of mouse effect in pixels
    
    // Mask data
    let maskData: Uint8ClampedArray | null = null
    let maskWidth = 0
    let maskHeight = 0

    // Initial reveal animation - track which cells have appeared
    const revealMap = new Map<string, number>()
    const revealDuration = 2000 // 2 seconds for initial reveal
    
    // Dripping animation - track drip columns
    interface Drip {
      col: number
      startRow: number
      currentRow: number
      speed: number
      intensity: number
      lastUpdate: number
    }
    const drips: Drip[] = []
    
    // Initialize some drips
    const initDrips = (cols: number) => {
      if (!enableDripping) return
      const numDrips = Math.floor(cols / 16) // One drip every 16 columns (half as often)
      for (let i = 0; i < numDrips; i += 1) {
        drips.push({
          col: Math.floor(Math.random() * cols),
          startRow: -5,
          currentRow: -5,
          speed: 0.1 + Math.random() * 0.1, // Much slower: 0.1-0.2 rows per frame
          intensity: 0.6 + Math.random() * 0.4,
          lastUpdate: Date.now()
        })
      }
    }

    // Load logo if provided
    if (logoSrc) {
      const img = new Image()
      img.src = logoSrc
      img.onload = () => {
        const maskCanvas = document.createElement("canvas")
        maskCanvas.width = canvas.width
        maskCanvas.height = canvas.height
        const maskCtx = maskCanvas.getContext("2d")
        if (maskCtx) {
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * logoScale
          const w = img.width * scale
          const h = img.height * scale
          
          // Calculate position based on logoPosition prop
          let x: number, y: number
          switch (logoPosition) {
            case "top-left":
              x = canvas.width * 0.05
              y = canvas.height * 0.05
              break
            case "top-right":
              x = canvas.width - w - canvas.width * 0.05
              y = canvas.height * 0.05
              break
            case "bottom-left":
              x = canvas.width * 0.05
              y = canvas.height - h - canvas.height * 0.05
              break
            case "bottom-right":
              x = canvas.width - w - canvas.width * 0.05
              y = canvas.height - h - canvas.height * 0.05
              break
            case "center":
            default:
              x = (canvas.width - w) / 2
              y = (canvas.height - h) / 2
              break
          }
          
          maskCtx.drawImage(img, x, y, w, h)
          maskData = maskCtx.getImageData(0, 0, canvas.width, canvas.height).data
          maskWidth = canvas.width
          maskHeight = canvas.height
        }
      }
    }

    // Resize handler
    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        const dpr = window.devicePixelRatio || 1
        canvas.width = parent.clientWidth * dpr
        canvas.height = parent.clientHeight * dpr
        ctx.scale(dpr, dpr)
        
        // Reinitialize drips on resize
        drips.length = 0
        const cols = Math.ceil(canvas.clientWidth / cellSize)
        initDrips(cols)
        
        if (logoSrc) {
             const img = new Image()
             img.src = logoSrc
             img.onload = () => {
                const maskCanvas = document.createElement("canvas")
                maskCanvas.width = canvas.width
                maskCanvas.height = canvas.height
                const maskCtx = maskCanvas.getContext("2d")
                if (maskCtx) {
                  const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * logoScale
                  const w = img.width * scale
                  const h = img.height * scale
                  
                  // Calculate position based on logoPosition prop
                  let x: number, y: number
                  switch (logoPosition) {
                    case "top-left":
                      x = canvas.width * 0.05
                      y = canvas.height * 0.05
                      break
                    case "top-right":
                      x = canvas.width - w - canvas.width * 0.05
                      y = canvas.height * 0.05
                      break
                    case "bottom-left":
                      x = canvas.width * 0.05
                      y = canvas.height - h - canvas.height * 0.05
                      break
                    case "bottom-right":
                      x = canvas.width - w - canvas.width * 0.05
                      y = canvas.height - h - canvas.height * 0.05
                      break
                    case "center":
                    default:
                      x = (canvas.width - w) / 2
                      y = (canvas.height - h) / 2
                      break
                  }
                  
                  maskCtx.drawImage(img, x, y, w, h)
                  maskData = maskCtx.getImageData(0, 0, canvas.width, canvas.height).data
                  maskWidth = canvas.width
                  maskHeight = canvas.height
                }
             }
        }
      }
    }

    window.addEventListener("resize", resize)
    resize()
    
    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Characters to use - full digits
    const chars = "0123456789" 

    const render = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const isRevealing = elapsed < revealDuration
      
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)
      
      ctx.font = `${cellSize}px monospace`
      ctx.fillStyle = color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const cols = Math.ceil(width / cellSize)
      const rows = Math.ceil(height / cellSize)

      // Update drips
      if (enableDripping) {
        drips.forEach(drip => {
          drip.currentRow += drip.speed
          
          // Reset drip when it goes off screen
          if (drip.currentRow > rows + 5) {
            drip.col = Math.floor(Math.random() * cols)
            drip.currentRow = -5
            drip.speed = 0.1 + Math.random() * 0.1 // Match slower speed
            drip.intensity = 0.6 + Math.random() * 0.4
          }
        })
      }

      for (let i = 0; i < rows; i += 1) {
        for (let j = 0; j < cols; j += 1) {
          const x = j * cellSize + cellSize / 2
          const y = i * cellSize + cellSize / 2
          
          // Check mask
          let inLogo = false
          if (maskData) {
             const px = Math.floor(x * (canvas.width / canvas.clientWidth))
             const py = Math.floor(y * (canvas.height / canvas.clientHeight))
             if (px >= 0 && px < maskWidth && py >= 0 && py < maskHeight) {
                const index = (py * maskWidth + px) * 4
                if (maskData[index + 3] > 50) {
                   inLogo = true
                }
             }
          }

          // Base opacity
          let opacity = inLogo ? 0.7 : 0.15
          
          // Check if this cell is part of a drip
          if (enableDripping) {
            for (const drip of drips) {
              if (drip.col === j) {
                const distanceFromDrip = i - drip.currentRow
                // Create a trail effect
                if (distanceFromDrip >= -2 && distanceFromDrip <= 8) {
                  // Brightest at the drip head, fading behind
                  const dripOpacity = distanceFromDrip <= 0 
                    ? drip.intensity 
                    : drip.intensity * Math.max(0, 1 - distanceFromDrip / 8)
                  opacity = Math.max(opacity, dripOpacity)
                }
              }
            }
          }
          
          // Mouse proximity effect - random scattered lighting, more centered
          const dx = x - mouse.x
          const dy = y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < mouseRadius) {
            // Use cell position to generate a stable random value for this cell
            const cellRandom = Math.abs(Math.sin(i * 7.919 + j * 13.371))
            
            // Higher chance to light up, more centered
            const proximityFactor = 1 - (distance / mouseRadius)
            const lightUpChance = 0.5 + proximityFactor * 0.4 // 50-90% chance based on distance
            
            if (cellRandom < lightUpChance) {
              // Less random intensity variation
              const intensityRandom = Math.abs(Math.sin(i * 3.141 + j * 2.718))
              const mouseOpacity = 0.6 + intensityRandom * 0.4 // Range from 0.6 to 1.0
              opacity = Math.max(opacity, mouseOpacity)
            }
          }
          
          // Initial reveal animation
          let revealOpacity = 1
          if (isRevealing) {
            const cellKey = `${i}-${j}`
            if (!revealMap.has(cellKey)) {
              // Randomly assign a reveal time for this cell
              const revealTime = Math.random() * revealDuration * 0.8 // Most appear in first 80%
              revealMap.set(cellKey, revealTime)
            }
            const cellRevealTime = revealMap.get(cellKey)!
            if (elapsed < cellRevealTime) {
              revealOpacity = 0
            } else {
              // Quick fade in over 200ms
              const fadeProgress = Math.min(1, (elapsed - cellRevealTime) / 200)
              revealOpacity = fadeProgress
            }
          }
          
          opacity *= revealOpacity
          
          if (opacity > 0.05) {
            ctx.globalAlpha = opacity
            
            // Stable random character selection
            const stableRandom = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453
            const char = chars[Math.floor(Math.abs(stableRandom)) % chars.length]
            
            ctx.fillText(char, x, y)
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, cellSize, logoSrc, logoPosition, logoScale, enableDripping])

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
    />
  )
}
