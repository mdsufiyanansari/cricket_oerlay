import React, {
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiSearch,
  FiUsers,
} from "react-icons/fi";

export default function
NewBatsmanModal({

  players = [],

  onSelect,

  onClose,

}) {

  // =========================
  // SEARCH
  // =========================

  const [
    search,
    setSearch
  ] = useState("");

  // =========================
  // FILTER PLAYERS
  // =========================

  const availablePlayers =
    useMemo(() => {

      return players

        .filter(

          (player) =>

            !player.isOut

        )

        .filter(

          (player) =>

            player.name

              ?.toLowerCase()

              .includes(

                search.toLowerCase()

              )

        );

    }, [players, search]);

  // =========================
  // TEAM COUNT
  // =========================

  const teamName =
    availablePlayers[0]
      ?.team || "";

  return (

    <AnimatePresence>

      <motion.div

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        exit={{
          opacity: 0,
        }}

        className="
          fixed
          inset-0
          bg-black/90
          backdrop-blur-md
          flex
          items-center
          justify-center
          z-[999]
          p-3
          md:p-5
        "
      >

        {/* MAIN */}

        <motion.div

          initial={{
            scale: 0.92,
            opacity: 0,
            y: 40,
          }}

          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}

          exit={{
            scale: 0.92,
            opacity: 0,
            y: 40,
          }}

          transition={{
            duration: 0.25,
          }}

          className="
            relative
            bg-gradient-to-br
            from-slate-950
            via-slate-900
            to-black
            w-full
            max-w-7xl
            rounded-[35px]
            p-4
            md:p-7
            border
            border-cyan-500/30
            shadow-[0_0_60px_rgba(0,255,255,0.10)]
            overflow-hidden
          "
        >

          {/* GLOW */}

          <div className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_60%)]
            pointer-events-none
          " />

          {/* HEADER */}

          <div className="
            relative
            z-10
            flex
            flex-col
            lg:flex-row
            lg:items-center
            justify-between
            gap-5
            mb-8
            border-b
            border-cyan-500/10
            pb-6
          ">

            {/* TITLE */}

            <div>

              <h1 className="
                text-3xl
                md:text-5xl
                font-black
                text-cyan-400
                uppercase
                tracking-wide
              ">

                Select New Batsman

              </h1>

              <div className="
                flex
                items-center
                gap-3
                mt-3
                flex-wrap
              ">

                <span className="
                  bg-cyan-500/10
                  border
                  border-cyan-500/20
                  text-cyan-300
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-bold
                ">

                  {teamName}

                </span>

                <span className="
                  bg-slate-800
                  text-slate-300
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  flex
                  items-center
                  gap-2
                ">

                  <FiUsers />

                  Available:
                  {
                    availablePlayers.length
                  }

                </span>

              </div>

            </div>

            {/* RIGHT */}

            <div className="
              flex
              items-center
              gap-3
              w-full
              lg:w-auto
            ">

              {/* SEARCH */}

              <div className="
                relative
                flex-1
                lg:w-[320px]
              ">

                <FiSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input

                  type="text"

                  placeholder="Search player..."

                  value={search}

                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }

                  className="
                    w-full
                    bg-slate-800/90
                    border
                    border-slate-700
                    rounded-2xl
                    pl-12
                    pr-4
                    py-4
                    outline-none
                    text-white
                    focus:border-cyan-400
                  "
                />

              </div>

              {/* CLOSE */}

              <button

                onClick={onClose}

                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-500
                  text-3xl
                  font-black
                  hover:bg-red-500
                  hover:text-white
                  transition-all
                "
              >

                ×

              </button>

            </div>

          </div>

          {/* EMPTY */}

          {availablePlayers.length === 0 && (

            <div className="
              h-[350px]
              flex
              items-center
              justify-center
              text-center
            ">

              <div>

                <h2 className="
                  text-5xl
                  font-black
                  text-red-500
                ">

                  NO PLAYERS

                </h2>

                <p className="
                  text-slate-400
                  mt-4
                  text-lg
                ">

                  All players are out
                  or not added yet

                </p>

              </div>

            </div>

          )}

          {/* PLAYERS */}

          <div className="
            relative
            z-10
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
            max-h-[70vh]
            overflow-y-auto
            pr-2
            custom-scroll
          ">

            {availablePlayers.map(
              (player) => (

              <motion.div

                key={player.id}

                whileHover={{
                  scale: 1.03,
                  y: -6,
                }}

                whileTap={{
                  scale: 0.98,
                }}

                onClick={() =>
                  onSelect(player)
                }

                className="
                  relative
                  bg-gradient-to-br
                  from-slate-900
                  via-slate-800
                  to-slate-950
                  rounded-[30px]
                  p-5
                  border
                  border-slate-700
                  hover:border-cyan-400
                  transition-all
                  duration-300
                  overflow-hidden
                  cursor-pointer
                  group
                "
              >

                {/* HOVER GLOW */}

                <div className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition
                  bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_70%)]
                " />

                {/* ROLE */}

                <div className="
                  absolute
                  top-4
                  right-4
                  z-20
                ">

                  <span className="
                    bg-yellow-500/10
                    border
                    border-yellow-500/20
                    text-yellow-400
                    text-xs
                    font-black
                    px-3
                    py-1
                    rounded-full
                    uppercase
                  ">

                    {
                      player.role ||
                      "Playing XI"
                    }

                  </span>

                </div>

                {/* IMAGE */}

                <div className="
                  relative
                  z-10
                  flex
                  justify-center
                ">

                  <div className="
                    relative
                    w-36
                    h-36
                  ">

                    <div className="
                      absolute
                      inset-0
                      bg-cyan-500/20
                      blur-3xl
                      rounded-full
                    " />

                    <img

                      src={
                        player.photo ||

                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }

                      alt={player.name}

                      className="
                        relative
                        w-36
                        h-36
                        rounded-full
                        object-cover
                        border-[5px]
                        border-cyan-400
                        shadow-[0_0_30px_rgba(0,255,255,0.25)]
                      "
                    />

                  </div>

                </div>

                {/* NAME */}

                <div className="
                  relative
                  z-10
                  text-center
                  mt-5
                ">

                  <h2 className="
                    text-white
                    text-2xl
                    font-black
                    uppercase
                    leading-tight
                  ">

                    {player.name}

                  </h2>

                  <p className="
                    text-cyan-400
                    text-sm
                    mt-1
                    uppercase
                    tracking-widest
                  ">

                    {player.team}

                  </p>

                </div>

                {/* STATS */}

                <div className="
                  relative
                  z-10
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                ">

                  <div className="
                    bg-slate-950/60
                    rounded-2xl
                    p-3
                    text-center
                  ">

                    <p className="
                      text-slate-400
                      text-xs
                      uppercase
                    ">

                      Matches

                    </p>

                    <h3 className="
                      text-white
                      text-xl
                      font-black
                    ">

                      {
                        player.matches ||
                        0
                      }

                    </h3>

                  </div>

                  <div className="
                    bg-slate-950/60
                    rounded-2xl
                    p-3
                    text-center
                  ">

                    <p className="
                      text-slate-400
                      text-xs
                      uppercase
                    ">

                      Runs

                    </p>

                    <h3 className="
                      text-white
                      text-xl
                      font-black
                    ">

                      {
                        player.runs ||
                        0
                      }

                    </h3>

                  </div>

                  <div className="
                    bg-slate-950/60
                    rounded-2xl
                    p-3
                    text-center
                    col-span-2
                  ">

                    <p className="
                      text-slate-400
                      text-xs
                      uppercase
                    ">

                      Strike Rate

                    </p>

                    <h3 className="
                      text-yellow-400
                      text-3xl
                      font-black
                    ">

                      {
                        player.strikeRate ||
                        0
                      }

                    </h3>

                  </div>

                </div>

                {/* STYLE */}

                <div className="
                  relative
                  z-10
                  mt-5
                  text-center
                ">

                  <span className="
                    inline-block
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    text-cyan-300
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    font-bold
                  ">

                    {
                      player.style ||
                      "Right Hand Batter"
                    }

                  </span>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}