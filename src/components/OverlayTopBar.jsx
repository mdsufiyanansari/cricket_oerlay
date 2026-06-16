import React from 'react';
import { motion } from 'framer-motion';

export default function OverlayTopBar({ status = 'live', matchInfo = '' }) {
  return (
    <div className="absolute top-0 left-0 right-0 w-full">
      {/* Live Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-6 py-3 rounded-br-2xl text-white font-bold shadow-lg shadow-red-600/50 z-40"
      >
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-3 h-3 bg-white rounded-full"
        />
        LIVE
      </motion.div>

      {/* Match Info Ticker */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4 bg-gradient-to-r from-slate-900/90 to-slate-800/90 px-6 py-3 rounded-bl-2xl text-white font-semibold text-sm shadow-lg border border-cyan-500/30 backdrop-blur-md max-w-md z-40"
      >
        {matchInfo || 'IPL Cricket Overlay Live Scoring'}
      </motion.div>

      {/* Sponsor Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-blue-500/10 border-t border-yellow-500/20 flex items-center justify-center"
      >
        <motion.p
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white font-bold text-sm"
        >
          IPL LIVE SCORING POWERED BY CRICKET OVERLAY
        </motion.p>
      </motion.div>
    </div>
  );
}