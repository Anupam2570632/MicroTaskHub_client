import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../Shared/Dashboard/Sidebar";

export default function Dashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[250px_1fr] ">
      {/* Sidebar */}
      <DashboardSidebar />
      {/* Right Panel */}

      <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#7ae6ac3a]">
        <Outlet />
      </main>
    </div>
  );
}
