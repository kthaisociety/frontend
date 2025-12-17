"use client";
import { useEffect } from "react";
import { useGetMeMockedQuery } from "@/lib/model/apis/internal-apis";
import { useAppDispatch } from "@/lib/model/store";
import { setUser, clearUser, setLoading } from "@/lib/model/slices/auth-slice/authSlice";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { data, error, isLoading } = useGetMeMockedQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else if (data?.user) {
      dispatch(setUser(data.user));
    } else {
      dispatch(clearUser());
    }
  }, [data, error, isLoading, dispatch]);

  return <>{children}</>;
}
