"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  useOnboardingRecords,
  useCancelOnboarding,
  useRestartOnboarding,
  type OnboardingRecord,
} from "@/hooks/admin";

const STALE_AFTER_DAYS = 7;

const STATE_LABELS: Record<OnboardingRecord["state"], string> = {
  notified: "Notified",
  kth_email_submitted: "Email submitted",
  kth_email_confirmed: "Email confirmed",
  provisioned: "Provisioned",
  emailed: "Provisioned",
  complete: "Complete",
  failed: "Failed",
  cancelled: "Cancelled",
};

function daysSince(dateString: string): number {
  const created = new Date(dateString).getTime();
  return Math.floor((Date.now() - created) / (1000 * 60 * 60 * 24));
}

function StateBadge({ state }: { state: OnboardingRecord["state"] }) {
  if (state === "complete") return <Badge>{STATE_LABELS[state]}</Badge>;
  if (state === "failed") {
    return <Badge variant="destructive">{STATE_LABELS[state]}</Badge>;
  }
  if (state === "cancelled") {
    return <Badge variant="outline">{STATE_LABELS[state]}</Badge>;
  }
  return <Badge variant="secondary">{STATE_LABELS[state]}</Badge>;
}

function RecordActions({ record }: { record: OnboardingRecord }) {
  const { mutate: cancelOnboarding, isPending: isCancelling } = useCancelOnboarding();
  const { mutate: restartOnboarding, isPending: isRestarting } = useRestartOnboarding();
  const name = `${record.first_name} ${record.last_name}`;
  const isPending = isCancelling || isRestarting;

  const canRestart = record.state !== "complete";
  const canCancel = record.state !== "complete" && record.state !== "cancelled";

  if (!canRestart && !canCancel) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {canRestart && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" disabled={isPending}>
              Restart
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Restart onboarding for {name}?</AlertDialogTitle>
              <AlertDialogDescription>
                They&apos;ll get a new &quot;start onboarding&quot; email and
                need to reconfirm their kth.se address. If an account
                already exists, it won&apos;t be duplicated.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={isPending}
                onClick={() => restartOnboarding(record.ID)}
              >
                Yes, restart
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {canCancel && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              disabled={isPending}
            >
              Cancel
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel onboarding for {name}?</AlertDialogTitle>
              <AlertDialogDescription>
                They won&apos;t receive any further onboarding emails. If a
                Google Workspace or Mattermost account was already created,
                it needs to be cleaned up manually — this doesn&apos;t touch
                either.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Never mind</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={isPending}
                onClick={() => cancelOnboarding(record.ID)}
              >
                Yes, cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export function OnboardingRecordsList() {
  const { data: records = [], isLoading, isError } = useOnboardingRecords();

  if (isLoading) {
    return (
      <p className="py-4 text-sm text-muted-foreground">
        Loading onboarding records...
      </p>
    );
  }
  if (isError) {
    return (
      <p className="py-4 text-sm text-destructive">
        Failed to load onboarding records.
      </p>
    );
  }
  if (records.length === 0) {
    return (
      <p className="py-4 text-sm text-muted-foreground">
        No onboardings have been started yet.
      </p>
    );
  }

  const sorted = [...records].sort(
    (a, b) => new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime(),
  );

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Days pending</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((record) => {
            const days = daysSince(record.CreatedAt);
            const isStale =
              record.state !== "complete" &&
              record.state !== "cancelled" &&
              days >= STALE_AFTER_DAYS;
            return (
              <TableRow
                key={record.ID}
                className={isStale ? "bg-destructive/5" : undefined}
              >
                <TableCell className="font-medium">
                  {record.first_name} {record.last_name}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {record.kthais_email || record.kth_email || record.personal_email}
                </TableCell>
                <TableCell>{record.assigned_team}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {record.application_id ? "Recruitment" : "Manual"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <StateBadge state={record.state} />
                    {record.state === "failed" && record.failure_reason && (
                      <span className="text-xs text-muted-foreground">
                        {record.failure_reason}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className={isStale ? "font-medium text-destructive" : undefined}>
                  {days} {days === 1 ? "day" : "days"}
                  {isStale && " — needs follow-up"}
                </TableCell>
                <TableCell>
                  <RecordActions record={record} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
