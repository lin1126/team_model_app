const { json } = require('express')
const express = require('express')
const app = express()
const { getEquipment, getTimeEquipment } = require('../dbs/equipmentDB')

//按时间降序
app.get('/get', async (req, res) => {
  const doc = await getEquipment(req.query._page, req.query._limit)
  res.send(doc)
})

app.get('/gettime', async (req, res) => {
  const doc = await getTimeEquipment(req.query._page, req.query._limit, req.query._start, req.query._end)
  res.send(doc)
})

module.exports = app
