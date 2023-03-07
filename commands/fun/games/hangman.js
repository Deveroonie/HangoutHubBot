
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../../config.json")

const { EmbedBuilder } = require("discord.js")
const { Hangman } = require("discord-gamecord")

module.exports = {

    description: "Play a game of hangman!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        const game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: config.embeds.games.hangman.title,
                color: config.embeds.games.hangman.color
              },
              hangman: { hat: '🎩', head: '🥴', shirt: '👕', pants: '🩳', boots: '👞👞' },
              timeoutTime: 60000,
              themeWords: 'all',
              winMessage: 'You won! The word was **{word}**.',
              loseMessage: 'You lost! The word was **{word}**.',
              playerOnlyMessage: 'Only {player} can use these buttons.'
        })

        game.startGame();
    },
}