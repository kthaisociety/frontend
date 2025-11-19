"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectsFilter } from "@/components/projects/project-filter";
import type { Project } from "@/components/projects/project-types";

export function ProjectsView({ projects }: { projects: Project[] }) {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>(projects);

  // filtering logic
  function handleCategoryChange(category: string) {
    switch (category) {
      case "AI":
        setSelectedProjects(projects.filter((p) => p.tags?.includes("AI")));
        break;
      case "Web":
        setSelectedProjects(projects.filter((p) => p.tags?.includes("Web")));
        break;
      case "Industry":
        setSelectedProjects(projects.filter((p) => p.tags?.includes("Industry")));
        break;
      default:
        setSelectedProjects(projects);
        break;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* blue hero band */}
      <section className="bg-[#2552A7] text-white">
        <div className="mx-auto max-w-7xl px-7 md:px-10 lg:px-16 py-10 md:py-14">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
            KTH AI Society
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/90">
            Explore selected projects and see who built them, from internal initiatives
            to collaborations with industry partners.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[11px] md:text-xs">
            <span className="rounded-full bg-white/10 px-3 py-1 border border-white/25">
              {projects.length} projects
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 border border-white/25">
              Students & alumni
            </span>
          </div>
        </div>
      </section>

      {/* white content surface overlapping the blue hero */}
      <main className="relative -mt-6 pb-12">
        <div className="mx-auto max-w-7xl px-7 md:px-10 lg:px-16">
          <div className="rounded-3xl bg-white shadow-sm border border-slate-200/80 px-5 md:px-8 lg:px-10 py-8 md:py-10">
            {/* breadcrumb */}
            <h4 className="hidden md:block mb-6 font-light text-sm text-slate-500">
              <a href="/" className="hover:underline">Home</a> /{" "}
              <a href="/projects" className="hover:underline text-[#2552A7]">Projects</a>
            </h4>

            {/* header row: text left, filter right */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                  Featured work
                </h2>
                <p className="text-sm text-slate-600 max-w-xl">
                  Filter by category to see AI, web, and industry-focused projects.
                </p>
              </div>

              <div className="flex justify-start md:justify-end">
                <ProjectsFilter handleCategoryChange={handleCategoryChange} />
              </div>
            </div>

            {/* grid of project cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>

            {selectedProjects.length === 0 && (
              <div className="py-20 text-center text-sm text-slate-500">
                No projects match the selected category yet.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
