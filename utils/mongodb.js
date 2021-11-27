/*************************************************************************************    
  本文件用于连接mongodb数据库中的team_model集合
**************************************************************************************/
const mongoose = require('mongoose')

// 建立连接
mongoose.connect('mongodb://39.105.106.13:27017/team_model', (err) => {
  if (err) {
    console.log(err)
    return
  }
})

module.exports = mongoose
