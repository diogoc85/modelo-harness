import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        // Exige autenticação apenas em rotas do painel (dashboard)
        if (path.startsWith("/dashboard")) {
          return !!token;
        }
        return true;
      },
    },
  },
);

// Mapeamento de rotas em que o middleware deve interceptar
export const config = {
  matcher: ["/dashboard/:path*"],
};
