import Link from "next/link";
import {
  CalendarIcon,
  BriefcaseIcon,
  HandshakeIcon,
  RocketIcon,
  Users2Icon,
  MicIcon,
  GraduationCapIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  // Dashboard action cards based on sidebar navigation items
  const dashboardActions = [
    {
      title: "Events",
      description: "Manage upcoming and past events",
      icon: CalendarIcon,
      url: "/admin/events",
      color: "bg-blue-100",
    },
    {
      title: "Jobs",
      description: "Post and manage job opportunities",
      icon: BriefcaseIcon,
      url: "/admin/jobs",
      color: "bg-green-100",
    },
    {
      title: "Sponsors",
      description: "Manage sponsor relationships",
      icon: HandshakeIcon,
      url: "/admin/sponsors",
      color: "bg-yellow-100",
    },
    {
      title: "Startups",
      description: "Track startup partnerships",
      icon: RocketIcon,
      url: "/admin/startups",
      color: "bg-purple-100",
    },
    {
      title: "Team Members",
      description: "Manage team roster and roles",
      icon: Users2Icon,
      url: "/admin/team-members",
      color: "bg-pink-100",
    },
    {
      title: "Speakers",
      description: "Organize speakers for events",
      icon: MicIcon,
      url: "/admin/speakers",
      color: "bg-orange-100",
    },
    {
      title: "Alumni",
      description: "Maintain alumni network",
      icon: GraduationCapIcon,
      url: "/admin/alumni",
      color: "bg-cyan-100",
    },
    {
      title: "Settings",
      description: "Configure admin settings",
      icon: SettingsIcon,
      url: "#",
      color: "bg-gray-100",
    },
  ];
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
        <p className='text-muted-foreground mt-1'>
          Welcome to the KTH AI Society admin panel
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {dashboardActions.map((action) => (
          <Link href={action.url} key={action.title} className='block'>
            <Card className='h-full transition-all hover:shadow-md'>
              <CardHeader className={`${action.color} rounded-t-lg p-4`}>
                <action.icon className='h-8 w-8' />
              </CardHeader>
              <CardContent className='pt-4'>
                <CardTitle className='text-xl'>{action.title}</CardTitle>
                <CardDescription className='mt-2'>
                  {action.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
