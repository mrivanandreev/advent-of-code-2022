import { readFileSync } from 'node:fs';

const mapOfShapes = {
  rock:     1,
  paper:    2,
  scissors: 3,
}
const mapOfResult = {
  lose: 'X',
  draw: 'Y',
  win:  'Z'
}
const mapOfMatchingResult = {
  // rock
  A: {
    // for lose
    X: mapOfShapes.scissors,
    // for draw
    Y: mapOfShapes.rock,
    // for win
    Z: mapOfShapes.paper,
  },
  // paper
  B: {
    // for lose
    X: mapOfShapes.rock,
    // for draw
    Y: mapOfShapes.paper,
    // for win
    Z: mapOfShapes.scissors,
  },
  // scissors
  C: {
    // for lose
    X: mapOfShapes.paper,
    // for draw
    Y: mapOfShapes.scissors,
    // for win
    Z: mapOfShapes.rock,
  }
}
const SCORE_FOR_DRAW = 3;
const SCORE_FOR_WIN = 6;

const getTotalScore = (list) => {
  const arrayOfRounds = list.split('\n').map((round) => round.split(' '));

  return arrayOfRounds.reduce((totalScore, round) => {
    const opponentShape = round[0];
    const resultOfRound = round[1];

    const myShape = mapOfMatchingResult[opponentShape][resultOfRound];

    // score for shape
    totalScore += myShape;
    
    // score for result
    switch (resultOfRound) {
      case mapOfResult.draw: {
        totalScore += SCORE_FOR_DRAW;
        break;
      }
      case mapOfResult.win: {
        totalScore += SCORE_FOR_WIN;
        break;
      }
    }

    return totalScore;
  }, 0);
};

const strategyGuide = readFileSync('day-02/input.txt', { encoding: 'utf-8' });
const totalScore = getTotalScore(strategyGuide);
console.log(`Total score: ${totalScore}`);