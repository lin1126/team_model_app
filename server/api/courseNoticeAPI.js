/***************************************************************
 * 课程公告部分api
 ***************************************************************/
const express = require('express')
const app = express()
const { getCourseNotice } = require('../dbs/courseNoticeDB')
const { verifyToken } = require('../../server/middlewares/auth')

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

module.exports = app
