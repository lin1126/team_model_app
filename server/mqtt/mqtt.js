/*************************************************************************************    
  本文件用于处理mqtt接收的数据
**************************************************************************************/
const { client } = require('../../utils/WebsocketMqtt')
const { addHumiture } = require('../dbs/humitureDB')
const { addEquipment } = require('../dbs/equipmentDB')
client.on('message', (topic, message) => {
  let mess = JSON.parse(message.toString())
  if (topic == 'raspi/dht11') {
    // temp = mess.temp
    // humi = mess.humi
    // console.log('教室的温度为', temp, '湿度为', humi)
    // console.log('收到来自', topic, '的消息', mess)
    addHumiture(mess)
  } else if (topic == 'raspi/device') {
    addEquipment(mess)
  }
})
