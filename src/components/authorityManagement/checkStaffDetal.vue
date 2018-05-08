<template>
  <div class="staffDetal">
      <div class="order">
        <span>个人信息</span>
      </div>
      <el-table :data="detalData" stripe border style="margin-bottom:20px;"
                v-loading="loading1">
        <el-table-column prop="jobNumber" label="员工工号"></el-table-column>
        <el-table-column prop="name" label="员工姓名"></el-table-column>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
            {{{'0':'男','1':'女'}[detalData[0].gender]}}
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="员工权限"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="email" label="员工邮箱"></el-table-column>
        <el-table-column prop="accountInfo" label="账户信息"></el-table-column>
        <el-table-column prop="status" label="账户状态">
          <template slot-scope="scope">
            {{{'0':'禁用','1':'启用'}[detalData[0].status]}}
          </template>
        </el-table-column>
      </el-table>
      <div class="order">
        <span>服务订单</span>
      </div>
      <el-table :data="serverOrder" stripe border 
                v-loading="loading2">
        <el-table-column prop="orderNumber" label="订单号"></el-table-column>
        <el-table-column prop="content" label="负责订单内容">
          <template slot-scope="scope">
            {{{'01':'信息','02':'需求','03':'撮合'}[serverOrder[0].content]}}
          </template>
        </el-table-column>
        <el-table-column prop="nowStatus" label="目前订单状态"></el-table-column>
        <el-table-column prop="updateDate" label="最后操作时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" @click.prevent="dialogck2 = true,checkDetal2(scope.row)" >查看</a>
            <a href="javascript:;" @click.prevent="dialogOrder = true,getemployeeLists(scope.row)" v-if="scope.row.nowStatus!=='已转移' && scope.row.nowStatus">订单转移</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination background layout="prev, pager, next" :total="total2" @current-change="Orderpagination" :page-size="10" :current-page.sync="currentPage2"> </el-pagination>
      </div>
    <el-dialog :visible.sync="dialogck2" width="60%" :before-close="handleCheck2" :showClose = "false" :lock-scroll="false" @close="ck2Close">
      <a href="javascript:;" @click.prevent="dialogck2 = false" class="el-icon-close icoClose"></a>
      <div class="emple">
        <span>当前信息</span>
      </div>
      <el-table :data="detalData2" stripe border style="margin-top:20px" 
                v-loading="loading3">
        <el-table-column prop="orderNumber" label="订单号"></el-table-column>
        <el-table-column prop="employeeName" label="姓名"></el-table-column>
        <el-table-column prop="telephone" label="手机号码"></el-table-column>
        <el-table-column prop="jobNumber" label="工号"></el-table-column>
        <el-table-column prop="matchStatus" label="订单状态"></el-table-column>
        <el-table-column prop="roleName" label="权限"></el-table-column>
        <el-table-column prop="operation" label="操作员"></el-table-column>
        <el-table-column prop="updateDate" label="最后转移时间"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination background layout="prev, pager, next" :total="total4" @current-change="nowInfoPagination" :current-page.sync="currentPage3" :page-size="3" > </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogck2 = false">退 出</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogOrder" width="60%" :lock-scroll="false" :before-close="handleOrder" :showClose = "false" @close="orderClose">
      <a href="javascript:;" @click.prevent="dialogOrder = false" class="el-icon-close icoClose"></a>
      <div v-if="detalData2.length > 0">
        <div class="emple">
          <span>当前信息</span>
        </div>
        <el-table :data="detalData2" stripe border style="margin-top:20px"
                v-loading="loading3">
          <el-table-column prop="orderNumber" label="订单号"></el-table-column>
          <el-table-column prop="employeeName" label="姓名"></el-table-column>
          <el-table-column prop="telephone" label="手机号码"></el-table-column>
          <el-table-column prop="jobNumber" label="工号"></el-table-column>
          <el-table-column prop="matchStatus" label="订单状态">
            <template slot-scope="scope">
              <span :class="{'已转移':'close'}[scope.row.matchStatus]">{{scope.row.matchStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="roleName" label="权限"></el-table-column>
          <el-table-column prop="operation" label="操作员"></el-table-column>
          <el-table-column prop="updateDate" label="最后转移时间"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination background layout="prev, pager, next" :total="total4" @current-change="nowInfoPagination2" :current-page.sync="currentPage3" :page-size="3" > </el-pagination>
        </div>
      </div>
      <div class="emple">
        <span>员工列表</span>
      </div>
      <el-table :data="employeeLists" stripe border style="margin-top:20px"
                v-loading="loading5">
        <el-table-column prop="name" label="员工姓名"></el-table-column>
        <el-table-column prop="jobNumber" label="工号"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="taskNumber" label="当前任务数量"></el-table-column>
        <el-table-column prop="roleName" label="权限"></el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <a href="javascript:;" @click.prevent="removePublish(scope.row)">转移任务</a>
        </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination background layout="prev, pager, next" :total="total3" @current-change="removepagination" :current-page.sync="currentPage1" :page-size="3" > </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOrder = false">退 出</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from '@/api/api'
export default {
  data() {
    return {
      detalData:[],
      serverOrder:[],//服务订单
      detalData2:[],
      employeeLists:[],
      dialogck2:false,
      dialogOrder:false,
      total2:0,
      total3:0,
      total4:0,
      loading1:false,
      loading2:false,
      loading3:false,
      loading4:false,
      loading5:false,
      temp2:"",//提供给查看里的分页搜索参数
      currentPage1:0,
      currentPage2:0,
      currentPage3:0,
      removePublishPar:{},//任务转移 保存 订单信息
      downloading:false,
      add:false,
      forbid:false,
      open:false,
      examine:false,
    }
  },
  methods:{
    msg(type, txt) {
      this.$message[type]({
        showClose: true,
        message: txt,
        duration: 2000
      });
    },
    handleCheck2(){},//查看中的查看的弹窗
    handleOrder(){},//订单转移弹窗
    ck2Close(){//关闭查看中的查看的弹窗时数据清空
      this.detalData2 = []
      this.removePublishPar = {}
    },
    orderClose(){//关闭订单转移弹窗时数据清空
      this.removePublishPar = {}
    },
    getdetal(id){//获取员工详情信息
      this.loading1 = true
      let vm = this 
      API.employeeDetail(id).then(result =>{
        if(result.code == "200" && result.data !== null){
          vm.$data.detalData = [result.data]
        }else{
          vm.msg('error','列表获取失败')
        }
        vm.loading1 = false
      },(error) =>{
        vm.msg('error','服务器错误')
        vm.loading1 = false
      }) 
    },
    getCheckDetal(id,pageNum){//获取服务订单信息
      this.loading2 = true
      let vm = this
      API.serverOrder(id + "?pageNum=" + pageNum + "&pageSize=10").then(result =>{
        if(result.code == "200"){
          vm.total2 = Number(result.data.total) 
          vm.serverOrder = result.data.list
        }else{
          vm.msg('error','列表获取失败')
        }
         vm.loading2 = false
      },(error) => {
        vm.msg('error','服务器错误')
        vm.loading2 = false
      })
    },
    Orderpagination(currentPage){//服务订单 分页
      this.getCheckDetal(this.temp2,currentPage)
    },
    removepagination(currentPage){//员工列表 分页
      let paramStr = "?id=" + this.$data.removePublishPar.publishId + "&pageSize=3&pageNum=" + currentPage + "&type=" + this.$data.removePublishPar.content
      this.getemployeeData(paramStr)
    },
    nowInfoPagination(currentPage){//查看里 分页
      var paramStr = this.$data.removePublishPar.publishId + "?type=" + this.$data.removePublishPar.content+"&pageSize=3&pageNum="+currentPage;
      let vm = this
      this.getNowinfo(paramStr)
    },
    nowInfoPagination2(currentPage){//订单转移里当前信息 分页
      var paramStr = this.$data.removePublishPar.publishId + "?type=" + this.$data.removePublishPar.content+"&pageSize=3&pageNum="+currentPage;
      let vm = this
      this.getNowinfo(paramStr)
    },
    checkDetal2(row){//转移-当前信息
      this.$data.currentPage3 = 1
      if(row){
        this.removePublishPar = row
      }
      var paramStr = row.publishId + "?id="+ row.publishId +"&type=" + row.content+"&pageNum=1&pageSize=3";
      this.getNowinfo(paramStr)
    },
    getNowinfo(paramStr){
      let vm = this
      this.loading3 = true
      API.nowInfo(paramStr).then(result =>{
        if(result.code == "200"){
          vm.total4 = Number(result.data.total)
          vm.detalData2 = result.data.list
        }else{
          vm.msg('error','获取列表失败')
        }
        vm.loading3 = false
      },
      (error) => {
        vm.msg('error','服务器错误')
        vm.loading3 = false
      })
    },
    getemployeeLists(row){//获取员工列表
      this.$data.currentPage1 = 1
      if(row){
        this.removePublishPar = row
      }
      let vm = this
      let paramStr = "?id=" + this.$data.removePublishPar.publishId + "&pageNum=1&pageSize=3&type=" + this.$data.removePublishPar.content
      this.checkDetal2(row)
      this.getemployeeData(paramStr)
    },
    getemployeeData(par){//获取员工名单
      this.loading5 = true
      let vm = this
      API.employeeLists(par).then(result => {
        if(result.code == "200"){
          vm.total3 = Number(result.data.total) 
          vm.employeeLists = result.data.list
        }else{
          vm.msg('error','列表获取失败')
        }
         vm.loading5 = false
      },(error)=>{
        vm.msg('error','服务器错误')
        vm.loading5 = false
      })
    },
    removePublish(row){//派发转移
      this.$confirm("确认转移？",{
        lockScroll:false,
        closeOnClickModal:false
      })
      .then(_=>{
        let par1 = {
            employeeId:row.id,
            orderId:this.removePublishPar.publishId,
            orderNumber:this.removePublishPar.orderNumber,
            duty:row.roleId,
            operation:JSON.parse(window.sessionStorage.getItem('access-user')).userid,
            type:this.$data.removePublishPar.content,
        }
        let parStr = [];
				for(let i in par1) {
					parStr.push(`${i}=${par1[i]}`);
				}
				parStr = parStr.join('&');
        let vm = this
        API.removePublish(parStr).then(result => {
            if(result.data.code == "200"){
              this.checkDetal2(this.$data.removePublishPar)
              let paramStr = "?id=" + this.$data.removePublishPar.publishId + "&pageNum=1&pageSize=3&type=" + this.$data.removePublishPar.content
              this.getemployeeData(paramStr)
            }else{
              vm.msg('error','操作失败')
            }
        },error=>{
          vm.msg('error','服务器错误')
        })
      })
      .catch(_=>{return})
    },
  },
  created () {
    let menu = JSON.parse(window.sessionStorage.getItem('menu'))
    menu.forEach((item)=>{
      if(item.name == "权限管理"){
        item.children.forEach(item=>{
          if(item.name == '员工管理' && item.children){
            item.children.forEach((item)=>{
              if(item.path == this.$route.path){
                item.operations.forEach((item)=>{
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
    let paramStr = this.$route.params.id
    this.temp2 = paramStr
    this.getCheckDetal(paramStr,1)
    this.getdetal(paramStr)
    this.$data.currentPage2 = 1
  },
}
</script>

<style type="sass">

.v-modal{
  z-index: 2000 !important;
}
.content-wrap .content-vi{
	height: auto;
}
.staffDetal .emple{
    background: #4a4f63;
    text-align: left;
    padding: 20px 20px 10px;
    margin: 20px 0;
}
.staffDetal .emple span{
  line-height: 24px;
  font-size: 18px;
  color:#fff;
}
.staffDetal .el-dialog__body{
  padding: 0px;
}
.staffDetal .icoClose{
  text-decoration: none;
  color: #909399;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 99;
}
.staffDetal .el-table--striped .el-table__body tr.el-table__row--striped td{
  background: transparent;
}
.staffDetal .order span{
  color: #556191;
  border-left: 2px solid #88b7e0;
  padding-left: 20px;
}
.staffDetal .el-table th {
    background: #f5f6fa;
}
.staffDetal .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: transparent;
  }
.staffDetal .el-form--inline .el-form-item__label{
  width: 82px;
}
.staffDetal .el-form--inline .el-form-item{
  vertical-align: baseline;
}
.staffDetal .open{
  color: #38f;
}
.staffDetal .close{
  color:  #df1f1f;
}
.staffDetal .el-row li {
  float: left;
  list-style: none;
  margin-left: 22px;
}
.staffDetal .el-button {
  width: 100px;
  height: 35px;
  background-color: #4a4f63;
  border: none;
  font-size: 16px;
  line-height: 0px;
  color: #ffffff;
  padding: 0;
  margin-left: 34px;
  border-radius: 0px;
}
.staffDetal .el-table {
  width: 97%;
  margin: 20px 0 0 20px;
  text-align: center;
  position: relative;
}
.staffDetal .el-checkbox__inner {
  display: inline-block;
  position: relative;
  border: 1px solid red;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #fff;
  z-index: 1;
}
.staffDetal .el-table th>.cell {
  text-align: center;
}
.staffDetal .el-table--enable-row-hover .el-table__row td:nth-of-type(6) .disabled {
  color: red;
}
.staffDetal .el-table--enable-row-hover .el-table__row td:nth-of-type(6) .view {
  margin: 0px 60px 0px 60px;
}
.staffDetal .el-table--enable-row-hover .el-table__row:nth-of-type(even) {
  background: #f5f6fa;
}
.staffDetal .block {
  text-align: right;
  margin: 10px 17px 0 0;
}
.staffDetal .el-dialog__wrapper .el-dialog__header {
  padding: 0px;
}
.staffDetal .el-dialog__wrapper .el-dialog__header .el-dialog__title {
  color: #FFFFFF;
}
.staffDetal .el-dialog__wrapper .el-dialog__footer {
  text-align: center;
  margin-right: 28px;
}

</style>
