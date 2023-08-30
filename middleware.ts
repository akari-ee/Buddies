// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authentication } from 'next-firebase-auth-edge/lib/next/middleware';
import { withAuth } from 'next-auth/middleware';
import { getServerSession } from 'next-auth';
import { authOptions } from './app/api/auth/[...nextauth]/route';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = ['/home', '/chat', '/user', '/user/profile', '/chat/0'];

export async function middleware(req: NextRequest) {
  // getSession
  // const session = await getSession({ req });
  // console.log('middleware session is: ', session);

  // Authentication using Cookie  
  if (req.cookies.has('uid')) {
    // 로그인 했다면 (쿠키가 있다면)
    if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/home', req.url)); // 홈으로 이동
    }
  } else {
    // 로그인하지 않았다면 (쿠키가 없다면)
    if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', req.url)); // 로그인 페이지로 이동
    }
  }

  // getToken
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log("token is: ", token);

  // // Authentication using Token
  // if (token) {
  //   // 로그인 했다면 (쿠키가 있다면)
  //   if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login') {
  //     return NextResponse.redirect(new URL('/home', req.url)); // 홈으로 이동
  //   }
  // } else {
  //   // 로그인하지 않았다면 (쿠키가 없다면)
  //   if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
  //     return NextResponse.redirect(new URL('/login', req.url)); // 로그인 페이지로 이동
  //   }
  // }
}
