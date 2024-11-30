import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if token exists
  if (!token) {
    // Redirect to the homepage if the user is not authenticated
    return NextResponse.redirect(new URL("/", req.url));
  }


  // Extract roles or permissions from the token
  const userRole = token?.role; 

  const restrictedPaths = [
    "/admin/dashboard-add-advertisement",
    "/admin/dashboad-add-agent",
    // Add more paths here
  ];
  // Restrict access to '/admin/dashboard-add-agent' to admins only
  if (restrictedPaths.includes(pathname) && userRole !== "Admin") {
    // Redirect non-admin users
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to proceed for other cases
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard-home", "/admin/dashboad-add-agent","/admin/dashboard-add-advertisement",], // Define all matched routes
};
