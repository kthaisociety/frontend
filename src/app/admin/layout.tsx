"use client";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/admin-sidebar/app-sidebar";
import { SiteHeader } from "@/components/admin-sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader path={pathname} />
        <main className='container py-6 px-4 md:px-6'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
