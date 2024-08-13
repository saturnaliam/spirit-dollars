import { CommandInteraction } from "npm:discord.js";
import Command from "./command.ts";

const ping = new Command("ping", "says pong");

ping.run = async (interaction: CommandInteraction) => {
    await interaction.reply("pong!");
}

export default ping;