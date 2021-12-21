/*************************************************
 * 本文件用于生成token
 **************************************************/
const jwt = require('jsonwebtoken')
const { secretKey, expiresIn } = require('../config/config')

// 生成token
function generateToken(uid, scope) {
  const token = jwt.sign({ uid, scope }, secretKey, { expiresIn })
  return token
}

module.exports = {
  generateToken,
}
