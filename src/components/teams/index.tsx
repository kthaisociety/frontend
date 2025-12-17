"use client";

import { useTeams } from "@/hooks/teams";
import { TeamsSkeleton } from "./teams-skeleton";
import { TeamsView } from "./teams-view";

export function TeamsPage() {
  const { data: teams, isLoading, error } = useTeams();

  if (isLoading) return <TeamsSkeleton />;

  if (error || !teams) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-3">
        <h1 className="text-4xl font-semibold">Sorry, something went wrong.</h1>
        <p className="text-lg">Try again later...</p>
      </div>
    );
  }

  return <TeamsView teams={teams} />;
}