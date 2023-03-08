
const { CommandType } = require("wokcommands")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

const DB = require("../../db/AFKSchema")

const types = require("../../types")

module.exports = {

    description: "Let everyone know that you are AFK.",
  
    type: CommandType.SLASH,
    testOnly: true,
    options: [
        {
            name: "status",
            description: "The message that you would like to display when someone pings you.",
            type: types.string,
            required: true
        }
    ],
    callback: async({ client, interaction }) => {
        const status = interaction.options.getString("status")
        try {
            await DB.findOneAndUpdate({GuildID: interaction.guild.id, UserID: interaction.user.id}, 
            {Status: status, Time: parseInt(interaction.createdTimestamp / 1000)}, {new: true, upsert: true})
            
            const e = new EmbedBuilder()
            .setTitle(config.embeds.afk.set.title)
            .setColor(config.embeds.success.color)
            
            interaction.reply({embeds:[e]})
        } catch(err) {
            console.log(err)
        }

    },
}
