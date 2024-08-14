import { Command } from "./command.ts";
import { User } from "../model.ts";
import { CommandInteraction, SlashCommandBuilder } from "npm:discord.js";

const data = new SlashCommandBuilder()
    .setName("balance")
    .setDescription("gets your balance");
    
export const balance = new Command(data);

balance.run = async (interaction: CommandInteraction) => {
    const kv = await Deno.openKv("db/spirit.db");

    const key = ["users", interaction.user.id];

    const res = await kv.get(key);

    const balance = (res.value == null) ? 0 : (res.value as User).balance;

    await interaction.reply(`You have ${balance} spirit dollars!`);
}