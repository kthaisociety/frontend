"use client";

import { MdKeyboardArrowDown } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TeamsFilter({
  handleTeamChange,
}: {
  handleTeamChange: (team: string) => void;
}) {
  return (
    <div className="flex flex-row justify-end items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex min-w-[190px] rounded-md border px-3 py-2 shadow-sm items-center justify-between text-sm">
          <span>Filter by team</span>
          <MdKeyboardArrowDown className="text-slate-500" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] text-xs">
          <DropdownMenuItem onClick={() => handleTeamChange("AI Team")}>AI Team</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTeamChange("IT Team")}>IT Team</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTeamChange("Business Team")}>Business Team</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTeamChange("Growth Team")}>Growth Team</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTeamChange("All")}>All Teams</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
