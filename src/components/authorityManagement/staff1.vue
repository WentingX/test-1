<template>
  <!--员工-->
  <div class="staff">
    <el-row class="staff_top">
      <el-form :inline="true" :model="inquireData" class="demo-form-inline form" style="margin-left: 20px;display:inline-block">
        <el-form-item label="员工工号：" >
          <el-input size="mini" v-model="inquireData.jobNumber"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名：" >
          <el-input size="mini" v-model="inquireData.name"></el-input>
        </el-form-item>
        <el-form-item label="员工权限：" >
          <el-input size="mini" v-model="inquireData.role"></el-input>
        </el-form-item>
        <el-form-item label="员工状态：" >
          <el-select size="mini" v-model="inquireData.status" clearable>
            <el-option label="启用" value="1" ></el-option>
            <el-option label="禁用" value="0" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-search" class="search" @click="inquire">搜索</el-button>
      <el-button type="primary" class="search" @click="restInquire">重置</el-button>
      <br/>
      <el-button type="primary" class="increa" @click="dialogincrea = true,addStaff()">增加</el-button>
      <el-dialog title="员工新增" :visible.sync="dialogincrea" :before-close="handleincrea" width="20%" @close="addClose" :showClose = "false">
        <a href="javascript:;" @click.prevent="addEClose()" class="el-icon-close icoClose"></a>
        <el-row class="xq">
          <el-form :inline="true" :model="addData" class="demo-form-inline form">
            <el-form-item label="员工工号：" >
              <el-input size="mini" v-model="addData.jobNumber" :disabled="true" name="jobNumber"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名：" >
              <el-input size="mini" v-model="addData.name" clearable  name="name"></el-input>
            </el-form-item>
            <el-form-item label="性 别：" >
              <el-select size="mini" v-model="addData.gender" clearable name="gender">
                <el-option label="男" value="0" ></el-option>
                <el-option label="女" value="1" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工权限：" >
              <el-select size="mini" v-model="roleId" clearable name="roleId">
                <el-option
                  v-for="item in role"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码：" >
              <el-input size="mini" v-model="addData.phone" clearable name="phone"></el-input>
            </el-form-item>
            <el-form-item label="员工邮箱：" >
              <el-input size="mini" v-model="addData.email" clearable name="email"></el-input>
            </el-form-item>
            <el-form-item label="账户信息：">
              <el-input size="mini" v-model="addData.accountInfo" clearable name="accountInfo"></el-input>
            </el-form-item>
            <el-form-item label="账户状态：" >
              <el-select size="mini" v-model="addData.status" clearable name="status">
                <el-option label="启用" value="1" ></el-option>
                <el-option label="禁用" value="0" ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-row>
        <el-button @click="addEmployees()">确定添加</el-button>
        <el-button @click="dialogincrea = false">取 消</el-button>
      </el-dialog>
      <el-button type="primary" class="delete" @click="deleteMenu">删除</el-button>
    </el-row>
    <el-row class="staff_buttom">
      <div class="liebiao">
        <p>员工列表</p>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" 
                border class="class" style="text-align: center" v-loading="loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="JOB_NUMBER" label="员工工号" align="center"></el-table-column>
        <el-table-column prop="NAME" label="员工姓名" align="center"></el-table-column>
        <el-table-column prop="ROLE_NAME" label="员工权限" align="center"></el-table-column>
        <el-table-column prop="STATUS" label="员工状态" align="center">
          <template scope="scope">
              <span :class="{'close':(scope.row.STATUS === '禁用'),'open':(scope.row.status === '启用')}">{{scope.row.STATUS}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="operat" label="操作" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" class="close" @click.prevent="clickOffOn(scope.row.ID)" v-if="scope.row.STATUS == '启用'">禁用</a>
            <a href="javascript:;" class="open" @click.prevent="clickOffOn(scope.row.ID)" v-if="scope.row.STATUS == '禁用'">开启</a>
            <a href="javascript:;" class="chakan open" @click.prevent="dialogview = true,checkDetal(scope.row)" style="margin-left: 27px;">查看</a>
            <a href="javascript:;" class="modify open" @click.prevent="dialogmodify = true,modifyDetal(scope.row)" style="margin-left: 27px;" width="20%">修改</a>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div class="block">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="pagination" :page-size="3" > </el-pagination>
    </div>

    <el-dialog title="个人信息" :visible.sync="dialogview" :before-close="handleview" width="65%" :showClose = "false" top="10vh" @close="viewClose">
      <a href="javascript:;" @click.prevent="dialogview = false" class="el-icon-close icoClose"></a>
      <el-table :data="detalData" stripe border style="margin-top:20px">
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
      <el-table :data="serverOrder" stripe border >
        <el-table-column prop="orderNumber" label="订单号"></el-table-column>
        <el-table-column prop="content" label="负责订单内容"></el-table-column>
        <el-table-column prop="nowStatus" label="目前订单状态"></el-table-column>
        <el-table-column prop="updateDate" label="最后操作时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" @click.prevent="dialogck2 = true,checkDetal2(scope.row)" >查看</a>
            <a href="javascript:;" @click.prevent="dialogOrder = true,getemployeeLists(scope.row)">订单转移</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination background layout="prev, pager, next" :total="total2" @current-change="Orderpagination" :page-size="3" :current-page.sync="currentPage2"> </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogview = false">退 出</el-button>
        </span>
    </el-dialog>
    <el-dialog title="当前信息" :visible.sync="dialogck2" width="60%" :before-close="handleCheck2" :showClose = "false" @close="ck2Close">
      <a href="javascript:;" @click.prevent="dialogck2 = false" class="el-icon-close icoClose"></a>
      <el-table :data="detalData2" stripe border style="margin-top:20px">
        <el-table-column prop="orderNumber" label="订单号"></el-table-column>
        <el-table-column prop="employeeName" label="姓名"></el-table-column>
        <el-table-column prop="telephone" label="手机号码"></el-table-column>
        <el-table-column prop="jobNumber" label="工号"></el-table-column>
        <el-table-column prop="matchStatus" label="订单状态"></el-table-column>
        <el-table-column prop="roleName" label="权限"></el-table-column>
        <el-table-column prop="operation" label="操作员"></el-table-column>
        <el-table-column prop="updateDate" label="最后转移时间"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogck2 = false">退 出</el-button>
      </span>
    </el-dialog>
    <el-dialog title="员工列表" :visible.sync="dialogOrder" width="60%" :before-close="handleOrder" :showClose = "false" @close="orderClose">
      <a href="javascript:;" @click.prevent="dialogOrder = false" class="el-icon-close icoClose"></a>
      <el-table :data="employeeLists" stripe border style="margin-top:20px">
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
    <el-dialog title="员工修改" :visible.sync="dialogmodify" :before-close="handlemodify" width="20%" :showClose = "false" @close="viewClose" class="info">
      <a href="javascript:;" @click.prevent="baseClose()" class="el-icon-close icoClose"></a>
      <el-row class="xq">
        <el-form :inline="true" :model="modifyData" class="demo-form-inline form">
          <el-form-item label="员工工号：" >
            <el-input size="mini" v-model="modifyData.jobNumber" :disabled="true" name="jobNumber"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名：" >
            <el-input size="mini" v-model="modifyData.name" name="name" clearable></el-input>
          </el-form-item>
          <el-form-item label="性 别：">
            <el-select size="mini" v-model="modifyData.gender" name="gender" clearable>
              <el-option label="男" value="0" ></el-option>
              <el-option label="女" value="1" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工权限：" >
            <el-select size="mini" v-model="modifyData.roleId" clearable name="roleId" >
              <el-option
                v-for="item in role"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码：" >
            <el-input size="mini" v-model="modifyData.phone" clearable name="phone"></el-input>
          </el-form-item>
          <el-form-item label="员工邮箱：" >
            <el-input size="mini" v-model="modifyData.email" clearable name="email"></el-input>
          </el-form-item>
          <el-form-item label="账户信息：">
            <el-input size="mini" v-model="modifyData.accountInfo" clearable name="accountInfo"></el-input>
          </el-form-item>
          <el-form-item class="xinxi">
            <span>密码：</span>
            <el-button @click="sendPassword" style="width:auto;padding:0 5px;">发送新密码至邮箱</el-button>
          </el-form-item>
          <el-form-item label="账户状态：" >
            <el-select size="mini" v-model="modifyData.status" clearable name="status1">
              <el-option label="启用" value="1" ></el-option>
              <el-option label="禁用" value="0" ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-button @click="modifyEmployees()">确定修改</el-button>
      <el-button @click="dialogmodify = false">取 消</el-button>
    </el-dialog>
  </div>
</template>

<style type="sass">
.v-modal{
  z-index: 2000 !important;
}
.content-wrap .content-vi{
	height: auto;
}
.staff .el-dialog__body{
  padding: 0px;
}
.staff .icoClose{
  text-decoration: none;
  color: #909399;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 99;
}
.staff .el-table--striped .el-table__body tr.el-table__row--striped td{
  background: transparent;
}
.staff .order{
  background: #4a4f63;
  text-align: left;
  padding: 20px 20px 10px;
  margin: 20px 0;
}
.staff .order span{
  line-height: 24px;
  font-size: 18px;
  color:#fff;
}
.staff .el-table th {
    background: #f5f6fa;
}
.staff .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: transparent;
  }
.staff .el-form--inline .el-form-item__label{
  width: 82px;
}
.staff .el-form--inline .el-form-item{
  vertical-align: baseline;
}
.staff .open{
  color: #38f;
  
}
.staff .close{
  color:  #df1f1f;
}

.staff .el-row li {
  float: left;
  list-style: none;
  margin-left: 22px;
}

.staff .el-input {
  width: 200px;
  height: 26px;
  background-color: #ffffff;
}

.staff .el-input__inner {
  height: 30px;
  border-radius: 0px;
}

.staff .el-button {
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

.staff .search {
  margin-top: 0px;
}

.staff .el-button+.increase {
  margin-left: 56px;
}

.staff .liebiao {
  border-left: 2px solid #88b7e0;
  margin: 20px;
}

.staff .liebiao p {
  margin-left: 20px;
  color: #556191;
  font-size: 18px;
}

.staff .el-table {
  width: 97%;
  margin-left: 20px;
  text-align: center;
  position: relative;
}
.staff .info .el-dialog__body{
  padding: 3px 0px 16px 46px;
}
.staff .el-checkbox__inner {
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

.staff .el-table th>.cell {
  text-align: center;
}

.staff .el-table--enable-row-hover .el-table__row td:nth-of-type(5) {
  color: #3385ff;
}

.staff .el-table--enable-row-hover .el-table__row td:nth-of-type(6) .disabled {
  color: red;
}

.staff .el-table--enable-row-hover .el-table__row td:nth-of-type(6) .view {
  margin: 0px 60px 0px 60px;
}

.staff .el-table--enable-row-hover .el-table__row:nth-of-type(even) {
  background: #f5f6fa;
}

.staff .block {
  text-align: right;
  margin: 10px 17px 0 0;
}
.staff .el-dialog__wrapper{
  /* overflow: visible; */
}
.staff_top .el-dialog__wrapper .el-dialog {
  position: relative;
  margin: 0 auto;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.staff .el-dialog__wrapper .el-dialog__header {
  background: #4a4f63;
  text-align: left;
}

.staff .el-dialog__wrapper .el-dialog__header .el-dialog__title {
  color: #FFFFFF;
}
.staff_buttom .el-dialog__wrapper .el-dialog__body,
.staff_top .el-dialog__wrapper .el-dialog__body {
  width: 100%;
  height: 75%;
  padding: 0;
  text-align: left;
  padding-bottom: 20px;
  text-align: center;
}

.staff_top .el-dialog__wrapper .el-dialog__body .xq .xinxi {
  width: 100%;
  height: 20px;
  margin-top: 30px;
  display: -webkit-flex;
  margin-left: 30px;
}

.staff_top .el-dialog__wrapper .el-dialog__body .xq .xinxi div {
  width: 25%;
}

.staff_top .el-dialog__wrapper .el-dialog__body .xq .xinxi button {
  width: 120px;
  height: 25px;
  margin: 0;
  border-radius: 0;
  color: #ffffff;
  font-size: 14px;
}

.staff_top .el-dialog__wrapper .el-dialog__body .xq .xinxi input {
  width: 143px;
  height: 17px;
}

.staff_top .el-dialog__wrapper .el-dialog__body .xq .xinxi select {
  width: 100px;
  height: 20px;
}

.staff_top .el-dialog__wrapper .el-dialog__body .xq .xinxi select,
input {
  padding-left: 5px;
}

.staff .el-dialog__wrapper .el-dialog__footer {
  text-align: center;
  margin-right: 28px;
}

.staff_buttom .el-dialog__wrapper .el-dialog {
  position: relative;
  margin: 0 auto;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.staff_buttom .el-dialog__wrapper .el-dialog__body .xq {
  padding-top: 15px;
}

.staff_buttom .el-dialog__wrapper .el-dialog__body .xq .xinxi {
  width: 100%;
  height: 20px;
  margin-bottom: 22px;
  display: -webkit-flex;
}

.staff_buttom .el-dialog__wrapper .el-dialog__body .xq .xinxi div {
  margin: 0px 14px 0 72px;
}

.staff_buttom .el-dialog__wrapper .el-dialog__body .xq .xinxi button {
  width: 120px;
  height: 30px;
  margin: 0;
  border-radius: 0;
  color: #ffffff;
  font-size: 14px;
}

.staff_buttom .el-dialog__wrapper .el-dialog__body .xq .xinxi input {
  width: 143px;
  height: 17px;
}

.staff_buttom .el-dialog__wrapper .el-dialog__body .xq .xinxi select {
  width: 100px;
  height: 20px;
}

.staff_buttom .el-dialog__wrapper .el-dialog__body .xq .xinxi select,
input {
  padding-left: 5px;
}

</style>

<script>
import API from '@/api/api'
export default {
  data() {
    return {
      tableData: [],//列表
      multipleSelection: [],
      dialogview: false,
      dialogmodify: false,
      dialogincrea: false,
      dialogck2:false,
      dialogOrder:false,
      currentPage1:0,
      currentPage2:0,
      inquireData:{//查询参数
        name:"",
        jobNumber:"",
        role:"",
        status:"",
      },
      serverOrder:[],//服务订单
      loading:false,
      pageNum:1,
      total:0,
      total2:0,
      total3:0,
      temp:"",//提供给分页的搜索参数
      temp2:"",//提供给查看里的分页搜索参数
      handleSelection:{
        ids:''
      },
      role:[],
      roleId:"",
      addData:{//增加功能
        jobNumber: "",
        name: "",
        gender: "",
        phone: "",
        email: "",
        accountInfo: "",
        createdUserId: "",
        roleId: "",
        status: ""
      },
      detalData:[],
      detalData2:[],
      employeeLists:[],
      removePublishPar:{},
      modifyData:{//修改参数
        id:"",
        name: "",
        gender: "",
        phone: "",
        email: "",
        accountInfo: "",
        roleId: "",
        status: "",
        userId:""
      },
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
			if(item.name == "权限管理"){
				item.children.forEach(item=>{
					if(item.name == '员工管理' && item.children){
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
  methods: {
    handleSelectionChange(val) {//复选框
      this.multipleSelection = val;
      var o = []
      this.multipleSelection.forEach(item => {
        o.push(item.ID)
      })
      this.handleSelection.ids = o
    },
    deleteMenu(){//删除菜单
      if(this.handleSelection.ids == ""){
        this.$message.error({
          showClose: true,
          message: '请选择要删除的菜单',
          duration: 2000
        })
        return
      }
      let paramStr = "ids=" + this.handleSelection.ids
      this.$confirm("确认删除？")
      .then(_=>{
        this.loading = true
        let vm = this
        API.deleteEmployee(paramStr).then(result => {
          
          if(result.code == "200"){
            vm.loading = false
            vm.getData()
          }else{
            vm.loading = false
            vm.$message.error({
              showClose: true,
              message: '删除失败',
              duration: 2000
            })
            return
          }
        })
      })
      .catch(_=>{

      })
    },
    //查看的弹窗
    handleview() {},
    //修改的弹窗
    handlemodify() {},
    baseClose(){
      this.$confirm("确认退出？")
      .then(_=>{
        this.dialogmodify = false
      })
      .catch(_=>{})
    },
    //增加的弹窗
    handleincrea() {},
    addClose(){//关闭增加弹窗时数据清空
      for(let i in this.addData){
        this.addData[i] = ""
      };
      this.roleId = "";
    },
    addEClose(){
      this.$confirm("确认退出？")
      .then(_=>{
        this.dialogincrea = false
      })
      .catch(_=>{})
    },
    viewClose(){//关闭查看弹窗时数据清空
      this.detalData = []
      this.serverOrder = []
    },
    ck2Close(){//关闭查看中的查看的弹窗时数据清空
      this.detalData2 = []
    },
    orderClose(){//关闭订单转移弹窗时数据清空
      this.removePublishPar = {}
    },
    handleCheck2(){},//查看中的查看的弹窗
    handleOrder(){},//订单转移弹窗
    getData(paramStr = this.$data.pageNum){//获取员工列表数据
      this.loading = true
      let vm = this
      API.employeesList(paramStr).then( result => {
        if(result.code == "200"){
          vm.loading = false
          var res = result.data
          vm.total = parseInt(res.total)
          res.list.forEach(item => {
            if(item.STATUS == 1){
              item.STATUS = "启用"
            } else if(item.STATUS == 0){
              item.STATUS = "禁用"
            }
          })
          vm.tableData = res.list
        }
      },
      function(err) {
        vm.loading = false
        vm.$message.error({
          showClose: true,
          message: '列表获取失败',
          duration: 2000
        });
      })
    },
    clickOffOn(ID){//菜单禁用、开启
      this.loading = true
      let vm = this
      API.employeesOffOn(String(ID)).then(result => {
        if(result.code == "200"){
          vm.loading = false
          var o = vm.$data.pageNum + vm.$data.temp
          vm.getData(o)
        }else{
          vm.loading = false
          vm.$message.error({
            showClose: true,
            message: '操作失败',
            duration: 2000
          })
          return
        }
      })
    },
    pagination( currentPage ){//分页
      this.$data.pageNum = currentPage
      if( this.$data.temp === "" ){
        this.getData( this.$data.pageNum )
      }else{ 
        var o = this.$data.pageNum + this.$data.temp
        this.getData(o)
      }
    },
    inquire(){//查询
      this.$data.temp = ""
      for(let item in this.inquireData){
        if(this.inquireData[item]!='' && this.inquireData[item] != 'NaN-NaN-NaN NaN:NaN:NaN' ){
          this.$data.temp +=`&${item}=${this.inquireData[item]}`
        }
      }
      var o  = this.$data.pageNum + this.$data.temp
      this.getData(o)
    },
    restInquire(){//重置
      for(let item in this.inquireData){
        this.inquireData[item] = ""
      }
      this.temp = ""
      this.getData()
    },
    addStaff(){//初始化增加的弹窗
      this.addData.gender="0";
      this.addData.status="1"
      let vm = this;
      API.jobNumber().then( result => {//工号自动生成
        if(result.code == "200"){
          vm.addData.jobNumber = result.data
        }
      })
      API.role().then( result => {//权限种类自动生成
        if(result.code == "200"){
          vm.role = result.data
        }
      })
    },
    getAddParams(paramD){//获取添加菜单的参数
      if(paramD.roleId == ""){
        paramD.roleId = this.roleId
      }
      var o =''
      for( let item in paramD){
        if( paramD[item] == ''){
          this.$message.error({
            showClose: true,
            message: '有选项为空',
            duration: 2000
          })
          return
        }
        if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(paramD.phone))){
          this.$message.error({
            showClose: true,
            message: '不是完整的11位手机号或者正确的手机号前七位',
            duration: 2000
          })
          return
        }
        if(!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(paramD.email))){
          this.$message.error({
            showClose: true,
            message: '您输入的电子邮件地址不合法',
            duration: 2000
          })
          return
        }
        o += `&${item}=${paramD[item]}`
      }
      o = o.replace("&","")
      return o
    },
    addEmployees(){//增加
      this.addData.createdUserId = JSON.parse(sessionStorage.getItem('access-user')).userid
      let paramStr =  this.getAddParams(this.addData)
      if(paramStr == undefined){
        return
      }
      console.log(paramStr)
      this.$confirm("确认增加？",{
        type: 'warning',
      })
      .then(_=>{
        let vm = this
        API.addEmployees(paramStr).then( result => {
          if(result.data.code == "200"){
            vm.getData()
          }else{
            vm.$message.error({
              showClose: true,
              message: result.data.error,
              duration: 2000
            })
          }
        })
        this.dialogincrea = false
      })
      .catch(_=>{})
    },
    getdetal(id){//获取员工详情信息
      for(let item in this.modifyData){
        this.modifyData[item] = ""
      }
      let vm = this 
      API.role().then( result => {
        if(result.code == "200"){
          vm.role = result.data
        }
      })
      API.employeeDetail(id).then(result =>{
        if(result.code == "200" && result.data !== null){
          vm.$data.detalData = [result.data]
          vm.$data.modifyData = result.data
        }else{
          vm.$message.error({
            showClose: true,
            message: '无数据',
            duration: 2000
          })
          return
        }
      }) 
    },
    checkDetal(row){//查看
      this.temp2 = row.ID
      this.getCheckDetal(row.ID,1)
      this.getdetal(row.ID)
      this.$data.currentPage2 = 1
    },
    getCheckDetal(id,pageNum){//获取服务订单信息
      let vm = this
      API.serverOrder(id + "?pageNum=" + pageNum + "&pageSize=3").then(result =>{
        if(result.code == "200"){
          vm.total2 = Number(result.data.total) 
          vm.serverOrder = result.data.list
          vm.serverOrder.forEach(item =>{
            if(item.content == "01"){
              item.content = "信息"
            }else if(item.content = "02"){
              item.content = "需求"
            }else if(item.content = "03"){
              item.content = "撮合"
            }else{
              item.content = "无内容"
            }
          })
        }else{
          vm.$message.error({
            showClose: true,
            message: '加载失败',
            duration: 2000
          })
          return
        }
      })
    },
    Orderpagination(currentPage){//查看里的分页
      this.getCheckDetal(this.temp2,currentPage)
    },
    removepagination(currentPage){//员工列表的分页
      let vm = this
      API.employeeLists("?pageNum=" + currentPage + "&pageSize=3").then(result => {
        if(result.code == "200"){
          vm.total3 = Number(result.data.total)
          vm.employeeLists = result.data.list
        }else{
          vm.$message.error({
            showClose: true,
            message: '列表获取失败',
            duration: 2000
          });
        }
      })
    },
    checkDetal2(row){//转移-当前信息
      var type = ""
      if(row.content == "信息"){
        type = "01"
      }else if(row.content == "需求"){
        type = "02"
      }else if(row.content == "撮合"){
        type = "03"
      }
      var paramStr = row.publishId + "?type=" + type;
      let vm = this
      API.nowInfo(paramStr).then(result =>{
        if(result.code == "200"){
          vm.detalData2 = result.data
        }else{
          vm.$message.error({
            showClose: true,
            message: '加载失败',
            duration: 2000
          })
          return
        }
      })
    },
    getemployeeLists(row){//获取员工列表
      this.$data.currentPage1 = 1
      this.removePublishPar = row
      let vm = this
      API.employeeLists("?pageNum=1&pageSize=3").then(result => {
        if(result.code == "200"){
          vm.total3 = Number(result.data.total) 
          vm.employeeLists = result.data.list
        }else{
          vm.$message.error({
            showClose: true,
            message: '列表获取失败',
            duration: 2000
          });
        }
      })
    },
    removePublish(row){//派发转移
      var type = ""
      if(this.removePublishPar.content == "信息"){
        type = "01"
      }else if(this.removePublishPar.content == "需求"){
        type = "02"
      }else if(this.removePublishPar.content == "撮合"){
        type = "03"
      }
      let paramStr = {
        employeeId:row.id,
        orderId:this.removePublishPar.publishId,
        orderNumber:this.removePublishPar.orderNumber,
        duty:row.roleName,
        operation:JSON.parse(window.sessionStorage.getItem('access-user')).userid,
        type:type,
      }
      let vm = this
      API.removePublish(paramStr).then(result => {
        if(result.data.code == "200"){
           vm.$message({
            showClose: true,
            message: result.data.message,
          });
        }else{
          vm.$message.error({
            showClose: true,
            message: '操作失败',
            duration: 2000
          })
          return
        }
      })
    },
    modifyDetal(row){//初始修改页面
      this.getdetal(row.ID)
    },
    modifyEmployees(){//修改
      this.modifyData.userId = JSON.parse(sessionStorage.getItem('access-user')).userid
      delete this.modifyData.passWord
      delete this.modifyData.roleName
      delete this.modifyData.jobNumber
      let vm = this
      let paramStr =  this.getAddParams(this.modifyData)
      
      if(paramStr == undefined){
        return
      }
      console.log(paramStr)
      this.$confirm("确认修改？")
      .then(_=> {
        vm.dialogmodify = false
        API.rewriteEmployee(paramStr).then( result => {
          if(result.code == "200"){
            var o  = this.$data.pageNum + this.$data.temp
            vm.getData(o)
          }else{
            vm.$message.error({
              showClose: true,
              message: "操作失败",
              duration: 2000
            })
          }
        })
      })
      .catch(_=>{})
    },
    sendPassword(){//发送修改密码至邮箱
      let vm = this
      API.changePassword(vm.modifyData.id).then( result => {
        if(result.code == "200"){
          vm.$message({
            showClose: true,
            message:"发送成功，请至您的邮箱查询。",
            duration: 2000
          })
        }else{
          vm.$message.error({
            showClose: true,
            message:"操作失败",
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
