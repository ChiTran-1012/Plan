import React, { useState, useEffect } from "react";
import { db } from "./FireBase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Edit3, Trash2, Calendar } from "lucide-react";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeeklyCalendar = () => {
  const [plans, setPlans] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [planName, setPlanName] = useState("");
  const [editId, setEditId] = useState(null);

  const plansRef = collection(db, "plans");

  // 🔹 Fetch data từ Firestore
  useEffect(() => {
    const fetchPlans = async () => {
      const snapshot = await getDocs(plansRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlans(data);
    };
    fetchPlans();
  }, []);

  // 🔹 Gom theo thứ
  const groupedPlans = plans.reduce((acc, plan) => {
    if (!acc[plan.day]) acc[plan.day] = [];
    acc[plan.day].push(plan);
    return acc;
  }, {});

  // 🔹 Add / Update
  const handleSubmit = async () => {
    if (planName.trim() !== "" && selectedDay) {
      if (editId) {
        const docRef = doc(db, "plans", editId);
        await updateDoc(docRef, { name: planName, day: selectedDay });
        setPlans((prev) =>
          prev.map((p) =>
            p.id === editId ? { ...p, name: planName, day: selectedDay } : p
          )
        );
        setEditId(null);
      } else {
        const docRef = await addDoc(plansRef, {
          name: planName,
          day: selectedDay,
        });
        setPlans((prev) => [
          ...prev,
          { id: docRef.id, name: planName, day: selectedDay },
        ]);
      }
      setPlanName("");
      setSelectedDay(null);
    }
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "plans", id));
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔹 Edit
  const handleEdit = (plan) => {
    setSelectedDay(plan.day);
    setPlanName(plan.name);
    setEditId(plan.id);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-6xl text-gray-900">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-500" />
        Weekly Plans
      </h2>
      

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <motion.div
            key={day}
            whileHover={{ scale: 1.05 }}
            className={`p-3 rounded-xl min-h-[150px] flex flex-col cursor-pointer border 
              ${selectedDay === day ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setSelectedDay(day)}
          >
            <div className="font-bold mb-2">{day}</div>
            <div className="space-y-2 flex-1 text-black">
              <AnimatePresence>
                {groupedPlans[day] ? (
                  groupedPlans[day].map((plan) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group relative text-sm p-2 bg-blue-200 rounded-lg shadow-md"
                    >
                      {plan.name}
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex gap-1 transition">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(plan);
                          }}
                          className="p-1 bg-yellow-400 rounded-full"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(plan.id);
                          }}
                          className="p-1 bg-red-500 text-white rounded-full"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs">No plan</p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form thêm plan */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-100 rounded-xl shadow-lg"
        >
          <h3 className="font-semibold mb-3 text-lg">
            {editId ? `✏️ Edit plan for ${selectedDay}` : `➕ Add plan for ${selectedDay}`}
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Enter your plan..."
              className="flex-1 px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transition"
            >
              <PlusCircle size={18} />
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
