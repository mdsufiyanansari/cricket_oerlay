import React from "react";

import {
  motion,
} from "framer-motion";

import {
  FiTarget,
  FiActivity,
  FiZap,
} from "react-icons/fi";

import {
  calculateStrikeRate,
} from "../utils/scoring";

export default function
PlayerCard({

  player = {},

  isBatsman = false,

  title = "",

}) {

  // =========================
  // PLAYER DATA
  // =========================

  const {

    name = "",

    image = "",

    photo = "",

    runs = 0,

    balls = 0,

    fours = 0,

    sixes = 0,

    style = "Right Hand Batter",

  } = player;

  // =========================
  // IMAGE
  // =========================

  const playerImage =

    image ||

    photo ||

    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  // =========================
  // STRIKE RATE
  // =========================

  const strikeRate =
    calculateStrikeRate(
      runs,
      balls
    );

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      whileHover={{
        y: -4,
      }}

      transition={{
        duration: 0.25,
      }}

      className={`
        relative
        overflow-hidden
        rounded-[28px]
        border-2
        shadow-2xl
        transition-all

        ${isBatsman

          ? `
            border-cyan-500/40
            bg-gradient-to-br
            from-cyan-950
            via-slate-900
            to-black
            shadow-cyan-500/10
          `

          : `
            border-green-500/30
            bg-gradient-to-br
            from-green-950
            via-slate-900
            to-black
            shadow-green-500/10
          `
        }
      `}
    >

      {/* GLOW */}

      <div className={`
        absolute
        inset-0
        opacity-30

        ${isBatsman

          ? `
            bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.15),transparent_60%)]
          `

          : `
            bg-[radial-gradient(circle_at_top,rgba(0,255,100,0.12),transparent_60%)]
          `
        }
      `} />

      {/* TOP BAR */}

      {title && (

        <div className={`
          relative
          z-10
          px-5
          py-2
          border-b
          text-sm
          font-black
          uppercase
          tracking-[2px]

          ${isBatsman

            ? `
              bg-cyan-500/10
              border-cyan-500/20
              text-cyan-300
            `

            : `
              bg-green-500/10
              border-green-500/20
              text-green-300
            `
          }
        `}>

          {title}

        </div>

      )}

      {/* MAIN */}

      <div className="
        relative
        z-10
        p-5
      ">

        {/* PROFILE */}

        <div className="
          flex
          items-center
          gap-4
        ">

          {/* IMAGE */}

          <div className="
            relative
            w-20
            h-20
            rounded-2xl
            overflow-hidden
            border-4
            border-white/10
            flex-shrink-0
          ">

            <img

              src={playerImage}

              alt={name}

              className="
                w-full
                h-full
                object-cover
              "
            />

          </div>

          {/* INFO */}

          <div className="
            flex-1
            min-w-0
          ">

            <h2 className="
              text-white
              text-2xl
              font-black
              leading-tight
              truncate
            ">

              {name}

            </h2>

            <p className={`
              text-sm
              font-bold
              mt-1

              ${isBatsman

                ? "text-cyan-400"

                : "text-green-400"
              }
            `}>

              {style}

            </p>

            <div className="
              flex
              items-center
              gap-3
              mt-3
              flex-wrap
            ">

              <div className="
                bg-white/5
                px-3
                py-1
                rounded-full
                text-sm
                font-bold
                text-white
              ">

                {runs} Runs

              </div>

              <div className="
                bg-white/5
                px-3
                py-1
                rounded-full
                text-sm
                font-bold
                text-white
              ">

                {balls} Balls

              </div>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="
          grid
          grid-cols-2
          sm:grid-cols-4
          gap-3
          mt-6
        ">

          {/* RUNS */}

          <div className="
            bg-white/5
            border
            border-white/5
            rounded-2xl
            p-3
            text-center
          ">

            <div className="
              flex
              justify-center
              mb-2
            ">

              <FiTarget
                className="
                  text-yellow-400
                  text-xl
                "
              />

            </div>

            <h1 className="
              text-3xl
              font-black
              text-white
            ">

              {runs}

            </h1>

            <p className="
              text-xs
              text-gray-400
              uppercase
            ">

              Runs

            </p>

          </div>

          {/* BALLS */}

          <div className="
            bg-white/5
            border
            border-white/5
            rounded-2xl
            p-3
            text-center
          ">

            <div className="
              flex
              justify-center
              mb-2
            ">

              <FiActivity
                className="
                  text-cyan-400
                  text-xl
                "
              />

            </div>

            <h1 className="
              text-3xl
              font-black
              text-white
            ">

              {balls}

            </h1>

            <p className="
              text-xs
              text-gray-400
              uppercase
            ">

              Balls

            </p>

          </div>

          {/* STRIKE RATE */}

          <div className="
            bg-white/5
            border
            border-white/5
            rounded-2xl
            p-3
            text-center
          ">

            <div className="
              flex
              justify-center
              mb-2
            ">

              <FiZap
                className={`
                  text-xl

                  ${isBatsman

                    ? "text-cyan-400"

                    : "text-green-400"
                  }
                `}
              />

            </div>

            <h1 className={`
              text-3xl
              font-black

              ${isBatsman

                ? "text-cyan-400"

                : "text-green-400"
              }
            `}>

              {strikeRate}

            </h1>

            <p className="
              text-xs
              text-gray-400
              uppercase
            ">

              SR

            </p>

          </div>

          {/* BOUNDARIES */}

          <div className="
            bg-white/5
            border
            border-white/5
            rounded-2xl
            p-3
            text-center
          ">

            <div className="
              flex
              justify-center
              gap-2
              mb-2
            ">

              <span className="
                text-blue-400
                font-black
                text-sm
              ">

                4s

              </span>

              <span className="
                text-yellow-400
                font-black
                text-sm
              ">

                6s

              </span>

            </div>

            <h1 className="
              text-3xl
              font-black
              text-white
            ">

              {fours}/
              {sixes}

            </h1>

            <p className="
              text-xs
              text-gray-400
              uppercase
            ">

              Boundaries

            </p>

          </div>

        </div>

      </div>

    </motion.div>

  );

}