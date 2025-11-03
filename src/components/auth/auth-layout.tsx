"use client";
// Start of Selection
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/hooks/auth";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Back button for mobile */}
      {/* <div className="absolute left-8 top-8 z-20 lg:hidden">
        <Link
          href="/"
          className="flex items-center text-foreground hover:text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-5 w-5 text-black" />
      <div className="absolute left-8 top-8 z-20 lg:hidden">
        <Link href="/" className="flex items-center text-foreground hover:text-muted-foreground">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to home
        </Link>
      </div> */}

      {/* Left side - Image Background */}
      <div className='relative hidden w-2/5 lg:block bg-[url("/images/brand_assets/ais-symbol-blue/white.jpg")] bg-cover bg-center bg-no-repeat'>
        <div className="absolute inset-0 bg-black/5" /> {/* Optional overlay */}
        {/* Back button for desktop */}
        <div className="absolute left-8 top-8 z-20">
          <Link href="/" className="flex items-center text-black hover:text-gray-200">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to home
          </Link>
        </div>
        {/* Optional branding/text overlay */}
        <div className="relative z-10 flex h-full items-center justify-center p-8 text-white">
          <div className="text-center"></div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="w-full max-w-lg p-8">{children}</div>
      </div>
    </div>
  );
}
