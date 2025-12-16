"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { useAppSelector } from "@/lib/model/store";
import { Button } from "../ui/button";
import { useLogoutMutation } from "@/lib/model/apis/internal-apis";
import { useRouter } from "next/navigation";

export function Navbar() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();
  const router = useRouter();

  return (
    <NavigationMenu className="relative">
      <NavigationMenuList className="flex gap-8 pr-10">
        {/* User Dropdown */}
        {isLoggedIn && user && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>{user.name}</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute mt-4 min-w-[150px]  bg-primary-foreground border rounded-lg shadow-md p-2">
              <ul className="flex flex-col gap-2">
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={async () => {
                      router.push("/profile");
                    }}
                  >
                    Profile
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={async () => {
                      await logout(undefined).unwrap();
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* Projects */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/projects">Projects</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Events Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Events</NavigationMenuTrigger>
          <NavigationMenuContent className="absolute mt-4 min-w-[150px] bg-primary-foreground border rounded shadow-md p-2">
            <ul className="flex flex-col gap-2">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    router.push("/events/upcoming");
                  }}
                >
                  Upcoming
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    router.push("/events/past");
                  }}
                >
                  Past
                </Button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Team */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/team">Team</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
