import React, {
  useState,
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  FiUsers,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

import {
  saveMatch,
  deleteAllPlayers,
  saveMultiplePlayers,
} from "../firebase/firebase";

export default function
MatchSetup() {

  const navigate =
    useNavigate();

  // =========================
  // BASIC MATCH
  // =========================

  const [
    matchOvers,
    setMatchOvers
  ] = useState(20);

  const [
    team1Name,
    setTeam1Name
  ] = useState("");

  const [
    team2Name,
    setTeam2Name
  ] = useState("");

  const [
  team1Logo,
  setTeam1Logo
] = useState("");

const [
  team2Logo,
  setTeam2Logo
] = useState("");

  const [
    team1Count,
    setTeam1Count
  ] = useState(11);

  const [
    team2Count,
    setTeam2Count
  ] = useState(11);

  // =========================
  // PLAYERS
  // =========================

  const [
    team1Players,
    setTeam1Players
  ] = useState([]);

  const [
    team2Players,
    setTeam2Players
  ] = useState([]);

  // =========================
  // CURRENT PLAYERS
  // =========================

  const [
    openers,
    setOpeners
  ] = useState({

    striker: "",

    nonStriker: "",

    bowler: "",

  });

  // =========================
  // AUTO CREATE PLAYER FORM
  // =========================

  useEffect(() => {

    const players = [];

    for (
      let i = 0;
      i < team1Count;
      i++
    ) {

      players.push({

        id:
          Date.now() +
          i,

        name: "",

        team:
          team1Name,

        photo: "",

        matches: "",

        runs: "",

        strikeRate: "",

        style:
          "Right Hand Batter",

        role:
          i < 11

            ? "Playing XI"

            : "Extra Player",

      });

    }

    setTeam1Players(
      players
    );

  }, [
    team1Count,
    team1Name,
  ]);

  // =========================

  useEffect(() => {

    const players = [];

    for (
      let i = 0;
      i < team2Count;
      i++
    ) {

      players.push({

        id:
          Date.now() +
          i,

        name: "",

        team:
          team2Name,

        photo: "",

        matches: "",

        runs: "",

        strikeRate: "",

        style:
          "Right Hand Batter",

        role:
          i < 11

            ? "Playing XI"

            : "Extra Player",

      });

    }

    setTeam2Players(
      players
    );

  }, [
    team2Count,
    team2Name,
  ]);

  // =========================
  // UPDATE PLAYER
  // =========================

  const updatePlayer =
    (
      team,
      index,
      field,
      value
    ) => {

      if (
        team === 1
      ) {

        const updated =

          [...team1Players];

        updated[index][field] =
          value;

        setTeam1Players(
          updated
        );

      } else {

        const updated =

          [...team2Players];

        updated[index][field] =
          value;

        setTeam2Players(
          updated
        );

      }

    };

  // =========================
  // VALIDATION
  // =========================

  const validatePlayers =
    () => {

      const allPlayers = [

        ...team1Players,

        ...team2Players,

      ];

      // EMPTY PLAYER

      const emptyPlayer =
        allPlayers.find(

          (p) =>

            !p.name

        );

      if (
        emptyPlayer
      ) {

        alert(
          "ALL PLAYERS REQUIRED"
        );

        return false;

      }

      // OPENERS

      if (

        !openers.striker ||

        !openers.nonStriker ||

        !openers.bowler

      ) {

        alert(
          "SELECT OPENERS & BOWLER"
        );

        return false;

      }

      // SAME PLAYER

      if (

        openers.striker ===

        openers.nonStriker

      ) {

        alert(
          "STRIKER AND NON STRIKER CANNOT BE SAME"
        );

        return false;

      }

      return true;

    };

  // =========================
  // CREATE MATCH
  // =========================

  const createMatch =
    async () => {

      if (

        !team1Name ||

        !team2Name

      ) {

        alert(
          "ENTER TEAM NAMES"
        );

        return;

      }

      if (
        !validatePlayers()
      ) return;

      // CLEAR OLD PLAYERS

      await deleteAllPlayers();

      // SAVE NEW PLAYERS

      const allPlayers = [

        ...team1Players,

        ...team2Players,

      ];

      await saveMultiplePlayers(
        allPlayers
      );

      // FIND PLAYERS

      const striker =
        allPlayers.find(

          (p) =>

            p.name ===
            openers.striker

        );

      const nonStriker =
        allPlayers.find(

          (p) =>

            p.name ===
            openers.nonStriker

        );

      const bowler =
        allPlayers.find(

          (p) =>

            p.name ===
            openers.bowler

        );

      // MATCH DATA

      const matchData = {

        status: "live",

        innings: 1,

        matchOvers,

        recentBalls: [],

        outPlayers: [],

        target: null,

        winner: "",

        runRate: 0,

        extras: 0,

        partnership: {

          runs: 0,

          balls: 0,

        },

        team1: {

          name:
            team1Name,

             logo:
    team1Logo,

          score: 0,

          wickets: 0,

          overs: 0,

          balls: 0,

        },

        team2: {

          name:
            team2Name,

            logo:
    team2Logo,

          score: 0,

          wickets: 0,

          overs: 0,

          balls: 0,

        },

        batsman: {

          ...striker,

          runs: 0,

          balls: 0,

          fours: 0,

          sixes: 0,

        },

        nonStriker: {

          ...nonStriker,

          runs: 0,

          balls: 0,

          fours: 0,

          sixes: 0,

        },

        bowler: {

          ...bowler,

          wickets: 0,

          runs: 0,

          overs: 0,

          balls: 0,

        },

      };

      // SAVE MATCH

      await saveMatch(
        matchData
      );

      alert(
        "MATCH CREATED"
      );

      navigate("/admin");

    };

  // =========================
  // PLAYER FORM
  // =========================

  const renderPlayers =
    (
      players,
      team
    ) => (

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
      ">

        {players.map(
          (
            player,
            index
          ) => (

          <div

            key={index}

            className="
              bg-slate-800
              p-5
              rounded-3xl
            "
          >

            <h2 className="
              text-xl
              font-black
              mb-4
              text-cyan-400
            ">

              Player
              {index + 1}

            </h2>

            <div className="
              space-y-3
            ">

              <input
                type="text"
                placeholder="Player Name"
                value={
                  player.name
                }
                onChange={(e) =>
                  updatePlayer(
                    team,
                    index,
                    "name",
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-slate-900
                  p-4
                  rounded-xl
                "
              />

             <input

  type="file"

  accept="image/*"

  onChange={(e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend =
      () => {

        updatePlayer(
          team,
          index,
          "photo",
          reader.result
        );

      };

    reader.readAsDataURL(
      file
    );

  }}

  className="
    w-full
    bg-slate-900
    p-4
    rounded-xl
  "

/>

{player.photo && (

  <img

    src={player.photo}

    alt="preview"

    className="
      w-24
      h-24
      rounded-full
      object-cover
      border-4
      border-cyan-500
      mt-3
    "

  />

)}

              <div className="
                grid
                grid-cols-2
                gap-3
              ">

                <input
                  type="number"
                  placeholder="Matches"
                  value={
                    player.matches
                  }
                  onChange={(e) =>
                    updatePlayer(
                      team,
                      index,
                      "matches",
                      e.target.value
                    )
                  }
                  className="
                    bg-slate-900
                    p-4
                    rounded-xl
                  "
                />

                <input
                  type="number"
                  placeholder="Runs"
                  value={
                    player.runs
                  }
                  onChange={(e) =>
                    updatePlayer(
                      team,
                      index,
                      "runs",
                      e.target.value
                    )
                  }
                  className="
                    bg-slate-900
                    p-4
                    rounded-xl
                  "
                />

              </div>

              <input
                type="number"
                placeholder="Strike Rate"
                value={
                  player.strikeRate
                }
                onChange={(e) =>
                  updatePlayer(
                    team,
                    index,
                    "strikeRate",
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-slate-900
                  p-4
                  rounded-xl
                "
              />

            </div>

          </div>

        ))}

      </div>

    );

  // =========================
  // ALL PLAYERS
  // =========================

  const allPlayers = [

    ...team1Players,

    ...team2Players,

  ];

  return (

    <div className="
      min-h-screen
      bg-slate-950
      text-white
      p-4
      md:p-8
    ">

      <div className="
        max-w-7xl
        mx-auto
        space-y-10
      ">

        {/* TITLE */}

        <div>

          <h1 className="
            text-5xl
            font-black
            text-cyan-400
          ">

            MATCH SETUP

          </h1>

        </div>

        {/* TEAM INFO */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          <div className="
            bg-slate-900
            p-6
            rounded-3xl
          ">

            <h2 className="
              text-2xl
              font-black
              mb-5
            ">

              TEAM 1

            </h2>

            <div className="
              space-y-4
            ">

              <input
                type="text"
                placeholder="Team 1 Name"
                value={team1Name}
                onChange={(e) =>
                  setTeam1Name(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-slate-800
                  p-4
                  rounded-xl
                "
              />
              <input

  type="file"

  accept="image/*"

  onChange={(e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend =
      () => {

        setTeam1Logo(
          reader.result
        );

      };

    reader.readAsDataURL(
      file
    );

  }}

  className="
    w-full
    bg-slate-800
    p-4
    rounded-xl
  "

/>

{team1Logo && (

  <img

    src={team1Logo}

    alt="Team 1"

    className="
      w-24
      h-24
      rounded-full
      object-cover
      border-4
      border-cyan-500
      mt-3
    "

  />

)}

              <input
                type="number"
                placeholder="Total Players"
                value={team1Count}
                onChange={(e) =>
                  setTeam1Count(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="
                  w-full
                  bg-slate-800
                  p-4
                  rounded-xl
                "
              />

            </div>

          </div>

          <div className="
            bg-slate-900
            p-6
            rounded-3xl
          ">

            <h2 className="
              text-2xl
              font-black
              mb-5
            ">

              TEAM 2

            </h2>

            <div className="
              space-y-4
            ">

              <input
                type="text"
                placeholder="Team 2 Name"
                value={team2Name}
                onChange={(e) =>
                  setTeam2Name(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-slate-800
                  p-4
                  rounded-xl
                "
              />
              <input

  type="file"

  accept="image/*"

  onChange={(e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend =
      () => {

        setTeam2Logo(
          reader.result
        );

      };

    reader.readAsDataURL(
      file
    );

  }}

  className="
    w-full
    bg-slate-800
    p-4
    rounded-xl
  "

/>

{team2Logo && (

  <img

    src={team2Logo}

    alt="Team 2"

    className="
      w-24
      h-24
      rounded-full
      object-cover
      border-4
      border-red-500
      mt-3
    "

  />

)}

              <input
                type="number"
                placeholder="Total Players"
                value={team2Count}
                onChange={(e) =>
                  setTeam2Count(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="
                  w-full
                  bg-slate-800
                  p-4
                  rounded-xl
                "
              />

            </div>

          </div>

        </div>

        {/* PLAYERS */}

        <div className="
          space-y-10
        ">

          <div>

            <h2 className="
              text-4xl
              font-black
              mb-6
              text-cyan-400
            ">

              {team1Name}
              Players

            </h2>

            {renderPlayers(
              team1Players,
              1
            )}

          </div>

          <div>

            <h2 className="
              text-4xl
              font-black
              mb-6
              text-red-400
            ">

              {team2Name}
              Players

            </h2>

            {renderPlayers(
              team2Players,
              2
            )}

          </div>

        </div>

        {/* OPENERS */}

        <div className="
          bg-slate-900
          p-6
          rounded-3xl
        ">

          <h2 className="
            text-4xl
            font-black
            mb-6
            text-yellow-400
          ">

            SELECT OPENERS
          </h2>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          ">

            {/* STRIKER */}

            <select
              value={
                openers.striker
              }
              onChange={(e) =>
                setOpeners({
                  ...openers,
                  striker:
                    e.target.value,
                })
              }
              className="
                bg-slate-800
                p-4
                rounded-xl
              "
            >

              <option value="">
                Select Striker
              </option>

              {team1Players.map(
                (p, i) => (

                <option
                  key={i}
                  value={p.name}
                >

                  {p.name}

                </option>

              ))}

            </select>

            {/* NON STRIKER */}

            <select
              value={
                openers.nonStriker
              }
              onChange={(e) =>
                setOpeners({
                  ...openers,
                  nonStriker:
                    e.target.value,
                })
              }
              className="
                bg-slate-800
                p-4
                rounded-xl
              "
            >

              <option value="">
                Select Non Striker
              </option>

              {team1Players.map(
                (p, i) => (

                <option
                  key={i}
                  value={p.name}
                >

                  {p.name}

                </option>

              ))}

            </select>

            {/* BOWLER */}

            <select
              value={
                openers.bowler
              }
              onChange={(e) =>
                setOpeners({
                  ...openers,
                  bowler:
                    e.target.value,
                })
              }
              className="
                bg-slate-800
                p-4
                rounded-xl
              "
            >

              <option value="">
                Select Bowler
              </option>

              {team2Players.map(
                (p, i) => (

                <option
                  key={i}
                  value={p.name}
                >

                  {p.name}

                </option>

              ))}

            </select>

          </div>

        </div>

        {/* OVERS */}

        <div className="
          bg-slate-900
          p-6
          rounded-3xl
        ">

          <h2 className="
            text-3xl
            font-black
            mb-5
          ">

            MATCH OVERS
          </h2>

          <input
            type="number"
            value={matchOvers}
            onChange={(e) =>
              setMatchOvers(
                Number(
                  e.target.value
                )
              )
            }
            className="
              w-full
              bg-slate-800
              p-4
              rounded-xl
            "
          />

        </div>

        {/* CREATE */}

        <button

          onClick={
            createMatch
          }

          className="
            w-full
            bg-green-600
            hover:bg-green-700
            py-6
            rounded-3xl
            text-3xl
            font-black
          "
        >

          CREATE MATCH

        </button>

      </div>

    </div>

  );

}