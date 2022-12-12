import { readFileSync } from 'node:fs';

const inputData = readFileSync('day-06/input.txt', { encoding: 'utf-8' });

const NUMBER_OF_CHARS_IN_START_OF_PACKET_MARKER = 4;
const NUMBER_OF_CHARS_IN_START_OF_MESSAGE_MARKER = 14;

const isDifferentCharacters = (str) => new Set(str).size === str.length;

const findFirstCharIndexAfterMarker = (str, numberOfCharInMarker) => {
  for (let i = numberOfCharInMarker; i < str.length; i++) {
    const prevChar = str.slice(i - numberOfCharInMarker, i);

    if (isDifferentCharacters(prevChar)) {
      return i;
    }
  }
}

const indexOfFirstCharOfPacket = findFirstCharIndexAfterMarker(inputData, NUMBER_OF_CHARS_IN_START_OF_PACKET_MARKER);
console.log(`${indexOfFirstCharOfPacket} characters must be processed before the start-of-packet marker is detected`);

const indexOfFirstCharOfMessage = findFirstCharIndexAfterMarker(inputData, NUMBER_OF_CHARS_IN_START_OF_MESSAGE_MARKER);
console.log(`${indexOfFirstCharOfMessage} characters must be processed before the start-of-message marker is detected`);