"use client";
import { usePathname, useRouter } from "next/navigation";
import router from "next/router";
import { useEffect } from "react";

function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const expireIn = localStorage.getItem("access_token_expire_in_admin");
    if (
      pathname != "/login" &&
      (expireIn == null || Number(expireIn) < Date.now())
    ) {
      router.push("/login"); // Nếu chưa login hoặc token hết hạn, chuyển hướng đến trang login
    }
    if (
      pathname === "/login" &&
      expireIn != null &&
      Number(expireIn) > Date.now()
    ) {
      router.push("/user"); // Nếu đã login và token còn hạn, chuyển hướng đến trang user
    }
  }, [router]);

  return <>{children}</>;
}

export default ProtectedLayout;
