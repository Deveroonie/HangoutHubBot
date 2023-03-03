
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

module.exports = {

    description: "Get a random picture of Deveroonie's cat, Woody!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        get("https://woody.hplug.xyz/api/getrandom").then(function (response) {
            const e = new EmbedBuilder()
            .setTitle("Your Woody picture!")
            .setImage(response.data.link)
            .setColor(config.embeds.animal.color)

            interaction.reply({embeds: [e]})
        })
    },
}