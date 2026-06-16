import React from "react";
import { motion } from "framer-motion";

export default function Scoreboard({

  // TEAM 1
  team1 = {
    name: "MUMBAI STRIKERS",
    score: 126,
    wickets: 4,
    overs: 12,
    balls: 3,
    logo: "",
  },

  // TEAM 2
  team2 = {
    name: "PUNE WARRIORS",
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    logo: "",
  },

  // MATCH STATUS
  matchStatus = "live",

  // NEW ADDITIONS
  currentInnings = 1,

  target = 0,

  totalOvers = 20,

  currentRunRate = 10.08,

  requiredRunRate = 12.50,

  showRequiredRate = false,

  tossWinner = "Mumbai Strikers",

  tossDecision = "Bat",

  venue = "Wankhede Stadium",

}) {

  // CURRENT TEAM
  const battingTeam =
    currentInnings === 1
      ? team1
      : team2;

  // CHASING INFO
  const runsNeeded =
    target > 0
      ? target - team2.score
      : 0;

  const ballsLeft =
    target > 0
      ? (
          (totalOvers * 6) -
          ((team2.overs * 6) + team2.balls)
        )
      : 0;

  return (

    <div className="w-full flex justify-center px-4">

      <motion.div
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-7xl rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
      >

        {/* MAIN SCOREBOARD */}
        <div className="grid grid-cols-3">

          {/* LEFT TEAM */}
          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 px-6 py-5 flex items-center gap-5">

            {/* LOGO */}
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden flex items-center justify-center shadow-lg">

              {team1.logo ? (

                <img
                  src={team1.logo}
                  alt={team1.name}
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="text-white font-black text-2xl">

                  {team1.name?.charAt(0)}

                </div>

              )}

            </div>

            {/* TEAM INFO */}
            <div>

              <p className="text-gray-300 text-sm uppercase tracking-widest">

                TEAM 1

              </p>

              <h2 className="text-3xl font-black text-white leading-none">

                {team1.name}

              </h2>

              <p className="text-cyan-300 mt-2 text-lg font-bold">

                {team1.score}/{team1.wickets}

              </p>

              <p className="text-gray-300 text-sm">

                {team1.overs}.{team1.balls} Overs

              </p>

            </div>

          </div>


          {/* CENTER SCORE */}
          <div className="bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col items-center justify-center py-5 border-x border-slate-700 relative">

            {/* LIVE BADGE */}
            {matchStatus === "live" && (

              <div className="bg-red-500 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-500/50 mb-3">

                <motion.span
                  animate={{
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="w-2 h-2 bg-white rounded-full"
                />

                LIVE

              </div>

            )}

            {/* INNINGS */}
            <p className="text-cyan-400 text-sm font-bold mb-1">

              {currentInnings === 1
                ? "FIRST INNINGS"
                : "SECOND INNINGS"}

            </p>

            {/* MAIN SCORE */}
            <h1 className="text-6xl font-black text-white tracking-wide">

              {battingTeam.score}/{battingTeam.wickets}

            </h1>

            {/* OVERS */}
            <p className="text-2xl text-gray-300 mt-2">

              {battingTeam.overs}.{battingTeam.balls} / {totalOvers} OVERS

            </p>

            {/* RUN RATE */}
            <div className="flex gap-6 mt-3">

              <div className="text-center">

                <p className="text-gray-400 text-xs">

                  CRR

                </p>

                <p className="text-yellow-400 font-bold text-lg">

                  {currentRunRate}

                </p>

              </div>

              {showRequiredRate && (

                <div className="text-center">

                  <p className="text-gray-400 text-xs">

                    RRR

                  </p>

                  <p className="text-red-400 font-bold text-lg">

                    {requiredRunRate}

                  </p>

                </div>

              )}

            </div>

          </div>


          {/* RIGHT TEAM */}
          <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-700 px-6 py-5 flex items-center justify-end gap-5">

            {/* TEAM INFO */}
            <div className="text-right">

              <p className="text-gray-300 text-sm uppercase tracking-widest">

                TEAM 2

              </p>

              <h2 className="text-3xl font-black text-white leading-none">

                {team2.name}

              </h2>

              <p className="text-red-300 mt-2 text-lg font-bold">

                {team2.score}/{team2.wickets}

              </p>

              <p className="text-gray-300 text-sm">

                {team2.overs}.{team2.balls} Overs

              </p>

            </div>

            {/* LOGO */}
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden flex items-center justify-center shadow-lg">

              {team2.logo ? (

                <img
                  src={team2.logo}
                  alt={team2.name}
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="text-white font-black text-2xl">

                  {team2.name?.charAt(0)}

                </div>

              )}

            </div>

          </div>

        </div>


        {/* BOTTOM INFO BAR */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700 px-6 py-3 flex justify-between items-center flex-wrap gap-4">

          {/* VENUE */}
          <div>

            <p className="text-gray-400 text-xs">

              VENUE

            </p>

            <p className="text-white font-semibold">

              {venue}

            </p>

          </div>

          {/* TOSS */}
          <div>

            <p className="text-gray-400 text-xs">

              TOSS

            </p>

            <p className="text-white font-semibold">

              {tossWinner} elected to {tossDecision}

            </p>

          </div>

          {/* TARGET INFO */}
          {target > 0 && (

            <div>

              <p className="text-gray-400 text-xs">

                TARGET

              </p>

              <p className="text-green-400 font-bold">

                Need {runsNeeded} Runs in {ballsLeft} Balls

              </p>

            </div>

          )}

          {/* MATCH STATUS */}
          <div>

            <p className="text-gray-400 text-xs">

              STATUS

            </p>

            <p className="text-cyan-400 font-bold uppercase">

              {matchStatus}

            </p>

          </div>

        </div>

      </motion.div>

    </div>

  );

}