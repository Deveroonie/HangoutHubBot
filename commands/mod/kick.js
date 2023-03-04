const { CommandType } = require("wokcommands")
const { PermissionFlagsBits, EmbedBuilder, Embed, userMention } = require("discord.js");
const config = require("../../config.json")

module.exports = {

    description: "Kick someone from the server.",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    options: [
      {
          name: 'user',
          description: 'The user who you want to kick.',
          required: true,
          type: 6
      },
      {
        name: 'reason',
        description: 'The reason you are kicking the user',
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
if(!u.roles.cache.has(config.IDs.roles.moderator)) {
    const rolesErr = new EmbedBuilder()
    .setTitle(config.embeds.fail.title)
    .setDescription("You do not have the required roles to run this command - You need the **moderator** role.")
    .setColor(config.embeds.fail.color)

    interaction.reply({embeds:[rolesErr]})
} else {
   if(!usr.kickable) {
    const notKickable = new EmbedBuilder()
    .setTitle(config.embeds.fail.title)
    .setDescription("I cannot kick this user.")
    .setColor(config.embeds.fail.color)

    interaction.reply({embeds:[notKickable]})
   } else {
    if(config.IDs.ownerIds.includes(usr.id)) {
        const cbo = new EmbedBuilder()
        .setTitle(config.embeds.fail.title)
        .setDescription("You cannot kick a server owner.")
        .setColor(config.embeds.fail.color)

        interaction.reply({embeds:[cbo]})
    } else {
        if(usr.id == config.IDs.me) {
        const cbm = new EmbedBuilder()
        .setTitle(config.embeds.fail.title)
        .setDescription("You cannot kick me.")
        .setColor(config.embeds.fail.color)

        interaction.reply({embeds:[cbm]})
        } else if(usr.id == interaction.id) {
            const cby = new EmbedBuilder()
        .setTitle(config.embeds.fail.title)
        .setDescription("You cannot kick yourself.")
        .setColor(config.embeds.fail.color)

        interaction.reply({embeds:[cby]})
        } else {
            usr.kick()

            const succ = new EmbedBuilder()
        .setTitle("Succesfully kicked user!")
        .setColor(config.embeds.success.color)

        interaction.reply({embeds:[succ]})

        try {
            const dm = new EmbedBuilder()
            .setTitle(config.embeds.kick.title)
            .setDescription(`Sorry, but you have been kicked from Hangout Hub.\n\nReason: ${reason}\nYou where kicked by: ${us.tag}`)
            .setColor(config.embeds.kick.color)
            usrnm.send({embeds:{dm}})
        } catch(err) {
          console.log("Failed to DM user.")
        }
        }
    }
   }
}
    },
}