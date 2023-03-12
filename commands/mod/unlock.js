const { CommandType } = require("wokcommands")
const { PermissionFlagsBits, EmbedBuilder, Embed, userMention } = require("discord.js");
const config = require("../../config.json")

const types = require("../../types")

module.exports = {

    description: "Unlock a channel so people can type.",
  
    type: CommandType.SLASH,
    testOnly: true,

    options: [
        {
            name: "channel",
            description: "The channel that you would like to unlock (default: current)",
            type: types.channel,
            required: false
        }
    ],
    
  
    callback: ({ client, interaction }) => {
        const ch = interaction.options.getChannel("channel") || interaction.channel
        if(!interaction.member.roles.cache.has(config.IDs.roles.administrator)) {
            const rolesErr = new EmbedBuilder()
            .setTitle(config.embeds.fail.title)
            .setDescription("You do not have the required roles to run this command - You need the **administrator** role.")
            .setColor(config.embeds.fail.color)
        
            interaction.reply({embeds:[rolesErr]})
        } else {
            ch.permissionOverwrites.create(config.IDs.roles.everyone, {
                "SendMessages": true
            })
            ch.permissionOverwrites.create(config.IDs.roles.moderator, {
                "SendMessages": true
            })
            const rep = new EmbedBuilder()
            .setTitle(config.embeds.unlock.succ.title)
            .setColor(config.embeds.success.color)

            interaction.reply({embeds:[rep]})
            const che = new EmbedBuilder()
            .setTitle(config.embeds.unlock.channel.title)
            .setColor(config.embeds.success.color)

            ch.send({embeds:[che]})

        }

    }
   }