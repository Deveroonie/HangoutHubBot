
const { CommandType } = require("wokcommands")

const config = require("../../config.json")

const { EmbedBuilder } = require("discord.js")

module.exports = {

    description: "See who has the most XP!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: async({ client, interaction }) => {
        const Levels = client.levels
        const user = await Levels.fetch(interaction.user.id, interaction.guild.id, true)
        const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10); 

if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); 

const lb = leaderboard.map(e => `#${e.position} ${e.username}#${e.discriminator} • ${e.level} • ${e.xp.toLocaleString()}XP`); 

const e = new EmbedBuilder()
.setTitle(config.embeds.lb.title)
.setDescription(lb.join("\n"))
.setColor(config.embeds.lb.color)
.setFooter({ text: `Your position: #${user.position}`})
interaction.reply({embeds: [e]})
    },
}