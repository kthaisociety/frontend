"use client";
import { useEffect } from "react";
import { useGetMeMockedQuery } from "@/lib/model/apis/internal-apis";
import { useAppDispatch } from "@/lib/model/store";
import { setUser, clearUser, setLoading } from "@/lib/model/slices/auth-slice/authSlice";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  // Only run in development environment to avoid 401 errors in production
  const isDevelopment = process.env.NODE_ENV === "development";
  const { data, error, isLoading } = useGetMeMockedQuery(undefined, {
    skip: !isDevelopment, // Skip the query in production
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isDevelopment) {
      // In production, just clear the loading state
      dispatch(clearUser());
      return;
    }

    if (isLoading) {
      dispatch(setLoading(true));
    } else if (data?.user) {
      dispatch(setUser(data.user));
    } else {
      dispatch(clearUser());
    }
  }, [data, error, isLoading, dispatch, isDevelopment]);

  return children;
}
