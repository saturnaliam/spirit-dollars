import { CommandInteraction, REST, Routes } from "npm:discord.js";
import ping from "./commands/ping.ts";

const commands = [
    ping
]

export async function register() {
    const rest = new REST({ version: '10' }).setToken(Deno.env.get("TOKEN") || "");

    try {
        await rest.put(Routes.applicationCommands("1272283592831012936"), { body: commands.map((command) => command.command) });
    } catch(error) {
        console.error(error);
    }
}

export function handle(interaction: CommandInteraction) {
    commands.forEach((command) => {
        if (interaction.commandName == command.command.name) {
            command.run(interaction);
        }
    });
}