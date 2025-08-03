import { readConfig, setUser } from "./config.js";

function main() {
    setUser("Josephus")
    const currentConfig = readConfig()
    console.log(currentConfig)
}

main();