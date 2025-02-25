"use client";
import { useSession, useLogout } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardView from "./dashboard-view";
import { UseMutationResult } from "@tanstack/react-query";
import { AuthResponse } from "@/lib/integration/api-client";

export interface DashboardPageProps {
    session: AuthResponse | null | undefined;
    isLoading: boolean;
    logout: UseMutationResult<unknown, Error, void, unknown>;
}

const DashboardPresenter = () => {
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
export default DashboardPresenter;

 
