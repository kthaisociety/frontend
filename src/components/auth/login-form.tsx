"use client";

import { useLogin } from "@/hooks/auth";
import { loginSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type LoginFormFields = z.infer<typeof loginSchema>;

export function LoginForm() {
  const searchParams = useSearchParams();
  const login = useLogin();
  const { toast } = useToast();
  // Show error message from URL if present
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast({
        title: "Error",
        description: decodeURIComponent(error),
      });
    }
  }, [searchParams]);

  const form = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormFields) => {
    await login.mutateAsync(data);
  };

  return (
    <CardWrapper
      title='Login'
      description='Enter your email and password to login'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/signup'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type='email' disabled={login.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    disabled={login.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {login.error && (
            <div className='text-sm text-red-500'>{login.error.message}</div>
          )}
          <Button type='submit' className='w-full' disabled={login.isPending}>
            {login.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
