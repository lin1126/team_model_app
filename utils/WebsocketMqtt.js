/*************************************************************************************    
  连接mqtt服务端,并订阅mqtt主题。利用client('raspi/dht11')订阅主题
**************************************************************************************/

const mqtt = require('mqtt')
// 连接选项
const options = {
  connectTimeout: 4000, // 超时时间
  // 认证信息
  clientId: 'node',
}

var client

client = mqtt.connect('ws://39.105.106.13:8083/mqtt')
const subscription = function (topic) {
  client.on('reconnect', (error) => {
    console.log('正在重连:', error)
  })

  client.on('error', (error) => {
    console.log('连接失败:', error)
  })

  client.on('connect', (e) => {
    console.log('成功连接服务器')
    client.subscribe(
      topic,
      {
        qos: 0,
      },
      (error) => {
        if (!error) {
          console.log('订阅成功')
        }
      }
    )
  })
}

var sendMqttMsg = function (theme, Data) {
  client.publish(theme, Data, {
    qos: 1,
    rein: false
  }, (error) => {
    if (!error) {

    }
    console.log(error || '发布成功')
  })
}
module.exports = { client, subscription, sendMqttMsg }
