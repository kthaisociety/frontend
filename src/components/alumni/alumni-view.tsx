import { AlumniCard } from "@/components/alumni/alumni-card";
import { AlumniFilter } from "@/components/alumni/alumni-filter";

export function AlumniView(){

    //Fetch data from backend here

    //Mockup data
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
        },
        {
            firstName: "Sofia",
            lastName: "Lindström",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            currentPosition: "AI Researcher",
            formerPosition: "Data Scientist",
            description: "Sofia is passionate about advancing AI technologies and has contributed to several open-source ML projects.",
            country: "Sweden",
            city: "Gothenburg",
            formerTeam: "AI Team",
            github: "https://github.com/sofialind",
            linkedin: "https://linkedin.com/in/sofialind"
        },
        {
            firstName: "Erik",
            lastName: "Johansson",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            currentPosition: "Full Stack Developer",
            formerPosition: "Backend Developer",
            description: "Erik enjoys building scalable web applications and exploring new backend technologies.",
            country: "Norway",
            city: "Oslo",
            formerTeam: "IT Team",
            github: "https://github.com/erikj",
            linkedin: "https://linkedin.com/in/erikj"
        },
        {
            firstName: "Nora",
            lastName: "Ahmed",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            currentPosition: "Product Manager",
            formerPosition: "UX Designer",
            description: "Nora bridges the gap between design and development to ensure great user experiences.",
            country: "Denmark",
            city: "Copenhagen",
            formerTeam: "Business Team",
            github: "https://github.com/norahmed",
            linkedin: "https://linkedin.com/in/norahmed"
        },
        {
            firstName: "Liam",
            lastName: "Pettersson",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            currentPosition: "DevOps Engineer",
            formerPosition: "System Administrator",
            description: "Liam is focused on automation and infrastructure as code, ensuring systems run smoothly.",
            country: "Finland",
            city: "Helsinki",
            formerTeam: "Infrastructure Team",
            github: "https://github.com/liamp",
            linkedin: "https://linkedin.com/in/liampettersson"
        }
    ];


    return (
        <div>
            <header className="bg-blue-600 text-white p-4 h-16">Fake header</header>
            <main className="py-6 px-7 md:px-15 lg:px-20 xl:px-40">
                <h4 className="hidden md:block my-9 font-light text-lg">
                    <a href="/">Home </a> / <a href="/alumni">Alumni</a>
                </h4>
                <h1 className="text-4xl font-semibold">Notable Alumni</h1>

                {/* TODO: ADD alumni filitering Component here */}
                <div className="my-8">
                    <AlumniFilter/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {alumni.map((alumni) =>{
                        return <AlumniCard {...alumni}/>
                    })}
                </div>
            </main>
        </div>
    );
}