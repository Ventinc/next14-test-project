import { redirect } from "next/navigation";
import React from "react";
import { getPageSession } from "~/lib/auth";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getPageSession();

  if (!session) redirect("/login");

  return (
    <div className="p-8">
      <h1 className="px-4 pb-4 text-4xl font-bold text-green-900">
        Dashboard Layout
      </h1>
      {children}
    </div>
  );
};

export default DashboardLayout;
