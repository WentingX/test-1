import React from 'react'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return <div>
      <h1>Home组件</h1>
      <button onClick={() => this.goAbout()}>去关于页面</button>
      <button onClick={() => this.getMovie()}>使用 fetch-jsonp 获取 正在热映的电影</button>
    </div>
  }

  goAbout = () => {
    this.props.history.push('/about')
  }

  getMovie = async () => {
    // console.log('ok')
    // 直接使用 fetch-jsonp 结合 Promise 获取数据
    /*  this.$http('https://api.douban.com/v2/movie/in_theaters')
       .then(res => res.json())
       .then(data => console.log(data)) */


    // fetch-jsonp 结合 async 和 await 使用

    const res = await this.$http('https://api.douban.com/v2/movie/in_theaters')
    const data = await res.json()
    console.log(data)
  }
}