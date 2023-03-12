const { Client, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, PermissionOverwriteManager, InteractionCollector, ChannelType, PermissionOverwrites, EmbedBuilder } = require("discord.js");
require("dotenv/config");
const WOK = require("wokcommands");
const path = require("path");
const config = require("./config.json")
const client = new Client({
  intents: 32767,
});

const mongoose = require("mongoose")
const redis = require('quickredis-db')
const db = redis.createClient(process.env.REDIS_URL)

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
  console.log("DISCORD | Connected! ")
  client.user.setActivity('Deveroonie code me', { type: ActivityType.Watching });
  
  if(!process.env.MONGO_URL) return;

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

client.on("guildMemberAdd", mem => {
  mem.roles.add(config.IDs.roles.unverified)
})
client.login(process.env.TOKEN);