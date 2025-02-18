"use client";

import Link from "next/link";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { loginSchema } from "@/validators/auth";
import { CardWrapper } from "./card-wrapper";

type LoginFormFields = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<LoginFormFields>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormFields) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <CardWrapper
      title='Login'
      description='Enter your email and password to login'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/signup'
      showSocial={true}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} action=''>
        <Form {...form}>
          <div className='mb-4 space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button variant='link' className='mb-4 p-0'>
            <Link href='/auth/reset'>Forgot password?</Link>
          </Button>
          <Button
            type='submit'
            className='w-full'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <LoadingSpinner /> : "Login"}
          </Button>
        </Form>
      </form>
    </CardWrapper>
  );
}
