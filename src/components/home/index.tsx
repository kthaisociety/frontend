import { Navigation } from "@/components/navigation"
import { Hero } from "./hero"
import { EventsPreview } from "./events-preview"

export function Homepage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <Hero />
      <EventsPreview />
      <div className="h-[200vh]">
        
      </div>
    </main>
  )
}
