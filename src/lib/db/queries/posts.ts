
import { db } from "..";
import { posts, feedFollows, feeds } from "../schema";
import { desc, eq } from "drizzle-orm";


type NewPost = {
    title: string | null,
    url: string,
    description: string | null,
    publishedAt: Date, 
    feedId: string,
}


export async function createPost(post: NewPost) {
    const [result] = await db.insert(posts).values(post).returning();
    return result;
}

export async function getPostsForUser(userId: string, limit = 2) {
    const userPosts = await db
        .select({
            postTitle: posts.title,
            postUrl: posts.url,
            postDescription: posts.description,
            postPublishedAt: posts.publishedAt,
            feedName: feeds.name,
        })
        .from(posts)
        .innerJoin(feedFollows, eq(posts.feedId, feedFollows.feedId))
        .innerJoin(feeds, eq(posts.feedId, feeds.id))
        .where(eq(feedFollows.userId, userId))
        .orderBy(desc(posts.publishedAt))
        .limit(limit);

    return userPosts;
}
