const { CommandType } = require("wokcommands")
const { PermissionFlagsBits, EmbedBuilder, Embed, userMention } = require("discord.js");
const config = require("../../../config.json")

const db = require("../../../db/WarningSchema")

const types = require("../../../types")

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
            name: "reason",
            description: "The reason for the warning",
            type: types.string,
            required: true
        }
    ],
    
  
    callback: ({ client, interaction }) => {
        const executor = interaction.user
        const executorMember = interaction.member 
        const target = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason")
        //const targeruser = interaction.options.getUser("user")
        const warnDate = new Date(interaction.createdTimestamp).toLocaleDateString()

        if(!executorMember.roles.cache.has(config.IDs.roles.helper)) {
            const rolesErr = new EmbedBuilder()
            .setTitle(config.embeds.fail.title)
            .setDescription("You do not have the required roles to run this command - You need the **helper** role.")
            .setColor(config.embeds.fail.color)
        
            interaction.reply({embeds:[rolesErr]})
        } else {
            db.findOne({ GuildID: config.IDs.serverId, UserID: target.user.id, UserTag: target.user.tag }, async(err, data) => {
                if(err) throw err;
                if(!data) {
                    data = new db({
                        GuildID: config.IDs.serverId, 
                        UserID: target.user.id, 
                        UserTag: target.user.tag,
                        Content: [
                            {
                            ExecutorID: executor.id,
                            ExecutorTag: executor.tag,
                            Reason: reason,
                            Date: warnDate
                            }
                        ],
                    })
                } else {
                    const obj = {
                        ExecutorID: executor.id,
                        ExecutorTag: executor.tag,
                        Reason: reason,
                        Date: warnDate
                    }
                    data.Content.push(obj)
                }
                data.save()
            })
            const succ = new EmbedBuilder()
        .setTitle("Succesfully warned user!")
        .setColor(config.embeds.success.color)

        interaction.reply({embeds:[succ]})
        }
    }
   }