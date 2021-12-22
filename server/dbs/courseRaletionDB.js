/******************************************************
 * 本文件封装与课程关系有关的数据库操作
 ******************************************************/
const mongoose = require('../../utils/mongodb')

const courseRaletionSchema = mongoose.Schema({
  ID: Number,
  courseID: Number,
  teacherID: Number,
})

const courseRaletion = mongoose.model('Course_raletion_db', courseRaletionSchema, 'course_raletion_db')

function findCourse(ID) {
  // 查询当前学生的课程
  return new Promise((resolve, reject) => {
    courseRaletion.aggregate(
      [
        {
          $match: { ID: ID },
        },
        {
          $lookup: {
            //定义规则
            from: 'course_db', //在order_item集合中查找
            localField: 'courseID', //当前查询的字段
            foreignField: 'courseID', //对应order_item集合的哪个字段
            as: 'courseDetail', //在查询结果中键值
          },
        },
        {
          $project: { ID: 1, teacherID: 1, teacherName: 1, courseDetail: 1 },
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
  findCourse,
}
