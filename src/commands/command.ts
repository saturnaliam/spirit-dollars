import { CommandInteraction, SharedSlashCommand } from "npm:discord.js";

export class Command {
    public readonly command: SharedSlashCommand;

    public constructor(slash: SharedSlashCommand) {
        this.command = slash;
    }

    public async run(interaction: CommandInteraction) {}
}