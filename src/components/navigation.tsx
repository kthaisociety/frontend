'use client';

import { useEffect, useState } from 'react';
import { TextMorph } from '@/components/ui/text-morph';
import { cn } from '@/lib/utils';
import Image from 'next/image'; 

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change to "AIS" when scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/40'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Logo + Text */}
          <div className="flex items-center gap-2">
            {/* AI Logo SVG */}
            <Image src="/kthais-logo.svg" alt="KTH AIS Logo" width={40} height={40} className="h-8 w-8"/>

            {/* Text with morph animation */}
            <TextMorph
              as="span"
              className="text-3xl  tracking-tight text-foreground"
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 10,
                mass: 0.3,
              }}
            >
              {isScrolled ? 'AIS' : 'AI Society'}
            </TextMorph>
          </div>

          {/* Right side: Navigation Links */}
          <div className="flex items-center gap-8">
            <a
              href="#about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#events"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Events
            </a>
            <a
              href="#team"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
