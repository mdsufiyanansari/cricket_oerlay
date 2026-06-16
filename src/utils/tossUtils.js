export const getBattingBowlingTeams = (
  team1,
  team2,
  tossWinner,
  tossDecision
) => {

  if (
    tossWinner === team1 &&
    tossDecision === "bat"
  ) {
    return {
      battingTeam: "team1",
      bowlingTeam: "team2",
    };
  }

  if (
    tossWinner === team1 &&
    tossDecision === "bowl"
  ) {
    return {
      battingTeam: "team2",
      bowlingTeam: "team1",
    };
  }

  if (
    tossWinner === team2 &&
    tossDecision === "bat"
  ) {
    return {
      battingTeam: "team2",
      bowlingTeam: "team1",
    };
  }

  return {
    battingTeam: "team1",
    bowlingTeam: "team2",
  };
};