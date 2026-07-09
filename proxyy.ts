// import { jwtVerify } from "jose";
// import { NextRequest, NextResponse } from "next/server";

// const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);

// async function verifyToken(token: string) {
//   try {
//     console.log("Verifying token with secret:", process.env.NEXT_PUBLIC_JWT_SECRET);
//     console.log("Secret : ", secret);
//     const { payload } = await jwtVerify(token, secret);
//     return payload; // hợp lệ + chưa hết hạn
//   } catch (err) {
//     console.error("Token verification error:", err);
//     return null; // hết hạn hoặc sai
//   }
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   console.log("Checking auth for path:", pathname);

//   const token = request.cookies.get("access_token")?.value;

//   const isProtected = !pathname.startsWith("/login");

//   // check token thật sự hợp lệ
//   let isValid = false;

//   console.log("Verifying token:", token);
//   if (token) {
//     const payload = await verifyToken(token);
//     isValid = !!payload;
//   }
//   console.log("Token valid:", isValid, "Path:", pathname);

//   // ❌ chưa login hoặc token hết hạn
//   if (!isValid && isProtected) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // ❌ đã login mà vào login
//   if (isValid && pathname === "/login") {
//     return NextResponse.redirect(new URL("/user", request.url));
//   }

//   return NextResponse.next();
// }