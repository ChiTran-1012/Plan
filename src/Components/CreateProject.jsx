import React from "react";
import { Calendar, Dumbbell } from "lucide-react"; // icon đẹp
import WeeklyCalendar from "./WeeklyCalendar";
import Fitness from "./Fitness";

const CreateProject = () => {
  const [plans, setPlans] = React.useState([]);
  const [page, setPage] = React.useState("weekly"); // "weekly" hoặc "fitness"

  // ---- CRUD cho Weekly Plans ----
  const handleAddPlan = (plan) => setPlans([...plans, plan]);
  const handleDeletePlan = (idx) =>
    setPlans(plans.filter((_, i) => i !== idx));
  const handleEditPlan = (idx, updatedPlan) =>
    setPlans(plans.map((p, i) => (i === idx ? updatedPlan : p)));

  return (
    <div className="grid grid-cols-[240px,1fr] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 h-screen text-white">
      {/* Sidebar */}
      <div className="bg-slate-950 border-r border-slate-800 flex flex-col items-center p-6 gap-6 shadow-xl">
        <h2 className="text-2xl font-bold tracking-wide text-blue-400">
          Dashboard
        </h2>

        <button
          onClick={() => setPage("weekly")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full font-medium transition-all duration-200 ${
            page === "weekly"
              ? "bg-blue-600 shadow-lg"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          <Calendar size={20} />
          Weekly Plans
        </button>

        <button
          onClick={() => setPage("fitness")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full font-medium transition-all duration-200 ${
            page === "fitness"
              ? "bg-blue-600 shadow-lg"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          <Dumbbell size={20} />
          Workout Guide
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col justify-start items-center gap-8 p-10 bg-slate-100 overflow-y-auto text-slate-900">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
          {page === "weekly" && (
            <WeeklyCalendar
              plans={plans}
              onAddPlan={handleAddPlan}
              onDeletePlan={handleDeletePlan}
              onEditPlan={handleEditPlan}
            />
          )}

          {page === "fitness" && <Fitness />}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
