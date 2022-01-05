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
// 查询当前学生的课程
function findCourse(ID) {
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

// 查询教师教学的课程
function findTeachCourse(teacherID) {
  return new Promise((resolve, reject) => {
    courseRaletion
      .aggregate([
        {
          $match: { teacherID: teacherID },
        },
        // 用group分类进行去重
        {
          $group: {
            _id: '$courseID',
            teacherID: { $first: '$teacherID' },
          },
        },
        {
          $lookup: {
            //定义规则
            from: 'course_db', //在order_item集合中查找
            localField: '_id', //当前查询的字段
            foreignField: 'courseID', //对应order_item集合的哪个字段
            as: 'courseDetail', //在查询结果中键值
          },
        },
        {
          $project: { teacherID: 1, courseID: 1, courseDetail: { name: 1, class: 1, year: 1, state: 1, Photo: 1 } },
        },
      ])
      .exec((err, doc) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      })

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
  findTeachCourse,
}
