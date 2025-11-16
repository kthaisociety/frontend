"use client";
import RegistrationForm, { FormData } from "@/components/google-auth/signup-form";

const accountRegistrationPresenter = () => {



  const handleSignUp = (formData: FormData, googleToken: string) => {
    console.log("Sign up data:", formData);
    console.log("Google Token:", googleToken);
    // Add your sign-up logic here backend integration, etc.
  };

  return (
    <RegistrationForm onClickSignUp={handleSignUp} />
  )
}

export default accountRegistrationPresenter