import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [rolling, setRolling] = useState(false);

  const getSuggestion = async () => {
    setRolling(true);

    const mealCount = {};
    meals.forEach((m) => {
      mealCount[m.meal] = (mealCount[m.meal] || 0) + 1;
    });

    try {
      const res = await fetch(`${API}/suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: meals.map((m) => m.meal),
          frequency: mealCount,
        }),
      });

      const data = await res.json();
      setTimeout(() => {
        setSuggestion(data);
        setRolling(false);
      }, 800);
    } catch (error) {
      console.error("Failed to fetch suggestion:", error);
      setRolling(false);
    }
  };

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(`${API}/meals`);
      const data = await res.json();
      setMeals(data);
    };
    fetchMeals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 px-4 py-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-xl sm:text-2xl font-serif italic text-green-700"
        >
          ✨ Let’s find your next favorite meal...
        </motion.div>

        <button
          onClick={getSuggestion}
          className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300 text-lg ${
            rolling ? "animate-pulse" : ""
          }`}
        >
          {rolling ? "Rolling..." : "Roll the Dice"}
        </button>

        {suggestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-green-100 rounded-xl p-5 text-center shadow-md"
          >
            <h2 className="text-xl font-semibold text-green-800">Today's Suggestion:</h2>
            <p className="text-lg mt-2 font-medium">{suggestion.meal}</p>
            <p className="mt-2 text-sm italic text-green-700">"{suggestion.fact}"</p>
          </motion.div>
        )}

        <div className="pt-6 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search meals..."
            className="w-full px-4 py-2 border rounded-lg mb-2 focus:ring-2 focus:ring-green-300"
          />

          <h3 className="text-lg font-semibold text-gray-700">🍴 Recent Meals</h3>
          <ul className="bg-gray-100 mt-2 p-4 rounded-lg divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {meals
              .filter((m) => m.meal.toLowerCase().includes(search.toLowerCase()))
              .map((m, i) => (
                <li key={i} className="py-2 flex justify-between items-center">
                  <span className="text-gray-800">🍽️ {m.meal}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
