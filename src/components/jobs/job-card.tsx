import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  description: string;
  location?: string;
  jobType?: string;
}

export function JobCard({
  id,
  title,
  company,
  companyLogo,
  description,
  location,
  jobType,
}: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border-gray-300 cursor-pointer">
        <CardContent className="p-6">
          {/* Company info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={companyLogo} alt={company} />
              <AvatarFallback className="bg-blue-100 text-gray-700 text-sm font-semibold">
                {company[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-semibold text-gray-700">{company}</p>
            </div>
          </div>

          {/* Job title - the hero */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-6">{description}</p>

          {/* Meta information with icons */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
            {jobType && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{jobType}</span>
              </div>
            )}
          </div>

          {/* Subtle read more indicator on hover */}
          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-gray-700 transition-colors">
            <span>Read more</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
