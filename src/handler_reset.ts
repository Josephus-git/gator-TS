import { reset } from "./lib/db/queries/users.js"

export async function handlerReset(cmdName: string) {
    await reset();
    console.log("users database has been reset")
}