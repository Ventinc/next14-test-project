import { redirect } from "next/navigation";
import { SignUpForm } from "~/app/sign-up/_components/signup-form";
import { getPageSession } from "~/libs/auth";

const SignUpPage = async () => {
  const session = await getPageSession();

  if (session) redirect("/dashboard");

  return (
    <>
      <h1 className="pb-4 text-4xl font-bold text-green-800">Sign Up</h1>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
