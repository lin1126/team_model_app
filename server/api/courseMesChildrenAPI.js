/***************************************************************
 * 子留言部分api
 ***************************************************************/
const express = require('express')
const app = express()
const { setMessChildren } = require('../dbs/courseMesChildrenDB')
const { verifyToken } = require('../../server/middlewares/auth')

// 添加子留言
app.post('/setMessChildren', async (req, res) => {
  const token = req.headers.authorization
  const { _childrenID, _ID, _message, _name } = req.body
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      const data = await setMessChildren(_childrenID, _ID, _message, _name)
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
