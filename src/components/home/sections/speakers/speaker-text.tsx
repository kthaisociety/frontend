"use client";
import { useMobileLayout } from "@/hooks/use-mobile";
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
  const isMobile = useMobileLayout();

  return (
    <div className={`max-w-lg p-4 mx-auto ${isMobile ? "text-center" : "text-left"}`}>
      <h2 className="text-2xl md:text-4xl font-bold text-[#1751A6]">
        Want to join our speaker hall of fame? 
      </h2>
      <p className="mt-5 text-base md:text-xl text-gray-1000">
      Over the years, we’ve had the privilege of hosting visionary speakers who are true leaders in the AI community. 
      Do you have unique insights from founding a startup or experiences in the AI field that you’d like to share? 
      We welcome a wide range of topics and are excited to add more influential voices to our speaker hall of fame. 
      Are you ready to join us?
      </p>
      <div className="my-4 border-gray-300" />
      <p className="text-base md:text-xl text-gray-1000">
        See the complete list of speakers, or get in touch if you are interesting to become one. 
      </p>
      <div className="my-8 border-gray-300" />
      <div className={`flex gap-4 ${isMobile ? "justify-center" : ""}`}>
        <SpeakersButton />
        <CollaborationButton />
      </div>
    </div>
  );
}
