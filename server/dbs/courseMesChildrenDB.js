/******************************************************
 * 本文件封装与课程子留言有关的数据库操作
 ******************************************************/
const mongoose = require('../../utils/mongodb')
ObjectId = require('mongodb').ObjectID
const MesChildrenSchema = mongoose.Schema({
  childrenID: Object,
  ID: Number,
  name: String,
  message: String,
  time: String,
})

const mesChildren = mongoose.model('Course_message_children_db', MesChildrenSchema, 'course_message_children_db')

function setMessChildren(childrenID, ID, message, sname) {
  return new Promise((resolve, reject) => {
    var time = new Date()
    const date = time.getTime()
    const courseInfo = {
      childrenID: ObjectId(childrenID),
      ID: ID,
      message: message,
      time: date,
      name: sname,
    }
    const u = new mesChildren(courseInfo)
    u.save((err) => {
      if (err) {
        reject(400)
      }
      resolve(200)
    })
  })
}

module.exports = { setMessChildren }
