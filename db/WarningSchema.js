const { Schema, model } = require("mongoose")

module.exports = model("WarningSchema", new Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array
}))