"use client";
import { useFormStatus } from "react-dom";
import { logoutAction } from "~/app/dashboard/actions";
import { Button } from "~/components/ui/button";

export const LogoutSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>{pending ? "Loading..." : "Logout"}</Button>
  );
};

export const LogoutForm = () => {
  return (
    <form action={logoutAction}>
      <LogoutSubmit />
    </form>
  );
};
