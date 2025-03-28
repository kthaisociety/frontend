"use client"

import * as React from "react"
import Link from "next/link"
import {SideNavbar} from "@/components/navbar/navbar-side"
import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Label } from "@radix-ui/react-label"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Getting Started with AI",
    href: "/docs/primitives/alert-dialog",
    description:
      "Learn the basics of AI and how to get started with it.",
  },
  {
    title: "KTH Courses about AI",
    href: "/docs/primitives/hover-card",
    description:
      "Explore all the course about AI that KTH offers.",
  },
  {
    title: "Tutorial Challenges: ",
    href: "/docs/primitives/progress",
    description:
      "Decision Trees and Forests and some other stuff",
  },
  {
    title: "Other Learning Resources",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
]

const MiniSection = () =>{
  return(
    <div className=" flex flex-col hover:bg-gray-100 rounded-sm  w-[300px] px-2">
      <Label className=""> Events</Label>
      <ul className=" text-ellipsis text-gray-500 cursor-pointer  ">
        <li className="hover:underline"><a href="/">Latest Event</a></li>
        <li className="hover:underline"><a href="/">Upcomming Event</a></li>
        <li className="hover:underline"><a href="/">Previous Events</a></li>
      </ul>
    </div>
  )
}

export default function Navbar() {
  return (
    <div className=" flex h-[80px] justify-between 2xl:justify-around items-center bg-[#1751A6]">
    <div className="  flex items-center px-4 ">
    <div className=" md:w-[250px] w-[120px]  flex items-center justify-center ">
    <img src="/navbar_icons/logo.svg" alt="KTH AI Society Logo" className="lg:h-[50px] lg:w-[150px] md:h[50px] md:w-[150px] h-[40px] w-[110px]"></img>
    </div>  
    
    {/* <div className="border text-white font-sans text-2xl border-black flex items-center justify-around w-[600px]">
      <div>
        <h2>For Students</h2>
      </div>
      <div>
        <h2>For Companies</h2>
      </div>
      <div>
        <h2>About Us</h2>
      </div>
    </div> */}


    <NavigationMenu className=" text-white  font-sans  lg:block hidden">
      <NavigationMenuList className="flex w-[500px] h-[80px]  items-center justify-around ">
        <NavigationMenuItem className=" ">
          <NavigationMenuTrigger className="text-xl  bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent font-semibold">For Students</NavigationMenuTrigger>
          <NavigationMenuContent className="lg:w-[600px] xl:w-[800px] xl:h-[400px] lg:h-[300px] bg-[#E5E6EB] ">
            {/* <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                    >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Speakers
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <MiniSection/>

              <ListItem href="/docs/installation" title="News">
              <div className="flex flex-col">

              <a>LINK 1</a>
              <a>LINK 2</a>
              </div>
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="About">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul> */}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className=" ">
          <NavigationMenuTrigger className="text-xl   bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent font-semibold">For Companies</NavigationMenuTrigger>
          <NavigationMenuContent className="lg:w-[600px] xl:w-[800px] xl:h-[400px] lg:h-[300px] border bg-[#E5E6EB] ">
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
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className=" ">
        <NavigationMenuTrigger className="text-xl   bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent font-semibold">About Us</NavigationMenuTrigger>
          <NavigationMenuContent className="lg:w-[600px] xl:w-[800px] xl:h-[400px] lg:h-[300px]  bg-[#E5E6EB]">
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
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    </div>



    <div className=" lg:flex-col lg:items-end flex justify-between items-center   mr-4 px-2">
      <img src="/navbar_icons/User.svg" alt="User Login Icon" className="h-[45px] w-[45px] hidden mr-12 lg:block"></img>
    <div className="lg:hidden ">
      <SideNavbar/>
      </div>        

    </div>
    
  </div>
  )
}




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
  )
})
ListItem.displayName = "ListItem"
