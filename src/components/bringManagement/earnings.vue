<template>
	<!--待收益-->
	<div class="rewarded">
		<el-row class="rewarded_top">
    		<div class="xinxi">
    			<span>信息筛选</span>
    		</div>
    		<div class="sousuo">
    			<el-input v-model="input" placeholder="输入你想搜索的内容" clearable></el-input>
    			<el-button type="primary" icon="el-icon-search" @click="tobereward">搜索</el-button>
    		</div>
    	</el-row>
		<el-row class="rewarded_center">
    		<div class="rewarded_centershuju">
    			<span>订单号：</span><el-input v-model="input1" class="ppp" placeholder="" clearable></el-input>    			
    		</div>
    		<div class="rewarded_centershuju">
    			<span>订单状态：</span>
	    		<template>
	  				<el-select v-model="value" placeholder="" clearable>
	    				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
	  				</el-select>
				</template>
    		</div>
    		<div class="rewarded_centershuju">
				<div class="block">
					<span class="demonstration">生成时间：</span>
					<el-date-picker v-model="value1" type="date" placeholder="选择日期" style="line-height: 0px;" value-format="yyyy-MM-dd" :editable = "false"></el-date-picker>
				</div>
    		</div>
    		<div class="rewarded_centershuju">
    			<span>所在地区：</span>
	    		<el-cascader v-model="kk" :options="value7" change-on-select clearable @change="handleItemChange"></el-cascader>
    		</div>
    		<div class="rewarded_centershuju">
    			<span>行业：</span>
				<el-select v-model="kk2" clearable>
					<el-option v-for="item in value3" :key="item.label" :label="item.label" :value="item.label"> </el-option>
				</el-select>
    		</div>
    		<div class="rewarded_centershuju">
    			<span>交易员：</span>
	    		<el-input v-model="value4" class="ppp" placeholder="" clearable></el-input>
    		</div>
    		<div class="button">
    			<el-button @click="inquire">查询</el-button>
    			<el-button @click="reset">重置</el-button>
    		</div>
    	</el-row>
		<el-row class="rewarded_buttom">
    		<div class="quanbuxinxi">
    			<span>全部信息</span>
    		</div>
			<el-table :data="tableData3" border v-loading="loading">
				<el-table-column prop="" label="序号" type="index"></el-table-column>
				<el-table-column prop="orderNumber" label="订单号" width="220"></el-table-column>
				<el-table-column prop="projectName" label="标题" width="160"></el-table-column>
				<el-table-column prop="publishDate" label="生成时间" width="185"></el-table-column>
				<el-table-column prop="industry" label="行业" width="93"></el-table-column>
				<el-table-column prop="rzqy" label="融方企业" width="199"></el-table-column>
				<el-table-column prop="tzqy" label="投方企业" width="199"></el-table-column>
				<el-table-column label="地区" width="128">
					<template slot-scope="scope">
						{{scope.row.province}}{{scope.row.city}}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="订单状态" width="100">
					<template slot-scope="scope">
						<span :class="{'等待收益':'waitirevenue','财务审批':'inancaoval'}[scope.row.status]">{{scope.row.status}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="employeeName" label="交易员" width="100"></el-table-column>
				<el-table-column prop="operating" label="操作" >
					<template slot-scope="scope">	
						<el-button type="text" style="color: #3388ff;" @click="toberewarded(scope.row)">详情</el-button>
				</template>					
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :page-size="6" :total="pages" @current-change="pagination"></el-pagination>
   		</el-row>
	</div>
</template>
<style>
/*财务审批*/
.rewarded_buttom .inancaoval{
	color: #3388FF;	
}
/*等待收益*/
.rewarded_buttom .waitirevenue{
	color: #4DC036;
}
.rewarded{
	width: 99%;
	height: 99%;
}
.rewarded .el-table--enable-row-hover .el-table__body tr:hover>td{
  background: transparent;
}
.rewarded_top{
	width: 100%;
	height: 10%;
}
.rewarded_top .xinxi{
	width: 100%;
	height: 34%;
}
.rewarded_top .xinxi span{
	border-left: 2px solid #88b7e0;
	color: #556191;
	padding-left: 20px;
}
.rewarded_top .sousuo{
	width: 100%;
}
.rewarded_top .el-input{
	width: 400px;
}
.rewarded_top .el-input__inner{
	height: 36px;
    border-radius: 0;
    width: 400px;
    border: 1px solid #999999;
    padding-left: 21px;
}
.rewarded_top .sousuo button{
    margin-left: 6px;
    border: 0;
    border-radius: 0;
    height: 36px;
    padding-top: 11px;
    width: 100px;
    background: #4a4f63;
}
.rewarded_center{
	width: 100%;
	height: 17%;
}
.rewarded_center .el-input{
	width: 150px;
}
.rewarded_center .rewarded_centershuju{
	display: inline-block;
    margin: 25px 35px 0 0;
}
.rewarded_center .rewarded_centershuju span{
	color: #000000;
}
.rewarded_center .block .el-date-editor .el-input__prefix .el-input__icon{
	line-height: 0px;
}
.rewarded_center .block .el-date-editor .el-input__suffix .el-input__suffix-inner .el-input__icon{
	line-height: 0px;
}
.rewarded_center .el-input__inner{
	border-radius: 0;
	height: 30px;
	border: 1px solid #999999;
}
.rewarded_center .rewarded_centershuju .ppp{
	width: 180px;
}
.rewarded_center .button{
	text-align: center;
	margin-top: 65px;
}
.rewarded_center .button button{
	background: #4a4f63;
    width: 120px;
    height: 40px;
    margin-right: 111px;
    color: #ffffff;
}
.rewarded_buttom{
	width: 100%;
	height: 65%;
}
.rewarded_buttom .quanbuxinxi{
	margin: 25px 0px 25px 0px;
}
.rewarded_buttom .quanbuxinxi span{
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
}
.rewarded_buttom .el-table{
	width: 100%;
}
.rewarded_buttom .el-table th{
	text-align: center;
	background:#f5f6fa;
	color: #556191;
}
.rewarded_buttom .el-table tr{
	height: 30px;
	text-align: center;
}
.rewarded_buttom .el-table--enable-row-hover .el-table__row:nth-of-type(even){
    background:#f5f6fa;
}
.rewardedd_buttom .el-button--text{
	height: 10px;
	margin-left: 0px;	
}
.rewarded_buttom .el-pagination {
	text-align: right;
	margin-right: 22px;
    margin-top: 20px;
}
</style>
<script>
import API from '@/api/api.js'
import industry_a from '@/utils/industry.js'
export default {
	data() {
		return {
			loading: false,
			input: '',
			input1: '',
			pages:2,
			//订单状态
			options: [{
				value: '1013',
				label: '等待收益'
				}, {
				value: '1014',
				label: '财务审批'
				}
			],
			value: '',
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
		//搜索
		tobereward(row) {
			this.flag = true
			let _this = this;
			let par = {
				keyWord: this.$data.input,
				pageSize:6,
				pageNum:1,
				status:'1013,1014',
			};
			API.searchfor(par).then((res)=> {
				if(res.code == 200) {
					_this.$data.pages = res.data.total-0;
					_this.$data.tableData3 = res.data.list;
				} else {
					_this.msg('error','获取搜索结果失败')
				}
				_this.$data.loading = false;
			},
			(error)=>{
				_this.$data.loading = false;
				_this.msg('error','服务器错误')
			})
		},
		//跳转详情页面
		toberewarded(row){
			switch(row.status){
				case "财务审批":
					this.$store.commit('save_detail_info', row)
					this.$router.push({
						path: `/financialapproval/${row.id}`
					})
					break;
				case "等待收益":
					this.$store.commit('save_detail_info', row)
					this.$router.push({
						path: `/toberewarded/${row.id}`
					})
			}
		},
		//查询
		inquire(row){
			this.flag = false
			let _this = this;
			let par = {
				orderNumber:this.$data.input1,
				status:this.$data.value,
				publicDate:this.$data.value1,
				provincesId: this.$data.kk[0],
				cityId: this.$data.kk[1],
				industry:this.$data.kk2,
				employeeName:this.$data.value4,
				pageNum:1,
			};
			for (let i in par) {
				if(par[i] == ''){
					delete  par[i]
				}
			}
			this.getAllInfo(par)
		},
		//重置
		reset(row){
			this.$data.input = "";
			this.$data.value = "";
			this.$data.input1 = "";
			this.$data.value1 = "";
			this.$data.kk = [];
			this.$data.kk2 = '';
			this.$data.value4 = "";
			let aa = {
				pageNum:1,
				pageSize:6,
				status:"1013,1014",
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
					status:'1013,1014',
				};
				API.searchfor(par).then((res)=> {
					if(res.code == 200) {
						_this.$data.pages = res.data.total-0;
						_this.$data.tableData3 = res.data.list;
					} else {
						_this.msg('error','获取搜索结果失败')
					}
					_this.$data.loading = false;
				},
				(error)=>{
					_this.$data.loading = false;
					_this.msg('error','服务器错误')
				})
			} else {
				let aa = {
					pageNum:pageNum,
					pageSize:6,
					orderNumber:this.$data.input1,
					status:this.$data.value,
					publicDate:this.$data.value1,
					provincesId: this.$data.kk[0],
					cityId: this.$data.kk[1],
					industry:this.$data.kk2,
					employeeName:this.$data.value4,
				}
				for (let i in aa) {
					if(aa[i] == ''){
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
				_this.$data.loading = false
			},
			(error)=>{
				_this.$data.loading = false
				_this.msg('error','服务器错误')
			})
		}
	},
	//接口
  	created(){
		let menu = JSON.parse(window.sessionStorage.getItem('menu'))
		menu.forEach((item)=>{
			if(item.name == "撮合信息管理"){
				item.children.forEach(item=>{
					if(item.name == '待收益' && item.children){
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
	  		pageNum:1,
	  		pageSize:6,
	  		status:"1013,1014",
		}
		//初始化加载地区接口
		this.getAllInfo(aa)
		let vm = this
		API.area().then( result => {
			if(result.code == 200 && result.data != null){
				vm.$data.value7 = result.data
				vm.$data.value7.forEach(item => {
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
			} else {
				vm.$data.value7 = []
			}
		},
		(error)=>{
			vm.$data.value7 = []
		})
    },
  
}
</script>

  			