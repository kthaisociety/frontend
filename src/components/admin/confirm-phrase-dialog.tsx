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
export function ConfirmPhraseDialog({
  trigger,
  title,
  description,
  phrase,
  isPending,
  onConfirm,
}: {
  trigger: React.ReactNode;
  title: string;
  description: React.ReactNode;
  phrase: string;
  isPending: boolean;
  onConfirm: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setDraft("");
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
