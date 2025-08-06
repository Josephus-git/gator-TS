import { createFeedFollow } from "./lib/db/queries/feed_follows";
import { getUser } from "./lib/db/queries/users";
import { exit } from "node:process";
import { readConfig } from "./config";
import { getFeedByUrl } from "./lib/db/queries/feeds";

export async function handlerFollow(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        console.log(`usage: ${cmdName} <url>`)
        exit(1)
    }
    const url = args[0]
    const currentUserName = readConfig().currentUserName

    try {
        const user = await getUser(currentUserName)
        const feed = await getFeedByUrl(url)

        const feedFollow = await createFeedFollow(feed.id, user.id);
        console.log(`Feed Name: ${feedFollow.feedName} \nUserName: ${feedFollow.userName}`)
    } catch (error) {
        console.log(`Feed follow already exists`)
    }
}