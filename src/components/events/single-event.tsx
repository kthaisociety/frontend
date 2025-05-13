"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "./utils";

// Temporary test event
const testEvent = {
  id: "1",
  title: "AI Workshop: Introduction to Machine Learning",
  description: "Join us for an introductory workshop on machine learning fundamentals. Perfect for beginners! This workshop will cover the basics of machine learning, including supervised and unsupervised learning, neural networks, and practical applications. No prior experience required.",
  date: "2025-05-15",
  time: "14:00 - 16:00",
  location: "KTH Campus, Room 123",
  capacity: 30,
  image: "/images/brand_assets/ais-logo-main-long-white-1.jpg",
  collaborators: [
    { name: "KTH Computer Science", logo: "/images/collaborators/kth-cs.png" }
  ]
};

interface Collaborator {
  name: string;
  logo: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  image: string;
  collaborators: Collaborator[];
}

interface SingleEventProps {
  event?: Event;
}

export function SingleEvent({ event = testEvent }: SingleEventProps) {
  if (!event) {
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/events"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
      </div>
    );
  }

  const { status, label } = getEventStatus(event.date, event.time);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Back button */}
      <Link 
        href="/events"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Event Image */}
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4">
              <Badge 
                variant={status === "upcoming" ? "default" : "secondary"}
                className="flex items-center gap-1 text-base px-4 py-1"
              >
                {status === "upcoming" ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <Calendar className="h-4 w-4" />
                )}
                {label}
              </Badge>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Date</h3>
                  <p className="text-muted-foreground">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Time</h3>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Capacity</h3>
                  <p className="text-muted-foreground">{event.capacity} participants</p>
                </div>
              </div>
            </div>

            {/* Collaborators */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Collaborators</h2>
              <div className="flex flex-wrap gap-4">
                {event.collaborators.map((collaborator) => (
                  <div 
                    key={collaborator.name}
                    className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-lg"
                  >
                    <div className="relative w-8 h-8">
                      <Image
                        src={collaborator.logo}
                        alt={collaborator.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium">{collaborator.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Registration Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Register for this Event</CardTitle>
              <CardDescription>
                {status === "upcoming" 
                  ? "Secure your spot at this upcoming event"
                  : "This event has already taken place"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {status === "upcoming" ? (
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    // TODO: Implement registration logic 
                    // right now the button has no functionality
                    console.log("Register for event:", event.id);
                  }}
                >
                  Register Now
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="w-full"
                  disabled
                >
                  Event Ended
                </Button>
              )}

              <div className="pt-6 border-t">
                <h3 className="font-medium mb-2">Event Details</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Free admission</li>
                  <li>• Open to all KTH students</li>
                  <li>• Registration required</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getEventStatus(date: string, time: string): { status: "upcoming" | "past"; label: string } {
  const eventDateTime = new Date(`${date}T${time.split(" - ")[0]}`);
  const now = new Date();
  
  if (eventDateTime < now) {
    return { status: "past", label: "Past Event" };
  }
  return { status: "upcoming", label: "Upcoming" };
}
