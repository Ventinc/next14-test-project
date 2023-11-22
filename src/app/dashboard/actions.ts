"use server";

import { revalidatePath } from "next/cache";
import { auth } from "~/libs/auth";
import * as context from "next/headers";

export const logoutAction = async () => {
  const authRequest = auth.handleRequest("POST", context);

  const session = await authRequest.validate();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  revalidatePath("/dashboard");
};
