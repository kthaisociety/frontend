"use client"

import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageCard } from "@/components/ui/image-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AvatarGroup,
  AvatarGroupTooltip,
  AvatarGroupTooltipArrow,
} from "@/components/ui/avatar-group"
import { projects } from "@/lib/data/projects"
import type { Project } from "@/lib/data/projects"

function ProjectCard({ project }: { project: Project }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Determine gradient and text colors based on cover image theme
  const isLightBackground = project.coverImageTheme === "light"
  
  const gradientColors = isLightBackground
    ? {
        from: "from-white/55",
        via: "via-white/50",
        to: "to-transparent",
      }
    : {
        from: "from-black/60",
        via: "via-black/20",
        to: "to-transparent",
      }

  const textColorClass = isLightBackground ? "text-secondary-black" : "text-white"
  const shadowClass = isLightBackground ? "drop-shadow-sm" : "drop-shadow-lg"

  return (
    <ImageCard
      image={project.coverImage || "/project-placeholder.webp"}
      alt={project.title}
      blurHeight="70%"
      gradientColors={gradientColors}
      tags={project.tags}
    >
      {/* Title */}
      <h3 className={`text-2xl font-bold mb-1 ${shadowClass} tracking-tight ${textColorClass}`}>
        {project.title}
      </h3>

      {/* Short Description */}
      <p className={`text-base ${shadowClass} mb-3 ${textColorClass}`}>
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
        <span className="text-sm text-white/90 drop-shadow-md">
        
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <Button
          variant="default"
          asChild
        >
          <Link href={`/projects/${project.id}`}>View project</Link>
        </Button>
        {project.repoUrl && project.repoUrl !== "#" && (
          <Button
            variant="outline"
            asChild
          >
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Repository
            </Link>
          </Button>
        )}
      </div>
    </ImageCard>
  )
}

export function ProjectsPreview() {
  // Show first 3 projects for preview
  const previewProjects = projects.slice(0, 3)

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
