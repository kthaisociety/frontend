import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface JobCardProps {
  id: string
  title: string
  company: string
  companyLogo: string
  description: string
  location?: string
  jobType?: string
  className?: string
}

export function JobCard({
  id,
  title,
  company,
  companyLogo,
  description,
  location,
  jobType,
  className,
}: JobCardProps) {

  return(
  <div>
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src={companyLogo} alt={company} />
            <AvatarFallback>{company[0]}</AvatarFallback>
          </Avatar>
          <CardTitle >{company}</CardTitle>
        </div>
        <div className="flex flex-col  gap-4">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-start items-start gap-2 px-4">
         <span><Badge variant="outline">{location}</Badge></span> 
         <span><Badge variant="outline">{jobType}</Badge></span>
        </div>
        <div className="flex justify-end mx-6 mb-4">
          <Button size="sm" asChild>
            <Link href={`/jobs/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  </div>
  );
}

 