import { createFeedFollow } from "./lib/db/queries/feed_follows";
import { exit } from "node:process";
import { getFeedByUrl } from "./lib/db/queries/feeds";
import { User } from "./middle_ware_login";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length === 0) {
        console.log(`usage: ${cmdName} <url>`)
        exit(1)
    }
    const url = args[0]

    try {
        const feed = await getFeedByUrl(url)

        const feedFollow = await createFeedFollow(feed.id, user.id);
        console.log(`Feed Name: ${feedFollow.feedName} UserName: ${feedFollow.userName}`)
    } catch (error) {
        console.log(`Feed follow already exists`)
    }
}