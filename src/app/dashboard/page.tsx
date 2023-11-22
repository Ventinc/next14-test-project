"use server";

import { LogoutForm } from "~/app/dashboard/_components/logout-form";

const DashboardPage = () => {
  return (
    <div className="rounded-xl bg-white p-6">
      <LogoutForm />
    </div>
  );
};

export default DashboardPage;
