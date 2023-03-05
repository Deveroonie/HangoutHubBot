
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

module.exports = {

    description: "Get a random dadjoke!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        get("https://official-joke-api.appspot.com/jokes/dad/random").then(function (response) {
            const e = new EmbedBuilder()
            .setTitle("Your dadjoke!")
            .setDescription(`${response.data[0].setup}\n||${response.data[0].punchline}||`)
            .setColor(config.embeds.joke.color)

            interaction.reply({embeds: [e]})
        })
    },
}