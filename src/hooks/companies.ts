import { useEffect, useState } from "react";

export type CompanyInput = {
  name: string;
  logoUrl: string;
  websiteUrl: string;
};

export type Company = CompanyInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "kthais-companies";

const getNowIso = () => new Date().toISOString();

const getStoredCompanies = (): Company[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as Company[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistCompanies = (companies: Company[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
};

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>(() =>
    getStoredCompanies(),
  );

  useEffect(() => {
    persistCompanies(companies);
  }, [companies]);

  const createCompany = (input: CompanyInput) => {
    const now = getNowIso();
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const newCompany: Company = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    };
    setCompanies((prev) => [newCompany, ...prev]);
    return newCompany;
  };

  return {
    companies,
    createCompany,
  };
}
