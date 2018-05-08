<template>
	<!--撮合失败-->
	<div class="matchfailed">
		<el-row class="matchfailed_top">
    		<div class="xinxi">
    			<span>信息筛选</span>
    		</div>
    		<div class="sousuo">
    			<el-input v-model="input" placeholder="输入你想搜索的内容" clearable></el-input>
    			<el-button type="primary" icon="el-icon-search" @click="matchfailed">搜索</el-button>
    		</div>
    	</el-row>
		<el-row class="matchfailed_center">
    		<div class="matchfailed_centershuju">
    			<span>订单号：</span><el-input v-model="input1" class="ppp" placeholder="" clearable></el-input>    			
    		</div>
    		<div class="matchfailed_centershuju">
	    		<template>
  					<div class="block">
    					<span class="demonstration">生成时间：</span>
    					<el-date-picker v-model="value1" type="date" placeholder="选择日期" style="line-height: 0px;" value-format="yyyy-MM-dd" :editable = "false"></el-date-picker>
  					</div>
				</template>
    		</div>
    		<div class="matchfailed_centershuju">
    			<span>所在地区：</span>
				<el-cascader v-model="kk" :options="value7" change-on-select clearable @change="handleItemChange"></el-cascader>
    		</div>
    		<div class="matchfailed_centershuju">
    			<span>行业：</span>
				<el-select v-model="kk2" clearable>
					<el-option v-for="item in value3" :key="item.label" :label="item.label" :value="item.label"> </el-option>
				</el-select>
    		</div>
    		<div class="matchfailed_centershuju">
    			<span>交易员：</span>
	    		<el-input v-model="value4" class="ppp" placeholder="" clearable></el-input>
    		</div>
    		<div class="button">
    			<el-button @click="inquire">查询</el-button>
    			<el-button @click="reset">重置</el-button>
    		</div>
    	</el-row>
		<el-row class="matchfailed_buttom">
    		<div class="quanbuxinxi">
    			<span>全部信息</span>
    		</div>
			<el-table :data="tableData3" border v-loading="loading">
				<el-table-column prop="" label="序号" width="60" type="index"></el-table-column>
				<el-table-column prop="orderNumber" label="订单号" width="220"></el-table-column>
				<el-table-column prop="projectName" label="标题" width="160"></el-table-column>
				<el-table-column prop="publishDate" label="生成时间" width="185"></el-table-column>
				<el-table-column prop="industry" label="行业" width="93"></el-table-column>
				<el-table-column prop="rzqy" label="融方企业" width="199"></el-table-column>；
				<el-table-column prop="tzqy" label="投方企业" width="199"></el-table-column>
				<el-table-column label="地区" width="128">
					<template slot-scope="scope">
						{{scope.row.province}}{{scope.row.city}}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="订单状态" width="100">
					<template slot-scope="scope">
						<span style="color: #DF1F1F;">
							{{scope.row.status='撮合失败'}}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="employeeName" label="交易员" width="100"></el-table-column>
				<el-table-column prop="operating" label="操作" width="151">
					<template slot-scope="scope">
						<el-button type="text" style="color: #3388ff;" @click="matchfai(scope.row)">详情</el-button>	
						<el-button type="text" style="color: #df1f1f; display: inline-block" @click="closetheorder(scope.row)" class="closetheorder" v-if="scope.row.isClose==null">关闭订单</el-button>
						<el-button type="text" style="color: #c0c4cc; display: inline-block;" disabled class="closed" v-else-if="scope.row.isClose==0">已关闭</el-button>
						<el-button type="text" style="color: #c0c4cc; display: inline-block" disabled class="Closeorder" v-else>关闭订单</el-button>
				</template>					
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :page-size="6" :total="pages" @current-change="pagination"></el-pagination>
   		</el-row>
		<el-dialog title="关闭订单理由：" :visible.sync="dialogVisible" width="30%" 
					:before-close="handleClose" :showClose = "false" :lock-scroll="false">
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
.matchfailed{
	width: 99%;
	height: 99%;
}
.matchfailed.el-table--enable-row-hover .el-table__body tr:hover>td{
  background: transparent;
}
.matchfailed .icoClose{
  text-decoration: none;
  color: #909399;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 99;
}
.matchfailed_top{
	width: 100%;
	height: 10%;
}
.matchfailed_top .xinxi{
	width: 100%;
	height: 34%;
}
.matchfailed_top .xinxi span{
	border-left: 2px solid #88b7e0;
	color: #556191;
	padding-left: 20px;
}
.matchfailed_top .sousuo{
	width: 100%;
}
.matchfailed_top .el-input{
	width: 400px;
}
.matchfailed_top .el-input__inner{
	height: 36px;
    border-radius: 0;
    width: 400px;
    border: 1px solid #999999;
    padding-left: 21px;
}
.matchfailed_top .sousuo button{
    margin-left: 6px;
    border: 0;
    border-radius: 0;
    height: 36px;
    padding-top: 11px;
    width: 100px;
    background: #4a4f63;
}
.matchfailed_center{
	width: 100%;
	height: 17%;
}
.matchfailed_center .block .el-date-editor .el-input__prefix .el-input__icon{
	line-height: 0px;
}
.matchfailed_center .block .el-date-editor .el-input__suffix .el-input__suffix-inner .el-input__icon{
	line-height: 0px;
}
.matchfailed_center .el-input{
	width: 150px;
}
.matchfailed_center .matchfailed_centershuju{
	display: inline-block;
    margin: 25px 35px 0 0;
}
.matchfailed_center .matchfailed_centershuju span{
	color: #000000;
}
.matchfailed_center .el-input__inner{
	border-radius: 0;
	height: 30px;
	border: 1px solid #999999;
}
.matchfailed_center .matchfailed_centershuju .ppp{
	width: 180px;
}
.matchfailed_center .button{
	text-align: center;
	margin-top: 65px;
}
.matchfailed_center .button button{
	background: #4a4f63;
    width: 120px;
    height: 40px;
    margin-right: 111px;
    color: #ffffff;
}
.matchfailed_buttom{
	width: 100%;
	height: 65%;
}
.matchfailed_buttom .quanbuxinxi{
	margin: 25px 0px 25px 0px;
}
.matchfailed_buttom .quanbuxinxi span{
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
}
.matchfailed_buttom .el-table{
	width: 100%;
}
.matchfailed_buttom .el-table th{
	text-align: center;
	background:#f5f6fa;
	color: #556191;
}
.matchfailed_buttom .el-table a{
	margin-left: 5px;
	margin-right: 5px;
}
.matchfailed_buttom .el-table tr{
	height: 30px;
	text-align: center;
}
.matchfailed_buttom .el-table--enable-row-hover .el-table__row:nth-of-type(even){
    background:#f5f6fa;
}
.matchfailed_buttom .el-button--text{
	height: 10px;
}
.matchfailed .el-pagination {
	text-align: right;
	margin-right: 22px;
    margin-top: 20px;
}
.matchfailed_buttom  .closetheorder{
	width: 58px;
    margin-left: 10px;
    text-align: center;
}
.matchfailed_buttom  .closed{
	width: 58px;
    margin-left: 10px;
    text-align: center;
}
.matchfailed_buttom  .Closeorder{
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
			dialogVisible: false,
			input: '',
			input1: '',
			pages:2,
			textarea:'',
			//生成时间
			value1: '',
			//所在地区
			value7: [],
			kk:[],
			//行业
			value3: industry_a.industry,
			kk2:'',
			//交易员
			value4: '',
			//表格
			tableData3: [],
			flag:false,
			downloading:false,
			add:false,
			forbid:false,
			open:false,
			examine:false,
		}
	},
	methods: {
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
		//关闭订单
		closetheorder(row){
			this.$data.dialogVisible = true
			this.$data.closeOrderdialog.order = row;
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
		submit(row){
			if(this.textarea != ''){
				this.$confirm('确认关闭订单？',{
					type: 'warning',
					lockScroll:false,
					closeOnClickModal:false
				})
				.then(_=>{
					let _this = this;
					let par2=  `id=${this.$data.closeOrderdialog.order.id}&status=${0}&reason=${this.$data.textarea}`
					API.failedclosetheorder(this.$data.closeOrderdialog.order.id,par2).then((res)=>{
						if(res.code == "200"){
							_this.$data.dialogVisible = false
						}else{
							_this.msg('error',"关闭订单操作失败")
						}
					},
					(error) => {
						_this.msg('error','服务器错误')
					})
				})
				.catch(_=>{return})
			} else {
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
		handleClose() {},
		//搜索
		matchfailed(row) {
			this.flag =true
			let _this = this;
			let par = {
				keyWord: this.$data.input,
				pageSize:6,
				pageNum:1,
				status:'-1013',
			};
			_this.loading = true
			API.searchfor(par).then((res) =>  {
				if(res.code == 200) {
					_this.$data.pages = res.data.total-0;
					_this.$data.tableData3 = res.data.list;
				} else {
					_this.msg('error','获取列表错误')
				}
				_this.$data.loading = false;
			},
			(error) => {
				_this.msg('error','服务器错误')
				_this.$data.loading = false;
			})
		},
		matchfai(row){//详情
			this.$store.commit('save_detail_info',row)
			this.$router.push({
				path: `/matchfai/${row.id}`
			})
		},
		//查询
		inquire(row){
			this.flag = false
			let par = {
				orderNumber:this.$data.input1,
				status:-1013,
				publicDate:this.$data.value1,
				provincesId: this.$data.kk[0],
				cityId: this.$data.kk[1],
				industry:this.$data.kk2,
				employeeName:this.$data.value4,
				pageNum:1
			};
			for (let i in par) {
				if(!par[i]){
					delete  par[i]
				}
			}
			this.getAllInfo(par)
		},
		//重置
		reset(row){
			this.$data.input = "";
			this.$data.input1 = "";
			this.$data.value1 = "";
			this.$data.kk = [];
			this.$data.kk2 = '';
			this.$data.value4 = "";
			let aa = {
				pageNum:1,
				pageSize:6,
				status:-1013,
			}
			this.getAllInfo(aa)
		},
		//分页
		pagination(pageNum){
			if(this.flag){
				let _this = this;
				let par = {
					keyWord: this.$data.input,
					pageSize:6,
					pageNum:pageNum,
					status:'-1013',
				};
				_this.loading = true
				API.searchfor(par).then((res) => {
					if(res.code == 200) {
						_this.$data.pages = res.data.total-0;
						_this.$data.tableData3 = res.data.list;
					} else {
						_this.msg('error','获取列表错误')
					}
					_this.$data.loading = false;
				},
				(error)=>{
					_this.msg('error','服务器错误')
					_this.$data.loading = false;
				})
			} else {
				let aa={
					pageNum:pageNum,
					pageSize:6,
					orderNumber:this.$data.input1,
					status:-1013,
					publicDate:this.$data.value1,
					provincesId: this.$data.kk[0],
					cityId: this.$data.kk[1],
					industry:this.$data.kk2,
					employeeName:this.$data.value4,
				}
				for (let i in aa) {
					if(!aa[i]){
						delete  aa[i]
					}
				}
				this.getAllInfo(aa)
			}
			
		},
		getAllInfo(par){
			let _this = this;
			this.loading = true
			API.allinformation(par).then((res)=>{
				if(res.code == 200) {
					_this.$data.pages = res.data.total-0;
					_this.$data.tableData3 = res.data.list;
				} else {
					_this.msg('error','获取列表失败')
				}
				_this.$data.loading = false;
			},
			(error)=>{
				_this.msg('error','服务器错误')
				_this.$data.loading = false;
			})
		}
	},
  	//接口
  	created(){
		let menu = JSON.parse(window.sessionStorage.getItem('menu'))
		menu.forEach((item)=>{
			if(item.name == "撮合信息管理"){
				item.children.forEach(item=>{
					if(item.name == '撮合失败' && item.children){
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
	  		pageNum:1,
	  		pageSize:6,
	  		status:-1013,
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
}
</script>
