import { readConfig } from "./config";
import { getUsers } from "./lib/db/queries/users";

export async function handlerGetUsers(cmdName: string) {
    const users = await getUsers()
    const cfg = readConfig()
    for (let user of users) {
        if (cfg.currentUserName === user.name) {
            console.log(`* ${user.name} (current)`)
        } else (
            console.log(`* ${user.name}`)
        )
    }
}