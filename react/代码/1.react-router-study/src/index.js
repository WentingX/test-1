// 1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'

// 导入 fetch-jsonp
import fetchJSONP from 'fetch-jsonp'
// 把 fetch-jsonp 挂载到 每个组件上
React.Component.prototype.$http = fetchJSONP

// 导入 根组件
import App from '@/components/App'


// 按需导入 Antd 的组件
import { DatePicker } from 'antd'

// 全局导入 所有的 Antd 样式表
// 注意： 如果 配置 了 babel-plugin-import, 则我们就不再需要手动导入 样式表了；
// import 'antd/dist/antd.css'

// 3. 调用 render 函数渲染
ReactDOM.render(<div>
  {/* <DatePicker /> */}
  <App />
</div>, document.getElementById('app'))



/* fetchJSONP('https://api.douban.com/v2/movie/in_theaters')
  .then(res => res.json())
  .then(data => console.log(data)) */