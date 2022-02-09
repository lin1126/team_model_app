/**********************************************************************
 * 提取excel中的用户信息，并存入学生数据库中
 **********************************************************************/
const xlsx = require('node-xlsx')
const sheets = xlsx.parse('./1.xlsx') //获取到所有sheets
const mongoose = require('./mongodb.js')

var arr = []
//sheets是一个数组，数组中的每一项对应test.xlsx这个文件里的多个表格，如sheets[0]对应test.xlsx里的“测试参数”这个表格，sheets[1]对应Sheet2这个表格
sheets.forEach(function (sheet) {
  var newSheetsArr = []
  //sheet是一个json对象，格式为{name:"测试参数",data:[]},我们想要的数据就存储在data里
  for (var i = 1; i < sheet['data'].length; i++) {
    //excel文件里的表格一般有标题所以不一定从0开始
    var row = sheet['data'][i]
    let id = row[0]
    const pwd = id.substr(-6)
    const grade = id.substr(3, 2)
    if (row && row.length > 0) {
      newSheetsArr.push({
        ID: row[0], //学号
        password: pwd,
        name: row[1],
        identity: '学生',
        school: '福建江夏学院',
        college: row[2],
        grade: grade,
        career: row[9],
        class: row[10],
        phone: '',
        email: '',
        photo: 'http://39.105.106.13:9999/stuphoto/stuphoto.jpg',
        identity: '学生',
        place: '',
      })
    }
  }
  arr.push(newSheetsArr)
})

// 定义schema
const studentSchema = mongoose.Schema({
  ID: Number,
  password: String,
  name: String,
  school: String,
  college: String,
  grade: String,
  career: String,
  class: Number,
  phone: String,
  email: String,
  photo: String,
  identity: String,
  place: String,
})

const student = mongoose.model('Student_db', studentSchema, 'student_db')

function addStudent(data) {
  const u = new student(data)
  u.save((err) => {
    if (err) {
      console.log(err)
      return
    }
  })
}

for (var i = 0; i < arr[0].length; i++) {
  addStudent(arr[0][i])
}
