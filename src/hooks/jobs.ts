import { useEffect, useMemo, useState } from "react";

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
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setJobs(getStoredJobs());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    persistJobs(jobs);
  }, [jobs, isHydrated]);

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
    isHydrated,
    createJob,
    updateJob,
    deleteJob,
  };
}
