"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { StartOnboardingForm } from "@/components/onboarding/start-onboarding-form";

function StartOnboardingContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  return (
    <main className="min-h-screen bg-white px-4 pt-24 text-secondary-black sm:px-6">
      <StartOnboardingForm token={token} />
    </main>
  );
}

export default function StartOnboardingPage() {
  return (
    <Suspense fallback={null}>
      <StartOnboardingContent />
    </Suspense>
  );
}
