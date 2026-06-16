import {
  initializeApp,
  getApps,
  getApp,
} from "firebase/app";

import {
  getDatabase,
  ref,
  get,
  set,
  update,
  remove,
  onValue,
} from "firebase/database";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  getAuth,
} from "firebase/auth";

// =========================
// FIREBASE CONFIG
// =========================

const firebaseConfig = {

  apiKey:
    "AIzaSyAJGUlIQmugfQcNLcYrYXMQoSiv1A7JQR8",

  authDomain:
    "cricketoverlay-a04f5.firebaseapp.com",

  databaseURL:
    "https://cricketoverlay-a04f5-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId:
    "cricketoverlay-a04f5",

  storageBucket:
    "cricketoverlay-a04f5.firebasestorage.app",

  messagingSenderId:
    "691907032643",

  appId:
    "1:691907032643:web:4885af5fc19282a6ee86f6",

};

// =========================
// INITIALIZE APP
// =========================

const app =

  getApps().length > 0

    ? getApp()

    : initializeApp(firebaseConfig);

// =========================
// SERVICES
// =========================

export const db =
  getDatabase(app);

export const storage =
  getStorage(app);

export const auth =
  getAuth(app);

// =========================
// DEFAULT MATCH
// =========================

export const defaultMatchData = {

  match: {

    // MATCH INFO
    innings: 1,

    status: "live",

    result: "",

    target: 0,

    firstInningsScore: 0,

    matchOvers: 20,

    matchFinished: false,

    inningsCompleted: false,

    battingTeam: "team1",

    bowlingTeam: "team2",

    // PLAYERS
    players: [],

    outPlayers: [],

    // TEAM 1
    team1: {

      name: "Team 1",

      logo: "",

      score: 0,

      wickets: 0,

      overs: 0,

      balls: 0,

    },

    // TEAM 2
    team2: {

      name: "Team 2",

      logo: "",

      score: 0,

      wickets: 0,

      overs: 0,

      balls: 0,

    },

    // BATSMAN
    batsman: {

      name: "",

      image: "",

      runs: 0,

      balls: 0,

      fours: 0,

      sixes: 0,

    },

    // NON STRIKER
    nonStriker: {

      name: "",

      image: "",

      runs: 0,

      balls: 0,

      fours: 0,

      sixes: 0,

    },

    // BOWLER
    bowler: {

      name: "",

      image: "",

      wickets: 0,

      runs: 0,

      overs: 0,

      balls: 0,

    },

    // PARTNERSHIP
    partnership: {

      runs: 0,

      balls: 0,

    },

    // STATS
    extras: 0,

    runRate: 0,

    requiredRunRate: 0,

    recentBalls: [],

    // EVENTS
    lastEvent: null,

    lastWicket: null,

    lastNewBatsman: null,

  },

};

// =========================
// MATCH FUNCTIONS
// =========================

// SAVE MATCH
export const saveMatch =
  async (matchData) => {

    try {

      await update(

        ref(
          db,
          "match/live"
        ),

        {
          match: matchData,
        }

      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "SAVE MATCH ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// UPDATE MATCH
export const updateMatch =
  async (matchData) => {

    try {

      await update(

        ref(
          db,
          "match/live"
        ),

        {
          match: matchData,
        }

      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "UPDATE MATCH ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// GET MATCH
export const getMatchData =
  async () => {

    try {

      const snapshot =
        await get(

          ref(
            db,
            "match/live"
          )

        );

      return (
        snapshot.val() ||
        defaultMatchData
      );

    } catch (error) {

      console.error(
        "GET MATCH ERROR:",
        error
      );

      return defaultMatchData;

    }

  };

// REALTIME LISTENER
export const onMatchUpdate =
  (callback) => {

    const matchRef =
      ref(
        db,
        "match/live"
      );

    const unsubscribe =
      onValue(

        matchRef,

        (snapshot) => {

          const data =
            snapshot.val();

          callback(
            data ||
            defaultMatchData
          );

        }

      );

    return () => {

      unsubscribe();

    };

  };

// END MATCH
export const endMatch =
  async () => {

    try {

      await update(

        ref(
          db,
          "match/live/match"
        ),

        {

          status:
            "finished",

          matchFinished:
            true,

        }

      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "END MATCH ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// RESET MATCH
export const resetMatch =
  async () => {

    try {

      await set(

        ref(
          db,
          "match/live"
        ),

        defaultMatchData

      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "RESET MATCH ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// =========================
// PLAYER FUNCTIONS
// =========================

// SAVE PLAYER
export const savePlayer =
  async (playerData) => {

    try {

      const playerId =

        playerData.id ||

        crypto.randomUUID();

      await set(

        ref(
          db,
          `players/${playerId}`
        ),

        {

          ...playerData,

          id: playerId,

          isOut: false,

        }

      );

      return {

        success: true,

        id: playerId,

      };

    } catch (error) {

      console.error(
        "SAVE PLAYER ERROR:",
        error
      );

      return {

        success: false,

        error,

      };

    }

  };

// SAVE MULTIPLE PLAYERS
export const saveMultiplePlayers =
  async (players) => {

    try {

      const updates = {};

      players.forEach(
        (player) => {

          const playerId =

            player.id ||

            crypto.randomUUID();

          updates[
            `players/${playerId}`
          ] = {

            ...player,

            id: playerId,

            isOut: false,

          };

        }
      );

      await update(
        ref(db),
        updates
      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "SAVE PLAYERS ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// UPDATE PLAYER
export const updatePlayer =
  async (
    playerId,
    playerData
  ) => {

    try {

      await update(

        ref(
          db,
          `players/${playerId}`
        ),

        playerData

      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "UPDATE PLAYER ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// SET PLAYER OUT
export const setPlayerOut =
  async (playerId) => {

    try {

      await update(

        ref(
          db,
          `players/${playerId}`
        ),

        {
          isOut: true,
        }

      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "SET PLAYER OUT ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// RESET PLAYERS
export const resetPlayersOutStatus =
  async () => {

    try {

      const snapshot =
        await get(
          ref(db, "players")
        );

      const players =
        snapshot.val();

      if (!players) {

        return {
          success: true,
        };

      }

      const updates = {};

      Object.keys(players)
        .forEach((id) => {

          updates[
            `players/${id}/isOut`
          ] = false;

        });

      await update(
        ref(db),
        updates
      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "RESET PLAYERS ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// DELETE PLAYER
export const deletePlayer =
  async (playerId) => {

    try {

      await remove(

        ref(
          db,
          `players/${playerId}`
        )

      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "DELETE PLAYER ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// DELETE ALL PLAYERS
export const deleteAllPlayers =
  async () => {

    try {

      await remove(
        ref(db, "players")
      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "DELETE PLAYERS ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// REALTIME PLAYERS
export const onPlayersUpdate =
  (callback) => {

    const playersRef =
      ref(
        db,
        "players"
      );

    const unsubscribe =
      onValue(

        playersRef,

        (snapshot) => {

          const data =
            snapshot.val();

          callback(
            data
              ? Object.values(
                  data
                )
              : []
          );

        }

      );

    return () => {

      unsubscribe();

    };

  };

// =========================
// IMAGE UPLOAD
// =========================

// PLAYER IMAGE
export const uploadPlayerImage =
  async (
    file,
    playerName
  ) => {

    try {

      const fileName =

        `${playerName}-${Date.now()}-${Math.random()}`;

      const fileRef =
        storageRef(

          storage,

          `players/${fileName}`

        );

      await uploadBytes(
        fileRef,
        file
      );

      const url =
        await getDownloadURL(
          fileRef
        );

      return {

        success: true,

        url,

      };

    } catch (error) {

      console.error(
        "UPLOAD PLAYER IMAGE ERROR:",
        error
      );

      return {

        success: false,

        error,

      };

    }

  };

// TEAM LOGO
export const uploadTeamLogo =
  async (
    file,
    teamName
  ) => {

    try {

      const fileName =

        `${teamName}-${Date.now()}-${Math.random()}`;

      const fileRef =
        storageRef(

          storage,

          `logos/${fileName}`

        );

      await uploadBytes(
        fileRef,
        file
      );

      const url =
        await getDownloadURL(
          fileRef
        );

      return {

        success: true,

        url,

      };

    } catch (error) {

      console.error(
        "UPLOAD LOGO ERROR:",
        error
      );

      return {

        success: false,

        error,

      };

    }

  };

// =========================
// TEAM FUNCTIONS
// =========================

// SAVE TEAM
export const saveTeam =
  async (
    teamId,
    teamData
  ) => {

    try {

      await set(

        ref(
          db,
          `teams/${teamId}`
        ),

        teamData

      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "SAVE TEAM ERROR:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };

// REALTIME TEAMS
export const onTeamsUpdate =
  (callback) => {

    const teamsRef =
      ref(
        db,
        "teams"
      );

    const unsubscribe =
      onValue(

        teamsRef,

        (snapshot) => {

          const data =
            snapshot.val();

          callback(
            data
              ? Object.values(
                  data
                )
              : []
          );

        }

      );

    return () => {

      unsubscribe();

    };

  };

// =========================
// HELPERS
// =========================

export const isMatchFinished =
  (match) => {

    return (
      match?.status ===
      "finished"
    );

  };

export const isInningsBreak =
  (match) => {

    return (
      match?.status ===
      "innings-break"
    );

  };

export const getAvailablePlayers =
  (
    players = [],
    outPlayers = []
  ) => {

    return players.filter(
      (player) =>

        !outPlayers.includes(
          player.name
        )
    );

  };