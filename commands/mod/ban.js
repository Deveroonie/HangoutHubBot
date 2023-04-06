const { CommandType } = require("wokcommands")
const { PermissionFlagsBits, EmbedBuilder, Embed, userMention } = require("discord.js");
const config = require("../../config.json")

module.exports = {

    description: "Ban someone from the server.",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    options: [
      {
          name: 'user',
          description: 'The user who you want to ban.',
          required: true,
          type: 6
      },
      {
        name: 'reason',
        description: 'The reason you are banning the user',
        required: true,
        type: 3
      }
    ],
    
  
    callback: ({ client, interaction }) => {
    const u = interaction.member
    const us = interaction.user
    const usrnm = interaction.options.getUser("user")
    const usr = interaction.options.getMember("user")
    const reason = interaction.options.getString("reason")
if(!u.roles.cache.has(config.IDs.roles.administrator)) {
    const rolesErr = new EmbedBuilder()
    .setTitle(config.embeds.fail.title)
    .setDescription("You do not have the required roles to run this command - You need the **administrator** role.")
    .setColor(config.embeds.fail.color)

    interaction.reply({embeds:[rolesErr]})
} else {
   if(!usr.bannable) {
    const notBannable = new EmbedBuilder()
    .setTitle(config.embeds.fail.title)
    .setDescription("I cannot ban this user.")
    .setColor(config.embeds.fail.color)

    interaction.reply({embeds:[notBannable]})
   } else {
    if(config.IDs.ownerIds.includes(usr.id)) {
        const cbo = new EmbedBuilder()
        .setTitle(config.embeds.fail.title)
        .setDescription("You cannot ban a server owner.")
        .setColor(config.embeds.fail.color)

        interaction.reply({embeds:[cbo]})
    } else {
        if(usr.id == config.IDs.me) {
        const cbm = new EmbedBuilder()
        .setTitle(config.embeds.fail.title)
        .setDescription("You cannot ban me.")
        .setColor(config.embeds.fail.color)

        interaction.reply({embeds:[cbm]})
        } else if(usr.id == interaction.id) {
            const cby = new EmbedBuilder()
        .setTitle(config.embeds.fail.title)
        .setDescription("You cannot ban yourself.")
        .setColor(config.embeds.fail.color)

        interaction.reply({embeds:[cby]})
        } else {
            usr.ban({ deleteMessageSeconds: 60 * 60 * 24, reason: `Ordered by ${interaction.user.tag} - ${reason}.` })

            const succ = new EmbedBuilder()
        .setTitle("Succesfully banned user!")
        .setColor(config.embeds.success.color)

        interaction.reply({embeds:[succ]})

        try {
            const dm = new EmbedBuilder()
            .setTitle(config.embeds.ban.title)
            .setDescription(`Sorry, but you have been banned from Hangout Hub.\n\nReason: ${reason}\nYou where banned by: ${us.tag}`)
            .setColor(config.embeds.ban.color)
            usrnm.send({embeds:{dm}})

            const log = new EmbedBuilder()
            .setTitle(config.embeds.logs.ban)
            .setDescription(`Banned by: ${interaction.author.tag} <@${interaction.user.id}>\nUser banned: ${usrnm.tag} <@${usrnm.id}>\nReason: ${reason}`)
            .setColor(config.embeds.logs.color)
            client.channels.cache.get(config.IDs.channels.logs).send({embeds: [log]});
        } catch(err) {
          console.log("Failed to DM user.")
        }
        }
    }
   }
}
    },
}