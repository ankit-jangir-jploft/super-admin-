import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("dugnadstisadmin")?.value;
  const roleType = request.cookies.get("roleType")?.value;
  console.log("roleType111", roleType)
  const paths = [
    "/",
    "/order",
    "/kunder",
    "/produkter",
    "/dugnader",
    "/statistics",
    "/settings",
  ];

  
  if (token) {
    if (request?.nextUrl.pathname == "/login") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  } else {
    if (paths.includes(request?.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  // Add role-based redirect logic if necessary
  if (roleType === "warehouse" && paths.includes(request?.nextUrl.pathname)) {
    if (request.nextUrl.pathname !== "/order") {
      return NextResponse.redirect(new URL("/order", request.nextUrl));
    }
  }

  // Restrict seller role from accessing specific pages
  if (roleType === "seller") {
    const restrictedPaths = ["/produkter", "/settings"];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      console.log("Access restricted for seller role. Redirecting...");
      return NextResponse.redirect(new URL("/", request.nextUrl)); // Redirect to home or another allowed page
    }
  }

  // Allow access by default
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/order",
    "/kunder",
    "/produkter",
    "/dugnader",
    "/statistics",
    "/settings",
  ],
};
