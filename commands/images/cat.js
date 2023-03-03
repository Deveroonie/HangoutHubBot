
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

module.exports = {

    description: "Get a random cat picture!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        get("https://some-random-api.ml/animal/cat").then(function (response) {
            const e = new EmbedBuilder()
            .setTitle("Your cat picture!")
            .setImage(response.data.image)
            .setColor(config.embeds.animal.color)

            interaction.reply({embeds: [e]})
        })
    },
}