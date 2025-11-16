import { useEffect } from "react";

interface GoogleSignInProps {
  onSuccess: (idToken: string) => void;
  onError?: (err: any) => void;
}

// Hook that initializes Google Identity Services and returns a signIn function
function useGoogleSignIn({ onSuccess, onError }: GoogleSignInProps) {
  useEffect(() => {
    const g = (window as any).google;
    if (!g?.accounts?.id) return;

    g.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: (response: any) => {
        if (response?.credential) {
          onSuccess(response.credential);
        } else {
          onError?.(new Error("No credential returned"));
        }
      },
    });
  }, [onSuccess, onError]);

  const googleSignIn = () => {
    const g = (window as any).google;
    if (g?.accounts?.id) {
      g.accounts.id.prompt();
    } else {
      onError?.(new Error("Google Identity Services not loaded"));
    }
  };

  return { googleSignIn };
}

export default useGoogleSignIn;
