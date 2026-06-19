import React, {
  useState,
  useEffect,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ref,
  update,
  onValue,
} from "firebase/database";

import {
  useNavigate,
} from "react-router-dom";

import { db }
from "../firebase/firebase";

import {
  removeUndefinedValues,
  getSafeImageSrc,
} from "../utils/helpers";

import {
  useMatch,
} from "../context/MatchContext";

import Scoreboard
from "../components/Scoreboard";

import PlayerCard
from "../components/PlayerCard";

import BowlerCard
from "../components/BowlerCard";

import PartnershipCard
from "../components/PartnershipCard";

import RunRateCard
from "../components/RunRateCard";

import RecentBalls
from "../components/RecentBalls";

import NewBatsmanModal
from "../components/NewBatsmanModal";
import BallButtons from "../components/BallButtons";

export default function
AdminPanel() {

  const navigate =
    useNavigate();

  const {
    matchData,
    setMatchData,
  } = useMatch();

 const [match, setMatch] =
  useState({

    innings: 1,

    status: "live",

    team1: {

      name: "",

      score: 0,

      wickets: 0,

      overs: 0,

      balls: 0,

    },

    team2: {

      name: "",

      score: 0,

      wickets: 0,

      overs: 0,

      balls: 0,

    },

    batsman: {

      name: "",

    },

    nonStriker: {

      name: "",

    },

    bowler: {

      name: "",

    },

  });

  const [
    players,
    setPlayers,
  ] = useState([]);

  const [
    showBatsmanModal,
    setShowBatsmanModal,
  ] = useState(false);

  const [
    showBowlerPopup,
    setShowBowlerPopup,
  ] = useState(false);

  const [
    newBowler,
    setNewBowler,
  ] = useState("");

  const [
    lastBallType,
    setLastBallType,
  ] = useState("");

  const [history, setHistory] = useState([]);



  //undo function to revert to previous state of match

  const handleUndo = async () => {

  if (history.length === 0) {
    alert("Nothing to undo");
    return;
  }

  const previousState =
    history[history.length - 1];

  setMatch(previousState);

  await saveToFirebase(
    previousState
  );

  setHistory(prev =>
    prev.slice(0, -1)
  );
};

  // =========================
  // LOAD PLAYERS
  // =========================

  useEffect(() => {

    const playersRef =
      ref(db, "players");

    onValue(
      playersRef,
      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          setPlayers(
            Object.values(data)
          );

        } else {

          setPlayers([]);

        }

      }
    );

  }, []);

  // =========================
  // MATCH SYNC
  // =========================

  useEffect(() => {

    if (
      matchData?.match
    ) {

      setMatch(
        matchData.match
      );

    }

  }, [matchData]);

  // =========================
  // SAVE FIREBASE
  // =========================
const saveToFirebase =
  async (updatedMatch) => {

    try {
      
      const cleanedMatch = 
        removeUndefinedValues(
          updatedMatch
        );

      await update(

        ref(
          db,
          "match/live"
        ),

        {
          match:
            cleanedMatch,
        }

      );

    } catch (error) {

      console.error(error);

    }

};

  // =========================
  // CALCULATE OVERS
  // =========================

  const calculateOvers =
    (balls) => {

      return {
        
        

        overs:
          Math.floor(
            balls / 6
          ),

        balls:
          balls % 6,

      };

    };

    

  // =========================
  // RUN RATE
  // =========================

  const calculateRunRate =
    (
      score,
      overs,
      balls
    ) => {

      const totalBalls =
        overs * 6 + balls;

      if (totalBalls === 0)
        return 0;

      return (

        

        score /

        (totalBalls / 6)

      ).toFixed(2);

    };

 // =========================
// HANDLE RUN
// =========================

const handleRun =
  async (runs) => {

    setHistory(prev => [
  ...prev,
  JSON.parse(JSON.stringify(match))
]);

    if (
  match.innings === 1 &&
  match.inningsCompleted
) {
  alert("First innings complete. Start second innings.");
  return;
}

    const currentTeam =

      match.innings === 1

        ? match.team1

        : match.team2;

    // =========================
    // MATCH FINISHED STOP
    // =========================

    if (
      match.status ===
      "finished"
    ) {

      alert(
        "MATCH ALREADY FINISHED"
      );

      return;

    }

    const totalBalls =

      currentTeam.overs * 6 +

      currentTeam.balls + 1;

    const overData =
      calculateOvers(
        totalBalls
      );

    const updatedTeam = {

      ...currentTeam,

      score:

        Number(
          currentTeam.score
        ) +

        Number(runs),

      overs:
        overData.overs,

      balls:
        overData.balls,

    };

    let updatedRecentBalls =
      [];

    if (
      overData.balls === 0
    ) {

      updatedRecentBalls =
        [];

    } else {

      updatedRecentBalls = [

        ...(match.recentBalls ||
          []),

        String(runs),

      ].slice(-6);

    }

    let updatedMatch = {

      ...match,

      recentBalls:
        updatedRecentBalls,

      lastEvent: {

        type:

          runs === 4

            ? "four"

            : runs === 6

            ? "six"

            : "run",

        text:

          runs === 4

            ? "FOUR"

            : runs === 6

            ? "SIX"

            : `${match?.batsman?.name || ""} scored ${runs}`,

      },

      partnership: {

        runs:
          Number(
            match.partnership?.runs || 0
          ) + Number(runs),

        balls:
          Number(
            match.partnership?.balls || 0
          ) + 1,

      },

      batsman: {

        ...match.batsman,

        runs:

          Number(
            match.batsman
              ?.runs || 0
          ) + Number(runs),

        balls:

          Number(
            match.batsman
              ?.balls || 0
          ) + 1,

      },

      bowler: {

        ...match.bowler,

        runs:
          Number(
            match.bowler
              ?.runs || 0
          ) + Number(runs),

        overs:
          overData.overs,

        balls:
          overData.balls,

      },

    };

    if (
      match.innings === 1
    ) {

      updatedMatch.team1 =
        updatedTeam;

    } else {

      updatedMatch.team2 =
        updatedTeam;

    }

    updatedMatch.runRate =
      calculateRunRate(

        updatedTeam.score,

        updatedTeam.overs,

        updatedTeam.balls

      );

    // =========================
    // STRIKE ROTATE
    // =========================

    if (runs % 2 !== 0) {

      const striker =
        updatedMatch.batsman;

      updatedMatch.batsman =
        updatedMatch.nonStriker;

      updatedMatch.nonStriker =
        striker;

    }

    // =========================
    // OVER COMPLETE
    // =========================

    if (
      overData.balls === 0
    ) {

      updatedMatch.recentBalls =
        [];

      const striker =
        updatedMatch.batsman;

      updatedMatch.batsman =
        updatedMatch.nonStriker;

      updatedMatch.nonStriker =
        striker;

      updatedMatch.partnership = {

        runs: 0,

        balls: 0,

      };

      updatedMatch.bowler = {

        ...updatedMatch.bowler,

        overs:
          overData.overs,

        balls: 0,

      };

      setTimeout(() => {

        setShowBowlerPopup(
          true
        );

      }, 200);

    }

    setLastBallType("");

    // =========================
    // MATCH OVER COMPLETE
    // =========================

    const maxBalls =

      Number(
        match.matchOvers
      ) * 6;

    const playedBalls =

      updatedTeam.overs * 6 +

      updatedTeam.balls;

    if (
      playedBalls >= maxBalls
    ) {

      if (
        match.innings === 1
      ) {

        updatedMatch.result =
          "1ST INNINGS COMPLETED";

          updatedMatch.inningsCompleted = true;
updatedMatch.status = "innings_break";

      } else {

        updatedMatch.status =
          "finished";

        if (

          updatedTeam.score >

          match.firstInningsScore

        ) {

          updatedMatch.result =

            `${match.team2?.name} WON`;

        }

        else if (

          updatedTeam.score ===

          match.firstInningsScore

        ) {

          updatedMatch.result =
            "MATCH TIED";

        }

        else {

          updatedMatch.result =

            `${match.team1?.name} WON`;

        }

      }

      setShowBowlerPopup(
        false
      );

      setShowBatsmanModal(
        false
      );

    }

    // =========================
    // TARGET CHASE COMPLETE
    // =========================

    if (

      match.innings === 2 &&

      updatedTeam.score >=
      match.target

    ) {

      updatedMatch.status =
        "finished";

      updatedMatch.result =

        `${match.team2?.name} WON`;

      setShowBowlerPopup(
        false
      );

      setShowBatsmanModal(
        false
      );

    }

    await saveToFirebase(
      updatedMatch
    );

  };

  // =========================
  // EXTRAS
  // =========================

const handleExtra =
  async (type) => {

    setHistory(prev => [
  ...prev,
  JSON.parse(JSON.stringify(match))
]);

    if (
  match.innings === 1 &&
  match.inningsCompleted
) {
  alert("First innings complete. Start second innings.");
  return;
}

      if (
        match.status ===
        "finished"
      ) {

        alert(
          "MATCH ALREADY FINISHED"
        );

        return;

      }

      const currentTeam =

        match.innings === 1

          ? match.team1

          : match.team2;

      // =========================
      // ALL OUT CHECK
      // =========================

      const battingPlayers =

        players.filter(

          (player) =>

            player.team ===

            (
              match.innings === 1

                ? match.team1?.name

                : match.team2?.name
            )

        );

      const maxWickets =

        battingPlayers.length >= 11

          ? 10

          : battingPlayers.length - 1;

      if (

        Number(
          currentTeam.wickets || 0
        ) >= maxWickets

      ) {

        alert(
          "TEAM ALREADY ALL OUT"
        );

        return;

      }

      setLastBallType(type);

      let updatedMatch = {

        ...match,

        extras:

          Number(
            match.extras || 0
          ) + 1,

        recentBalls: [

          ...(match.recentBalls ||
            []),

          type,

        ].slice(-6),

      };

      const updatedTeam = {

        ...currentTeam,

        score:

          Number(
            currentTeam.score || 0
          ) + 1,

      };

      updatedMatch.bowler = {

        ...updatedMatch.bowler,

        runs:
          Number(
            updatedMatch.bowler?.runs || 0
          ) + 1,

      };

      if (
        match.innings === 1
      ) {

        updatedMatch.team1 =
          updatedTeam;

      } else {

        updatedMatch.team2 =
          updatedTeam;

      }

      updatedMatch.runRate =
        calculateRunRate(
          updatedTeam.score,
          updatedTeam.overs,
          updatedTeam.balls
        );

      await saveToFirebase(
        updatedMatch
      );

    };

const handleBye =
  async (runs) => {

    setHistory(prev => [
  ...prev,
  JSON.parse(JSON.stringify(match))
]);

    if (
  match.innings === 1 &&
  match.inningsCompleted
) {
  alert("First innings complete. Start second innings.");
  return;
}

      if (
        match.status ===
        "finished"
      ) {

        alert(
          "MATCH ALREADY FINISHED"
        );

        return;

      }

      const currentTeam =

        match.innings === 1

          ? match.team1

          : match.team2;

      // ALL OUT CHECK

      const battingPlayers =

        players.filter(

          (player) =>

            player.team ===

            (
              match.innings === 1

                ? match.team1?.name

                : match.team2?.name
            )

        );

      const maxWickets =

        battingPlayers.length >= 11

          ? 10

          : battingPlayers.length - 1;

      if (

        Number(
          currentTeam.wickets || 0
        ) >= maxWickets

      ) {

        alert(
          "TEAM ALREADY ALL OUT"
        );

        return;

      }

      let updatedMatch = {

        ...match,

        extras:

          Number(
            match.extras || 0
          ) + runs,

        recentBalls: [

          ...(match.recentBalls || []),

          `B${runs}`,

        ].slice(-6),

      };

      const totalBalls =

        currentTeam.overs * 6 +

        currentTeam.balls + 1;

      const overData =
        calculateOvers(
          totalBalls
        );

      const updatedTeam = {

        ...currentTeam,

        score:

          Number(
            currentTeam.score || 0
          ) + runs,

        overs:
          overData.overs,

        balls:
          overData.balls,

      };

      updatedMatch.bowler = {

        ...updatedMatch.bowler,

        runs:
          Number(
            updatedMatch.bowler?.runs || 0
          ) + runs,

        overs:
          overData.overs,

        balls:
          overData.balls,

      };

      if (
        match.innings === 1
      ) {

        updatedMatch.team1 =
          updatedTeam;

      } else {

        updatedMatch.team2 =
          updatedTeam;

      }

      updatedMatch.runRate =
        calculateRunRate(
          updatedTeam.score,
          updatedTeam.overs,
          updatedTeam.balls
        );

      if (
        updatedTeam.balls === 0
      ) {

        updatedMatch.recentBalls =
          [];

        const striker =
          updatedMatch.batsman;

        updatedMatch.batsman =
          updatedMatch.nonStriker;

        updatedMatch.nonStriker =
          striker;

        updatedMatch.bowler = {

          ...updatedMatch.bowler,

          overs:
            overData.overs,

          balls: 0,

        };

        setTimeout(() => {

          setShowBowlerPopup(
            true
          );

        }, 200);

      }

      const maxBalls =

        Number(
          match.matchOvers
        ) * 6;

      const playedBalls =

        updatedTeam.overs * 6 +

        updatedTeam.balls;

      if (
        playedBalls >= maxBalls
      ) {

        if (
          match.innings === 1
        ) {

          updatedMatch.result =
            "1ST INNINGS COMPLETED";

            updatedMatch.inningsCompleted = true;
updatedMatch.status = "innings_break";

        } else {

          updatedMatch.status =
            "finished";

          if (

            updatedTeam.score >

            match.firstInningsScore

          ) {

            updatedMatch.result =

              `${match.team2?.name} WON`;

          }

          else if (

            updatedTeam.score ===

            match.firstInningsScore

          ) {

            updatedMatch.result =
              "MATCH TIED";

          }

          else {

            updatedMatch.result =

              `${match.team1?.name} WON`;

          }

        }

        setShowBowlerPopup(
          false
        );

        setShowBatsmanModal(
          false
        );

      }

      if (

        match.innings === 2 &&

        updatedTeam.score >=
        match.target

      ) {

        updatedMatch.status =
          "finished";

        updatedMatch.result =

          `${match.team2?.name} WON`;

        setShowBowlerPopup(
          false
        );

        setShowBatsmanModal(
          false
        );

      }

      await saveToFirebase(
        updatedMatch
      );

    };

    //bye+wide runs handle
    const handleWideBye =
  async (runs) => {

    setHistory(prev => [
  ...prev,
  JSON.parse(JSON.stringify(match))
]);

    if (
  match.innings === 1 &&
  match.inningsCompleted
) {
  alert("First innings complete. Start second innings.");
  return;
}

    if (
      match.status ===
      "finished"
    ) {

      alert(
        "MATCH ALREADY FINISHED"
      );

      return;

    }

    const currentTeam =

  match.innings === 1

    ? match.team1

    : match.team2;

const battingPlayers =

  players.filter(

    (player) =>

      player.team ===

      (
        match.innings === 1

          ? match.team1?.name

          : match.team2?.name
      )

  );

const maxWickets =

  battingPlayers.length >= 11

    ? 10

    : battingPlayers.length - 1;

const currentWickets =

  Number(
    currentTeam.wickets || 0
  );

if (
  currentWickets >=
  maxWickets
) {

  alert(
    "TEAM ALREADY ALL OUT"
  );

  return;

}

      let updatedMatch = {

        ...match,

        extras:

          Number(
            match.extras || 0
          ) + runs + 1,

        recentBalls: [

          ...(match.recentBalls || []),

          `WB${runs}`,

        ].slice(-6),

      };

      const totalBalls =

        currentTeam.overs * 6 +

        currentTeam.balls;

      const overData =
        calculateOvers(
          totalBalls
        );

      const updatedTeam = {

        ...currentTeam,

        score:

          Number(
            currentTeam.score || 0
          ) + runs + 1,

        overs:
          overData.overs,

        balls:
          overData.balls,

      };

      if (
        match.innings === 1
      ) {

        updatedMatch.team1 =
          updatedTeam;

      } else {

        updatedMatch.team2 =
          updatedTeam;

      }

      updatedMatch.runRate =
        calculateRunRate(
          updatedTeam.score,
          updatedTeam.overs,
          updatedTeam.balls
        );

      if (
        updatedTeam.balls === 0
      ) {

        updatedMatch.recentBalls =
          [];

        const striker =
          updatedMatch.batsman;

        updatedMatch.batsman =
          updatedMatch.nonStriker;

        updatedMatch.nonStriker =
          striker;

        updatedMatch.bowler = {

          ...updatedMatch.bowler,

          overs:
            overData.overs,

          balls: 0,

        };

        setTimeout(() => {

          setShowBowlerPopup(
            true
          );

        }, 200);

      }

      const maxBalls =

        Number(
          match.matchOvers
        ) * 6;

      const playedBalls =

        updatedTeam.overs * 6 +

        updatedTeam.balls;

      if (
        playedBalls >= maxBalls
      ) {

        if (
          match.innings === 1
        ) {

          updatedMatch.result =
            "1ST INNINGS COMPLETED";

            updatedMatch.inningsCompleted = true;
updatedMatch.status = "innings_break";

        } else {

          updatedMatch.status =
            "finished";

          if (

            updatedTeam.score >

            match.firstInningsScore

          ) {

            updatedMatch.result =

              `${match.team2?.name} WON`;

          }

          else if (

            updatedTeam.score ===

            match.firstInningsScore

          ) {

            updatedMatch.result =
              "MATCH TIED";

          }

          else {

            updatedMatch.result =

              `${match.team1?.name} WON`;

          }

        }

        setShowBowlerPopup(
          false
        );

        setShowBatsmanModal(
          false
        );

      }

      if (

        match.innings === 2 &&

        updatedTeam.score >=
        match.target

      ) {

        updatedMatch.status =
          "finished";

        updatedMatch.result =

          `${match.team2?.name} WON`;

        setShowBowlerPopup(
          false
        );

        setShowBatsmanModal(
          false
        );

      }

      await saveToFirebase(
        updatedMatch
      );

    };

  // =========================
  // HANDLE WICKET
  // =========================

 const handleWicket =
  async () => {

    setHistory(prev => [
  ...prev,
  JSON.parse(JSON.stringify(match))
]);

    if (
  match.innings === 1 &&
  match.inningsCompleted
) {
  alert("First innings complete. Start second innings.");
  return;
}


    if (lastBallType === "NB") {
  alert("No Ball par sirf Run Out allowed hai");
  return;
}

    const currentTeam =

      match.innings === 1

        ? match.team1

        : match.team2;

    const battingPlayers =

      players.filter(

        (player) =>

          player.team ===

          (
            match.innings === 1

              ? match.team1?.name

              : match.team2?.name
          )

      );

    const maxWickets =

      battingPlayers.length >= 11

        ? 10

        : battingPlayers.length - 1;

    const currentWickets =

      Number(
        currentTeam.wickets || 0
      );

    // =========================
    // ALL OUT STOP
    // =========================

    if (
      currentWickets >=
      maxWickets
    ) {

      alert(
        "TEAM ALREADY ALL OUT"
      );

      return;

    }

    // =========================
    // MATCH FINISHED STOP
    // =========================

    if (
      match.status ===
      "finished"
    ) {

      return;

    }

  const totalBalls =

  currentTeam.overs * 6 +

  currentTeam.balls + 1;

    const overData =
      calculateOvers(
        totalBalls
      );

    const updatedTeam = {

      ...currentTeam,

      wickets:

        Number(
          currentTeam.wickets || 0
        ) + 1,

      overs:
        overData.overs,

      balls:
        overData.balls,

    };



    let updatedMatch = {

      ...match,

      // =========================
      // WICKET POPUP DATA
      // =========================

      lastWicket: {

        id: Date.now(),

        outPlayer: {

          name:
            match?.batsman?.name || "",

          runs:
            match?.batsman?.runs || 0,

          balls:
            match?.batsman?.balls || 0,

          image:
            match?.batsman?.image || "",

        },

      },

      outPlayers: [

        ...(match.outPlayers ||
          []),

        match?.batsman?.name,

      ],

      recentBalls: [

        ...(match.recentBalls ||
          []),

        "W",

      ].slice(-6),

      lastEvent: {

        type: "wicket",

        text:
          `${match?.batsman?.name} OUT`,

      },

    };

    if (
      match.innings === 1
    ) {

      updatedMatch.team1 =
        updatedTeam;

    } else {

      updatedMatch.team2 =
        updatedTeam;

    }

    // =========================
    // REMOVE OUT BATSMAN
    // =========================

updatedMatch.batsman = {

  name: "",

  image: "",

  runs: 0,

  balls: 0,

  fours: 0,

  sixes: 0,

};

    updatedMatch.nonStriker =

  match.nonStriker || {

    name: "",

    runs: 0,

    balls: 0,

    fours: 0,

    sixes: 0,

    image: "",

  };

  setMatch(updatedMatch);
await saveToFirebase(updatedMatch);
   

 if (
  updatedTeam.wickets >= maxWickets
) {

  updatedMatch.inningsCompleted =
    true;

  updatedMatch.status =
    "innings_break";

  updatedMatch.result =
    "1ST INNINGS COMPLETED";


setMatch(
      updatedMatch
    );
  await saveToFirebase(
    updatedMatch
  );

  return;
}
     

    // =========================
    // OVER COMPLETE
    // =========================

    if (
      overData.balls === 0
    ) {

      setTimeout(() => {

        setShowBowlerPopup(
          true
        );

      }, 200);

    } else {

      setTimeout(() => {

        setShowBatsmanModal(
          true
        );

      }, 200);

    }

  };
    

  // =========================
  // RUN OUT
  // =========================

 const handleRunOut =
  async () => {

    setHistory(prev => [
  ...prev,
  JSON.parse(JSON.stringify(match))
]);

    if (
  match.innings === 1 &&
  match.inningsCompleted
) {
  alert("First innings complete. Start second innings.");
  return;
}

    const currentTeam =

      match.innings === 1

        ? match.team1

        : match.team2;

    const battingPlayers =

      players.filter(

        (player) =>

          player.team ===

          (
            match.innings === 1

              ? match.team1?.name

              : match.team2?.name
          )

      );

    const maxWickets =

      battingPlayers.length >= 11

        ? 10

        : battingPlayers.length - 1;

    const currentWickets =

      Number(
        currentTeam.wickets || 0
      );

    // =========================
    // ALL OUT STOP
    // =========================

    if (
      currentWickets >=
      maxWickets
    ) {

      alert(
        "TEAM ALREADY ALL OUT"
      );

      return;

    }

    // =========================
    // MATCH FINISHED STOP
    // =========================

    if (
      match.status ===
      "finished"
    ) {

      return;

    }

    const totalBalls =

  currentTeam.overs * 6 +

  currentTeam.balls + 1;

const overData =
  calculateOvers(
    totalBalls
  );

  const updatedTeam = {

  ...currentTeam,

  wickets:

    Number(
      currentTeam.wickets || 0
    ) + 1,

  overs:
    overData.overs,

  balls:
    overData.balls,

};

    let updatedMatch = {

      ...match,

      // =========================
      // WICKET POPUP DATA
      // =========================

      lastWicket: {

        id: Date.now(),

        outPlayer: {

          name:
            match?.batsman?.name || "",

          runs:
            match?.batsman?.runs || 0,

          balls:
            match?.batsman?.balls || 0,

          image:
            match?.batsman?.image || "",

        },

      },

      outPlayers: [

        ...(match.outPlayers ||
          []),

        match?.batsman?.name,

      ],

      recentBalls: [

        ...(match.recentBalls ||
          []),

        "RO",

      ].slice(-6),

      lastEvent: {

        type: "wicket",

        text:
          `${match?.batsman?.name} RUN OUT`,

      },

    };

    if (
      match.innings === 1
    ) {

      updatedMatch.team1 =
        updatedTeam;

    } else {

      updatedMatch.team2 =
        updatedTeam;

    }

    // =========================
    // REMOVE OUT BATSMAN
    // =========================

    updatedMatch.batsman = {

  name: "",

  image: "",

  runs: 0,

  balls: 0,

  fours: 0,

  sixes: 0,

};

    updatedMatch.nonStriker = {

      ...match.nonStriker,

    };

    setMatch(
      updatedMatch
    );

    await saveToFirebase(
      updatedMatch
    );

    // =========================
    // ALL OUT AUTO FINISH
    // =========================

    const newMaxWickets =
      battingPlayers.length >= 11
        ? 10
        : battingPlayers.length - 1;

    if (
      updatedTeam.wickets >=
      newMaxWickets
    ) {

      let finalMatch =
        updatedMatch;

      if (
        match.innings === 1
      ) {

        finalMatch.result =
          "1ST INNINGS COMPLETED";

          finalMatch.inningsCompleted = true;
finalMatch.status = "innings_break";

      } else {

        finalMatch.status =
          "finished";

        if (

          updatedTeam.score >

          match.firstInningsScore

        ) {

          finalMatch.result =

            `${match.team2?.name} WON`;

        }

        else if (

          updatedTeam.score ===

          match.firstInningsScore

        ) {

          finalMatch.result =
            "MATCH TIED";

        }

        else {

          finalMatch.result =

            `${match.team1?.name} WON`;

        }

      }

      setShowBowlerPopup(
        false
      );

      setShowBatsmanModal(
        false
      );

      await saveToFirebase(
        finalMatch
      );

      return;

    }

    // =========================
    // OVER COMPLETE
    // =========================

    if (
      updatedTeam.balls === 0
    ) {

      setTimeout(() => {

        setShowBowlerPopup(
          true
        );

      }, 200);

    } else {

      setTimeout(() => {

        setShowBatsmanModal(
          true
        );

      }, 200);

    }

  };

  // =========================
  // SELECT BATSMAN
  // =========================

  const handleSelectBatsman =
    async (player) => {

      if (
        !match?.batsman?.name
      ) {

        const updatedMatch = {

          ...match,

          batsman: {

            name: player.name || "",

            photo: player.photo || "",

            image:
              player.photo || "",

            runs: 0,

            balls: 0,

            fours: 0,

            sixes: 0,

          },

        };

        setMatch(
          updatedMatch
        );

        await saveToFirebase(
          updatedMatch
        );

        setTimeout(() => {

  setShowBowlerPopup(
    false
  );

}, 200);

        return;

      }

      if (
        !match?.nonStriker?.name
      ) {

        const updatedMatch = {

          ...match,

          nonStriker: {

            name: player.name || "",

            photo: player.photo || "",

            image:
              player.photo || "",

            runs: 0,

            balls: 0,

            fours: 0,

            sixes: 0,

          },

        };

        setMatch(
          updatedMatch
        );

        await saveToFirebase(
          updatedMatch
        );

        setShowBatsmanModal(
          false
        );

        setShowBowlerPopup(
          true
        );

        return;

      }

      const updatedMatch = {

        ...match,

        batsman: {

          name: player.name || "",

          photo: player.photo || "",

          image:
            player.photo || "",

          runs: 0,

          balls: 0,

          fours: 0,

          sixes: 0,

        },
        lastNewBatsman: {

  name: player.name || "",

  photo: player.photo || "",

  image:
    player.photo || "",

},

lastEvent: {

  type:
    "new-batsman",

  text:
    `${player.name} came to bat`,

},

        partnership: {

          runs: 0,

          balls: 0,

        },

      };

      

      setMatch(
        updatedMatch
      );

      setShowBatsmanModal(
        false
      );

      await saveToFirebase(
        updatedMatch
      );

    };

    

  // =========================
  // ADD NEW BOWLER
  // =========================

  // const addNewBowler =
  //   async () => {

  //     if (!newBowler)
  //       return;

  //     const updatedMatch = {

  //       ...match,

  //       bowler: {

  //         name:
  //           newBowler,

  //         wickets: 0,

  //         runs: 0,

  //         overs: 0,

  //         balls: 0,

  //       },

  //     };

  //     setShowBowlerPopup(
  //       false
  //     );

  //     setNewBowler("");

  //     await saveToFirebase(
  //       updatedMatch
  //     );

  //   };

  // =========================
  // START SECOND INNINGS
  // =========================

  const startSecondInnings =
    async () => {

      

      if (
        match.innings !== 1
      ) return;

      const updatedMatch = {

        ...match,

        innings: 2,

        inningsCompleted: false,

        target:

          Number(
            match.team1
              ?.score || 0
          ) + 1,

        firstInningsScore:

          match.team1
            ?.score || 0,

        recentBalls: [],

        outPlayers: [],

        extras: 0,

        partnership: {

          runs: 0,

          balls: 0,

        },

        team2: {

          ...match.team2,

          score: 0,

          wickets: 0,

          overs: 0,

          balls: 0,

        },
batsman: {

  name: "",

  runs: 0,

  balls: 0,

  fours: 0,

  sixes: 0,

  image: "",

},

nonStriker: {

  name: "",

  runs: 0,

  balls: 0,

  fours: 0,

  sixes: 0,

  image: "",

},

bowler: {

  name: "",

  image: "",

  wickets: 0,

  runs: 0,

  overs: 0,

  balls: 0,

},

        runRate: 0,

        status: "live",

      };

     delete updatedMatch.lastWicket;

delete updatedMatch.lastNewBatsman;

updatedMatch.lastEvent =
  null;

updatedMatch.result =
  "";

      await saveToFirebase(
        updatedMatch
      );

      setTimeout(() => {

        setShowBatsmanModal(
          true
        );

      }, 200);

    };

  return (
    

    

    <div className="min-h-screen bg-slate-950 text-white p-4">

      <Scoreboard

        team1={match.team1}

        team2={match.team2}

        matchStatus={
          match.status
        }

        currentInnings={
          match.innings
        }

        target={
          match.target
        }

        totalOvers={
          match.matchOvers
        }

      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

        <div className="space-y-4">

          <PlayerCard
            player={
              match?.batsman || {}
            }
            title="STRIKER"
          />

          <PlayerCard
            player={
              match?.nonStriker || {}
            }
            title="NON STRIKER"
          />

          <BowlerCard
            bowler={
              match?.bowler || {}
            }
          />

          <PartnershipCard
            partnership={
              match?.partnership
            }
          />

        </div>

        <div>

          {/* <div className="grid grid-cols-3 gap-4">

            {[0,1,2,3,4,6]
              .map((run) => (

              <button

                key={run}

                onClick={() =>
                  handleRun(run)
                }

                className="
                  bg-blue-700
                  py-5
                  rounded-2xl
                  text-2xl
                  font-black
                "
              >

                {run}

              </button>

            ))}

          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
          

            <button
            
              onClick={() =>
                handleExtra("WD")
              }
              className="bg-purple-700 py-4 rounded-xl"
            >
              WIDE
            </button>

            <div
  className="
    grid
    grid-cols-3
    gap-2
    mt-2
  "
>

  {[1,2,3,4,5,6].map(
    (byeRun) => (

      <button
        key={byeRun}

        onClick={() =>
          handleBye(
            byeRun
          )
        }

        className="
          bg-cyan-600
          hover:bg-cyan-700
          text-white
          font-bold
          py-2
          rounded-lg
        "
      >

        BYE {byeRun}

      </button>

      

    )
  )}

  <div
  className="
    grid
    grid-cols-2
    gap-2
    mt-2
  "
>

  {[1,2,3,4,5,6].map(
    (byeRun) => (

      <button
        key={byeRun}

        onClick={() =>
          handleWideBye(
            byeRun
          )
        }

        className="
          bg-pink-600
          hover:bg-pink-700
          text-white
          font-bold
          py-2
          rounded-lg
        "
      >

        WB {byeRun}

      </button>

    )
  )}

</div>

</div>

            <button
              onClick={() =>
                handleExtra("NB")
              }
              className="bg-orange-700 py-4 rounded-xl"
            >
              NO BALL
            </button>

            <button
              onClick={
                handleWicket
              }
              className="bg-red-700 py-4 rounded-xl"
            >
              WICKET
            </button>

            <button
              onClick={
                handleRunOut
              }
              className="bg-yellow-600 py-4 rounded-xl"
            >
              RUN OUT
            </button>

          </div> */}



          <BallButtons
  handleRun={handleRun}
  handleWicket={handleWicket}
  handleRunOut={handleRunOut}
  handleWide={() => handleExtra("WD")}
  handleNoBall={() => handleExtra("NB")}
  handleBye={handleBye}
  handleWideBye={handleWideBye}
  handleUndo={handleUndo}
  disabled={
    match.status === "finished" ||
    (
      match.innings === 1 &&
      match.inningsCompleted
    )
  }
/>

{match?.innings === 1 &&
 match?.inningsCompleted && (

            <button

              onClick={
                startSecondInnings
              }

              className="
                w-full
                bg-green-600
                py-4
                rounded-2xl
                mt-4
                font-black
              "

            >

              START 2ND INNINGS

            </button>

          )}

        </div>
   {match?.status ===
  "finished" && (

  <div
    className="
      bg-green-700
      text-white
      text-3xl
      font-black
      p-6
      rounded-2xl
      text-center
      mb-4
      flex
      flex-col
      items-center
      gap-4
    "
  >

    <div>

      {match?.result}

    </div>

    <button

      onClick={() => {

        navigate("/");

      }}

      className="
        bg-black
        hover:bg-slate-900
        px-8
        py-4
        rounded-2xl
        text-xl
        font-black
        border-2
        border-white
      "

    >

      GO TO HOME

    </button>

  </div>

)}

        <RunRateCard
          runRate={
            match.runRate
          }
        />

      </div>

      

 

   {showBowlerPopup && (

  <div
    className="
      fixed inset-0
      bg-black/80
      flex items-center
      justify-center
      z-50
    "
  >

    <div
      className="
        bg-slate-900
        p-8
        rounded-3xl
        w-[450px]
      "
    >

      <h2
        className="
          text-3xl
          font-black
          mb-6
          text-center
        "
      >

        SELECT BOWLER

      </h2>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">

        {players

        .filter(

  (player) =>

    player.team ===

    (
      match.innings === 1

        ? match.team2?.name

        : match.team1?.name
    )

    &&

    player.name !==
    match?.bowler?.name

)

          .map((player) => (

            <button

              key={player.id}

              onClick={async () => {

                const updatedMatch = {

                  ...match,

                bowler: {

  ...player,

  image:
    player.photo,

  wickets: 0,

  runs: 0,

  overs: 0,

  balls: 0,

},
                };

               setMatch(
  updatedMatch
);

setShowBowlerPopup(
  false
);

await saveToFirebase(
  updatedMatch
);

              }}

              className="
                w-full
                bg-slate-800
                hover:bg-slate-700
                p-4
                rounded-2xl
                text-left
                flex
                items-center
                gap-4
              "

            >

              {getSafeImageSrc(player.photo) && (
                <img

                  src={player.photo}

                  alt={player.name}

                  className="
                    w-14
                    h-14
                    rounded-full
                    object-cover
                  "

                />
              )}

              <div>

                <h3
                  className="
                    text-xl
                    font-bold
                  "
                >

                  {player.name}

                </h3>

                <p
                  className="
                    text-gray-400
                  "
                >

                  {player.team}

                </p>

              </div>

            </button>

          ))}

      </div>

    </div>

  </div>

)}

  



      <AnimatePresence>

        {showBatsmanModal && (

          <NewBatsmanModal

            players={players.filter(

              (player) =>

                player.team ===

                (
                  match.innings === 1

                    ? match.team1?.name

                    : match.team2?.name
                )

                &&

                !(

                  match.outPlayers ||
                  []

                ).includes(
                  player.name
                )

                &&

                player.name !==
                match?.batsman?.name

                &&

                player.name !==
                match?.nonStriker?.name

            )}

            onSelect={
              handleSelectBatsman
            }

           onClose={() => {

  setShowBatsmanModal(
    false
  );

}}

          />

        )}

      </AnimatePresence>

    </div>

  );

}