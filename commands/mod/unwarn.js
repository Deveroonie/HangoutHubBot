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
            description: "The user that you would like to warn",
            type: types.user,
            required: true
        },
        {
            name: "id",
            description: "The ID of the warning to remove",
            type: types.number,
            required: true
        },
        {
            name: "reason",
            description: "The reason for the warning being removed",
            type: types.string,
            required: true
        }

    ],
    
  
    callback: ({ client, interaction }) => {
        const executor = interaction.user
        const executorMember = interaction.member 
        const target = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason")
        const warnId = interaction.options.getNumber("id") - 1

        if(!executorMember.roles.cache.has(config.IDs.roles.moderator)) {
            const rolesErr = new EmbedBuilder()
            .setTitle(config.embeds.fail.title)
            .setDescription("You do not have the required roles to run this command - You need the **moderator** role.")
            .setColor(config.embeds.fail.color)
        
            interaction.reply({embeds:[rolesErr]})
        } else {
            db.findOne({ GuildID: config.IDs.serverId, UserID: target.user.id, UserTag: target.user.tag }, async(err, data) => {
                if(err) throw err;
                if(data) {
                    data.Content.splice(warnID, 1)

                    const succ = new EmbedBuilder()
                    .setTitle(`Successfully removed ${warnId+1} from ${target.user.tag}`)
                    .setColor(config.embeds.success.color)

                    interaction.reply({embeds:[succ]})
                    data.save()
                } else {
                    const fail = new EmbedBuilder()
                    .setTitle(`Warn ID ${warnId+1} not found for ${target.user.tag}.`)
                    .setColor(config.embeds.fail.color)

                    interaction.reply({embeds:[fail]})
                }
            })
        }
    }
   }