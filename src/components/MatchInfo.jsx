import React from "react";
import { motion } from "framer-motion";

export default function MatchInfo({ match = {} }) {

  return (

    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 border border-cyan-500/30 shadow-lg"
    >

      <div className="grid grid-cols-2 gap-4 text-sm">

        {/* VENUE */}
        <div>

          <p className="text-gray-400 text-xs">
            VENUE
          </p>

          <p className="text-white font-semibold">
            {match.venue || "Wankhede Stadium"}
          </p>

        </div>

        {/* DATE */}
        <div>

          <p className="text-gray-400 text-xs">
            DATE
          </p>

          <p className="text-white font-semibold">
            {match.date || "Today"}
          </p>

        </div>

        {/* MATCH TYPE */}
        <div>

          <p className="text-gray-400 text-xs">
            MATCH TYPE
          </p>

          <p className="text-white font-semibold">
            {match.type || "T20"}
          </p>

        </div>

        {/* OVERS */}
        <div>

          <p className="text-gray-400 text-xs">
            OVERS
          </p>

          <p className="text-white font-semibold">
            {match.totalOvers || "20"}
          </p>

        </div>

      </div>

    </motion.div>

  );
}