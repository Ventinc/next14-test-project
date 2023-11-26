"use server";

import { revalidatePath } from "next/cache";
import { auth } from "~/lib/auth";
import * as context from "next/headers";
import { z } from "zod";
import { createSafeAction } from "~/lib/create-safe-action";
import { LuciaError } from "lucia";

const loginInput = z.object({
  email: z
    .string()
    .email("Need to be a valid email")
    .min(1, "Need to be a valid email"),
  password: z.string().min(6, "Need to be at least 6 characters"),
});

export const loginAction = createSafeAction(
  { schema: loginInput },
  async (input) => {
    try {
      const authHandler = auth.handleRequest("POST", context);

      const key = await auth.useKey("username", input.email, input.password);

      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      });

      authHandler.setSession(session);

      revalidatePath("/login");

      return {
        data: { success: true },
      };
    } catch (e) {
      if (e instanceof LuciaError && e.message === "AUTH_INVALID_PASSWORD") {
        return {
          error: "Invalid email or password.",
        };
      }

      return {
        error: "An error occured, impossible to log into your account.",
      };
    }
  },
);
