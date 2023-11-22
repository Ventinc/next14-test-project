"use client";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "~/app/login/actions";
import { Button } from "~/components/ui/button";
import { ErrorMessage } from "~/components/ui/error-message";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const LoginSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading..." : "Login"}
    </Button>
  );
};

export const LoginForm = () => {
  const [state, formAction] = useFormState(loginAction, { status: "success" });

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 rounded-xl bg-white p-6"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="johndoe@gmail.com"
        />
        <ErrorMessage>{state.zodError?.email?.[0]}</ErrorMessage>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="password"
        />
        <ErrorMessage>{state.zodError?.password?.[0]}</ErrorMessage>
      </div>
      <div className="flex flex-col items-center pt-4">
        <LoginSubmit />
        <Link
          href="/sign-up"
          className="color-green-900 pt-4 text-center text-xs underline"
        >
          Or, create a new account
        </Link>
      </div>
    </form>
  );
};
