<!--企业认证页面-->
	<div class="enterprise">
		<el-form>
			<p class="title"><em>|</em> 信息筛选</p>
			<el-form-item>
				<el-input clearable size="mini" v-model="searchcontent" placeholder="输入你想搜索的内容" class="searchinput"></el-input>
				<el-button icon="el-icon-search" size="mini" class="darkbutton buttoninput" @click="search">搜索</el-button>
			</el-form-item>
			<br />
		</el-form>
		<el-form :inline="true" ref="queryform" :model="queryform" class="demo-form-inline">
			<el-form-item label="用户名" class="w140h30" prop="username">
				<el-input clearable size="mini" v-model="queryform.username" class="smallinput"></el-input>
			</el-form-item>
			<el-form-item label="姓名" class="w140h30" prop="name">
				<el-input clearable size="mini" v-model="queryform.name" class="smallinput"></el-input>
			</el-form-item>
			<el-form-item label="企业名称" class="w280h30" prop="companyName">
				<el-input clearable size="mini" v-model="queryform.companyName" class="idnum"></el-input>
			</el-form-item>
			<!--<el-form-item label="地区" prop="address" class="w140h30">
				<el-cascader clearable style="line-height: 30px;" placeholder="" :show-all-levels="false" expand-trigger="hover" :options="options" v-model="queryform.address">
				</el-cascader>
			</el-form-item>-->

			<el-form-item label="审核状态" class="w140h30" prop="status">
				<el-select clearable size="mini" v-model="queryform.status" placeholder="">
					<el-option label="待审核" value="0"></el-option>
					<el-option label="审核成功" value="1"></el-option>
					<el-option label="审核失败" value="-1"></el-option>
				</el-select>
			</el-form-item>
			<div style="text-align: center;">
				<el-button size="mini" class="darkbutton buttons" @click="query">查询</el-button>
				<el-button size="mini" class="darkbutton buttons" @click="reset">重置</el-button>
			</div>
		</el-form>
		<hr />
		<!--实名认证-->
		<div class="realnamecontent">
			<p class="title"><em>|</em> 实名认证</p>
			<el-table v-loading="loading1" :data="tableData" stripe border>
				<el-table-column label="序号" align="center" type="index" width="70">
				</el-table-column>
				<template v-for="i in tabelhead" class="tr">
					<el-table-column :label="i.title" align="center" :prop="i.prop" class="col"></el-table-column>
				</template>
				<el-table-column label="审核状态" prop="" align="center">
					<template slot-scope="scope">
						<span :class="{1:'success',0:'warning','-1':'danger',3:'info'}[scope.row.status]">
							{{ {'1':'审核成功','0':'待审核','-1':'审核失败'}[scope.row.status] }}
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<span>
							<el-button type="text" @click="onseeClick(scope.row)">查看</el-button>
						</span>
					</template>
				</el-table-column>

			</el-table>
			<el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="pagetotal" :page-size="pagesize" class="pageblock" :current-page.sync="currentPage1"></el-pagination>
		</div>

	</div>
</template>
<script>
	//共用方法
	import API from '@/api/api'
	import axios from 'axios'
	export default {
		data() {
			return {
				apiObj:{},
				currentPage1:1,
				searchcontent: '',
				//查询表单   所在地区   选项
				options: [{
					label: "上海市",
					value: "310000",
					children: [{
						label: "邢台市",
						value: "130500"
					}]
				}, {
					label: "内蒙古自治区",
					value: "150000",
					children: [{
						label: "石家庄市",
						value: "130100"
					}]
				}],

				loading1: true,
				type: 'enterprise',
				//查询表单
				queryform: {
					username: '',
					name: '',
					companyName: '',
					address: '',
					status: '',
				},
				pagesize: 6,
				pagetotal: 2,
				tableData: [],
				tabelhead: [
					//				{
					//						title: '序号',
					//						prop: 'id'
					//					},
					{
						title: '用户名',
						prop: 'username'
					},
					{
						title: '姓名',
						prop: 'name'
					},
					{
						title: '企业名称',
						prop: 'companyName'
					},
					{
						title: '注册地区',
						prop: 'address'
					}, {
						title: '营业执照注册号',
						prop: 'businessLicenseNum'
					}
				],
			}
		},
		methods: {
			Status(row){
				let arr = ['addressStatus', 'imgStatus', 'nameStatus', 'numStatus', 'timeStatus'];
				for(let value of arr) {
					if(row[value] == '0') { //待审核
						return '0';
					}
				}
				for(let value of arr) {
					if(row[value] == '-1') { //审核失败
						return '-1';
					}
				}
				for(let value of arr) {
					if(row[value] != '1') { //审核失败
						return false;
					}
				}
				//审核成功
				return '1';
			
			},
			//搜索接口
			Enterpriseauthenti(par) {
				par.pageSize = this.$data.pagesize;
				let _this = this;
				this.$data.apiObj.type="search";
				this.$data.apiObj.params=par;
				API.Enterpriseauthenti(par).then(function(res) {
					if(res.code == 200) {
						_this.$data.tableData = res.data.list;
					} else {
						_this.$message.error({
							showClose: true,
							message: '列表获取失败',
							duration: 2000
						});
					};
					_this.$data.loading1 = false;
				}, function(err) {
					_this.$message.error({
						showClose: true,
						message: '服务器错误',
						duration: 2000
					});
					_this.$data.loading1 = false;
				});
			},
			//查询接口
			queryData(params) {
				let _this = this;
				params.pageSize = this.$data.pagesize;
				this.$data.loading1 = true;
				this.$data.tableData = [];
				this.$data.apiObj.type="query";
				this.$data.apiObj.params=params;
				API.enterpriseAuthQuery(params).then(function(res) {
					if(res.code == 200) {
						_this.$data.pagetotal = res.data.total - 0;
						res.data.list.forEach(function(value){
							value.status=_this.Status(value);
						})
						_this.$data.tableData = res.data.list;
					} else {
						_this.$message.error({
							showClose: true,
							message: '列表获取失败',
							duration: 2000
						});
					}
					_this.$data.loading1 = false;
				}, function(err) {
					_this.$message.error({
						showClose: true,
						message: '服务器错误',
						duration: 2000
					});
					_this.$data.loading1 = false;
				});
			},
			//搜索按钮
			search() {
				this.$data.currentPage1=1;
				this.$data.pageFlag=true
				this.$data.loading1 = true;
				let par = {
					keyWord: this.$data.searchcontent,
					pageNum: 1
				};
				//调用搜索接口
				this.Enterpriseauthenti(par);
			},
			//查看按钮
			onseeClick(row) {
				this.$store.commit('save_detail_info', row);
				this.$router.push({
					path: `/detail/1${row.userId}`
				});
			},
			//分页按钮
			pagechange(pagenum) {
				if(this.$data.pageFlag==true){
					this.$data.pageFlag=false
					return false;
				}
				this.$data.apiObj.params.pageNum=pagenum;
				if(this.$data.apiObj.type=="search"){
					this.Enterpriseauthenti(this.$data.apiObj.params);
				}else if(this.$data.apiObj.type=="query"){
					this.queryData(this.$data.apiObj.params);
				}
			},
			//查询按钮
			query() {
				this.$data.currentPage1=1;
				this.$data.pageFlag=true
				let par = {
					pageNum: 1,
					userId: '',
				}
				//参数合并
				let queryform = this.$data.queryform
				for(let key in queryform) {
					par[key] = queryform[key];
				}
				this.queryData(par);
			},
			//重置按钮
			reset() {
				this.$refs['queryform'].resetFields();
				this.$data.searchcontent = '';
				this.$data.currentPage1=1;
				this.$data.pageFlag=true
				this.query();
			},
		},
		mounted() {
			let _this = this;
			//接口 参数
			let par = {
				pageNum: 1,
				userId: '',
				companyName: '',
				address: '',
				status: '',
				name: '',
				username: '',
			};
			//企业认证
			this.queryData(par);

		}
	}
</script>
<style scope lang="scss">
	.enterprise {
		.el-input__icon {
			line-height: 30px;
		}
		font-family: 'PingFang SC Bold' !important;
		em {
			font-style: normal;
		}
		/*分隔栏*/
		hr {
			height: 10px;
			background: #f3f4f7;
			border: none;
			margin-left: -35px;
			margin-right: -35px;
			margin-top: 20px;
		}
		/*当前页面所有input框*/
		input {
			border-radius: 0;
			border: 1px solid #999;
		}
		.buttons {
			width: 126px;
		}
		.el-form-item__content {
			line-height: 35px;
		}
		/*黑色按钮共用样式*/
		.darkbutton {
			height: 35px;
			background-color: #4a4f63;
			color: #fff;
		}
		/*模块标题*/
		.title {
			margin-top: 0;
			margin-bottom: 20px;
			font-size: 16px;
			color: #556191;
			em {
				color: #556191;
				margin-right: 10px;
			}
		}
		/*搜索 输入框*/
		.searchinput {
			vertical-align: middle;
			width: 400px;
			input {
				width: 398px;
				height: 35px;
				background-color: #fff;
				border: 1px solid #999;
			}
		}
		/*搜索按钮*/
		.buttoninput {
			width: 98px;
			height: 35px;
			border: 1px solid #999;
		}
		.el-form-item {
			margin-bottom: 28px;
			.el-form-item__label {
				line-height: 36px;
			}
		}
		/*设置用户名 姓名中的 文本框*/
		.w140h30 input {
			width: 140px;
			height: 30px;
		}
		.w280h30 input {
			width: 280px;
			height: 30px;
		}
		/*实名认证 模块*/
		.realnamecontent {
			margin-top: 20px;
		}
		/*标题单元格的高度*/
		.realnamecontent tr>td {
			height: 69px;
		}
		/*表头的背景颜色*/
		.realnamecontent .el-table__header-wrapper thead>tr {
			background-color: #f3f4f7;
		}
		/*表头*/
		.el-table__header {
			.cell {
				font-size: 20px;
				color: #556191;
				font-weight: normal;
			}
		}
		/*表体*/
		.el-table__body {
			.cell {
				font-size: 18px;
				color: #535458;
			}
		}
		/*分页*/
		.pageblock {
			text-align: right;
			margin-top: 22px;
		}
		/*成功状态样式*/
		.success {
			color: #67C23A;
		}
		/*警告状态样式*/
		.warning {
			color: #E6A23C;
		}
		/*危险状态样式*/
		.danger {
			color: #F56C6C;
		}
		/*提示信息 状态样式*/
		.info {
			color: #909399;
		}
	}
</style>
