const config = require("../../../config.json")

module.exports = async(interaction, instance) => {
    if(!["captcha-wrong-answer", "captcha-right-answer"].includes(interaction.customId)) return;

    switch(interaction.customId){
        case "captcha-wrong-answer": {
            interaction.update({content: "You incorrectly answered the Captcha. Please try again after **1** minute.", embeds:[], components:[]})
            interaction.member.timeout(1 * 30 * 1000, 'Ordered automaticly - failed captcha.')
            break;
        }
        case "captcha-right-answer": {
            interaction.update({content: "You correctly answered the Captcha.", embeds:[], components:[]})
            interaction.reply({content: "success", ephemeral: true})
            interaction.member.roles.add(config.IDs.roles.verified)
        }
    }
}