import { CommandHandler } from "./registry";
import { readConfig } from "./config"; 
import { getUser } from "./lib/db/queries/users";       
import { exit } from "node:process"

export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
}

type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export const middlewareLoggedIn = (handler: UserCommandHandler): CommandHandler => {
  return async (cmdName: string, ...args: string[]) => {
    const currentUserName = readConfig().currentUserName;
    const user = await getUser(currentUserName);
    if (!user) {
      console.log(`User ${currentUserName} not found`);
      exit(1)
    }
    await handler(cmdName, user, ...args);
  }                                                                                          
} 