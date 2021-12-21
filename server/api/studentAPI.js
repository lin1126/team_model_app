const express = require('express')
const app = express()
const { getStuInfo } = require('../dbs/student.DBB')
const { verifyToken } = require('../../server/middlewares/auth')

// 暴露api模块
module.exports = app
