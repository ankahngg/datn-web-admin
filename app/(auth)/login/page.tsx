"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/service/modules/auth";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    setMessage("");
    setError("");
    e.preventDefault();
    // Handle login logic here
    try {
      const res = await login({
        username,
        password,
      });
      if(res.success) {
        setMessage("Đăng nhập thành công!");
        setError("");
        router.push("/user");
      }
      else {
        setError("Đăng nhập thất bại!");
        setMessage("");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Đăng nhập thất bại!");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-sidebar p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center font-sans font-bold">
          Đăng nhập Web Admin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập </Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div className="flex items-center">
            <Button type="submit" className="w-full my-btn">
              Đăng nhập
            </Button>
          </div>
          <div className="text-red-500 text-sm mt-2">{error}</div>
          <div className="text-green-500 text-sm mt-2">{message}</div>
        </form>
      </div>
    </div>
  );
}
