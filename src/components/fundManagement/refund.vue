<template>
  <div class="checkFile">
    <div class="info">
      <span>交易号： {{ tradeNumber }}</span>
      <span>订单号： {{orderNumber}}</span>
    </div>
    <div class="downLoad">
      <a href="javascripr:;" class=" el-icon-download" download=""></a>
    </div>


    <div class="table">
      <el-table highlight-current-row :data="tableData" style="width: 100%">
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
        </el-table-column >
        <el-table-column label="操作" prop="" align="center" width="100">
          <template scope="scope">
            <a href="javascripr:;" class="view" @click="refund">退货</a>
          </template>
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
          tableData: [{
            username: '',
            name: '',
            time: '',
            mode: '',
            orderType: '',
            money: '',
            status: ''
          }]
      }
  },
  created () {
    
    this.getData()
  },
  methods:{
    getData(){//从后台获取数据
      API.depositChilk(this.$route.params.id).then(result=>{
        
        var res=result.data
        this.tradeNumber = res.list.tradeNumber;
        this.orderNumber = res.list.orderNumber;
        console.log(res)
        res.list.forEach(item => {
          if(item.mode =="01"){
            item.mode = "微信转入"
          }else if( item.mode == '02'){
            item.mode = "支付宝转入"
          }
          if(item.orderType =="01"){
            item.orderType = "保证金缴纳"
          }else if( item.orderType == '02'){
            item.orderType = "退款"
          }
          if(item.status == "1043"){
            item.status = '及时到账'
          } else if (item.status == "1041" ){
            item.status = '待退款'
          } else if (item.status == '1040'){
            item.status = '退款成功'
          } else if ( item.status == '1042'){
            item.status = '退款失败'
          }
          return item
        });
        this.tableData=res.list
      })
      return true
    },
    refund(){

    }
  }
}
</script>

<style lang="scss">
  .checkFile {
    .info{
        span{
          display: inline;
          padding-right: 50px;  
          color: #c0c4cc;
        }
    }
    .downLoad{
        a{
          text-decoration: none;
          font-size: 40px;
          font-weight: 300;
          margin: 0 20px 20px 0;
          color: #606266;
          display: block;
          text-align: right;
        }
      
    }
    .table{
       border: 1px solid #eee;
       padding: 0 20px;
       margin-bottom:-1px;
       background-color: #e8f5fe;
       .el-table{
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
            .el-table__row:hover > td{
                background-color:  #e8f5fe;
                color: #bcbcbc;
            }
       } 
      
    }
  }
  
</style>
