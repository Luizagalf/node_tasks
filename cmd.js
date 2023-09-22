const yargs = require("yargs");

const argv = yargs
	.command("current", "Get current date and time", {
		year: {
			alias: "y",
			describe: "Get current year",
			type: "boolean",
		},
		month: {
			alias: "m",
			describe: "Get current month",
			type: "boolean",
		},
		date: {
			alias: "d",
			describe: "Get current date",
			type: "boolean",
		},
	})
	.command("add", "Get future date and time", {
		year: {
			alias: "y",
			describe: "Number of years to add",
			type: "number",
		},
		month: {
			alias: "m",
			describe: "Number of months to add",
			type: "number",
		},
		date: {
			alias: "d",
			describe: "Number of days to add",
			type: "number",
		},
	})
	.command("sub", "Get past date and time", {
		year: {
			alias: "y",
			describe: "Number of years to subtract",
			type: "number",
		},
		month: {
			alias: "m",
			describe: "Number of months to subtract",
			type: "number",
		},
		date: {
			alias: "d",
			describe: "Number of days to subtract",
			type: "number",
		},
	}).argv;

const getCurrentDateTime = () => {
	let currentDate = new Date();

	if (argv._[0] === "add") {
		argv.year
			? currentDate.setFullYear(currentDate.getFullYear() + argv.year)
			: argv.month
			? currentDate.setMonth(currentDate.getMonth() + argv.month)
			: currentDate.setDate(currentDate.getDate() + argv.date);

		return currentDate.toISOString();
	}
	if (argv._[0] === "sub") {
		argv.year
			? currentDate.setFullYear(currentDate.getFullYear() - argv.year)
			: argv.month
			? currentDate.setMonth(currentDate.getMonth() - argv.month)
			: currentDate.setDate(currentDate.getDate() - argv.date);

		return currentDate.toISOString();
	}
	if (argv._[0] === "current") {
		return argv.year
			? currentDate.getFullYear()
			: argv.month
			? currentDate.getMonth() + 1
			: argv.date
			? currentDate.getDate()
			: currentDate.toISOString();
	}
};

if (argv._[0] === "current") {
	const output = argv.year
		? `Current year: ${getCurrentDateTime()}`
		: argv.month
		? `Current month: ${getCurrentDateTime()}`
		: argv.date
		? `Current date: ${getCurrentDateTime()}`
		: `Current date and time (ISO): ${getCurrentDateTime()}`;

	console.log(output);
} else if (argv._[0] === "add" || argv._[0] === "sub") {
	console.log(`Date and time (ISO): ${getCurrentDateTime()}`);
} else {
	console.error("Invalid command. Use 'help' for information.");
}
