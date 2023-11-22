"use server";

import { revalidatePath } from "next/cache";
import { auth } from "~/libs/auth";
import * as context from "next/headers";
import { z } from "zod";

const loginInput = z.object({
  email: z
    .string()
    .email("Need to be a valid email")
    .min(1, "Need to be a valid email"),
  password: z.string().min(6, "Need to be at least 6 characters"),
});

export const loginAction = async (_state: object, formData: FormData) => {
  const input = loginInput.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!input.success) {
    return {
      status: "error",
      type: "zod",
      zodError: input.error.flatten().fieldErrors,
      message: "An error occured in your form",
    } as const;
  }

  const authHandler = auth.handleRequest("POST", context);

  const key = await auth.useKey(
    "username",
    input.data.email,
    input.data.password,
  );

  const session = await auth.createSession({
    userId: key.userId,
    attributes: {},
  });

  authHandler.setSession(session);

  revalidatePath("/login");

  return {
    status: "success",
  } as const;
};
