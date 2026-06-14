
import { SidebarProvider } from "@/components/ui/sidebar";
import Leftbar from "@/components/MyComponent/sidebar";
import Header from "@/components/MyComponent/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Leftbar />
      <main className="px-(--main-page-padding-x) w-full overflow-hidden">
        <Header />
        <div className="mt-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
