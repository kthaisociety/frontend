import { useQuery } from "@tanstack/react-query";

export interface Collaborator {
  name: string;
  logo: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity?: number;
  image: string;
  collaborators?: Collaborator[];
}

// not sure how to call the db to get event info right now so this is just mock data
// not even in use at the moment

async function fetchEvents(): Promise<Event[]> {
  const API_URL =
    (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") + "/api/v1";
  const response = await fetch(`${API_URL}/events`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    select: (data) => {
      // Sort events by date (newest first) and take the latest 10
      return data
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);
    },
  });
}
