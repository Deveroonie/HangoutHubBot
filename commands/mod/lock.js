const { CommandType } = require("wokcommands")
const { PermissionFlagsBits, EmbedBuilder, Embed, userMention } = require("discord.js");
const config = require("../../config.json")

const types = require("../../types")

module.exports = {

    description: "Lock a channel so nobody can type.",
  
    type: CommandType.SLASH,
    testOnly: true,

    options: [
        {
            name: "channel",
            description: "The channel that you would like to lock (default: current)",
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
                "SendMessages": false
            })
            ch.permissionOverwrites.create(config.IDs.roles.moderator, {
                "SendMessages": true
            })
            const rep = new EmbedBuilder()
            .setTitle(config.embeds.lock.succ.title)
            .setColor(config.embeds.success.color)

            interaction.reply({embeds:[rep]})
            const che = new EmbedBuilder()
            .setTitle(config.embeds.lock.channel.title)
            .setColor(config.embeds.fail.color)

            ch.send({embeds:[che]})

        }

    }
   }