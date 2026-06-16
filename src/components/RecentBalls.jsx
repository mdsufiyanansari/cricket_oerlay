import React from "react";
import { motion } from "framer-motion";

export default function RecentBalls({
  balls = [],
}) {

  // Only show last 6 balls
  const recentBalls = balls.slice(-6);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },

    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  // AUTO COLOR FUNCTION
  const getBallColor = (ball) => {

    const value =
      typeof ball === "object"
        ? ball.display
        : ball;

    if (value === "W")
      return "bg-red-600 border-red-400";

    if (value === "WD")
      return "bg-purple-600 border-purple-400";

    if (value === "NB")
      return "bg-orange-600 border-orange-400";

    if (value === "BYE" || value === "B")
      return "bg-cyan-600 border-cyan-400";

    if (value === 4 || value === "4")
      return "bg-green-600 border-green-400";

    if (value === 6 || value === "6")
      return "bg-yellow-500 border-yellow-300 text-black";

    if (value === "RO")
      return "bg-red-700 border-red-500";

    return "bg-blue-600 border-blue-400";

  };

  return (

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex gap-2 flex-wrap"
    >

      {recentBalls.map((ball, idx) => {

        const display =
          typeof ball === "object"
            ? ball.display
            : ball;

        return (

          <motion.div
            key={idx}
            variants={itemVariants}
            className={`
              w-12
              h-12
              rounded-lg
              flex
              items-center
              justify-center
              font-bold
              text-lg
              shadow-lg
              border
              ${getBallColor(ball)}
            `}
          >

            {display}

          </motion.div>

        );

      })}

    </motion.div>

  );

}