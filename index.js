const express = require('express')
const { subscription } = require('./utils/WebsocketMqtt')
const app = express()
const humitureApi = require('./server/api/humitureAPI')
const equipmentApi = require('./server/api/equipmentAPI')

require('./server/mqtt/mqtt')
require('./server/dbs/humitureDB')

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
// 设置接口的端口
const port = 3000
// 订阅raspi/#的主题
subscription('raspi/#')
// 挂载温湿度路由api
app.use('/api/humiture', humitureApi)
app.use('/api/equipment', equipmentApi)

// 监听端口
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
