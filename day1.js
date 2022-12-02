// https://adventofcode.com/2022/day/1/input

const raw = document.querySelector("body > pre").innerHTML.trim();

const sortByCalroies = raw
	.split("\n\n")
	.map((a) => a.split("\n"))
	.map((a) => a.reduce((o, v) => o + parseInt(v), 0))
	.sort((a, b) => b - a);

console.log(sortByCalroies[0]); // part one
console.log(sortByCalroies[0] + sortByCalroies[1] + sortByCalroies[2]); // part two