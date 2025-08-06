import { fetchFeed } from "./fetchFeed";
import { exit } from "node:process";
import { getNextFeedToFetch, markFeedFetched } from "./lib/db/queries/feeds";


async function scrapeFeeds() {
  const nextFeed = await getNextFeedToFetch();
  if (!nextFeed) {
    console.log("No feeds to fetch at the moment.");
    return;
  }

  await markFeedFetched(nextFeed.id);

  try {
    const rssFeed = await fetchFeed(nextFeed.url);
    for (const item of rssFeed.channel.item) {
      console.log(`- ${item.title}`);
      // In a real application, you would save the post to your database here.
    }
    console.log(" ---- done ----\n")
  } catch (err) {
    console.error(`Failed to fetch or process feed ${nextFeed.url}:`, err);
  }
}

function parseDuration(durationStr: string): number {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);
  if (!match) {
    return NaN;
  }
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "ms": return value;
    case "s": return value * 1000;
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    default: return NaN;
  }
}

function formatDuration(ms: number): string {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);

    if (h > 0) return `${h}h${m % 60}m${s % 60}s`;
    if (m > 0) return `${m}m${s % 60}s`;
    if (s > 0) return `${s}s`;
    return `${ms}ms`;
}

export async function handlerAgg(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    console.error(`usage: ${cmdName} <time_between_reqs>`);
    console.error('Example: "1m" for one minute, "30s" for 30 seconds');
    exit(1);
  }
  const timeBetweenRequests = parseDuration(args[0]);
  if (isNaN(timeBetweenRequests)) {
    console.error(`Invalid duration format: ${args[0]}`);
    exit(1);
  }

  console.log(`Collecting feeds every ${formatDuration(timeBetweenRequests)}`);

  const handleError = (err: unknown) => console.error("Scraping loop error:", err);

  scrapeFeeds().catch(handleError);
  const interval = setInterval(() => scrapeFeeds().catch(handleError), timeBetweenRequests);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("\nShutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}
