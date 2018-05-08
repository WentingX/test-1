<template>
  <div class="deposit">
    <el-form :inline="true" :model="fundFormInline" class="demo-form-inline form" 
            name="deposit" ref="deposit">
      <p class="title">
        <em>|</em> 信息筛选</p>
      <el-form-item class="uu">
        <el-input size="mini" v-model="keyword" placeholder="输入你想搜索的内容" class="searchInput" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" size="mini" class="buttonInput" @click="allEnsure">搜索</el-button>
      </el-form-item>
        <el-form-item class="name block">

          <el-date-picker v-model="value7" :editable = "false"
                          type="datetimerange" 
                          align="center" 
                          range-separator="~" start-placeholder="开始日期"
                          end-placeholder="结束日期" 
                          size="medium"
                          :default-time="['00:00:00', '23:59:59']"
                          @change="change">
          </el-date-picker>
          <ul>
            <li v-for="(item,$index) in items" @click="selectStyle (item, $index) " :class="{'active':item.active,'unactive':!item.active}" class="date" :key="item.selected">{{item.select}}</li>
          </ul>
        </el-form-item>
      <br/>
      <el-form-item class="name" label="用户名" prop="uerName">
        <el-input clearable size="mini" v-model="fundFormInline.uerName"></el-input>
      </el-form-item>
      <el-form-item class="name" label="姓名" prop="name">
        <el-input clearable size="mini" v-model="fundFormInline.name"></el-input>
      </el-form-item>
      <el-form-item class="name company" label="公司名称" prop="company" >
        <el-input clearable size="mini" v-model="fundFormInline.company"></el-input>
      </el-form-item>
      <el-form-item class="name" label="交易方式" prop="mode">
        <el-select clearable size="mini" v-model="fundFormInline.mode">
          <el-option label="微信转入" value="01" ></el-option>
          <el-option label="支付宝转入" value="02" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="name" label="交易金额" prop="money">
        <el-input clearable size="mini" v-model="fundFormInline.money"></el-input>
      </el-form-item>
      <div class="checkButton">
        <el-button size="mini" class="buttonInput" @click="inquire">查询</el-button>
        <el-button size="mini" class="buttonInput" @click="remove('deposit')">重置</el-button>
      </div>
      <div class="separation"></div>
    </el-form>

        <!-- 数据区域 -->
    <div class="tabs">
      <p class="title">
        <em>|</em> 保证金管理</p>
      <el-table stripe border :data="fundTableData" style="width: 100%;text-align:center;" v-loading="loading">
        <template v-for="column in fundTableColumns">
          <el-table-column :label="column.label" :prop="column.prop" align="center" :key="column.No" :width="column.width" :type="column.type"></el-table-column>
        </template>
        <el-table-column label="操作" prop="" align="center" width="100">
          <template scope="scope">
            <a href="javascript:void(0);" class="view" @click="onDealDetailClick(scope.row)">查看</a>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
      <el-pagination background layout="prev, pager, next" 
                    :page-size="10" :total="total" 
                    @current-change="pagination">
      </el-pagination>
    </div>

  </div>
</template>

<script>
    import API from '@/api/api'
    export default {
      data() {
        return {
          active: false,
          //快捷时间按钮
          items: [{select:'今天',ptime:""},
                  {select:'昨天',ptime:3600 * 1000 * 24},
                  {select:'最近7天',ptime:3600 * 1000 * 24 * 7},
                  {select:'最近30天',ptime: 3600 * 1000 * 24 * 30}
                ],
          flag:false,
          //筛选form表单内容
          fundFormInline: {
            uerName: '',
            name: '',
            company: '',
            mode: '',
            money: '',
            timeStart:'',
            timeEnd:''
          },
          //表格内容
          fundTableData: [],
          //表头
          fundTableColumns: [
              {
                  label: '序号',
                  type:"index",
                  width: '100'
              },{
                  label: '用户名',
                  prop: 'username'
              },{
                  label: '姓名',
                  prop: 'name',
                  width: '100'
              },{
                  label: '订单号',
                  prop: 'orderNumber'
              },{
                  label: '交易方式',
                  prop: 'mode'
              },{
                  label: '交易金额',
                  prop: 'money'
              },{
                  label: '状态',
                  prop: 'status'
              },{
                  label: '交易时间',
                  prop: 'time'
              }
          ],
          value7: [],
          total: 0,
          pageNum: 1,
          temp:"",//提供给分页的搜索参数
          downloadLoading:false,
          keyword:"",
          loading:false,
          flag2:false,
          downloading:false,
          add:false,
          forbid:false,
          open:false,
          examine:false,
        }
      },
      created () {
        let menu = JSON.parse(window.sessionStorage.getItem('menu'))
        menu.forEach((item)=>{
          if(item.name == "资金管理"){
            item.children.forEach(item=>{
              if(item.name == '保证金管理' && item.children){
                item.children.forEach((item)=>{
                  if(item.path == this.$route.path){
                    item.operations.forEach((item)=>{
                      console.log(item)
                      if(item.operationName == '下载'){
                        this.downloading = true
                      }else if(item.operationName == '添加'){
                        this.add = true
                      }else if(item.operationName == '禁用'){
                        this.forbid = true
                      }else if(item.operationName == '开启'){
                        this.open = true
                      }else if(item.operationName == '查看'){
                        this.examine = true
                      }
                    })
                  }
                })
              }
            })
          }
        })
        this.getData()//页面加载渲染所有数据
      },
      methods: {
        msg(type, txt) {
          this.$message[type]({
            showClose: true,
            message: txt,
            duration: 2000
          });
        },
        onDealDetailClick(row) {//查看详情
          // 1. 用户详情存vuex
          this.$store.commit('save_detail_info', row)
          // 2. 动态改变路由的指向
          this.$router.push({
            path: `/checkFile/${row.orderNumber}`
          })
        },
        //重置
        remove(deposit){
          this.keyword = ""
          this.$refs[deposit].resetFields()
          this.$data.value7=""
          this.$data.temp = ""
          this.getData()
        },
        //查询
        inquire(){
          this.$data.temp = ""
          for(let item in this.fundFormInline){
            if(this.fundFormInline[item]!='' && this.fundFormInline[item] != 'NaN-NaN-NaN NaN:NaN:NaN' ){
              this.$data.temp +=`&${item}=${this.fundFormInline[item]}`
            }
          }
          var o  = this.$data.pageNum + this.$data.temp
          this.getData(o)
        },
        getData(paramStr = this.pageNum){//从后台获取数据
          this.flag = false
          this.loading = true
          let vm = this
          API.depositInquire(paramStr).then(result=>{
            if(result.code == "200"){
              let res = result.data
              vm.total = res.total - 0
              res.list.forEach(item => {
                item.money = "￥" + item.money
              });
              vm.$data.fundTableData = res.list
            } else {
              vm.msg('error','获取列表失败')
            }
             vm.loading = false
          },
          (error) =>{
            vm.loading = false
            vm.msg('error','服务器错误')
          })
        },
        pagination(currentPage){//点击分页事件
          this.$data.pageNum = currentPage
          if(this.flag){
            this.allEnsure(this.keyword)
          }else{
            if(this.$data.temp ===""){
              this.getData(this.$data.pageNum)
            }else{ 
              var o  = this.$data.pageNum + this.$data.temp
              this.getData(o)
            }
          }
        },
        //导出Excel表格
        handleDownload() {
          if(this.fundTableData.length > 0){
            this.downloadLoading = true
            import ('@/vendor/Export2Excel').then(excel => {
              const tHeader = ['用户名', '姓名', '订单号', '交易方式', '交易时间','交易金额','状态']
              const filterVal = ['username','name', 'orderNumber', 'mode', 'time', 'money', 'status']
              const data = this.formatJson(filterVal, this.fundTableData)
              excel.export_json_to_excel(tHeader, data, '保证金管理信息表')
              this.downloadLoading = false
            })
          }else{
            this.msg('error','表格无数据')
          }
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => {
              if (j === 'timestamp') {
                  return parseTime(v[j])
              } else {
                  return v[j]
              }
          }))
        },
        //关键字查询
        allEnsure(){
          this.flag = true
          this.loading = true
          let vm = this
          API.allEnsure(vm.keyword).then(result=>{
            if(result.code == "200"){
              let res = result.data
              vm.total = res.total - 0
              res.list.forEach(item => {
                item.money = "￥" + item.money
              });
              vm.$data.fundTableData = res.list
            } else {
              vm.msg('error','获取列表失败')
            }
            vm.loading = false
          },(error) =>{
            vm.loading = false
            vm.msg('error','服务器错误')
          })
        },
        selectStyle(item, index){//日期快捷选择
          let vm = this
          if(this.flag2){
            this.$nextTick(function(){
              this.items.forEach(item =>{
                vm.$set(item,"active",false)
              })
            })
            this.flag2 = false
            return
          }
          const end = new Date();
          const start = new Date();
          if(index == 0){
            let time = end.getHours() * 3600 * 1000 + end.getMinutes() * 60000 + end.getSeconds() * 1000
            start.setTime(start.getTime() -  time);
            this.value7 = [start,end]
          }else{
            start.setTime(start.getTime() -  item.ptime);
            this.value7 = [start,end]
          }
          this.$nextTick(function(){
            this.items.forEach(item =>{
              vm.$set(item,"active",false)
            })
            this.$set(item,"active",true)
          })
        },
        change(val){//日期选择器 值改变后移除快捷选择样式
          if(val){
            this.flag2 = true
            this.selectStyle()
          }
        },
      },
      watch: {
        value7 : function(newVal, oldVal){
          if(newVal){
            this.fundFormInline.timeStart = this.$root.$options.filters.dateFormat(newVal[0])
            this.fundFormInline.timeEnd = this.$root.$options.filters.dateFormat(newVal[1])
          } else {
            this.flag2 = true
            this.selectStyle()
          }
          return 
        }
      }
    }
</script>

<style lang="scss">
.deposit {
  .active{
    color: #38f;
  }
  .unactive{
    color: #606266;
  }
  .content-wrap .content-vi{
    height: auto;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #fff;
  }
  .separation{
    margin: 0 -35px;
    background-color: #f3f4f7;
    width: auto;
    height: 10px;
  }
  p{
    padding: 0;
    margin: 0;
  }
  .tabs{
    background-color: #fff;
    padding-top: 20px;
    >.el-pagination{
      text-align: right;
      font-weight: inherit;
      float: right;
      margin-top: 20px;
    }
    >.filter-item{
      margin-top: 20px;
    }
  }
  .checkButton{
    text-align:center;
    padding-bottom: 20px;
  }
  .title {
    color: #556191;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 16px;
    em {
      color: #88b7e0;
      margin-right: 10px;
    }
  }
  .form {
    background-color: #fff;
    .uu {
      margin-right:10px;
      .searchInput{
        >.el-input__inner{
          width: 365px;
          height: 35px;           
        }
      }
    }
    .buttonInput{
      background: #4A4F63;
      color: white;
      padding: 7px 20px;
      width: 100px;
      height: 35px;
    }
    .checkButton .el-button+.el-button{
      margin-left: 80px;//查询，重置之间的间距
    }
    .name{
      margin-right: 40px
    }
  }
  .block{
    display: inline;
    margin-left: 30px;
    &.name{
      display: inline-block
    }
    .el-input__inner{
      width: 356px;
      height: auto;
    }
    ul{
      display: inline-block;
      margin: 0 0 0 10px;
      padding: 0;
      width: auto;
      height: auto;
    }
  }
  .el-tabs .el-tabs__header .el-tabs__item.is-active{
    background: none;
    color: #373d41;
  }
  .page{
    text-align: right;
    margin-top: 10px;
    .el-pager{
      border: none;
      li{
        min-width: 30px;
        min-height: 28px;
        font-weight: 700;
      }
    }
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color:rgb(243,244,247);
  }
  .el-table thead tr>th{
    background-color:rgb(243,244,247);
    color:rgb(85,97,145);
  }
  .cell>.view{
    color:rgb(51,135,255);
  }
  .el-table td:nth-of-type(5){
    &.stay-cell{
      color: #ffc731;
    }
    &.success-cell{
      color: #4dc036;
    }
    &.failed-cell{
      color: #df1f1f;
    }
  }
  .el-input__inner{
    border-radius: 0;
    border: 1px solid #999;
    width: 140px;
    height: 30px;
  }
  .company{
    .el-input__inner{
      width: 280px;
    }              
  }
  .el-form-item__label{
    padding-right: 20px;
  }
  .el-date-editor .el-range-input{
    height: 24px;
  }
  .date{
    float: left;
    list-style: none;
    width: 80px;
    line-height: 4px;
    cursor: pointer;
  }
}
</style>

