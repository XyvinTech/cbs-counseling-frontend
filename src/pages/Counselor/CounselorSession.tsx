import { useState } from "react";
import SessionTable from "./SessionTable";

const CounselorSession = () => {
  const [activeTab, setActiveTab] = useState("Sessions");
  const handleTabChange = (a: string) => {
    setActiveTab(a as any);
  };
  return (
    <>
      <div className="flex gap-4 mb-6 mt-6 bg-white p-3   rounded-lg shadow-xl">
        {["Sessions", "Active Cases", "Add Remarks"].map((tabs) => (
          <button
            key={tabs}
            className={`py-2 px-4 rounded ${
              activeTab === tabs
                ? "bg-primary text-white dark:bg-primary dark:text-white"
                : "bg-gray-200 text-black dark:bg-graydark dark:text-white"
            }`}
            onClick={() => handleTabChange(tabs)}
          >
            {tabs.charAt(0).toUpperCase() + tabs.slice(1)}
          </button>
        ))}
      </div>
      
      {activeTab === "Sessions" ? <SessionTable/> : null}
    </>
  );
};

export default CounselorSession;
