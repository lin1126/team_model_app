const mongoose = require('../../utils/mongodb')

const courseRaletionSchema = mongoose.Schema({
  ID: Number,
  courseID: Number,
  teacherID: Number,
})

const courseRaletion = mongoose.model('Course_raletion_db', courseRaletionSchema, 'course_raletion_db')

// 添加一条关系
function addRelation(data) {
  const u = new courseRaletion(data)
  u.save((err) => {
    if (err) {
      console.log(err)
      return
    }
  })
}

// findStudentClass(18, '物联网工程', 2).then((doc) => {
//   var msg = []
//   for (var i = 0; i < doc.length; i++) {
//     msg.push({
//       ID: doc[i].ID,
//       courseID: 4,
//       teacherID: 38277721,
//     })
//   }
//   for (var i = 0; i < msg.length; i++) {
//     addRelation(msg[i])
//   }
// })

module.exports = {
  courseRaletion,
}
