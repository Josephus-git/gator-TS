import { addFeed } from "./lib/db/queries/feeds";
import { exit } from "node:process";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";
import { printFeed } from "./fetchFeed"
import { createFeedFollow } from "./lib/db/queries/feed_follows";


export async function handlerCreateFeed(cmdName: string, ...args: string[]) {
    const cfg = readConfig()
    const user = await getUser(cfg.currentUserName)

    if (args.length < 2 ) {
        console.log(`usage: ${cmdName} <feed name> <feedUrl>`)
        exit(1)
    }
    const name = args[0];
    const url = args[1];
    try {
        const createdFeed = await addFeed(name, url, user.id);
        await createFeedFollow(createdFeed.id, createdFeed.userId)
        printFeed(createdFeed, user);
    } catch (error) {
        console.log(error)
        exit(1)
    } 
}