// 1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'

// 导入全局的配置文件
import '@/globalConfig'

// 导入品牌列表组件
import BrandList from '@/components/BrandList'

// 3. 调用 render 函数渲染
ReactDOM.render(<div>
  <BrandList></BrandList>
</div>, document.getElementById('app'))