import React, {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useMatch,
} from "../context/MatchContext";

import OverlayTopBar
from "../components/OverlayTopBar";

import RecentBalls
from "../components/RecentBalls";

import SponsorBanner
from "../components/SponsorBanner";

import WicketPopup
from "../components/WicketPopup";

import BoundaryPopup
from "../components/BoundaryPopup";

import NewBatsmanOverlay
from "../components/NewBatsmanOverlay";

export default function Overlay() {

  const { matchData } =
    useMatch();

  const match =
    matchData?.match || {};

  // =========================
  // PROFESSIONAL POPUP MANAGER
  // =========================

  const [
    activePopup,
    setActivePopup
  ] = useState(null);

  const [
    popupData,
    setPopupData
  ] = useState({});

  const [
    lastProcessedEvent,
    setLastProcessedEvent
  ] = useState(null);

  const timeoutRef =
    React.useRef(null);

  const lastWicketIdRef =
    React.useRef(null);

  const lastBoundaryRef =
    React.useRef(null);

  const lastBatsmanRef =
    React.useRef(null);

  // =========================
  // POPUP PRIORITY MANAGER
  // =========================

  useEffect(() => {

    if (timeoutRef.current) {
      clearTimeout(
        timeoutRef.current
      );
    }

    // PRIORITY 1: MATCH FINISHED
    if (
      match.status ===
      "finished" &&
      lastProcessedEvent !==
      "match_finished"
    ) {

      setLastProcessedEvent(
        "match_finished"
      );

      setActivePopup(
        "match_finished"
      );

      setPopupData({
        result:
          match.result,
      });

      return;

    }

    // PRIORITY 2: WICKET
    if (
      match.lastWicket &&
      match.status !== "finished"
    ) {

      const wicketId =
        match.lastWicket.id;

      if (
        wicketId !==
        lastWicketIdRef.current
      ) {

        lastWicketIdRef.current =
          wicketId;

        setLastProcessedEvent(
          `wicket_${wicketId}`
        );

        setActivePopup(
          "wicket"
        );

        setPopupData({
          outPlayer:
            match.lastWicket
              ?.outPlayer,
          newPlayer:
            match.batsman,
        });

        timeoutRef.current =
          setTimeout(() => {

            setActivePopup(
              null
            );

          }, 800);

        return;

      }

    }

    // PRIORITY 3: NEW BATSMAN
    if (
      match.lastEvent?.type ===
      "new-batsman" &&
      match.lastNewBatsman &&
      match.status !== "finished"
    ) {

      const batsmanKey =
        `${match.lastNewBatsman?.name}_${match.lastEvent.type}`;

      if (
        batsmanKey !==
        lastBatsmanRef.current
      ) {

        lastBatsmanRef.current =
          batsmanKey;

        setLastProcessedEvent(
          batsmanKey
        );

        setActivePopup(
          "new_batsman"
        );

        setPopupData({
          player:
            match.lastNewBatsman,
        });

        timeoutRef.current =
          setTimeout(() => {

            setActivePopup(
              null
            );

          }, 800);

        return;

      }

    }

    // PRIORITY 4: BOUNDARY (FOUR/SIX)
    if (
      (match.lastEvent?.type ===
        "four" ||
      match.lastEvent?.type ===
        "six") &&
      match.status !== "finished"
    ) {

      const boundaryKey =
        `${match.lastEvent?.type}_${match.lastEvent?.text}`;

      if (
        boundaryKey !==
        lastBoundaryRef.current
      ) {

        lastBoundaryRef.current =
          boundaryKey;

        setLastProcessedEvent(
          boundaryKey
        );

        setActivePopup(
          "boundary"
        );

        setPopupData({
          type:
            match.lastEvent
              ?.type === "four"
              ? "FOUR"
              : "SIX",
        });

        timeoutRef.current =
          setTimeout(() => {

            setActivePopup(
              null
            );

          }, 800);

        return;

      }

    }

  }, [
    match.status,
    match.lastWicket?.id,
    match.lastEvent?.type,
    match.lastEvent?.text,
    match.lastNewBatsman
      ?.name,
  ]);

  // CLEANUP ON UNMOUNT
  useEffect(() => {

    return () => {

      if (
        timeoutRef.current
      ) {

        clearTimeout(
          timeoutRef.current
        );

      }

    };

  }, []);

  // =========================
  // TEAM
  // =========================

  const battingTeam =

    match.innings === 1

      ? match.team1

      : match.team2;

  const bowlingTeam =

    match.innings === 1

      ? match.team2

      : match.team1;

  // =========================
  // OBS SAFE
  // =========================

  useEffect(() => {

    document.body.style.background =
      "transparent";

    document.body.style.margin =
      "0";

    document.body.style.padding =
      "0";

    document.body.style.overflow =
      "hidden";

    return () => {

      document.body.style.background =
        "";

      document.body.style.margin =
        "";

      document.body.style.padding =
        "";

      document.body.style.overflow =
        "";

    };

  }, []);

  return (

    <div
      className="
        relative
        w-screen
        h-screen
        overflow-hidden
        flex
        items-end
        justify-center
      "
      style={{
        backgroundColor:
          "transparent",
      }}
    >

      {/* SAFE AREA */}

      <div
        className="
          relative
          w-full
          h-full
          max-w-[1920px]
          max-h-[1080px]
          aspect-video
          overflow-hidden
        "
      >

        {/* TOP BAR */}

        <OverlayTopBar

          status={
            match.status ||
            "live"
          }

          matchInfo="IPL Cricket Live"

        />

        {/* MAIN SCOREBAR */}

        <motion.div

          initial={{
            opacity: 0,
            y: -80,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.4,
          }}

          className="
            absolute
            bottom-2
            sm:bottom-4
            md:bottom-8
            lg:bottom-20
            left-1/2
            -translate-x-1/2
            w-[98%]
            sm:w-[96%]
            lg:w-[92%]
            z-40
          "
        >

          <div
            className="
              overflow-hidden
              rounded-[20px]
              sm:rounded-[24px]
              lg:rounded-[28px]
              border
              border-white/10
              bg-black/70
              backdrop-blur-xl
              shadow-[0_0_60px_rgba(0,0,0,0.7)]
            "
          >

            {/* TOP */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                min-h-[120px]
                md:h-[150px]
              "
            >

              {/* TEAM 1 */}

              <div
                className="
                  bg-gradient-to-r
                  from-blue-950
                  via-blue-900
                  to-blue-700
                  flex
                  items-center
                  gap-3
                  sm:gap-4
                  md:gap-5
                  px-3
                  sm:px-4
                  md:px-8
                  py-4
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    sm:w-16
                    sm:h-16
                    md:w-24
                    md:h-24
                    rounded-full
                    overflow-hidden
                    border-4
                    border-white/20
                    bg-black/20
                  "
                >

                  <img

                    src={
                      battingTeam?.logo ||

                      "https://i.imgur.com/6VBx3io.png"
                    }

                    alt="team"

                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>

                <div>

                  <p
                    className="
                      text-cyan-300
                      uppercase
                      tracking-[2px]
                      text-[10px]
                      sm:text-xs
                    "
                  >

                    TEAM 1

                  </p>

                  <h1
                    className="
                      text-white
                      text-xl
                      sm:text-2xl
                      md:text-4xl
                      lg:text-5xl
                      font-black
                      uppercase
                      leading-none
                    "
                  >

                    {
                      battingTeam?.name
                    }

                  </h1>

                </div>

              </div>

              {/* SCORE */}

              <div
                className="
                  bg-gradient-to-b
                  from-black
                  to-slate-950
                  flex
                  flex-col
                  items-center
                  justify-center
                  py-5
                "
              >

                <div
                  className="
                    bg-red-600
                    px-3
                    sm:px-5
                    py-1
                    rounded-full
                    text-white
                    font-black
                    text-xs
                    sm:text-sm
                    mb-2
                    animate-pulse
                  "
                >

                  ● LIVE

                </div>

                <p
                  className="
                    text-cyan-400
                    uppercase
                    text-[10px]
                    sm:text-xs
                    tracking-[2px]
                  "
                >

                  {match.innings === 1

                    ? "FIRST INNINGS"

                    : "SECOND INNINGS"}

                </p>

                <h1
                  className="
                    text-white
                    text-4xl
                    sm:text-5xl
                    md:text-6xl
                    lg:text-7xl
                    font-black
                    leading-none
                  "
                >

                  {
                    battingTeam?.score || 0
                  }

                  /

                  {
                    battingTeam?.wickets || 0
                  }

                </h1>

                <p
                  className="
                    text-white
                    text-lg
                    sm:text-xl
                    md:text-2xl
                    lg:text-3xl
                    mt-2
                  "
                >

                  {
                    battingTeam?.overs || 0
                  }

                  .

                  {
                    battingTeam?.balls || 0
                  }

                  <span
                    className="
                      text-gray-400
                      text-sm
                      sm:text-base
                      md:text-xl
                      ml-2
                    "
                  >

                    /
                    {
                      match.matchOvers || 0
                    }
                    OVERS

                  </span>

                </p>

                <p
                  className="
                    text-yellow-400
                    font-black
                    mt-1
                    text-lg
                    sm:text-xl
                    md:text-2xl
                  "
                >

                  RR {
                    match.runRate || 0
                  }

                </p>

              </div>

              {/* TEAM 2 */}

              <div
                className="
                  bg-gradient-to-l
                  from-red-950
                  via-red-900
                  to-red-700
                  flex
                  items-center
                  justify-end
                  gap-3
                  sm:gap-4
                  md:gap-5
                  px-3
                  sm:px-4
                  md:px-8
                  py-4
                "
              >

                <div
                  className="
                    text-right
                  "
                >

                  <p
                    className="
                      text-red-200
                      uppercase
                      tracking-[2px]
                      text-[10px]
                      sm:text-xs
                    "
                  >

                    TEAM 2

                  </p>

                  <h1
                    className="
                      text-white
                      text-xl
                      sm:text-2xl
                      md:text-4xl
                      lg:text-5xl
                      font-black
                      uppercase
                      leading-none
                    "
                  >

                    {
                      bowlingTeam?.name
                    }

                  </h1>

                </div>

                <div
                  className="
                    w-14
                    h-14
                    sm:w-16
                    sm:h-16
                    md:w-24
                    md:h-24
                    rounded-full
                    overflow-hidden
                    border-4
                    border-white/20
                    bg-black/20
                  "
                >

                  <img

                    src={
                      bowlingTeam?.logo ||

                      "https://i.imgur.com/6VBx3io.png"
                    }

                    alt="team"

                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>

              </div>

            </div>

            {/* LOWER */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                bg-black/50
                border-t
                border-white/10
              "
            >

              {/* STRIKER */}

              <div
                className="
                  p-4
                  md:p-5
                  border-r
                  border-white/10
                "
              >

                <p
                  className="
                    text-white
                    text-lg
                    sm:text-xl
                    md:text-2xl
                    lg:text-3xl
                    font-black
                  "
                >

                  {
                    match.batsman?.name
                  }

                </p>

                <div
                  className="
                    flex
                    justify-between
                    mt-2
                  "
                >

                  <h1
                    className="
                      text-white
                      text-3xl
                      sm:text-4xl
                      md:text-5xl
                      font-black
                    "
                  >

                    {
                      match.batsman?.runs || 0
                    }

                  </h1>

                  <p
                    className="
                      text-gray-300
                      text-lg
                      sm:text-xl
                      md:text-2xl
                    "
                  >

                    (
                    {
                      match.batsman?.balls || 0
                    }
                    )

                  </p>

                </div>

              </div>

              {/* NON STRIKER */}

              <div
                className="
                  p-4
                  md:p-5
                  border-r
                  border-white/10
                "
              >

                <p
                  className="
                    text-white
                    text-lg
                    sm:text-xl
                    md:text-2xl
                    lg:text-3xl
                    font-black
                  "
                >

                  {
                    match.nonStriker?.name
                  }

                </p>

                <div
                  className="
                    flex
                    justify-between
                    mt-2
                  "
                >

                  <h1
                    className="
                      text-white
                      text-3xl
                      sm:text-4xl
                      md:text-5xl
                      font-black
                    "
                  >

                    {
                      match.nonStriker?.runs || 0
                    }

                  </h1>

                  <p
                    className="
                      text-gray-300
                      text-lg
                      sm:text-xl
                      md:text-2xl
                    "
                  >

                    (
                    {
                      match.nonStriker?.balls || 0
                    }
                    )

                  </p>

                </div>

              </div>

              {/* PARTNERSHIP */}

              <div
                className="
                  p-4
                  md:p-5
                  border-r
                  border-white/10
                  text-center
                "
              >

                <p
                  className="
                    text-gray-400
                    uppercase
                    tracking-[2px]
                    text-xs
                    sm:text-sm
                  "
                >

                  Partnership

                </p>

                <h1
                  className="
                    text-white
                    text-4xl
                    sm:text-5xl
                    md:text-6xl
                    font-black
                    mt-2
                  "
                >

                  {
                    match.partnership?.runs || 0
                  }

                </h1>

                <p
                  className="
                    text-gray-400
                    text-lg
                    sm:text-xl
                  "
                >

                  (
                  {
                    match.partnership?.balls || 0
                  }
                  )

                </p>

              </div>

              {/* BOWLER */}

              <div
                className="
                  p-4
                  md:p-5
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div>

                    <p
                      className="
                        text-white
                        text-lg
                        sm:text-xl
                        md:text-2xl
                        lg:text-3xl
                        font-black
                      "
                    >

                      {
                        match.bowler?.name
                      }

                    </p>

                    <p
                      className="
                        text-red-400
                        uppercase
                        text-xs
                        sm:text-sm
                      "
                    >

                      Bowler

                    </p>

                  </div>

                  <div
                    className="
                      text-right
                    "
                  >

                    <h1
                      className="
                        text-white
                        text-2xl
                        sm:text-3xl
                        md:text-4xl
                        font-black
                      "
                    >

                      {
                        match.bowler?.wickets || 0
                      }

                      -

                      {
                        match.bowler?.runs || 0
                      }

                    </h1>

                  </div>

                </div>

                {/* RECENT */}

                <div
                  className="
                    mt-4
                    overflow-x-auto
                  "
                >

                  <RecentBalls

                    balls={
                      match.recentBalls ||
                      []
                    }

                  />

                </div>

              </div>

            </div>

          </div>

        </motion.div>

        {/* PROFESSIONAL POPUP MANAGER - SINGLE ACTIVE POPUP */}

        <AnimatePresence
          mode="wait"
        >

          {activePopup ===
            "match_finished" && (

            <motion.div

              key="match_finished"

              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              exit={{
                opacity: 0,
              }}

              transition={{
                duration: 0.3,
              }}

              className="
                absolute
                inset-0
                bg-black/80
                flex
                items-center
                justify-center
                z-50
                p-4
              "
            >

              <div
                className="
                  bg-gradient-to-r
                  from-green-600
                  to-emerald-700
                  p-6
                  sm:p-10
                  md:p-16
                  rounded-[30px]
                  sm:rounded-[40px]
                  border-4
                  border-white
                  shadow-2xl
                  text-center
                "
              >

                <h1
                  className="
                    text-white
                    text-3xl
                    sm:text-5xl
                    md:text-7xl
                    font-black
                  "
                >

                  MATCH FINISHED

                </h1>

                <p
                  className="
                    text-yellow-300
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-black
                    mt-6
                  "
                >

                  {
                    popupData.result ||
                    "MATCH FINISHED"
                  }

                </p>

              </div>

            </motion.div>

          )}

          {activePopup ===
            "wicket" && (

            <WicketPopup

              key="wicket"

              show={true}

              outPlayer={
                popupData.outPlayer
              }

              newPlayer={
                popupData.newPlayer
              }

            />

          )}

          {activePopup ===
            "new_batsman" && (

            <NewBatsmanOverlay

              key="new_batsman"

              show={true}

              player={
                popupData.player
              }

            />

          )}

          {activePopup ===
            "boundary" && (

            <BoundaryPopup

              key="boundary"

              show={true}

              type={popupData.type}

            />

          )}

        </AnimatePresence>

        {/* SPONSOR */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
          "
        >

          <SponsorBanner

            sponsors={[
              "Star Sports",
              "Dream11",
              "Vivo",
            ]}

          />

        </div>

      </div>

    </div>

  );

}