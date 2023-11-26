"use server";

import { revalidatePath } from "next/cache";
import { auth } from "~/lib/auth";
import * as context from "next/headers";
import { createSafeAction } from "~/lib/create-safe-action";
import { z } from "zod";

export const logoutAction = createSafeAction(
  { schema: z.object({}) },
  async () => {
    const authRequest = auth.handleRequest("POST", context);

    const session = await authRequest.validate();

    if (!session) {
      return { error: "Unauthorized" };
    }

    await auth.invalidateSession(session.sessionId);
    authRequest.setSession(null);
    revalidatePath("/dashboard");

    return {
      data: {
        logout: true,
      },
    };
  },
);
