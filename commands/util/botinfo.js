
const { CommandType } = require("wokcommands")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

module.exports = {

    description: "View the bot info!",
  
    type: CommandType.SLASH,
    testOnly: true,
    callback: async({ client, interaction }) => {
        var totalSeconds = client.uptime / 1000
        const days = Math.floor(totalSeconds / 86400)
        totalSeconds %= 86400
        const hours = Math.floor(totalSeconds/ 3600)
        totalSeconds %= 3600
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = Math.floor(totalSeconds % 60)

        var uptime = `${days}D ${hours}H ${minutes}M ${seconds}S`

        var ping =`${Date.now() - interaction.createdTimestamp}ms`
        var apiPing = client.ws.ping

        const e = new EmbedBuilder()
        .setTitle(config.embeds.botInfo.title)
        .addFields({name: 'Uptime', value: `${uptime}`, inline: false})
        .addFields({name: 'Latency', value: `${ping}`, inline: true})
        .addFields({name: 'API ping', value: `${apiPing}`, inline: true})
        .setColor(config.embeds.botInfo.color)

        interaction.reply({embeds:[e]})
    },
}
