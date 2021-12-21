/***************************************************************
 * 课程部分api
 ***************************************************************/
const express = require('express')
const app = express()
const { findCourse } = require('../dbs/courseDB')
const { verifyToken } = require('../../server/middlewares/auth')

// 获取学生课程信息表
app.get('/getCourse', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  console.log(isValid)
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

module.exports = app
