/*************************************************************************************    
  本文件封装设备使用记录的数据库操作
**************************************************************************************/
const mongoose = require('../../utils/mongodb')

// 定义schema
const equipmentSchema = mongoose.Schema({
  classroom: Number,
  building: Number,
  led: String,
  humidifier: String,
  aircon: String,
  dht11: String,
  autocontrol: String,
  time: Number,
})

const equipment = mongoose.model('Equipment_record_db', equipmentSchema, 'equipment_record_db')
// 添加设备的使用记录
function addEquipment(data) {
  const u = new equipment(data)
  u.save((err) => {
    if (err) {
      console.log(err)
      return
    }
  })
}

// 查询设备使用日志总长度
function getEquipmentLength() {
  return new Promise((resolve, reject) => {
    equipment.find({}).exec((err, doc) => {
      if (err) {
        resolve(400)
      }
      resolve(doc.length)
    })
  })
}

// 分页查询设备的使用记录
function getEquipment(page, limit) {
  return new Promise((resolve, reject) => {
    equipment
      .find({})
      .skip((page - 1) * limit)
      .limit(limit - 0)
      .sort({ time: -1 })
      .exec((err, doc) => {
        if (err) {
          console.log(err)
          return
        }
        resolve(doc)
      })
  })
}

// 分页查询设备的使用记录
function getTimeEquipment(page, limit, start, end) {
  return new Promise((resolve, reject) => {
    equipment
      .find({ time: { $gt: start, $lt: end } })
      .skip((page - 1) * limit)
      .limit(limit - 0)
      .sort({ time: -1 })
      .exec((err, doc) => {
        if (err) {
          resolve('查询设备使用记录失败')
          return
        }

        resolve(doc)
      })
  })
}

module.exports = { addEquipment, getEquipment, getTimeEquipment, getEquipmentLength }
