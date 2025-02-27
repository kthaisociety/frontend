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
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Navbar</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="mt-10 px-4 h-8 hover:bg-slate-300 rounded-lg bg-slate-background">
              {/* <Button variant="outline" className="w-full">Learn</Button> */}
              <Label>Learn</Label>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex  ml-[30px]">
                <div className="border  border-slate-300"></div>
                <ul className="flex-col   w-[400px] px-1 md:w-[400px] lg:w-[500px] ">
                  <li className="hover:bg-slate-300 h-5 rounded-md px-2">
                    <Label className="hover:bg-slate-300">
                      Getting Started with AI
                    </Label>
                  </li>
                  <li className="hover:bg-slate-300 h-5 rounded-md px-2">
                    <Label className="hover:bg-slate-300">
                      KTH Courses About AI
                    </Label>
                  </li>
                  <li
                    className="hover:bg-slate-300 h-5 rounded-md px-2 overflow-hidden whitespace-nowrap text-ellipsis"
                    title="Tutorial Challenge: Decision Trees and Forests and some other stuff"
                  >
                    <Label className="hover:bg-slate-300">
                      Tutorial Challenge: Decision Trees and Forests and some other stuff
                    </Label>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className=" px-4 h-8 hover:bg-slate-300 rounded-lg bg-slate-background">
              {/* <Button variant="outline" className="w-full">Learn</Button> */}
              <Label>About</Label>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex  ml-[30px]">
                <div className="border  border-slate-300"></div>
                <ul className="flex-col   w-[400px] px-1 md:w-[400px] lg:w-[500px] ">
                  <li className="hover:bg-slate-300 h-5 rounded-md px-2">
                    <Label className="hover:bg-slate-300">Contact</Label>
                  </li>
                  <li className="hover:bg-slate-300 h-5 rounded-md px-2">
                    <Label className="hover:bg-slate-300">Team</Label>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SheetHeader className="mt-10">
          <SheetTitle>Admin Dashboard</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>

        <SheetFooter className="mt-[600px]">
          <SheetClose asChild>
            <Label>Developed by IT-Team</Label>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}


