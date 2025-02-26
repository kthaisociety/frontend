import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authApi,
  type LoginCredentials,
  type RegisterCredentials,
  type AuthResponse,
} from "@/lib/integration/api-client";
import { useRouter } from "next/navigation";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-session"], data);
      // Get the redirect URL from the query params, default to dashboard
      const redirectTo =
        new URLSearchParams(window.location.search).get("from") || "/dashboard";
      router.push(redirectTo);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      authApi.register(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-session"], data);
      router.push("/dashboard");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["auth-session"], null);
      router.push("/auth/login");
    },
  });
}

export function useSession() {
  return useQuery<AuthResponse>({
    queryKey: ["auth-session"],
    queryFn: () => authApi.getSession(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    throwOnError: false,
  });
}
