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
})

const message = mongoose.model('Course_message_db', MessageSchema, 'course_message_db')

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
        { $project: { courseID: 1, ID: 1, message: 1, time: 1, stuInfo: { name: 1, photo: 1 } } },
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

module.exports = {
  getMessage,
}
// var time = new Date()
// const date = time.getTime()
// const courseInfo = {
//   courseID: 1,
//   ID: 1631808212211,
//   message: '这是一门计算机高阶专业课，而不是科普课程，没有相应的专业基础知识，不建议来学习，更不建议听不懂还来怪老师的。课程确非完美，仍有改进的空间，但是对于想要获取大数据基础知识的人来说，足够满足需求了',
//   time: date,
// }

// const u = new message(courseInfo)
// u.save((err) => {
//   if (err) {
//     console.log(err)
//     return
//   }
// })
