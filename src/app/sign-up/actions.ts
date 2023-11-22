"use server";

import { revalidatePath } from "next/cache";
import * as context from "next/headers";
import { z } from "zod";
import { auth } from "~/libs/auth";

const signUpInput = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6),
});

export const signUpAction = async (formData: FormData) => {
  const input = signUpInput.parse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  const user = await auth.createUser({
    key: {
      providerId: "username", // auth method
      providerUserId: input.email.toLowerCase(), // unique id when using "username" auth method
      password: input.password,
    },
    attributes: {
      email: input.email,
    },
  });
  const session = await auth.createSession({
    userId: user.userId,
    attributes: {},
  });
  const authRequest = auth.handleRequest("POST", context);
  authRequest.setSession(session);

  revalidatePath("/sign-up");
};
