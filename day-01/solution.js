import { readFileSync } from 'node:fs';

// PART 1
const getSortListOfCalories = (list) => {
  return list
    .split('\n\n')
    .map((items) => items.split('\n').reduce((acc, item) => acc + Number(item), 0))
    .sort((a, b) => b - a);
};

const listOfCalories = readFileSync('day-01/input.txt', { encoding: 'utf-8' });
const sortedListOfCalories = getSortListOfCalories(listOfCalories);

console.log(`Elf with the most calories carrying ${sortedListOfCalories[0]} calories`);

// PART 2
let sumOfTopThreeElvesCalories = 0;

for (let i = 0; i < 3; i++) {
  sumOfTopThreeElvesCalories += sortedListOfCalories[i]
}

console.log(`Top three Elves carrying ${sumOfTopThreeElvesCalories} calories`);
