const { CommandType } = require("wokcommands")
const ms = require("ms")
const config = require("../../../config.json")
const { EmbedBuilder, ChannelType } = require("discord.js")
const types = require("../../../types")
module.exports = {
    description: "Reroll a giveaway!",
    type: CommandType.SLASH,
    testOnly: true,
    options: [
        {
            name: "message_id",
            description: "The ID of the giveaway you would like to reroll",
            type: types.string,
            required: true
        }
    ],
    callback: async({ client, interaction }) => {
        const { options } = interaction;
        const confE = config.embeds
        if(!interaction.member.roles.cache.has(config.IDs.roles.elavatedgw)) {
            const rolesErr = new EmbedBuilder()
            .setTitle(config.embeds.fail.title)
            .setDescription("You do not have the required roles to run this command - You need the **Elavated Giveaway Perms** role.")
            .setColor(config.embeds.fail.color)
        
            interaction.reply({embeds:[rolesErr], ephemeral: true})
       } else {
            const messageid = options.getString("message_id")
            client.gws.reroll(messageid).then(() => {
                const succ = new EmbedBuilder()
                .setTitle(confE.giveaways.rerollSucc.title)
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