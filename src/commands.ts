

type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler;
}


export function runCommand(registry: CommandRegistry, cmdName: string, ...args: string[]) {
    const handler = registry[cmdName];
    if (handler) {
        handler(cmdName, ...args);
    } else {
        console.log(`Command "${cmdName}" not found.`);
    }
}