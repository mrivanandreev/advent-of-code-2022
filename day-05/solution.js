import { readFileSync } from 'node:fs';

const inputData = readFileSync('day-05/input.txt', { encoding: 'utf-8' });

const getSplitData = (data) => {
  const [startingConfig, rearrangementProcedure] = data.split('\n\n');

  return {
    startingConfig,
    rearrangementProcedure,
  };
};

const parseConfig = (config) => {
  const resultMap = {};
  const arrayConfig = config.split('\n');

  const stackNumbers = arrayConfig.pop();
  const splitStackNumbers = stackNumbers.split('');

  splitStackNumbers.forEach((stackNumber, numberIndex) => {
    if (stackNumber.trim()) {
      for (let rowIndex = arrayConfig.length - 1; rowIndex >= 0; rowIndex--) {
        const curChar = arrayConfig[rowIndex][numberIndex].trim();

        if (curChar) {
          resultMap[stackNumber] ||= [];
          resultMap[stackNumber].push(curChar);
        }
      }
    }
  });

  return resultMap;
};

const parseProcedureRow = (row) => {
  const [, move, , from, , to] = row.split(' ');

  return {
    move,
    from,
    to,
  };
};

const parseProcedure = (procedure) => {
  const splitProcedure = procedure.split('\n');
  const transformProcedure = splitProcedure.map(parseProcedureRow);

  return transformProcedure;
};

const rearrangeStacks = (data, craneModel = 'CrateMover 9000') => {
  const { startingConfig, rearrangementProcedure } = getSplitData(data);
  const parsedConfig = parseConfig(startingConfig);
  const parsedRearrangementProcedure = parseProcedure(rearrangementProcedure);

  parsedRearrangementProcedure.forEach((procedure) => {
    const { move, from, to } = procedure;

    if (craneModel === 'CrateMover 9000') {
      for (let i = 1; i <= move; i++) {
        const crate = parsedConfig[from].pop();
        parsedConfig[to].push(crate);
      }
    }

    if (craneModel === 'CrateMover 9001') {
      const crates = parsedConfig[from].splice(-move);
      parsedConfig[to].push(...crates);
    }
  });

  return parsedConfig;
};

const getCratesAtTopOfEachStack = (data) => {
  const rearrangedStacks = rearrangeStacks(data, 'CrateMover 9001');
  let resultMessage = '';

  for (const stack in rearrangedStacks) {
    const lastIndex = rearrangedStacks[stack].length - 1;
    const lastCrate = rearrangedStacks[stack][lastIndex];
    resultMessage += lastCrate;
  }

  return resultMessage;
};

const message = getCratesAtTopOfEachStack(inputData);
console.log(message);
