#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.greenBright.bold("\n \tWelcome to CLI GitHub Profile Finder - Marjan Ahmed".toUpperCase()));
console.log(chalk.green("-").repeat(67));
console.log("\n");

let user_input = await inquirer.prompt({
    name: "username",
    type: "input",
    message: "Enter your GitHub username: "
});

let fetchApi = async() => {
    const api: string = `https://api.github.com/users/${user_input.username}`;
    console.log(chalk.cyan(`\nFetching data for: ${user_input.username}...\n`));

    try {
        let fetchData = await fetch(api);
        let res = await fetchData.json();
        console.log("Username:",chalk.yellow(res.login));
        console.log("URL: ",chalk.yellow(res.html_url));
        console.log("User Name:",chalk.yellow(res.name));
        console.log("User Bio:",chalk.yellow(res.bio));
        console.log("User Location:",chalk.yellow(res.location));
        console.log("Number of Public Repos:",chalk.yellow(res.public_repos));
    }
    catch (err) {
        console.error(chalk.red("Error fetching data:", err));
        return;
    }
}

fetchApi();