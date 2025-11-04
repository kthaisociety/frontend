import React from "react";
import { Menu, UserRound, Eye, Newspaper, CalendarDays, UserPlus, Megaphone, CalendarRange, Mail, Users, Speech } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  // AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SideNavbar = () => {
  const icons = {
    view: Eye,
    fileDock: Newspaper,
    dateRange: CalendarDays,
    userAdd: UserPlus,
    editAlt: Megaphone,
    dateRangeFill: CalendarRange,
    message: Mail,
    group: Users,
    groupScan: Speech,
  };

  /** MOCK DATA */
  const sections = [
    {
      title: "For Students",
      items: [
        { label: "Job Board", icon: "view", icon_tailwind: "h-[16px]" },
        { label: "News", icon: "fileDock", icon_tailwind: "text-white h-[16px]" },
        { label: "Events", icon: "dateRangeFill", icon_tailwind: "text-white h-[16px]" },
      ],
    },
    {
      title: "For Companies",
      items: [
        { label: "Become Partner", icon: "userAdd", icon_tailwind: "text-white h-[16px]" },
        { label: "Announce Jobs", icon: "editAlt", icon_tailwind: "text-white h-[16px]" },
        { label: "Arrange Events", icon: "dateRangeFill", icon_tailwind: "text-white h-[16px]" },
      ],
    },
    {
      title: "About Us",
      items: [
        { label: "Contact", icon: "message", icon_tailwind: "text-white h-[16px]" },
        { label: "Team", icon: "group", icon_tailwind: "text-white h-[16px]" },
        { label: "Speakers", icon: "groupScan", icon_tailwind: "text-white h-[16px]" },
      ],
    },
  ];

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-[40px] md:h-[60px] md:w-[60px] w-[40px] text-white" />
      </SheetTrigger>

      <SheetContent className="bg-[#1751A6] text-white border border-[#1751A6] flex flex-col max-h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="cursor-pointer">
            <img src="/navbar_icons/logo.svg" className="h-[40px] w-[100px] top-0" />
          </SheetTitle>
        </SheetHeader>

        {sections.map((section, index) => (
          <div key={index} className="mt-4">
            <Label className="text-sm font-semibold text-[#C4C6CD]">{section.title}</Label>

            {section.title === "For Students" && (
              <div className="flex flex-col mt-2">
                <div className="flex items-center px-2 mb-2 group cursor-pointer justify-start space-x-4 w-full">
                  <UserRound className="h-[16px] text-white" />
                  <Label className="text-sm font-sans cursor-pointer group-hover:underline transition-all duration-300">
                    Log in
                  </Label>
                </div>
                <hr />
              </div>
            )}

            <Accordion type="single" collapsible className="text-sm pt-1 pb-2">
              {section.items.map((item, itemIndex) => {
                const IconComponent = icons[item.icon as keyof typeof icons];
                return (
                  <AccordionItem key={`${section.title}-${item.label}`} value={`${section.title}-${item.label}`}>
                    <AccordionTrigger className="h-8 rounded-lg">
                      <div className="flex items-center justify-start space-x-2 w-full">
                        <div className="p-2 rounded">
                          {IconComponent && <IconComponent className={item.icon_tailwind} />}
                        </div>
                        <Label className="font-sans cursor-pointer text-sm">{item.label}</Label>
                        
                      </div>
                    </AccordionTrigger>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        ))}

        <SheetFooter className="relative self-center pt-24">
          <SheetClose asChild>
            <Label>Developed by IT-Team</Label>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};



