
const { CommandType } = require("wokcommands")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

const types = require("../../types")

module.exports = {

    description: "Ask the magic 8ball a question!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    options: [
        {
            name: "question",
            description: "The question that you would like to ask the 8ball!",
            type: types.string,
            required: true
        }
    ],
    
  
    callback: ({ client, interaction }) => {
        const answers = config["8ball"] //js is odd
        let ans = (Math.floor(Math.random() * Math.floor(answers.length)));
        const e = new EmbedBuilder()
        .setTitle(ans)
        .setColor(config.embeds["8ball"].color) //StrangeScript

        interaction.reply({embeds:[e]})
    },
}