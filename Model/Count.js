const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countSchema = new Schema({
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("count", countSchema);
