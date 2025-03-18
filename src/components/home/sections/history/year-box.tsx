import { motion } from "framer-motion";
import Image from "next/image";
import { useMobileLayout } from "@/hooks/use-mobile";

export function YearBox({ year, index, totalYears }) {
  const isMobile = useMobileLayout();

  // For mobile, we use a fixed left value and ignore any calculated horizontal translation.
  const mobileTop =
    isMobile && totalYears
      ? `${(100 / (totalYears + 1)) * (index + 1)}%`
      : year.position.top;

  return (
     <motion.div
      className="absolute flex flex-col"
      style={{
        top: isMobile ? mobileTop : year.position.top,
        left: isMobile ? "" : year.position.left,
        transform: !isMobile ? "translate(-50%, -50%)" : undefined,

      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* 
        1) Fixed container so year card & text align on the same left edge.
        2) We set a width so that on mobile, the left edge is consistent.
      */}
      <div
        className="relative flex flex-col items-start"
        style={{
          width: isMobile ? "150px" : "200px", // Adjust to your preference
        }}
      >
        {/* Year Card (blue box) */}
        <div
          className="shadow-lg rounded-xl flex items-center justify-center font-bold text-lg bg-[#1751A6] text-white"
          style={{
            width: "100%",           // Fill the container’s width
            height: isMobile ? "50px" : "60px",
          }}
        >
          <h3>{year.year}</h3>
        </div>

        {/* Activities */}
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
              {/* Text: left edge matches year card (because we’re in the same container) */}
              <p className="text-sm font-medium text-[#1751A6] bg-white px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                {activity.description}
              </p>

              {/* Logo: offset to the right by a gap-2 */}
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
