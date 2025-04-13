"use client";

import { AlumniSkeleton } from "./alumni-skeleton";
import { AlumniView } from "./alumni-view";
import { useAlumni } from "@/hooks/alumni";




export function AlumniPage() {

    const { data: alumnis, isLoading, error } = useAlumni();

    

    //Return a skelton view instead built with shadcn
    if (isLoading) {
        return <AlumniSkeleton />;
    }

    if (error || alumnis == undefined) {
        return (
        <div className="flex justify-center items-center h-screen flex-col gap-3">
        <h1 className="text-4xl font-semibold">Sorry, something that went wrong.</h1>
        <p className="text-lg">Try again later...</p>
    </div>
        );
    }

    return (
        <>
            <AlumniView alumnis={alumnis} />  
        </>
    );
}


  