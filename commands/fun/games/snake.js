
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../../config.json")

const { EmbedBuilder } = require("discord.js")
const { Snake } = require("discord-gamecord")

module.exports = {

    description: "Play a game of hangman!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        
const Game = new Snake({
    message: interaction,
    isSlashGame: true,
    embed: {
      title: config.embeds.games.snake.title,
      overTitle: 'Game Over',
      color: config.embeds.games.snake.color
    },
    emojis: {
      board: '⬛',
      food: '🍎',
      up: '⬆️', 
      down: '⬇️',
      left: '⬅️',
      right: '➡️',
    },
    snake: { head: '🟢', body: '🟢', tail: '🟢', over: '💀' },
    foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
    stopButton: 'Stop',
    timeoutTime: 60000,
    playerOnlyMessage: 'Only {player} can use these buttons.'
  });
  
  Game.startGame();
    },
}