import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        <Sidebar />
        <div className="flex-1 overflow-auto lg:ml-72 lg:mt-0 md:py-4 px-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
