import { printFeed } from "./fetchFeed"
import { getUserById } from "./lib/db/queries/users"
import { getFeeds } from "./lib/db/queries/feeds"


export async function handlerGetFeeds(cmdName: string) {
    const feeds = await getFeeds();

    for (let feed of feeds) {
        const user = await getUserById(feed.userId)
        printFeed(feed, user)
    }
}