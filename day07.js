// https://adventofcode.com/2022/day/7/input

const raw = document.querySelector("body > pre").innerHTML.trim();

let fileSystem = {};
let position = [];

raw.split("\n").every((a) => {
	if (a.startsWith("$ cd")) {
		const loc = a.split("cd ")[1];
		if (loc === "..") {
			position.pop();
		} else if (loc === "/") {
			position = [];
		} else {
			position.push(loc);
		}
		return true;
	} else if (a === "$ ls") {
		return true;
	} else {
		const currPos =
			position.length === 0
				? fileSystem
				: position.reduce((a, b) => a[b], fileSystem);
		if (a.startsWith("dir ")) {
			const loc = a.split("dir ")[1];
			currPos[loc] = {};
		} else {
			const spliited = a.split(" ");
			currPos[spliited[1]] = Number(spliited[0]);
		}
	}
	return true;
});

const calculateByDepths = (obj) => {
	let resultObj = {};
	let sum = 0;
	Object.keys(obj).forEach((a) => {
		if (typeof obj[a] === "number") {
			resultObj[a] = obj[a];
			sum += obj[a];
		} else {
			resultObj[a] = calculateByDepths(obj[a]);
			if (typeof resultObj[a][1] === "number") {
				sum += resultObj[a][1];
			}
		}
	});
	return sum === 0 ? resultObj : [resultObj, sum];
};

const calculated = calculateByDepths(fileSystem);
console.log(calculated);

const arrayNumbersFromObjectWithMin = (obj, max) => {
	let arr = [];
	Object.keys(obj).forEach((a) => {
		if (Array.isArray(obj[a])) {
			if (obj[a][1] >= max) arr.push(obj[a][1]);
			arrayNumbersFromObjectWithMin(obj[a][0], max).forEach((a) => arr.push(a));
		}
	});
	return arr;
};

const arrayNumbersFromObjectWithMax = (obj, max) => {
	let arr = [];
	Object.keys(obj).forEach((a) => {
		if (Array.isArray(obj[a])) {
			if (obj[a][1] <= max) arr.push(obj[a][1]);
			arrayNumbersFromObjectWithMax(obj[a][0], max).forEach((a) => arr.push(a));
		}
	});
	return arr;
};

// part one
console.log(
	arrayNumbersFromObjectWithMax(calculated[0], 100000).reduce((a, b) => a + b),
);

// part two
{
    const sizeToCleanUp = 30000000 - (70000000 - calculated[1])
    const res = arrayNumbersFromObjectWithMin(calculated[0], sizeToCleanUp)
    console.log(res.sort((a, b) => a - b)[0])
}