"use server";

import { logoutAction } from "~/app/dashboard/actions";
import { Button } from "~/components/ui/button";

const DashboardPage = () => {
  return (
    <div className="rounded-xl bg-white p-6">
      <form action={logoutAction}>
        <Button>Logout</Button>
      </form>
    </div>
  );
};

export default DashboardPage;
