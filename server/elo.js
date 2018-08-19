const EloRank = require('elo-rank');
const _ = require('lodash');
const elo = new EloRank(15);

module.exports = (matchups) => {
  let players = {};
  matchups.map(matchup => {
    const winner = players[matchup.winner_id] || {};
    const loser = players[matchup.loser_id] || {};
    let winnerElo = winner.elo || 1400;
    let winnerEloHistory = winner.eloHistory || [];
    
    let loserElo = loser.elo || 1400;
    let loserEloHistory = loser.eloHistory || [];

    const expectedScoreWinner = elo.getExpected(winnerElo, loserElo);
    const expectedScoreLoser = elo.getExpected(loserElo, winnerElo);

    winnerElo = elo.updateRating(expectedScoreWinner, 1, winnerElo);
    loserElo = elo.updateRating(expectedScoreLoser, 0, loserElo);

    players[matchup.winner_id] = {
      elo: winnerElo,
      eloHistory: winnerEloHistory.concat([winnerElo])
    };
    players[matchup.loser_id] = {
      elo: loserElo,
      eloHistory: loserEloHistory.concat([loserElo])
    };
  });
  let results = _.toPairs(players).map(item => {
    console.log(item);
    return {
      rankable_id: item[0],
      elo: item[1].elo,
      eloHistory: item[1].eloHistory
    };
  })
  results = _.orderBy(results, ['elo', 'rankable'], ['desc', 'asc']);
  results = results.map((item, rank) => {
    item.rank = rank + 1;
    return item;
  })
  return results;
}
