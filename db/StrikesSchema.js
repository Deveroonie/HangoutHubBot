const { Schema, model } = require("mongoose")

moduke.exports = model("StrikesSchema", new Schema({
    UserID: String,
    StrikesCount: String
}))