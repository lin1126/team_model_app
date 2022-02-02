const express = require('express')
const app = express()
const { getStudentClass, getStuInfo } = require('../dbs/classDB')
const { verifyToken } = require('../../server/middlewares/auth')

// 查找某班级下所有学生
app.post('/getStudent', async (req, res) => {
  const token = req.headers.authorization
  const { _grade, _career, _class } = req.body
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '教师') {
      const data = await getStudentClass(_grade, _career, _class)
      res.send(data)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})

// 根据学号查询学生信息
app.post('/getStuInfo', async (req, res) => {
  const token = req.headers.authorization
  const { _ID } = req.body
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '教师') {
      const data = await getStuInfo(_ID)
      res.send(data)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})
// 暴露api模块
module.exports = app
