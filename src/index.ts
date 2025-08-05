import { registerCommand, CommandRegistry, runCommand } from "./registry.js";
import { handlerLogin } from "./handler_login.js";
import { argv, exit } from "node:process";
import { handlerCreateUser } from "./handler_register.js";
import { handlerReset } from "./handler_reset.js";
import { handlerGetUsers } from "./handler_users.js";


async function main() {
    const newRegistry: CommandRegistry = {}
    registerCommand(newRegistry, "login", handlerLogin);
    registerCommand(newRegistry, "register", handlerCreateUser)
    registerCommand(newRegistry, "reset", handlerReset)
    registerCommand(newRegistry, "users", handlerGetUsers)


    const cmd = argv.slice(2);
    if (cmd.length === 0) {
        console.log("usage: gator <command>")
        exit(1)
    }
    const commandName = cmd[0];
    const args = cmd.slice(1);
    try {
        await runCommand(newRegistry, commandName, ...args)
    } catch (error) {
        console.log(error)
    }
    exit(0)
}

main();