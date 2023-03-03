
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

module.exports = {

    description: "Get a random fox picture!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        get("https://some-random-api.ml/animal/fox").then(function (response) {
            const e = new EmbedBuilder()
            .setTitle("Your fox picture!")
            .setImage(response.data.image)
            .setColor(config.embeds.animal.color)

            interaction.reply({embeds: [e]})
        })
    },
}