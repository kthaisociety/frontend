"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, ExternalLink, ArrowLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AsciiGrid } from "@/components/ui/ascii-grid"
import { useEvent } from "@/hooks/events"
import type { LumaEventDetail } from "@/app/api/events/[id]/route"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  
  const [eventTextMask, setEventTextMask] = useState<string | undefined>(undefined)
  const { data: event, isLoading: loading, error: queryError } = useEvent(eventId)

  useEffect(() => {
    // Create a canvas-based text mask for event name
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 400
    const ctx = canvas.getContext("2d")
    
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "white"
    ctx.font = "bold 200px system-ui, -apple-system, sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    
    const text = event?.name || "EVENT"
    ctx.fillText(text, 50, 50)
    
    const dataUrl = canvas.toDataURL("image/png")
    setEventTextMask(dataUrl)
  }, [event?.name])

  const error = queryError instanceof Error ? queryError.message : queryError ? String(queryError) : null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-secondary-gray">Loading event...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-500">Error: {error}</p>
        <Button asChild variant="outline">
          <Link href="/events">Back to Events</Link>
        </Button>
      </div>
    )
  }

  if (!event && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-secondary-gray">Event not found</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-secondary-gray">Loading event...</p>
      </div>
    )
  }

  const startDate = event.start_at ? new Date(event.start_at) : null
  const endDate = event.end_at ? new Date(event.end_at) : null
  const isPast = startDate ? startDate < new Date() : false

  return (
    <div className="min-h-screen">
      {/* Dark Blue Header Section */}
      <section className="relative bg-white text-secondary-black pt-64 pb-24 overflow-hidden">
        {/* Ascii Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <AsciiGrid 
            color="rgba(0, 0, 0, 0.2)" 
            cellSize={12} 
            logoSrc={eventTextMask}
            logoPosition="center"
            logoScale={0.6}
            enableDripping={false}
            className="w-full h-full"
          />
        </div>
        <div className="container max-w-7xl relative z-10 mx-auto px-4 md:px-6 pb-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 -ml-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Status Badge */}
          {isPast && (
            <div className="mb-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary backdrop-blur-sm text-white font-mono capitalize">
                Past Event
              </span>
            </div>
          )}

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-base mb-6 tracking-tighter">
            {event.name}
          </h1>

          {/* Event Details */}
          <div className="flex flex-col gap-4 mb-8">
            {startDate && (
              <div className="flex items-center gap-2 text-md text-black/90 font-mono">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(event.start_at)}</span>
                {endDate && event.end_at ? (
                  <span>
                    - {formatTime(event.end_at)}
                  </span>
                ) : null}
                {event.duration_minutes && !endDate && (
                  <span>
                    ({Math.floor(event.duration_minutes / 60)}h {event.duration_minutes % 60}m)
                  </span>
                )}
              </div>
            )}

            {(event.host?.name || event.host?.display_name || event.host_profile?.name) && (
              <div className="flex items-center gap-2 text-md text-black/90 font-mono">
                <User className="h-5 w-5" />
                <span>Hosted by {event.host?.name || event.host?.display_name || event.host_profile?.name}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* White Content Area */}
      <section className="relative max-w-7xl mx-auto z-20 -mt-24 bg-neutral-50 rounded-3xl p-8 mb-24 shadow-lg border">
        <div className="container mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8 flex items-center">
            <Link href="/" className="text-secondary-gray hover:text-primary transition-colors text-sm font-medium">
              Home
            </Link>
            <span className="text-gray-300 mx-2">/</span>
            <Link href="/events" className="text-secondary-gray hover:text-primary transition-colors text-sm font-medium">
              Events
            </Link>
            <span className="text-gray-300 mx-2">/</span>
            <span className="text-primary font-medium text-sm truncate max-w-md inline-block">
              {event.name}
            </span>
          </div>

        

          {/* Event Description */}
          {(event.description || event.description_html) && (
            <div className="mb-8">
              <h2 className="text-xl font-base mb-4 text-secondary-black">About Event</h2>
                          {event.description_html ? (
                <div 
                  className="prose prose-lg max-w-none text-secondary-black leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: event.description_html }}
                />
              ) : (
                <div 
                  className="prose prose-lg max-w-none text-secondary-black leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: (event.description || "").replace(/\n/g, "<br />") 
                  }}
                />
              )}
            </div>
          )}
          
          {/* Show message if no description */}
          {!event.description && !event.description_html && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-secondary-black">About</h2>
              <p className="text-secondary-black">No description available for this event.</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            {event.url && (
              <Button variant="default" asChild>
                <Link href={event.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  View on Luma
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/events">All Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
