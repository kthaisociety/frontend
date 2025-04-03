import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that require authentication - unauthenticated users will be redirected to login
const authRequiredRoutes = ["/protected"];

// Paths that require admin privileges
const adminRequiredRoutes = ["/admin"];

// Auth paths that authenticated users shouldn't access
const authPaths = ["/auth/login", "/auth/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for auth cookie
  const authCookie = request.cookies.get("kthais_session");
  const isAuthenticated = authCookie && authCookie.value !== "";

  // Check for admin status
  const adminCookie = request.cookies.get("kthais_admin");
  const isAdmin = adminCookie && adminCookie.value === "true";

  // Add debug logging
  console.log("Auth cookie:", authCookie);
  console.log("Admin cookie:", adminCookie);
  console.log("Path:", pathname);
  console.log("Is authenticated:", isAuthenticated);
  console.log("Is admin:", isAdmin);

  // Case 1: Unauthenticated user trying to access protected routes
  if (
    !isAuthenticated &&
    authRequiredRoutes.some((route) => pathname.startsWith(route))
  ) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 2: Non-admin user trying to access admin routes
  if (
    (!isAuthenticated || !isAdmin) &&
    adminRequiredRoutes.some((route) => pathname.startsWith(route))
  ) {
    // Redirect to an unauthorized page or dashboard
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Case 3: Authenticated user trying to access auth pages
  if (isAuthenticated && authPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow all other cases
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
