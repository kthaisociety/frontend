"use client";
import { useParams } from "next/navigation";

export function JobViewDetails() {
  //TODO: Here we should implement a fetch to backend that fetch the job details 
  // which is in markdown and prase that into a markdown component
  const params = useParams();
  return (
    <div>
      <h1>Job View Details {params.id}</h1>
    </div>
  );
}

