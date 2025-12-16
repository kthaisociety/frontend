import { useState } from "react";
import { User, Link2, Shield, Bell, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface SocialLinks {
  twitter: string;
  linkedin: string;
  github: string;
  website: string;
}

const ProfileTabs = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "Alexandra",
    lastName: "Chen",
    email: "alex.chen@example.com",
    phone: "+1 (555) 123-4567",
    location: "Stockholm, Sweden",
    bio: "Senior Product Designer with 8+ years of experience crafting digital experiences. Passionate about creating intuitive interfaces that bridge the gap between user needs and business goals.",
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    twitter: "@alexchen_design",
    linkedin: "linkedin.com/in/alexandrachen",
    github: "github.com/alexchen",
    website: "alexchen.design",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true,
  });

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "social", label: "Social Links", icon: Link2 },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div
      className="bg-card rounded-2xl profile-card-shadow overflow-hidden animate-slide-up"
      style={{ animationDelay: "0.2s" }}
    >
      <Tabs defaultValue="personal" className="w-full">
        <div className="border-b border-border">
          <TabsList className="w-full h-auto p-0 bg-transparent rounded-none flex overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex-1 flex items-center min-w-[120px] py-4 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary font-medium transition-all duration-200 gap-2"
              >
                <tab.icon className="w-4   h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="p-6 sm:p-8">
          {/* Personal Info Tab */}
          <TabsContent value="personal" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={personalInfo.firstName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={personalInfo.lastName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={personalInfo.location}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={personalInfo.bio}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, bio: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button>Save Changes</Button>
            </div>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social" className="mt-0 space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={socialLinks.twitter}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, twitter: e.target.value })
                  }
                  placeholder="@username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={socialLinks.linkedin}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                  }
                  placeholder="linkedin.com/in/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={socialLinks.github}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, github: e.target.value })
                  }
                  placeholder="github.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={socialLinks.website}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, website: e.target.value })
                  }
                  placeholder="yourwebsite.com"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button>Save Changes</Button>
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="mt-0 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <h3 className="font-medium text-foreground">
                    Profile Visibility
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Control who can see your profile
                  </p>
                </div>
                <select className="bg-card border border-input rounded-md px-3 py-2 text-sm">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <h3 className="font-medium text-foreground">Show Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Display email on your profile
                  </p>
                </div>
                <Switch className="" />
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <h3 className="font-medium text-foreground">Show Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Display location on your profile
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-0 space-y-6">
            <div className="space-y-4">
              {[
                {
                  key: "email",
                  label: "Email Notifications",
                  desc: "Receive notifications via email",
                },
                {
                  key: "push",
                  label: "Push Notifications",
                  desc: "Receive push notifications",
                },
                {
                  key: "marketing",
                  label: "Marketing Emails",
                  desc: "Receive marketing and promotional emails",
                },
                {
                  key: "updates",
                  label: "Product Updates",
                  desc: "Get notified about new features and updates",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-foreground">
                      {item.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={
                      notifications[item.key as keyof typeof notifications]
                    }
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        [item.key]: checked,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
