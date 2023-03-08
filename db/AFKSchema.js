const { model, Schema } = require("mongoose")

module.exports = model("AFKSchema", new Schema({
    GuildID: String,
    UserID: String,
    Status: String,
    Time: String
}))