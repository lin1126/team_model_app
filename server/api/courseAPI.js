/***************************************************************
 * 课程部分api
 ***************************************************************/javascript:;
const express = require('express')
const app = express()
const { findCourse, findTeachCourse } = require('../dbs/courseRaletionDB.js')
const { findStudentClass, addCourse, chageCourseState, delCourse } = require('../../server/dbs/courseDB')
const { verifyToken } = require('../../server/middlewares/auth')

// 获取学生课程信息表
app.get('/getCourse', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      var doc = await findCourse(parseInt(req.query._id))
      res.send(doc)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})

// 获取课程详细信息表
app.get('/getCourseDetail', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生' || '教师') {
      var doc = await findStudentClass(parseInt(req.query._courseID))
      res.send(doc)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})

// 获取教室教学课程信息表
app.get('/getTeachCourse', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '教师') {
      var doc = await findTeachCourse(parseInt(req.query._teacherID))
      res.send(doc)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})

// 新建课程
app.post('/addCourse', async (req, res) => {
  const { _courseMsg, _teacherID, _teacherName } = req.body
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '教师') {
      var doc = await addCourse(_teacherID, _teacherName, _courseMsg)
      res.send(doc)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})

// 修改课程状态
app.post('/chageState', async (req, res) => {
  const { _courseID, _state } = req.body
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '教师') {
      const doc = await chageCourseState(_courseID, _state)
      res.send(doc)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})

// 删除课程
app.post('/delCourse', async (req, res) => {
  const { _courseID } = req.body
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '教师') {
      const doc = await delCourse(_courseID)
      res.send(doc)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})
module.exports = app
