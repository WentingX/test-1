<template>
  <div class="checkFile">
    <div class="info">
      <span>交易号： {{ tradeNumber }}</span>
      <span>订单号： {{orderNumber}}</span>
    </div>
    <el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload" style="float:right;">导出</el-button>
    <div class="table"  v-loading="loading">
      <el-table highlight-current-row :data="tableData" style="width: 100%" 
                :cell-class-name="tableCellClassName" @cell-click="cashRufund" row-key="id">
        <el-table-column prop="username" label="用户名" width="100">
        </el-table-column>
        <el-table-column prop="name" label="真实姓名" width="">
        </el-table-column>
        <el-table-column prop="time" label="时间">
        </el-table-column>
        <el-table-column prop="mode" label="交易方式">
        </el-table-column>
        <el-table-column prop="orderType" label="订单类型">
        </el-table-column>
        <el-table-column prop="money" label="转账金额">
        </el-table-column>
        <el-table-column prop="status" :label="label" width="100" >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import API from '@/api/api'
export default {
  
  data () {
    return {
      tradeNumber :'',
      orderNumber:'',
      tableData:[],
      status:'',
      label:"",
      loading:false,
      downloadLoading:false,
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
          if(item.name == '交易成功' && item.children){
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
    this.getData()
  },
  methods:{
    msg(type, txt) {
      this.$message[type]({
        showClose: true,
        message: txt,
        duration: 2000
      });
    },
    getData(){//从后台获取数据
      this.loading = true
      let vm = this
      API.depositChilk(vm.$route.params.id).then(result=>{
        if(result.code == 200){
          vm.status = result.data.status
          if(vm.status =='待退款'){
            vm.$data.label = "操作"
          } else{
            vm.$data.label = "状态"
          }
          let res = result.data
          vm.tradeNumber = res.tradeNumber;
          vm.orderNumber = res.orderNumber;
          vm.tableData = [res]
        } else {
          vm.msg('error','列表获取失败')
        }
        vm.loading = false
      },
      (err) => {
        vm.msg('error','服务器错误')
        vm.loading = false
      })
      return 
    },
    tableCellClassName({ row }) { //添加操作行字体颜色
      if (row.status == '退款') {
        return "return";
      }else if(row.status == "退款成功"){
        return "green";
      }else if(row.status == "退款失败"){
        return "red"
      }else if(row.status == "待退款"){
        return "origin"
      }
    },
    //导出Excel表格
    handleDownload() {
      if(this.tableData.length > 0){
        this.downloadLoading = true
        import ('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['用户名', '姓名', '订单号','状态','交易金额','交易时间']
          const filterVal = ['username','name', 'orderNumber', 'status', 'money','time']
          const data = this.formatJson(filterVal, this.tableData)
          excel.export_json_to_excel(tHeader, data, '提现管理信息表')
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
    cashRufund( row, column, cell, event ){//退款
      let vm = this
      if(column.label === "操作"){
        this.$confirm("确认退款？",{
          type: 'warning',
          lockScroll:false,
          closeOnClickModal:false
        })
        .then(_=>{
          API.cashRefund(vm.$route.params.id).then(result =>{
            if(result.data.code == "200"){
              this.getData()
            }else{
              vm.msg('error','操作失败')
            }
          },(error) => {
            vm.msg('error','服务器错误')
          })
        })
        .catch(_=>{return})
      }
    }
  }
}
</script>

<style lang="scss">
  .checkFile {
    .el-table th, .el-table tr{
      background-color: transparent;
    }
    .active{
      cursor: pointer;
      
    }
    .content-wrap .content-vi{
      height: auto;
    }
    .el-table td:nth-of-type(7){
      &.return{
        color: #ffc731;
        text-decoration: underline;
      }
      &.green{
        color: #4dc036;
      }
      &.red{
        color: #df1f1f;
        text-decoration: underline;
      }
      &.origin{
        color: #ffc731;
        cursor: pointer;
      }
    }
    .el-table::before{
      height: 0;
    }
    background: #fff;
    // padding: 30px 35px;
    .info{
        span{
          display: inline;
          padding-right: 50px;  
          color: #c0c4cc;
        }
    }
    .table{
       border: 1px solid #eee;
       padding: 0 20px;
       margin-bottom:-1px;
       background-color: #e8f5fe;
       margin-top: 48px;
       .el-table{
        .cell{
          text-align: center;
        }
        tr{
          background-color: #e8f5fe;
          color:#bcbcbc;
          th{
            >.is-leaf{
              border-bottom: 2px solid #d9d9d9;
            }
            >.cell{
              color: #48515a;
            }
          }
        }
        >tbody{
          tr{
            td{
              border: none;
            }
          }
        }
        .el-table__empty-block,
        .el-table__row:hover > td{
          background-color:  #e8f5fe;
          // color: #bcbcbc;
        }
       } 
      
    }
  }
  
</style>
