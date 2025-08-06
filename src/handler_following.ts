import { getFeedFollowsForUser } from "./lib/db/queries/feed_follows"
import { User } from "./middle_ware_login";

export async function handlerFollowing(cmdName: string, user: User) {
    const feeds = await getFeedFollowsForUser(user.id);
    for (const feed of feeds) {
        console.log(`Feeds for user ${user.name}:`);
        console.log(feed.feedName);
    }
}