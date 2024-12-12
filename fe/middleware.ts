import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/products', req.url));
    }

    // Auth routes
    if (
      (req.nextUrl.pathname.startsWith('/profile') ||
       req.nextUrl.pathname.includes('/reviews/create')) &&
      !req.nextauth.token
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === '/') {
          return true;
        }
        return !!token;
      }
    }
  }
);

export const config = {
  matcher: ['/', '/profile/:path*', '/products/:path*/reviews/create']
};