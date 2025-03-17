"use client";
import Typewriter from "typewriter-effect";
import Image from "next/image";

export function Hero() {
  return (
    <section 
    className="w-full h-screen bg-background text-primary-foreground flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-no-repeat bg-cover opacity-100"
        style={{
          backgroundImage: "url('/images/brand_assets/ais-symbol-blurred-004.jpg')",
          backgroundSize: "150%", // Controls zoom level, adjust as needed
        }}
      />

      {/* Static Title with Small Logo on the Top-Right */}
      <div className="relative flex items-center justify-center z-10">
        <Image
          src="/images/brand_assets/ais-logo-white-nobg.png"
          alt="AI Society Logo"
          width={400}  // Adjust size as needed
          height={400} // Adjust size as needed
          className="opacity-90"
        />
      </div>

      {/* Typing Effect with Natural Corrections, DISCLAIMER! this is not in the correct font following design portfolio*/}
      <div className="mt-4 text-lg sm:text-xl md:text-2xl font-mono relative z-10"> 
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("<>Cultivating ")
              .pauseFor(200)
              .typeString("the gene ")
              .pauseFor(400)
              .deleteChars(5) // Delete "next "
              .pauseFor(300)
              .typeString("next generation of AI leaders</>") // Full sentence
              .start();
          }}
          options={{
            autoStart: true,
            loop: false,
            delay: 35, // Typing speed
            deleteSpeed: 30, // Speed of backtracking
          }}
        />
      </div>
    </section>
  );
}
