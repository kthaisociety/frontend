import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export function YearBox({ year, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="absolute"
      style={{
        top: year.position.top,
        left: year.position.left,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, y: 50 }} // Start hidden
      whileInView={{ opacity: 1, y: 0 }} // Slide up when visible
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }} // Staggered effect
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Year Card */}
      <div
        className={`w-[180px] h-[80px] shadow-lg rounded-xl flex flex-col items-center justify-center font-bold text-lg 
        transition-all duration-300 ease-in-out ${
          hovered ? "bg-[#1751A6] text-white scale-110 shadow-2xl opacity-85" : "bg-[#1751A6] text-white scale-100 opacity-100"
        }`}
      >
        <h3>{year.year}</h3>
      </div>

      {/* Activities Appear Below When Hovered */}
      {hovered &&
        year.activities.map((activity, i) => (
          <motion.div
            key={i}
            className="absolute left-1 opacity-0 translate-y-4"
            style={{
              top: `calc(120% + ${i * 50}px)`, // Increased spacing below the card
              transform: "translateX(-80%)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.2 }} // Staggered drop effect
          >
            <div className="flex items-center gap-2">
              <Image src={activity.logo} alt="Activity Logo" width={30} height={30} className="rounded-full" />
              <p className="text-sm font-medium text-[#1751A6] bg-white px-2 py-1 rounded-md shadow-md whitespace-nowrap">
  {activity.description}
</p>

            </div>
          </motion.div>
        ))}
    </motion.div>
  );
}
