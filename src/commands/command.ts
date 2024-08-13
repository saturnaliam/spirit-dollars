import { CommandInteraction } from "npm:discord.js";

class Command {
    public readonly command: { name: string; description: string; };

    public constructor(name: string, description: string) {
        this.command = { name: name, description: description };
    }

    public async run(interaction: CommandInteraction) {}
}

export default Command;