"use client";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/use-breakpoint";

export function Hero() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isSmallScreen = isMobile || isTablet;

  const logoWidthClass = isSmallScreen
    ? "w-[200px]"
    : "w-[450px]";

  const typewriterTextSize = isSmallScreen
    ? "text-lg"
    : "text-2xl";

  return (
    <section className="w-full h-screen bg-background text-primary-foreground flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-no-repeat bg-cover opacity-100"
        style={{
          backgroundImage: "url('/images/brand_assets/ais-symbol-blurred-004.jpg')",
          backgroundSize: "150%",
        }}
      />

      {/* Logo */}
      <div className="relative flex items-center justify-center z-10">
        <Image
          src="/images/brand_assets/ais-logo-white-nobg.png"
          alt="AI Society Logo"
          width={0}
          height={0}
          sizes="(max-width: 640px) 120px, (max-width: 768px) 200px, 450px"
          className={`opacity-100 ${logoWidthClass}`}
        />
      </div>

      {/* Typing Text */}
      <div className={`mt-4 font-mono relative z-10 ${typewriterTextSize}`}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("<>Cultivating ")
              .pauseFor(200)
              .typeString("the gene ")
              .pauseFor(400)
              .deleteChars(5)
              .pauseFor(300)
              .typeString("next generation of AI leaders</>")
              .start();
          }}
          options={{
            autoStart: true,
            loop: false,
            delay: 35,
            deleteSpeed: 30,
          }}
        />
      </div>
    </section>
  );
}
