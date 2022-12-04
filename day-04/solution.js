import { readFileSync } from 'node:fs';

const srcData = readFileSync('./day-04/input.txt', { encoding: 'utf-8' });

const getNumberOfPairs = (src, filter) =>
  src
    .split('\n')
    .map((pair) => pair.split(',').map((range) => range.split('-').map(Number)))
    .filter(filter).length;

// PART 1
const isOneRangeFullyContainTheOther = ([rangeA, rangeB]) =>
  (rangeA[0] <= rangeB[0] && rangeA[1] >= rangeB[1]) ||
  (rangeB[0] <= rangeA[0] && rangeB[1] >= rangeA[1]);

const numberOfPairsInWhichOneRangeFullyContainTheOther = getNumberOfPairs(
  srcData,
  isOneRangeFullyContainTheOther,
);
console.log(
  'Number of pairs in which one range fully contains the other is',
  numberOfPairsInWhichOneRangeFullyContainTheOther,
);

// PART 2

const isRangesOverlaps = ([rangeA, rangeB]) =>
  rangeA[1] >= rangeB[0] && rangeA[0] <= rangeB[1];

const numberOfPairsWithOverlapedRanges = getNumberOfPairs(
  srcData,
  isRangesOverlaps,
);
console.log(
  'Number of pairs in which ranges overlap is',
  numberOfPairsWithOverlapedRanges,
);
