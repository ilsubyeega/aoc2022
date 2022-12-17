// https://adventofcode.com/2022/day/9/input

const raw = document.querySelector("body > pre").innerHTML.trim();

const data = raw
	.split("\n")
	.map((a) => a.split(" "))
	.map((a) => [a[0], Number(a[1])]);

const checkTailIsTouching = (head, tail) => {
	const [x, y] = head;
	const [x2, y2] = tail;
	return Math.abs(x - x2) <= 1 && Math.abs(y - y2) <= 1;
};

// part one
{
	const visited = new Set();
	let headPos = [0, 0];
	let tailPos = [0, 0];

	data.forEach((move, i) => {
		const [direction, steps] = move;
		console.log(direction, steps);
		for (let j = 0; j < steps; j++) {
			switch (direction) {
				case "U":
					headPos[1] += 1;
					break;
				case "D":
					headPos[1] -= 1;
					break;
				case "L":
					headPos[0] -= 1;
					break;
				case "R":
					headPos[0] += 1;
					break;
			}
			if (!checkTailIsTouching(headPos, tailPos)) {
				switch (direction) {
					case "U":
						tailPos = [headPos[0], headPos[1] - 1];
						break;
					case "D":
						tailPos = [headPos[0], headPos[1] + 1];
						break;
					case "L":
						tailPos = [headPos[0] + 1, headPos[1]];
						break;
					case "R":
						tailPos = [headPos[0] - 1, headPos[1]];
						break;
				}
				visited.add(`${tailPos[0]},${tailPos[1]}`);
			}
			console.log(headPos, tailPos);
		}
	});

	console.log(visited.size + 1);
}
