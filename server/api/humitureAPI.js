/***************************************************************
 * 温湿度部分api
 ***************************************************************/
const express = require('express')
const app = express()
const { getHumiture } = require('../dbs/humitureDB')
const { verifyToken } = require('../../server/middlewares/auth')

app.get('/get', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时判断权限
  if (isValid.isValid == true) {
    if (isValid.identify == '管理员') {
      var doc = await getHumiture(req.query._page, req.query._limit)
      res.send(doc)
    } else {
      res.writeHead(404)
      res.end('权限不足')
    }
  } else {
    res.writeHead(401)
    res.end(isValid.tip)
  }
})

// 暴露api模块
module.exports = app
