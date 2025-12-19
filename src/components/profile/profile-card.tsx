import Image from "next/image";
import { MapPin, Calendar, Briefcase, Mail } from "lucide-react";

interface ProfileCardProps {
  profileImage: string;
  name: string;
  title: string;
  location: string;
  email: string;
  joinDate: string;
  bio: string;
}

export function ProfileCard({
  profileImage,
  name,
  title,
  location,
  email,
  joinDate,
  bio,
}: ProfileCardProps) {
  return (
    <div className="relative mt-20">
      {/* Profile Image - Water Drop Effect */}
      <div className="absolute -top-16 left-8 z-20">
        <div className="relative">
          <div className="absolute inset-0 rounded-full profile-border-gradient blur-sm scale-110" />
          <div className="relative w-32 h-32 rounded-full p-1 profile-border-gradient">
            <div className="w-full h-full rounded-full overflow-hidden bg-card p-0.5">
              <Image
                src={profileImage}
                alt={name}
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="absolute inset-0 rounded-full border border-primary animate-pulse-glow pointer-events-none" />
        </div>
      </div>

      <div className="relative bg-card rounded-2xl profile-card-shadow overflow-hidden">
        <div className="absolute top-0 left-0 h-[2px] w-[30px] bg-gradient-to-r from-primary to-primary/70" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/70 to-primary" />
        <div className="absolute top-0 left-10  h-20 bg-card rounded-b-full" />
        <div className="absolute top-0 left-10  h-20 border-b-2 border-primary rounded-b-full" />
        <div className=" pb-8 px-8">{/* content stays the same */}</div>
        <div className="pt-20 pb-8 px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-foreground mb-1">
              {name}
            </h1>
            <p className="text-lg text-primary font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {title}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm">{email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm">Joined {joinDate}</span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="border-t border-border pt-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              About
            </h2>
            <p className="text-foreground leading-relaxed">{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
