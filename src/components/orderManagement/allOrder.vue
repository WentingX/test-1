<template>
	<!--全部订单管理--页面-->
	<div class="allOrder">
		<div class="tab1">
			<el-row>
				<el-col>
					<el-form :inline="true" class="form-inline" @submit.native.prevent>
						<el-form-item class="mb30">
							<el-input clearable v-model="searchcontent" class="search" style="width: 400px;" placeholder="输入你想搜索的内容"></el-input>
						</el-form-item>
						<el-form-item class="mb30">
							<el-button type="button" size="mini" icon="el-icon-search" class="buttoninput darkbutton" @click="search">搜索</el-button>
						</el-form-item>
						<br />
					</el-form>
					<el-form :inline="true" :model="queryform" class="form-inline" ref="queryform">
						<el-form-item label="用户名" prop="userId" class="w180h30">
							<el-input clearable v-model="queryform.userId"></el-input>
						</el-form-item>
						<el-form-item label="订单号" prop="orderNumber" class="w180h30">
							<el-input clearable v-model="queryform.orderNumber"></el-input>
						</el-form-item>
						<el-form-item label="生成时间" prop="createDate">
							<el-date-picker :editable=false value-format="yyyy-MM-dd" v-model="queryform.createDate" type="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="订单类型" prop="type" class="w140h30">
							<el-select clearable v-model="queryform.type" placeholder="">
								<el-option label="投融信息" :value="0"></el-option>
								<el-option label="尽职调查" :value="1"></el-option>
								<el-option label="投后管理" :value="2"></el-option>
								<el-option label="高端定制" :value="3"></el-option>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="订单状态" prop="status" class="w140h30">
							<el-select clearable v-model="queryform.status" placeholder="">
								<template v-for="(value,key) in status">
									<el-option :label="value" :value="key"></el-option>
								</template>
							</el-select>
						</el-form-item>
						<el-form-item label="行业类型" prop="industry" class="w140h30">
							<el-select clearable v-model="queryform.industry" placeholder="">
								<el-option v-for="i in ['金融','互联网']" :label="i" :value="i"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所在地区" prop="city" class="w165h30">
							<el-cascader change-on-select clearable style="line-height: 30px;" placeholder="" :show-all-levels="false" :options="areaData" v-model="queryform.city">
							</el-cascader>
						</el-form-item>
						<el-form-item label="审核员" class="w180h30" prop="contact">
							<el-input clearable v-model="queryform.contact"></el-input>
						</el-form-item>
						<!--<el-form-item prop="isTrueLobby" label="是否已同步大厅" v-if="tab1activeindex==0" class="w165h30">
							<el-select clearable v-model="queryform.isTrueLobby" placeholder="">
								<el-option v-for="(key,value) in {'02':'否','01':'是'}" :label="key" :value="value"></el-option>
							</el-select>
						</el-form-item>-->
						<el-row class="center">
							<el-col>
								<el-form-item style="margin-bottom: 0;">
									<el-button size="medium" class="darkbutton buttons" style="margin-right: 40px;" @click="query">
										查询
									</el-button>
									<el-button @click="resetform('queryform')" size="medium" class="darkbutton buttons" style="margin-left: 40px;">
										重置
									</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>
		</div>
		<hr/>
		<p class="title">
			<em>|</em> 全部订单
		</p>
		<div class="tab2">
			<el-table v-loading="loading1" :data="tabeldata" stripe border>
				<el-table-column label="序号" align="center" type="index" width="70">
				</el-table-column>
				<el-table-column prop="createdate" label="生成时间" align="center">
					<template slot-scope="scope">
						{{scope.row.createdate}}
					</template>
				</el-table-column>
				<el-table-column prop="userid" label="用户名" align="center">
				</el-table-column>
				<el-table-column prop="orderNumber" label="订单号" align="center">
				</el-table-column>
				<el-table-column prop="type" label="类型" align="center" width="110">
					<template slot-scope="scope">
						{{['投融信息','尽职调查','投后管理','高端定制'][scope.row.type]}}
					</template>
				</el-table-column>
				<el-table-column prop="province" label="地区" align="center" width="66">
				</el-table-column>
				<el-table-column prop="industry" label="行业" align="center" width="90">
				</el-table-column>
				<el-table-column prop="status" label="状态" align="center" width="90">
					<template slot-scope="scope">
						<span :class="((warn.indexOf(scope.row.status-0)>=0)&&'warn')||((danger.indexOf(scope.row.status-0)>=0)&&'danger')||((success.indexOf(scope.row.status-0)>=0)&&'success')||((blue.indexOf(scope.row.status-0)>=0)&&'blue')">
							{{statusText(scope)}}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="dtime" label="状态存在时间" align="center" width="110">
				</el-table-column>
				<el-table-column prop="contact" label="审核员" width="90" align="center">
				</el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button type="text" style="color: #409EFF;text-decoration: underline;" @click="todetail(scope.row)">
							详情
						</el-button>
						<el-button v-if="scope.row.status!=-2&&scope.row.status!=1030" type="text" style="color: #DF1F1F;text-decoration: underline;" @click="closeOrder(scope.row)">
							关闭订单
						</el-button>
						<el-button v-else-if="scope.row.status!=1030" type="text" style="color: #535458;">
							已关闭
						</el-button>
						<template v-if="scope.row.status!=1030&&scope.row.status!=-1030">
							<el-button v-if="scope.row.contact!=undefined&&scope.row.status!=-2" @click="transferTask1(scope.row)" type="text" style="color: #535458;text-decoration: underline;">
								任务转移
							</el-button>
							<el-button v-else-if="scope.row.status!=-2" @click="transferTask1(scope.row)" type="text" style="color: #535458;text-decoration: underline;">
								任务派发
							</el-button>
						</template>
					</template>
				</el-table-column>
			</el-table>
			<!--分页器-->
			<el-pagination background layout="prev, pager, next" :total="pagetotal" :page-size="pagesize" @current-change="pagechange" :current-page.sync="currentPage1">
			</el-pagination>
		</div>
		<!--任务转移弹框-->
		<div class="dialog1">
			<el-dialog :visible.sync="dialogflag" @open="taskDialog" :close-on-click-modal="false">
				<template v-if="currentdata.length>=1">
					<p class="title">
						<em>|</em>
						<span style="vertical-align: middle;">
							当前信息
						</span>
					</p>
					<el-table v-loading="loading2" :data="currentdata" border style="width: 100%;margin-bottom: 18px;">
						<el-table-column prop="orderNumber" label="订单号" align="center">
						</el-table-column>
						<el-table-column prop="employeeName" label="姓名" align="center">
						</el-table-column>
						<el-table-column prop="telephone" label="手机号码" align="center">
						</el-table-column>
						<el-table-column prop="jobNumber" label="工号" align="center">
						</el-table-column>
						<el-table-column prop="matchStatus" label="订单状态" align="center">
						</el-table-column>
						<el-table-column prop="roleName" label="权限" align="center">
						</el-table-column>
						<template v-if="currentdata.length>=2">
							<el-table-column prop="operation" label="操作员" align="center">
							</el-table-column>
							<el-table-column prop="updateDate" label="最后转移时间" align="center">
							</el-table-column>
						</template>
					</el-table>
				</template>

				<p class="title">
					<em>|</em>
					<span style="vertical-align: middle;">
						员工列表
					</span>
				</p>
				<el-table v-loading="loading3" :data="staffdata" border style="width: 100%">
					<el-table-column prop="name" label="员工姓名" align="center">
					</el-table-column>
					<el-table-column prop="jobNumber" label="工号" align="center">
					</el-table-column>
					<el-table-column prop="phone" label="手机号码" align="center">
					</el-table-column>
					<el-table-column prop="taskNumber" label="当前任务数量" align="center">
					</el-table-column>
					<el-table-column prop="roleName" label="权限" align="center">
						<!--<template slot-scope="scope">
							<div>{{['一级员工','二级员工','三级员工','四级员工'][scope.row.jurisdiction]}}</div>
						</template>-->
					</el-table-column>
					<el-table-column prop="address" label="操作" align="center">
						<template slot-scope="scope">
							<el-button v-if="currentdata.length==0" type="text" style="text-decoration: underline;color: #ffc731;" @click="transferTask(scope)">
								派发任务
							</el-button>
							<el-button v-else type="text" style="text-decoration: underline;color: #ffc731;" @click="transferTask(scope)">
								转移任务
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination background layout="prev, pager, next" :total="pagetotal1" :page-size="pagesize1" @current-change="pagechange1" :current-page.sync="currentPage2">
				</el-pagination>
			</el-dialog>
		</div>
		<!--关闭理由弹框-->
		<el-dialog class="borde" title="订单关闭理由" :visible.sync="closeOrderdialog.flag" :close-on-click-modal="false">
			<el-row :gutter="24" style="margin-top: 32px;margin-bottom: 20px;">
				<el-col :span="7">
					<span class="dialogspan" style="width: 150px;">
						订单关闭理由：
					</span>
				</el-col>
				<el-col :span="17">
					<el-input clearable v-model="closeOrderdialog.content" type="textarea"></el-input>
				</el-col>
			</el-row>
			<div>
				<el-row class="center">
					<el-button size="mini" type="button" class="buttons" @click="submitReason">
						确定
					</el-button>
				</el-row>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import API from '@/api/api'
	export default {
		data() {
			return {
				areaData: [],
				loading1: false, //全部订单  加载动画
				loading2: false, //当前信息  加载动画
				loading3: false, //员工列表  加载动画
				currentPage1: 1, //  全部订单  当前页
				currentPage2: 1, //弹框  员工列表 当前页
				tabClick: false, //防止  查询时  重置当前页调用两次接口
				dialogOpen: false, //防止  弹窗打开  重置当前页调用两次接口
				//上一次调用的接口 和参数
				interface: {
					apiname: 'allNewOrder',
						params: null,
				},
				searchcontent: '', // 搜索框  绑定的值
				//  关闭订单  弹框 状态
				closeOrderdialog: {
					flag: false,
					content: '',
					order: null,
				},
				//订单状态 和后台标识
				status: {
					'1001': '待审核',
					'1022': '待派单',
					'1023': '派单中',
					'1024': '已接单/进行中',
					'-10000': '超时',
					'1026': '待验收',
					'102701': '验收通过1（信息） ',
					'102702': '验收通过2（信息） ',
					'1002': '审核成功',
					'-1001': '审核失败',
					'1027': '待收益',
					'1014': '财务审批',
					'1030': '交易成功',
					'-1030': '交易失败',
					'1043': '待收益',
					'1038': '待接单',
					'1039': '进行中',
					'-1020': '验收失败（等于审核失败，需求中）',
				},
				warn: [1022, 1026, 1001], //警告样式--订单类型
				success: [1043,1014, 1002, 1030, 1027, 1024], //成功样式--订单类型
				danger: [-1001, -1030], //失败样式--订单类型
				blue: [1023], //蓝色字体--订单类型
				pagesize: 6, //全部订单  单页  条数
				pagesize1: 3, //员工列表  单页  条数
				pagetotal: 0, //全部订单   总条数
				pagetotal1: 0, //员工列表   总条数
				dialogflag: false, //任务转移弹框
				//查询   form 表单
				queryform: {
					userId: '',
					orderNumber: '',
					type: '',
					status: '',
					industry: '',
					provinceId: '',
					contact: '',
					//isTrueLobby: '',
					createDate: '',
				},
				tabeldata: [], //全部订单   表格数据
				currentdata: [], //任务转移弹框   当前信息  表格数据
				staffdata: [], //任务转移弹框  员工列表   表格数据
				taskObj: {}, //任务转移    保存  订单信息
			}
		},
		methods: {
			data1(data) {
				let _this = this;
				for(let i of data) {
					if(i.province) {
						i.label = i.province;
						delete i.province;
						i.value = i.provinceid;
						delete i.provinceid;
					}
					if(i.city) {
						i.label = i.city;
						delete i.city;
						i.value = i.cityid;
						delete i.cityid;
					}
					if(i.children) {
						if(i.children.length == 2) {
							delete i.children;
						} else {
							_this.data1(i.children)
						}
					}
				}
			},
			statusText(scope) {
				return this.$data.status[scope.row.status];
			},
			msg(type, txt) {
				this.$message[type]({
					showClose: true,
					message: txt,
					duration: 2000
				});
			},
			//全部订单接口：返回所有类型订单
			allNewOrder(params) {
				let _this = this;
				_this.$data.tabeldata = []; //清空表
				_this.$data.loading1 = true; //显示加载动画
				params.pageSize = _this.$data.pagesize; //设置单页条数
				_this.$data.interface.apiname = 'allNewOrder';
				_this.$data.interface.params = params; //保存接口所用参数，分页要用
				API.allNewOrder(params).then(function(res) {
					if(res.code == 200) {
						_this.$data.pagetotal = res.data.total - 0;
						_this.$data.tabeldata = res.data.list;
					} else {
						_this.msg('error', '列表获取失败');
					}
					_this.$data.loading1 = false; //隐藏加载动画
				}, function(err) {
					_this.msg('error', '服务器错误');
					_this.$data.loading1 = false;
				});
			},
			//搜索按钮接口
			orderSearch() {
				let _this = this;
				let params = _this.$data.searchcontent; //获取搜索框的值
				_this.$data.interface.params = params; //保存搜索参数
				_this.$data.interface.apiname = 'orderSearch'; //保存搜索类型
				API.selAllEmployeeOder(params).then(function(res) {
					if(res.code == 200) {
						_this.$data.tabeldata = res.data.list;
						_this.$data.pagetotal = res.data.total - 0;
					} else {
						_this.msg('error', '列表获取失败');
					}
					_this.$data.loading1 = false; //隐藏加载动画
				}, function(err) {
					_this.msg('error', '服务器错误');
					_this.$data.loading1 = false; //隐藏加载动画
				});
			},
			//当前信息  接口
			presentInfo() {
				let _this = this;
				let par = {
					id: _this.$data.taskObj.id,
					type: _this.$data.taskObj.type == 0 ? '01' : '02',
				}
				console.log(_this.$data.taskObj, 378)
				API.presentInfo(par).then(function(res) {
				console.log(res,384)
					if(res.code == 200) {
						_this.$data.currentdata = res.data.list;
					} else {
						_this.msg('error', '列表获取失败');
					}
					_this.$data.loading2 = false;
				}, function(err) {
					_this.msg('error', '服务器错误');
					_this.$data.loading2 = false;
				});
			},
			//员工列表接口
			findListAllZP(pageNum) {
				let _this = this;
				let par = {
					id: _this.$data.taskObj.id,
					pageNum: pageNum,
					pageSize: _this.$data.pagesize1,
					type:_this.$data.taskObj.type==0?'01':'02'
				};
				_this.$data.staffdata = [];
				_this.$data.loading3 = true; //显示加载动画
				API.findListAllZP(par).then(function(res) {
					if(res.code == 200) {
						_this.$data.pagetotal1 = res.data.total - 0;
						_this.$data.staffdata = res.data.list;
					} else {
						_this.msg('error', '列表获取失败');
					}
					_this.$data.loading3 = false;
				}, function(err) {
					_this.msg('error', '服务器错误');
					_this.$data.loading3 = false;
				});
			},
			//重置表单
			resetform(formmodel) {
				this.$refs[formmodel].resetFields();
				this.$data.searchcontent = '';
				this.query(); //调用查询按钮
			},
			//详情链接
			todetail(row) {
				//				sessionStorage.setItem('temp1', JSON.stringify({
				//					type: row.type, //订单类型
				//					status: row.status, //订单状态
				//				}));

				// for(let i of this.$store.state.options) {
				// 	if(i.name.indexOf(this.status[row.status]) >= 0) {
				// 		i.route = `/orderdetails/${row.id}/${row.orderNumber}`;
				// 	}
				// }
				this.$router.push({
					path: `/orderdetails/${row.id}/${row.orderNumber}`
				});
			},
			//关闭订单  链接
			closeOrder(row) {
				if(row.status == -2) {
					return false;
				}
				this.$data.closeOrderdialog.flag = true; //显示 关闭订单弹框
				this.$data.closeOrderdialog.order = row; //保存关闭订单所在的数据行
			},
			//提交   关闭理由  
			submitReason() {
				let _this = this;
				let xq = '';
				if(this.$data.closeOrderdialog.order.type == 0) {
					xq = "01"; //信息订单
				} else {
					xq = "02"; //需求订单
				}
				if(this.$data.closeOrderdialog.content.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
					_this.msg('error', '内容不能为空');
					return false;
				}
				let par = `orderNumber=${this.$data.closeOrderdialog.order.id}&failureReason=${this.$data.closeOrderdialog.content}&xq=${xq}`;
				API.closeOrder(par).then(function(res) {
					if(res.code == 200) {
						_this.$data.closeOrderdialog.order.status = -2; //文字变为  已关闭
					} else {
						_this.msg('error', '理由提交失败');
					}
					_this.$data.closeOrderdialog.flag = false; //弹框消失
				}, function(err) {
					_this.msg('error', '服务器错误');
					_this.$data.closeOrderdialog.flag = false; //弹框消失
				});
				//重置关闭理由弹框
				this.$data.closeOrderdialog.id = null;
				this.$data.closeOrderdialog.content = '';
			},
			//查询按钮
			query() {
				this.$data.tabClick = true; //防止调用两次接口
				this.$data.currentPage1 = 1; //分页重置
				this.$data.tabClick = false;
				let par = {
					pageNum: 1, //第几页
					classify: '',
				}
				let queryform = this.$data.queryform
				//对象合并
				for(let key in queryform) {
					par[key] = queryform[key];
				}
				if(par.city && par.city.length == 2) {
					par.provinceId = par.city[1];
				} else if(par.city != undefined) {
					par.provinceId = par.city[0];
				}
				delete par.city;
				this.allNewOrder(par);
			},
			//分页点击按钮
			pagechange(num) {
				if(this.$data.tabClick == true) {
					return false;
				};
				let par = this.$data.interface.params; //读取   保存的查询参数
				par.pageNum = num;
				console.log(508);
				this.allNewOrder(par);
			},
			//任务弹框  里 的分页
			pagechange1(num) {
				if(this.$data.dialogOpen) {
					return false;
				}
				this.findListAllZP(num);
			},
			//任务派发   链接
			transferTask1(row) {
				this.$data.dialogflag = true;
				this.$data.taskObj = row;
			},
			//任务转移 弹框打开事件
			taskDialog() {
				this.$data.loading2 = true;
				this.$data.loading3 = true;

				this.$data.staffdata = [];
				this.$data.currentdata = [];
				this.$data.dialogOpen = true;
				this.$data.currentPage2 = 1; //重置 当前页
				this.$data.dialogOpen = false; //过滤  弹框打开时  重置分页执行事件
				this.presentInfo(); //当前信息
				this.findListAllZP(1); //员工列表
			},
			transferTask(scope) {
				let _this = this;
				let row = scope.row;
				this.$data.taskObj.contact = row.name;
				let par1 = {
					employeeId: row.id,
					orderId: _this.$data.taskObj.id,
					orderNumber: this.$data.taskObj.orderNumber,
					duty: row.roleId ? row.roleId : "0",
					operation: JSON.parse(sessionStorage.getItem("access-user")).userid,
					type: this.$data.taskObj.type == 0 ? '01' : '02'
				};
				let parStr = [];
				for(let i in par1) {
					parStr.push(`${i}=${par1[i]}`);
				}
				parStr = parStr.join('&');
				API.orderDesignate(parStr).then(function(res) {
					if(res.data.code == 200) {
						_this.presentInfo();
						_this.findListAllZP(1); //员工列表
						_this.msg('success', '转移任务成功');
					} else {
						_this.msg('error', '转移任务失败');
					}
				}, function(err) {
					_this.msg('error', '服务器错误');
				})
				return;
			},
			search() {
				this.orderSearch();
			}
		},
		created() {
			let _this = this;
			API.area().then(function(res) {
				if(res.code == 200) {
					_this.data1(res.data)
					_this.areaData = res.data;
				}
			});
			let par = {
				pageNum: 1,
				classify: '',
			};
			let queryform = this.$data.queryform
			for(let key in queryform) {
				par[key] = queryform[key];
			}
			this.allNewOrder(par);
		},
	}
</script>
<style scope lang="scss">
	.el-input__icon {
		line-height: 30px;
	}
	
	.el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 165px;
	}
	
	.el-date-editor--date {
		input {
			height: 30px;
		}
	}
	
	.el-input__prefix {
		right: 5px;
		left: inherit;
		i {
			line-height: 33px;
		}
	}
	
	.allOrder {
		font-family: 'PingFang SC Bold' !important;
		em {
			font-style: normal;
		}
		/*成功状态*/
		.success {
			color: #67C23A;
		}
		/*警告状态*/
		.warn {
			color: #ffc731;
		}
		/*危险状态*/
		.danger {
			color: #F56C6C;
		}
		.blue {
			color: #409EFF;
		}
		/*当前页面所有input框*/
		input {
			border-radius: 0;
			border: 1px solid #999;
		}
		/*分隔栏*/
		hr {
			height: 10px;
			background: #f3f4f7;
			border: none;
			margin-left: -35px;
			margin-right: -35px;
			margin-top: 20px;
			margin-bottom: 20px;
		}
		.search {
			input {
				vertical-align: middle;
				width: 400px;
				height: 35px;
			}
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
		/*查询文本框*/
		.w180h30 {
			input {
				width: 180px;
				height: 30px;
			}
		}
		.w165h30 {
			input {
				width: 165px;
				height: 30px;
			}
		}
		.w140h30 {
			input {
				width: 140px;
				height: 30px;
			}
		}
		/*搜索按钮*/
		.buttoninput {
			width: 100px;
			height: 35px;
			border: 1px solid #999;
		}
		/*搜索部分*/
		.tab1 {
			.el-tabs__content {
				display: block;
			}
			/*选项卡*/
			.el-tabs__header {
				margin-bottom: 20px;
			}
			/*选项卡下边线*/
			.el-tabs__active-bar {
				height: 3px;
			}
			/*活动选项卡*/
			.el-tabs .el-tabs__header .el-tabs__item.is-active {
				background: transparent;
				color: #373d41;
			}
			.buttons {
				width: 126px;
				/*width: 40%;*/
				height: 35px;
				min-width: 126px;
				max-width: 126px;
				background-color: #4a4f63;
				color: #fff;
			}
			/*黑色按钮共用样式*/
			.darkbutton {
				height: 35px;
				background-color: #4a4f63;
				color: #fff;
			}
			.mb30 {
				margin-bottom: 30px;
			}
			.center {
				text-align: center;
				margin-top: 18px;
				/*.el-form-item {
					margin-bottom: 0;
				}*/
			}
		}
		.el-form-item {
			margin-bottom: 30px;
			/*margin-right: 40px;*/
		}
		.el-form-item>* {
			line-height: 30px;
		}
		/*审核订单模块*/
		.tab2 {
			/*活动选项卡*/
			.el-tabs .el-tabs__header .el-tabs__item.is-active {
				background: #3388ff;
				color: #fff;
			}
			/*未活动选项卡*/
			.el-tabs__item {
				height: 100%;
			}
			/*选项卡头部*/
			.el-tabs__header {
				background: #42485b;
			}
			#tab-0 span {
				display: block;
			}
			.el-tabs__content {
				display: block;
			}
			.el-tabs .el-tabs__header .el-tabs__item {
				color: #fff;
			}
			.el-tabs--border-card>.el-tabs__content {
				padding: 0;
			}
			/*表格头部*/
			.has-gutter tr {
				background: #f3f4f7;
			}
			/*表头*/
			.el-table__header {
				.cell {
					font-size: 13px;
					color: #556191;
					font-weight: normal;
				}
			}
			/*表体*/
			.el-table__body {
				font-size: 14px;
				color: #535458;
			}
		}
		/*任务转移  弹框*/
		.dialog1 {
			/*表格头部*/
			.has-gutter tr {
				background: #42485b;
				color: #fff;
			}
		}
		.tab2,
		.dialog1 {
			/*分页*/
			.el-pagination {
				text-align: right;
				margin-top: 20px;
			}
		}
		/*任务转移  弹框*/
		.el-dialog {
			/*min-width: 350px;
			width: 66%;*/
			width: 1140px;
			.el-dialog__body {
				padding-top: 8px;
			}
			.title {
				margin-top: 0;
				margin-bottom: 6px;
			}
		}
		.borde {
			.el-dialog__title {
				font-size: 17px;
			}
			.el-icon-close {
				font-size: 14px;
				font-weight: 1000 !important;
			}
			.el-dialog {
				width: 460px;
				height: 260px;
				border-radius: 6px;
				.el-textarea>textarea {
					height: 90px !important;
					resize: none;
				}
			}
			.el-dialog__header {
				border-bottom: 1px solid #f3f4f7;
			}
			.el-dialog__body {
				color: #556191;
			}
			.el-select {
				width: 277px;
				height: 30px;
				.el-input__inner {
					border-radius: 0;
					border-color: #999;
				}
			}
		}
		.el-dialog__header {
			padding: 15px 15px 10px;
			color: #3388ff;
			font-size: 17px;
		}
		.center {
			text-align: center;
			vertical-align: middle;
		}
		.buttons {
			width: 126px;
			/*width: 40%;*/
			height: 35px;
			min-width: 126px;
			max-width: 126px;
			background-color: #4a4f63;
			color: #fff;
		}
		/*弹框*/
		.el-dialog__title {
			color: #3388ff;
		}
	}
</style>

<style type="text/css">
	body {
		background: rgb(66, 72, 91) !important;
	}
</style>