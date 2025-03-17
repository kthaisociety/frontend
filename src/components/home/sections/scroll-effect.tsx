"use client"; // Needed for client-side hooks
import { SpeakerHof } from "./speakers/speaker-hof";
import { Timeline } from "./history/history-timeline";
import { useEffect, useState } from "react";

export function ScrollEffect() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="absolute top-0 left-0 w-full h-screen bg-white z-10 transition-all duration-300"
      style={{
        transform: `translateY(${(1 - scrollProgress) * 100}%)`,
      }}
    >
      <div className="flex items-center justify-center h-full">
         {/* Add the speaker hall of fame section here */}
        <SpeakerHof /> 
        </div>
        <div className="flex items-center justify-center h-full">

          
        <Timeline/>
      </div>
    </section>
  );
}
