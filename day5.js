// https://adventofcode.com/2022/day/5/input

const raw = document.querySelector("body > pre").innerHTML; // No trims at this moement since the top height starts with spaces.

const datas = raw.split("\n\n");

const groupByFour = (array) => {
	const result = [];
	for (let i = 0; i < array.length; i += 4) {
		result.push(array.slice(i, i + 4));
	}
	return result;
};

let table = datas[0].split("\n");
table.pop();

table = table
	.map((a) => a.split(""))
	.map((a) => groupByFour(a))
	.map((a) => a.map((b) => b[1]))
	.reverse();
table = table[0].map((_, colIndex) => table.map((row) => row[colIndex])); // Transposing a 2D-array: https://stackoverflow.com/a/17428705
table = table.map((a) => a.filter((b) => b !== " "));

const moveRegex = /move (\d+) from (\d+) to (\d+)/;
const moves = datas[1]
	.trim()
	.split("\n")
	.map((a) => moveRegex.exec(a))
	.map((a) => [parseInt(a[1]), parseInt(a[2]), parseInt(a[3])]);

// part one
let partOne = JSON.parse(JSON.stringify(table));

moves.forEach((a) => {
	const [times, from, to] = a;
	for (let i = 0; i < times; i++) {
		partOne[to - 1].push(partOne[from - 1].pop());
	}
});
console.log(partOne.map((a) => a[a.length - 1]).join(""));

// part two
let partTwo = JSON.parse(JSON.stringify(table));

moves.forEach((a) => {
	const [times, from, to] = a;
	const queues = [];
	for (let i = 0; i < times; i++) {
		queues.push(partTwo[from - 1].pop());
	}
	queues.reverse().forEach((a) => partTwo[to - 1].push(a));
});
console.log(partTwo.map((a) => a[a.length - 1]).join(""));
