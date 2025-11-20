"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, useLogout } from "@/hooks/auth";
import { DashboardView } from "./dashboard-view";

export { DashboardView } from "./dashboard-view";
export { DashboardSkeleton } from "./dashboard-skeleton";
export type { DashboardPageProps } from "./dashboard-view";

export function DashboardPage() {
  const { data: session, isLoading, isError } = useSession();
  const logout = useLogout();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push("/auth/login");
    }
  }, [isError, router]);

  return <DashboardView session={session} isLoading={isLoading} logout={logout} />;
}
