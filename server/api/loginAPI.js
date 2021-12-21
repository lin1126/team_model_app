/***************************************************************
 * 登录部分api
 ***************************************************************/
const express = require('express')
const app = express()
const { verifyUser, getStuInfo } = require('../dbs/loginDB')
const { generateToken } = require('../../utils/token')
const { verifyToken } = require('../middlewares/auth')
// 用户登录判断
app.post('/', async (req, res) => {
  const { username, userpwd } = req.body

  if (!isNaN(username)) {
    const data = await verifyUser(username, userpwd)
    if (data.code != 10000) res.send(data)
    else {
      const token = generateToken(username, data.identify)
      res.send({
        code: data.code,
        identify: data.identify,
        aceessToken: token,
      })
    }
  } else {
    // 如果输入账号不是纯数字，直接返回错误信息
    res.send({
      code: '10002',
      mes: '账号输入错误：必须为纯数字',
    })
  }
})

// 验证用户有效性
app.post('/verify', (req, res) => {
  const { token } = req.body
  const isValid = verifyToken(token)
  console.log(isValid)
  if (isValid.isValid == true) {
    res.send(isValid)
  } else {
    res.send(isValid)
  }
})

// 获取用户信息
app.get('/getinfo', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    var doc = await getStuInfo(isValid.id)
    const msg = { isValid: isValid.isValid, info: doc }
    res.send(msg)
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.identify }
    res.send(msg)
  }
})

module.exports = app
