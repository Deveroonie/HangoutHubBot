const { model, Schema } = require("mongoose")

module.exports = model("SuggestSchema", new Schema({
    GuildID: String,
    MessageID: String,
    Details: Array
}))