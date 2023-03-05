
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

module.exports = {

    description: "Get a random joke!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        get("https://official-joke-api.appspot.com/random_joke").then(function (response) {
            const e = new EmbedBuilder()
            .setTitle("Your joke!")
            .setDescription(`${response.data.setup}\n||${response.data.punchline}||`)
            .setColor(config.embeds.joke.color)

            interaction.reply({embeds: [e]})
        })
    },
}