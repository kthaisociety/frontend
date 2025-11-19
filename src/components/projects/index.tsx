"use client";

import { useProjects } from "@/hooks/projects";
import { ProjectsSkeleton } from "./project-skeleton"; // while fetching data, show a skeleton loader
import { ProjectsView } from "./project-view"; // after fetching data, show the projects

export function ProjectsPage() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) return <ProjectsSkeleton />;

  if (error || !projects) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-3">
        <h1 className="text-4xl font-semibold">Sorry, something went wrong.</h1>
        <p className="text-lg">Try again later…</p>
      </div>
    );
  }

  return <ProjectsView projects={projects} />;
}