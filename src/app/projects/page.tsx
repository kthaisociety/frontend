"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AsciiGrid } from "@/components/ui/ascii-grid"
import { ImageCard } from "@/components/ui/image-card"
import {
  AvatarGroup,
  AvatarGroupTooltip,
  AvatarGroupTooltipArrow,
} from "@/components/ui/avatar-group"
import { projects, getAllTags } from "@/lib/data/projects"

function ProjectCard({ project }: { project: typeof projects[0] }) {
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
    <Link href={`/projects/${project.id}`} className="block group">
      <ImageCard
        image={project.coverImage || "/project-placeholder.webp"}
        alt={project.title}
        blurHeight="70%"
        gradientColors={gradientColors}
        tags={project.tags}
      >
        {/* Title */}
        <h3 className={`text-2xl font-bold mb-1 ${shadowClass} tracking-tight ${textColorClass} `}>
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
              onClick={(e) => e.stopPropagation()}
            >
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                Repository
              </Link>
            </Button>
          )}
        </div>
      </ImageCard>
    </Link>
  )
}

type Category = "all" | string

export default function ProjectsPage() {
  const [projectsTextMask, setProjectsTextMask] = useState<string | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")

  useEffect(() => {
    // Create a canvas-based text mask for "PROJECTS"
    const canvas = document.createElement("canvas")
    // Use reasonable dimensions - AsciiGrid will scale it appropriately
    canvas.width = 1200
    canvas.height = 400
    const ctx = canvas.getContext("2d")
    
    if (!ctx) return

    // Clear with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Set up text styling - bold and large
    ctx.fillStyle = "white"
    ctx.font = "bold 200px system-ui, -apple-system, sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    
    // Draw "PROJECTS" text - positioned in upper-left area
    const text = "PROJECTS"
    ctx.fillText(text, 50, 50)
    
    // Convert to data URL
    const dataUrl = canvas.toDataURL("image/png")
    // Use requestAnimationFrame to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      setProjectsTextMask(dataUrl)
    })
  }, [])

  const allTags = getAllTags()
  
  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "all") return true
    
    return project.tags.some((tag) => 
      tag.toLowerCase() === selectedCategory.toLowerCase()
    )
  })

  const getCategoryLabel = (category: Category): string => {
    if (category === "all") return "All categories"
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className="min-h-screen">
      {/* Dark Blue Header Section */}
      <section className="relative bg-white text-secondary-black pt-64 pb-24 overflow-hidden">
         {/* Ascii Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <AsciiGrid 
            color="rgba(0, 0, 0, 0.2)" 
            cellSize={12} 
            logoSrc={projectsTextMask}
            logoPosition="center"
            logoScale={0.6}
            enableDripping={false}
            className="w-full h-full"
          />
        </div>
        <div className="container max-w-7xl relative z-10 mx-auto px-4 md:px-6 pb-8">

          {/* Main Title */}
          <h4 className="text-3xl  mb-2 tracking-tighter">
            <span className="font-serif font-normal text-primary">(Featured)</span> Work
          </h4>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            Projects
          </h1>


          {/* Description */}
          <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-95 leading-relaxed font-serif">
            Explore selected projects and see who built them, from internal initiatives to collaborations with industry partners.
          </p>
        </div>
      </section>

      {/* White Content Area */}
      <section className="relative max-w-7xl mx-auto z-20 -mt-24 bg-neutral-50 rounded-3xl p-8 mb-24 shadow-lg border">
        <div className="container mx-auto">
          <div className="flex  justify-between items-center mb-8">
          {/* Breadcrumbs */}
          <div>
            <Link href="/" className="text-secondary-gray hover:text-primary transition-colors text-sm font-medium">
              Home
            </Link>
            <span className="text-gray-300 mx-2">/</span>
            <span className="text-primary font-medium text-sm">Projects</span>
          </div>
            {/* Category Filter Dropdown */}

          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                >
                  {getCategoryLabel(selectedCategory)}
                  <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[220px]">
                <DropdownMenuItem onClick={() => setSelectedCategory("all")}>
                  All categories
                </DropdownMenuItem>
                {allTags.map((tag) => (
                  <DropdownMenuItem key={tag} onClick={() => setSelectedCategory(tag)}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            </div>

         

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-secondary-gray">
                <p className="text-lg">No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
