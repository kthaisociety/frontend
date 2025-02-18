import { AuthLayout as AuthLayoutComponent } from "@/components/auth/auth-layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
}
