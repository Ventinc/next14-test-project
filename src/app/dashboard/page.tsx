"use server";

import { DndKitTest } from "~/app/dashboard/_components/dnd-kit-test";
import { LogoutForm } from "~/app/dashboard/_components/logout-form";

const DashboardPage = () => {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <div>
        <DndKitTest />
      </div>
      <div className="flex justify-end pt-8">
        <LogoutForm />
      </div>
    </div>
  );
};

export default DashboardPage;
