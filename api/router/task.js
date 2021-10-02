const express = require("express");
const app = express();

const { Task } = require('../../models/Task');

app.post('/setTask', (req, res) => {
  console.log("dd", req.body);
  const task = new Task(req.body[0]);
  let rs = {};

  task.save((err, taskInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      sucess: true,
      msg: taskInfo
    })
  })
})

module.exports = app;