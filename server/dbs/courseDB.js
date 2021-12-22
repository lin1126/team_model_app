/******************************************************
 * 本文件封装与课程信息有关的数据库操作
 ******************************************************/
const mongoose = require('../../utils/mongodb')
const { courseRaletion } = require('./courseRaletionDB')
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

// var time = new Date()
// const date = time.getTime()
// const courseInfo = {
//   courseID: 6,
//   name: '传感器原理及应用',
//   class: '18物联网工程2班',
//   year: '2019-2020第二学期',
//   organization: '福建江夏学院电子信息科学学院',
//   time: date,
//   state: 'end',
//   Photo: 'http://39.105.106.13:9999/stuphoto/cousephoto.png',
// }

// const u = new course(courseInfo)
// u.save((err) => {
//   if (err) {
//     console.log(err)
//     return
//   }
// })
