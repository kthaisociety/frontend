"use client";
import { useScrollProgress } from "@/hooks/use-scroll";
import { Timeline } from "./history/history-timeline";
import { HistoryText } from "./history/history-text";
import { Intro } from "./intro/introduction";
import { SpeakerHof } from "./speakers/speaker-hof";
import { SpeakerText } from "./speakers/speaker-text";
import { useBreakpoint } from "@/hooks/use-breakpoint";

export function ScrollEffect() {
  const scrollProgress = useScrollProgress();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isSmallScreen = isMobile || isTablet;

  return (
    <section
      className="absolute top-0 left-0 w-full h-screen bg-white z-10"
      style={{
        transform: `translateY(${(1 - scrollProgress) * 100}%)`,
      }}
    >
      {/* Intro Section */}
      <div>
        <Intro />
      </div>

      {/* History Section */}
      <div className="relative w-full min-h-fit">
      {isSmallScreen ? (
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

      {/* Speakers Section */}
      <div className="relative w-full h-full">
        {isSmallScreen ? (
          <div className="flex flex-col items-center pt-16">
            <SpeakerText />
            <SpeakerHof />
          </div>
        ) : (
          <div className="absolute inset-0 flex translate-y-8">
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
