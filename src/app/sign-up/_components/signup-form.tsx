"use client";
import Link from "next/link";
import { signUpAction } from "~/app/sign-up/actions";
import { Button } from "~/components/ui/button";
import { ErrorMessage } from "~/components/ui/error-message";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createOnSubmitAction, useAction } from "~/hooks/use-action";

export const SignUpForm = () => {
  const { execute, fieldErrors, isLoading, error } = useAction(signUpAction);

  const onSubmit = createOnSubmitAction(execute);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 rounded-xl bg-white p-6"
    >
      <ErrorMessage>{error}</ErrorMessage>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="johndoe@gmail.com"
        />
        <ErrorMessage>{fieldErrors?.email?.[0]}</ErrorMessage>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="password"
        />
        <ErrorMessage>{fieldErrors?.password?.[0]}</ErrorMessage>
      </div>
      <div className="flex flex-col items-center pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create account"}
        </Button>
        <Link
          href="/login"
          className="color-green-900 pt-4 text-center text-xs underline"
        >
          Or, login to existing account
        </Link>
      </div>
    </form>
  );
};
