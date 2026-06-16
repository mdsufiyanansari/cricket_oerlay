import React, {
  useState,
  useEffect,
  useMemo,
} from "react";

import {
  ref,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

import {
  FiTrash2,
  FiUsers,
  FiSearch,
  FiEdit3,
  FiX,
  FiSave,
} from "react-icons/fi";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { db }
from "../firebase/firebase";

export default function Players() {

  // =========================
  // STATES
  // =========================

  const [
    players,
    setPlayers
  ] = useState([]);

  const [
    search,
    setSearch
  ] = useState("");

  const [
    editingPlayer,
    setEditingPlayer
  ] = useState(null);

  const [
    player,
    setPlayer
  ] = useState({

    name: "",

    team: "",

    photo: "",

    matches: "",

    runs: "",

    strikeRate: "",

    style: "",

    role: "Playing XI",

  });

  // =========================
  // LOAD PLAYERS
  // =========================

  useEffect(() => {

    const playersRef =
      ref(db, "players");

    const unsubscribe =
      onValue(

        playersRef,

        (snapshot) => {

          const data =
            snapshot.val();

          if (data) {

            const loadedPlayers =

              Object.entries(data)

                .map(

                  ([firebaseId, value]) => ({

                    firebaseId,

                    ...value,

                  })

                )

                .sort(

                  (a, b) =>

                    a.team?.localeCompare(
                      b.team
                    )

                );

            setPlayers(
              loadedPlayers
            );

          } else {

            setPlayers([]);

          }

        }

      );

    return () =>
      unsubscribe();

  }, []);

  // =========================
  // FILTER PLAYERS
  // =========================

  const filteredPlayers =
    useMemo(() => {

      return players.filter(

        (p) =>

          p.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          p.team
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

      );

    }, [players, search]);

  // =========================
  // RESET FORM
  // =========================

  const resetForm =
    () => {

      setPlayer({

        name: "",

        team: "",

        photo: "",

        matches: "",

        runs: "",

        strikeRate: "",

        style: "",

        role: "Playing XI",

      });

    };

  // =========================
  // SAVE PLAYER
  // =========================

  const savePlayer =
    async () => {

      if (

        !player.name ||

        !player.team

      ) {

        alert(
          "ENTER PLAYER DETAILS"
        );

        return;

      }

      const duplicatePlayer =
        players.find(

          (p) =>

            p.name
              .toLowerCase()

              ===

            player.name
              .toLowerCase()

        );

      if (
        duplicatePlayer
      ) {

        alert(
          "PLAYER ALREADY EXISTS"
        );

        return;

      }

      try {

        await push(

          ref(db, "players"),

          {

            ...player,

            matches:
              Number(
                player.matches
              ),

            runs:
              Number(
                player.runs
              ),

            strikeRate:
              Number(
                player.strikeRate
              ),

            id: Date.now(),

            isOut: false,

          }

        );

        alert(
          "PLAYER ADDED"
        );

        resetForm();

      } catch (error) {

        console.log(error);

      }

    };

  // =========================
  // DELETE PLAYER
  // =========================

  const deletePlayer =
    async (firebaseId) => {

      const confirmDelete =
        window.confirm(
          "DELETE THIS PLAYER ?"
        );

      if (!confirmDelete)
        return;

      try {

        await remove(

          ref(
            db,
            `players/${firebaseId}`
          )

        );

        alert(
          "PLAYER DELETED"
        );

      } catch (error) {

        console.log(error);

      }

    };

  // =========================
  // DELETE ALL PLAYERS
  // =========================

  const deleteAllPlayers =
    async () => {

      const confirmDelete =
        window.confirm(
          "DELETE ALL PLAYERS ?"
        );

      if (!confirmDelete)
        return;

      try {

        await remove(
          ref(db, "players")
        );

        alert(
          "ALL PLAYERS DELETED"
        );

      } catch (error) {

        console.log(error);

      }

    };

  // =========================
  // EDIT PLAYER
  // =========================

  const startEdit =
    (playerData) => {

      setEditingPlayer(
        playerData.firebaseId
      );

      setPlayer({
        ...playerData,
      });

    };

  // =========================
  // UPDATE PLAYER
  // =========================

  const updatePlayerData =
    async () => {

      try {

        await update(

          ref(
            db,
            `players/${editingPlayer}`
          ),

          {

            ...player,

            matches:
              Number(
                player.matches
              ),

            runs:
              Number(
                player.runs
              ),

            strikeRate:
              Number(
                player.strikeRate
              ),

          }

        );

        alert(
          "PLAYER UPDATED"
        );

        setEditingPlayer(
          null
        );

        resetForm();

      } catch (error) {

        console.log(error);

      }

    };

  // =========================
  // TEAM COUNTS
  // =========================

  const totalTeams =
    new Set(

      players.map(
        (p) => p.team
      )

    ).size;

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-black
      text-white
      p-4
      md:p-6
    ">

      {/* HEADER */}

      <div className="
        flex
        flex-col
        lg:flex-row
        justify-between
        gap-5
        mb-8
      ">

        <div>

          <h1 className="
            text-4xl
            md:text-5xl
            font-black
            text-cyan-400
          ">

            PLAYER MANAGEMENT

          </h1>

          <div className="
            flex
            gap-3
            mt-4
            flex-wrap
          ">

            <div className="
              bg-slate-800
              px-4
              py-2
              rounded-full
              flex
              items-center
              gap-2
            ">

              <FiUsers />

              Total Players:
              {players.length}

            </div>

            <div className="
              bg-slate-800
              px-4
              py-2
              rounded-full
            ">

              Teams:
              {totalTeams}

            </div>

          </div>

        </div>

        <button

          onClick={
            deleteAllPlayers
          }

          className="
            bg-red-600
            hover:bg-red-700
            px-6
            py-4
            rounded-2xl
            font-black
            flex
            items-center
            justify-center
            gap-3
            h-fit
          "
        >

          <FiTrash2 />

          DELETE ALL

        </button>

      </div>

      {/* SEARCH */}

      <div className="
        relative
        mb-6
      ">

        <FiSearch
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            text-xl
          "
        />

        <input

          type="text"

          placeholder="Search player or team..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="
            w-full
            bg-slate-900
            border
            border-slate-700
            p-4
            pl-12
            rounded-2xl
            outline-none
            focus:border-cyan-400
          "
        />

      </div>

      {/* FORM */}

      <div className="
        bg-slate-900/90
        border
        border-slate-700
        p-5
        md:p-6
        rounded-[30px]
        mb-10
      ">

        <h2 className="
          text-3xl
          font-black
          text-cyan-400
          mb-6
        ">

          {
            editingPlayer

              ? "EDIT PLAYER"

              : "ADD PLAYER"
          }

        </h2>

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
              setPlayer({
                ...player,
                name:
                  e.target.value,
              })
            }
            className="
              bg-slate-800
              p-4
              rounded-2xl
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Team Name"
            value={player.team}
            onChange={(e) =>
              setPlayer({
                ...player,
                team:
                  e.target.value,
              })
            }
            className="
              bg-slate-800
              p-4
              rounded-2xl
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Photo URL"
            value={player.photo}
            onChange={(e) =>
              setPlayer({
                ...player,
                photo:
                  e.target.value,
              })
            }
            className="
              bg-slate-800
              p-4
              rounded-2xl
              outline-none
            "
          />

          <select
            value={player.role}
            onChange={(e) =>
              setPlayer({
                ...player,
                role:
                  e.target.value,
              })
            }
            className="
              bg-slate-800
              p-4
              rounded-2xl
              outline-none
            "
          >

            <option>
              Playing XI
            </option>

            <option>
              Extra Player
            </option>

          </select>

          <input
            type="number"
            placeholder="Matches"
            value={player.matches}
            onChange={(e) =>
              setPlayer({
                ...player,
                matches:
                  e.target.value,
              })
            }
            className="
              bg-slate-800
              p-4
              rounded-2xl
              outline-none
            "
          />

          <input
            type="number"
            placeholder="Runs"
            value={player.runs}
            onChange={(e) =>
              setPlayer({
                ...player,
                runs:
                  e.target.value,
              })
            }
            className="
              bg-slate-800
              p-4
              rounded-2xl
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
              setPlayer({
                ...player,
                strikeRate:
                  e.target.value,
              })
            }
            className="
              bg-slate-800
              p-4
              rounded-2xl
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Player Style"
            value={player.style}
            onChange={(e) =>
              setPlayer({
                ...player,
                style:
                  e.target.value,
              })
            }
            className="
              bg-slate-800
              p-4
              rounded-2xl
              outline-none
            "
          />

        </div>

        {/* BUTTONS */}

        <div className="
          flex
          gap-4
          mt-6
          flex-wrap
        ">

          {editingPlayer ? (

            <>

              <button

                onClick={
                  updatePlayerData
                }

                className="
                  bg-green-600
                  hover:bg-green-700
                  px-8
                  py-4
                  rounded-2xl
                  font-black
                  flex
                  items-center
                  gap-3
                "
              >

                <FiSave />

                UPDATE PLAYER

              </button>

              <button

                onClick={() => {

                  setEditingPlayer(
                    null
                  );

                  resetForm();

                }}

                className="
                  bg-slate-700
                  hover:bg-slate-600
                  px-8
                  py-4
                  rounded-2xl
                  font-black
                  flex
                  items-center
                  gap-3
                "
              >

                <FiX />

                CANCEL

              </button>

            </>

          ) : (

            <button

              onClick={
                savePlayer
              }

              className="
                bg-cyan-500
                hover:bg-cyan-600
                px-8
                py-4
                rounded-2xl
                font-black
                text-lg
              "
            >

              ADD PLAYER

            </button>

          )}

        </div>

      </div>

      {/* PLAYERS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        <AnimatePresence>

          {filteredPlayers.map(
            (p) => (

            <motion.div

              key={p.firebaseId}

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
              }}

              whileHover={{
                y: -5,
              }}

              className="
                bg-slate-900
                rounded-[30px]
                p-5
                border
                border-slate-700
                relative
                overflow-hidden
              "
            >

              {/* ROLE */}

              <div className="
                absolute
                top-4
                left-4
              ">

                <span className={`
                  px-4
                  py-1
                  rounded-full
                  text-xs
                  font-black

                  ${p.role ===
                    "Extra Player"

                    ? "bg-yellow-500/20 text-yellow-400"

                    : "bg-cyan-500/20 text-cyan-400"
                  }
                `}>

                  {
                    p.role ||
                    "Playing XI"
                  }

                </span>

              </div>

              {/* ACTIONS */}

              <div className="
                absolute
                top-4
                right-4
                flex
                gap-2
              ">

                <button

                  onClick={() =>
                    startEdit(p)
                  }

                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    p-3
                    rounded-full
                  "
                >

                  <FiEdit3 />

                </button>

                <button

                  onClick={() =>
                    deletePlayer(
                      p.firebaseId
                    )
                  }

                  className="
                    bg-red-600
                    hover:bg-red-700
                    p-3
                    rounded-full
                  "
                >

                  <FiTrash2 />

                </button>

              </div>

              {/* IMAGE */}

              <img

                src={
                  p.photo ||

                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }

                alt={p.name}

                className="
                  w-32
                  h-32
                  rounded-full
                  object-cover
                  mx-auto
                  border-4
                  border-cyan-400
                  mt-8
                "
              />

              {/* INFO */}

              <h2 className="
                text-center
                text-3xl
                font-black
                mt-5
              ">

                {p.name}

              </h2>

              <p className="
                text-center
                text-cyan-400
                text-lg
                mt-1
              ">

                {p.team}

              </p>

              {/* STATS */}

              <div className="
                mt-6
                grid
                grid-cols-2
                gap-3
              ">

                <div className="
                  bg-slate-800
                  p-4
                  rounded-2xl
                  text-center
                ">

                  <p className="
                    text-slate-400
                    text-sm
                  ">

                    Matches

                  </p>

                  <h3 className="
                    text-2xl
                    font-black
                  ">

                    {
                      p.matches || 0
                    }

                  </h3>

                </div>

                <div className="
                  bg-slate-800
                  p-4
                  rounded-2xl
                  text-center
                ">

                  <p className="
                    text-slate-400
                    text-sm
                  ">

                    Runs

                  </p>

                  <h3 className="
                    text-2xl
                    font-black
                  ">

                    {
                      p.runs || 0
                    }

                  </h3>

                </div>

                <div className="
                  bg-slate-800
                  p-4
                  rounded-2xl
                  text-center
                  col-span-2
                ">

                  <p className="
                    text-slate-400
                    text-sm
                  ">

                    Strike Rate

                  </p>

                  <h3 className="
                    text-4xl
                    font-black
                    text-yellow-400
                  ">

                    {
                      p.strikeRate || 0
                    }

                  </h3>

                </div>

              </div>

              {/* STYLE */}

              <div className="
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
                    p.style ||
                    "Right Hand Batter"
                  }

                </span>

              </div>

            </motion.div>

          ))}

        </AnimatePresence>

      </div>

      {/* EMPTY */}

      {filteredPlayers.length ===
        0 && (

        <div className="
          text-center
          mt-20
        ">

          <h1 className="
            text-5xl
            font-black
            text-slate-600
          ">

            NO PLAYERS FOUND

          </h1>

        </div>

      )}

    </div>

  );

}