import { Command } from "./command.ts";
import { User } from "../model.ts";
import { CommandInteraction } from "npm:discord.js";

export const balance = new Command("balance", "gets the balance of the user");

balance.run = async (interaction: CommandInteraction) => {
    const kv = await Deno.openKv("db/spirit.db");

    const key = ["users", interaction.user.id];

    const res = await kv.get(key);

    const balance = (res.value == null) ? 0 : (res.value as User).balance;

    await interaction.reply(`You have ${balance} spirit dollars!`);
}