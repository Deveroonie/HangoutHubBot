
const { CommandType } = require("wokcommands")

const { get } = require("axios")

const config = require("../../../config.json")

const { EmbedBuilder } = require("discord.js")
const { Minesweeper } = require('discord-gamecord');
module.exports = {

    description: "Play a game of minesweeper!",
  
    type: CommandType.SLASH,
    testOnly: true,
    
    
    
  
    callback: ({ client, interaction }) => {
        const game = new Minesweeper({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: config.embeds.games.minesweeper.title,
                color: config.embeds.games.minesweeper.color,
                description: config.embeds.games.minesweeper.description
              },
              emojis: { flag: '🚩', mine: '💣' },
              mines: 6,
              timeoutTime: 60000,
              winMessage: 'You won the game! Well do!e.',
              loseMessage: 'You lost the game! Beaware of the mines next time.',
              playerOnlyMessage: 'Only {player} can use these buttons.'
        })

        game.startGame();
    },
}