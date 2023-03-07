
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

module.exports = {

    description: "Get a random meme!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        get("https://meme-api.com/gimme").then(function (response) {
            const e = new EmbedBuilder()
            .setTitle(response.data.title)
            .setImage(response.data.url)
            .setColor(config.embeds.meme.color)

            interaction.reply({embeds: [e]})
        })
    },
}