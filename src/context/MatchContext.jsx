import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  ref,
  onValue,
} from "firebase/database";

import { db } from "../firebase/firebase";

// =========================
// CONTEXT
// =========================

const MatchContext =
  createContext();

// =========================
// PROVIDER
// =========================

export const MatchProvider = ({
  children,
}) => {

  const [matchData, setMatchData] =
    useState({

      match: {

        // =========================
        // MATCH INFO
        // =========================

        matchOvers: 20,

        innings: 1,

        status: "live",

        matchFinished: false,

        inningsCompleted: false,

        target: 0,

        firstInningsScore: 0,

        result: "",

        battingTeam: "team1",

        bowlingTeam: "team2",

        // =========================
        // PLAYERS
        // =========================

        players: [],

        outPlayers: [],

        // =========================
        // TEAM 1
        // =========================

        team1: {

          name: "Mumbai Strikers",

          logo: "",

          score: 0,

          wickets: 0,

          overs: 0,

          balls: 0,

        },

        // =========================
        // TEAM 2
        // =========================

        team2: {

          name: "Pune Warriors",

          logo: "",

          score: 0,

          wickets: 0,

          overs: 0,

          balls: 0,

        },

        // =========================
        // CURRENT BATSMAN
        // =========================

        batsman: {

          name: "",

          image: "",

          runs: 0,

          balls: 0,

          fours: 0,

          sixes: 0,

        },

        // =========================
        // NON STRIKER
        // =========================

        nonStriker: {

          name: "",

          image: "",

          runs: 0,

          balls: 0,

          fours: 0,

          sixes: 0,

        },

        // =========================
        // BOWLER
        // =========================

        bowler: {

          name: "",

          image: "",

          wickets: 0,

          runs: 0,

          overs: 0,

          balls: 0,

        },

        // =========================
        // PARTNERSHIP
        // =========================

        partnership: {

          runs: 0,

          balls: 0,

        },

        // =========================
        // MATCH STATS
        // =========================

        recentBalls: [],

        extras: 0,

        runRate: 0,

        requiredRunRate: 0,

        // =========================
        // LAST EVENTS
        // =========================

        lastEvent: null,

        lastWicket: null,

        lastNewBatsman: null,

      },

    });

  // =========================
  // FIREBASE REALTIME LISTENER
  // =========================

  useEffect(() => {

    const matchRef = ref(
      db,
      "match/live"
    );

    const unsubscribe = onValue(
      matchRef,
      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          setMatchData(
            (prev) => ({

              ...prev,

              ...data,

            })
          );

        }

      }
    );

    return () => {

      unsubscribe();

    };

  }, []);

  // =========================
  // PROVIDER RETURN
  // =========================

  return (

    <MatchContext.Provider
      value={{

        matchData,

        setMatchData,

      }}
    >

      {children}

    </MatchContext.Provider>

  );

};

// =========================
// CUSTOM HOOK
// =========================

export const useMatch = () =>
  useContext(MatchContext);