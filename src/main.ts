import { Client, GatewayIntentBits } from "npm:discord.js";
import { Logger } from "./logger.ts";
import { register, handle } from "./register.ts";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    const tag = client.user?.username || "UNKNOWN";
    Logger.log("CLIENT", `Logged in as ${tag}!`);
    register();
})


client.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand()) return;

    handle(interaction);
})

client.login(Deno.env.get("TOKEN"))
    .catch((error) => { Logger.error("CLIENT", error.code); });