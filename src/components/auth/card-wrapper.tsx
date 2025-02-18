import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Social } from "./social";

export function CardWrapper({
  children,
  title,
  description,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
}) {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {showSocial && (
        <>
          <Social />
          <div className='relative px-6 py-4 mx-6'>
            <div className='absolute inset-0 flex items-center'>
              <Separator />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or
              </span>
            </div>
          </div>
        </>
      )}
      <CardContent>{children}</CardContent>

      <CardFooter className='mt-4 flex justify-center'>
        <Button variant='link' asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
