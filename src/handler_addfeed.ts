import { addFeed } from "./lib/db/queries/feeds";
import { exit } from "node:process";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";
import { feeds, users } from "./lib/db/schema";
import { InferSelectModel } from "drizzle-orm";

type User = InferSelectModel<typeof users>;
type Feed = InferSelectModel<typeof feeds>;

function printFeed(feed: Feed, user: User) {
  console.log("--- FEED ---");
  console.log(`Feed ID: ${feed.id}`);
  console.log(`Feed Name: ${feed.name}`);
  console.log(`Feed URL: ${feed.url}`);
  console.log(`Created At: ${feed.createdAt}`);
  console.log(`Updated At: ${feed.updatedAt}`);
  console.log("--- USER ---");
  console.log(`User ID: ${user.id}`);
  console.log(`User Name: ${user.name}`);
  console.log(`User Created At: ${user.createdAt}`);
  console.log(`User Updated At: ${user.updatedAt}`);
  console.log("------------");
}

export async function handlerCreateFeed(cmdName: string, ...args: string[]) {
    const cfg = readConfig()
    const user = await getUser(cfg.currentUserName)

    if (args.length < 2 ) {
        console.log(`usage: ${cmdName} <feed name> <feedUrl>`)
        exit(1)
    }
    const name = args[0];
    const url = args[1];
    try {
        const createdFeed = await addFeed(name, url, user.id);
        printFeed(createdFeed, user);
    } catch (error) {
        console.log(`feed: ${name} already exist`)
        exit(1)
    } 
}