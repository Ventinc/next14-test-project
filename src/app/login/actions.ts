"use server";

import { revalidatePath } from "next/cache";
import { auth } from "~/libs/auth";
import * as context from "next/headers";
import { z } from "zod";

const loginInput = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6),
});

export const loginAction = async (formData: FormData) => {
  const input = loginInput.parse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  const authHandler = auth.handleRequest("POST", context);

  const key = await auth.useKey("username", input.email, input.password);

  const session = await auth.createSession({
    userId: key.userId,
    attributes: {},
  });

  authHandler.setSession(session);

  revalidatePath("/login");
};
