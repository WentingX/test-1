<template>
	<!--个人认证页面-->
	<div class="personage">
		<el-form>
			<p class="title"><em>|</em> 信息筛选</p>
			<el-form-item style="margin-bottom: 0;">
				<el-input clearable placeholder="输入你想搜索的内容" class="searchinput" v-model="searchcontent"></el-input>
				<el-button icon="el-icon-search" size="mini" class="buttoninput darkbutton" @click="search(searchcontent)">搜索</el-button>
			</el-form-item>
			<br />
		</el-form>
		<el-form :inline="true" ref="queryform" :model="queryform" class="demo-form-inline">
			<el-form-item label="用户名" class="w140h30" prop="username">
				<el-input clearable size="mini" v-model="queryform.username" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="姓名" class="w140h30" prop="name">
				<el-input clearable size="mini" v-model="queryform.name" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="身份证号" class="w280h30" prop="idCard">
				<el-input clearable size="mini" v-model="queryform.idCard" placeholder="" class="idnum"></el-input>
			</el-form-item>
			<el-form-item label="审核状态" class="w140h30" prop="status">
				<el-select clearable size="mini" v-model="queryform.status">
					<el-option label="待审核" value="0"></el-option>
					<el-option label="审核成功" value="1"></el-option>
					<el-option label="审核失败" value="-1"></el-option>
				</el-select>
			</el-form-item>
			<div style="text-align: center; margin-top: 8px;">
				<el-button size="mini" class="darkbutton buttons" style="margin-right: 40px;" @click="query">查询</el-button>
				<el-button size="mini" class="darkbutton buttons" style="margin-left: 40px;" @click="reset">重置</el-button>
			</div>
		</el-form>
		<hr />
		<div class="realnamecontent">
			<p class="title"><em>|</em> 实名认证</p>
			<el-table v-loading="loading1" :data="tableData" stripe border>
				<el-table-column label="序号" align="center" type="index" width="70">
				</el-table-column>
				<template v-for="i in tabelhead" class="tr">
					<el-table-column :label="i.title" align="center" :prop="i.prop"></el-table-column>
				</template>
				<el-table-column label="审核状态" prop="" align="center">
					<template slot-scope="scope">
						<span :class="{1:'success',0:'warning','-1':'danger',3:'info'}[scope.row.status]">
							{{{1:'审核成功',0:'待审核','-1':'审核失败'}[scope.row.status]}}
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
			<el-pagination :page-size="pagesize" @current-change="pagechange" background layout="prev, pager, next" :total="pagetotal" class="pageblock" :current-page.sync="currentPage1"></el-pagination>
		</div>

	</div>
</template>
<script>
	//共用方法
	import API from '@/api/api'
	export default {
		data() {
			return {
				apiObj: {},
				currentPage1: 1,
				searchcontent: '',
				loading1: true,
				type: 'person',
				pagesize: 6,
				pagetotal: 0,
				//查询表单
				queryform: {
					username: "",
					idCard: '',
					name: "",
					status: '',
				},
				tableData: [],
				tabelhead: [
					//					{
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
						title: '身份证号码',
						prop: 'idCard'
					},
				],
				tableparams: {},
				pageFlag: false,
			}
		},
		methods: {
			//订单状态判断
			Status(row) {
				console.log(99, row)
				console.log(row)
				let arr = ['backStatus', 'cardStatus', 'frontStatus', 'handStatus', 'nameStatus'];
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
			//查询接口
			queryData(params) {
				let _this = this;
				_this.$data.tableData = [];
				params.pageSize = this.$data.pagesize;
				this.$data.tableData = [];
				this.apiObj.type = "query";
				this.apiObj.params = params;
				API.personAuthQuery(params).then(function(res) {
					if(res.code == 200) {
						_this.$data.pagetotal = res.data.total - 0;

						res.data.list.forEach(function(value) {
							value.status = _this.Status(value)
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
			//搜索接口
			personalenterpriseau(par) {
				let _this = this;
				_this.$data.tableData = [];
				par.pageSize = this.$data.pagesize;
				this.apiObj.type = "search";
				this.apiObj.params = par;
				API.personalenterpriseau(par).then(function(res) {
					if(res.code == 200) {
						_this.$data.pagetotal = res.data.total - 0;
						_this.$data.tableData = res.data.list
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
				})
			},
			//查看按钮
			onseeClick(row) {
				this.$store.commit('save_detail_info', row);
				this.$router.push({
					path: `/detail/0${row.userId}`
				});
			},
			//分页按钮
			pagechange(pagenum) {
				this.$data.loading1 = true;
				if(this.$data.pageFlag == true) {
					this.$data.pageFlag = false
					return false;
				}
				this.apiObj.params.pageNum = pagenum;
				if(this.apiObj.type == "query") {
					this.queryData(this.apiObj.params);
				} else if(this.apiObj.type == "search") {
					this.personalenterpriseau(this.apiObj.params);
				};
			},
			//搜索按钮
			search(txt) {
				this.$data.loading1 = true;
				this.$data.currentPage1 = 1;
				this.$data.pageFlag = true;
				this.$data.apiObj.type == "search";
				this.$data.apiObj.params = txt;
				this.$data.loading1 = true;
				let par = {
					keyWord: txt,
					pageNum: 1,
				};
				//搜索接口
				this.personalenterpriseau(par);
			},
			//查询按钮
			query() {
				this.$data.loading1 = true;
				this.$data.currentPage1 = 1;
				this.$data.pageFlag = true;
				let par = {
					pageNum: 1,
					id: '',
				}
				let queryform = this.$data.queryform;
				for(let key in queryform) {
					par[key] = queryform[key];
				}
				this.$data.tableparams = par;
				//查询接口
				this.queryData(par);
			},
			//重置按钮
			reset() {
				this.$data.loading1 = true;
				this.$refs['queryform'].resetFields();
				this.$data.searchcontent = '';
				this.$data.currentPage1 = 1;
				this.$data.pageFlag = true;
				this.query();
			},
		},
		mounted() {
			this.$data.loading1 = true;
			let par = {
				//				id: JSON.parse(sessionStorage.getItem("access-user")).userid,
				id: '',
				pageNum: 1,
				name: '',
				idCard: '',
				status: '',
				username: ''
			};
			this.$data.tableparams = par;
			this.queryData(par)
		}
	}
</script>
<style scope lang="scss">
	.personage {
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
		.personage .el-table thead {
			color: #556191;
			/*font-size: 19px;*/
		}
	}
</style>
