"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AsciiGrid } from "@/components/ui/ascii-grid"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const childVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(8px)',
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0)',
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const buttonVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(8px)',
    y: 80,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0)',
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.4 },
  },
}

export function Hero() {
  return (
    <section className="relative min-h-screen pb-12 w-full flex items-end justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 h-[70vh]">
        <AsciiGrid 
          className="w-full h-full opacity-100" 
          color="#1954A6" 
          cellSize={10} 
          logoSrc="/kthais-logo.svg"
        />
        {/* White gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white via-white/50 to-transparent pointer-events-none" />
        {/* Radial gradient overlay around edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,white_100%)] pointer-events-none" />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 text-center flex flex-col items-center justify-end h-full pt-20">
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-4xl tracking-tighter bg-clip-text text-black"
            variants={childVariants}
          >
            AI Society
            <span className=" text-[#1954A6] font-serif ml-2">
              (KTH)
            </span>
          </motion.h2>

          <motion.h1
            className="text-2xl md:text-6xl text-black tracking-tight max-w-2xl mx-auto leading-tight"
            variants={childVariants}
          >
            Cultivating the next generation of AI leaders
          </motion.h1>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
            variants={buttonVariants}
          >
            <Button
              size="xl"
              asChild
            >
              <Link href="/events" className="flex items-center gap-1">
               Upcoming Events
              </Link>
            </Button>

            <Button
              variant="outline"
              size="xl"
              asChild
            >
              <Link href="mailto:business@kthais.com.">
                For Sponsors
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

