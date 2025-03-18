"use client";
import { useScrollProgress } from "@/hooks/use-scroll";
import { Timeline } from "./history/history-timeline";
// import { SpeakerHof } from "./speakers/speaker-hof"; // If needed

export function ScrollEffect() {
  const scrollProgress = useScrollProgress();

  return (
    <section
      className="absolute top-0 left-0 w-full h-screen bg-white z-10"
      style={{
        transform: `translate3d(0, ${(1 - scrollProgress) * 100}%, 0)`,
      }}
    >

    </section>
  );
}
