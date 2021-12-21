/***************************************************************
 * 获取教室图片名称API
 ***************************************************************/
const express = require('express')
const app = express()
const fs = require('fs')
// 处理图片
const readDir = (start, end, skip, limit) => {
  let dirInfo = fs.readdirSync('./images')
  let PicDirInfo = []
  let DirLength = null
  // 遍历所图片
  dirInfo.forEach((item) => {
    // 去掉后缀
    item = item.replace(/[^\d]/g, '')
    // 遍历文件，将符合条件的文件名存入数组
    if (item >= start && item <= end) {
      PicDirInfo.push(item)
    }
  })
  DirLength = PicDirInfo.length
  // 相当于分页查询，skip代表页数，limit相当于每页的数据条数
  PicDirInfo = PicDirInfo.splice((skip - 1) * limit, limit)
  return { length: DirLength, PicDirInfo: PicDirInfo }
}

app.get('/get', (req, res) => {
  // readDir(1638023009972, 1638026141389,)
  const doc = readDir(req.query._start, req.query._stop, req.query._skip, req.query._limit)
  res.send(doc)
})

module.exports = app
