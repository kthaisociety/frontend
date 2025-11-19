import { Navigation } from "@/components/navigation"
import { Hero } from "./hero"

export function Homepage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <Hero />
      <div className="h-[200vh]">
        
      </div>
    </main>
  )
}
