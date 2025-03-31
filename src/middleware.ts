import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that don't require authentication
const publicPaths = ["/auth/login", "/auth/signup", "/"];

// Function to check if the request is for a public asset
const isPublicAsset = (pathname: string) =>

  /// tmp set these to avoid auth when rendering on localhost during development 

  pathname.startsWith("/images/") || // ✅ Allow images
  pathname.startsWith("/favicon.ico") || // ✅ Allow favicon
  pathname.startsWith("/_next/static") || // ✅ Allow Next.js static files
  pathname.startsWith("/_next/image"); // ✅ Allow Next.js optimized images

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Allow access to images and public assets
  if (publicPaths.includes(pathname) || isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get("kthais_session");

  // Debugging logs
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
     * - images folder ✅ (Added)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
