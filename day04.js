// https://adventofcode.com/2022/day/4/input

const raw = document.querySelector("body > pre").innerHTML.trim();

const range = (start, end) =>
	new Array(end - start + 1).fill().map((d, i) => i + start);

const convertRange = (rangeText) => {
	const [start, end] = rangeText.split("-").map(Number);
	return range(start, end);
};

const checkFilled = (first, second) =>
	first.filter((a) => second.includes(a)).length === first.length ||
	second.filter((a) => first.includes(a)).length === second.length;

const checkDuplication = (first, second) =>
	first.filter((a) => second.includes(a)).length > 0 ||
	second.filter((a) => first.includes(a)).length > 0;

// part one
console.log(
	raw
		.split("\n")
		.map((a) => a.split(","))
		.map((a) => a.map(convertRange))
		.filter((a) => checkFilled(a[0], a[1])).length,
);

// part two
console.log(
	raw
		.split("\n")
		.map((a) => a.split(","))
		.map((a) => a.map(convertRange))
		.filter((a) => checkDuplication(a[0], a[1])).length,
);
