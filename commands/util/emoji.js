
const { CommandType } = require("wokcommands")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

const axios = require("axios")

const types = require("../../types")

module.exports = {

    description: "Make an emoji larger!",
  
    type: CommandType.SLASH,
    testOnly: true,
    options: [
        {
            name: "emoji",
            description: "The emoji you would like to make bigger",
            type: types.string,
            required: true
        }
    ],
    callback: async({ client, interaction }) => {
        var emoji = interaction.options.getString("emoji")?.trim()
        if(emoji.startsWith("<") && emoji.endsWith(">")) {
            const id = emoji.match(/\d{15,}/g)[0];
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`).then((image) => {
            if(image) return "gif"
            else return "png"
            }).catch(err => {
                return "png"
            })

            const emojiURL = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
            const e = new EmbedBuilder()
            .setImage(emojiURL)
            .setColor(config.embeds.enlarge.color)

            interaction.reply({embeds:[e]})
        } else {
            const fail = new EmbedBuilder()
                .setTitle(config.embeds.fail.title)
                .setDescription("Unable to enlarge default emojis.")
                .setColor(config.embeds.fail.color)

                return interaction.reply({embeds:[fail]})
        }
    },
}
