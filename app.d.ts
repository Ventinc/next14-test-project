// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  type Auth = import("~/libs/auth").Auth;
  type DatabaseUserAttributes = {
    email: string;
  };
  type DatabaseSessionAttributes = object;
}
