"use client";

import { useState, type ChangeEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubmitOnboardingEmail } from "@/hooks/onboarding";

export function StartOnboardingForm({ token }: { token: string }) {
  const [kthEmail, setKthEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const submit = useSubmitOnboardingEmail();

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-xl py-24">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Link invalid or expired</AlertTitle>
          <AlertDescription>
            This link is missing its token. Please use the link from your
            onboarding email.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (submit.isSuccess) {
    return (
      <div className="mx-auto w-full max-w-xl py-24">
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Check your inbox</AlertTitle>
          <AlertDescription>
            We&apos;ve sent a confirmation link to {kthEmail}. Click it to
            confirm this is your KTH email address.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setKthEmail(e.target.value);
    setValidationError(null);
  }

  function handleSubmit() {
    const trimmed = kthEmail.trim().toLowerCase();
    if (!trimmed.endsWith("@kth.se")) {
      setValidationError("Please enter your kth.se email address.");
      return;
    }
    submit.mutate({ token, kth_email: trimmed });
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold">Welcome to KTH AI Society!</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your kth.se email address so we can set up your kthais.com
          account and Mattermost access.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="kth-email">KTH email address</Label>
        <Input
          id="kth-email"
          type="email"
          placeholder="you@kth.se"
          value={kthEmail}
          onChange={handleChange}
        />
      </div>

      {(validationError || submit.error) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {validationError ??
              (submit.error instanceof Error ? submit.error.message : "Failed to submit")}
          </AlertDescription>
        </Alert>
      )}

      <Button onClick={handleSubmit} disabled={submit.isPending} size="lg">
        {submit.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        Continue
      </Button>
    </div>
  );
}
