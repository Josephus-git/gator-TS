import { deleteFeedFollow } from "./lib/db/queries/feed_follows";
import { exit } from "node:process";
import { User } from "./middle_ware_login";

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length === 0) {
        console.log(`usage: ${cmdName} <url>`)
        exit(1)
    }
    const feedUrl = args[0]
    await deleteFeedFollow(user.id, feedUrl)
    console.log(`successfully deleted feed follow ${feedUrl} for ${user.name}`)
}