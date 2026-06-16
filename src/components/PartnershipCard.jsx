import React from 'react';
import { motion } from 'framer-motion';

export default function PartnershipCard({ partnership = { runs: 0, balls: 0 } }) {
  const { runs = 0, balls = 0 } = partnership;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-purple-900 to-slate-900 p-6 rounded-xl border-2 border-purple-500 shadow-lg shadow-purple-500/30"
    >
      <h3 className="text-sm text-purple-400 font-semibold mb-3">PARTNERSHIP</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-300">{runs}</p>
          <p className="text-xs text-gray-400 mt-1">Runs</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-300">{balls}</p>
          <p className="text-xs text-gray-400 mt-1">Balls</p>
        </div>
      </div>
    </motion.div>
  );
}
