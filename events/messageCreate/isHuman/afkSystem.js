const config = require("../../../config.json")
const DB = require("../../../db/AFKSchema")
const { EmbedBuilder } = require("discord.js")
module.exports = async(message, instance) => {
    await DB.deleteOne({GuildID: message.guild.id, UserID: message.author.id})
    
    if(message.mentions.members.size) {
        message.mentions.members.forEach((m) => {
            DB.findOne({GuildID: message.guild.id, UserID: m.id}, async(err,data) => {
                if(err) throw err;
                if(data) {
                    const e = new EmbedBuilder()
                    .setTitle(`${m.user.tag} is AFK - ${data.Status} (<t:${data.Time}:R> )`)
                    .setColor(config.embeds.afk.userPingedIsAfk.color)

                    message.reply({embeds: [e]})
                }
            })
        })
    }
}