"use client";
import { useBreakpoint } from "@/hooks/use-breakpoint";

export function Intro() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isSmallScreen = isMobile || isTablet;

  const containerClass = isSmallScreen
    ? "max-w-2xl mx-auto text-center px-4"
    : "max-w-4xl mx-0 text-left pl-8";

  const headingSize = isMobile
    ? "text-2xl"
    : isTablet
      ? "text-4xl"
      : "text-5xl";
  const paragraphSize = isMobile
    ? "text-sm"
    : isTablet
      ? "text-base"
      : "text-lg";

  return (
    <section className="w-full py-12 bg-white">
      <div className={containerClass}>
        <h1 className={`font-bold text-[#1751A6] ${headingSize}`}>
          Welcome to KTH AI Society
        </h1>
        <p className={`mt-4 text-gray-700 ${paragraphSize}`}>
          We are a participatory society for anyone into AI at KTH Royal
          Institute of Technology.
        </p>
      </div>
    </section>
  );
}
