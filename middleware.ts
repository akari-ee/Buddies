// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/home",
  "/chat",
  "/user",
  "/user/profile",
  "/chat/0",
  "/chat/1",
  "/chat/2",
  "/chat/3",
];

export async function middleware(req: NextRequest) {
  // Authentication using Cookie
  if (req.cookies.has("uid")) {
    // 로그인 했다면 (쿠키가 있다면)
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/home", req.url)); // 홈으로 이동
    }
  } else {
    // 로그인하지 않았다면 (쿠키가 없다면)
    if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", req.url)); // 로그인 페이지로 이동
    }
  }
}
