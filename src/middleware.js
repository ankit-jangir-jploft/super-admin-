import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("dugnadstisadmin")?.value;
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
