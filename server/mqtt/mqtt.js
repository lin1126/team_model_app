/*************************************************************************************    
  本文件用于处理mqtt接收的数据
**************************************************************************************/
const fs = require('fs')
const { client } = require('../../utils/WebsocketMqtt')
const { addHumiture } = require('../dbs/humitureDB')
const { addEquipment } = require('../dbs/equipmentDB')
client.on('message', (topic, message) => {
  if (topic == 'raspi/dht11') {
    let mess = JSON.parse(message.toString())
    // 添加温湿度数据
    addHumiture(mess)
  } else if (topic == 'raspi/device') {
    let mess = JSON.parse(message.toString())
    // 添加设备使用数据
    addEquipment(mess)
  } else if (topic == 'raspi/pic/update') {
    base64String = message.toString('base64')
    dataBuffer = new Buffer(base64String, 'base64');
    var timestamp = new Date().getTime()
    fs.writeFile("./images/" + timestamp + ".jpg", dataBuffer, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('保存成功');
      }
    })
  }
})
