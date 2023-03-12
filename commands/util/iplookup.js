const { CommandType } = require("wokcommands")
const { PermissionFlagsBits, EmbedBuilder, Embed, userMention } = require("discord.js");
const config = require("../../config.json")
const { get } = require("axios")
const types = require("../../types")

module.exports = {

    description: "Lookup information for an IP.",
  
    type: CommandType.SLASH,
    testOnly: true,

    options: [
        {
            name: "ip",
            description: "The IP that you would like to lookup",
            type: types.string,
            required: true
        }
    ],
    
  
    callback: ({ client, interaction }) => {
        const ip = interaction.options.getString("ip")

        get(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,timezone,isp,as,mobile,proxy,hosting,query`).then(function(response) {
            const res = response.data
            if(res.status != "success") {
                var f = "unknown error";
                if(res.message = "invalid query") f = "please provide a valid query"
                const fail = new EmbedBuilder()
                .setTitle(config.embeds.fail.title)
                .setDescription(`An error occoured - ${f}.`)
                .setColor(config.embeds.fail.color)

                interaction.reply({embeds:[fail]})
            } else {
                const e = new EmbedBuilder()
                .setTitle(config.embeds.iplookup.title)
                .addFields({name: "Your Query", value: `${ip}`, inline: false})
                .addFields({name: "Country", value: `${res.country}/${res.countryCode}`, inline: true})
                .addFields({name: "Region", value: `${res.regionName}`, inline: true})
                .addFields({name: "City", value: `${res.city}`, inline: true})
                .addFields({name: "Timezone", value: `${res.timezone}`, inline: true})
                .addFields({name: "ISP", value: `${res.isp}`, inline: true})
                .addFields({name: "ASN", value: `${res.as}`, inline: true})
                .addFields({name: "Mobile", value: `${boolToYesNo(res.mobile)}`, inline: true})
                .addFields({name: "Proxy", value: `${boolToYesNo(res.proxy)}`, inline: true})
                .addFields({name: "Hosting", value: `${boolToYesNo(res.hosting)}`, inline: true})
                .setColor(config.embeds.iplookup.color)

                interaction.reply({embeds:[e]})
            }
        })
    }
   }

   function boolToYesNo(bool) {
    if(bool == true) return "Yes"
    if(bool == false) return "No"
   } 