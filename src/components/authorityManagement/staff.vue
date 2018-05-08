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
      <el-button type="primary" class="increa" @click="dialogincrea = true,addStaff()">增加</el-button>
      <el-dialog title="员工新增" :visible.sync="dialogincrea" :before-close="handleincrea" width="25%" @close="addClose('addData')" :showClose = "false" :lock-scroll="false">
        <a href="javascript:;" @click.prevent="addEClose()" class="el-icon-close icoClose"></a>
        <el-row class="xq">
          <el-form :inline="true" :model="addData" class="demo-form-inline form add" ref="addData">
            <el-form-item label="员工工号：" prop="jobNumber">
              <el-input size="mini" v-model="addData.jobNumber" :disabled="true" name="jobNumber"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名：" :rules="[{required:true,message:'必填',trigger:'blur'}]" prop="name">
              <el-input size="mini" v-model="addData.name" clearable  name="name"></el-input>
            </el-form-item>
            <el-form-item label="性 别：" :rules="[{required:true,message:'必填',trigger:'change'}]" prop="gender">
              <el-select size="mini" v-model="addData.gender" clearable name="gender">
                <el-option label="男" value="0" ></el-option>
                <el-option label="女" value="1" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工权限：" prop="roleId" :rules="[{required:true,message:'必填',trigger:'change'}]" >
              <el-select size="mini" v-model="addData.roleId" clearable name="roleId">
                <el-option
                  v-for="item in role"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone" :rules="telephone">
              <el-input size="mini" v-model="addData.phone" clearable name="phone"></el-input>
            </el-form-item>
            <el-form-item label="员工邮箱：" prop="email" :rules="email">
              <el-input size="mini" v-model="addData.email" clearable name="email"></el-input>
            </el-form-item>
            <el-form-item label="账户信息：" prop="accountInfo" :rules="[{required:true,message:'必填',trigger:'blur'}]" >
              <el-input size="mini" v-model="addData.accountInfo" clearable name="accountInfo"></el-input>
            </el-form-item>
            <el-form-item label="账户状态：" prop="status" :rules="[{required:true,message:'必填',trigger:'change'}]" >
              <el-select size="mini" v-model="addData.status" clearable name="status">
                <el-option label="启用" value="1" ></el-option>
                <el-option label="禁用" value="0" ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-row>
        <el-button @click="addEmployees('addData')">确定添加</el-button>
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
            <a href="javascript:;" class="chakan open" @click.prevent="checkDetal(scope.row)" style="margin-left: 27px;">详情</a>
            <a href="javascript:;" class="modify open" @click.prevent="dialogmodify = true,modifyDetal(scope.row)" style="margin-left: 27px;" width="20%">修改</a>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div class="block">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="pagination" :page-size="3" > </el-pagination>
    </div>
    <el-dialog title="员工修改" :visible.sync="dialogmodify" :before-close="handlemodify" width="25%" 
                :showClose = "false" @close="viewClose('modifyData')" class="info" :lock-scroll="false">
      <a href="javascript:;" @click.prevent="baseClose()" class="el-icon-close icoClose"></a>
      <el-row class="xq">
        <el-form :inline="true" :model="modifyData" class="demo-form-inline form add" ref="modifyData" 
                   v-loading="loading1">
          <el-form-item label="员工工号：" >
            <el-input size="mini" v-model="modifyData.jobNumber" :disabled="true" name="jobNumber"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名：" :rules="[{required:true,message:'必填',trigger:'blur'}]" prop="name">
            <el-input size="mini" v-model="modifyData.name" name="name" clearable></el-input>
          </el-form-item>
          <el-form-item label="性 别：" :rules="[{required:true,message:'必填',trigger:'change'}]" prop="gender">
            <el-select size="mini" v-model="modifyData.gender" name="gender" clearable>
              <el-option label="男" value="0" ></el-option>
              <el-option label="女" value="1" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工权限：" prop="roleId" :rules="[{required:true,message:'必填',trigger:'change'}]">
            <el-select size="mini" v-model="modifyData.roleId" clearable name="roleId" >
              <el-option
                v-for="item in role"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone" :rules="telephone">
            <el-input size="mini" v-model="modifyData.phone" clearable name="phone"></el-input>
          </el-form-item>
          <el-form-item label="员工邮箱：" prop="email" :rules="email">
            <el-input size="mini" v-model="modifyData.email" clearable name="email"></el-input>
          </el-form-item>
          <el-form-item label="账户信息：" prop="accountInfo" :rules="[{required:true,message:'必填',trigger:'blur'}]">
            <el-input size="mini" v-model="modifyData.accountInfo" clearable name="accountInfo"></el-input>
          </el-form-item>
          <el-form-item class="xinxi">
            <span>密码：</span>
            <el-button @click="sendPassword" style="width:auto;padding:0 5px;">发送新密码至邮箱</el-button>
          </el-form-item>
          <el-form-item label="账户状态：" prop="status" :rules="[{required:true,message:'必填',trigger:'change'}]">
            <el-select size="mini" v-model="modifyData.status" clearable name="status1">
              <el-option label="启用" value="1" ></el-option>
              <el-option label="禁用" value="0" ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-button @click="modifyEmployees('modifyData')">确定修改</el-button>
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
.staff .el-form-item__error{
  text-align: left;
  width: 280px;
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
.staff .add.el-form--inline .el-form-item__label{
  width: 100px;
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
.staff .el-dialog__wrapper .el-dialog__body {
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
    //手机号自定义验证
    let validatePass = (rule, value, callback) => {
      if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(value))) {
				callback(new Error('不是完整的11位手机号或者正确的手机号前七位'));
			}  else {
				callback();
      }
    }
    //邮箱自定义验证
    let validatePass2 = (rule, value, callback) => {
      if (!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value))) {
				callback(new Error('您输入的电子邮件地址不合法'));
			}  else {
				callback();
      }
    }
    return {
      telephone:[ { required: true, message: '必填', trigger: 'blur'},
					{validator:validatePass,trigger: 'blur'}
			  ],
      email:[ { required: true, message: '必填', trigger: 'blur'},
          {validator:validatePass2,trigger: 'blur'}
        ],
      tableData: [],//列表
      multipleSelection: [],//复选框
      dialogview: false,
      dialogmodify: false,
      dialogincrea: false,
      inquireData:{//查询参数
        name:"",
        jobNumber:"",
        role:"",
        status:"",
      },
      loading:false,//员工列表 加载动画
      loading1:false,//修改 加载动画
      pageNum:1,
      total:0,
      temp:"",//提供给分页的搜索参数
      handleSelection:{
        ids:''
      },
      role:[],
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
      modifyData:{//修改
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
    msg(type, txt) {
      this.$message[type]({
        showClose: true,
        message: txt,
        duration: 2000
      });
    },
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
        this.msg('error','请选择要删除的菜单')
        return
      }
      let paramStr = "ids=" + this.handleSelection.ids
      this.$confirm("确认删除？",{
        lockScroll:false,
        closeOnClickModal:false
      })
      .then(_=>{
        this.loading = true
        let vm = this
        API.deleteEmployee(paramStr).then(result => {
          if(result.code == "200"){
            vm.loading = false
            vm.getData()
          }else{
            vm.loading = false
            vm.msg('error','删除失败')
            return
          }
        },(error) => {
          vm.msg('error','服务器错误')
        })
      })
      .catch(_=>{})
    },
    //查看的弹窗
    handleview() {},
    //修改的弹窗
    handlemodify() {},
    baseClose(){
      this.$confirm("确认退出？",{
        lockScroll:false,
        closeOnClickModal:false
      })
      .then(_=>{
        this.dialogmodify = false
      })
      .catch(_=>{})
    },
    viewClose(modifyData){
      this.$refs[modifyData].resetFields()
    },
    //增加的弹窗
    handleincrea() {},
    addClose(addData){//关闭增加弹窗时数据清空
      this.$refs[addData].resetFields()
    },
    addEClose(){//关闭前确认
      this.$confirm("确认退出？",{
        lockScroll:false,
        closeOnClickModal:false
      })
      .then(_=>{
        this.dialogincrea = false
      })
      .catch(_=>{})
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
          vm.msg('error','操作失败')
          return
        }
      },(error) => {
        vm.msg('error','服务器错误')
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
      var o =''
      for( let item in paramD){
        o += `&${item}=${paramD[item]}`
      }
      o = o.replace("&","")
      return o
    },
    addEmployees(addData){//增加
      this.$refs[addData].validate((vaild) => {
        if(vaild) {
          this.$confirm("确认增加？",{
            type: 'warning',
            lockScroll:false,
            closeOnClickModal:false
          })
          .then(_=>{
            this.addData.createdUserId = JSON.parse(sessionStorage.getItem('access-user')).userid
            let paramStr =  this.getAddParams(this.addData)
            let vm = this
            API.addEmployees(paramStr).then( result => {
              if(result.data.code == "200"){
                vm.getData()
              }else{
                vm.msg('error','操作失败')
              }
            })
            this.dialogincrea = false
          })
          .catch(_=>{})
        } else {
          return false
        }
      })
      
    },
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
        } else {
          vm.msg('error','操作失败')
        }
      },
      (err)=> {
        vm.loading = false
        vm.msg('error','列表获取失败')
      })
    },
    getdetal(id){//获取员工详情信息
      this.loading1 = true
      let vm = this 
      API.role().then( result => {
        if(result.code == "200"){
          vm.role = result.data
        }
      })
      API.employeeDetail(id).then(result =>{
        vm.loading1 = false
        if(result.code == "200" && result.data !== null){
          vm.$data.modifyData = result.data
        }else{
          vm.msg('error','列表获取失败')
          return
        }
      },(err) => {
					vm.msg('error', '服务器错误');
				}) 
    },
    checkDetal(row){//查看
      this.$store.commit('save_detail_info',row)
      this.$router.push({
        path: `/checkStaffDetal/1/2/${row.ID}`
      })
    },
    modifyDetal(row){//初始修改页面
      this.getdetal(row.ID)
    },
    modifyEmployees(modifyData){//修改
      this.$refs[modifyData].validate((vaild) => {
        if(vaild) {
          this.$confirm("确认修改？",{
            type: 'warning',
            lockScroll:false,
            closeOnClickModal:false
          })
          .then(_=> {
            this.modifyData.userId = JSON.parse(sessionStorage.getItem('access-user')).userid
            delete this.modifyData.passWord
            delete this.modifyData.roleName
            delete this.modifyData.jobNumber
            let vm = this
            let paramStr =  this.getAddParams(this.modifyData)
            console.log(paramStr)
            vm.dialogmodify = false
            API.rewriteEmployee(paramStr).then( result => {
              if(result.code == "200"){
                var o  = this.$data.pageNum + this.$data.temp
                vm.getData(o)
              }else{
                vm.msg('error','操作失败')
              }
            },(error) => {
              vm.msg('error','服务器错误')
            })
          })
          .catch(_=>{})
        } else {
          return false
        }
      })
    },
    sendPassword(){//发送修改密码至邮箱
      let vm = this
      API.changePassword(vm.modifyData.id).then( result => {
        if(result.code == "200"){
          vm.msg('info','发送成功，请至您的邮箱查询。')
        }else{
          vm.msg('error','操作失败')
        }
      },(error) => {
        vm.msg('error','服务器错误')
      })
    }
  }
}
</script>
