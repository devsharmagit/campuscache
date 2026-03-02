"use client";

import { useState, useTransition, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      if (result?.ok) {
        router.push(callbackUrl);
      }
    });
  };

  const handleGoogleSignIn = () => {
    setError(null);
    void signIn("google", { callbackUrl });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold tracking-tight">
              Sign in to Campus Cache
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Access your saved resources and dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-center"
                onClick={handleGoogleSignIn}
                disabled={isPending}
              >
                Continue with Google
              </Button>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Separator className="flex-1" />
              <span>or continue with email</span>
              <Separator className="flex-1" />
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@college.edu"
                  required
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  disabled={isPending}
                />
              </div>

              {error ? (
                <p className="text-xs text-destructive" aria-live="polite">
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                className="w-full justify-center"
                disabled={isPending}
              >
                {isPending ? "Signing you in..." : "Sign in"}
              </Button>
            </form>

            <p className="pt-2 text-xs text-muted-foreground">
              New here?{" "}
              <a
                href="/singup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Create an account
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
