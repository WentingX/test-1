<template>
	<!--全部信息-->
	<div class="allinf">
		<el-row class="allinf_top">
			<div class="xinxi">
				<span>信息筛选</span>
			</div>
			<div class="sousuo">
				<el-input v-model="input" placeholder="输入你想搜索的内容" clearable></el-input>
				<el-button type="primary" icon="el-icon-search" @click="searchforo" clearable>搜索</el-button>
			</div>
		</el-row>
		<el-row class="allinf_center">
			<div class="allinf_centershuju">
				<span>订单号：</span>
				<el-input v-model="input1" class="ppp" placeholder="" clearable></el-input>
			</div>
			<div class="allinf_centershuju">
				<span>订单状态：</span>
				<el-select v-model="value" placeholder="" clearable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</div>
			<div class="allinf_centershuju">
				<div class="block">
					<span class="demonstration">生成时间：</span>
					<el-date-picker v-model="value8" type="date" placeholder="选择日期" style="line-height: 0px;" value-format="yyyy-MM-dd" :editable = "false"></el-date-picker>
				</div>
			</div>
			<div class="allinf_centershuju">
				<span>所在地区：</span>
				<el-cascader v-model="kk" :options="value7" change-on-select clearable @change="handleItemChange"></el-cascader>
			</div>
			<div class="allinf_centershuju">
				<span>行业：</span>
				<el-select v-model="kk2" clearable>
					<el-option v-for="item in value3" :key="item.label" :label="item.label" :value="item.label"> </el-option>
				</el-select>
			</div>
			<div class="allinf_centershuju">
				<span>交易员：</span>
				<el-input v-model="value4" class="ppp" placeholder="" clearable></el-input>
			</div>
			<div class="allinf_centershuju">
				<span>是否已同步到大厅：</span>
				<el-select v-model="value5" placeholder="" clearable>
					<el-option v-for="item in options5" :key="item.value5" :label="item.label" :value="item.value5"> </el-option>
				</el-select>
			</div>
			<div class="button">
				<el-button @click="inquire">查询</el-button>
				<el-button @click="reset">重置</el-button>
			</div>
		</el-row>
		<el-row class="allinf_buttom">
			<div class="quanbuxinxi">
				<span>全部信息</span>
			</div>
			<el-table :data="tableData3" border  v-loading="loading">
				<el-table-column prop="" label="序号" type="index" width="55"></el-table-column>
				<el-table-column prop="orderNumber" label="订单号" width="230"></el-table-column>
				<el-table-column prop="projectName" label="标题" ></el-table-column>
				<el-table-column prop="publishDate" label="生成时间" width="159"></el-table-column>
				<el-table-column prop="industry" label="行业" ></el-table-column>
				<el-table-column prop="rzqy" label="融方企业" ></el-table-column>
				<el-table-column prop="tzqy" label="投方企业" ></el-table-column>
				<el-table-column label="地区" >
					<template slot-scope="scope">
						{{scope.row.province}}{{scope.row.city}}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="订单状态" >
					<template slot-scope="scope">
						<span :class="{'待撮合':'bematched','撮合失败':'matchfailed','撮合中':'inthematch','等待收益':'waitirevenue','财务审批':'inancaoval','交易成功':'thissusful'}[scope.row.status]">
							{{scope.row.status}}
						</span>
					</template>
				</el-table-column> 
				<el-table-column prop="employeeName" label="交易员"></el-table-column>
				<el-table-column prop="operating" label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="text" style="color: #3388ff;" @click="details(scope.row)">详情</el-button>
						<el-button type="text" style="color: #df1f1f; display: inline-block" @click="closetheorder(scope.row)" class="closetheorder" v-if="scope.row.isClose == null">关闭订单</el-button>
						<el-button type="text" style="color: #c0c4cc; display: inline-block;" disabled class="closed" v-else-if="scope.row.isClose == 0">已关闭</el-button>
						<el-button type="text" style="color: #c0c4cc; display: inline-block" disabled class="Closeorder" v-else>关闭订单</el-button>
						<el-button v-if="scope.row.employeeName != undefined" @click="missiondistribution(scope.row)" type="text" style="color: #535458;text-decoration: none;">任务转移</el-button>
						<!-- <el-button v-else-if="scope.row.status" @click="missiondistribution(scope.row)" type="text" style="color: #535458;text-decoration: none;">任务派发</el-button> -->
						<el-button v-else @click="missiondistribution(scope.row)" type="text" style="color: #535458;text-decoration: none;">任务派发</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :page-size="6" :total="pages" @current-change="pagination"></el-pagination>
		</el-row>
		<el-dialog @open="open1()" :visible.sync="distribution" width="65%" class="paifa" 
					:before-close="handleClose2" :showClose = "false" top="10vh"
					@close="distribuClose" :lock-scroll="false">
			<!-- 自己添加的关闭图标 -->
			<a href="javascript:;" @click.prevent="distribution = false" class="el-icon-close icoClose"></a>
			<div v-if="tableData5.length>0">
				<p class="yuangonliebiao"><span>当前信息</span></p>
				<el-table :data="tableData5" border v-loading="loading1" >
					<el-table-column prop="orderNumber" label="订单号" width="240"></el-table-column>
					<el-table-column prop="employeeName" label="姓名" ></el-table-column>
					<el-table-column prop="telephone" label="手机号码" ></el-table-column>
					<el-table-column prop="employeeId" label="工号" width="180"></el-table-column>
					<el-table-column prop="matchStatus" label="订单状态">
						<template slot-scope="scope">
							<span :class="{'已转移':'matchfailed'}[scope.row.matchStatus]">{{scope.row.matchStatus}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="roleName" label="权限"></el-table-column>
					<template v-if="tableData5.length>=2">
						<el-table-column prop="operation" label="操作员" align="center">
						</el-table-column>
						<el-table-column prop="updateDate" label="最后转移时间" align="center">
						</el-table-column>
					</template>
				</el-table>
				<el-pagination background layout="prev, pager, next" :page-size="3" :total="page1"  @current-change="pagination2" :current-page.sync="currentPage2"></el-pagination>
			</div>
			<p class="yuangonliebiao"><span>员工列表</span></p>
			<el-table :data="tableData4" border v-loading="loading2">
				<el-table-column prop="name" label="员工姓名"></el-table-column>
				<el-table-column prop="jobNumber" label="工号" ></el-table-column>
				<el-table-column prop="phone" label="手机号码" ></el-table-column>
				<el-table-column prop="taskNumber" label="当前任务数量" ></el-table-column>
				<el-table-column prop="roleName" label="权限"></el-table-column>
				<el-table-column prop="operating" label="操作" >
					<template slot-scope="scope">
						<el-button v-if="tableData5.length==0" type="text" style="text-decoration: none;color: #ffc731;" @click="dispatchtasks(scope)">派发任务</el-button>
						<el-button v-else type="text" style="text-decoration: none;color: #ffc731;" @click="dispatchtasks(scope)">转移任务</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :page-size="6" :total="page"  @current-change="pagination1" :current-page.sync="currentPage1"></el-pagination>
		</el-dialog>

		<el-dialog title="关闭订单理由：" :visible.sync="dialogVisible" width="30%" 
					:before-close="handleClose" :showClose = "false" 
					@close="visibleClose" :lock-scroll="false">
			<a href="javascript:;" @click.prevent="orderClose()" class="el-icon-close icoClose"></a>
			<div>
				<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea" resize="none"></el-input>									
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary"  @click="submit">提交</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<style>
.content-wrap .content-vi{
	height: auto;
}
.allinf .el-table--enable-row-hover .el-table__body tr:hover>td{
  background: transparent;
}
.allinf .icoClose{
  text-decoration: none;
  color: #909399;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 99;
}
/*交易成功*/
.allinf_buttom .thissusful {
	color: #4DC036;
}
/*财务审批*/
.allinf_buttom .inancaoval {
	color: #3388FF;
}
/*等待收益*/
.allinf_buttom .waitirevenue {
	color: #4DC036;
}
/*撮合中*/
.allinf_buttom .inthematch {
	color: #3388FF;
}
/*撮合失败*/
.allinf .matchfailed {
	color: #DF1F1F;
}
/*待撮合*/
.allinf_buttom .bematched {
	color: #ffc731;
}
.allinf {
	width: 99%;
	height: 99%;
}
.allinf_top {
	width: 100%;
	height: 10%;
}
.allinf_top .xinxi {
	width: 100%;
	height: 34%;
}
.allinf_top .xinxi span {
	border-left: 2px solid #88b7e0;
	color: #556191;
	padding-left: 20px;
}
.allinf_top .sousuo {
	width: 100%;
}
.allinf_top .el-input {
	width: 400px;
}
.allinf_top .el-input__inner {
	height: 36px;
	border-radius: 0;
	width: 400px;
	border: 1px solid #999999;
	padding-left: 21px;
}
.allinf_top .sousuo button {
	margin-left: 6px;
	border: 0;
	border-radius: 0;
	height: 36px;
	padding-top: 11px;
	width: 100px;
	background: #4a4f63;
}
.allinf_center {
	width: 100%;
	height: 25%;
}
.allinf_center .el-input {
	width: 150px;
}
.allinf_center .block .el-date-editor .el-input__prefix .el-input__icon {
	line-height: 0px;
}
.allinf_center .block .el-date-editor .el-input__suffix .el-input__suffix-inner .el-input__icon {
	line-height: 0px;
}
.allinf_center .allinf_centershuju {
	display: inline-block;
	margin: 25px 35px 0 0;
}
.allinf_center .allinf_centershuju span {
	color: #000000;
}
.allinf_center .el-input__inner {
	border-radius: 0;
	height: 30px;
	border: 1px solid #999999;
}
.allinf_center .allinf_centershuju .ppp {
	width: 160px;
}

.allinf_center .button {
	text-align: center;
	margin-top: 45px;
}
.allinf_center .button button {
	background: #4a4f63;
	width: 120px;
	height: 40px;
	margin-right: 111px;
	color: #ffffff;
}
.allinf_buttom {
	width: 100%;
	height: 65%;
}
.allinf .paifa .el-dialog .el-dialog__header {
	text-align: left;
	margin: 0px;
	padding: 0px;
	padding-top: 1px;
}
.allinf_buttom .paifa .el-dialog .el-dialog__header span {
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
	font-size: 16px;
}
.allinf_buttom .paifa .el-dialog {
	height: 75%;
}
.allinf_buttom .paifa .el-dialog .el-dialog__body {
	padding: 0;
	margin: 0;
	background-color: #fff;
}
.allinf .paifa .el-dialog .el-table th {
	color: #FFFFFF;
	background: #4a4f63;
	border: none;
}
.allinf .paifa .el-dialog .el-pagination {
	margin: 0;
	margin-top: 10px;
}
.allinf_buttom .yuangonliebiao {
	margin-left: 20px;
}
.allinf_buttom .yuangonliebiao span {
	padding-left: 20px;
	border-left: 2px solid #88b7e0;
	font-size: 16px;
}
.allinf_buttom .quanbuxinxi {
	margin: 25px 0px 25px 0px;
}
.allinf_buttom .quanbuxinxi span {
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
}
.allinf_buttom .el-table {
	width: 100%;
}
.allinf .el-table th {
	text-align: center;
	background: #f5f6fa;
	color: #556191;
}
.el-table tr {
	height: 30px;
	text-align: center;
}
.allinf .el-table--enable-row-hover .el-table__row:nth-of-type(even) {
	background: #f5f6fa;
}
.allinf_buttom .el-button--text {
	height: 10px;
}
.allinf .el-pagination {
	text-align: right;
	margin-right: 22px;
	margin-top: 20px;
}
.allinf_buttom .el-dialog__wrapper .el-dialog__header{
	text-align: left;
	font-size: 16px;
}
.allinf_buttom .el-dialog__wrapper .el-dialog__header span{
	color: #3297ff;
}
.allinf .el-dialog__wrapper .el-dialog__body{	
	text-align: left;
	padding: 0px 20px 30px;
}
.allinf_buttom .el-dialog__wrapper .el-dialog__body span{
	margin-left: 20px;
	vertical-align: top;
}
.allinf_buttom .el-dialog__wrapper .el-dialog__body .el-textarea__inner{
	width: 300px;
    border: 1px solid #999999;
}
.allinf_buttom .el-dialog__wrapper .el-dialog__body .el-textarea{
	width: 75%;
	margin-left: 20px;	
}
.allinf_buttom .el-dialog__wrapper .el-dialog__footer{
	text-align: center;
}
.allinf_buttom .closetheorder{
	width: 58px;
    margin-left: 10px;
    text-align: center;
}
.allinf_buttom .closed{
	width: 58px;
    margin-left: 10px;
    text-align: center;
}
.allinf_buttom .Closeorder{
	width: 58px;
    margin-left: 10px;
    text-align: center;
}
</style>

<script>
import API from '@/api/api.js'
import industry_a from '@/utils/industry.js'
export default {
	data() {
		return {
			loading: false,
			loading1: false,
			loading2: false,
			dialogVisible: false,
			distribution: false,
			input: '',
			input1: '',
			pages: 2,
			page: 2,
			page1: 2,
			textarea: '',
			//订单状态
			options: [{
					value: '1010',
					label: '待撮合'
				}, {
					value: '1012',
					label: '撮合中'
				}, {
					value: '1013',
					label: '等待收益'
				}, {
					value: '-1013',
					label: '撮合失败'
				}, {
					value: '1015',
					label: '撮合成功 '
				}, {
					value: '1014',
					label: '财务审批'
				}, 
			],
			value: '',
			//所在地区
			value7: [],
			kk:[],
			//行业
			value3: industry_a.industry,
			kk2:'',
			//交易员
			value4: '',
			//是否已同步到大厅
			options5: [{
					value5: '01',
					label: '是'
				}, {
					value5: '02',
					label: '否 '
				}
			],
			value5: '',
			value8: '',
			//表格
			tableData3: [],
			closeOrderdialog:{},
			tableData4:[],
			tableData5:[],
			currentPage1:1,
			currentPage2:1,
			obj:{},
			taskObj:"",
			flag:false,
			downloading:false,
			add:false,
			forbid:false,
			open:false,
			examine:false,
		}
	},
	//获取接口拼接列表
	created() {
		let menu = JSON.parse(window.sessionStorage.getItem('menu'))
		menu.forEach((item)=>{
			if(item.name == "撮合信息管理"){
				item.children.forEach(item=>{
					if(item.name == '全部信息' && item.children){
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
		let aa = {
			pageNum: 1,
			pageSize: 6,
		}
		this.getAllInfo(aa)
		//初始化加载地区接口
		API.area().then( result => {
			if(result.code == 200 && result.data != null){
				this.$data.value7 = result.data
				this.$data.value7.forEach(item => {
					item.label = item.province //获取的数据
					item.value = item.provinceid
					if(item.children.length != 0){
						item.children.forEach( itS =>{
							itS.label = itS.city
							itS.value = itS.cityid
						})
					} else {
						delete item.children
					}
				})
			}
		})
	},
	methods: {
		msg(type, txt) {
			this.$message[type]({
			showClose: true,
			message: txt,
			duration: 2000
			});
		},
		getAllInfo(par){//获取全部信息
			let _this = this;
			this.loading = true
			API.allinformation(par).then((res)=> {
				if(res.code == 200) {
					_this.$data.pages = res.data.total - 0;
					_this.$data.tableData3 = res.data.list;
				}else {
					_this.msg('error',"列表获取失败")
				}
				_this.$data.loading = false;
			},function(err) {
				_this.loading = false;
				_this.msg('error',"服务器错误")
			})
		},
		//省市选择返回值
		handleItemChange(val) {
			this.$data.kk = val
		},
		//关闭订单
		closetheorder(row){
			this.$data.dialogVisible = true
			this.$data.closeOrderdialog.order = row;
			this.$data.aa = row;
		},
		orderClose(){
			this.$confirm("确认关闭？",{
				lockScroll:false,
				closeOnClickModal:false
			})
			.then(_=>{
				this.dialogVisible = false
			})
			.catch(_=>{})
		},
		//提交关闭订单理由
		submit(){
			if (this.textarea != "") {
				this.$confirm("确认关闭订单？",{
					type: 'warning',
					lockScroll:false,
					closeOnClickModal:false
				})
				.then(_=>{
					let _this = this;
					let par2 = `id=${this.$data.closeOrderdialog.order.id}&status=${0}&reason=${this.$data.textarea}`
					API.failedclosetheorder(this.$data.closeOrderdialog.order.id,par2).then((res)=>{
						if(res.code == '200'){
							_this.$data.aa.isClose = 0;
							_this.dialogVisible = false
						} else {
							_this.msg('error','操作失败')
						}
					},
					(error) => {
						_this.msg('error','服务器错误')
					})
				})
				.catch(_=>{})
			}else{
				this.$confirm("未填写任何理由是否放弃关闭订单并退出？",{
					type: 'warning',
					lockScroll:false,
					closeOnClickModal:false
				})
				.then(_=>{
					this.dialogVisible = false
					return
				})
				.catch(_=>{
					return
				})
			}
		},
		visibleClose(){//关闭关闭订单弹窗时 清除数据
			this.textarea = ""
		},
		handleClose() {},
		handleClose2() {},
		//搜索
		searchforo() {
			this.flag = true
			let _this = this;
			let par = {
				keyWord: this.$data.input,
				pageSize:6,
				pageNum:1,
			};
			this.loading = true
			API.searchfor(par).then((res)=> {
				if(res.code == 200) {
					_this.$data.pages = res.data.total - 0;
					_this.$data.tableData3 = res.data.list;
				}
				_this.$data.loading = false;
			},(error)=> {
				_this.loading = false;
				_this.msg('error','服务器错误')
			})
		},
		//查询
		inquire() {
			this.flag = false
			let par = {
				orderNumber: this.$data.input1,
				status: this.$data.value,
				publicDate: this.$data.value8,
				provincesId: this.$data.kk[0],
				cityId: this.$data.kk[1],
				industry: this.$data.kk2,
				employeeName: this.$data.value4,
				synchronization: this.$data.value5,
				pageSize:6,
			};
			for(let i in par) {
				if(!par[i] ) {
					delete par[i]
				}
			}
			this.getAllInfo(par)
		},
		//重置
		reset(row) {
			this.currentPage1 = 1
			this.$data.input = "";
			this.$data.input1 = "";
			this.$data.value = "";
			this.$data.value8 = "";
			this.$data.kk = [];
			this.$data.kk2 = "";
			this.$data.value4 = "";
			this.$data.value5 = "";
			let aa = {
				pageNum: 1,
				pageSize: 6,
			}
			this.getAllInfo(aa)
		},
		//分页
		pagination(pageNum) {
			if(this.flag){
				let _this = this;
				let par = {
					keyWord: this.$data.input,
					pageSize:6,
					pageNum:pageNum,
				};
				this.loading = true
				API.searchfor(par).then((res)=> {
					if(res.code == 200) {
						_this.$data.pages = res.data.total - 0;
						_this.$data.tableData3 = res.data.list;
					} else {
						_this.msg('error','获取列表错误')
					}
					_this.$data.loading = false;
				},function(err) {
					_this.loading = false;
					_this.msg('error','服务器错误')
				})
			}else{
				let par = {
					orderNumber: this.$data.input1,
					status: this.$data.value,
					publicDate: this.$data.value8,
					provincesId: this.$data.kk[0],
					cityId: this.$data.kk[1],
					industry: this.$data.kk2,
					employeeName: this.$data.value4,
					synchronization: this.$data.value5,
					pageSize:6,
				};
				for(let i in par) {
					if(!par[i]) {
						delete par[i]
					}
				}
				this.getAllInfo(par)
			}
		},
		//派单分页
		pagination1(pageNum){
			let  aa = {
				pageNum:pageNum,
				pageSize:6,
				id:this.$data.aa,
			}
			this.getStaffList(aa)
		},
		pagination2(pageNum){
			this.getNowInfo(pageNum)
		},
		//任务派发
		missiondistribution(row) {
			this.$data.taskObj = row;
			this.$data.obj = {};
			this.$data.obj.id = row.id;
			this.$data.obj.orderNumber = row.orderNumber;
			this.$data.obj.industry = row.industry;
			this.$data.distribution = true;
			this.$data.aa = row.id;
			this.type = '03';
			this.operation=JSON.parse(sessionStorage.getItem("access-user")).userid;
		},
		open1() {//打开任务派发弹窗
			this.currentPage1 = 1
			this.currentPage2 = 1
			let  aa = {
				pageNum:1,
				pageSize:6,
				id:this.$data.aa,
				type:'03'
			}
			this.getStaffList(aa)
			this.getNowInfo()
		},
		getStaffList(par){//获取员工列表
			let _this = this
			_this.loading2 = true
			API.stafflist(par).then((res)=> {
				if(res.code == 200) {
					_this.$data.page = res.data.total - 0;
					_this.$data.tableData4 = res.data.list;
				}else{
					_this.msg('error','获取员工列表失败')
				}
				_this.$data.loading2 = false;
			},
			function(error){
				_this.$data.loading2 = false;
				_this.msg('error','服务器错误')
			})
		},
		getNowInfo(par=1){//获取当前信息
			let _this = this
			_this.loading1 = true
			API.distribution(_this.$data.taskObj.id +"?type=03&pageSize=3&pageNum=" + par).then((res)=>{
				if(res.code == 200) {
					_this.$data.page1 = res.data.total - 0;
					_this.$data.tableData5 = res.data.list;
				} else {
					_this.msg('error','获取当前信息列表失败')
				}
				_this.loading1 = false
			},
			(error)=>{
				_this.$data.loading1 = false;
				_this.msg('error','服务器错误')
			})
		},
		//派发任务/任务转移
		dispatchtasks(scope){
			this.$confirm('确认转移？',{
				lockScroll:false,
				closeOnClickModal:false
			})
			.then(_=>{
				let _this = this;
				this.$data.taskObj.employeeName = scope.row.name;
				let par=`?orderId=${this.$data.obj.id}&orderNumber=${this.$data.obj.orderNumber}&employeeId=${scope.row.id}&duty=${scope.row.roleId}&type=${"03"}&operation=${JSON.parse(sessionStorage.getItem("access-user")).userid}`;
				console.log(999,par)
				API.Transfertasks(par).then((res)=> {
					if(res.data.code == "200"){
						_this.open1()
					} else {
						_this.msg('error','操作失败')
					}
				},
				(error) => {
					_this.msg('error','服务器错误')
				})
			})
			.catch(_=>{return})
		},
		distribuClose(){//关闭任务派发弹窗 清除数据
			this.tableData4 = []
			this.tableData5 = []
		},
		//详情
		details(row) {
			switch(row.status) {
				case "待撮合":
					this.$store.commit('save_detail_info', row)
					this.$router.push({
						path: `/details/${row.id}`
					})
					break;
				case "撮合中":
					this.$store.commit('save_detail_info', row)
					this.$router.push({
						path: `/seterng/${row.id}`
					})
					break;
				case "撮合失败":
					this.$store.commit('save_detail_info', row)
					this.$router.push({
						path: `/matchfai/${row.id}`
					})
					break;
				case "等待收益":
					this.$store.commit('save_detail_info', row)
					this.$router.push({
						path: `/toberewarded/${row.id}`
					})
					break;
				case "交易成功":
					this.$store.commit('save_detail_info', row)
					this.$router.push({
						path: `/transaction/${row.id}`
					})
					break;
				case "财务审批":
					this.$store.commit('save_detail_info', row)
					this.$router.push({
						path: `/financialapproval/${row.id}`
					})
					break;
			}
		}
	}
}
</script>