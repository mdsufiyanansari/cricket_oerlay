import React from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function NewBatsmanOverlay({

  show,
  player,

}) {

  return (

    <AnimatePresence>

      {show && (

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            scale: 0.7,
          }}

          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            z-50
            bg-black/70
          "
        >

          <div
            className="
              bg-gradient-to-br
              from-cyan-900
              to-black
              border-2
              border-cyan-500
              rounded-2xl
              p-10
              text-center
              shadow-2xl
              min-w-[420px]
            "
          >

            {/* TITLE */}
            <h1
              className="
                text-5xl
                font-black
                text-cyan-400
                mb-6
                tracking-widest
              "
            >
              NEW BATSMAN
            </h1>

            {/* IMAGE */}
            <div
              className="
                w-32
                h-32
                mx-auto
                rounded-full
                overflow-hidden
                border-4
                border-cyan-400
                shadow-lg
              "
            >

              <img
                src={
                  player?.image ||
                  "https://i.imgur.com/6VBx3io.png"
                }
                alt={player?.name}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            </div>

            {/* NAME */}
            <h2
              className="
                text-4xl
                font-bold
                text-white
                mt-6
              "
            >
              {player?.name}
            </h2>

            {/* TEXT */}
            <p
              className="
                text-cyan-300
                text-xl
                mt-3
              "
            >
              Comes To Bat
            </p>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}