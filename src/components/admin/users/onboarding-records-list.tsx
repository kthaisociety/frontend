"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useOnboardingRecords,
  useRetryOnboarding,
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

// A confirmed destructive/consequential action awaiting the admin's "yes" —
// set from a context-menu item, rendered by the single shared AlertDialog
// below (same lifted-state pattern as the applications table's delete
// confirmation), rather than nesting a dialog inside each menu.
type PendingAction = { kind: "restart" | "cancel"; record: OnboardingRecord };

function OnboardingRowContextMenu({
  record,
  onRetry,
  onRequestConfirm,
  isActionPending,
  children,
}: {
  record: OnboardingRecord;
  onRetry: (record: OnboardingRecord) => void;
  onRequestConfirm: (action: PendingAction) => void;
  isActionPending: boolean;
  children: React.ReactNode;
}) {
  const canRetry = record.state === "failed" || record.state === "kth_email_confirmed";
  const canRestart = record.state !== "complete";
  const canCancel = record.state !== "complete" && record.state !== "cancelled";
  const name = `${record.first_name} ${record.last_name}`;

  if (!canRetry && !canRestart && !canCancel) {
    return children;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>{name}</ContextMenuLabel>
        <ContextMenuSeparator />
        {canRetry && (
          <ContextMenuItem disabled={isActionPending} onClick={() => onRetry(record)}>
            <RotateCw className="mr-2 h-4 w-4" />
            Retry
          </ContextMenuItem>
        )}
        {canRestart && (
          <ContextMenuItem
            disabled={isActionPending}
            onClick={() => onRequestConfirm({ kind: "restart", record })}
          >
            Restart from scratch
          </ContextMenuItem>
        )}
        {canCancel && (
          <ContextMenuItem
            disabled={isActionPending}
            className="text-destructive focus:text-destructive"
            onClick={() => onRequestConfirm({ kind: "cancel", record })}
          >
            Cancel onboarding
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function OnboardingRecordsList() {
  const { data: records = [], isLoading, isError } = useOnboardingRecords();
  const { mutate: retryOnboarding, isPending: isRetrying } = useRetryOnboarding();
  const { mutate: cancelOnboarding, isPending: isCancelling } = useCancelOnboarding();
  const { mutate: restartOnboarding, isPending: isRestarting } = useRestartOnboarding();
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

  const isActionPending = isRetrying || isCancelling || isRestarting;

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
  const pendingName = pendingAction
    ? `${pendingAction.record.first_name} ${pendingAction.record.last_name}`
    : "";

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Right-click a row for retry/restart/cancel.</p>
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
                <OnboardingRowContextMenu
                  key={record.ID}
                  record={record}
                  onRetry={(r) => retryOnboarding(r.ID)}
                  onRequestConfirm={setPendingAction}
                  isActionPending={isActionPending}
                >
                  <TableRow className={isStale ? "bg-destructive/5" : undefined}>
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
                  </TableRow>
                </OnboardingRowContextMenu>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={pendingAction !== null} onOpenChange={(open) => !open && setPendingAction(null)}>
        <AlertDialogContent>
          {pendingAction?.kind === "restart" && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Restart onboarding for {pendingName}?</AlertDialogTitle>
                <AlertDialogDescription>
                  They&apos;ll get a new &quot;start onboarding&quot; email and need to reconfirm
                  their kth.se address. If an account already exists, it won&apos;t be duplicated.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isActionPending}
                  onClick={() => {
                    restartOnboarding(pendingAction.record.ID);
                    setPendingAction(null);
                  }}
                >
                  Yes, restart
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
          {pendingAction?.kind === "cancel" && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel onboarding for {pendingName}?</AlertDialogTitle>
                <AlertDialogDescription>
                  They won&apos;t receive any further onboarding emails. If a Google Workspace or
                  Mattermost account was already created, it needs to be cleaned up manually — this
                  doesn&apos;t touch either.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Never mind</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={isActionPending}
                  onClick={() => {
                    cancelOnboarding(pendingAction.record.ID);
                    setPendingAction(null);
                  }}
                >
                  Yes, cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
