'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import NumberFlow from '@number-flow/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface TimelineEvent {
  year: number;
  heading: string;
  description: string;
  image: string;
  imageAlt?: string;
}

export interface HistoryTimelineProps {
  title?: string;
  introText?: string;
  events: TimelineEvent[];
  defaultYear?: number;
  className?: string;
}

export function HistoryTimeline({
  title: _title = 'OUR HISTORY',
  introText: _introText = 'ZCMC, and the Kajaran deposit, has a long standing history...',
  events,
  defaultYear,
  className,
}: HistoryTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => b.year - a.year);
  const initialYear = defaultYear ?? sortedEvents[0]?.year ?? 0;
  const [selectedYear, setSelectedYear] = useState(initialYear);
  
  const selectedEvent = sortedEvents.find(e => e.year === selectedYear) ?? sortedEvents[0];

  const handleYearClick = (year: number) => {
    if (year === selectedYear) return;
    setSelectedYear(year);
  };

  return (
    <div className={cn('w-full py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Content Panel */}
        <div className="lg:col-span-4 flex flex-col">
       
          {/* Large Year Number with NumberFlow Animation */}
          <div className="relative mb-6 h-32 flex items-start">
            <NumberFlow
              value={selectedEvent.year}
              format={{ minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: false }}
              className="text-8xl font-serif text-foreground leading-none"
            />
          </div>

          {/* Main Heading */}
          <motion.h2
            key={`${selectedEvent.year}-heading`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-xl md:text-2xl  text-foreground  mb-4 tracking-tight"
          >
            {selectedEvent.heading}
          </motion.h2>

          {/* Descriptive Text */}
          <motion.p
            key={`${selectedEvent.year}-description`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6 flex flex-col justify-start items-start gap-2"
          >
            {selectedEvent.description}
            <Button asChild variant="default">
              <Link href="/about">Our full history</Link>
            </Button>
          </motion.p>
        </div>

        {/* Central Timeline */}
        <div className="lg:col-span-1 flex justify-center lg:justify-start relative">
          <div className="relative flex flex-col items-center h-full min-h-[400px] lg:min-h-[500px]">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 w-px left-[5.5px]" style={{ backgroundColor: 'var(--color-secondary-gray)' }} />
            
            {/* Year Markers */}
            <div className="relative flex flex-col justify-between h-full py-4">
              {sortedEvents.map((event, index) => {
                const isActive = event.year === selectedYear;
                const position = (index / (sortedEvents.length - 1)) * 100;
                
                return (
                  <button
                    key={event.year}
                    type="button"
                    onClick={() => handleYearClick(event.year)}
                    className={cn(
                      'relative z-10 flex items-center gap-4 group cursor-pointer',
                      'transition-all duration-300',
                    )}
                    style={{ 
                      position: 'absolute',
                      top: `${position}%`,
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {/* Dot */}
                    <div className="relative">
                      {/* Outer circle (active state) */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute inset-0 rounded-full border-2"
                          style={{ 
                            width: '20px',
                            height: '20px',
                            margin: '-4px',
                            borderColor: 'var(--color-primary)',
                          }}
                        />
                      )}
                      
                      {/* Inner dot */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.2 : 1,
                          backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-secondary-gray)',
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-3 h-3 rounded-full"
                      />
                    </div>

                    {/* Year Label */}
                    <motion.span
                      animate={{
                        fontWeight: isActive ? 600 : 400,
                      }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        'text-sm md:text-base select-none',
                        isActive ? 'text-foreground font-semibold' : 'text-secondary-gray'
                      )}
                    >
                      {event.year}
                    </motion.span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-7 flex flex-col">
         
          {/* Image Display */}
          <div className="relative w-full aspect-3/2 ">
            <motion.div
              key={selectedEvent.year}
              className="relative w-full h-full rounded-3xl border overflow-hidden"
            >
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.imageAlt ?? `Historical image from ${selectedEvent.year}`}
                fill
                className="object-cover rounded-3xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
