import { addFeed } from "./lib/db/queries/feeds";
import { exit } from "node:process";
import { printFeed } from "./fetchFeed"
import { createFeedFollow } from "./lib/db/queries/feed_follows";
import { User } from "./middle_ware_login";


export async function handlerCreateFeed(cmdName: string, user: User, ...args: string[]) {
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