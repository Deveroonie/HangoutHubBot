module.exports = (interaction, instance) => {
    const i = interaction;
    if(!i.isButton()) return;
    if(!i.customId == "verif") {
      i.member.roles.add(config.IDs.roles.verified)
      i.member.roles.remove(config.IDs.roles.unverified)
    }
}
