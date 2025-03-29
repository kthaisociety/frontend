import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { Collapsible } from "@/components/ui/collapsible";


export const SideNavbar = ()=> {
  const sections = [
    {
      title: "For Students",
      items: [
        {
          label: "Job Board",
          icon: "/navbar_icons/View.svg",
          icon_tailwind: "h-[16px]",
          links: [
            { name: "Internship at Ericsson", url: "#" },
            { name: "Internship at Spotify", url: "#" },
            { name: "Explore More", url: "#" },
          ],
        },
        {
          label: "News",
          icon: "/navbar_icons/File_dock.svg",
          icon_tailwind: "text-white h-[16px]",
          links: [
            { name: "AI in the Workplace", url: "#" },
            { name: "Future of Work", url: "#" },
            { name: "Explore More", url: "#" },
          ],
        },
        {
          label: "Events",
          icon: "/navbar_icons/Date_range_fill.svg",
          icon_tailwind: "text-white h-[16px]",
          links: [
            { name: "AI in the Workplace", url: "#" },
            { name: "Future of Work", url: "#" },
            { name: "Explore More", url: "#" },
          ],
        },
      ],
    },
    {
      title: "For Companies",
      items: [
        {
          label: "Become Partner",
          icon: "/navbar_icons/User_add.svg",
          icon_tailwind: " text-white h-[16px]",
          links: [
            { name: "AI in the Workplace", url: "#" },
            { name: "Future of Work", url: "#" },
            { name: "Explore More", url: "#" },
          ],
        },
        {
          label: "Announce Jobs",
          icon: "/navbar_icons/Edit_alt.svg",
          icon_tailwind: " text-white h-[16px]",
          links: [
            { name: "AI in the Workplace", url: "#" },
            { name: "Future of Work", url: "#" },
            { name: "Explore More", url: "#" },
          ],
        },
        {
          label: "Arrange Events",
          icon: "/navbar_icons/Date_range_fill.svg",
          icon_tailwind: " text-white h-[16px]",
          links: [
            { name: "AI in the Workplace", url: "#" },
            { name: "Future of Work", url: "#" },
            { name: "Explore More", url: "#" },
          ],
        }
      ],
    },
    {
      title: "About Us",
      items: [
        {
          label: "Contact",
          icon: "/navbar_icons/Message.svg",
          icon_tailwind: " text-white h-[16px]",
          links: [
            { name: "AI in the Workplace", url: "#" },
            { name: "Future of Work", url: "#" },
            { name: "Explore More", url: "#" },
          ],
        },
        {
          label: "Team",
          icon: "/navbar_icons/Group.svg",
          icon_tailwind: " text-white h-[16px]",
          links: [
            { name: "AI in the Workplace", url: "#" },
            { name: "Future of Work", url: "#" },
            { name: "Explore More", url: "#" },
            { name: "Explore More", url: "#" },
            { name: "Explore More", url: "#" },
            { name: "Explore More", url: "#" },
            { name: "Explore More", url: "#" },
            { name: "Explore More", url: "#" },
          ],
        },
        {
          label: "Speakers",
          icon: "/navbar_icons/Group_scan.svg",
          icon_tailwind: " text-white h-[16px]",
          links: [
            { name: "AI in the Workplace", url: "#" },
            { name: "Future of Work", url: "#" },
            { name: "Explore More", url: "#" },
          ],
        }
      ],
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <img src="/navbar_icons/Menu.svg" className="h-[40px] md:h-[60px] md:w-[60px] w-[40px]" />
      </SheetTrigger>
      <SheetContent className="bg-[#1751A6] text-white border border-[#1751A6]  flex flex-col max-h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="cursor-pointer">
            <img src="/navbar_icons/logo.svg" className="h-[40px] w-[100px] top-0" />
          </SheetTitle>
        </SheetHeader>

        {sections.map((section, index) => (
          <div key={index} className="mt-4">
            <Label className="text-sm font-semibold text-[#C4C6CD]">{section.title}</Label>
            {section.title === "For Students" && (
              <div className="flex flex-col  mt-2">
                <div className="flex items-center mb-2 ml-1 group cursor-pointer justify-start space-x-4 w-full">
                <img src="/navbar_icons/User.svg" className=" ml-1 h-[18px]" />
                <Label className="text-sm font-sans cursor-pointer group-hover:underline transition-all duration-300 ">Log in </Label>
                  </div>
                <hr></hr>
              </div>
            )}
            <Accordion type="single" collapsible className="text-sm pt-1 pb-2">
              {section.items.map((item, itemIndex) => (
                <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}> 
                  <AccordionTrigger className=" h-8 rounded-lg">
                    <div className="flex items-center justify-start space-x-2 w-full">
                      <div className="p-2 rounded">
                        <img src={item.icon} className={`${item.icon_tailwind}`} />
                      </div>
                      <Label className="font-sans cursor-pointer text-sm">{item.label}</Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                  <div className="flex pb-2 pt-1 ml-[15px]">
                  <div className="border "></div>
                  {/* <hr ></hr> */}
                    <ul className="flex-col w-[400px] px-1 md:w-[400px] lg:w-[500px]">
                      {item.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="h-5 rounded-md px-2 flex items-center text-sm group cursor-pointer">
                          <Label className="cursor-pointer font-sans font-light group-hover:underline transition-all duration-300">
                            {link.name}
                          </Label>
                          <img src="/navbar_icons/External.svg" className="invert ml-1 h-[18px]" />
                        </li>
                      ))}
                    </ul>
                    </div>

                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <SheetFooter className=" relative self-center pt-24">
          <SheetClose asChild>
            <Label>Developed by IT-Team</Label>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}


