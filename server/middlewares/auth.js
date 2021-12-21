// 定义一个方法，专门用来处理身份验证的方法
const jwt = require('jsonwebtoken')
const { secretKey } = require('../../config/config')

function verifyToken(token) {
  try {
    const data = jwt.verify(token, secretKey)
    const mes = { isValid: true, identify: data.scope, id: data.uid }
    return mes
  } catch (error) {
    if (error.message == 'jwt must be provided') {
      var mes = { isValid: false, tip: 'token不能为空' }
    } else if (error.message == 'jwt expired') {
      var mes = { isValid: false, tip: 'token已过期' }
    } else {
      var mes = { isValid: false, tip: 'token无效' }
    }
    return mes
  }
}

module.exports = { verifyToken }
