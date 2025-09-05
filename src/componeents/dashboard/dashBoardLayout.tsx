import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import type { availablePlan } from "./../../App";

export default function DashboardLayout({
  time_expired,
  available_plan,
}: {
  time_expired: (time: Date) => boolean;
  available_plan: availablePlan[];
}) {
  return (
    <>
      <Header time_expired={time_expired} available_plan={available_plan} />
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        <Sidebar />
        <div className="flex-1 overflow-auto lg:ml-72 lg:mt-0 md:py-4 px-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
