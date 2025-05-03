"use client";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EventsButton() {
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

export function HistoryText() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isSmallScreen = isMobile || isTablet;

  const headingSize = isMobile ? "text-xl" : isTablet ? "text-3xl" : "text-4xl";
  const paragraphSize = isMobile ? "text-sm" : isTablet ? "text-base" : "text-xl";

  return (
    <div className={`max-w-lg p-4 mx-auto ${isSmallScreen ? "text-center" : "text-left"}`}>
      <h2 className={`font-bold text-[#1751A6] ${headingSize}`}>
        5+ years of Excellence
      </h2>

      <p className={`mt-5 text-gray-1000 ${paragraphSize}`}>
        Since our founding in 2018, AI Society has been organizing events with industry leaders. We host workshops,
        lectures, hackathons and more for anyone wanting to join our AI community at KTH.
      </p>

      <p className={`mt-5 text-gray-1000 ${paragraphSize}`}>
        Are you a student interested in joining our upcoming events? Or perhaps an industry professional looking to collaborate?
      </p>

      <div className={`mt-8 flex gap-4 ${isSmallScreen ? "justify-center" : ""}`}>
        <EventsButton />
        <CollaborationButton />
      </div>
    </div>
  );
}
