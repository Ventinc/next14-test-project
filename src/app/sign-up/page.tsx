import Link from "next/link";
import { redirect } from "next/navigation";
import { signUpAction } from "~/app/sign-up/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getPageSession } from "~/libs/auth";

const SignUpPage = async () => {
  const session = await getPageSession();

  if (session) redirect("/dashboard");

  return (
    <>
      <h1 className="pb-4 text-4xl font-bold text-green-800">Sign Up</h1>
      <form
        action={signUpAction}
        className="flex flex-col gap-2 rounded-xl bg-white p-6"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div className="flex flex-col items-center pt-4">
          <Button type="submit">Create account</Button>
          <Link
            href="/login"
            className="color-green-900 pt-4 text-center text-xs underline"
          >
            Or, login to existing account
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
