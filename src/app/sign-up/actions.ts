"use server";

import { revalidatePath } from "next/cache";
import * as context from "next/headers";
import { z } from "zod";
import { auth } from "~/libs/auth";

const signUpInput = z.object({
  email: z.string().email("Need to be an email").min(1, "Need to be an email"),
  password: z.string().min(6, "Need to contain at least 6 characters"),
});

export const signUpAction = async (_oldState: object, formData: FormData) => {
  const input = signUpInput.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!input.success) {
    return {
      status: "error",
      type: "zod",
      zodError: input.error.flatten().fieldErrors,
      message: "An error occured in your form",
    } as const;
  }

  const user = await auth.createUser({
    key: {
      providerId: "username", // auth method
      providerUserId: input.data.email.toLowerCase(), // unique id when using "username" auth method
      password: input.data.password,
    },
    attributes: {
      email: input.data.email,
    },
  });
  const session = await auth.createSession({
    userId: user.userId,
    attributes: {},
  });
  const authRequest = auth.handleRequest("POST", context);
  authRequest.setSession(session);

  revalidatePath("/sign-up");

  return { status: "success" } as const;
};
