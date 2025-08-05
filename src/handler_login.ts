import { setUser } from "./config.js"
import { exit } from "node:process";

export function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        console.log("login handler expects a single argument, the username");
        exit(1)
    }

    setUser(args[0]);
    console.log(`User ${args[0]} has been set successfully`)
}