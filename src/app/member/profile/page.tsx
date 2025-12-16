"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AsciiGrid } from "@/components/ui/ascii-grid";
import {
  useGoogleLoginMutation,
  useLogoutMutation,
} from "@/lib/model/apis/internal-apis";
import { useAppDispatch, useAppSelector } from "@/lib/model/store";
import { setUser } from "@/lib/model/slices/auth-slice/authSlice";
import ProfileCard from "@/components/profile/profile-card";
import ProfileTabs from "@/components/profile/profile-tab";

function MemberLogin() {
  const [profileTextMask, setProfileTextMask] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 200px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const text = "Profile";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const dataUrl = canvas.toDataURL("image/png");
    // Avoid synchronous setState inside effect to prevent cascading renders
    // schedule the state update in the next animation frame
    requestAnimationFrame(() => setProfileTextMask(dataUrl));
  }, []);

  const profileData = {
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    name: "Alexandra Chen",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    email: "alex.chen@example.com",
    joinDate: "March 2021",
    bio: "Senior Product Designer with 8+ years of experience crafting digital experiences. Passionate about creating intuitive interfaces that bridge the gap between user needs and business goals. Currently leading design initiatives at a fast-growing startup, focusing on design systems and accessibility.",
  };

  return (
    <div className="min-w-screen">
      <section className="relative text-secondary-black pt-54 pb-24  overflow-hidden">
        {/* Ascii Grid Background */}
        <div className="absolute inset-0 ">
          <AsciiGrid
            color="rgba(0, 0, 0, 0.2)"
            cellSize={12}
            logoSrc={profileTextMask}
            logoPosition="center"
            logoScale={0.9}
            enableDripping={false}
            className="w-full h-full"
          />
        </div>
      </section>
      <section className="relative pb-16">
        <div className="container  max-w-4xl mx-auto px-4 sm:px-6">
          {/* Profile Card with Water Drop Image Effect */}
          <div className="animate-fade-in ">
            <ProfileCard {...profileData} />
          </div>

          {/* Profile Edit Tabs */}
          <div className="mt-8">
            <ProfileTabs />
          </div>
        </div>
      </section>
    </div>
  );
}

export default MemberLogin;
