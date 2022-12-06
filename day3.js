// https://adventofcode.com/2022/day/3/input

const raw = document.querySelector("body > pre").innerHTML.trim();

const convertPriority = (alphabet) =>
	alphabet.charCodeAt(0) <= 90
		? alphabet.charCodeAt(0) - 65 + 27
		: alphabet.charCodeAt(0) - 96;

const divideArray = (array) => [
	array.slice(0, array.length / 2),
	array.slice(array.length / 2, array.length),
];


const getItemTypeFromArr = (textArrays) =>
	textArrays[0].find((character) =>
		textArrays.every((item) => item.includes(character)),
	);

const groupByThree = (array) => {
	const result = [];
	for (let i = 0; i < array.length; i += 3) {
		result.push(array.slice(i, i + 3));
	}
	return result;
};

// Part one
raw
	.split("\n")
	.map((a) => a.split(""))
	.map(divideArray)
	.map(getItemTypeFromArr)
	.map(convertPriority)
	.reduce((a, b) => a + b);

// Part two
groupByThree(raw.split("\n").map((a) => a.split("")))
	.map(getItemTypeFromArr)
	.map(convertPriority)
	.reduce((a, b) => a + b);
