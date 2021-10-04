const express = require("express");
const app = express();

const { Task } = require('../../models/Task');

app.post('/setTask', (req, res) => {
  console.log("setTask: ", req.body);
  const task = new Task(req.body[0]);

  task.save((err, taskInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      msg: taskInfo
    })
  })
})

app.post('/getTaskList', (req, res) => {
  console.log("getTaskList param:", req.body);
  const task = new Task;

  Task.find((err, taskList) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      msg: taskList
    })
  })
})

module.exports = app;