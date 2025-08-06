import { getPostsForUser } from "./lib/db/queries/posts";
import { User } from "./middle_ware_login";

type PostWithFeedName = {
    postTitle: string | null;
    postUrl: string;
    postDescription: string | null;
    postPublishedAt: Date;
    feedName: string;
};

function printPost(post: PostWithFeedName) {
    console.log("--- POST ---");
    console.log(`Title: ${post.postTitle}`);
    console.log(`URL: ${post.postUrl}`);
    console.log(`Feed: ${post.feedName}`);
    console.log(`Published: ${post.postPublishedAt.toUTCString()}`);
    console.log(`Description: ${post.postDescription}`);
    console.log("------------");
}

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]) {
    let limit = 2;
    if (args.length > 0) {
        const parsedLimit = parseInt(args[0], 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
            limit = parsedLimit;
        }
    }

    const posts = await getPostsForUser(user.id, limit);

    if (posts.length === 0) {
        console.log(`No posts for user ${user.name}. Try following some feeds!`);
        return;
    }

    console.log(`Latest ${posts.length} posts for ${user.name}:`);
    for (const post of posts) {
        printPost(post);
    }
}
