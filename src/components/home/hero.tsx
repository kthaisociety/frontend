"use client"

import Link from "next/link"
import { AsciiGrid } from "@/components/ui/ascii-grid"
import { Button } from "@/components/ui/button"
import { TextScramble } from "@/components/ui/text-scramble"

export function Hero() {
  return (
    <section className="relative min-h-screen pb-12 w-full overflow-hidden flex items-end justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 h-[70vh]">
        <AsciiGrid 
          className="w-full h-full opacity-100" 
          color="#1954A6" 
          cellSize={10} 
          logoSrc="/kthais-logo.svg"
        />
        {/* White gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
        {/* Radial gradient overlay around edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,white_100%)] pointer-events-none" />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 text-center flex flex-col items-center justify-end h-full pt-20">

          <div className="space-y-4">
            <h2 className="text-4xl tracking-tighter bg-clip-text text-black">
              <TextScramble className="font-sans" duration={1000} speed={40}>
                AI Society
              </TextScramble>
              <span className=" text-[#1954A6] font-serif ml-2">
                (KTH)
              </span>
            </h2>

          <h1  className="text-2xl md:text-6xl text-black tracking-tight max-w-2xl mx-auto leading-relaxed">
              Cultivating the next generation of AI leaders
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button
              size="lg"
              className="bg-[#1954A6] hover:bg-[#154589] text-white rounded-full px-10 h-14 text-lg shadow-[0_0_30px_-10px_rgba(25,84,166,0.5)] transition-all hover:scale-105"
              asChild
            >
              <Link href="/auth/signup" className="flex items-center gap-1">
                <span className="font-serif text-[120%] mb-1">2</span> Upcoming Events
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-10 h-14 text-lg backdrop-blur-md transition-all hover:scale-105"
              asChild
            >
              <Link href="#about">
                For Sponsors
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

