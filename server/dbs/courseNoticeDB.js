/******************************************************
 * 本文件封装与课程通知有关的数据库操作
 ******************************************************/
const mongoose = require('../../utils/mongodb')
const { findStudentClass } = require('./student.DB')
const courseNoticeSchema = mongoose.Schema({
  courseID: Number,
  notice: String,
  title: String,
  Time: Number,
  State: {
    type: String,
    default: 'false',
  },
  courseName: String,
  type: {
    type: String,
    default: '课堂通知',
  },
  ID: Number,
  show: Boolean,
})

const courseNotice = mongoose.model('Course_notice_db', courseNoticeSchema, 'course_notice_db')

// 发送排序后的课程通知
function getCourseNotice (data, page, limit) {
  return new Promise((resolve, reject) => {
    courseNotice
      .find({ ID: data, type: '课堂通知' })
      .skip((page - 1) * limit)
      .limit(limit - 0)
      .sort({ State: 1 })
      .sort({ Time: -1 })
      .exec((err, doc) => {
        if (err) {
          reject('查询课程公告失败')
        }
        resolve(doc)
      })
  })
}

// 发送排序后未读的课程通知
function getUnreadNotice (data, page, limit) {
  return new Promise((resolve, reject) => {
    courseNotice
      .find({ ID: data, State: 'false', type: '课堂通知' })
      .skip((page - 1) * limit)
      .limit(limit - 0)
      .sort({ Time: -1 })
      .exec((err, doc) => {
        if (err) {
          reject('查询课程公告失败')
        }
        resolve(doc)
      })
  })
}

// 根据学号和课程号查找课程通知
function inCourseNotice (data, courseID, page, limit) {
  return new Promise((resolve, reject) => {
    courseNotice
      .find({ ID: data, type: '课堂通知', courseID: courseID })
      .skip((page - 1) * limit)
      .limit(limit - 0)
      .sort({ State: 1 })
      .sort({ Time: -1 })
      .exec((err, doc) => {
        if (err) {
          reject('查询课程公告失败')
        }
        resolve(doc)
      })
  })
}

// 将课程通知的状态改成已读
function readNotice (id, data) {
  return new Promise((resolve, reject) => {
    courseNotice.updateOne({ _id: id }, { State: data }, (err, doc) => {
      if (err) {
        reject(400)
      }
      resolve(200)
    })
  })
}

// 将该学生的所有通知设为true
function readAllNotice (ID) {
  return new Promise((resolve, reject) => {
    courseNotice.updateMany({ ID: ID, State: 'false' }, { State: 'true' }, (err, doc) => {
      if (err) {
        reject(400)
      }
      resolve(200)
    })
  })
}

// 删除通知
function delNotice (id) {
  return new Promise((resolve, reject) => {
    courseNotice.deleteOne({ _id: id }, (err, doc) => {
      if (err) {
        reject(400)
      }
      resolve(200)
    })
  })
}

// 删除选中的通知
function delCheckedNotice (arr) {
  arr.forEach(async (item) => {
    const res = await delNotice(item)
    if (res == 400) {
      return 400
    }
  })
  return 200
}

// 添加一条课程公告
function addNotice (data) {
  const u = new courseNotice(data)
  u.save((err) => {
    if (err) {
      console.log(err)
      reject(400)
    }
  })
}

// 添加课程公告的方法
function addAllNotice (data, date) {
  return new Promise((resolve, reject) => {
    findStudentClass(data.grade, data.career, data.class).then((doc) => {
      var msg = []
      for (var i = 0; i < doc.stuLength; i++) {
        msg.push({
          courseID: data.courseID,
          notice: data.notice,
          title: data.title,
          Time: date,
          courseName: data.courseName,
          ID: doc.stuList[i].ID,
          show: false,
        })
      }
      for (var i = 0; i < msg.length; i++) {
        addNotice(msg[i])
      }
      resolve(200)
    })
  })
}

module.exports = {
  getCourseNotice,
  readNotice,
  readAllNotice,
  delNotice,
  delCheckedNotice,
  inCourseNotice,
  addAllNotice,
  getUnreadNotice,
}
