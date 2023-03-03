const { CommandType } = require("wokcommands")
const { PermissionFlagsBits, EmbedBuilder, Embed } = require("discord.js");
const config = require("../../config.json")

module.exports = {

  description: "Change the slowmode of a channel.",

  type: CommandType.SLASH,
  testOnly: true,
  
  options: [
    {
        name: 'time',
        description: 'The amount of time in seconds that the slowmode should be changed to.',
        required: true,
        type: 4
    },
    {
        name: 'channel',
        description: 'The channel to change the slowmode of (default: current).',
        required: false,
        type: 7 
    }
  ],
  

  callback: ({ client, interaction }) => {
    const time = interaction.options.getInteger("time")
    const u = interaction.member
    if(!u.roles.cache.has(config.IDs.roles.moderator)) {
        const rolesErr = new EmbedBuilder()
        .setTitle(config.embeds.fail.title)
        .setDescription("You do not have the required roles to run this command - You need the **moderator** role.")
        .setColor(config.embeds.fail.color)

        interaction.reply({embeds:[rolesErr]})
    } else {
        if(time < 0 || time > 21600) {
            const timeErr = new EmbedBuilder()
            .setTitle(config.embeds.fail.title)
            .setDescription("The time you specified is invalid! Time must be more than 0 seconds and less than 21600.")
            .setColor(config.embeds.fail.color)

            interaction.reply({embeds:[timeErr]})
        } else {
            const ch = interaction.options.getChannel("channel") || interaction.channel 
            ch.setRateLimitPerUser(time, `Ordered by ${interaction.user.tag}.`)

            const succ = new EmbedBuilder()
            .setTitle("Succesfully changed slowmode!")
            .setColor(config.embeds.success.color)

            interaction.reply({embeds:[succ]})
        }
    }

    

    
  },
};