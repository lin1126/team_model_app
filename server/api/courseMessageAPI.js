const express = require('express')
const app = express()
const { getMessage, setMessage } = require('../dbs/courseMessageDB')
const { verifyToken } = require('../../server/middlewares/auth')

// 获取留言
app.get('/getMessage', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生' || '教师') {
      var doc = await getMessage(parseInt(req.query._courseID), req.query._page, req.query._limit)
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

// 添加留言
app.post('/setMessage', async (req, res) => {
  const token = req.headers.authorization
  const { _courseID, _ID, _content } = req.body
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生' || '教师') {
      const data = await setMessage(_courseID, _ID, _content)
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
