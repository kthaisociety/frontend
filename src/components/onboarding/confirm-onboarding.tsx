"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useConfirmOnboarding,
  useOnboardingConfirmInfo,
  type OnboardingRecord,
} from "@/hooks/onboarding";

// Renders an explicit "Confirm" button that must be clicked — never
// auto-confirms on page load/render. KTH's Microsoft-hosted mail almost
// certainly prefetches links in emails (Safe Links or equivalent), which
// would silently trigger an auto-confirming GET before the actual person
// ever saw this page. See onboarding-service's PortalHandler.Confirm and
// onboarding-service-plan.md's anti-prefetch note — this page is the other
// half of that same design requirement.
function resultMessage(record: OnboardingRecord): { title: string; body: string; failed: boolean } {
  if (record.state === "failed") {
    return {
      title: "Almost there",
      body: "Your email is confirmed, but something went wrong setting up your account. We've been notified and will follow up shortly.",
      failed: true,
    };
  }
  return {
    title: "You're all set!",
    body: "Your KTH email is confirmed. Check your inbox for your new kthais.com account details and a Mattermost invite.",
    failed: false,
  };
}

export function ConfirmOnboarding({ token }: { token: string }) {
  const confirm = useConfirmOnboarding();
  // Read-only lookup, never consumes the token — just so this page can show
  // who it's for (and catch an already-used/expired link) before the real
  // action happens. See onboarding-service's PortalHandler.ConfirmInfo.
  const info = useOnboardingConfirmInfo(token);

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-xl py-24">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Link invalid or expired</AlertTitle>
          <AlertDescription>
            This link is missing its token. Please use the link from your
            confirmation email.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (confirm.error || (info.isError && !confirm.isSuccess)) {
    const error = confirm.error ?? info.error;
    return (
      <div className="mx-auto w-full max-w-xl py-24">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Link invalid or expired</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "This link is invalid or has expired."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (confirm.isSuccess) {
    const { title, body, failed } = resultMessage(confirm.data);
    return (
      <div className="mx-auto w-full max-w-xl py-24">
        <Alert variant={failed ? "destructive" : "default"}>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{body}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (info.isLoading) {
    return (
      <div className="mx-auto w-full max-w-xl py-24">
        <Skeleton className="mx-auto h-8 w-2/3" />
        <Skeleton className="mx-auto mt-4 h-11 w-64" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 py-24 text-center">
      <div>
        <h1 className="text-2xl font-semibold">
          {info.data ? `Hi ${info.data.first_name}, confirm your KTH email` : "Confirm your KTH email"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Click below to confirm this is your KTH email address and finish
          setting up your account.
        </p>
      </div>
      <Button
        onClick={() => confirm.mutate({ token })}
        disabled={confirm.isPending}
        size="lg"
        className="mx-auto"
      >
        {confirm.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {info.data
          ? `I confirm that ${info.data.kth_email} is my own email address`
          : "Confirm this is me"}
      </Button>
    </div>
  );
}
