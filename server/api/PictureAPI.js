/***************************************************************
 * 获取教室图片名称API
 ***************************************************************/
const express = require('express')
const app = express()
const fs = require('fs')
// 按照时间区间处理图片
const readDirByTime = (start, end, skip, limit) => {
  let dirInfo = fs.readdirSync('/www/wwwroot/www.team_modle.com/upload')
  dirInfo.reverse()
  let PicDirInfo = []
  // 遍历所图片
  dirInfo.forEach((item) => {
    // 去掉后缀
    item = item.replace(/[^\d]/g, '')
    // 遍历文件，将当前时间段中的文件名存入数组
    if (item >= start && item <= end) {
      PicDirInfo.push(item)
    }
  })
  // 相当于分页查询，skip代表页数，limit相当于每页的数据条数
  PicDirInfo = PicDirInfo.splice((skip - 1) * limit, limit)
  return { length: PicDirInfo.length, PicDirInfo: PicDirInfo }
}

// 获取图片
const readDir = (start, end, skip, limit) => {
  let dirInfo = fs.readdirSync('/www/wwwroot/www.team_modle.com/upload')
  let PicDirInfo = []

  dirInfo.reverse()
  dirInfo.forEach((item) => {
    // 去掉后缀
    item = item.replace(/[^\d]/g, '')
    if (item !== '') {
      PicDirInfo.push(item)
    }
  })
  let totalLength = PicDirInfo.length
  PicDirInfo = PicDirInfo.splice((skip - 1) * limit, limit)
  return { length: PicDirInfo.length, PicDirInfo: PicDirInfo, total: totalLength }
}

app.get('/getForTime', (req, res) => {
  // readDir(1638023009972, 1638026141389,)
  const doc = readDirByTime(req.query._start, req.query._stop, req.query._skip, req.query._limit)
  res.send(doc)
})

app.get('/get', (req, res) => {
  // readDir(1638023009972, 1638026141389,)
  const doc = readDir(req.query._start, req.query._stop, req.query._skip, req.query._limit)
  res.send(doc)
})

module.exports = app
