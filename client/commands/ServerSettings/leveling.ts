import { ApplicationCommandInteraction, ApplicationCommandOptionType, User } from "harmony/mod.ts";
import { VortexCommand } from "../../lib/Command.ts";
import { GuildTable, UserTable } from "../../lib/Database.ts";
import { CurrencyName } from "../../lib/Language.ts";

export default class LevelingCommand extends VortexCommand {
    initialize(): void {
        this.config = {
            name: "leveling",
            description: "Enable or Disable the level system",
            options: [
                {
                    name: "choice",
                    required: true,
                    choices: [
                        {
                            name: "Enabled",
                            value: "enabled"
                        },
                        {
                            name: "Disabled",
                            value: "disabled",
                        }
                    ],
                    description: "Enable or Disable",
                    type: ApplicationCommandOptionType.STRING
                }
            ]
        }
    }

    async exec(ctx: ApplicationCommandInteraction): Promise<void> {
        const enabled = (ctx.option("choice") as string) === "enabled";

        const guildData = await GuildTable.findOne({guild_id: ctx.guild.id});
        if(!guildData) return;

        guildData.set("settings.economy.experience.enabled", enabled);
        await guildData.save();

        ctx.reply("Settings have been updated!");
	}
}