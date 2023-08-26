// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authentication } from 'next-firebase-auth-edge/lib/next/middleware';

const PUBLIC_PATHS = ['/home', '/chat', '/user', '/user/profile', '/chat/0'];

// function redirectToHome(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   url.pathname = '/home';
//   url.search = '';
//   return NextResponse.redirect(url);
// }

// function redirectToLogin(request: NextRequest) {
//   if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//   const url = request.nextUrl.clone();
//   url.pathname = '/login';
//   url.search = '';
//   return NextResponse.redirect(url);
// }

export async function middleware(request: NextRequest) {
  if (request.cookies.has('uid')) { // 로그인 했다면 (쿠키가 있다면)
    if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/home', request.url)); // 홈으로 이동
    }
  } else { // 로그인하지 않았다면 (쿠키가 없다면)
    if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', request.url)); // 로그인 페이지로 이동
    }
    // return NextResponse.next();
  }
  // return res;
  // return authentication(request, {
  //   loginPath: '/api/login',
  //   logoutPath: '/api/logout',
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  //   cookieName: 'AuthToken',
  //   cookieSerializeOptions: {
  //     path: '/',
  //     httpOnly: true,
  //     secure: false, // set to 'true' on https environments
  //     sameSite: 'lax',
  //     maxAge: 12 * 60 * 60 * 24, // twelve days
  //   },
  //   cookieSignatureKeys: ['secret1', 'secret2'],
  //   serviceAccount: {
  //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  //     clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL as string,
  //     privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY as string,
  //   },
  //   handleValidToken: async ({ token, decodedToken }) => {
  //     // Authenticated user should not be able to access /login, /register and /reset-password routes
  //     if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
  //       return redirectToHome(request);
  //     }

  //     return NextResponse.next();
  //   },
  //   handleInvalidToken: async () => {
  //     return redirectToLogin(request);
  //   },
  //   handleError: async (error) => {
  //     console.error('Unhandled authentication error', { error });
  //     return redirectToLogin(request);
  //   },
  // });
}

// export const config = {
//   matcher: [
//     '/',
//     '/((?!_next|favicon.ico|api|.*\\.).*)',
//     '/api/login',
//     '/api/logout',
//     '/oauth/callback/kakao',
//   ],
// };

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/chat/:characterId*',
//   ],
// }