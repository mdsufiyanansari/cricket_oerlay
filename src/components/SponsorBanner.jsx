import React from "react";
import { motion } from "framer-motion";

export default function SponsorBanner({
  sponsors = [],
}) {

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 border-y border-cyan-500/20 py-3 px-6 backdrop-blur-md"
    >

      {/* TOP SECTION */}
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <motion.p
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-wider"
        >

          PRESENTING PARTNER

        </motion.p>

        {/* RIGHT */}
        <motion.div
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-sm font-bold text-cyan-400"
        >

          IPL CRICKET OVERLAY

        </motion.div>

      </div>

      {/* SPONSORS */}
      {sponsors.length > 0 && (

        <div className="flex gap-4 mt-4 overflow-x-auto scrollbar-hide">

          {sponsors.map((sponsor, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
              }}
              className="flex-shrink-0 h-10 px-4 bg-slate-700/50 rounded-lg flex items-center justify-center text-xs text-gray-300 border border-cyan-500/30 shadow-md backdrop-blur-sm"
            >

              {sponsor}

            </motion.div>

          ))}

        </div>

      )}

    </motion.div>

  );
}