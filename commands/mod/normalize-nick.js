const { weirdToNormalChars } = require('weird-to-normal-chars');
const { CommandType } = require("wokcommands")
const { PermissionFlagsBits, EmbedBuilder, Embed } = require("discord.js");
const config = require("../../config.json")

module.exports = {

    description: "Remove wierd characters in someone's nickname.",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    options: [
      {
          name: 'user',
          description: 'The user who\'s nickname you would like to normalize.',
          required: true,
          type: 6
      }
    ],
    
  
    callback: ({ client, interaction }) => {
        const u = interaction.member
        const usr = interaction.options.getMember("user")
    if(!u.roles.cache.has(config.IDs.roles.helper)) {
        const rolesErr = new EmbedBuilder()
        .setTitle(config.embeds.fail.title)
        .setDescription("You do not have the required roles to run this command - You need the **helper** role.")
        .setColor(config.embeds.fail.color)

        interaction.reply({embeds:[rolesErr]})
    } else {
        const newnick = weirdToNormalChars(usr.displayName)
        usr.setNickname(newnick, `Ordered by ${interaction.user.tag}. | Normalize nickname`)
        const succ = new EmbedBuilder()
            .setTitle("Succesfully changed user nickname!")
            .setColor(config.embeds.success.color)

            interaction.reply({embeds:[succ]})
    }
    },
}