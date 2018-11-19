// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 导入并使用自定义路由模块
const router = require('./router')
app.use(router)

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3005, function () {
  console.log('Express server running at http://127.0.0.1:3005')
})