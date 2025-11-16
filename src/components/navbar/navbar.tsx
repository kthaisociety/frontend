"use client";

import * as React from "react";
import { UserRound } from "lucide-react";
import { SideNavbar } from "@/components/navbar/navbar-mobile";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import useGoogleSignIn from "@/lib/integration/google-signIn-hook";

/**
 * MOCK DATA
 */
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Getting Started with AI",
    href: "/docs/primitives/alert-dialog",
    description: "Learn the basics of AI and how to get started with it.",
  },
  {
    title: "KTH Courses about AI",
    href: "/docs/primitives/hover-card",
    description: "Explore all the course about AI that KTH offers.",
  },
  {
    title: "Tutorial Challenges: ",
    href: "/docs/primitives/progress",
    description: "Decision Trees and Forests and some other stuff",
  },
  {
    title: "Other Learning Resources",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
];

// ListItem used by the menu - define before Navbar so it's available when used
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function Navbar() {

  const {googleSignIn} = useGoogleSignIn({
    onSuccess: (idToken) => {
      console.log("Google Sign-In successful, ID Token:", idToken);
      // Handle successful sign-in, e.g., send token to backend
    },
    onError: (err) => {
      console.error("Google Sign-In error:", err);
    },
  });

  return (
    <div className=" sticky top-0 z-50 flex h-[80px] justify-between 2xl:justify-around items-center bg-[#1751A6]">
      <div className=" md:w-[250px] w-[120px]  flex items-center cursor-pointer justify-center ">
        <img
          src="/navbar_icons/logo.svg"
          alt="KTH AI Society Logo"
          className="lg:h-[50px] lg:w-[150px] md:h[50px] md:w-[150px] h-[40px] w-[110px]"
        ></img>
      </div>

      <NavigationMenu className=" text-white  font-sans  lg:block hidden">
        <NavigationMenuList className="flex h-[80px]  items-center justify-around ">
          <NavigationMenuItem className=" ">
            <NavigationMenuTrigger className="text-xl  bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent font-semibold">
              Home
            </NavigationMenuTrigger>
            {/* <NavigationMenuContent className="lg:w-[600px] xl:w-[800px] xl:h-[400px] lg:h-[300px] bg-[#E5E6EB] ">
            <MenuSection/>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem className="hover:underline"
                key={component.title}
                title={component.title}
                  href={component.href}
                  >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent> */}
          </NavigationMenuItem>
          <NavigationMenuItem className=" ">
            <NavigationMenuTrigger className="text-xl   bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent font-semibold">
              Events
            </NavigationMenuTrigger>
            <NavigationMenuContent className="lg:w-[600px] xl:w-[800px] xl:h-[400px] lg:h-[300px] bg-[#E5E6EB] ">
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    className="hover:underline bg-[#A2CFFE] text-black"
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className=" ">
            <NavigationMenuTrigger className="text-xl   bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent font-semibold">
              Projects
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem className=" ">
            <NavigationMenuTrigger className="text-xl   bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent font-semibold">
              Teams
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem className=" ">
            <NavigationMenuTrigger className="text-xl   bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent font-semibold">
              Members
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem className=" ">
            <NavigationMenuTrigger className="text-xl   bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent font-semibold">
              About Us
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className=" lg:flex-col lg:items-end flex justify-between items-center cursor-pointer  mr-4 px-2">
        {/* <h3 className="hidden lg:block text-white pb-2 " onClick={googleSignIn}>Log In</h3> */}
        {/* <h3 className="hidden lg:block text-white "> Register</h3> */}
        <UserRound className="h-[45px]  w-[45px] hidden mr-12 lg:block text-white" />
        <div className="lg:hidden ">
          <SideNavbar />
        </div>
      </div>
    </div>
  );
}

// ListItem is defined above and used in the menu
