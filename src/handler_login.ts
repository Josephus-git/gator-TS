import { setUser } from "./config.js"
import { exit } from "node:process";


export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        console.log(`usage: ${cmdName} <name>`);
        exit(1)
    }
    const userName = args[0]
    await setUser(userName);
    console.log(`User ${userName} has been set successfully`)
}