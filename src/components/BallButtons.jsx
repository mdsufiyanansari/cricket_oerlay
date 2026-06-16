import React from 'react';
import { motion } from 'framer-motion';
import { FiRotateCcw } from 'react-icons/fi';

export default function BallButtons({
  handleRun = () => {},
  handleWicket = () => {},
  handleWide = () => {},
  handleNoBall = () => {},
  handleBye = () => {},
  handleLegBye = () => {},
  handleWideBye = () => {},
  handleRunOut = () => {},
  handleUndo = () => {},
  disabled = false
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonClass = (color) => `
    ${color}
    px-6 py-4 rounded-lg font-bold text-xl transition-all duration-200
    hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
    shadow-lg hover:shadow-2xl transform
    border-2 border-white/30
  `;

  return (
    <div className="space-y-6 w-full">
      {/* Run Buttons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-4"
      >
        {[0, 1, 2].map((run) => (
          <motion.button
            key={`run-${run}`}
            variants={itemVariants}
            onClick={() => handleRun(run)}
            disabled={disabled}
            className={buttonClass('bg-blue-600 text-white hover:bg-blue-500')}
          >
            {run}
          </motion.button>
        ))}
      </motion.div>

      {/* Bigger Runs */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-4"
      >
        {[3, 4, 6].map((run) => (
          <motion.button
            key={`run-${run}`}
            variants={itemVariants}
            onClick={() => handleRun(run)}
            disabled={disabled}
            className={buttonClass('bg-green-600 text-white hover:bg-green-500 text-2xl')}
          >
            {run}
          </motion.button>
        ))}
      </motion.div>

      {/* Special Outcomes */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4"
      >
        <motion.button
          variants={itemVariants}
          onClick={handleWicket}
          disabled={disabled}
          className={buttonClass('bg-red-600 text-white hover:bg-red-500 text-lg')}
        >
          WICKET
        </motion.button>
        <motion.button
          variants={itemVariants}
          onClick={handleWide}
          disabled={disabled}
          className={buttonClass('bg-purple-600 text-white hover:bg-purple-500')}
        >
          WIDE
        </motion.button>
      </motion.div>

      {/* More Special Cases */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4"
      >
        <motion.button
          variants={itemVariants}
          onClick={handleNoBall}
          disabled={disabled}
          className={buttonClass('bg-orange-600 text-white hover:bg-orange-500')}
        >
          NO BALL
        </motion.button>
        <motion.button
          variants={itemVariants}
          onClick={handleBye}
          disabled={disabled}
          className={buttonClass('bg-cyan-600 text-white hover:bg-cyan-500')}
        >
          BYE
        </motion.button>
      </motion.div>

      {/* Leg Bye and Undo */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4"
      >
        <motion.button
          variants={itemVariants}
          onClick={handleLegBye}
          disabled={disabled}
          className={buttonClass('bg-yellow-600 text-white hover:bg-yellow-500')}
        >
          LEG BYE
        </motion.button>

        <motion.button
  variants={itemVariants}
  onClick={handleRunOut}
  disabled={disabled}
  className={buttonClass('bg-yellow-600 text-white hover:bg-yellow-500')}
>
  RUN OUT
</motion.button>

<div className="grid grid-cols-3 gap-2">
  {[1,2,3,4,5,6].map(run => (
    <button
      key={run}
      onClick={() => handleWideBye(run)}
      disabled={disabled}
      className="bg-pink-600 text-white rounded-lg py-2"
    >
      WB {run}
    </button>
  ))}
</div>

        <motion.button
          variants={itemVariants}
          onClick={handleUndo}
          disabled={disabled}
          className={buttonClass('bg-gray-600 text-white hover:bg-gray-500 flex items-center justify-center gap-2')}
        >
          <FiRotateCcw /> UNDO
        </motion.button>
      </motion.div>
    </div>
  );
}