
const { CommandType } = require("wokcommands")


const config = require("../../config.json")

const { EmbedBuilder, Embed } = require("discord.js")

const types = require("../../types")

module.exports = {

    description: "Create a suggestion!",
  
    type: CommandType.SLASH,
    testOnly: true,

    
    options: [
        {
            name: "suggestion",
            description: "The suggestion that you would like to submit",
            type: types.string,
            required: true
        }
    ],
    callback: async({ client, interaction }) => {
        const suggestion = interaction.options.getString("suggestion")

        const channelMessage = new EmbedBuilder()
        .setTitle(config.embeds.suggestions.suggestionsChannel.title)
        .setAuthor({
            "name": interaction.user.tag,
            "iconURL": interaction.user.displayAvatarURL()
        })
        .setDescription(suggestion)
        .setColor(config.embeds.suggestions.suggestionsChannel.color)

        interaction.guild.channels.cache.get(config.IDs.channels.suggestions).send({embeds:[channelMessage]}).then((m) => {
            m.react(config.emoji.suggestions.voteYes)
            m.react(config.emoji.suggestions.voteNo)
        })
        const reply = new EmbedBuilder()
        .setTitle(config.embeds.suggestions.reply.title)
        .setColor(config.embeds.success.color)

        interaction.reply({embeds:[reply]})
    },
}