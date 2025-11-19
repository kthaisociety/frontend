"use client";

import { MdKeyboardArrowDown } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProjectsFilter({
  handleCategoryChange,
}: {
  handleCategoryChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-row justify-end items-center gap-2">
         <DropdownMenu>
        <DropdownMenuTrigger className="flex min-w-[170px] rounded-md border px-3 py-2 shadow-sm items-center justify-between text-sm">
          {/* <<< this text is now ALWAYS visible */}
          <span>Filter by category</span>
          <MdKeyboardArrowDown className="text-slate-500" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] text-xs">
          <DropdownMenuItem onClick={() => handleCategoryChange("AI")}>
            AI &amp; ML
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCategoryChange("Web")}>
            Web / Frontend
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCategoryChange("Industry")}>
            Industry Collabs
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCategoryChange("All")}>
            All Projects
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
