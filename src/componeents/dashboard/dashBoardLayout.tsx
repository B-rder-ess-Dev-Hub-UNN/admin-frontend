import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import type { availablePlan } from "./../../App";

export default function DashboardLayout({
  time_expired,
  checked_in_email,
  available_plan,
}: {
  time_expired: (time: Date) => boolean;
  checked_in_email: string;
  available_plan: availablePlan[];
}) {
  return (
    <>
      <Header time_expired={time_expired} available_plan={available_plan} />
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        <Sidebar checked_in_email={checked_in_email} />
        <div className="flex-1 overflow-auto lg:ml-72 lg:mt-0 md:py-4 px-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
