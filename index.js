const express = require('express')
const { subscription, sendMqttMsg } = require('./utils/WebsocketMqtt')
const app = express()
const bodyParser = require('body-parser')

const humitureApi = require('./server/api/humitureAPI')
const equipmentApi = require('./server/api/equipmentAPI')
const PictureApi = require('./server/api/PictureAPI')
const loginAPI = require('./server/api/loginAPI')
const courseApi = require('./server/api/courseAPI')
const courseNoticeAPI = require('./server/api/courseNoticeAPI')
const studentApi = require('./server/api/studentAPI')
const courseMessageAPI = require('./server/api/courseMessageAPI')
const courseMesChildrenAPI = require('./server/api/courseMesChildrenAPI')
const classAPI = require('./server/api/classAPI')

require('./server/mqtt/mqtt')
require('./server/dbs/humitureDB')

// 将body设为可用
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 处理跨域问题
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
subscription('pic/#')

// 挂载路由api
app.use('/api/humiture', humitureApi)
app.use('/api/equipment', equipmentApi)
app.use('/api/picture', PictureApi)
app.use('/api/login', loginAPI)
app.use('/api/course', courseApi)
app.use('/api/notice', courseNoticeAPI)
app.use('/api/student', studentApi)
app.use('/api/message', courseMessageAPI)
app.use('/api/MessChildren', courseMesChildrenAPI)
app.use('/api/class', classAPI)
// 每隔5s发送一次请求，获取当前的教室内图片信息
setInterval(() => {
  sendMqttMsg('raspi/pic', 'update')
}, 5000)
// 监听端口
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
