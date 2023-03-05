
const { CommandType } = require("wokcommands")

const config = require("../../config.json")

const { EmbedBuilder, AttachmentBuilder } = require("discord.js")

module.exports = {

    description: "Get yours or another user's rank",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    options: [
        {
            name: 'user',
            description: 'The user who\'s rank you would like to see (default: you)',
            required: false,
            type: 6
        }
      ],
    
  
    callback: async({ client, interaction }) => {

        const Levels = client.levels
        const canvacord = require('canvacord');

const target = interaction.options.getUser("user") || interaction.user; // Grab the target.

    const user = await Levels.fetch(target.id, interaction.guild.id, true); // Selects the target from the database.
    
    const rank = new canvacord.Rank() // Build the Rank Card
        .setAvatar(target.displayAvatarURL({format: 'png', size: 512}))
        .setCurrentXP(user.xp) // Current User Xp
        .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
        .setRank(user.position) // Position of the user on the leaderboard
        .setLevel(user.level) // Current Level of the user
        .setProgressBar(config.xp.rankCommandBarColor)
        .setUsername(target.username)
        .setDiscriminator(target.discriminator);

    rank.build()
        .then(data => {
        const attachment = new AttachmentBuilder(data, { name: 'image.png' });
        interaction.reply({ files: [attachment]});
    });
    },
}