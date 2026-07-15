import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/provider/Providers";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import Leftbar from "@/components/MyComponent/sidebar";
import Header from "@/components/MyComponent/header";
import ProtectedLayout from "./protectedLayout";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "P2P Lending Admin",
  description: "Admin panel for P2P Lending platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedLayout>
      <html
        lang="en"
        className={cn(
          "h-full",
          "antialiased",
          geistSans.variable,
          geistMono.variable,
          "font-sans",
          inter.variable,
        )}
      >
        <body className="min-h-full flex flex-col m-0 w-screen">
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ProtectedLayout>
  );
}
