import { XMLParser } from 'fast-xml-parser';

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

/**
 * Fetches a feed from the given URL, parses the XML, and returns a structured RSSFeed object.
 *
 * @param feedURL The URL of the RSS feed to fetch.
 * @returns A Promise that resolves to a filled-out RSSFeed object.
 * @throws An error if the network request fails, the XML is invalid, or the feed structure is missing required fields.
 */
export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  // 1. Fetch the feed data
  const response = await fetch(feedURL, {
    headers: {
      'User-Agent': 'gator', // Identify our client
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`);
  }

  const xmlText = await response.text();

  // 2. Parse the XML
  const parser = new XMLParser();
  const parsedXml = parser.parse(xmlText);

  // 3. Extract the channel field
  const channel = parsedXml?.rss?.channel;
  if (!channel) {
    throw new Error('Invalid RSS feed: "channel" field not found.');
  }

  // 4. Extract metadata
  const { title, link, description } = channel;
  if (!title || !link || !description) {
    throw new Error('Invalid RSS feed: missing channel metadata (title, link, or description).');
  }

  // 5. Extract feed items
  // Per instructions, if `channel.item` is not an array, we default to an empty array.
  const rawItems = Array.isArray(channel.item) ? channel.item : [];

  const items: RSSItem[] = [];
  for (const item of rawItems) {
    // 6. For each item: Extract and validate fields
    // Skip any item that has missing or invalid fields.
    if (item && item.title && item.link && item.description && item.pubDate) {
      items.push({
        title: String(item.title),
        link: String(item.link),
        description: String(item.description),
        pubDate: String(item.pubDate),
      });
    }
  }

  // 7. Assemble the result
  const feed: RSSFeed = {
    channel: {
        title: String(title),
        link: String(link),
        description: String(description),
        item: items,
    }
    
  };

  return feed;
}