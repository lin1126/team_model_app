const express = require('express')
const app = express()
const { updateStudentInfo, updatePwd } = require('../dbs/student.DB')
const { verifyToken } = require('../../server/middlewares/auth')

app.get('/update', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      var doc = await updateStudentInfo(parseInt(req.query._id), req.query._field, req.query._data)
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

app.post('/updatePwd', async (req, res) => {
  const { _id, _old, _new } = req.body
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      var doc = await updatePwd(parseInt(_id), _old, _new)
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

// 暴露api模块
module.exports = app
