const { Schema, model } = require("mongoose")

module.exports = model("TicketsSchema", new Schema({
    GuildID: String,
    MemberID: String,
    TicketID: String,
    ChannelID: String,
    Closed: Boolean,
    Locked: Boolean,
    Type: String
}))