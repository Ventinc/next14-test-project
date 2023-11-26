"use server";

import Database from "better-sqlite3";
import { revalidatePath } from "next/cache";
import * as context from "next/headers";
import { z } from "zod";
import { auth } from "~/lib/auth";
import { createSafeAction } from "~/lib/create-safe-action";

const signUpInput = z.object({
  email: z.string().email("Need to be an email").min(1, "Need to be an email"),
  password: z.string().min(6, "Need to contain at least 6 characters"),
});

export const signUpAction = createSafeAction(
  { schema: signUpInput },
  async (input) => {
    try {
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

      return { data: { success: true } };
    } catch (e) {
      if (
        e instanceof Database.SqliteError &&
        e.code === "SQLITE_CONSTRAINT_UNIQUE"
      ) {
        return {
          error: "This email is already used.",
        };
      }
      return {
        error: "An error occured while creating your account.",
      };
    }
  },
);
