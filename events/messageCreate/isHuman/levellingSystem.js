const config = require("../../../config.json")
const talkedRecently = new Set();

require("dotenv/config")

const Levels = require("discord-xp");
Levels.setURL(process.env.MONGO_URL);

module.exports = async(message, instance, client) => {
    const m = message;
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
          }, config.xp.gainDelay * 1000);
      }
    }