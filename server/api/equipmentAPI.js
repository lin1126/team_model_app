/***************************************************************
 * 设备使用记录部分api
 ***************************************************************/
const { json } = require('express')
const express = require('express')
const app = express()
const { getEquipment, getTimeEquipment, getEquipmentLength } = require('../dbs/equipmentDB')
const { verifyToken } = require('../../server/middlewares/auth')

//按时间降序
app.get('/get', async (req, res) => {
  const doc = await getEquipment(req.query._page, req.query._limit)
  res.send(doc)
})

// 按时间查询
app.get('/gettime', async (req, res) => {
  const doc = await getTimeEquipment(req.query._page, req.query._limit, req.query._start, req.query._end)
  res.send(doc)
})

// 查询日志长度
app.get('/getLength', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '管理员') {
      const data = await getEquipmentLength()
      const msg = { length: data }
      res.send(msg)
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
