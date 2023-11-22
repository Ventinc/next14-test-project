import Link from "next/link";

import { getPageSession } from "~/libs/auth";

export default async function Home() {
  const session = await getPageSession();

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-cyan-400">Server Action</span>
          <br />+{" "}
          <span className="text-neutral-900">NextJS 14 App Directory</span>
          <br />+ <span className="text-purple-600">Lucia-Auth</span>
          <br />+ <span className="text-lime-400">Drizzle</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-green-800/10 p-4 hover:bg-green-800/20"
            href="/login"
          >
            <h3 className="text-2xl font-bold">Login →</h3>
            <div className="text-lg">
              Login page - Only if you already have an account
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-green-800/10 p-4 hover:bg-green-800/20"
            href="/sign-up"
          >
            <h3 className="text-2xl font-bold">Sign Up →</h3>
            <div className="text-lg">
              Sign Up page - To create an account with lucia-auth and drizzle
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl">
            {session ? `Connected with: ${session.user.email}` : "No Session"}
          </p>
        </div>
      </div>
    </>
  );
}
