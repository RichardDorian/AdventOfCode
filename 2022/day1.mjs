import { readFile } from 'node:fs/promises';

const input = await readFile('2022/day1.input.txt', 'utf8');
const lines = input.split('\r\n');

// Part 1

const elves = [];
let current = 0;
for (const line of lines)
  if (!line) {
    // Empty line -> new Elf
    elves.push(current);
    current = 0;
  } else current += parseInt(line);

elves.push(current);
const largest = Math.max(...elves);

console.log('Part one:', largest);

// Part 2

const sorted = elves.sort((a, b) => b - a);
sorted.length = 3;

console.log(
  'Part two:',
  sorted.reduce((p, c) => p + c, 0)
);
