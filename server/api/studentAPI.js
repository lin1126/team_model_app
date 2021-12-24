const express = require('express')
// 获取前台提交的文件数据的第三方模块
const multiparty = require('multiparty')
const app = express()
const { updateStudentInfo, updatePwd, updatePhoto } = require('../dbs/student.DB')
const { verifyToken } = require('../../server/middlewares/auth')

app.get('/update', async (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      var doc = await updateStudentInfo(parseInt(req.query._id), req.query._field, req.query._data)
      res.send(doc)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})

app.post('/updatePwd', async (req, res) => {
  const { _id, _old, _new } = req.body
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    if (isValid.identify == '学生') {
      var doc = await updatePwd(parseInt(_id), _old, _new)
      res.send(doc)
    } else {
      const msg = { isValid: isValid.isValid, info: '权限不足' }
      res.send(msg)
    }
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.tip }
    res.send(msg)
  }
})

app.post('/updateImage', (req, res) => {
  const token = req.headers.authorization
  const isValid = verifyToken(token)
  // token成功时就获取相应信息
  if (isValid.isValid == true) {
    let form = new multiparty.Form()
    form.uploadDir = './images/photo'
    form.keepExtensions = true //是否保留后缀
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err)
        return
      }
      const path = files.file[0].path
      // const path = 'images\photo\bpoJrW4NZ8cc8pWbF7NL_Flr.jpg'
      const index = path.lastIndexOf('\\')
      const subPath = path.substring(index + 1, path.length)
      const savePath = 'http://39.105.106.13:9999/stuphoto/' + subPath
      const doc = await updatePhoto(isValid.id, savePath)
      const msg = { isValid: isValid.isValid, path: savePath, result: doc }
      res.send(msg)
    })
  } else {
    const msg = { isValid: isValid.isValid, info: isValid.identify }
    res.send(msg)
  }
})
// 暴露api模块
module.exports = app
