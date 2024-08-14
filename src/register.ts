import { CommandInteraction, REST, Routes } from "npm:discord.js";
import ping from "./commands/ping.ts";
import { Logger } from "./logger.ts";

const commands = [
    ping
]

export function register() {
    const rest = new REST({ version: '10' }).setToken(Deno.env.get("TOKEN") || "");

    rest.put(Routes.applicationCommands(Deno.env.get("APPLICATION_ID") || "0"), { body: commands.map((command) => command.command) })
        .catch((error) => {
            Logger.error("REGISTER", error);
            Deno.exit(1);
        });
}

export function handle(interaction: CommandInteraction) {
    commands.forEach((command) => {
        if (interaction.commandName == command.command.name) {
            command.run(interaction);
        }
    });
}