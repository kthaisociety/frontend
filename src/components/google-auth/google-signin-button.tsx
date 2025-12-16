import { useGoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({
  onGoogleLogin,
}: {
  onGoogleLogin: (accessToken: string) => void;
}) => {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (codeResponse) => {
      // Send the authorization code to your backend to exchange for an access token
      onGoogleLogin(codeResponse.code);
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="
        inline-flex items-center justify-center
        rounded-xl px-6 py-3
        text-base font-semibold
        bg-primary text-white
        transition-all duration-300 ease-out
        hover:bg-primary/90
        hover:shadow-lg hover:-translate-y-0.5
      "
    >
      Member Login
    </button>
  );
};

export default GoogleLoginButton;
