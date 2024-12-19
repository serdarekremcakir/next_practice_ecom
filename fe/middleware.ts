import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req, res) {


    // @ts-ignore
    // if (req.nextauth?.token?.expires < Date.now()) {
    //   return NextResponse.redirect(new URL('/logout', req.url));
    // }

    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/products", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        // if(token?.expires < Date.now()) {
        //   return false;
        // }
        if (req.nextUrl.pathname === "/") {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/profile/:path*", "/products/:path*/reviews"],
};
