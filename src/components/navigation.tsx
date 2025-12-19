"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { TextMorph } from "@/components/ui/text-morph";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change to "AIS" when scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      )}
    >
      <ProgressiveBlur
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
        height="100%"
        position="top"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-linear-to-b from-white/60 via-white/50 to-white/0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto py-4 px-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left side: Logo + Text */}
          <Link href="/">
            <div className="flex items-center gap-2">
              {/* AI Logo SVG */}
              <Image
                src="/kthais-logo.svg"
                alt="KTH AIS Logo"
                width={40}
                height={40}
                className="h-8 w-8"
              />

              {/* Text with morph animation */}
              <TextMorph
                as="span"
                className="text-3xl  tracking-tight text-foreground"
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 10,
                  mass: 0.3,
                }}
              >
                {isScrolled ? "KTH AIS" : "KTH AI Society"}
              </TextMorph>
            </div>
          </Link>
          {/* Right side: Navigation Links */}
           <div className="items-center gap-8 hidden md:flex ">
            <Link
              href="/events"
              className="text-md font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Events
            </Link>
            <Link
              href="/projects"
              className="text-md font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <a
              href="#team"
              className="text-md font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Job Board
            </a>
            <a
              href="#contact"
              className="text-md font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-md font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div> 
        </div>
      </div>
    </nav>
  );
}
