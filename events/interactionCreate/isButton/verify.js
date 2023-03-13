const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Captcha } = require("captcha-canvas")

module.exports = async(interaction, instance) => {
    const i = interaction;
    if(i.customId !== "verif") return;


    const captcha = new Captcha(); 
    captcha.async = true 
    captcha.addDecoy(); 
    captcha.drawTrace();
    captcha.drawCaptcha();
    const attach = new AttachmentBuilder(await captcha.png, { name: "captcha.png"})

    const fakec = new Captcha(); 
    fakec.async = true 
    fakec.addDecoy(); 
    fakec.drawTrace();
    fakec.drawCaptcha();


  try {
    let x = Math.floor((Math.random() * 2) + 1); 
    if(x == 1) {
      const e = new EmbedBuilder()
      .setTitle(`Is ${fakec.text} the code?`)
      .setImage("attachment://captcha.png")
      .setColor("Green")

      const r = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel("Yes")
        .setCustomId("captcha-wrong-answer")
        .setStyle(ButtonStyle.Success)
      )
      .addComponents(
        new ButtonBuilder()
        .setLabel("No")
        .setCustomId("captcha-right-answer")
        .setStyle(ButtonStyle.Danger)
      )

      return interaction.reply({embeds: [e], files: [attach], components: [r], ephemeral: true})
    } else if(x ==2){
      const e = new EmbedBuilder()
      .setTitle(`Is ${captcha.text} the code?`)
      .setImage("attachment://captcha.png")
      .setColor("Green")

      const r = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel("Yes")
        .setCustomId("captcha-right-answer")
        .setStyle(ButtonStyle.Success)
      )
      .addComponents(
        new ButtonBuilder()
        .setLabel("No")
        .setCustomId("captcha-wrong-answer")
        .setStyle(ButtonStyle.Danger)
      )

      return interaction.reply({embeds: [e], files: [attach], components: [r], ephemeral: true})
    }
  } catch(err) {
    console.log(err)
  }

}
