import React from 'react';
import { motion } from 'framer-motion';

export default function BowlerCard({ bowler = {} }) {
  const { name = 'Bowler', image = '', overs = 0, runs = 0, wickets = 0, economy = 0, balls = 0 } = bowler;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border-2 border-red-500 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden border border-red-500 flex-shrink-0">
          {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white">{name}</h2>
          <p className="text-sm text-red-400 font-semibold">{wickets}/{runs}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3 text-center">
        <div className="bg-slate-700/50 rounded p-1">
          <p className="text-cyan-400 font-bold">{overs}.{balls}</p>
          <p className="text-xs text-gray-400">Ov</p>
        </div>
        <div className="bg-slate-700/50 rounded p-1">
          <p className="text-green-400 font-bold">{economy}</p>
          <p className="text-xs text-gray-400">Eco</p>
        </div>
        <div className="bg-slate-700/50 rounded p-1">
          <p className="text-red-400 font-bold">{runs}</p>
          <p className="text-xs text-gray-400">R</p>
        </div>
      </div>
    </motion.div>
  );
}