"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { Button } from "@/components/ui/button"

interface Event {
  id: string
  title: string
  date: string
  image: string
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "AI Workshop Series",
    date: "March 15, 2024",
    image: "/event-placeholder.jpg",
  },
  {
    id: "2",
    title: "Tech Talk: Machine Learning",
    date: "March 22, 2024",
    image: "/event-placeholder.jpg",
  },
  {
    id: "3",
    title: "Hackathon 2024",
    date: "April 5, 2024",
    image: "/event-placeholder.jpg",
  },
]

function EventCard({ event }: { event: Event }) {
  return (
    <Card className="group relative overflow-hidden h-[400px] cursor-pointer transition-transform">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Progressive Blur Overlay */}
      <ProgressiveBlur
        position="bottom"
        height="40%"
        className="absolute left-0 right-0 bottom-0"
      />

      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-[15]" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <div className="relative">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg tracking-tight">
            {event.title}
          </h3>
          <p className="text-md font-serif text-white/90 drop-shadow-md">{event.date}</p>
        </div>
      </div>
    </Card>
  )
}

export function EventsPreview() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight"><span className="text-[#1954A6] font-serif font-normal">(Upcoming)</span> Events</h2>
        <Button
          asChild
        >
          <Link href="/events">
            See more events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}

