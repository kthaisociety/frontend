"use client";

import { useState, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { APPLICATION_TEAMS, APPLICATION_TEAM_LABELS } from "@/types/applications";
import { useCreateManualOnboarding } from "@/hooks/admin";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  assignedTeam: string;
};

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  assignedTeam: "",
};

function Req() {
  return <span className="text-destructive ml-0.5">*</span>;
}

// Mirrors the backend's isValidEmail (general_application_handler.go) —
// same minimal shape check, not a full RFC validator, kept consistent with
// what the backend will actually accept. Requires every dot-separated
// domain label to be non-empty (at least two labels) — merely checking for
// a "." anywhere in the domain let "a@b." and "a@." through.
function isValidEmail(email: string): boolean {
  if (email === "" || /\s/.test(email)) return false;
  const parts = email.split("@");
  if (parts.length !== 2 || parts[0] === "") return false;
  const domainLabels = parts[1].split(".");
  return domainLabels.length >= 2 && domainLabels.every((label) => label !== "");
}

export function ManualOnboardingForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const { mutate: createOnboarding, isPending } = useCreateManualOnboarding();

  const handleChange =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const normalized = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    assignedTeam: form.assignedTeam,
  };

  const isValid =
    normalized.firstName !== "" &&
    normalized.lastName !== "" &&
    isValidEmail(normalized.email) &&
    normalized.assignedTeam !== "";

  const handleConfirm = () => {
    createOnboarding(normalized, { onSuccess: onClose });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>
            First Name <Req />
          </Label>
          <Input value={form.firstName} onChange={handleChange("firstName")} />
        </div>
        <div className="space-y-2">
          <Label>
            Last Name <Req />
          </Label>
          <Input value={form.lastName} onChange={handleChange("lastName")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Email <Req />
        </Label>
        <Input type="email" value={form.email} onChange={handleChange("email")} />
      </div>

      <div className="space-y-2">
        <Label>
          Team <Req />
        </Label>
        <Select
          value={form.assignedTeam}
          onValueChange={(val) =>
            setForm((prev) => ({ ...prev, assignedTeam: val }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {APPLICATION_TEAMS.map((team) => (
              <SelectItem key={team} value={team}>
                {APPLICATION_TEAM_LABELS[team]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={!isValid || isPending}>
              {isPending ? "Starting…" : "Start Onboarding"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Onboard {normalized.firstName} {normalized.lastName}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will create a real @kthais.com Workspace account and
                Mattermost invite for this person. Continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={isPending} onClick={handleConfirm}>
                Yes, start onboarding
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
