"use client";

import { useState } from "react";
import Image from "next/image";
import type { UseMutationResult } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import type { AuthResponse } from "@/lib/integration/api-client";
import { AdminWorkspace } from "@/components/admin/admin-workspace";
import { DashboardSkeleton } from "./dashboard-skeleton";

export interface DashboardPageProps {
  session: AuthResponse | null | undefined;
  isLoading: boolean;
  logout: UseMutationResult<unknown, Error, void, unknown>;
}

const getAdminEmails = () => {
  const envValue = process.env.NEXT_PUBLIC_ADMIN_EMAILS;
  if (!envValue) {
    return [];
  }
  return envValue
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
};

const isAdminUser = (email: string) => {
  const adminEmails = getAdminEmails();
  if (adminEmails.length > 0) {
    return adminEmails.includes(email.toLowerCase());
  }
  return email.toLowerCase().endsWith("@kthais.com");
};

const getInitials = (firstName?: string, lastName?: string) => {
  const first = firstName?.trim()?.[0] || "";
  const last = lastName?.trim()?.[0] || "";
  const initials = `${first}${last}`.toUpperCase();
  return initials || "KA";
};

type DashboardTab = "profile" | "admin";

export function DashboardView({
  session,
  isLoading,
  logout,
}: DashboardPageProps) {
  const isAdmin = session?.user ? isAdminUser(session.user.email) : false;
  const [activeTab, setActiveTab] = useState<DashboardTab>("profile");

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!session?.user) {
    return null;
  }

  const tabs: { id: DashboardTab; label: string }[] = [
    { id: "profile", label: "Profile" },
    ...(isAdmin ? [{ id: "admin" as const, label: "Admin" }] : []),
  ];
  const showAdmin = isAdmin && activeTab === "admin";

  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-6 px-6 pb-16 pt-32 sm:pt-36">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-3xl">Dashboard</CardTitle>
            <CardDescription>Overview and account access.</CardDescription>
          </div>
          <Button
            variant="destructive"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            {logout.isPending ? "Logging out..." : "Logout"}
          </Button>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle>Workspace</CardTitle>
            <CardDescription>
              {isAdmin
                ? "Switch between profile and admin tools."
                : "Review your profile details."}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                size="sm"
                variant={tab.id === activeTab ? "secondary" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {!showAdmin ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    {session.user.image ? (
                      <AvatarImage src={session.user.image} alt="Profile" />
                    ) : null}
                    <AvatarFallback>
                      {getInitials(
                        session.user.firstName,
                        session.user.lastName,
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {session.user.firstName} {session.user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isAdmin ? "Admin access" : "Member access"}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Email</Label>
                  <p className="text-sm font-medium">{session.user.email}</p>
                </div>
                <div className="space-y-1">
                  <Label>Full name</Label>
                  <p className="text-sm font-medium">
                    {session.user.firstName} {session.user.lastName}
                  </p>
                </div>
                {session.user.image ? (
                  <div className="space-y-1 sm:col-span-2">
                    <Label>Profile image</Label>
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-full border border-input object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <AdminWorkspace />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
