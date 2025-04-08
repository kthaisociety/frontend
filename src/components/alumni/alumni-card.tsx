import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";



interface AlumniCardProps {
    firstName: string;
    lastName: string;
    image?: string;
    currentPosition: string;
    formerPosition: string;
    description: string;
    country: string;
    city: string;
    formerTeam: string;
    github?: string;
    linkedin?: string;
}



export function AlumniCard({
    firstName,
    lastName,
    image,
    currentPosition,
    formerPosition,
    description,
    country,
    city,
    formerTeam,
    github,
    linkedin
}: AlumniCardProps){    
    return (
        <Card>

            <CardHeader className="flex flex-row justify-start items-center gap-3">
                <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>{firstName[0]}{lastName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start items-start gap-0.5">
                <CardTitle>{firstName} {lastName}</CardTitle>
                <CardDescription>{currentPosition}</CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <h4 className="text-blue-700">Former {formerPosition}</h4>
                <p>{description}</p>
            </CardContent>

            <CardFooter className="flex flex-row justify-between items-center gap-2 text-md">
                <div>{city}, {country} • {formerTeam}</div>

                <div className="flex flex-row justify-end items-center gap-3">
                    {github && <a href={github} target="_blank" rel="noopener noreferrer"><FaGithub size={20}/></a>}
                    {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={20}/></a>}
                </div>
            </CardFooter>
        </Card>
    );
}