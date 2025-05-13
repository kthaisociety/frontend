"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Mock data for testing
// will be replaced with actual data from the db
export const mockEvents = [
  {
    id: "1",
    title: "AI Workshop: Introduction to Machine Learning",
    description: "Join us for an introductory workshop on machine learning fundamentals. Perfect for beginners!",
    date: "2025-05-15",
    time: "14:00 - 16:00",
    location: "KTH Campus, Room 123",
    capacity: 30,
    image: "/images/events/ml-workshop.jpg",
    collaborators: [
      { name: "KTH AI", logo: "/images/collaborators/kth-ai.png" }
    ]
  },
  {
    id: "2",
    title: "Tech Talk: The Future of AI",
    description: "An exciting discussion about the latest trends and future developments in artificial intelligence.",
    date: "2024-03-20",
    time: "16:00 - 18:00",
    location: "KTH Library, Conference Room",
    capacity: 50,
    image: "/images/events/ai-talk.jpg",
    collaborators: [
      { name: "KTH Innovation", logo: "/images/collaborators/kth-innovation.png" }
    ]
  },
  {
    id: "3",
    title: "Hackathon: AI Solutions for Sustainability",
    description: "A 24-hour hackathon focused on using AI to solve sustainability challenges.",
    date: "2024-04-01",
    time: "10:00 - 10:00",
    location: "KTH Innovation Hub",
    capacity: 100,
    image: "/images/events/hackathon.jpg",
    collaborators: [
      { name: "Ericsson", logo: "/images/collaborators/ericsson.png" }
    ]
  },
  {
    id: "4",
    title: "Networking Event: AI Industry Meetup",
    description: "Connect with industry professionals and fellow AI enthusiasts.",
    date: "2024-04-10",
    time: "17:00 - 19:00",
    location: "KTH Main Building",
    capacity: 75,
    image: "/images/events/networking.jpg",
    collaborators: [
      { name: "KTH Career", logo: "/images/collaborators/kth-career.png" }
    ]
  },
  {
    id: "5",
    title: "Workshop: Deep Learning with PyTorch",
    description: "Hands-on workshop covering deep learning concepts using PyTorch.",
    date: "2024-04-15",
    time: "13:00 - 17:00",
    location: "KTH Computer Lab 2",
    capacity: 25,
    image: "/images/events/pytorch.jpg",
    collaborators: [
      { name: "KTH Computer Science", logo: "/images/collaborators/kth-cs.png" }
    ]
  }
];

// Format date consistently
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getEventStatus(date: string, time: string): { status: "upcoming" | "past"; label: string } {
  const eventDateTime = new Date(`${date}T${time.split(" - ")[0]}`);
  const now = new Date();
  
  if (eventDateTime < now) {
    return { status: "past", label: "Past Event" };
  }
  return { status: "upcoming", label: "Upcoming" };
}

export function EventsView() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state - remove this in production
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to the latest event (leftmost) when component mounts
  useEffect(() => {
    if (scrollContainerRef.current && !isLoading) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12 flex flex-col items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-12">Upcoming Events</h1>
      
      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto pb-6 pt-2 -mt-2 scrollbar-none scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex gap-6 min-w-min px-1">
          {[...mockEvents]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((event) => {
              if (!event?.date || !event?.time) return null;
              const { status, label } = getEventStatus(event.date, event.time);
              
              return (
                <Link 
                  href={`/events/${event.id}`} 
                  key={event.id}
                  className="block w-[350px] flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Card className="h-full flex flex-col">
                    {/* Event Image with Status Badge */}
                    <div className="relative w-full h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge 
                          variant={status === "upcoming" ? "default" : "secondary"}
                          className="flex items-center gap-1"
                        >
                          {status === "upcoming" ? (
                            <Clock className="h-3 w-3" />
                          ) : (
                            <Calendar className="h-3 w-3" />
                          )}
                          {label}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="flex-none">
                      <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        {formatDate(event.date)}
                      </div>
                    </CardHeader>

                    <CardContent className="flex-grow flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-col gap-2 mb-4 mt-auto">
                        <div className="text-sm">
                          <span className="font-medium">Location:</span>{" "}
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="text-sm flex items-center gap-2">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span className="font-medium">Time:</span> {event.time}
                        </div>
                        {event.capacity && (
                          <div className="text-sm">
                            <span className="font-medium">Capacity:</span> {event.capacity}
                          </div>
                        )}
                      </div>

                      {/* Collaborators */}
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-sm font-medium mb-2">Collaborators</div>
                        <div className="flex flex-wrap gap-2">
                          {event.collaborators.map((collaborator) => (
                            <div 
                              key={collaborator.name}
                              className="flex items-center gap-2 bg-muted/50 px-2 py-1 rounded-md"
                            >
                              <div className="relative w-4 h-4 flex-shrink-0">
                                <Image
                                  src={collaborator.logo}
                                  alt={collaborator.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-xs line-clamp-1">{collaborator.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
} 