// Start of Selection
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Back button for mobile */}
      <div className="absolute left-8 top-8 z-20 lg:hidden">
        <Link
          href="/"
          className="flex items-center text-foreground hover:text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to home
        </Link>
      </div>

      {/* Left side - Image Background */}
      <div className='relative hidden w-2/5 lg:block bg-[url("/images/logo_blue.png")] bg-cover bg-center bg-no-repeat'>
        <div className="absolute inset-0 bg-black/30" />{" "}
        {/* Optional overlay */}
        {/* Back button for desktop */}
        <div className="absolute left-8 top-8 z-20">
          <Link
            href="/"
            className="flex items-center text-white hover:text-gray-200"
          >
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
