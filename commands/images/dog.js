
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

module.exports = {

    description: "Get a random dog picture!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        get("https://some-random-api.ml/animal/dog").then(function (response) {
            const e = new EmbedBuilder()
            .setTitle("Your dog picture!")
            .setImage(response.data.image)
            .setColor(config.embeds.animal.color)

            interaction.reply({embeds: [e]})
        })
    },
}