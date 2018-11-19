const express = require('express')

const router = express.Router()

// 提示访问API服务器成功
router.get('/', (req, res) => {
  res.send('欢迎访问豆瓣API服务器')
})

// 获取正在热映的电影
router.get('/v2/movie/in_theaters', (req, res) => {
  // 导入本地的数据文件并获取电影数据
  const obj = require('./dataFiles/in_theaters')

  res.jsonp(resolveMovieArr(obj, req.query))
})

// 获取即将上映的电影
router.get('/v2/movie/coming_soon', (req, res) => {
  // 导入本地的数据文件并获取电影数据
  const obj = require('./dataFiles/coming_soon')

  res.jsonp(resolveMovieArr(obj, req.query))
})

// 获取排行 Top250的电影
router.get('/v2/movie/top250', (req, res) => {
  // 导入本地的数据文件并获取电影数据
  const obj = require('./dataFiles/top250')

  res.jsonp(resolveMovieArr(obj, req.query))
})

// 获取电影详情数据
router.get('/v2/movie/subject/:id', (req, res) => {
  // 导入本地的电影详情数据
  const objDetail = require('./dataFiles/movie_detail')
  res.jsonp(objDetail)
})


// 根据请求参数，处理要返回给客户端的电影数据
function resolveMovieArr(obj, query) {
  let count = 20 // 设置默认每次返回的数据记录条数为 20
  let start = 0 // 设置默认的偏移位置为0

  console.log(obj.subjects.length)

  // 对 count 值进行非法值控制
  if (query.count) count = Math.abs(parseInt(query.count) || 20)
  if (query.start) start = Math.abs(parseInt(query.start) || 0)

  // 最终返回给客户端的
  const result = {
    count,
    start,
    total: obj.total,
    subjects: obj.subjects.slice(start, start + count),
    title: obj.title
  }

  return result
}



module.exports = router