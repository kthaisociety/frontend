"use client";

import * as React from "react";
import {
  LayoutDashboardIcon,
  SettingsIcon,
  CalendarIcon,
  BriefcaseIcon,
  HandshakeIcon,
  RocketIcon,
  Users2Icon,
  MicIcon,
  GraduationCapIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { NavDocuments } from "@/components/admin-sidebar/people";
import { NavMain } from "@/components/admin-sidebar/nav-main";
import { NavSecondary } from "@/components/admin-sidebar/nav-secondary";
import { NavUser } from "@/components/admin-sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Events",
      url: "/admin/events",
      icon: CalendarIcon,
    },
    {
      title: "Jobs",
      url: "/admin/jobs",
      icon: BriefcaseIcon,
    },
    {
      title: "Sponsors",
      url: "/admin/sponsors",
      icon: HandshakeIcon,
    },
    {
      title: "Startups",
      url: "/admin/startups",
      icon: RocketIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ],
  people: [
    {
      name: "Team Members",
      url: "/admin/team-members",
      icon: Users2Icon,
    },
    {
      name: "Speakers",
      url: "/admin/speakers",
      icon: MicIcon,
    },
    {
      name: "Alumni",
      url: "/admin/alumni",
      icon: GraduationCapIcon,
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: UsersIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <Image
                  src='/logo_black.svg'
                  alt='KTH AI Society'
                  width={24}
                  height={24}
                  className='rounded fill-black text-black '
                />
                <span className='text-base font-semibold bg'>AI Society</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.people} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
