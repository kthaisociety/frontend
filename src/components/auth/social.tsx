"use client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const API_URL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") + "/api/v1";

export function Social() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/auth/google`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No auth URL received");
      }
    } catch (error) {
      console.error("Failed to start Google auth:", error);
    } finally {
      setIsLoading(false);
    }
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
