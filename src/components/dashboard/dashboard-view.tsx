"use client";

import Image from "next/image";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AuthResponse } from "@/lib/integration/api-client";
import { Button } from "@/components/ui/button";
import { DashboardSkeleton } from "./dashboard-skeleton";

export interface DashboardPageProps {
  session: AuthResponse | null | undefined;
  isLoading: boolean;
  logout: UseMutationResult<unknown, Error, void, unknown>;
}

export function DashboardView({
  session,
  isLoading,
  logout,
}: DashboardPageProps) {
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <Button
          variant='destructive'
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          {logout.isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>

      <div className='bg-card rounded-lg p-6 shadow-sm'>
        <h2 className='text-2xl font-semibold mb-4'>Profile</h2>
        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium text-muted-foreground'>
              Email
            </label>
            <p className='text-lg'>{session.user.email}</p>
          </div>
          {session.user && (
            <>
              <div>
                <label className='text-sm font-medium text-muted-foreground'>
                  Name
                </label>
                <p className='text-lg'>
                  {session.user.firstName} {session.user.lastName}
                </p>
              </div>
              {session.user.image && (
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Profile Image
                  </label>
                  <Image
                    src={session.user.image}
                    alt='Profile'
                    width={80}
                    height={80}
                    className='w-20 h-20 rounded-full mt-2'
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
