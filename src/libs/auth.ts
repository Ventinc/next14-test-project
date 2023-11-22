import { lucia } from "lucia";
import { env } from "~/env.mjs";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import { sqlite } from "~/server/db";
import { nextjs_future } from "lucia/middleware";
import { cache } from "react";
import * as context from "next/headers";

export const auth = lucia({
  adapter: betterSqlite3(sqlite, {
    user: "user",
    key: "user_key",
    session: "user_session",
  }),
  middleware: nextjs_future(),
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      email: data.email,
    };
  },
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
