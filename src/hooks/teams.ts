import { useQuery } from "@tanstack/react-query";
import type { Team } from "@/components/teams/team-types";

export function useTeams() {
  return useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await fetch("/teamData.json");

      if (!response.ok) {
        throw new Error("Failed to fetch teams data");
      }

      return response.json();
    },
  });
}
