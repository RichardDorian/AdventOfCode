import { readFile } from 'node:fs/promises';

const input = await readFile('2022/day2.input.txt', 'utf8');
const lines = input.split('\r\n');

const Points = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
  LOST: 0,
  DRAW: 3,
  WON: 6,
};

let partOne = 0;

for (const line of lines) {
  const [play, choice] = line.split(' ');

  const round = (play, choice) => {
    play = play.replace('A', 'X').replace('B', 'Y').replace('C', 'Z');
    if (play === choice) return Points.DRAW;

    const weight = ['X', 'Y', 'Z'];
    let playWeight = weight.indexOf(play);
    let choiceWeight = weight.indexOf(choice);

    if (playWeight === 0 && choice === 'Z') playWeight = weight.length;
    if (choiceWeight === 0 && play === 'Z') choiceWeight = weight.length;

    if (choiceWeight > playWeight) return Points.WON;
    else return Points.LOST;
  };

  partOne += Points[choice];
  partOne += round(play, choice);
}

let partTwo = 0;

for (const line of lines) {
  const [play, choice] = line.split(' ');

  const rules = [
    ['A', 'B', 'C'],
    ['B', 'C', 'A'],
    ['C', 'A', 'B'],
  ];
  const rule = rules.find((r) => r[0] === play);

  partTwo +=
    choice === 'X' ? Points.LOST : choice === 'Y' ? Points.DRAW : Points.WON;

  const choiceIndex = { X: 2, Y: 0, Z: 1 };
  partTwo += Points[rule[choiceIndex[choice]]];
}

console.table({ partOne, partTwo });
