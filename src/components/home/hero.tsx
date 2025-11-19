"use client"

import Link from "next/link"
import { AsciiGrid } from "@/components/ui/ascii-grid"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative h-[75vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <AsciiGrid 
          className="w-full h-full opacity-100" 
          color="#1954A6" 
          cellSize={12} 
          logoSrc="/kthais-logo.svg"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 text-center hidden flex-col items-center justify-center h-full pt-20">
        
        <div className="space-y-8 max-w-4xl mx-auto backdrop-blur-sm p-8 rounded-3xl border border-white/5 bg-black/20">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              AI Society
              <span className="block text-2xl md:text-4xl font-light tracking-widest text-[#1954A6] mt-2">
                (KTH)
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Cultivating the next generation of AI leaders
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button 
              size="lg" 
              className="bg-[#1954A6] hover:bg-[#154589] text-white rounded-full px-10 h-14 text-lg shadow-[0_0_30px_-10px_rgba(25,84,166,0.5)] transition-all hover:scale-105" 
              asChild
            >
              <Link href="/auth/signup">
                Join the Society
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full px-10 h-14 text-lg backdrop-blur-md transition-all hover:scale-105" 
              asChild
            >
              <Link href="#about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

