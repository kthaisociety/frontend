"use client";
import { motion } from "framer-motion";
import { years } from "./history-content";
import { YearBox } from "./year-box";

export function Timeline() {
  return (
    <motion.div
      className="relative w-full h-[1400px] flex justify-center items-center bg-white"
      initial={{ opacity: 0, y: 100 }} // Start hidden below
      whileInView={{ opacity: 1, y: 0 }} // Slide up when in view
      transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of it is visible
    >
      <svg width="100%" height="100%" viewBox="0 0 1400 1300" className="absolute">
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1751A6" stopOpacity="0" />  
            <stop offset="50%" stopColor="#1751A6" stopOpacity="1" />
            <stop offset="100%" stopColor="#1751A6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Line Slides Up with Timeline */}
        <motion.path
          d="M1200,100 C800,400 800,900 0,900"
          stroke="url(#timelineGradient)"
          strokeWidth="4"
          fill="transparent"
          initial={{ pathLength: 0, opacity: 0 }} // Start hidden
          animate={{ pathLength: 1, opacity: 1 }} // Draw in
          transition={{ duration: 1.5, ease: "easeOut" }}
        />


      </svg>

      {/* Year Boxes Slide Up */}
      <div className="absolute w-full h-full">
        {years.map((year, index) => (
          <YearBox key={index} year={year} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
