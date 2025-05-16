import { useState } from "react";

export default function DiceGamePage() {
  const meals = [
    "Grilled Salmon with Quinoa",
    "Veggie Stir-Fry with Tofu",
    "Chicken Caesar Salad",
    "Spaghetti Aglio e Olio",
    "Lentil Soup with Bread",
    "Sushi Bowl",
  ];

  const quotes = [
    "🍅 'Let food be thy medicine.' – Hippocrates",
    "🥦 'Eat food, not too much, mostly plants.' – Michael Pollan",
    "🌮 'You don't need a silver fork to eat good food.' – Paul Prudhomme",
    "🍓 'One cannot think well, love well, sleep well, if one has not dined well.' – Virginia Woolf",
  ];

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [quote, setQuote] = useState(null);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const meal = meals[Math.floor(Math.random() * meals.length)];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setSelectedMeal(meal);
      setQuote(randomQuote);
      setRolling(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 text-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800">🎲 Meal Dice Game</h1>

        <button
          onClick={rollDice}
          className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-xl shadow-md transition-all ${rolling ? "animate-pulse" : ""}`}
        >
          {rolling ? "Rolling..." : "Roll the Dice"}
        </button>

        {selectedMeal && (
          <div className="mt-4 p-4 bg-green-100 rounded-xl text-green-900 shadow transition-transform duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold">Suggested Meal:</h2>
            <p className="mt-2 font-medium">{selectedMeal}</p>
            <p className="text-sm italic mt-2">{quote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
