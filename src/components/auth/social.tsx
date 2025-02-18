"use client";

import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type OAuthProvider = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export function Social() {
  const oauthProviders: OAuthProvider[] = [
    {
      id: "google",
      name: "Continue with Google",
      icon: <FaGoogle className='mr-2 h-5 w-5' />,
    },
  ];

  const handleOAuthLogin = async (provider: string) => {
    console.log(provider);
  };

  return (
    <div className='mx-6 flex flex-col gap-4'>
      {oauthProviders.map((provider) => (
        <Button
          key={provider.id}
          variant='outline'
          className='flex h-11 w-full items-center justify-center gap-2'
          onClick={() => handleOAuthLogin(provider.id)}
        >
          {provider.icon}
          <span>{provider.name}</span>
        </Button>
      ))}
    </div>
  );
}
