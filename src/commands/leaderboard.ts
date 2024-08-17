import { Command } from "./command.ts";
import { User } from "../model.ts";
import { CommandInteraction, SlashCommandBuilder, EmbedBuilder, APIEmbedField } from "npm:discord.js";

const data = new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("returns the top 5 richest people");

export const leaderboard = new Command(data);

leaderboard.run = async (interaction: CommandInteraction) => {
    const kv = await Deno.openKv("db/spirit.db");

    // cant run any array functions on this, so we need to convert it to a regular array
    const usersKv: Deno.KvListIterator<User> = kv.list({ prefix: ["users"] });
    const users: User[] = [];

    for await (const user of usersKv) {
        users.push(user.value);
    }

    users.sort((a, b) => b.balance - a.balance);
    users.splice(5);
    
    const guildUsers = [];

    for (const user of users) {
        const guildUser = await interaction.client.users.fetch(user.id);
        guildUsers.push(guildUser);
    }

    const leaderboardString = (() => {
        let val = ""

        guildUsers.forEach((element, index) => { val += `${index + 1}.) **${element.globalName}** - $${users[index].balance}\n` });

        return val || "No entries yet!";
    })()

    const embed = new EmbedBuilder()
        .addFields({ name: "leaderboard", value: leaderboardString } as APIEmbedField);

    await interaction.reply({ embeds: [ embed ] });
}