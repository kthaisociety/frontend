"use client";
import { motion } from "framer-motion";
import { years } from "./history-content";
import { YearBox } from "./year-box";
import { useBreakpoint } from "@/hooks/use-breakpoint";

export function Timeline() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isSmallScreen = isMobile || isTablet;

  return (
    <motion.div
      className="relative w-full bg-white py-16 overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* DESKTOP: Curved Timeline with YearBoxes */}
      {!isSmallScreen && (
        <div className="relative w-full h-screen ">
          {/* Curved SVG line */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1500 1000"
            preserveAspectRatio="none"
            className="absolute"
          >
            <defs>
              <linearGradient
                id="timelineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#1751A6" stopOpacity="0" />
                <stop offset="50%" stopColor="#1751A6" stopOpacity="1" />
                <stop offset="100%" stopColor="#1751A6" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d="M1300,200 C500,400 1000,1000 0,1000"
              stroke="url(#timelineGradient)"
              strokeWidth="4"
              fill="transparent"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>

          {/* YearBoxes using map positioning */}
          {years.map((year, index) => (
            <YearBox
              key={index}
              year={year}
              index={index}
              totalYears={years.length}
            />
          ))}
        </div>
      )}

      {/* MOBILE/TABLET: Vertical Timeline with YearBoxes */}
      {isSmallScreen && (
        <div className="relative w-full min-h-[1000px] flex flex-col items-center">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 w-[4px] left-[26%] transform -translate-x-1/2 bg-gradient-to-b from-transparent via-[#1751A6] to-transparent z-0" />

          {/* YearBoxes stacked by percentage-based top positioning */}
          {years.map((year, index) => (
            <YearBox
              key={index}
              year={year}
              index={index}
              totalYears={years.length}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
