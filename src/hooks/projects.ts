import { useQuery} from "@tanstack/react-query";
import type { Project } from "@/components/projects/project-types";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
        const response = await fetch("/projectsData.json");

        if (!response.ok) {
            throw new Error("Failed to fetch projects data");
        }

        const data = await response.json();
        return data;
    },
  });
}


