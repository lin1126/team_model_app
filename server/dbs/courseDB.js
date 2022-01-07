/******************************************************
 * 本文件封装与课程信息有关的数据库操作
 ******************************************************/
const { stringify } = require('nodemon/lib/utils')
const mongoose = require('../../utils/mongodb')
const { addAllCourse } = require('./courseRaletionDB')
const { getStuInfo } = require('./loginDB')

const courseSchema = mongoose.Schema({
  courseID: {
    type: Number,
    unique: true,
  },
  name: String,
  class: String,
  year: String,
  organization: String,
  time: String,
  state: String,
  Photo: String,
})

const course = mongoose.model('Course_db', courseSchema, 'course_db')

// 查找某班级下所有学生
function findStudentClass(courseID) {
  return new Promise((resolve, reject) => {
    course.find({ courseID: courseID }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

// 查找某班级下所有学生
function findStudentClass(courseID) {
  return new Promise((resolve, reject) => {
    course.find({ courseID: courseID }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

// 新增课程
function addCourse(teacherID, teacherName, courseMsg) {
  return new Promise((resolve, reject) => {
    // 设置时间、将课程信息转为json类型
    courseMsg = JSON.parse(courseMsg)
    var time = new Date()
    var CID = 0
    const date = time.getTime()
    // 获取当前的课程号
    course
      .find({}, { courseID: 1 })
      .limit(1)
      .sort({ time: -1 })
      .exec((err, doc) => {
        if (err) {
          console.log(err)
        }
        // 将当前课程号 + 1, 然后存入数据库
        CID = doc[0].courseID + 1
        const courseInfo = {
          courseID: CID,
          name: courseMsg.name,
          class: courseMsg.gradeValue + courseMsg.careerValue + courseMsg.classValue + '班',
          year: courseMsg.semester,
          organization: courseMsg.organization,
          time: date,
          state: 'underway',
          Photo: 'http://39.105.106.13:9999/stuphoto/cousephoto.png',
        }
        const u = new course(courseInfo)
        u.save(async (err) => {
          if (err) {
            reject(err)
          }
          const res = await addAllCourse(CID, teacherID, teacherName, courseMsg).then()
          resolve(res)
        })
      })
  })
}

module.exports = {
  findStudentClass,
  addCourse,
}
