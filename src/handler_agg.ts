import { fetchFeed } from "./fetchFeed";
import { exit } from "node:process"

export async function handlerAgg(cmdName: string, ...args: string[]) {
    /*if (args.length === 0) {
        console.log(`usage: ${cmdName} <feedUrl>`);
        exit(1)
    }
    const feedUrl = args[0]*/
    const feedUrl = "https://www.wagslane.dev/index.xml"
    const feed = await fetchFeed(feedUrl)
    console.log(feed.channel.title);
    console.log(feed.channel.link);
    console.log(feed.channel.description);
    for (let obj of feed.channel.item) {
        console.log(obj)
    }
}