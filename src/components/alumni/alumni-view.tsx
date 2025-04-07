import { AlumniCard } from "@/components/alumni/alumni-card";
import { AlumniFilter } from "@/components/alumni/alumni-filter";

export function AlumniView(){

    const alumni = [
        {
            firstName: "Jesper",
            lastName: "Hesselgren",
            image: "https://github.com/shadcn.png",
            currentPosition: "Frontend Developer",
            formerPosition: "Frontend developer",
            description: "Jesper is a frontend developer with a passion for creating beautiful and user-friendly interfaces.",
            country: "Sweden",
            city: "Stockholm",
            formerTeam: "IT Team",
            github: "https://github.com/shadcn",
            linkedin: "https://linkedin.com/in/shadcn"
        }
    ];


    return (
        <div>
            <header className="bg-blue-600 text-white p-4 h-16">Fake header</header>
            <main className="p-4">
                <h1 className="text-4xl font-bold">Notable Alumni</h1>

                {/* TODO: ADD alumni filitering Component here */}
                <div className="my-8">
                    <AlumniFilter/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AlumniCard {...alumni[0]}/>
                </div>
            </main>
        </div>
    );
}