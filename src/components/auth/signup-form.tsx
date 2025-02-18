"use client";

import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/validators/auth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CardWrapper } from "./card-wrapper";

type SignUpFormFields = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const form = useForm<SignUpFormFields>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormFields) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <CardWrapper
        title='Create an account'
        description='Enter your email below to create your account'
        backButtonLabel='Already have an account?'
        backButtonHref='/auth/login'
        showSocial={true}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} action=''>
          <Form {...form}>
            <div className='mb-4 space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type='password' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type='submit'
              className='w-full'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <LoadingSpinner />
              ) : (
                "Create account"
              )}
            </Button>
          </Form>
        </form>
      </CardWrapper>
      <p className='text-center text-sm text-muted-foreground mt-4'>
        By signing up, you agree to our Terms of Service.
      </p>
    </>
  );
}
