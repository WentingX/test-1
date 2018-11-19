// 1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'

// 导入全局配置文件【和 ReactDOM.render 无关的，一般都要抽离到 全局的配置文件中】
import '@/globalConfig'

// 导入 TestAxios 组件
import TestAxios from '@/components/TestAxios'

// 3. 调用 render 函数渲染
ReactDOM.render(<div>
  <TestAxios></TestAxios>
</div>, document.getElementById('app'))