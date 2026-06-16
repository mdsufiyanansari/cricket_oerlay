import React, {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

export default function
PlayingXISetup({

  team1Name,

  team2Name,

  onSave,

}) {

  const createPlayer = (
    team
  ) => ({

    id: Date.now() +
      Math.random(),

    name: "",

    team,

    photo: "",

    matches: "",

    runs: "",

    strikeRate: "",

    style: "",

    role: "Playing XI",

  });

  const [team1Players,
    setTeam1Players] =
    useState([
      createPlayer(
        team1Name
      ),
    ]);

  const [team2Players,
    setTeam2Players] =
    useState([
      createPlayer(
        team2Name
      ),
    ]);

  // UPDATE PLAYER
  const updatePlayer = (
    teamSetter,
    players,
    index,
    field,
    value
  ) => {

    const updated =
      [...players];

    updated[index][field] =
      value;

    teamSetter(updated);

  };

  // ADD PLAYER
  const addPlayer = (
    teamSetter,
    players,
    team
  ) => {

    teamSetter([
      ...players,
      createPlayer(team),
    ]);

  };

  // DELETE PLAYER
  const deletePlayer = (
    teamSetter,
    players,
    index
  ) => {

    const updated =
      players.filter(
        (_, i) =>
          i !== index
      );

    teamSetter(updated);

  };

  // SAVE ALL
  const handleSave =
    () => {

    const allPlayers = [

      ...team1Players,

      ...team2Players,

    ];

    onSave(allPlayers);

  };

  // PLAYER FORM
  const renderPlayerForm = (
    player,
    index,
    players,
    setter,
    teamColor
  ) => (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      key={player.id}

      className={`
        bg-slate-800
        border
        ${teamColor}
        rounded-3xl
        p-5
      `}
    >

      <div className="
        flex
        justify-between
        items-center
        mb-4
      ">

        <h2 className="
          text-xl
          font-black
          text-white
        ">

          Player {index + 1}

        </h2>

        <button
          onClick={() =>
            deletePlayer(
              setter,
              players,
              index
            )
          }
          className="
            bg-red-600
            p-2
            rounded-xl
          "
        >

          <FiTrash2 />

        </button>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      ">

        <input
          type="text"
          placeholder="Player Name"
          value={player.name}
          onChange={(e) =>
            updatePlayer(
              setter,
              players,
              index,
              "name",
              e.target.value
            )
          }
          className="
            bg-slate-900
            p-4
            rounded-xl
            outline-none
          "
        />

        <input
          type="text"
          placeholder="Photo URL"
          value={player.photo}
          onChange={(e) =>
            updatePlayer(
              setter,
              players,
              index,
              "photo",
              e.target.value
            )
          }
          className="
            bg-slate-900
            p-4
            rounded-xl
            outline-none
          "
        />

        <input
          type="number"
          placeholder="Matches"
          value={player.matches}
          onChange={(e) =>
            updatePlayer(
              setter,
              players,
              index,
              "matches",
              e.target.value
            )
          }
          className="
            bg-slate-900
            p-4
            rounded-xl
            outline-none
          "
        />

        <input
          type="number"
          placeholder="Runs"
          value={player.runs}
          onChange={(e) =>
            updatePlayer(
              setter,
              players,
              index,
              "runs",
              e.target.value
            )
          }
          className="
            bg-slate-900
            p-4
            rounded-xl
            outline-none
          "
        />

        <input
          type="number"
          placeholder="Strike Rate"
          value={
            player.strikeRate
          }
          onChange={(e) =>
            updatePlayer(
              setter,
              players,
              index,
              "strikeRate",
              e.target.value
            )
          }
          className="
            bg-slate-900
            p-4
            rounded-xl
            outline-none
          "
        />

        <input
          type="text"
          placeholder="Style"
          value={player.style}
          onChange={(e) =>
            updatePlayer(
              setter,
              players,
              index,
              "style",
              e.target.value
            )
          }
          className="
            bg-slate-900
            p-4
            rounded-xl
            outline-none
          "
        />

      </div>

    </motion.div>

  );

  return (

    <div className="
      space-y-10
    ">

      {/* TEAM 1 */}
      <div>

        <div className="
          flex
          justify-between
          items-center
          mb-5
        ">

          <h1 className="
            text-4xl
            font-black
            text-cyan-400
          ">

            {team1Name}
            Playing XI

          </h1>

          <button
            onClick={() =>
              addPlayer(
                setTeam1Players,
                team1Players,
                team1Name
              )
            }
            className="
              flex
              items-center
              gap-2
              bg-cyan-600
              px-5
              py-3
              rounded-xl
              font-bold
            "
          >

            <FiPlus />

            Add Player

          </button>

        </div>

        <div className="
          grid
          grid-cols-1
          gap-5
        ">

          {team1Players.map(
            (
              player,
              index
            ) =>

              renderPlayerForm(
                player,
                index,
                team1Players,
                setTeam1Players,
                "border-cyan-500/30"
              )

          )}

        </div>

      </div>

      {/* TEAM 2 */}
      <div>

        <div className="
          flex
          justify-between
          items-center
          mb-5
        ">

          <h1 className="
            text-4xl
            font-black
            text-red-400
          ">

            {team2Name}
            Playing XI

          </h1>

          <button
            onClick={() =>
              addPlayer(
                setTeam2Players,
                team2Players,
                team2Name
              )
            }
            className="
              flex
              items-center
              gap-2
              bg-red-600
              px-5
              py-3
              rounded-xl
              font-bold
            "
          >

            <FiPlus />

            Add Player

          </button>

        </div>

        <div className="
          grid
          grid-cols-1
          gap-5
        ">

          {team2Players.map(
            (
              player,
              index
            ) =>

              renderPlayerForm(
                player,
                index,
                team2Players,
                setTeam2Players,
                "border-red-500/30"
              )

          )}

        </div>

      </div>

      {/* SAVE */}
      <div className="
        flex
        justify-center
      ">

        <button
          onClick={handleSave}
          className="
            bg-green-600
            px-10
            py-5
            rounded-2xl
            text-2xl
            font-black
          "
        >

          SAVE ALL PLAYERS

        </button>

      </div>

    </div>

  );

}