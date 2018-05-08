<template>
	<!--待撮合-->
	<div class="bematched">
		<el-row class="bematched_top">
			<div class="xinxi">
				<span>信息筛选</span>
			</div>
			<div class="sousuo">
				<el-input v-model="input" placeholder="输入你想搜索的内容" clearable></el-input>
				<el-button type="primary" icon="el-icon-search" @click="tobematched">搜索</el-button>
			</div>
		</el-row>
		<el-row class="bematched_center">
			<div class="bematched_centershuju">
				<span>订单号：</span>
				<el-input v-model="input1" class="ppp" placeholder="" :clearable="true"></el-input>
			</div>
			<div class="bematched_centershuju">
				<div class="block">
					<span class="demonstration">生成时间：</span>
					<el-date-picker v-model="value1" type="date" placeholder="选择日期" style="line-height: 0px;" value-format="yyyy-MM-dd" :editable = "false"></el-date-picker>
				</div>
			</div>
			<div class="bematched_centershuju">
				<span>所在地区：</span>
				<el-cascader v-model="kk" :options="value7" change-on-select @change="handleItemChange" clearable></el-cascader>
			</div>
			<div class="bematched_centershuju">
				<span>行业：</span>
				<el-select v-model="kk2" clearable>
					<el-option v-for="item in value3" :key="item.label" :label="item.label" :value="item.label"> </el-option>
				</el-select>
			</div>
			<div class="bematched_centershuju">
				<span>交易员：</span>
				<el-input v-model="value4" class="ppp" placeholder="" clearable></el-input>
			</div>
			<div class="button">
				<el-button @click="inquire">查询</el-button>
				<el-button @click="reset">重置</el-button>
			</div>
		</el-row>
		<el-row class="bematched_buttom">
			<div class="quanbuxinxi">
				<span>全部信息</span>
			</div>
			<el-table :data="tableData3" border v-loading="loading">
				<el-table-column prop="" label="序号" width="60" type="index"></el-table-column>
				<el-table-column prop="orderNumber" label="订单号" width="220"></el-table-column>
				<el-table-column prop="projectName" label="标题" width="160"></el-table-column>
				<el-table-column prop="publishDate" label="生成时间" width="185"></el-table-column>
				<el-table-column prop="industry" label="行业" width="93"></el-table-column>
				<el-table-column prop="rzqy" label="融方企业" width="190"></el-table-column>
				<el-table-column prop="tzqy" label="投方企业" width="190"></el-table-column>
				<el-table-column label="地区" width="128">
					<template slot-scope="scope">
						{{scope.row.province}}{{scope.row.city}}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="订单状态" width="79">
					<template slot-scope="scope">
						<span style="color: #ffc731;">
							{{scope.row.status='待撮合'}}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="employeeName" label="交易员" width="100"></el-table-column>
				<el-table-column prop="operating" label="操作" width="191">
					<template slot-scope="scope">
						<el-button type="text" style="color: #3388ff;" @click="details(scope.row)">详情</el-button>					
						<el-button type="text" style="color: #df1f1f; display: inline-block" @click="closetheorder(scope.row)" class="closetheorder" v-if="scope.row.isClose==null">关闭订单</el-button>
						<el-button type="text" style="color: #c0c4cc; display: inline-block;" disabled class="closed" v-else-if="scope.row.isClose==0">已关闭</el-button>
						<el-button type="text" style="color: #c0c4cc; display: inline-block" disabled class="Closeorder" v-else>关闭订单</el-button>
						<el-button v-if="scope.row.contact!=undefined" @click="missiondistribution(scope.row)" type="text" style="color: #535458;text-decoration: underline;">任务转移</el-button>
						<el-button v-else @click="missiondistribution(scope.row)" type="text" style="color: #535458;text-decoration: underline;">任务派发</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :page-size="6" :total="pages" @current-change="pagination"></el-pagination>
		</el-row>

		<el-dialog title="关闭订单理由：" 
					:visible.sync="dialogVisible" width="30%" 
					:before-close="handleClose" class="guanbi" 
					:showClose = "false" @close="visibleClose" 
					:lock-scroll="false">
			<a href="javascript:;" @click.prevent="orderClose()" class="el-icon-close icoClose"></a>
			<div>
				<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea" resize="none"></el-input>									
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary"  @click="submit">提交</el-button>
			</span>
		</el-dialog>
		<el-dialog @open="open1" :visible.sync="distribution" 
					width="65%" center class="paifa" top="10vh" 
					:before-close="handleClose2" :showClose = "false" 
					@close="visibleClose2" :lock-scroll="false">
			<a href="javascript:;" @click.prevent="distribution = false" class="el-icon-close icoClose"></a>
			<div v-if="tableData5.length > 0">
				<p class="yuangonliebiao"><span>当前信息</span></p>
				<el-table :data="tableData5" border v-loading="loading1">
					<el-table-column prop="orderNumber" label="订单号" width="240"></el-table-column>
					<el-table-column prop="employeeName" label="姓名" ></el-table-column>
					<el-table-column prop="telephone" label="手机号码" ></el-table-column>
					<el-table-column prop="employeeId" label="工号" width="180"></el-table-column>
					<el-table-column prop="matchStatus" label="订单状态" >
						<template slot-scope="scope">
							<span :class="{'已转移':'matchfailed'}[scope.row.matchStatus]">{{scope.row.matchStatus}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="roleName" label="权限"></el-table-column>
					<template v-if="tableData5.length >= 2">
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
						<el-button v-if="tableData5.length==0" type="text" style="text-decoration: underline;color: #ffc731;" @click="dispatchtasks(scope)">派发任务</el-button>
						<el-button v-else type="text" style="text-decoration: underline;color: #ffc731;" @click="dispatchtasks(scope)">转移任务</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :page-size="6" :total="page"  @current-change="pagination1" :current-page.sync="currentPage1"></el-pagination>
		</el-dialog>
	</div>
</template>

<style>
.bematched {
	width: 99%;
	height: 99%;
}
.bematched .matchfailed {
	color: #DF1F1F;
}
.bematched .el-table--enable-row-hover .el-table__body tr:hover>td{
  background: transparent;
}
.bematched .icoClose{
  text-decoration: none;
  color: #909399;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 99;
}
.bematched_top {
	width: 100%;
	height: 10%;
}
.bematched_top .xinxi {
	width: 100%;
	height: 34%;
}
.bematched_top .xinxi span {
	border-left: 2px solid #88b7e0;
	color: #556191;
	padding-left: 20px;
}
.bematched_top .sousuo {
	width: 100%;
}
.bematched_top .el-input {
	width: 400px;
}
.bematched_top .el-input__inner {
	height: 36px;
	border-radius: 0;
	width: 400px;
	border: 1px solid #999999;
	padding-left: 21px;
}
.bematched_top .sousuo button {
	margin-left: 6px;
	border: 0;
	border-radius: 0;
	height: 36px;
	padding-top: 11px;
	width: 100px;
	background: #4a4f63;
}
.bematched_center {
	width: 100%;
	height: 17%;
}
.bematched_center .el-input {
	width: 150px;
}
.bematched_center .bematched_centershuju {
	display: inline-block;
	margin: 25px 35px 0 0;
}
.bematched_center .bematched_centershuju span {
	color: #000;
}
.bematched_center .el-input__inner {
	border-radius: 0;
	height: 30px;
	border: 1px solid #999;
}
.bematched_center .bematched_centershuju .ppp {
	width: 180px;
}
.bematched_center .button {
	text-align: center;
	margin-top: 65px;
}
.bematched_center .block .el-date-editor .el-input__prefix .el-input__icon {
	line-height: 0px;
}
.bematched_center .block .el-date-editor .el-input__suffix .el-input__suffix-inner .el-input__icon {
	line-height: 0px;
}
.bematched_center .button button {
	background: #4a4f63;
	width: 120px;
	height: 40px;
	margin-right: 111px;
	color: #ffffff;
}
.bematched_buttom {
	width: 100%;
	height: 65%;
}
.bematched .paifa .el-dialog .el-dialog__header {
	text-align: left;
	margin: 0px;
	padding-top: 16px;
}

.bematched .paifa .el-dialog {
	height: 75%;
}
.bematched .el-dialog .el-dialog__body {
	text-align: left;
	padding: 0px 20px 30px;
}
.bematched .paifa .el-dialog .el-table th {
	color: #FFFFFF;
	background: #4a4f63;
	border: none;
}
.bematched .paifa .el-dialog .el-pagination {
	margin: 0;
	margin-top: 10px;
}
.bematched_buttom .quanbuxinxi {
	margin: 25px 0px 25px 0px;
}
.bematched_buttom .quanbuxinxi span {
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
}
.bematched_buttom .el-table {
	width: 100%;
}
.bematched_buttom .el-table th {
	text-align: center;
	background: #f5f6fa;
	color: #556191;
}
.bematched_buttom .el-table tr {
	height: 30px;
	text-align: center;
}
.bematched .el-table--enable-row-hover .el-table__row:nth-of-type(even) {
	background: #f5f6fa;
}
.bematched_buttom .el-button--text {
	height: 10px;
	margin-left: 0px;
	line-height: 1px;
}
.bematched .el-pagination {
	text-align: right;
	margin-right: 22px;
	margin-top: 20px;
}
.bematched_buttom .yuangonliebiao {
	margin-left: 20px;
}
.bematched_buttom .yuangonliebiao span {
	padding-left: 20px;
	border-left: 2px solid #88b7e0;
	font-size: 16px;
}
.bematched_buttom  .closetheorder{
	width: 58px;
    margin-left: 10px;
    text-align: center;
}
.bematched_buttom  .closed{
	width: 58px;
    margin-left: 10px;
    text-align: center;
}
.bematched_buttom  .Closeorder{
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
			closeOrderdialog: {},
			loading: false,
			loading1: false,
			loading2: false,
			dialogVisible: false,
			input: '',
			input1: '',
			distribution: false,
			pages: 0,
			page: 0,
			page1: 0,
			textarea:'',
			value1: '',//日期
			//所在地区
			value7: [],
			kk: [],
			//行业
			value3: industry_a.industry,
			kk2: '',
			value4: '',
			//表格
			tableData3: [],
			//任务
			tableData4: [],
			tableData5: [],
			aa: '',
			flag:false,
			obj: {},
			currentPage1:0,
			currentPage2:0,
			downloading:false,
			add:false,
			forbid:false,
			open:false,
			examine:false,
		}
	},
	//接口
	created() {
		let menu = JSON.parse(window.sessionStorage.getItem('menu'))
		menu.forEach((item)=>{
			if(item.name == "撮合信息管理"){
				item.children.forEach(item=>{
					if(item.name == '待撮合' && item.children){
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
		let _this = this;
		let aa = {
			pageNum: 1,
			pageSize: 6,
			status: 1010,
		}
		this.getAllInfo(aa)
		//初始化加载地区接口
		API.area().then( result => {
			if(result.code == 200 && result.data != null){
				_this.$data.value7 = result.data
				_this.$data.value7.forEach(item => {
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
		getAllInfo(par){
			this.loading = true
			let _this = this
			API.allinformation(par).then((res)=> {//获取列表数据
				if(res.code == 200) {
					_this.$data.pages = res.data.total - 0;
					_this.$data.tableData3 = res.data.list;
				} else {
					_this.msg('error','列表获取失败')
				}
				_this.$data.loading = false;
			},
			(err)=> {
				_this.loading = false;
				_this.msg('error','服务器错误')
			})
		},
		msg(type, txt) {
			this.$message[type]({
			showClose: true,
			message: txt,
			duration: 2000
			});
		},
		//省市选择返回值
		handleItemChange(val) {
			this.$data.kk = val
		},
		closetheorder(row){//点击关闭订单开启弹窗
			this.$data.dialogVisible = true
			this.$data.closeOrderdialog.order = row;
			this.$data.aa = row;
		},
		//提交关闭订单理由
		submit(){
			if (this.textarea != "") {
				this.$confirm("确认关闭订单？",{
					type: 'warning',
					lockScroll: false,
					closeOnClickModal:false
				})
				.then(_=>{
					let _this = this;
					let par2 =  `id=${this.$data.closeOrderdialog.order.id}&status=${0}&reason=${this.$data.textarea}`
					API.failedclosetheorder(this.$data.closeOrderdialog.order.id,par2).then((res)=>{
						if(res.code == '200'){
							_this.$data.aa.isClose = 0;
							_this.$data.dialogVisible = false
						} else {
							_this.msg('error','操作失败')
						}
					},
					(err) => {
						_this.msg('error','服务器错误')
						_this.$data.dialogVisible = false
					})
				})
				.catch(_=>{ return })
				
			}else{
				this.$confirm("未填写任何理由是否放弃关闭订单并退出？",{
					type: 'warning',
					lockScroll:false,
					closeOnClickModal:false
				})
				.then(_=>{
					this.$data.dialogVisible = false
					return
				})
				.catch(_=>{ return })
			}
		},
		visibleClose(){//关闭关闭订单弹窗时的清空
			this.$data.textarea = ""
		},
		visibleClose2(){//关闭任务派发弹窗 清除数据
			this.tableData4 = []
			this.tableData5 = []
		},
		handleClose() {},//关闭关闭订单弹窗
		handleClose2() {},//关闭任务派发弹窗
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
		//搜索
		tobematched() {
			this.flag = true
			let _this = this;
			let par = {
				keyWord: this.$data.input,
				pageSize:6,
				pageNum:1,
				status:'1010',
			};
			this.loading = true
			API.searchfor(par).then((res)=> {
				if(res.code == 200) {
					_this.$data.pages = res.data.total - 0;
					_this.$data.tableData3 = res.data.list;
				} else {
					_this.msg('error','获取列表失败')
				}
				_this.$data.loading = false;
			},(err)=> {
				_this.loading = false;
				_this.msg('error','服务器错误')
			})
		},
		//详情
		details(row) {
			this.$store.commit('save_detail_info', row)
			this.$router.push({
				path: `/details/${row.id}`
			})
		},
		//查询
		inquire() {
			this.flag = false
			let par = {
				orderNumber: this.$data.input1,
				status: 1010,
				publicDate: this.$data.value1,
				provincesId: this.$data.kk[0],
				cityId: this.$data.kk[1],
				industry: this.$data.kk2,
				employeeName: this.$data.value4,
				pageNum:1
			};
			for(let i in par) {
				if(!par[i]) {
					delete par[i]
				}
			}
			this.getAllInfo(par)
		},
		//重置
		reset() {
			this.$data.input = "";
			this.$data.input1 = "";
			this.$data.value1 = "";
			this.$data.kk = [];
			this.$data.kk2 = '';
			this.$data.value4 = "";
			let aa = {
				pageNum: 1,
				pageSize: 6,
				status: 1010,
			}
			this.getAllInfo(aa)
		},
		//首页分页
		pagination(pageNum) {
			if(this.flag){
				let _this = this;
				let par = {
					keyWord: this.$data.input,
					pageSize:6,
					pageNum:pageNum,
					status:'1010',
				};
				this.loading = true
				API.searchfor(par).then((res) => {
					if(res.code == 200) {
						_this.$data.pages = res.data.total - 0;
						_this.$data.tableData3 = res.data.list;
					} else {
						_this.msg('error','获取列表失败')
					}
					_this.$data.loading = false;
				},(err) => {
					_this.loading = false;
					_this.msg('error','服务器错误')
				})
			} else {
				let par = {
					pageNum: pageNum,
					orderNumber: this.$data.input1,
					status: 1010,
					publicDate: this.$data.value1,
					provincesId: this.$data.kk[0],
					cityId: this.$data.kk[1],
					industry: this.$data.kk2,
					employeeName: this.$data.value4,
				}
				for(let i in par) {
					if(!par[i]) {
						delete par[i]
					}
				}
				this.getAllInfo(par)
			}
			
		},
		//员工派单分页
		pagination1(pageNum){
			let _this = this;
			let  aa = {
				pageNum:pageNum,
				pageSize:3,
				id:this.$data.aa,
				type:'03'//防止员工列表出现自己
			}
			this.loading = true
			API.stafflist(aa).then((res) => {
				if(res.code == 200) {
					_this.$data.page = res.data.total - 0;
					_this.$data.tableData4 = res.data.list;
				}else{
					_this.msg('error','获取列表错误')
				}
				_this.$data.loading = false;
			},(err) => {
				_this.loading = false;
				_this.msg('error','服务器错误')
			})
		},
		//当前信息分页
		pagination2(pageNum){
			let _this = this;
			this.loading1 = true
			API.distribution(_this.$data.taskObj.id +"?type=03&pageSize=3&pageNum=" + pageNum).then((res) =>{//当前信息
				if(res.code == 200) {
					_this.$data.page1 = res.data.total - 0
					_this.$data.tableData5 = res.data.list;
				} else {
					_this.msg('error','列表获取失败')
				}
				_this.loading1 = false;
			},
			(err) => {
				_this.loading1 = false;
				_this.msg('error','服务器错误')
			})
		},
		//任务派发
		missiondistribution(row) {
			this.$data.taskObj = row;
			this.$data.obj.id=row.id;
			this.$data.obj.orderNumber=row.orderNumber;
			this.$data.obj.industry=row.industry;
			this.$data.distribution = true;
			this.$data.aa =row.id;
			this.type='03';
			this.operation=JSON.parse(sessionStorage.getItem("access-user")).userid;
		},
		open1() {
			this.$data.currentPage1 = 1
			this.$data.currentPage2 = 1
			let _this = this;
			let  aa = {
				pageNum:1,
				pageSize:3,
				id:this.$data.aa,
				type:'03'
			}
			this.loading2 = true
			API.stafflist(aa).then((res) => {//员工列表
				if(res.code == 200) {
					_this.$data.page = res.data.total - 0;
					_this.$data.tableData4 = res.data.list;
				} else {
					_this.msg('error','列表获取失败')
				}
				_this.$data.loading2 = false;
			},
			(err) => {
				_this.loading2 = false;
				_this.msg('error','服务器错误')
			})
			this.loading1 = true
			API.distribution(_this.$data.taskObj.id +"?type=03&pageSize=3&pageNum=1").then((res) =>{//当前信息
				if(res.code == 200) {
					_this.$data.tableData5 = res.data.list;
					_this.$data.page1 = res.data.total - 0;
				} else {
					_this.msg('error','列表获取失败')
				}
				_this.loading1 = false;
			},
			(err) => {
				_this.loading1 = false;
				_this.msg('error','服务器错误')
			})
		},
		//弹窗里 派发任务/任务转移
		dispatchtasks(scope){
			this.$confirm('确认转移？',{
				lockScroll:false,
				closeOnClickModal:false
			})
			.then(_=>{
				let _this = this;
				this.$data.taskObj.employeeName = scope.row.name;
				let par=`?orderId=${this.$data.obj.id}&orderNumber=${this.$data.obj.orderNumber}&employeeId=${scope.row.id}&duty=${scope.row.roleId}&type=${"03"}&operation=${JSON.parse(sessionStorage.getItem("access-user")).userid}`;
				API.Transfertasks(par).then((res)=> {
					if(res.data.code == "200"){
						_this.open1()
					} else {
						_this.msg('error','操作失败')
					}
				},
				(err) => {
					_this.msg('error','服务器错误')
				})
			})
			.catch(_=>{return})
		},
	},
}
</script>
