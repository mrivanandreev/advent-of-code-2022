import { readFileSync } from 'node:fs';

const mapOfScoreForShape = {
  'X': 1,
  'Y': 2,
  'Z': 3,
};
const mapOfMatchingShapes = {
  'X': 'A',
  'Y': 'B',
  'Z': 'C',
}
const mapOfWinCombinations = {
  'X': 'C',
  'Y': 'A',
  'Z': 'B',
}
const SCORE_FOR_DRAW = 3;
const SCORE_FOR_WIN = 6;

const getTotalScore = (list) => {
  const arrayOfRounds = list.split('\n').map((round) => round.split(' '));

  return arrayOfRounds.reduce((totalScore, round) => {
    totalScore += mapOfScoreForShape[round[1]];

    if (round[0] === mapOfMatchingShapes[round[1]]) {
      totalScore += SCORE_FOR_DRAW;
    }
    if (round[0] === mapOfWinCombinations[round[1]]) {
      totalScore += SCORE_FOR_WIN;
    }

    return totalScore;
  }, 0);
};

const strategyGuide = readFileSync('day-02/input.txt', { encoding: 'utf-8' });
const totalScore = getTotalScore(strategyGuide);
console.log(`Total score: ${totalScore}`);
