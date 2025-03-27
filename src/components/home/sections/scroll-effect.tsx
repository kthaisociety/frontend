"use client";
import { useScrollProgress } from "@/hooks/use-scroll";
import { Timeline } from "./history/history-timeline";
import { HistoryText } from "./history/history-text";
import { useMobileLayout } from "@/hooks/use-mobile";
import { Intro } from "./intro/introduction";
import { SpeakerHof } from "./speakers/speaker-hof";
import { SpeakerText } from "./speakers/speaker-text";

export function ScrollEffect() {
  const scrollProgress = useScrollProgress();
  const isMobile = useMobileLayout();

  return (
    <section
      className="absolute top-0 left-0 w-full h-screen bg-white z-10"
      style={{
        transform: `translateY(${(1 - scrollProgress) * 100}%)`,
      }}
    >
      <div>
        <Intro />
      </div>
      
      {/* History Section */}
      <div className="relative w-full ">
        {isMobile ? (
          <>
            <HistoryText />
            <Timeline />
          </>
        ) : (
          <>
            <Timeline />
            <div className="absolute top-10 left-20 z-20">
              <HistoryText />
            </div>
          </>
        )}
      </div>

      {/* Speakers Section with added spacing */}
      <div className="relative w-full h-full">
        {isMobile ? (
          // For mobile, add top padding to create space
          <div className="flex flex-col items-center pt-16">
            <SpeakerText />
            <SpeakerHof />
          </div>
        ) : (
          // For desktop, shift the container down with a translation
          // BUG: 
          <div className="absolute inset-0 flex translate-y-16">
            <div className="w-1/2 flex items-center justify-center">
              <SpeakerHof />
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <SpeakerText />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
