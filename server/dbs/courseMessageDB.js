/******************************************************
 * 本文件封装与课程留言有关的数据库操作
 ******************************************************/
const mongoose = require('../../utils/mongodb')

const MessageSchema = mongoose.Schema({
  courseID: {
    type: Number,
  },
  ID: Number,
  message: String,
  time: String,
  isShow: String,
})

const message = mongoose.model('Course_message_db', MessageSchema, 'course_message_db')
// 获取留言和相应的子留言
function getMessage(courseID, page, limit) {
  return new Promise((resolve, reject) => {
    message.aggregate(
      [
        {
          $match: { courseID: courseID },
        },
        {
          $lookup: {
            //定义规则
            from: 'student_db', //在order_item集合中查找
            localField: 'ID', //当前查询的字段
            foreignField: 'ID', //对应order_item集合的哪个字段
            as: 'stuInfo', //在查询结果中键值
          },
        },
        {
          $project: { courseID: 1, ID: 1, message: 1, time: 1, isShow: 1, stuInfo: { name: 1, photo: 1 } },
        },
        {
          $lookup: {
            //定义规则
            from: 'course_message_children_db', //在order_item集合中查找
            localField: '_id', //当前查询的字段
            foreignField: 'childrenID', //对应order_item集合的哪个字段
            as: 'children', //在查询结果中键值
          },
        },
        {
          $sort: { time: -1 },
        },
      ],
      (err, doc) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      }
    )
  })
}

function setMessage(courseID, ID, content) {
  return new Promise((resolve, reject) => {
    var time = new Date()
    const date = time.getTime()
    const courseInfo = {
      courseID: courseID,
      ID: ID,
      message: content,
      time: date,
      isShow: false,
    }
    const u = new message(courseInfo)
    u.save((err) => {
      if (err) {
        reject(400)
      }
      resolve(200)
    })
  })
}
module.exports = {
  getMessage,
  setMessage,
}
