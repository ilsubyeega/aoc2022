// https://adventofcode.com/2022/day/3/input

const raw = document.querySelector("body > pre").innerHTML.trim();

const convertPriority = (alphabet) => {
	const charCodeAt = alphabet.charCodeAt(0);
	if (charCodeAt >= 65 && charCodeAt <= 90) {
		return charCodeAt - 65 + 27; // big alphabet
	}
	if (charCodeAt >= 97 && charCodeAt <= 122) {
		return charCodeAt - 96; // small alphabet
	}

	console.error("Unexpected value:", a, charCodeAt);
};

const splitItems = (text) => [
	text.substring(0, text.length / 2),
	text.substring(text.length / 2, text.length),
];

const getItemType = (text) => {
	const [ text1, text2 ] = splitItems(text);
	const text2Splited = text2.split("");
	return [
		...new Set(text1.split("").filter((a) => text2Splited.includes(a))),
	][0];
};

const getItemTypeFromArr = (textArr /* Should be 3 items */) => {
	return [
		...new Set(
			textArr[0].filter(
				(a) => textArr[1].includes(a) && textArr[2].includes(a),
			),
		),
	][0];
};

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
	.map((a) => getItemType(a))
	.map((a) => convertPriority(a))
	.reduce((a, b) => a + b);

// Part two
groupByThree(raw.split("\n").map((a) => a.split("")))
	.map((a) => getItemTypeFromArr(a))
	.map(convertPriority)
	.reduce((a, b) => a + b);
