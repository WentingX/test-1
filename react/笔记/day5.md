# React.js - day3



## 1. 在 render 函数中不能使用 setState

> 因为：setState 会触发 render 函数的执行，如果在 render 函数中，又调用了 setState ，则会进入死循环！




## 2. react结合axios发起ajax请求

1. 用于测试的API地址：

   ```
   get 请求地址： http://39.106.32.91:3000/api/getlunbo
   post请求地址： http://39.106.32.91:3000/api/post
   ```

2. 全局配置`axios`从而让每个组件都能直接调用`axios`发起Ajax请求

   ```js
   import React from 'react'
   import axios from 'axios'

   // class 关键字 底层 也是由 普通 function 构造函数来实现的，因此 class 只是个语法糖
   React.Component.prototype.$http = axios

   // 在每个 用 class 关键字 创建的 组件，都可以直接调用`this.$http`来发起Ajax请求
   ```

3. 全局配置请求的`baseURL `地址

   ```js
   // 全局配置请求的URL根路径
   axios.defaults.baseURL = 'http://39.106.32.91:3000';
   ```

   ​



## 3. 品牌列表案例

### 获取品牌列表数据



### 渲染品牌列表数据



### 自定义全局时间过滤器

1. 定义全局过滤器，需要在 `main.js` 中把过滤器函数挂载给 `React.Component.prototype`

   ```js
   // 模拟全局过滤器
   import moment from 'moment'
   React.Component.prototype.dateFormat = function (dt) {
     return moment(dt).format('YYYY-MM-DD HH:mm:ss')
   }
   ```

2. 定义私有过滤器，直接在每个组件中，定一个过滤器函数就好了：

   ```js
   // 模拟的是私有过滤器
   dateFormat = (dt) => {
     // 做一系列格式化操作
     return dt + '~~~~~~' // moment
   }
   ```

   ​

### 抽离全局配置文件`globalConfig.js`



### 实现根据Id删除品牌数据功能



### 实现添加品牌数据功能



## 4. 路由

> 什么是路由：路由就是对应关系；
>
> 后端路由：URL地址到后端处理函数之间的对应关系；
>
> 前端路由：hash地址到组件之间的对应关系；  监听`window.onhashchange`事件，并拿到最新的hash值，然后对应展示不同的组件即可；

### 配置路由

1. 运行`cnpm i react-router-dom -S`安装依赖项

2. 创建一个`App.jsx`根组件，并在根组件中，按需导入路由需要的三个组件：

   ```js
   import { HashRouter, Route, Link } from 'react-router-dom'
   ```

3. 在`App.jsx`中，render 函数中，最外层使用`HashRouter`进行包裹：

   ```jsx
   render(){
       return <HashRouter>
       	<div>
           	<h1>大标题</h1>
           </div>
       </HashRouter>
   }
   ```

4. 在 需要的地方，使用`Link`组件创建路由链接，其中，通过`to`属性指定路由地址：

   ```jsx
   <Link to="/home">首页</Link>
   ```

5. 使用`Route`组件创建路由规则，同时注意：Route组件有两重身份：1. 路由规则（path   component）；2. 占位符（用来显示匹配到的组件）

   ```js
   // 导入 Home 组件
   import Home from './components/Home.jsx'

   <Route path="/home" component={Home}></Route>
   ```

   ​

### 路由嵌套



### 路由传参



## 5. 使用AntDesign组件库



## 相关文章

+ [react-router官方文档](https://reacttraining.com/react-router/web/guides/quick-start)