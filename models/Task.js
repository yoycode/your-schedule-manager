const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  title: {
    type: String,
    maxlength: 50,
  },
  desc: {
    type: String,
  },
  week: {
    type: Number,
  },
  time: {
    type: String,
  }
}, { collection: 'task' })

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task }