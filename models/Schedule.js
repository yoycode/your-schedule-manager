const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  s_code: {
    type: Number
  },
  name: {
    type: String,
    maxlength: 50,
  },
  schedule: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    list: {
      type: Number,
    },
    order: {
      type: Number,
    }
  }
}, { collection: 'schedule' })

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = { Schedule }