import { Hero } from "./hero"
import { EventsPreview } from "./events-preview"
import { ProjectsPreview } from "./projects-preview"
import { HistoryTimeline } from "./history-timeline"

export function Homepage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <EventsPreview />
      <HistoryTimeline
        title="OUR HISTORY"
        introText="KTH AI Society has a rich history of building the AI community at KTH, bringing together students, industry leaders, and innovators to shape the future of artificial intelligence."
        defaultYear={2023}
      />
      <ProjectsPreview />
      
    </main>
  )
}
