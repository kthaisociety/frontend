import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that don't require authentication
const publicPaths = ["/auth/login", "/auth/signup", "/public/navbar_icons/logo.svg"
 ];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

    if (
    pathname.startsWith("/navbar_icons") || // allow whole folder
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|webp|woff2?)$/i)
  ) {
    return NextResponse.next();
  }

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
