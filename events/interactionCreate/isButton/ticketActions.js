const { EmbedBuilder, AttachmentBuilder } = require("discord.js")
const ticketDb = require("../../../db/TicketsSchema")
const { createTranscript } = require("discord-html-transcripts")
const config = require("../../../config.json")
module.exports = async(interaction, instance) => {
    const i = interaction;
  if(!["close","lock","unlock"].includes(i.customId)) return;

  ticketDb.findOne({ChannelID: i.channel.id}, async(err,data) => {
    if(err) throw err;
    if(!data) i.reply(":warning: No data found (ghost ticket). Report this to Deveroonie.")
    switch(i.customId) {
      case "lock": {
        if(data.Locked == true) return i.reply("The ticket is alredy locked.")
        await ticketDb.updateOne({ChannelID: i.channel.id}, {Locked: true})
        i.channel.permissionOverwrites.create(data.MemberID, {
          "SendMessages": false,
          "ViewChannel": true
        })
        return interaction.reply("This ticket has been locked. Only administrators can unlock it.")
      }
      case "unlock": {
        if(!i.member.roles.cache.has(config.IDs.roles.administrator)) {
          const rolesErr = new EmbedBuilder()
          .setTitle(config.embeds.fail.title)
          .setDescription("You do not have the required roles to run this command - You need the **administrator** role.")
          .setColor(config.embeds.fail.color)
      
          return interaction.reply({embeds:[rolesErr]});
      }

      if(data.Locked == false) return i.reply("The ticket is alredy unlocked.")
        await ticketDb.updateOne({ChannelID: i.channel.id}, {Locked: false})
        i.channel.permissionOverwrites.create(data.MemberID, {
          "SendMessages": true,
          "ViewChannel": true
        })
        return interaction.reply("This ticket has been unlocked.")    
}
        case "close": {
            if(data.Closed == true) return i.reply("This ticket has already been closed. Please wait for the transcript to save and for this channel to be deleted.")
            const file = await createTranscript(i.channel, {
                limit: -1,
                returnBuffer: false,
                filename: `${i.channel.name}.html`
            })
            await ticketDb.updateOne({ChannelID: i.channel.id}, {Closed:true})

            await i.guild.channels.cache.get(config.IDs.channels.tickets.transcripts).send({content: `${i.channel.name} was closed - transcript is attached.`, files: [file]})
            i.reply("Ticket closed! Please wait for the channel to be deleted...")
            i.channel.delete()
        }
    }
})
}
