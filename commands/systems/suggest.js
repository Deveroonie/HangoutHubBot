
const { CommandType } = require("wokcommands")

const config = require("../../config.json")

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

const DB = require("../../db/SuggestSchema")

const types = require("../../types")

module.exports = {

    description: "Create a new suggestion!",
  
    type: CommandType.SLASH,
    testOnly: true,
    options: [
        {
            name: "suggestion",
            description: "The suggestion that you would like to make",
            type: types.string,
            required: true
        }
    ],
    callback: async({ client, interaction }) => {
        const suggestion = interaction.options.getString("suggestion")

        const channelE = new EmbedBuilder()
        .setTitle(config.embeds.suggestions.suggestionsChannel.title)
        .setAuthor({
            "name": interaction.user.tag,
            "iconURL": interaction.user.displayAvatarURL()
        })
        .setDescription(suggestion)
        .setColor(config.embeds.suggestions.suggestionsChannel.color)
        .addFields({name: "Status", value: "Pending", inline: true})

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("Approve")
                .setCustomId("accept-sug")
                .setStyle(ButtonStyle.Success),
            )
            .addComponents(
                new ButtonBuilder()
                .setLabel("Deny")
                .setCustomId("deny-sug")
                .setStyle(ButtonStyle.Danger)
            )

            try {
                interaction.guild.channels.cache.get(config.IDs.channels.suggestions).send({embeds:[channelE], components: [buttons]}).then( async(m) => {
                    await DB.create({GuildID: interaction.guild.id, MessageID: m.id, Details: [
                        {
                            MemberID: interaction.user.id,
                            Suggestion: suggestion
                        }
                    ] })
                })
            } catch (err) { 
                console.log("ERROR!\n" + err)
            }

            interaction.reply("Suggestion submitted!")
    },
}
// << nice 👌