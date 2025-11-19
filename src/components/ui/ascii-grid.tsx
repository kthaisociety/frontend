"use client"

import { useEffect, useRef } from "react"

interface AsciiGridProps {
  className?: string
  color?: string
  cellSize?: number
  logoSrc?: string
}

export function AsciiGrid({ 
  className, 
  color = "#1954A6",
  cellSize = 16,
  logoSrc
}: AsciiGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0
    
    // Mask data
    let maskData: Uint8ClampedArray | null = null
    let maskWidth = 0
    let maskHeight = 0

    // Load logo if provided
    if (logoSrc) {
      const img = new Image()
      img.src = logoSrc
      img.onload = () => {
        const maskCanvas = document.createElement("canvas")
        // We want the mask to match the display size roughly, or be scaled
        // Let's make the mask canvas the same size as the main canvas for simplicity
        maskCanvas.width = canvas.width
        maskCanvas.height = canvas.height
        const maskCtx = maskCanvas.getContext("2d")
        if (maskCtx) {
          // Draw logo centered
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.6 // 60% of screen
          const w = img.width * scale
          const h = img.height * scale
          const x = (canvas.width - w) / 2
          const y = (canvas.height - h) / 2
          
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
        // Reload mask on resize if needed, but for now simple resize might clear it
        // Ideally we'd re-render the mask here.
        if (logoSrc) {
             const img = new Image()
             img.src = logoSrc
             img.onload = () => {
                const maskCanvas = document.createElement("canvas")
                maskCanvas.width = canvas.width
                maskCanvas.height = canvas.height
                const maskCtx = maskCanvas.getContext("2d")
                if (maskCtx) {
                  const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.6
                  const w = img.width * scale
                  const h = img.height * scale
                  const x = (canvas.width - w) / 2
                  const y = (canvas.height - h) / 2
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

    // Characters to use
    const chars = "01" 

    const render = () => {
      time += 0.01
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)
      
      ctx.font = `${cellSize}px monospace`
      ctx.fillStyle = color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const cols = Math.ceil(width / cellSize)
      const rows = Math.ceil(height / cellSize)

      for (let i = 0; i < rows; i += 1) {
        for (let j = 0; j < cols; j += 1) {
          const x = j * cellSize + cellSize / 2
          const y = i * cellSize + cellSize / 2
          
          // Check mask
          let inLogo = false
          if (maskData) {
             // Map grid coordinates to pixel coordinates
             const px = Math.floor(x * (canvas.width / canvas.clientWidth))
             const py = Math.floor(y * (canvas.height / canvas.clientHeight))
             if (px >= 0 && px < maskWidth && py >= 0 && py < maskHeight) {
                const index = (py * maskWidth + px) * 4
                // Check alpha or brightness. Since we draw on transparent, alpha is good.
                if (maskData[index + 3] > 50) {
                   inLogo = true
                }
             }
          }

          // Create a wave/pulse effect
          // Distance from center
          const cx = cols / 2
          const cy = rows / 2
          const dist = Math.sqrt(Math.pow(j - cx, 2) + Math.pow(i - cy, 2))
          
          // Pulse calculation
          const pulse = Math.sin(dist * 0.2 - time * 2) * 0.5 + 0.5
          
          // Opacity logic
          let opacity = 0
          
          if (inLogo) {
             // High opacity for logo, maybe pulsing slightly
             opacity = 0.8 + pulse * 0.2
          } else {
             // Background opacity
             opacity = pulse * 0.2
          }
          
          if (opacity > 0.05) {
            ctx.globalAlpha = opacity
            
            // Actually, let's keep characters stable
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
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, cellSize, logoSrc])

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
    />
  )
}
