const { ChannelType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js")
const config = require("../../../config.json")

module.exports = async(interaction, instance) => {
    const i = interaction;
    const ticketDb = require("../../../db/TicketsSchema")
    if(!["report", "gwc", "other"].includes(i.customId)) return;
  
    const tId = Math.floor(Math.random() * 9000 + 1000) 
  
    await i.guild.channels.create({
      name: `${i.customId}-${tId}`,
      type: ChannelType.GuildText, 
      parent: config.IDs.channels.tickets.category,
      permissionOverwrites: [
        {
          id: i.user.id,
          allow: ["SendMessages", "ViewChannel", "ReadMessageHistory"]
        },
        {
          id: config.IDs.roles.everyone,
          deny: ["SendMessages", "ViewChannel", "ReadMessageHistory"]
        },
        {
          id: config.IDs.roles.ticketaccess,
          allow: ["SendMessages", "ViewChannel", "ReadMessageHistory"]
        }
      ]
    }).then(async(channel) => {
      await ticketDb.create({
        GuildID: config.IDs.serverId,
        MemberID: i.user.id,
        TicketID: tId,
        ChannelID: channel.id,
        Closed: false,
        Locked: false,
        type: i.customId
      })
  
      const tEmb = new EmbedBuilder()
      .setTitle("Ticket created!")
      .setDescription("Please wait while a staff member comes to assist you!\n\nPlease refrain from pinging staff unless your ticket was opened over 24 hours ago, and you still haven't recieved a reply.")
      .setColor("Green");
  
  
  
      const tRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
              .setCustomId('close')
              .setLabel('Close ticket')
              .setStyle(ButtonStyle.Danger),
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId('lock')
            .setLabel('Lock ticket')
            .setStyle(ButtonStyle.Danger),
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId('unlock')
          .setLabel('Unlock ticket')
          .setStyle(ButtonStyle.Success),
    )
  
    channel.send({embeds: [tEmb], components: [tRow]})
    channel.send(`<@${i.user.id}>\nWhile you wait for a reply, please explain your issue in as much detail as possible!`)
    i.reply({content: `<#${channel.id}>`, ephemeral: true})
    })
}
