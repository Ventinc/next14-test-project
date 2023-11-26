import { redirect } from "next/navigation";
import { LoginForm } from "~/app/login/_components/login-form";
import { getPageSession } from "~/lib/auth";

const LoginPage = async () => {
  const session = await getPageSession();

  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="pb-4 text-4xl font-bold text-green-800">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
