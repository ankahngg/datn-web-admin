// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  // const hasAccessToken = request.cookies.has('access_token'); 

  // const { pathname } = request.nextUrl;

  // // 1. Chưa đăng nhập -> đá ra trang /login
  // if (!hasAccessToken && pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // // 2. Đã đăng nhập rồi -> không cho vào lại /login, đẩy vào dashboard
  // if (hasAccessToken && pathname === '/login') {
  //   return NextResponse.redirect(new URL('/user', request.url));
  // }

  return NextResponse.next();
}

// 4. Chỉ định các đường dẫn chạy qua người gác cổng này
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};