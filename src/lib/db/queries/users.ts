import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
    const [result] = await db.select().from(users).where(eq(users.name, name));
    return result;
}

export async function reset() {
  await db.delete(users);
  await db.delete(feeds)
  return
}

export async function getUsers() {
  const result = await db.select().from(users);
  return result
}