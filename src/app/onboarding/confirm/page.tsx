"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { ConfirmOnboarding } from "@/components/onboarding/confirm-onboarding";

function ConfirmOnboardingContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  return (
    <main className="min-h-screen bg-white px-4 pt-24 text-secondary-black sm:px-6">
      <ConfirmOnboarding token={token} />
    </main>
  );
}

export default function ConfirmOnboardingPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmOnboardingContent />
    </Suspense>
  );
}
