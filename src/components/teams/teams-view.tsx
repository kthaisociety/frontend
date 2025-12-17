"use client";

import { useState } from "react";
import type { Team } from "./team-types";
import { TeamsFilter } from "./teams-filter";
import { TeamCard } from "./team-card";

const BRAND_BLUE = "#2552A7";

export function TeamsView({ teams }: { teams: Team[] }) {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>(teams);

  // alumni-style switch filtering
  function handleTeamChange(team: string) {
    switch (team) {
      case "AI Team":
        setSelectedTeams(teams.filter((t) => t.category === "AI" || t.name === "AI Team"));
        break;
      case "IT Team":
        setSelectedTeams(teams.filter((t) => t.category === "IT" || t.name === "IT Team"));
        break;
      case "Business Team":
        setSelectedTeams(teams.filter((t) => t.category === "Business" || t.name === "Business Team"));
        break;
      case "Growth Team":
        setSelectedTeams(teams.filter((t) => t.category === "Growth" || t.name === "Growth Team"));
        break;
      default:
        setSelectedTeams(teams);
        break;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* blue hero */}
      <section className="text-white" style={{ backgroundColor: BRAND_BLUE }}>
        <div className="mx-auto max-w-7xl px-7 md:px-10 lg:px-16 py-10 md:py-14">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
            KTH AI Society
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
            Teams
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/90">
            Meet the teams that run the society and build projects across research, engineering, and business.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-[11px] md:text-xs">
            <span className="rounded-full bg-white/10 px-3 py-1 border border-white/25">
              {teams.length} teams
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 border border-white/25">
              Students & alumni
            </span>
          </div>
        </div>
      </section>

      {/* white surface */}
      <main className="relative -mt-6 pb-12">
        <div className="mx-auto max-w-7xl px-7 md:px-10 lg:px-16">
          <div className="rounded-3xl bg-white shadow-sm border border-slate-200/80 px-5 md:px-8 lg:px-10 py-8 md:py-10">
            <h4 className="hidden md:block mb-6 font-light text-sm text-slate-500">
              <a href="/" className="hover:underline">Home</a> /{" "}
              <a href="/teams" className="hover:underline" style={{ color: BRAND_BLUE }}>Teams</a>
            </h4>

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                  Our teams
                </h2>
                <p className="text-sm text-slate-600 max-w-xl">
                  Filter by team to see leadership, engineering, and community groups.
                </p>
              </div>

              <div className="flex justify-start md:justify-end">
                <TeamsFilter handleTeamChange={handleTeamChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedTeams.map((t) => (
                <TeamCard key={t.id} {...t} />
              ))}
            </div>

            {selectedTeams.length === 0 && (
              <div className="py-20 text-center text-sm text-slate-500">
                No teams match the selected filter.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
