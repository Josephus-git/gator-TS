import fs from "fs";
import os from "os";
import path from "path";
import { exit } from "process";
import { getUser} from "./lib/db/queries/users.js"


type Config = {
    currentUserName: string;
    dbUrl: string;
}

export function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    const configPath = getConfigFilePath();
    // The JSON file uses snake_case keys, so we convert here.
    const configForJson = {
        dbUrl: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    };
    const data = JSON.stringify(configForJson, null, 2);
    fs.writeFileSync(configPath, data);
}

export async function setUser(username: string) {
    const user = await getUser(username)
    if (!user) {
        console.log(`user ${username} does not exits`)
        exit(1)
    }
    const config = readConfig();
    config.currentUserName = username;
    writeConfig(config);
}

function validateConfig(rawConfig: any): Config {
    if (typeof rawConfig !== 'object' || rawConfig === null) {
        throw new Error("Invalid config file: content is not an object.");
    }

    if (typeof rawConfig.current_user_name !== 'string') {
        throw new Error("Invalid config file: 'current_user_name' must be a string.");
    }

    // Convert snake_case from JSON to camelCase for our Config type
    return {
        currentUserName: rawConfig.current_user_name,
        dbUrl: rawConfig.dbUrl
    };
}

export function readConfig(): Config {
    const configPath = getConfigFilePath();
    try {
        const fileContent = fs.readFileSync(configPath, "utf-8");
        const rawConfig = JSON.parse(fileContent);
        return validateConfig(rawConfig);
    } catch (error: any) {
        // If the file doesn't exist, we can treat it as a config with no user set.
        if (error.code === 'ENOENT') {
            return { currentUserName: "", dbUrl: ""
            };
        }
        // For other errors (e.g., JSON parsing, validation), re-throw them.
        throw error;
    }
}