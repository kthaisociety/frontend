"use client";

import { useSession, useLogout } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, isLoading, isError } = useSession();
  const logout = useLogout();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push("/auth/login");
    }
  }, [isError, router]);

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
          {session.user.profile && (
            <>
              <div>
                <label className='text-sm font-medium text-muted-foreground'>
                  Name
                </label>
                <p className='text-lg'>
                  {session.user.profile.firstName}{" "}
                  {session.user.profile.lastName}
                </p>
              </div>
              {session.user.profile.image && (
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Profile Image
                  </label>
                  <img
                    src={session.user.profile.image}
                    alt='Profile'
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

function DashboardSkeleton() {
  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <Skeleton className='h-10 w-32' />
        <Skeleton className='h-10 w-24' />
      </div>
      <div className='bg-card rounded-lg p-6 shadow-sm'>
        <Skeleton className='h-8 w-24 mb-4' />
        <div className='space-y-4'>
          <div>
            <Skeleton className='h-4 w-16 mb-2' />
            <Skeleton className='h-6 w-48' />
          </div>
          <div>
            <Skeleton className='h-4 w-16 mb-2' />
            <Skeleton className='h-6 w-48' />
          </div>
        </div>
      </div>
    </div>
  );
}
