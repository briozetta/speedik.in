import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    // Allow the request to proceed if the token exists
    return NextResponse.next();
  }
  // Redirect to the homepage if the user is not authenticated
  return NextResponse.redirect(new URL('/', req.url));
}
export const config = {
  matcher: ['/admin/dashboard-home','/admin/dashboad-add-agent'],
};
