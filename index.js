const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const logFile = process.argv[2];

const play = (logFile) => {
	const randomNum = Math.round(Math.random()) + 1;
	console.log("Угадайте, что выпадет: 1 или 2");

	rl.question("> ", (answer) => {
		const userChoice = parseInt(answer);

		if (userChoice === 1 || userChoice === 2) {
			console.log(`Вы выбрали: ${userChoice}`);
			console.log(`Правильный ответ: ${randomNum}`);

			if (userChoice === randomNum) {
				console.log("Поздравляем! Вы угадали!");
			} else {
				console.log("Вы не угадали.");
			}

			try {
				const writerSrt = fs.createWriteStream(`${logFile}.txt`);
				writerSrt.write(`${userChoice} vs ${randomNum}\n`, "");

				if (userChoice === randomNum) {
					writerSrt.write(`Выиграл человек\n`, "");
				} else {
					writerSrt.write(`Выиграл компьютер\n`, "");
				}

				writerSrt.end();
			} catch (error) {
				console.log("Ошибка записи в лог-файле:", error);
			}

			rl.close();
		} else {
			console.log("Пожалуйста, введите 1 или 2.");
			play(logFile);
		}
	});
};

const start = (logFile) => {
	try {
		play(logFile);
	} catch (error) {
		console.log("Ошибка создания лог-файла:", error);
		rl.close();
	}
};

if (!logFile) {
	console.log("Пожалуйста, укажите имя файла для логирования результатов.");
	rl.close();
} else {
	start(logFile);
}
