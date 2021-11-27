const express = require('express')
const app = express()
const { getHumiture } = require('../dbs/humitureDB')

app.get('/get', async (req, res) => {
  var doc = await getHumiture(req.query._page, req.query._limit)
  res.send(doc)
})

// 暴露api模块
module.exports = app
