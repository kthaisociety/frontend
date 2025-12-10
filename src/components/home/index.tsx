
import { Hero } from "./hero"
import { EventsPreview } from "./events-preview"
import { ProjectsPreview } from "./projects-preview"

export function Homepage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <EventsPreview />
      <ProjectsPreview />
    </main>
  )
}
