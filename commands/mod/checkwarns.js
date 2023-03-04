const { CommandType } = require("wokcommands")
const { PermissionFlagsBits, EmbedBuilder, Embed, userMention } = require("discord.js");
const config = require("../../config.json")

const db = require("../../db/WarningSchema")

const types = require("../../types")

module.exports = {

    description: "Warn a user.",
  
    type: CommandType.SLASH,
    testOnly: true,

    options: [
        {
            name: "user",
            description: "The user that you would like to view the warnings of.",
            type: types.user,
            required: true
        },
        
    ],
    
  
    callback: ({ client, interaction }) => {
        const executor = interaction.user
        const executorMember = interaction.member 
        const target = interaction.options.getMember("user")
        if(!executorMember.roles.cache.has(config.IDs.roles.helper)) {
            const rolesErr = new EmbedBuilder()
            .setTitle(config.embeds.fail.title)
            .setDescription("You do not have the required roles to run this command - You need the **helper** role.")
            .setColor(config.embeds.fail.color)
        
            interaction.reply({embeds:[rolesErr]})
        } else {
            db.findOne({ GuildID: config.IDs.serverId, UserID: target.user.id, UserTag: target.user.tag }, async(err, data) => {
               if(err) throw err;
               if(data){
                const warns = new EmbedBuilder()
                .setTitle(`Warning history for: ${target.user.tag}`)
                .setColor(config.embeds.warningHistory.color)
                .setDescription(`${data.Content.map(
                    (w,i) => `${i + 1}. **${w.Reason}** [By: ${w.ExecutorTag}] | ${w.Date}\n`
                ).join(" ")}`)
                    interaction.reply({embeds: [warns]})

               } else {
                const clean = new EmbedBuilder()
                .setTitle(`Warning history for: ${target.user.tag}`)
                .setColor(config.embeds.warningHistory.color)
                .setDescription(`${target.user.tag} is squeaky clean!`)

                interaction.reply({embeds:[clean]})
               }
            })
        }
    }
   }