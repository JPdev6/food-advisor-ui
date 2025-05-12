import { useEffect, useState } from "react";

export default function Dashboard({ token }) {
  const [meal, setMeal] = useState("");
  const [entries, setEntries] = useState([]);
  const [diceMeal, setDiceMeal] = useState(null);
  const [message, setMessage] = useState("");
  const API = "https://your-backend.onrender.com";

  const fetchEntries = async () => {
    const res = await fetch("http://localhost:8000/food", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setEntries(data);
  };

  const addMeal = async (e) => {
    e.preventDefault();
    if (!meal) return;

    const res = await fetch("http://localhost:8000/food", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ meal }),
    });

    if (res.ok) {
      setMeal("");
      fetchEntries();
    }
  };

  const rollDice = async () => {
    const res = await fetch("http://localhost:8000/dice");
    const data = await res.json();
    setDiceMeal(data.suggested_meal);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">🍽️ Food Log</h1>

      <form onSubmit={addMeal} className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="What did you eat?"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add
        </button>
      </form>

      <div>
        <h2 className="font-semibold mb-2">Your Meals:</h2>
        <ul className="bg-gray-100 p-3 rounded-lg space-y-1">
          {entries.map((entry) => (
            <li key={entry.id}>
              {entry.date}: {entry.meal}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center space-y-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={rollDice}
        >
          🎲 Roll Meal Dice
        </button>
        {diceMeal && (
          <p className="font-medium text-green-700">
            How about: <strong>{diceMeal}</strong>?
          </p>
        )}
      </div>
    </div>
  );
}
