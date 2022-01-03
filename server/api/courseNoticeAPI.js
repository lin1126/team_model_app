/***************************************************************
 * 课程公告部分api
 ***************************************************************/
const express = require('express')
const app = express()
const { getCourseNotice, readNotice, readAllNotice, delNotice, delCheckedNotice, inCourseNotice } = require('../dbs/courseNoticeDB')
const { verifyToken } = require('../../server/middlewares/auth')

// 学生获取类型为课堂通知的消息
app.get('/getNotice', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      var doc = await getCourseNotice(parseInt(req.query._id), req.query._page, req.query._limit)
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

// 学生获取类型为课堂通知且为某一个课程下的的通知
app.get('/getCourseNotice', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      var doc = await inCourseNotice(parseInt(req.query._id), parseInt(req.query._courseID), req.query._page, req.query._limit)
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

// 读取某一条
app.post('/readNotice', async (req, res) => {
  const token = req.headers.authorization
  const { _id, _state } = req.body
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      const data = await readNotice(_id, _state)
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
// 一键已读功能
app.post('/readAllNotice', async (req, res) => {
  const token = req.headers.authorization
  const { _ID } = req.body
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      const data = await readAllNotice(_ID)
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
// 删除通知
app.post('/delNotice', async (req, res) => {
  const token = req.headers.authorization
  const { _id } = req.body
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      const data = await delNotice(_id)
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

// 删除选中的通知
app.post('/delCheckedNotice', async (req, res) => {
  const token = req.headers.authorization
  const { _id } = req.body
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      const data = await delCheckedNotice(_id)
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

module.exports = app
