"use client";

import { useEffect, useState } from "react";

export default function GoogleSignup() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const g = (window as any).google;
    if (!g?.accounts?.id) return;

    g.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
    });

    g.accounts.id.renderButton(
      document.getElementById("googleSignInDiv")!,
      { theme: "outline", size: "large" }
    );
  }, []);

  function handleCredentialResponse(response: any) {
    const idToken = response?.credential;
    if (!idToken) return;

    try {
      const payload = JSON.parse(
        atob(idToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
      setUser({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        raw: payload,
      });
      console.log("Google payload:", payload);

      // TODO: send idToken to backend to verify and create session
      // fetch("/api/auth/google", { method: "POST", body: JSON.stringify({ idToken }) });
    } catch (err) {
      console.warn("Failed to decode ID token", err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("session");
    setUser(null);
    (globalThis as any).google?.accounts?.id?.disableAutoSelect?.();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!user ? (
        <div id="googleSignInDiv" />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <img src={user.picture} alt="profile" className="w-16 h-16 rounded-full" />
          <p>Signed in as {user.name ?? user.email}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
