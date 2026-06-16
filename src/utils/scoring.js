export const calculateRunRate = (score, overs, balls) => {
  const totalBalls = overs * 6 + balls;
  if (totalBalls === 0) return 0;
  return (score / totalBalls * 6).toFixed(2);
};

export const calculateStrikeRate = (runs, balls) => {
  if (balls === 0) return 0;
  return (runs / balls * 100).toFixed(2);
};

export const calculateEconomy = (runs, overs, balls) => {
  const totalBalls = overs * 6 + balls;
  if (totalBalls === 0) return 0;
  return (runs / (totalBalls / 6)).toFixed(2);
};

export const updateRecentBalls = (recentBalls, newBall) => {
  const updated = [newBall, ...recentBalls];
  return updated.slice(0, 6);
};

export const formatOvers = (overs, balls) => {
  return `${overs}.${balls}`;
};

export const getTeamStats = (team) => {
  return {
    score: team.score || 0,
    wickets: team.wickets || 0,
    overs: team.overs || 0,
    balls: team.balls || 0,
  };
};

export const createBallEntry = (runs, type = 'normal', bowlerRuns = 0) => {
  const typeMap = {
    'dot': { display: '·', color: 'gray', value: 0 },
    'normal': { display: runs, color: 'blue', value: runs },
    'wide': { display: 'W', color: 'purple', value: bowlerRuns },
    'no-ball': { display: 'NB', color: 'orange', value: bowlerRuns },
    'bye': { display: 'B', color: 'green', value: runs },
    'leg-bye': { display: 'LB', color: 'green', value: runs },
    'wicket': { display: 'W', color: 'red', value: 0 },
  };
  
  return {
    ...typeMap[type],
    timestamp: new Date().toISOString(),
    type,
  };
};

export const getPlayerStats = (player) => {
  return {
    name: player.name || '',
    image: player.image || '',
    runs: player.runs || 0,
    balls: player.balls || 0,
    strikeRate: calculateStrikeRate(player.runs || 0, player.balls || 0),
  };
};

export const formatScore = (score) => {
  return Math.round(score).toLocaleString();
};
