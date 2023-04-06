const { Client, ActivityType } = require("discord.js")
require("dotenv/config")
const WOK = require("wokcommands")
const path = require("path")
const config = require("./config.json")
const client = new Client({
  intents: 32767,
});

const mongoose = require("mongoose")
const redis = require('quickredis-db')
const db = redis.createClient(process.env.REDIS_URL)

const Levels = require("discord-xp");
Levels.setURL(process.env.MONGO_URL);
client.levels = Levels;

require("./systems/GiveawaySys")(client)
client.on("ready", () => {
  new WOK({
    client,
    commandsDir: path.join(__dirname, "commands"),
    events: {
    dir: path.join(__dirname, "events"),
    interactionCreate: {
      isButton: (interaction) => interaction.isButton(),
    },
    messageCreate: {
      isHuman: (message) => !message.author.bot,
    }
    },
    disabledDefaultCommands: [
      WOK.DefaultCommands.ChannelCommand,
      WOK.DefaultCommands.CustomCommand,
      WOK.DefaultCommands.Prefix,
      WOK.DefaultCommands.RequiredPermissions,
      WOK.DefaultCommands.RequiredRoles,
      WOK.DefaultCommands.ToggleCommand
    ],
    testServers: config.IDs.serverIdArray,
  });
  console.log("DISCORD | Connected!");
  const statuses = config.changingStatus.statuses
  const updateDelay = config.changingStatus.delay; 
  let currentIndex = 0;
  setInterval(() => {
    const activity = statuses[currentIndex].replace("{mc}", client.users.cache.size)

  client.user.setActivity(activity, { type: ActivityType.Watching });
  currentIndex = currentIndex >= statuses.length - 1 
      ? 0
      : currentIndex + 1;
  }, updateDelay * 1000);
  if (!process.env.MONGO_URL) return;

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("MONGO | Connected!")
  }).catch((err) => {
    console.log("MONGO | Error!")
    console.log(err)
  })
});
db.once("ready", () => {
  console.log("REDIS | Connected!")
})


client.on("messageCreate", async m => {
  const talkedRecently = new Set();

  if(config.IDs.channels.xpAllowed.includes(m.channel.id)) {
    if (!m.guild) return;
    if (m.author.bot) return;
    if (talkedRecently.has(m.author.id)) { return; } else {
    const randomAmountOfXp = Math.floor(Math.random() * config.xp.maxXpPerMessage) + config.xp.minXpPermMessage; // Min 1, Max 10
    const hasLeveledUp = await levels.appendXp(m.author.id, m.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await levels.fetch(m.author.id, m.guild.id);
      m.channel.send({ content: `${m.author}, congratulations! You have leveled up to **${user.level}**. :tada:` });
    }

    talkedRecently.add(m.author.id);

    
}

      setTimeout(() => {
        talkedRecently.delete(m.author.id);
      }, config.xp.gainDelay * 1000);
  }
})//client.on("messageCreate", m => {
//  if(!m.content == "devsendverif") return;
//  const row = new ActionRowBuilder()
//  .addComponents(
//    new ButtonBuilder()
//    .setLabel("Verify")
//    .setCustomId("verif")
//    .setStyle(ButtonStyle.Success)
//  )
//
//  const e = new EmbedBuilder()
//  .setTitle("Click the button below to get access to the server!")
//  .setColor(config.embeds.success.color)
//
//  m.channel.send({embeds: [e], components: [row]})
//})
client.login(process.env.TOKEN);