"use client";
import { useMobileLayout } from "@/hooks/use-mobile";
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
  const isMobile = useMobileLayout();

  return (
    <div className={`max-w-lg p-4 mx-auto ${isMobile ? "text-center" : "text-left"}`}>
      <h2 className="text-2xl md:text-4xl font-bold text-[#1751A6]">
        5+ years of Excellence
      </h2>
      <p className="mt-5 text-base md:text-xl text-gray-1000">
        Since our founding in 2018, AI Society has been organizing events with industry leaders. We host workshops,
        lectures, hackathons and more for anyone wanting to join our AI community at KTH.
      </p>
      <div className="my-4 border-gray-300" />
      <p className="text-base md:text-xl text-gray-1000">
        Are you a student interested in joining our upcoming events? Or perhaps an industry professional looking to collaborate?
      </p>
      <div className="my-8 border-gray-300" />
      <div className={`flex gap-4 ${isMobile ? "justify-center" : ""}`}>
        <EventsButton />
        <CollaborationButton />
      </div>
    </div>
  );
}
