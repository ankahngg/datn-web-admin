import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log("Login attempt with username:", username);
    // 1. Gọi đến API Backend thật của bạn
    const backendRes = await fetch("https://api.ankhang277.id.vn/api/v1/auth/login-normal", { // Thay bằng URL login thật của backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log("Backend response :", backendRes);

    const data = await backendRes.json();

    console.log("Backend response data:", data);

    // Giả sử backend trả về data dạng { success: true, token: "abc..." }
    if (data.success && data?.data?.accessToken) {
      const response = NextResponse.json({ success: true });

      // 2. Tự set cookie ngay tại Next.js (sẽ ăn theo domain localhost hoặc domain frontend sau này)
      response.cookies.set("access_token", data?.data?.accessToken, {
        httpOnly: true, // Bảo mật, chống XSS
        secure: process.env.NEXT_PUBLIC_DEV == "false", // Chỉ gửi cookie qua HTTPS khi deploy
        sameSite: "lax",
        path: "/", // Có hiệu lực toàn trang
        maxAge: 60 * 60 * 24, // Hạn 1 ngày (tùy bạn chỉnh)
      });

      return response;
    }

    return NextResponse.json({ success: false, message: "Sai tài khoản hoặc mật khẩu" }, { status: 400 });

  } catch (error) {
    console.error("Route Handler Login Error:", error);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống" }, { status: 500 });
  }
}