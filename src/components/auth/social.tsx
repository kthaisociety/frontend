"use client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1`;

export function Social() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="mx-6 flex flex-col gap-4">
      <Button
        variant="outline"
        className="flex h-11 w-full items-center justify-center gap-2"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <FaGoogle className="h-5 w-5" />
        <span>{isLoading ? "Loading..." : "Continue with Google"}</span>
      </Button>
    </div>
  );
}
