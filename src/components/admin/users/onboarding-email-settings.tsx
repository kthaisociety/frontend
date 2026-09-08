"use client";

import { useState } from "react";
import { ChevronDown, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useOnboardingEmailSettings,
  useUpdateOnboardingEmailSettings,
  usePreviewOnboardingEmailSettings,
} from "@/hooks/admin";

const DEFAULT_INTRO_TEXT = "Congratulations on being accepted to KTH AI Society!";

// Renders by calling the backend, which builds it the exact same way the real
// "start your onboarding" email is built — so this can never drift from the
// real email the way a hand-rolled client-side mockup could.
function OnboardingEmailPreviewDialog({ introText }: { introText: string }) {
  const preview = usePreviewOnboardingEmailSettings();

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          preview.mutate({ intro_text: introText || DEFAULT_INTRO_TEXT });
        } else {
          preview.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" size="lg">
          <Eye className="h-4 w-4" />
          Preview email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Start-onboarding email preview</DialogTitle>
          <DialogDescription>
            {preview.data
              ? `Subject: ${preview.data.subject}`
              : "Rendered server-side by the same code that sends the real email."}
          </DialogDescription>
        </DialogHeader>
        {preview.isPending && <Skeleton className="h-[500px] w-full" />}
        {preview.isError && (
          <p className="text-sm text-destructive">Couldn&apos;t render the preview. Try again.</p>
        )}
        {preview.data && (
          <iframe
            title="Start-onboarding email preview"
            srcDoc={preview.data.html}
            sandbox=""
            className="h-[500px] w-full rounded-md border bg-white"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function OnboardingEmailSettingsPanel() {
  const { data: settings, isLoading } = useOnboardingEmailSettings();
  const updateSettings = useUpdateOnboardingEmailSettings();
  const [open, setOpen] = useState(false);
  const [introText, setIntroText] = useState("");
  const [initialised, setInitialised] = useState(false);

  const savedIntroText = settings ? settings.intro_text || DEFAULT_INTRO_TEXT : "";

  if (settings && !initialised) {
    setIntroText(savedIntroText);
    setInitialised(true);
  }

  const isDirty = initialised && introText !== savedIntroText;

  function handleSave() {
    updateSettings.mutate({ intro_text: introText });
  }

  // Collapsing with unsaved edits discards them — reverting to the last
  // saved value here (rather than leaving it sitting in memory) means
  // there's never an invisible unsaved draft lingering after you close this.
  function handleToggle() {
    if (open && isDirty) {
      setIntroText(savedIntroText);
    }
    setOpen((v) => !v);
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer select-none" onClick={handleToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Settings className="h-4 w-4" />
            Start-onboarding email
          </CardTitle>
          <ChevronDown
            className="h-4 w-4 text-muted-foreground transition-transform"
            style={{ transform: open ? "rotate(180deg)" : undefined }}
          />
        </div>
        {!open && (
          <CardDescription>
            The message a new member sees first, right after they&apos;re accepted. Click to view or edit.
          </CardDescription>
        )}
      </CardHeader>
      {open && (
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <>
              <CardDescription>
                The greeting and the numbered next-steps list are added automatically — just write the
                paragraph that goes in between. Use{" "}
                <code className="rounded bg-muted px-1 text-xs">{"{{first_name}}"}</code> to address the
                new member by name.
              </CardDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="onboarding-intro-text">Intro message</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto py-0 text-xs"
                    onClick={() => setIntroText(DEFAULT_INTRO_TEXT)}
                  >
                    Reset to default message
                  </Button>
                </div>
                <Textarea
                  id="onboarding-intro-text"
                  placeholder={DEFAULT_INTRO_TEXT}
                  className="min-h-[120px] resize-y font-mono text-sm"
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <OnboardingEmailPreviewDialog introText={introText} />
                <Button variant="outline" disabled={!isDirty || updateSettings.isPending} onClick={handleSave}>
                  {updateSettings.isPending ? "Saving…" : isDirty ? "Save changes" : "Saved"}
                </Button>
                {isDirty && !updateSettings.isPending && (
                  <span className="text-xs text-muted-foreground">
                    Unsaved - collapsing this without saving will discard your changes.
                  </span>
                )}
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}
