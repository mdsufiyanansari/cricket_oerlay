import React, {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function
WicketPopup({

  show,

  outPlayer,

}) {

  const [
    visible,
    setVisible
  ] = useState(false);

  // =========================
  // AUTO HIDE
  // =========================

  useEffect(() => {

    if (show) {

      setVisible(true);

      const timer =
        setTimeout(() => {

          setVisible(false);

        }, 3500);

      return () =>
        clearTimeout(timer);

    }

  }, [show]);

  // =========================

  if (!outPlayer)
    return null;

  return (

    <AnimatePresence>

      {visible && (

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
            z-[9999]
            flex
            items-center
            justify-center
            pointer-events-none
          "
        >

          {/* BACKDROP */}

          <div className="
            absolute
            inset-0
            bg-black/50
            backdrop-blur-[4px]
          " />

          {/* MAIN CARD */}

          <motion.div

            initial={{
              scale: 0.7,
              y: -100,
              rotateX: 40,
            }}

            animate={{
              scale: 1,
              y: 0,
              rotateX: 0,
            }}

            exit={{
              scale: 0.7,
              opacity: 0,
              y: -100,
            }}

            transition={{
              type: "spring",
              stiffness: 120,
            }}

            className="
              relative
              w-[92%]
              max-w-[520px]
              overflow-hidden
              rounded-[40px]
              border
              border-red-500/60
              bg-gradient-to-b
              from-[#250000]
              via-black
              to-black
              shadow-[0_0_120px_rgba(255,0,0,0.45)]
            "
          >

            {/* TOP GLOW */}

            <div className="
              absolute
              top-0
              left-0
              w-full
              h-[180px]
              bg-red-500/20
              blur-[100px]
            " />

            {/* CONTENT */}

            <div className="
              relative
              z-10
              px-8
              py-12
              text-center
            ">

              {/* WICKET TEXT */}

              <motion.h1

                animate={{
                  scale: [1, 1.05, 1],
                }}

                transition={{
                  repeat: Infinity,
                  duration: 1,
                }}

                className="
                  text-[70px]
                  md:text-[80px]
                  leading-none
                  font-black
                  tracking-[10px]
                  text-red-500
                  drop-shadow-[0_0_25px_rgba(255,0,0,0.9)]
                "
              >

                WICKET

              </motion.h1>

              {/* LINE */}

              <div className="
                w-[120px]
                h-[4px]
                mx-auto
                mt-6
                rounded-full
                bg-gradient-to-r
                from-transparent
                via-red-500
                to-transparent
              " />

              {/* PLAYER IMAGE */}

              <div className="
                mt-10
                flex
                justify-center
              ">

                <div className="
                  w-32
                  h-32
                  rounded-full
                  overflow-hidden
                  border-[5px]
                  border-red-500
                  shadow-[0_0_40px_rgba(255,0,0,0.5)]
                ">

                  <img

                    src={
                      outPlayer?.photo ||

                      outPlayer?.image ||

                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }

                    alt="player"

                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>

              </div>

              {/* OUT TEXT */}

              <p className="
                mt-8
                text-gray-400
                uppercase
                tracking-[5px]
                text-sm
                font-bold
              ">

                BATSMAN OUT

              </p>

              {/* NAME */}

              <h2 className="
                mt-3
                text-5xl
                font-black
                text-white
                capitalize
              ">

                {
                  outPlayer?.name
                }

              </h2>

              {/* SCORE */}

              <div className="
                mt-8
                flex
                justify-center
                items-center
                gap-6
              ">

                <div className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  px-8
                  py-5
                  rounded-2xl
                  min-w-[130px]
                ">

                  <h1 className="
                    text-5xl
                    font-black
                    text-yellow-400
                  ">

                    {
                      outPlayer?.runs || 0
                    }

                  </h1>

                  <p className="
                    text-gray-400
                    text-sm
                    mt-2
                    uppercase
                  ">

                    RUNS

                  </p>

                </div>

                <div className="
                  bg-white/5
                  border
                  border-white/10
                  px-8
                  py-5
                  rounded-2xl
                  min-w-[130px]
                ">

                  <h1 className="
                    text-5xl
                    font-black
                    text-cyan-400
                  ">

                    {
                      outPlayer?.balls || 0
                    }

                  </h1>

                  <p className="
                    text-gray-400
                    text-sm
                    mt-2
                    uppercase
                  ">

                    BALLS

                  </p>

                </div>

              </div>

            </div>

            {/* BOTTOM LIGHT */}

            <div className="
              absolute
              bottom-0
              left-0
              w-full
              h-[120px]
              bg-red-500/10
              blur-[80px]
            " />

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}