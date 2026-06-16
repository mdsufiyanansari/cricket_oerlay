import React from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function BoundaryPopup({

  show,
  type,

}) {

  const isFour =
    type === "FOUR";

  const bgColor =
    isFour
      ? "from-green-500 to-emerald-700"
      : "from-yellow-400 to-orange-600";

  const textColor =
    isFour
      ? "text-green-100"
      : "text-black";

  return (

    <AnimatePresence>

      {show && (

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.5,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            scale: 0.5,
          }}

          transition={{
            duration: 0.4,
          }}

          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            z-[100]
            pointer-events-none
          "
        >

          <motion.div

            animate={{
              scale: [1, 1.08, 1],
            }}

            transition={{
              duration: 1,
              repeat: Infinity,
            }}

            className={`
              px-20
              py-12
              rounded-[40px]
              bg-gradient-to-r
              ${bgColor}
              shadow-[0_0_80px_rgba(255,255,255,0.4)]
              border-4
              border-white
            `}
          >

            <h1
              className={`
                text-[120px]
                font-black
                tracking-widest
                ${textColor}
              `}
            >

              {type}

            </h1>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}