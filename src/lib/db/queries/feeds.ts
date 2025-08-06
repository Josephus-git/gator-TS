import { db } from "..";
import { feeds } from "../schema";
import { eq } from "drizzle-orm";


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
