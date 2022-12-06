// https://adventofcode.com/2022/day/2/input

const raw = document.querySelector("body > pre").innerHTML.trim();

const partOne = (opponentChar, meChar) => {
	// 0: Rock, 1: Paper, 2: Scissors
	const opponent = opponentChar.charCodeAt() - 65;
	const me = meChar.charCodeAt() - 88;

	const additionalScore = [1, 2, 3][me];

	const score = [
		[3, 6, 0],
		[0, 3, 6],
		[6, 0, 3],
	][opponent][me];

	return score + additionalScore;
};

console.log(
	raw
		.split("\n")
		.map((a) => a.split(" "))
		.map((a) => partOne(a[0], a[1]))
		.reduce((a, b) => a + b),
);

const partTwo = (opponentChar, resultChar) => {
	// 0: Rock, 1: Paper, 2: Scissors
	const opponent = opponentChar.charCodeAt() - 65;
	// 0: Lose, 1: Draw, 2: Win
	const result = resultChar.charCodeAt() - 88;
	// Calculate based on the input of result and opponent. | 0: Rock, 1: Paper, 2: Scissors
	const strategy = [
		[2, 0, 1],
		[0, 1, 2],
		[1, 2, 0],
	][result][opponent];

	let score = 0;
	score += [0, 3, 6][result];
	score += [1, 2, 3][strategy];

	return score;
};

console.log(
	raw
		.split("\n")
		.map((a) => a.split(" "))
		.map((a) => partTwo(a[0], a[1]))
		.reduce((a, b) => a + b),
);
