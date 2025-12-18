"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageCard } from "@/components/ui/image-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AvatarGroup,
  AvatarGroupTooltip,
  AvatarGroupTooltipArrow,
} from "@/components/ui/avatar-group"

interface Contributor {
  name: string
  role: string
  avatar?: string
  linkedinUrl?: string
}

interface Project {
  id: string
  tags: string[]
  title: string
  shortDescription: string
  longDescription: string
  contributors: Contributor[]
  projectUrl?: string
  repoUrl?: string
}

const mockProjects: Project[] = [
  {
    id: "1",
    tags: ["react", "iot", "maps"],
    title: "Shuttle Tracker",
    shortDescription: "Realtime buses on campus",
    longDescription: "IoT devices stream GPS to a Next.js dashboard with live maps and alerts.",
    contributors: [
      { name: "Jesper Hesselgren", role: "Frontend Developer", avatar: "/profile-1.jpg", linkedinUrl: "https://linkedin.com/in/jesper-hesselgren" },
      { name: "Erik Johansson", role: "Backend Developer", avatar: "/profile-2.jpg", linkedinUrl: "https://linkedin.com/in/erik-johansson" },
    ],
    projectUrl: "#",
    repoUrl: "#",
  },
  {
    id: "2",
    tags: ["finance", "ml", "analytics"],
    title: "SSE Ledger",
    shortDescription: "Finance analytics & anomaly detection",
    longDescription: "Ingests journal entries, runs ML-based anomaly detection, and surfaces insights in a web UI.",
    contributors: [
      { name: "Sofia Lindström", role: "AI Researcher", avatar: "/profile-3.jpg", linkedinUrl: "https://linkedin.com/in/sofia-lindstrom" },
      { name: "Nora Ahmed", role: "Product Manager", avatar: "/profile-1.jpg", linkedinUrl: "https://linkedin.com/in/nora-ahmed" },
    ],
    projectUrl: "#",
    repoUrl: "#",
  },
  {
    id: "3",
    tags: ["nextjs", "ssr", "ui"],
    title: "Campus Events",
    shortDescription: "SSR site with filters & ICS export",
    longDescription: "Next.js App Router app that aggregates events, supports tags, and calendar exports.",
    contributors: [
      { name: "Liam Pettersson", role: "DevOps Engineer", avatar: "/profile-2.jpg", linkedinUrl: "https://linkedin.com/in/liam-pettersson" },
      { name: "Jesper Hesselgren", role: "Frontend Developer", avatar: "/profile-3.jpg", linkedinUrl: "https://linkedin.com/in/jesper-hesselgren" },
      { name: "Erik Johansson", role: "Backend Developer", avatar: "/profile-1.jpg", linkedinUrl: "https://linkedin.com/in/erik-johansson" },
    ],
    projectUrl: "#",
    repoUrl: "#",
  },
]

function ProjectCard({ project }: { project: Project }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <ImageCard
      image="/project-placeholder.webp"
      alt={project.title}
      blurHeight="70%"
      gradientColors={{
        from: "from-white/60",
        via: "via-white/55",
        to: "to-transparent",
      }}
      tags={project.tags}
    >
      {/* Title */}
      <h3 className="text-2xl font-base text-secondary-black mb-1 drop-shadow-lg tracking-tight">
        {project.title}
      </h3>

      {/* Short Description */}
      <p className="text-base drop-shadow-md mb-3">
        {project.shortDescription}
      </p>

      {/* Contributors */}
      <div className="flex items-center flex-wrap gap-2">
        <AvatarGroup translate="-6%" sideOffset={10}>
          {project.contributors.map((contributor) => (
            <Avatar key={`${contributor.name}-${contributor.role}`} className="h-8 w-8 border mr-0.5">
              <AvatarImage src={contributor.avatar} alt={contributor.name} />
              <AvatarFallback className="bg-primary text-white text-xs">
                {getInitials(contributor.name)}
              </AvatarFallback>
              <AvatarGroupTooltip className="bg-white text-black rounded-lg px-3 py-2 shadow-lg">
                <AvatarGroupTooltipArrow className="fill-white stroke-black" />
                <div className="text-center">
                  <div className="font-medium tracking-tight">{contributor.name}</div>
                  <div className="text-sm font-serif text-primary">{contributor.role}</div>
                </div>
              </AvatarGroupTooltip>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      
    </ImageCard>
  )
}

export function ProjectsPreview() {
  // Show first 3 projects for preview
  const previewProjects = mockProjects.slice(0, 3)

  return (
    <section className="container mx-auto py-16 px-4 w-full max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-primary font-serif font-normal">(Featured)</span> Projects
        </h2>
        <Button asChild>
          <Link href="/projects">
            <span className="hidden md:block">See more </span>Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {previewProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
