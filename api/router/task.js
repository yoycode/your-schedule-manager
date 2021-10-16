const express = require("express");
const app = express();
const ObjectID = require('mongodb').ObjectId;
const { Task } = require('../../models/Task');

app.post('/setTask', async (req, res) => {
  const param = req.body;
  // 여기 쿼리 처음부터 다시 짜야됨
  // name 있으면 그냥 save, 하고 
  Task.findOne({ name: param.name }, (err, result) => {
    if (!result) {
      const task = new Task(param);
      // console.log('result length', result.length)
      task.save((err, taskInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
          msg: taskInfo
        })
      })
    } else {
      Task.updateOne(
        { name: param.name },
        {
          $push: {
            taskInfo:
            {
              applied: param.taskInfo.applied,
              title: param.taskInfo.title,
              desc: param.taskInfo.desc,
              week: param.taskInfo.week,
              time: param.taskInfo.time
            }
          }
        }
      ).then(data => {
        return res.status(200).json({
          success: true,
          msg: data
        })
      }).catch(err => {
        console.error(err);
        return res.json({ success: false, err })
      })

    }
  })


})

app.post('/getTaskList', (req, res) => {
  // const task = new Task;
  Task.find({ name: req.body.name }, (err, taskList) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      msg: taskList
    })
  })
})

app.post('/applyTask', async (req, res) => {
  const param = req.body;
  // console.log("param", param);

  Task.findOneAndUpdate(
    { name: param.name },
    { taskInfo: { applied: param.taskInfo.applied } },
    (err, result) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
        msg: result
      })
    })
  // Task.findOne({ name: param.name }, (err, result) => {
  //   console.log("result", result);
  //   Task.updateOne(
  //     { name: param.name },
  //     {
  //       $pull: {
  //         taskInfo: {
  //           applied: param.taskInfo.applied
  //         }
  //       }
  //     }
  //   ).then(data => {
  //     console.log("성공!")
  //     // console.log(data);
  //     Task.findOne({ name: param.name }, (err, result) => {
  //       console.log('찾아보자', result);
  //     })
  //     return res.status(200).json({
  //       success: true,
  //       msg: data
  //     })
  //   }).catch(err => {
  //     console.error(err);
  //     return res.json({ success: false, err })
  //   })
  // })



  // 해당 item 찾아가서 apply 변경해주기  
  // await Task.update({ _id: body._id }, { applied: body.applied })
  //   .then(data => {
  //     return res.status(200).json({
  //       success: true,
  //       msg: data
  //     })
  //   })
  //   .catch(err => {
  //     return res.json({ success: false, err })
  //   })
})

app.post('/deleteTask', async (req, res) => {
  const param = req.body;
  let rs = {}
  Task.findOne({ _id: param.id }, (err, result) => {
    // console.log("result", result);
    Task.updateOne(
      { name: param.name },
      {
        $pull: {
          taskInfo: {
            title: param.title
          }
        }
      }
    ).then(data => {
      return res.status(200).json({
        success: true,
        msg: data
      })
    }).catch(err => {
      console.error(err);
      return res.json({ success: false, err })
    })
  })
  // await Task.deleteOne({ _id: new ObjectID(param.id) })
  //   .then(data => {
  //     return res.status(200).json({
  //       success: true,
  //       msg: data
  //     })
  //   })
  //   .catch(err => {
  //     return res.json({ success: false, err });
  //   })
  // return res({ rs : result })
})

module.exports = app;