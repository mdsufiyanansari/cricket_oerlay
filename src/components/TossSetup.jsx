import React from "react";

export default function TossSetup({
  team1,
  team2,
  tossWinner,
  setTossWinner,
  tossDecision,
  setTossDecision,
}) {
  return (
    <div className="bg-slate-900 p-6 rounded-3xl space-y-5">

      <h2 className="text-3xl font-black text-yellow-400">
        TOSS SETUP
      </h2>

      {/* Toss Winner */}

      <div>
        <label className="block mb-2 font-bold">
          Toss Winner
        </label>

        <select
          value={tossWinner}
          onChange={(e) =>
            setTossWinner(e.target.value)
          }
          className="
            w-full
            bg-slate-800
            p-4
            rounded-xl
          "
        >
          <option value="">
            Select Team
          </option>

          <option value={team1}>
            {team1}
          </option>

          <option value={team2}>
            {team2}
          </option>

        </select>
      </div>

      {/* Decision */}

      {tossWinner && (
        <div>

          <label className="block mb-3 font-bold">
            Decision
          </label>

          <div className="flex gap-4">

            <button
              onClick={() =>
                setTossDecision("bat")
              }
              className={`
                px-6 py-3 rounded-xl font-black
                transition-all
                ${
                  tossDecision === "bat"
                    ? "bg-green-600"
                    : "bg-slate-700"
                }
              `}
            >
              BAT FIRST
            </button>

            <button
              onClick={() =>
                setTossDecision("bowl")
              }
              className={`
                px-6 py-3 rounded-xl font-black
                transition-all
                ${
                  tossDecision === "bowl"
                    ? "bg-red-600"
                    : "bg-slate-700"
                }
              `}
            >
              BOWL FIRST
            </button>

          </div>

        </div>
      )}

      {/* Preview */}

      {tossWinner && tossDecision && (

        <div
          className="
            bg-slate-800
            p-4
            rounded-xl
            border
            border-cyan-500
          "
        >

          <p className="text-cyan-400 font-bold">

            {tossWinner}
            {" "}
            won the toss and elected to
            {" "}
            {tossDecision}

          </p>

        </div>

      )}

    </div>
  );
}