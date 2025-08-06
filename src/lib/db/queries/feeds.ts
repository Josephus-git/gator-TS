import { db } from "..";
import { feeds } from "../schema";
import { asc, eq, sql } from "drizzle-orm";


export async function addFeed(name: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({name:name, url:url, userId:userId}).returning();
    return result;
}

export async function getFeeds() {
    const result = await db.select().from (feeds);
    return result
}

export async function getFeedByUrl(url: string) {
    const [result] = await db.select().from(feeds).where(eq(feeds.url, url))
    return result
}

export async function markFeedFetched(id: string) {
    await db.update(feeds).set({
        lastFetchedAt: new Date(),
        updatedAt: new Date(),
    }).where(eq(feeds.id, id)).returning();
}


export async function getNextFeedToFetch() {
    const [feed] = await db.select()
        .from(feeds)
        .orderBy(
            sql`${feeds.lastFetchedAt} IS NULL DESC`,
            asc(feeds.lastFetchedAt)
        )
        .limit(1);
    return feed;
}
