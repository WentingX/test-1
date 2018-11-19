import React from 'react' // 在 React V15.5 版本之前，类型校验的能力，和 react 是在一起；
import Types from 'prop-types' // 导入类型校验的包

export default class Counter extends React.Component {

  // 需求1：为外界传递过来的 props 属性值，做类型校验 【使用 静态属性 propTypes 来规定 某些 props 的类型】
  static propTypes = {
    // 如果，外界在使用组件的时候，某个 props 属性是必须要被传递的，则 可以是用 isRequired 来进行标记；
    initcount: Types.number.isRequired // 规定， 外界传递过来的 initcount， 必须是 number，否则，就报错；
  }

  // 需求2： 如果外界在使用组件的时候，没有传递规定的属性值，则 组件内，需要有一个默认的属性值；
  static defaultProps = {
    initcount: 0
  }

  // 组件中，创建阶段的第一个生命周期函数
  // 作用：为组件初始化私有的数据
  constructor(props) {
    super()
    // 注意：在 constructor，如果想访问 props 上的属性，不能直接使用 this.props.***
    // 在构造函数中，访问props, 只能在 constructor(props) 来进行接收
    // console.log(this.props)
    // console.log(props)
    this.state = {
      msg: 'hhh',
      weight: props.initcount
    }
  }

  // 第二个创建阶段的生命周期函数
  componentWillMount() { // 相当于 Vue 中的 created 函数；
    // console.log(this.props.initcount)
    // console.log(this.state.msg)
    // this.myshow()

    // 在此生命周期函数中， 组件的 props 和 state 数据，都已经可以被访问了；
    // 同时 组件上 的 自定义实例方法，也可以被正常访问了；
    // 因此，我们在 React 组件中，如果要发起Ajax请求，最早，可以在 componentWillMount 中发起；
    // 此时页面 还没有开始渲染；
    // console.log(document.getElementById('myh3'))
  }

  // 这是 创建阶段的 第三个生命周期函数；
  // 此时， 虚拟DOM正在被创建；当 render 执行完， 虚拟DOM才创建到内存中；
  render() {
    // console.log(document.getElementById('myh3') && document.getElementById('myh3').innerHTML)
    return <div>
      <button onClick={() => this.add()}>点击按钮让胖哥重量+1</button>
      <h3 id="myh3">当前胖哥的吨位：{this.state.weight}斤</h3>
    </div>
  }

  // 创建阶段最后一个生命周期函数；
  // 此时，组件已经第一次被渲染到页面上；
  componentDidMount() {
    // React 中的 componentDidMount ，就相当于 Vue 中的 mounted 函数；
    /* console.log(document.getElementById('myh3').innerHTML) */
  }


  // ---------------------分割线-----------------------------

  // 运行阶段的第一个生命周期函数
  // 使用这个 函数，可以按需更新页面；减少不必要的 DOM 渲染；
  shouldComponentUpdate(nextProps, nextState) {
    // 需求3：偶数更新页面；奇数不更新页面；
    // return false
    // 注意： 在 shouldComponentUpdate 方法中，如果想获取 最新的 state 值，千万不要使用 this.state.***
    // console.log(this.state.weight)
    // console.log(nextState.weight)
    // if (nextState.weight % 2 === 0) { // 偶数
    //   return true
    // }
    // return false

    // console.log(document.getElementById('myh3').innerHTML)

    return true
  }

  // 运行阶段 第二个生命周期函数 【组件将要被更新】
  componentWillUpdate() {
    // console.log(document.getElementById('myh3').innerHTML)
  }

  componentDidUpdate() {
    // console.log(document.getElementById('myh3').innerHTML)
  }


  // 组件的 porps 被改变，会重新触发 componentWillRevceiveProps
  componentWillReceiveProps(nextProps) { // 组件将要接收新属性
    // console.log('接收到了新属性' + this.props.initcount)
    console.log('nextProps 中的属性值是：' + nextProps.initcount)
    // 注意：如果在 componentWillReceiveProps 生命周期函数中，想要获取最新的 props 数据，
    // 不要使用 this.props.***，因为它是上一次的 props;
    // 最新的应该通过 componentWillReceiveProps(nextProps) 来获取；

    this.setState({
      weight: nextProps.initcount
    })
  }


  myshow = () => {
    console.log('自定义的show方法')
  }

  // 每当点击按钮，就让 吨位 + 1
  add = () => {
    // this.props.initcount++

    this.setState({
      weight: this.state.weight + 1
    })
  }
}