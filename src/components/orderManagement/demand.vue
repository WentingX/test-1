<template>
	<!--需求订单管理--页面-->
	<div class="demand">
		<div class="tab1">
			<el-tabs v-model="activeName" @tab-click="tab1">
				<el-tab-pane label="审核订单" name="0"></el-tab-pane>
				<el-tab-pane label="派单订单" name="1"></el-tab-pane>
				<el-tab-pane label="进行中订单" name="2"></el-tab-pane>
				<el-tab-pane label="待验收订单" name="3"></el-tab-pane>
				<el-tab-pane label="收益订单" name="4"></el-tab-pane>
				<el-tab-pane label="交易成功" name="5"></el-tab-pane>
				<el-tab-pane label="交易失败" name="6"></el-tab-pane>
			</el-tabs>
			<el-row>
				<el-col>
					<el-form :inline="true" class="form-inline">
						<el-form-item class="mb30">
							<el-input clearable class="search" v-model="searchcontent" style="width: 400px;" placeholder="输入你想搜索的内容"></el-input>
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
						<el-form-item label="订单号" prop="id" class="w180h30">
							<el-input clearable v-model="queryform.id"></el-input>
						</el-form-item>
						<el-form-item label="生成时间" prop="createDate">
							<el-date-picker value-format="yyyy-MM-dd" v-model="queryform.createDate" type="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="订单类型" prop="type" class="w140h30">
							<el-select clearable v-model="queryform.type" placeholder="">
								<el-option label="投融信息" :value="0"></el-option>
								<el-option label="尽职调查" :value="1"></el-option>
								<el-option label="投后管理" :value="2"></el-option>
								<el-option label="高端定制" :value="3"></el-option>
								<!--<el-option icon="el-icon-caret-bottom" v-for="i in ['订单类型1','订单类型2']" :label="i" :value="i">-->
								</el-option>
							</el-select>
						</el-form-item>
						<!--<el-form-item label="订单状态" prop="status" class="w140h30">
							<el-select v-model="queryform.status" placeholder="">
								<template v-for="(value,key) in status">
									<el-option :label="value" :value="key"></el-option>
								</template>
								<el-option label="创建" :value="'1000'"></el-option>
								<el-option label="审核" :value="'1001'"></el-option>
								<el-option label="审核成功" :value="'1002'"></el-option>
								<el-option label="填写收益" :value="'1003'"></el-option>
								<el-option label="删除" :value="'-1'"></el-option>
								<el-option label="未通过审核" :value="'-1001'"></el-option>
							</el-select>
						</el-form-item>-->
						<el-form-item label="行业类型" prop="industry" class="w140h30">
							<el-select clearable v-model="queryform.industry" placeholder="">
								<el-option v-for="i in ['金融','互联网']" :label="i" :value="i"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所在地区" prop="city" class="w165h30">
							<el-cascader clearable style="line-height: 30px;" placeholder="" :show-all-levels="false" expand-trigger="hover" :options="options" v-model="queryform.city">
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
									<el-button size="medium" class="darkbutton buttons" style="margin-right: 40px;" @click="query">查询</el-button>
									<el-button @click="resetform()" size="medium" class="darkbutton buttons" style="margin-left: 40px;">重置</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>

		</div>

		<hr/>
		<p class="title"><em>|</em>{{['审核订单','派单订单','进行中订单','验收订单','收益订单','交易成功订单','交易失败订单'][tab1activeindex]}}</p>

		<div class="tab2">
			<el-tabs type="border-card" v-if="tab1activeindex==0" @tab-click="tab2" v-model="activeName1">
				<el-tab-pane label="待审核" name="0"></el-tab-pane>
				<el-tab-pane label="审核成功" name="1"></el-tab-pane>
				<el-tab-pane label="审核失败" name="2"></el-tab-pane>
			</el-tabs>
			<el-table v-loading="loading1" :data="tabeldata" stripe border>
				<el-table-column label="序号" align="center" type="index" width="70">
				</el-table-column>
				<el-table-column prop="createdate" label="生成时间" align="center" width="110">
					<template slot-scope="scope">
						{{scope.row.createdate}}
					</template>
				</el-table-column>
				<el-table-column prop="userid" label="用户名" align="center" width="90">
				</el-table-column>
				<el-table-column prop="id" label="订单号" align="center" width="90">
				</el-table-column>
				<el-table-column prop="type" label="类型" align="center" width="110">
					<template slot-scope="scope">
						{{['投融信息','尽职调查','投后管理','高端定制'][scope.row.type]}}
					</template>
				</el-table-column>
				<el-table-column prop="province" label="地区" align="center">
				</el-table-column>
				<el-table-column prop="industry" label="行业" align="center" width="90">
				</el-table-column>
				<el-table-column style="background: red;" prop="status" label="状态" align="center" width="90">
					<template slot-scope="scope">
						<span :class="((warn.indexOf(scope.row.status-0)>=0)&&'warn')||((danger.indexOf(scope.row.status-0)>=0)&&'danger')||((success.indexOf(scope.row.status-0)>=0)&&'success')||((blue.indexOf(scope.row.status-0)>=0)&&'blue')">{{status[scope.row.status]}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="dtime" label="状态存在时间" align="center" width="110">
				</el-table-column>
				<el-table-column prop="contact" label="审核员" width="90">
				</el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button type="text" style="color: #409EFF;text-decoration: underline;" @click="todetail(scope.row)">详情</el-button>
						<el-button v-if="scope.row.status!=-1" type="text" style="color: #DF1F1F;text-decoration: underline;" @click="closeOrder(scope.row)">关闭订单</el-button>
						<el-button v-else type="text" style="color: #535458;">已关闭</el-button>
						<el-button v-if="scope.row.contact!=''" @click="transferTask1(scope.row)" type="text" style="color: #535458;text-decoration: underline;">任务转移</el-button>
						<el-button v-else @click="transferTask1(scope.row)" type="text" style="color: #535458;text-decoration: underline;">任务派发</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--分页器-->
			<el-pagination background layout="prev, pager, next" :total="pagetotal" :page-size="pagesize" @current-change="pagechange" :current-page.sync="currentPage1"></el-pagination>
		</div>
		<!--任务转移弹框-->
		<div class="dialog1">
			<el-dialog :visible.sync="dialogflag" @open="taskDialog">
				<template v-if="currentdata.length>=1">
					<p class="title"><em>|</em><span style="vertical-align: middle;">当前信息</span></p>
					<el-table v-loading="loading2" :data="currentdata" border style="width: 100%;margin-bottom: 18px;">
						<el-table-column prop="order_id" label="订单号" align="center">
						</el-table-column>
						<el-table-column prop="NAME" label="姓名" align="center">
						</el-table-column>
						<el-table-column prop="PHONE" label="手机号码" align="center">
						</el-table-column>
						<el-table-column prop="JOB_NUMBER" label="工号" align="center">
						</el-table-column>
						<el-table-column prop="status_info" label="订单状态" align="center">
						</el-table-column>
						<el-table-column prop="duty" label="权限" align="center">
						</el-table-column>
						<template v-if="currentdata.length>=2">
							<el-table-column prop="jurisdiction" label="操作员" align="center">
							</el-table-column>
							<el-table-column prop="jurisdiction" label="最后转移时间" align="center">
							</el-table-column>
						</template>
					</el-table>
				</template>

				<p class="title"><em>|</em><span style="vertical-align: middle;">员工列表</span></p>
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
							<el-button v-if="currentdata.length==0" type="text" style="text-decoration: underline;color: #ffc731;" @click="dispatchTask(scope.row)">派发任务</el-button>
							<el-button v-else type="text" style="text-decoration: underline;color: #ffc731;" @click="transferTask(scope.row,scope)">转移任务</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination background layout="prev, pager, next" :total="pagetotal1" :page-size="pagesize1" @current-change="pagechange1" :current-page.sync="currentPage2"></el-pagination>
			</el-dialog>
		</div>
		<!--关闭理由弹框-->
		<el-dialog class="borde" title="订单关闭理由" :visible.sync="closeOrderdialog.flag">
			<el-row :gutter="24" style="margin-top: 32px;margin-bottom: 20px;">
				<el-col :span="7">
					<span class="dialogspan" style="width: 150px;">订单关闭理由：</span>
				</el-col>
				<el-col :span="17">
					<el-input clearable v-model="closeOrderdialog.content" type="textarea"></el-input>
				</el-col>
			</el-row>
			<div>
				<el-row class="center">
					<el-button size="mini" type="button" class="buttons" @click="submitReason">确定</el-button>
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
				loading1: false, //信息订单  加载动画
				loading2: false, //当前信息  加载动画
				loading3: false, //员工列表  加载动画
				currentPage1: 1, //信息订单   当前页
				currentPage2: 1, //任务转移弹框  员工列表 当前页
				tabClick: false, //防止  重置当前页调用两次接口
				dialogOpen: false, //防止  重置当前页调用两次接口
				//保存   接口和参数
				interface: {
					apiname: 'demandOrder',
						params: null,
				},
				activeTabName: "待审核", //当前选项卡  中文状态
				searchcontent: '', //搜索框的值
				//  关闭订单  弹框 状态
				closeOrderdialog: {
					flag: false,
					content: '',
					order: null,
				},
				//订单状态 和后台标识
				status: {
					'0': '待审核',
					'1021': '审核通过',
					'1022': '待派单',
					'1023': '派单中',
					'1024': '已接单',
					'1025': '进行中',
					'1026': '待验收',
					'1027': '验收通过',
					'8': '填写收益',
					'1029': '待收益',
					'1030': '交易成功',
					'-1020': '审核失败',
					'-1030': '交易失败',
					'-10000': '超时',
					'-1026': '验收失败',
					'1028': '财务审批',
				},
				warn: [0, 1022, 1026, 1025], //警告样式--订单类型
				success: [1021, 1030, 1029, 1028, 1027, 1024], //成功样式--订单类型
				danger: [-1020, -10000, -1030, -1026], //失败样式--订单类型
				blue: [1023], //蓝色字体--订单类型
				tab1activeindex: 0, //tab1  活动标签  index
				pagesize: 6, //信息订单  单页条数
				pagesize1: 3, //任务转移弹框,员工列表单页条数
				pagetotal: 0, //信息订单总条数
				pagetotal1: 0, //员工列表总条数
				dialogflag: false, //控制任务转移弹框
				activeName: "0", //tab1  活动选项卡  name
				activeName1: "0", //tab2 活动选项卡  name
				//查询  表单
				queryform: {
					id: '',
					type: '',
					userId: '',
					status: '',
					industry: '',
					provinceId: '',
					contact: '',
					//isTrueLobby: '',
					createDate: '',
				},
				//查询表单   地区   选项
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
				tabeldata: [], //信息订单数据   表格数据
				currentdata: [], //任务转移弹框  当前信息    表格数据
				staffdata: [], //任务转移弹框  员工列表   表格数据
				taskObj: {}, //任务转移    保存  订单信息
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
			//信息订单 大全
			demandOrder(params) {
				let _this = this;
				this.$data.loading1 = true;
				params.pageSize = this.$data.pagesize;
				this.$data.interface.apiname = 'demandOrder';
				this.$data.interface.params = params; //保存接口所用参数，分页要用
				API.demandOrder(params).then(function(res) {
					if(res.code == 200) {
						_this.$data.pagetotal = res.data.total - 0;
						_this.$data.tabeldata = res.data.list;
					} else {
						_this.msg('error', '列表获取失败');
					}
					_this.$data.loading1 = false;
				}, function(err) {
					_this.msg('error', '服务器错误');
					_this.$data.loading1 = false;
				});
			},
			//信息订单搜索  接口
			demandSearch() {
				let _this = this;
				let par = this.$data.searchcontent; //搜索框
				this.$data.interface.params = par; //保存接口参数  分页按钮 要用
				this.$data.interface.apiname = 'demandSearch';
				API.selXXQAllEmployeeOder(par).then(function(res) {
					if(res.code == 200) {
						_this.$data.tabeldata = res.data.list;
						//_this.$data.pagetotal = res.data.total - 0;
						_this.$data.pagetotal = 0;
					} else {
						_this.msg('error', '列表获取失败');
					}
					_this.$data.loading1 = false;
				}, function() {
					_this.msg('error', '服务器错误');
					_this.$data.loading1 = false;
				});
			},
			//当前信息  接口
			presentInfo() {
				let _this = this;
				let par = {
					orderNumber: this.$data.taskObj.id,
					type: this.$data.taskObj.type == 0 ? '01' : '02',
				}
				API.presentInfo(par).then(function(res) {
					if(res.code == 200) {
						_this.$data.currentdata = res.data;
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
					id: this.$data.taskObj.id,
					pageNum: pageNum,
					pageSize: this.$data.pagesize1,
				};
				this.$data.staffdata = [];
				this.$data.loading3 = true; //显示加载动画
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
			//  重置表单   清空表单  数据
			resetform() {
				this.$refs.queryform.resetFields();
				this.$data.searchcontent = '';
				this.query(); //调用查询按钮
			},
			//  选项卡  点击事件
			tab1(tab) {
				console.log('tab', tab);
				this.$data.tabClick = true; //防止两次接口调用
				this.$data.currentPage1 = 1; //分页重置
				this.tab1activeindex = tab.index; //保存  点击选项卡   的  index
				//接口参数
				let par = {
					//第几页
					pageNum: 1,
				};
				let queryform = this.$data.queryform;
				for(let key in queryform) {
					par[key] = queryform[key];
				}
				//根据   不同选项卡   查询  不同  订单状态   的数据。       同时为  分页  事件  设置    当前   处于  哪个  订单状态
				switch(tab.label) {
					case '审核订单':
						//  0: '待审核',
						//  1: '审核通过',
						//  -1: '审核失败',
						par.status = '0';
						par.classify = '';
						this.$data.activeTabName = "待审核";
						break;
					case '派单订单':
						//  2: '待派单',
						//  3: '派单中',
						//  4: '已接单',
						//  -3: '超时',
						par.status = '';
						par.classify = '01';
						this.$data.activeTabName = "派单订单";
						break;
					case '进行中订单':
						//  1025: '进行中',
						par.status = '1025';
						par.classify = '';
						this.$data.activeTabName = "进行中订单";
						break;
					case '待验收订单':
						//  6: '待验收',
						//  7: '验收通过',
						//  -4: '验收失败'
						par.status = '';
						par.classify = '02';
						this.$data.activeTabName = "待验收订单";
						break;
					case '收益订单':
						//  8: '填写收益',
						//  9: '待收益',
						par.status = '';
						par.classify = '03';
						this.$data.activeTabName = "收益订单";
						break;
					case '交易成功':
						//  1030: '交易成功',
						par.status = '1030';
						par.classify = '';
						this.$data.activeTabName = "交易成功";
						break;
					case '交易失败':
						//  -1030: '交易失败',
						par.status = '-1030';
						this.$data.activeTabName = "交易失败";
						break;
				};
				//  把   当前  调用  接口  的  参数  保存  下来
				this.$data.interface.params = par;
				this.$data.interface.apiname = "demandOrder";
				this.resetform(); //调用重置按钮
				let tab1 = {
					index: tab.index,
				};
				sessionStorage.setItem('tab1', JSON.stringify(tab1));
			},
			//审核类型选项卡  点击事件
			tab2(tab) {
				this.$data.tabeldata = [];
				let label = tab.label;
				//   接口   参数 
				let par = {
					//第几页
					pageNum: 1,
					classify: '',
				};
				let queryform = this.$data.queryform;
				for(let key in queryform) {
					par[key] = queryform[key];
				}
				//  根据  点击  的  选项卡  查询   不同  订单  状态 的 数据
				switch(label) {
					case '待审核':
						//  0: '待审核',
						par.status = '0';
						break;
					case '审核成功':
						//  1021: '审核通过',
						par.status = '1021';
						break;
					case '审核失败':
						//  -1020: '审核失败',
						par.status = '-1020';
						break;
				};
				this.$data.interface.params = par;
				this.$data.interface.apiname = "demandOrder";
				this.demandOrder(par);
				let tab2 = {
					index: tab.index
				};
				sessionStorage.setItem('tab2', JSON.stringify(tab2));
			},

			//点击详情   路由  跳转
			todetail(row) {
				sessionStorage.setItem('temp1', JSON.stringify({
					type: row.type, //订单类型
					status: row.status, //订单状态
				}));
				this.$router.push({
					path: `/orderdetails/${row.id}`
				});
			},

			//关闭订单  链接
			closeOrder(row) {
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
				this.$data.tabeldata = []; //清空表格
				this.$data.tabClick = true; //防止调用两次接口
				this.$data.currentPage1 = 1; //分页重置
				let par = {
					pageNum: 1, //第几页
				}
				let queryform = this.$data.queryform
				//对象合并
				for(let key in queryform) {
					par[key] = queryform[key];
				}
				if(par.city && par.city.length == 2) {
					par.provinceId = par.city[0];
				}
				delete par.city;
				//保存当前的查询参数
				//				if(this.$data.interface.apiname == "orderSearch") {
				//					par.status = this.$data.interface.temp;
				//					par.classify = this.$data.interface.temp1;
				//				} else {
				//					par.status = this.$data.interface.params.status;
				//					par.classify = this.$data.interface.params.classify;
				//				}

				par.status = this.$data.interface.params.status; //订单状态
				par.classify = this.$data.interface.params.classify;
				//				this.$data.interface.apiname = 'demandOrder';
				//				this.$data.interface.params = par;
				this.demandOrder(par);
			},
			//分页点击按钮
			pagechange(num) {
				if(this.$data.tabClick == true) {
					this.$data.tabClick = false;
					return false;
				};
				let par = this.$data.interface.params; //读取   保存的查询参数
				par.pageNum = num;
				this.demandOrder(par);
			},
			//任务弹框  里 的分页
			pagechange1(num) {
				if(this.$data.dialogOpen) {
					this.$data.dialogOpen = false; //过滤  弹框打开时  重置分页执行事件
					return;
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

				this.presentInfo(); //当前信息
				this.findListAllZP(1); //员工列表
			},
			//派发任务
			//			dispatchTask(row) {
			//				let par = {
			//					id: 111,
			//					employeeId: this.$data.taskObj.id,
			//					orderId: this.$data.taskObj.id,
			//					id: this.$data.taskObj.id,
			//					duty: 1,
			//					status: 0,
			//					createDate: '2007-11-11 11:11:11',
			//					updateDate: '2007-11-11 11:11:11',
			//				};
			//				API.dispathTask(row.name, par).then(function(res) {
			//					console.log(888, res)
			//				})
			//
			//			},
			//转移任务   派发任务
			transferTask(row) {
				let _this = this;
				let par1 = {
					orderNumber: this.$data.taskObj.id,
					jobNumber: row.jobNumber,
					name: row.name,
					phone: row.phone,
					roleName: row.roleName,
				};
				API.orderDesignate(par1).then(function(res) {
					if(res.data.code == 201) {
						_this.msg('success', '转移任务成功');
					} else {
						_this.msg('error', '转移任务失败');
					}
				}, function(err) {
					_this.msg('error', '服务器错误');
				})
				return;
			},
			transferTask1(row) {
				this.$data.dialogflag = true;
				this.$data.taskObj = row;
			},
			search() {
				let orderStaus = this.$data.interface.params.status;
				let classify = this.$data.interface.params.classify;
				this.$data.loading1 = true;
				this.demandSearch();

				//				this.$data.interface.temp = orderStaus;
				//				this.$data.interface.temp1 = classify;
			}
		},
		mounted() {
			if(sessionStorage.getItem('tab1')) {
				let tab1 = JSON.parse(sessionStorage.getItem('tab1'));
				let label1 = ['审核订单', '派单订单', '进行中订单', '待验收订单', '收益订单', '交易成功', '交易失败'];
				tab1.label = label1[tab1.index];
				if(tab1.index != 0) {
					this.tab1(tab1);
					this.$data.activeName = tab1.index;
					return;
				}
				if(sessionStorage.getItem('tab2')) {
					let tab2 = JSON.parse(sessionStorage.getItem('tab2'));
					let label2 = ['待审核', '审核成功', '审核失败'];
					tab2.label = label2[tab2.index];
					this.tab2(tab2);
					this.$data.activeName1 = tab2.index;
				}
				return;
			};

			let par = {
				//第几页
				pageNum: 1,
				classify: '',
			};
			let queryform = this.$data.queryform
			//对象合并
			for(let key in queryform) {
				par[key] = queryform[key];
			}
			par.status = '0';
			this.$data.interface.params = par;
			this.demandOrder(par);

		}
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
	
	.demand {
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
					font-size: 20px;
					color: #556191;
					font-weight: normal;
				}
			}
			/*表体*/
			.el-table__body {
				font-size: 18px;
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