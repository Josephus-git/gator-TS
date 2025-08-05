import { registerCommand, CommandRegistry, runCommand } from "./commands.js";
import { handlerLogin } from "./handler_login.js";
import { argv, exit } from "node:process";

function main() {
    const newRegistry: CommandRegistry = {}
    registerCommand(newRegistry, "login", handlerLogin);
    const cmd = argv.slice(2);
    if (cmd.length === 0) {
        console.log("usage: gator <command>")
        exit(1)
    }
    const commandName = cmd[0];
    const args = cmd.slice(1);
    try {
        runCommand(newRegistry, commandName, ...args)
    } catch (error) {
        console.log(error)
    }
    
}

main();