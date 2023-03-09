const { CommandType } = require("wokcommands")
const ms = require("ms")
const config = require("../../../config.json")
const { EmbedBuilder, ChannelType } = require("discord.js")
const types = require("../../../types")
module.exports = {
    description: "Start a giveaway!",
    type: CommandType.SLASH,
    testOnly: true,
    options: [
        {
            name: "duration",
            description: "The length of the giveaway.",
            type: types.string,
            required: true
        },
        {  
            name: "winners",
            description: "The amount of winners the giveaway will have.",
            type: types.integer,
            required: true
        },
        {
            name: "prize",
            description: "The prize of the giveaway",
            type: types.string,
            required: true
        },
        {
            name: "channel",
            description: "The channel to start the giveaway in (default: current)",
            type: types.channel,
            required: false,
            channelTypes: [ChannelType.GuildText]
        }
    ],
    callback: async({ client, interaction }) => {
        const { options } = interaction;
        const confE = config.embeds
        if(!interaction.member.roles.cache.has(config.IDs.roles.startgw)) {
            const rolesErr = new EmbedBuilder()
            .setTitle(config.embeds.fail.title)
            .setDescription("You do not have the required roles to run this command - You need the **Start Giveaway** role.")
            .setColor(config.embeds.fail.color)
        
            interaction.reply({embeds:[rolesErr], ephemeral: true})
       } else {
            const gwChannel = options.getChannel("channel") || interaction.channel
            const duration = options.getString("duration")
            const winnerCount = options.getInteger("winners")
            const prize = options.getString("prize")

            client.gws.start(gwChannel, {
                duration: ms(duration),
                winnerCount,
                prize
                //TODO: Customize Message [Will do later]
            }).then(() => {
                const succ = new EmbedBuilder()
                .setTitle(confE.giveaways.startSucc.title)
                .setColor(confE.success.color)

                interaction.reply({embeds:[succ]})
            }).catch((err) => {
                const fail = new EmbedBuilder()
                .setTitle(confE.fail.title)
                .setColor(confE.fail.color)
                interaction.reply({embeds:[fail]})

                console.log(err)
            })
        }
    },
}