import { readConfig } from "./config.js"
import { getFeedFollowsForUser } from "./lib/db/queries/feed_follows"
import { getUser } from "./lib/db/queries/users"

export async function handlerFollowing(cmdName: string) {
    const userName = readConfig().currentUserName;
    const user = await getUser(userName);
    const feeds = await getFeedFollowsForUser(user.id);
    for (const feed of feeds) {
        console.log(`Feeds for user ${user.name}:`);
        console.log(feed.feedName);
    }
}