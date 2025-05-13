"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/use-breakpoint";

interface YearBoxProps {
  year: {
    year: string;
    position: { top: string; left: string };
    activities: { logo: string; description: string }[];
  };
  index: number;
  totalYears: number;
}

export function YearBox({ year, index, totalYears }: YearBoxProps) {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isSmallScreen = isMobile || isTablet;

  const mobileTop =
    isSmallScreen && totalYears
      ? `${(100 / (totalYears + 0.2)) * (index + 0.2)}%`
      : year.position.top;

  return (
    <motion.div
      className="absolute flex flex-col"
      style={{
        top: isSmallScreen ? mobileTop : year.position.top,
        left: isSmallScreen ? "" : year.position.left,
        transform: !isSmallScreen ? "translate(-50%, -50%)" : undefined,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className="relative flex flex-col items-start"
        style={{
          width: isSmallScreen ? "150px" : "200px",
        }}
      >
        <div
          className="shadow-lg rounded-xl flex items-center justify-center font-bold text-lg bg-[#1751A6] text-white"
          style={{
            width: isSmallScreen ? "70%" : "100%",
            height: isSmallScreen ? "40px" : "60px",
          }}
        >
          <h3>{year.year}</h3>
        </div>

        <div className="mt-4 flex flex-col gap-3 w-full">
          {year.activities.map((activity, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-[#1751A6] bg-white px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                {activity.description}
              </p>
              <div className="w-8 h-8 flex-shrink-0">
                <Image
                  src={activity.logo}
                  alt="Activity Logo"
                  width={32}
                  height={32}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
