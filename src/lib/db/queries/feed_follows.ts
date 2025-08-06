import { db } from "..";
import { feedFollows, feeds, users } from "../schema";
import { eq, and, inArray } from "drizzle-orm";

export async function createFeedFollow(feedId: string, userId: string) {
  const [newFollow] = await db
    .insert(feedFollows)
    .values({
      feedId,
      userId,
    })
    .returning({ id: feedFollows.id });

  const [result] = await db
    .select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAt: feedFollows.updatedAt,
      userId: feedFollows.userId,
      feedId: feedFollows.feedId,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.id, newFollow.id));

  return result;
}

export async function getFeedFollowsForUser(userId: string) {
  const result = await db
    .select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAt: feedFollows.updatedAt,
      userId: feedFollows.userId,
      feedId: feedFollows.feedId,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, userId));
  return result;
}

export async function deleteFeedFollow(userId: string, feedUrl: string) {
  const feedIdSubquery = db
    .select({ id: feeds.id })
    .from(feeds)
    .where(eq(feeds.url, feedUrl));

  await db
    .delete(feedFollows)
    .where(and(
      eq(feedFollows.userId, userId),
      inArray(feedFollows.feedId, feedIdSubquery)
    ));
}