import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that don't require authentication
const publicPaths = ["/auth/login", "/auth/signup", "/navbar_icons/Group_scan.svg","/navbar_icons/Group.svg",
  "/navbar_icons/Message.svg", "/navbar_icons/Date_range_fill.svg","/navbar_icons/Edit_alt.svg","/navbar_icons/User_add.svg",
  "/navbar_icons/Date_range_fill.svg",
  "/navbar_icons/Date_range_fill.svg","/navbar_icons/File_dock.svg", "/navbar_icons/file.svg", "/navbar_icons/External.svg" ,  "/", "/daniel-test-env" , "/navbar_icons/User.svg","/navbar_icons/View.svg", "/navbar_icons/logo.svg", "/navbar_icons/Menu.svg" , "/navbar_icons/Close_round_light.svg"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get("kthais_session");

  // Add debug logging
  console.log("Auth cookie:", authCookie);

  if (!authCookie || authCookie.value === "") {
    const loginUrl = new URL("/auth/login", request.url);
    if (!publicPaths.includes(pathname)) {
      loginUrl.searchParams.set("from", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Handle auth pages when already authenticated
  if (
    (pathname === "/auth/login" || pathname === "/auth/signup") &&
    authCookie
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
