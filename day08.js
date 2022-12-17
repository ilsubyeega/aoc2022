// https://adventofcode.com/2022/day/8/input

const raw = document.querySelector("body > pre").innerHTML.trim();

const grid = raw.split("\n").map((a) => a.split(""));
const gridClone = JSON.parse(JSON.stringify(grid));

const xLength = grid[0].length;
const yLength = grid.length;

const checkViews = (arr) => {
	let max = -1;
	let clone = JSON.parse(JSON.stringify(arr));
	arr.forEach((a, i) => {
		if (a > max) {
			max = a;
			clone[i] = "v";
		}
	});
	return clone;
};

const range = (start, end) =>
	new Array(end - start + 1).fill().map((_, i) => i + start);

// part one
grid.forEach((a, i) => {
	gridClone[i] = checkViews(a);
	checkViews(a.slice().reverse())
		.reverse()
		.forEach((b, j) => {
			if (b === "v") gridClone[i][j] = "v";
		});
});

range(0, xLength - 1)
	.map((a) => range(0, yLength - 1).map((b) => grid[b][a]))
	.forEach((a, i) => {
		checkViews(a).forEach((b, j) => {
			if (b === "v") gridClone[j][i] = "v";
		});
		checkViews(a.slice().reverse())
			.reverse()
			.forEach((b, j) => {
				if (b === "v") gridClone[j][i] = "v";
			});
	});

console.log(
	gridClone
		.map((a) => a.filter((b) => b === "v").length)
		.reduce((a, b) => a + b),
);

// part two
let maxScore = -1;

const checkViewable = (arr) => {
	const first = arr[0];
	const clone = arr.slice();

	arr.every((a, i) => {
		if (i === 0) return true;
		if (a >= first) return false;
		clone[i] = "v";
		return true;
	});
	clone.shift();
	return clone;
};

const calculateSideScore = (arr) => {
	if (arr.length === 0) return 0;
	if (arr[0] !== "v") return 1;
	let score = 0;
	arr.every((a, i) => {
		if (a !== "v") {
			if (arr[i - 1] === "v") score++;
			return false;
		}
		score++;
		return true;
	});
	return score;
};

grid.forEach((a, i) =>
	a.forEach((b, j) => {
		const topTrees = range(0, i)
			.map((a) => grid[a][j])
			.reverse();
		const leftTrees = range(0, j)
			.map((a) => grid[i][a])
			.reverse();
		const rightTrees = range(j, xLength - 1).map((a) => grid[i][a]);
		const bottomTrees = range(i, yLength - 1).map((a) => grid[a][j]);

		const score = [topTrees, leftTrees, rightTrees, bottomTrees]
			.map(checkViewable)
			.map(calculateSideScore)
			.reduce((a, b) => a * b);

		if (score > maxScore) maxScore = score;
	}),
);

console.log(maxScore);
