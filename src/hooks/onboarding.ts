import { useMutation, useQuery } from "@tanstack/react-query";

// Types mirror onboarding-service's OnboardingRecord JSON shape exactly
// (internal/models/onboarding_record.go) — this hits onboarding-service via
// this app's own /api/onboarding/* proxy routes (see those files for why:
// onboarding-service has no public ingress), never the main backend.
export type OnboardingState =
  | "notified"
  | "kth_email_submitted"
  | "kth_email_confirmed"
  | "provisioned"
  | "emailed"
  | "complete"
  | "failed"
  | "cancelled";

export type OnboardingRecord = {
  ID: number;
  application_id: string | null;
  first_name: string;
  last_name: string;
  personal_email: string;
  assigned_team: string;
  state: OnboardingState;
  kth_email: string;
  kthais_email: string;
  failure_reason: string;
};

async function submitOnboardingEmail(input: {
  token: string;
  kth_email: string;
}): Promise<OnboardingRecord> {
  const response = await fetch("/api/onboarding/submit-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Failed to submit your kth.se address");
  }
  return response.json();
}

export function useSubmitOnboardingEmail() {
  return useMutation({
    mutationFn: submitOnboardingEmail,
  });
}

async function confirmOnboarding(input: { token: string }): Promise<OnboardingRecord> {
  const response = await fetch("/api/onboarding/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Failed to confirm your email");
  }
  return response.json();
}

export function useConfirmOnboarding() {
  return useMutation({
    mutationFn: confirmOnboarding,
  });
}

export type OnboardingConfirmInfo = {
  first_name: string;
  kth_email: string;
};

async function fetchOnboardingConfirmInfo(token: string): Promise<OnboardingConfirmInfo> {
  const response = await fetch(`/api/onboarding/confirm?token=${encodeURIComponent(token)}`);
  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "This link is invalid or has expired.");
  }
  return response.json();
}

// Read-only — never consumes the token — so the confirm page can show who
// the link is for before the real confirming action happens.
export function useOnboardingConfirmInfo(token: string) {
  return useQuery({
    queryKey: ["onboarding-confirm-info", token],
    queryFn: () => fetchOnboardingConfirmInfo(token),
    enabled: Boolean(token),
    retry: false,
  });
}
