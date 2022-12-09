// https://adventofcode.com/2022/day/6/input

const raw = document.querySelector("body > pre").innerHTML.trim();

const chars = raw.split("");

const checkDuplication = (textarr) =>
	textarr.filter((a) => a != null).length === textarr.length &&
	textarr.filter((v, i, a) => a.indexOf(v) === i).length === textarr.length;

const range = (start, end) =>
	new Array(end - start + 1).fill().map((_, i) => i + start);

// part one
chars.every((_, i) => {
	if (!checkDuplication(range(i - 3, i).map((a) => chars[a]))) return true;
	console.log(i + 1);
});

// part two
chars.every((_, i) => {
	if (!checkDuplication(range(i - 13, i).map((a) => chars[a]))) return true;
	console.log(i + 1);
});
