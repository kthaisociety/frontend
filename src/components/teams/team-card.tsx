"use client";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Team } from "./team-types";

const BRAND_BLUE = "#2552A7";

export function TeamCard(t: Team) {
  return (
    <Card className="h-full flex flex-col border border-slate-200/90 bg-white/95 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-center justify-between">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] border"
            style={{ backgroundColor: "#E4EEFF", borderColor: "#C2D8FF", color: BRAND_BLUE }}
          >
            {t.category ?? "Team"}
          </span>
          {t.members?.length ? (
            <span className="text-[11px] text-slate-500">{t.members.length} members</span>
          ) : null}
        </div>

        <div>
          <CardTitle className="text-lg md:text-xl text-slate-900">{t.name}</CardTitle>
          {t.subtitle && (
            <CardDescription className="mt-1 text-sm text-slate-600">{t.subtitle}</CardDescription>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 pt-0">
        {t.description && (
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
            {t.description}
          </p>
        )}

        {t.members?.length ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
              Key members
            </p>
            <div className="flex -space-x-2">
              {t.members.slice(0, 4).map((m) => (
                <Avatar key={m.id} className="h-8 w-8 ring-2 ring-white border border-slate-200">
                  <AvatarImage src={m.avatarUrl} />
                  <AvatarFallback>{m.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
              {t.members.length > 4 && (
                <div
                  className="h-8 w-8 rounded-full text-[11px] flex items-center justify-center ring-2 ring-white border"
                  style={{ backgroundColor: "#E4EEFF", borderColor: "#C2D8FF", color: BRAND_BLUE }}
                >
                  +{t.members.length - 4}
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {t.members
                .slice(0, 2)
                .map((m) => `${m.name}${m.role ? ` (${m.role})` : ""}`)
                .join(" · ")}
              {t.members.length > 2 && " · …"}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
