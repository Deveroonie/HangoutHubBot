const { Client, IntentsBitField, Partials, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
require("dotenv/config");
const WOK = require("wokcommands");
const path = require("path");
const config = require("./config.json")
const talkedRecently = new Set();
const client = new Client({
  intents: 32767,
});

const Levels = require("discord-xp");
Levels.setURL(process.env.MONGO_URL);

client.on("ready", () => {
  new WOK({
    client,
    commandsDir: path.join(__dirname, "commands"),
    disabledDefaultCommands: [
      WOK.DefaultCommands.ChannelCommand,
      WOK.DefaultCommands.CustomCommand,
      WOK.DefaultCommands.Prefix,
      WOK.DefaultCommands.RequiredPermissions,
      WOK.DefaultCommands.RequiredRoles,
      WOK.DefaultCommands.ToggleCommand
    ],
    testServers: config.IDs.serverId,
  });
  client.user.setActivity('Deveroonie code me', { type: ActivityType.Watching });
});

client.levels = Levels;

client.on("interactionCreate", i => {
  if(!i.isButton()) return;
  if(!i.customId == "verif") {
    i.member.roles.add(config.IDs.roles.verified)
    i.member.roles.remove(config.IDs.roles.unverified)
  }
})

client.on("guildMemberAdd", mem => {
  mem.roles.add(config.IDs.roles.unverified)
})

client.on("messageCreate", async m => {
  if(m.content == "vfm") {
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('verif')
					.setLabel('Verify!')
					.setStyle(ButtonStyle.Success),
			);
      m.channel.send({content: "Click to verify", components: [row]})
  } else {
    
    if(config.IDs.channels.xpAllowed.includes(m.channelId)) {
      if (!m.guild) return;
      if (m.author.bot) return;
      if (talkedRecently.has(m.author.id)) { return; } else {
      const randomAmountOfXp = Math.floor(Math.random() * config.xp.maxXpPerMessage) + config.xp.minXpPermMessage; // Min 1, Max 10
      const hasLeveledUp = await Levels.appendXp(m.author.id, m.guild.id, randomAmountOfXp);
      if (hasLeveledUp) {
        const user = await Levels.fetch(m.author.id, m.guild.id);
        m.channel.send({ content: `${m.author}, congratulations! You have leveled up to **${user.level}**. :tada:` });
      }

      talkedRecently.add(m.author.id);

      
  }
  
        setTimeout(() => {
          talkedRecently.delete(m.author.id);
        }, 30000);
    }
  }

})


client.login(process.env.TOKEN);