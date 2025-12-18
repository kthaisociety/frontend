import { useQuery } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  salary: string;
  jobType: string;
  location: string;
  startdate: string;
  enddate: string;
}

export interface JobDetail {
  id: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  jobType: string;
  company: string;
  companyLogo: string;
  startdate: string;
  enddate: string;
  appurl: string;
  contact: string;
}

export function useJobs() {
  return useQuery<JobListing[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await fetch(`${baseURL}/api/v1/joblistings/all`);

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status}`);
      }

      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes - cache persists for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
  });
}

export function useJob(jobId: string | undefined) {
  return useQuery<JobDetail>({
    queryKey: ["job", jobId],
    queryFn: async () => {
      if (!jobId) {
        throw new Error("Job ID is required");
      }

      const response = await fetch(`${baseURL}/api/v1/joblistings/job?id=${jobId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch job: ${response.status}`);
      }

      const data = await response.json();
      return data;
    },
    enabled: !!jobId, // Only run query if jobId exists
    staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes - cache persists for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
    refetchOnReconnect: false, // Don't refetch on reconnect
    retry: 2, // Retry failed requests up to 2 times
    retryDelay: 1000, // Wait 1 second between retries
  });
}

