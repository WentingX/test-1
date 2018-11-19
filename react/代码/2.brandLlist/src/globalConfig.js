import React from 'react'

// 导入 样式
import 'bootstrap/dist/css/bootstrap.min.css'

// 导入 axios 并配置
import axios from 'axios'
// 配置 baseURL
axios.defaults.baseURL = 'http://39.106.32.91:3000'
// 包装 post 请求的参数，把参数从对象 转换为 查询字符串
axios.defaults.transformRequest = [function (data, headers) {
  const arr = []
  for (let key in data) {
    arr.push(`${key}=${data[key]}`)
  }
  return arr.join('&')
}]
// 将 axios 挂载到 组件原型上
React.Component.prototype.$http = axios


// import moment from 'moment'
// 创建并挂载全局格式化时间的过滤器
React.Component.prototype.dateFormat = function (dtStr) {
  // return dtStr + '~~~~'  // 1.63M   2.16M
  // return moment(dtStr).format('YYYY-MM-DD HH:mm:ss')
  const dt = new Date(dtStr)

  // String.prototype.padStart(2, '0')   String.prototype.padEnd(2, '0')
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1).toString().padStart(2, '0')
  const d = dt.getDate().toString().padStart(2, '0')

  const hh = dt.getHours().toString().padStart(2, '0')
  const mm = dt.getMinutes().toString().padStart(2, '0')
  const ss = dt.getSeconds().toString().padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

}