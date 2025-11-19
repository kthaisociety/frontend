"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Project } from "./project-types";

export function ProjectCard(p: Project) {
  return (
    <Card className="h-full flex flex-col border border-slate-200/90 bg-white/95 shadow-sm hover:shadow-md hover:border-[#2552A7]/50 transition-all hover:-translate-y-0.5">
      <CardHeader className="space-y-3 pb-3">
        {/* top tags row */}
        {p.tags?.length ? (
          <div className="flex flex-wrap gap-2 text-[11px]">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-[#E4EEFF] px-2.5 py-1 text-[#2552A7] border border-[#C2D8FF]"
              >
                {t}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-[11px] uppercase tracking-wide text-slate-400">
            Project
          </span>
        )}

        <div>
          <CardTitle className="text-lg md:text-xl text-slate-900">
            {p.title}
          </CardTitle>
          {p.subtitle && (
            <CardDescription className="mt-1 text-sm text-slate-600">
              {p.subtitle}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 pt-0">
        {p.description && (
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
            {p.description}
          </p>
        )}

        {p.members?.length ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
              Contributors
            </p>
            <div className="flex -space-x-2">
              {p.members.slice(0, 3).map((m) => (
                <Avatar
                  key={m.id}
                  className="h-8 w-8 ring-2 ring-white border border-slate-200"
                >
                  <AvatarImage src={m.avatarUrl} />
                  <AvatarFallback>
                    {m.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {p.members.length > 3 && (
                <div className="h-8 w-8 rounded-full bg-[#E4EEFF] text-[11px] flex items-center justify-center text-[#2552A7] ring-2 ring-white border border-[#C2D8FF]">
                  +{p.members.length - 3}
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {p.members
                .slice(0, 2)
                .map((m) => `${m.name}${m.role ? ` (${m.role})` : ""}`)
                .join(" · ")}
              {p.members.length > 2 && " · …"}
            </p>
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="mt-auto pt-4 flex gap-2">
        <Link href={`/projects/${p.id}`} className="w-full">
          <Button className="w-full bg-[#2552A7] hover:bg-[#1747a7] text-white">
            View project
          </Button>
        </Link>
        {p.repo && (
          <a
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full border-[#2552A7]/50 text-[#2552A7] hover:bg-[#E4EEFF]"
            >
              Repo
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
