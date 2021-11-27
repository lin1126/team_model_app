/*************************************************************************************    
  本文件封装温湿度数据库的一些操作
**************************************************************************************/
const mongoose = require('../../utils/mongodb')
// 定义schema
const humitureSchema = mongoose.Schema({
  deviceId: Number,
  temp: Number,
  humi: Number,
  time: Number,
  classroom: Number,
  building: Number,
})

const humiture = mongoose.model('Humiture_db', humitureSchema, 'humiture_db')

// 添加温湿度数据
function addHumiture(data) {
  const u = new humiture(data)
  u.save((err) => {
    if (err) {
      console.log(err)
      console.log('添加温湿度数据失败')
      return
    }
    console.log('添加温湿度数据成功')
  })
}

// 分页查询温湿度数据，可传入页数和每页的数量
function getHumiture(page, limit) {
  var p = new Promise((resolve, reject) => {
    humiture
      .find({})
      .skip((page - 1) * limit)
      .limit(limit - 0)
      .exec((err, doc) => {
        if (err) {
          console.log(err)
          resolve('查詢温湿度數據失敗')
        }
        console.log('查询温湿度数据成功')
        resolve(doc)
      })
  })
  return p
}

// 按需暴露出函数
module.exports = {
  addHumiture,
  getHumiture,
}
