#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import ora from 'ora';
import figlet from 'figlet';
import boxen from 'boxen';

let fetchApi = async() => {

    console.log(
        boxen(figlet.textSync('GitHub Finder', { horizontalLayout: 'full' }), { padding: 1, margin: 1, borderStyle: 'double' })
    );
    console.log(chalk.green("-").repeat(100));
    console.log("\n");
    
    let user_input = await inquirer.prompt({
        name: "username",
        type: "input",
        message: "Enter your GitHub username: "
    });


    const api: string = `https://api.github.com/users/${user_input.username}`;
    let spinner = ora(chalk.cyan(`Fetching data for: ${user_input.username}...\n`)).start();

    try {
        let fetchData = await fetch(api);
        let res = await fetchData.json();

        spinner.succeed(`Data fetched for: ${user_input.username}`);
        console.log(chalk.cyan('\nUser Profile Information:\n'));

        console.log("Username:",chalk.yellow(res.login));
        console.log("URL: ",chalk.yellow(res.html_url));
        console.log("User Name:",chalk.yellow(res.name));
        console.log("User Bio:",chalk.yellow(res.bio));
        console.log("User Location:",chalk.yellow(res.location));
        console.log("Number of Public Repos:",chalk.yellow(res.public_repos));
    }
    catch (err) {
        spinner.fail('Error fetching data');
        console.error(chalk.red("Error fetching data:", err));
        return;
    }
}

fetchApi();