"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageCard } from "@/components/ui/image-card"

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
    <ImageCard
      image={event.image}
      alt={event.title}
      height="h-[400px]"
      blurHeight="40%"
      gradientColors={{
        from: "from-black/60",
        via: "via-black/20",
        to: "to-transparent",
      }}
    >
      <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg tracking-tight">
        {event.title}
      </h3>
      <p className="text-md  text-white/90 drop-shadow-md">{event.date}</p>
    </ImageCard>
  )
}

export function EventsPreview() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight"><span className="text-primary font-serif font-normal">(Upcoming)</span> Events</h2>
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

