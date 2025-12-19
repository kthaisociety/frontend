import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { JobListing as APIJobListing } from "@/app/api/jobs/route";
import type { JobDetail } from "@/app/api/jobs/[id]/route";

export type JobPostInput = {
  title: string;
  description: string;
  type: string;
  location: string;
  salary: string;
  companyId: string;
};

export type JobPost = JobPostInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

// Re-export JobListing type from API route
export type { JobListing } from "@/app/api/jobs/route";

const STORAGE_KEY = "kthais-job-posts";

const getNowIso = () => new Date().toISOString();

const getStoredJobs = (): JobPost[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as JobPost[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistJobs = (jobs: JobPost[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
};

export function useJobPosts() {
  const [jobs, setJobs] = useState<JobPost[]>(() => getStoredJobs());

  useEffect(() => {
    persistJobs(jobs);
  }, [jobs]);

  const createJob = (input: JobPostInput) => {
    const now = getNowIso();
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const newJob: JobPost = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateJob = (id: string, input: JobPostInput) => {
    const now = getNowIso();
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, ...input, updatedAt: now } : job,
      ),
    );
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [jobs]);

  return {
    jobs: sortedJobs,
    createJob,
    updateJob,
    deleteJob,
  };
}

// React Query hook for fetching job listings from backend
export function useJobs() {
  return useQuery<APIJobListing[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await fetch("/api/jobs");

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status}`);
      }

      const data = await response.json();
      return data.jobs || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes - cache persists for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
  });
}

// React Query hook for fetching individual job details from backend
export function useJob(jobId: string | undefined) {
  return useQuery<JobDetail>({
    queryKey: ["job", jobId],
    queryFn: async () => {
      if (!jobId) {
        throw new Error("Job ID is required");
      }

      const response = await fetch(`/api/jobs/${jobId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch job: ${response.status}`);
      }

      const data = await response.json();
      return data.job;
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
