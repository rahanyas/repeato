import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import DashboardView from "../components/dashboard/DashboardView";
import ClustersView from "../components/dashboard/ClustersView";
import PredictionsView from "../components/dashboard/PredictionsView";
import UploadView from "../components/dashboard/UploadView";

export default function Dashboard({ onExit }) {
  const [tab, setTab] = useState("dashboard");
  const [activeSubject, setActiveSubject] = useState("All subjects");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex font-sans overflow-x-hidden">
      <Sidebar
        tab={tab}
        setTab={setTab}
        activeSubject={activeSubject}
        setActiveSubject={setActiveSubject}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onExit={onExit}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <Topbar tab={tab} activeSubject={activeSubject} onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {tab === "dashboard" && <DashboardView />}
          {tab === "clusters" && <ClustersView />}
          {tab === "predictions" && <PredictionsView />}
          {tab === "upload" && <UploadView />}
        </div>
      </main>
    </div>
  );
}