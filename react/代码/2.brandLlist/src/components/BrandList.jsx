import React from 'react'

export default class BrandList extends React.Component {
  constructor() {
    super()
    this.state = {
      list: [] // 品牌列表的空数组
    }
  }

  // 组件将要挂载
  componentWillMount() {
    this.getBrandList()
  }

  render() {
    return <div>
      <h1>品牌列表案例</h1>


      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">添加新品牌</h3>
        </div>
        <div className="panel-body form-inline">

          <div className="input-group">
            <div className="input-group-addon">品牌名称</div>
            <input type="text" className="form-control" ref="brandname" />
          </div>

          <button type="button" className="btn btn-info" onClick={() => this.add()}>添加</button>

        </div>
      </div>


      {/* 品牌列表 */}
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>编号</th>
            <th>品牌名称</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.list.map(item => <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{this.dateFormat(item.ctime)}</td>
              <td>
                <a href="javascript:void(0)" onClick={() => this.delItem(item.id)}>删除</a>
              </td>
            </tr>)
          }
        </tbody>
      </table>

    </div>
  }

  // 获取 品牌列表的 方法
  getBrandList = async () => {
    const { data } = await this.$http('/api/getprodlist')
    this.setState({
      list: data.message
    })
  }

  // 根据Id，删除对应的品牌数据
  delItem = async (id) => {
    const { data } = await this.$http('/api/delproduct/' + id)
    if (data.status === 0) {
      this.getBrandList()
    }
  }

  // 添加新品牌
  add = async () => {
    const brandname = this.refs.brandname.value
    if (brandname.trim().length <= 0) return alert('品牌名称不能为空！')

    // 调用 Ajax 保存到  数据库
    const { data } = await this.$http.post('/api/addproduct', { name: brandname.trim() })
    if (data.status === 0) {
      this.getBrandList()
      this.refs.brandname.value = ''
    }
  }


  // 模拟 私有过滤器
  myFilter2 = () => { }
}