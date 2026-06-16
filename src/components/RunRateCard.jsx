import React from "react";
import { motion } from "framer-motion";

export default function RunRateCard({
  runRate = 0,
  requiredRunRate = 0,
  showRequired = false,
}) {

  return (

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-yellow-900 to-slate-900 p-6 rounded-2xl border-2 border-yellow-500 shadow-lg shadow-yellow-500/30"
    >

      {/* TITLE */}
      <h3 className="text-sm text-yellow-400 font-semibold mb-4 tracking-wide">
        RUN RATE
      </h3>

      <div className="space-y-5">

        {/* CURRENT RUN RATE */}
        <div className="text-center">

          <p className="text-4xl font-bold text-yellow-300">
            {runRate}
          </p>

          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
            Current Run Rate
          </p>

        </div>

        {/* REQUIRED RUN RATE */}
        {showRequired && requiredRunRate > 0 && (

          <div className="pt-4 border-t border-yellow-500/30">

            <div className="text-center">

              <p className="text-3xl font-bold text-orange-300">
                {requiredRunRate}
              </p>

              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                Required Run Rate
              </p>

            </div>

          </div>

        )}

      </div>

    </motion.div>

  );
}