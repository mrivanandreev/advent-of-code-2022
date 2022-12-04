import { readFileSync } from 'node:fs';

// PART 1

const getPriorityOfItem = (letter) => {
  const COMPENSATOR_FOR_UPPERCASE = 38;
  const COMPENSATOR_FOR_LOWERCASE = 96;

  if (letter.charCodeAt() >= 97) {
    return letter.charCodeAt() - COMPENSATOR_FOR_LOWERCASE;
  }

  return letter.charCodeAt() - COMPENSATOR_FOR_UPPERCASE;
};

const getDividedLine = (line) => {
  const indexOfBorderChar = line.length / 2;

  const leftPart = line.slice(0, indexOfBorderChar);
  const rightPart = line.slice(indexOfBorderChar);

  return [leftPart, rightPart];
};

const getCommonItemInSeveralLines = (arrayOfLines) => {
  const getCommonCharacters = (line1, line2) => {
    let commonItem = '';

    for (let i = 0; i < line1.length; i++) {
      if (line2.includes(line1[i])) {
        commonItem += line1[i];
      }
    }

    return commonItem;
  };

  return arrayOfLines.reduce(getCommonCharacters, arrayOfLines[0]);
};

const getSumReducer = (num1, num2) => num1 + num2;

const getSumOfPrioritiesPart1 = (src) =>
  src
    .split('\n')
    .map(getDividedLine)
    .map(getCommonItemInSeveralLines)
    .map(getPriorityOfItem)
    .reduce(getSumReducer, 0);

// PART 2

const getGroupsReducer = (resultArray, item, index) => {
  const groupIndex = Math.floor(index / 3);
  resultArray[groupIndex] ||= [];
  resultArray[groupIndex].push(item);

  return resultArray;
};

const getSumOfPrioritiesPart2 = (src) =>
  src
    .split('\n')
    .reduce(getGroupsReducer, [])
    .map(getCommonItemInSeveralLines)
    .map(getPriorityOfItem)
    .reduce(getSumReducer, 0);

const srcData = readFileSync('./day-03/input.txt', { encoding: 'utf-8' });

const sumOfPrioritiesPart1 = getSumOfPrioritiesPart1(srcData);
console.log(`Sum of the priorities of item types (part 1): ${sumOfPrioritiesPart1}`);

const sumOfPrioritiesPart2 = getSumOfPrioritiesPart2(srcData);
console.log(`Sum of the priorities of item types (part 2): ${sumOfPrioritiesPart2}`);
