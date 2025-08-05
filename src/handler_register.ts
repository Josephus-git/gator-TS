import { createUser } from "./lib/db/queries/users";
import { exit } from "node:process";
import { setUser } from "./config";

export async function handlerCreateUser(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        console.log(`usage: ${cmdName} <name>`)
        exit(1)
    }
    const name = args[0]

    try {
        const createdUser = await createUser(name);
        console.log(`user: ${createdUser.name} has been created successfully`);
        await setUser(createdUser.name)
    } catch (error) {
        console.log(`user: ${name} already exist`)
        exit(1)
    }    
}