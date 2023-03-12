const config = require("../../../config.json")
const DB = require("../../../db/SuggestSchema")
const { EmbedBuilder } = require("discord.js")
module.exports = async(interaction, instance) => {
    if(!interaction.member.roles.cache.has(config.IDs.roles.manager)) {
        const rolesErr = new EmbedBuilder()
        .setTitle(config.embeds.fail.title)
        .setDescription("You do not have the required roles to run this command - You need the **manager** role.")
        .setColor(config.embeds.fail.color)
    
        interaction.reply({embeds:[rolesErr], ephemeral: true})
    } else {
        const { message } = interaction;
        DB.findOne({GuildID: interaction.guild.id, MessageID: message.id}, async(err,data) => {
            if(err) throw err;
            if(!data) return({content: "DB error - no data found (report to Deveroonie)", ephemeral: true});

            const e = message.embeds[0]
            if(!e) return;
            switch(interaction.customId) {
                case "accept-sug": {
                    const emb = EmbedBuilder.from(e).setColor(config.embeds.suggestions.colors.accepted).addFields({name: "Status", value: "Accepted", inline: true}).setTitle("Suggestion Accepted")
                    emb.spliceFields(0, 1);
                    message.edit({embeds:[emb], components: []})
                    interaction.reply({content: "done!", ephemeral: true})
                    break;
                }
                case "deny-sug": {
                    const emb = EmbedBuilder.from(e).setColor(config.embeds.suggestions.colors.rejected).addFields({name: "Status", value: "Denied", inline: true}).setTitle("Suggestion Denied")
                    emb.spliceFields(0, 1);
                    message.edit({embeds:[emb], components: []})
                    interaction.reply({content: "done!", ephemeral: true})
                    break;
                }
            }
        })
    }
}