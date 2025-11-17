// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route Configuration for Law Firm Portfolio
 *
 * Based on your folder structure:
 * - Landing Pages: (Landing) folder - public access
 * - Admin Auth: admin/(auth) folder - public for unauthenticated
 * - Admin Dashboard: admin/(dashboard) folder - requires admin role
 */

// Public routes - accessible to everyone
const publicRoutes = [
  "/",
  "/attorney",
  "/contact",
  "/insights",
  "/our-team",
  "/practice",
  "/practice/criminal-defense",
  "/practice/white-collar-defense",
];

// Admin auth routes - public for unauthenticated only
const adminAuthRoutes = [
  "/admin/signin",
  "/admin/forget-password",
  "/admin/reset-password",
];

// Admin dashboard routes - require admin role
const adminDashboardRoutes = [
  "/admin/dashboard",
  "/admin/dashboard/attorneys",
  "/admin/dashboard/contact",
  "/admin/dashboard/insights",
  "/admin/dashboard/our-team",
  "/admin/dashboard/practice-areas",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get cookies from request
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  const isAuthenticated = !!accessToken;
  const isAdmin = userRole === "admin"; 

  console.log("🔐 Proxy Check:", {
    pathname,
    isAuthenticated,
    userRole,
    isAdmin,
  });

  // Check route types
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAdminAuthRoute = adminAuthRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAdminDashboardRoute = adminDashboardRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Special handling for /admin root path
  if (pathname === "/admin") {
    if (isAuthenticated && isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/admin/signin", request.url));
    }
  }

  // ============================================
  // RULE 1: Redirect authenticated admins away from auth pages
  // ============================================
  if (isAuthenticated && isAdmin && isAdminAuthRoute) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // ============================================
  // RULE 2: Protect admin dashboard routes
  // ============================================
  if (isAdminDashboardRoute) {
    if (!isAuthenticated) {
      // Not authenticated - redirect to signin
      const url = new URL("/admin/signin", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    if (!isAdmin) {
      // Authenticated but not admin - redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ============================================
  // RULE 3: Allow all public landing pages
  // ============================================
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes to run proxy on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/font (font optimization files)
     * - favicon.ico, robots.txt, sitemap.xml, manifest files
     * - public folder files
     * - files with extensions (.svg, .png, .jpg, .ico, etc.)
     */
    "/((?!api|_next/static|_next/image|_next/font|favicon.ico|robots.txt|sitemap.xml|manifest|icon|.*\\..*).*)",
  ],
};
