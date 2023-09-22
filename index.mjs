import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const randomNum = Math.floor(Math.random() * 101);

const main = async () => {
	const rl = readline.createInterface({ input, output });
	let answer;

	console.log("Загадано число в диапазоне от 0 до 100");

	while (true) {
		answer = await rl.question("> ");

		if (isNaN(answer)) {
			console.log("Пожалуйста, введите числовое значение.");
		} else {
			answer = parseInt(answer);
			if (answer < randomNum) {
				console.log("Больше");
			} else if (answer > randomNum) {
				console.log("Меньше");
			} else {
				console.log(`Отгадано число ${answer}`);
				rl.close();
				break;
			}
		}
	}
};

main();
