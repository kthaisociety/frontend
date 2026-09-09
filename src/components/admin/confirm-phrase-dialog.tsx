"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Shared "type this exact phrase to confirm" guard for the handful of
// admin actions serious enough to need more than a click-through
// AlertDialog — originally built for closing the finalize recruitment
// phase, now also used for permanently deleting a member's account.
//
// Supports two ways of controlling when it's open: pass `trigger` for a
// self-contained dialog (used from finalize-recruitment-panel.tsx, where a
// visible button opens it directly), or omit `trigger` and pass `open` +
// `onOpenChange` instead for fully controlled use (used from a context-menu
// item in user-admin-panel.tsx, where there's no persistent trigger element
// for the dialog to anchor to — selecting the menu item just flips state
// that this component renders from).
export function ConfirmPhraseDialog({
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  title,
  description,
  phrase,
  isPending,
  onConfirm,
}: {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  phrase: string;
  isPending: boolean;
  onConfirm: () => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = trigger ? uncontrolledOpen : (controlledOpen ?? false);
  const setOpen = trigger ? setUncontrolledOpen : (controlledOnOpenChange ?? (() => {}));
  const [draft, setDraft] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setDraft("");
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={phrase}
        />
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={draft !== phrase || isPending}
            onClick={() => {
              onConfirm();
              setOpen(false);
              setDraft("");
            }}
          >
            {isPending ? "Working…" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
