const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({

}, { collection: 'schedule' })

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = { Schedule }