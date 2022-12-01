import { readFile } from 'node:fs/promises';

const input = await readFile('2022/day1.input.txt', 'utf8');
const lines = input.split('\r\n');

// Part 1

(() => {
  console.log('My way:');

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

  const sorted = elves.sort((a, b) => b - a);
  sorted.length = 3;

  console.table({
    partOne: largest,
    partTwo: sorted.reduce((p, c) => p + c, 0),
  });
})();

// 770grappenmaker's way
// https://github.com/770grappenmaker/advent-of-code/blob/main/src/main/kotlin/com/grappenmaker/aoc/year22/Day01.kt

(() => {
  console.log('\n770grappenmakers way:');
  const elves = input
    .split('\r\n\r\n')
    .map((elf) =>
      parseInt(elf.split('\r\n').reduce((a, b) => parseInt(a) + parseInt(b)))
    )
    .sort((a, b) => b - a);

  const partOne = elves[0];
  const partTwo = elves.slice(0, 3).reduce((a, b) => a + b);

  console.table({ partOne, partTwo });
})();
