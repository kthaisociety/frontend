"use client";
import { useState } from "react";
import Image from "next/image";
import { speakers } from "./speaker-content";
import { useMobileLayout } from "@/hooks/use-mobile";

export function SpeakerHof() {
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);
  const isMobile = useMobileLayout();

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center bg-white"
      style={{
        transform: isMobile ? "scale(0.5)" : "none", // Scale down 90% on mobile
        transformOrigin: "center",
      }}
    >
      {/* Circular Path */}
      <div className="relative w-[750px] h-[750px] flex items-center justify-center">
        {/* Visible Circle Outline */}
        <div className="absolute w-[500px] h-[500px] border-[3px] border-[#1751A6] rounded-full"></div>

        {/* Logo in the Center */}
        <div className="absolute w-[140px] h-[140px] bg-primary rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/brand_assets/ais-symbol-white/blue.jpg"
            alt="AI Society Logo"
            width={140} // Matches div width
            height={140} // Matches div height
            className="object-cover w-full h-full"
          />
        </div>

        {/* Speaker Cards */}
        {speakers.map((speaker, index) => {
          const angle = (index / speakers.length) * (2 * Math.PI);
          const radius = 280;
          const x = Math.round(Math.cos(angle) * radius); // Ensures consistent float values
          const y = Math.round(Math.sin(angle) * radius);

          return (
            <div
              key={speaker.name}
              onMouseEnter={() => setHoveredSpeaker(speaker.name)}
              onMouseLeave={() => setHoveredSpeaker(null)}
              className={`absolute bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center transform transition-all duration-300 ${
                hoveredSpeaker === speaker.name ? "scale-110 z-20 shadow-2xl" : "scale-100"
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`, // Now rounded to prevent mismatches
                width: `${hoveredSpeaker === speaker.name ? 180 : 160}px`,
                height: `${hoveredSpeaker === speaker.name ? 200 : 180}px`,
              }}
            >
              {/* Image - Enlarges on hover */}
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={hoveredSpeaker === speaker.name ? 100 : 80} // Image grows on hover
                height={hoveredSpeaker === speaker.name ? 100 : 80}
                className="rounded-full transition-all duration-300"
              />

              {/* Name & Title - Does NOT change size */}
              <h3 className="mt-2 text-sm font-bold text-primary">{speaker.name}</h3>
              <p className="text-xs">{speaker.title}</p>

              {/* Event Info - Only visible on hover */}
              {hoveredSpeaker === speaker.name && (
                <div className="absolute bottom-[-40px] bg-[#1751A6] text-white text-xs px-2 py-1 rounded-md transition-all duration-300">
                  {speaker.event}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
