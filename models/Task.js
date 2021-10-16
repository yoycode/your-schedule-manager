const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  t_code: {
    type: Number
  },
  name: {
    type: String,
    maxlength: 50,
  },
  taskInfo: {
    type: Array,
    title: {
      type: String,
      maxlength: 50,
    },
    desc: {
      type: String,
    },
    week: {
      type: Array,
    },
    time: {
      type: Array,
    },
    applied: {
      type: Boolean,
      // default: false,
    }
  }
}, { collection: 'task' })

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task }