const express = require("express");
const app = express();
const ObjectID = require('mongodb').ObjectId;
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
  // const task = new Task;

  Task.find((err, taskList) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      msg: taskList
    })
  })
})

app.post('/applyTask', (req, res) => {
  console.log("applyTask", req.body);
  // 해당 item 찾아가서 apply 변경해주기 
})

app.post('/deleteTask', async (req, res) => {
  let rs = {}
  await Task.deleteOne({ _id: new ObjectID(req.body.id) })
    .then(data => {
      return res.status(200).json({
        success: true,
        msg: data
      })
    })
    .catch(err => {
      return res.json({ success: false, err });
    })
  // return res({ rs : result })
})

module.exports = app;