"use client";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SpeakersButton() {
  return (
    <Button asChild>
      <Link href="/home">
        <span>Events</span>
      </Link>
    </Button>
  );
}

export function CollaborationButton() {
  return (
    <Button asChild>
      <Link href="/home">
        <span>Collaboration</span>
      </Link>
    </Button>
  );
}

export function SpeakerText() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";

  const isSmallScreen = isMobile || isTablet; // covers both tablet and mobile in the style

  // Define font sizes based on screen size
  const headingSize = isMobile ? "text-xl" : isTablet ? "text-3xl" : "text-4xl";
  const paragraphSize = isMobile
    ? "text-sm"
    : isTablet
      ? "text-base"
      : "text-xl";

  return (
    <div
      className={`max-w-lg p-4 mx-auto ${isSmallScreen ? "text-center" : "text-left"}`}
    >
      <h2 className={`font-bold text-[#1751A6] ${headingSize}`}>
        Want to join our speaker hall of fame?
      </h2>

      <p className={`mt-5 text-gray-1000 ${paragraphSize}`}>
        Over the years, we’ve had the privilege of hosting visionary speakers
        who are true leaders in the AI community. Do you have unique insights
        from founding a startup or experiences in the AI field that you’d like
        to share? We welcome a wide range of topics and are excited to add more
        influential voices to our speaker hall of fame. Are you ready to join
        us?
      </p>
      <div className="my-4 border-gray-300" />

      <p className={`mt-5 text-gray-1000 ${paragraphSize}`}>
        See the complete list of speakers, or get in touch if you are interested
        to become one.
      </p>
      <div className="my-4 border-gray-300" />

      <div
        className={`mt-8 flex gap-4 ${isSmallScreen ? "justify-center" : ""}`}
      >
        <SpeakersButton />
        <CollaborationButton />
      </div>
    </div>
  );
}
