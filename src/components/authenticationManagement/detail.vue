<template>
	<!--认证管理详情-->
	<div class="detail" v-loading="loading1">
		<p class="title"><em>|</em> 实名认证</p>
		<hr class="line" />
		<div class="con">
			<div class="con-1">
				<!--个人认证详情-->
				<div v-if="detailtype=='0'" class="person">
					<template v-if="userdata!==null">
						<el-row :gutter="24">
							<el-col :span="13">
								<span class="spantext">真实姓名:</span>{{userdata['name']}}
							</el-col>

							<el-col :span="11" class="center">
								<div v-if="userdata.name_status==0">
									<span style="color:red">未审核</span>
									<!--<el-button size="mini" class="buttons" @click="pass(0,userdata,'name_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(0,userdata,'name_status')">不通过</el-button>-->
								</div>
								<i v-else-if="userdata.name_status==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="13">
								<span class="spantext">身份证号:</span>{{userdata['id_card_num']}}
							</el-col>
							<el-col :span="11" class="center">
								<div v-if="userdata.card_status==0">
									<span style="color:red">未审核</span>
									<!--<el-button size="mini" class="buttons" @click="pass(1,userdata,'card_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(1,userdata,'card_status')">不通过</el-button>-->
								</div>
								<i v-else-if="userdata.card_status==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>

						<el-row :gutter="24">
							<el-col :span="13">
								<el-col :span="6" style="padding: 0;margin-left: -10px;">
									<span class="warn">*</span>
									<span style="color: #aaa;">手持身份证:</span>
								</el-col>

								<el-col class="idimg" style="padding-left: 0;">
									<img :src="userdata.hand_held_img" /><br />

									<el-row class="showbutton">
										<el-button type="text" class="showimg" @click="seeimg(userdata.hand_held_img)">查看图片</el-button>
									</el-row>
								</el-col>
							</el-col>
							<el-col :span="11" class="center vercenter">
								<div v-if="userdata.hand_status==0">
									<el-button size="mini" class="buttons" @click="pass(2,userdata,'hand_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(2,userdata,'hand_status')">不通过</el-button>
								</div>
								<i v-else-if="userdata.hand_status==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="13">
								<el-col :span="6" style="padding: 0;margin-left: -10px;">
									<span class="warn">*</span>
									<span style="color: #aaa;">身份证正面:</span>
								</el-col>

								<el-col class="idimg" style="padding-left: 0;">
									<img :src="userdata.front_img" /><br />

									<el-row class="showbutton">
										<el-button type="text" class="showimg" @click="seeimg(userdata.front_img)">查看图片</el-button>
									</el-row>
								</el-col>
							</el-col>
							<el-col :span="11" class="center vercenter">
								<div v-if="userdata.front_status==0">
									<el-button size="mini" class="buttons" @click="pass(3,userdata,'front_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(3,userdata,'front_status')">不通过</el-button>
								</div>
								<i v-else-if="userdata.front_status==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="13">
								<el-col :span="6" style="padding: 0;margin-left: -10px;">
									<span class="warn">*</span>
									<span style="color: #aaa;">身份证反面:</span>
								</el-col>

								<el-col class="idimg" style="padding-left: 0;">
									<img :src="userdata.back_img" /><br />

									<el-row class="showbutton">
										<el-button type="text" class="showimg" @click="seeimg(userdata.back_img)">查看图片</el-button>
									</el-row>
								</el-col>
							</el-col>
							<el-col :span="11" class="center vercenter">
								<div v-if="userdata.back_status==0">
									<el-button size="mini" class="buttons" @click="pass(4,userdata,'back_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(4,userdata,'back_status')">不通过</el-button>
								</div>
								<i v-else-if="userdata.back_status==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>
					</template>
				</div>
				<!--企业认证详情-->
				<div v-if="detailtype=='1'" class="enterprise">
					<template v-if="enterprisedata!=null">
						<el-row :gutter="24">
							<el-col :span="13">
								<span class="spantext">企业名称</span>{{enterprisedata.company_name}}
							</el-col>
							<el-col :span="11" class="center">
								<div v-if="enterprisedata.name_status==0">
									<span style="color:red">未审核</span>
									<!--<el-button size="mini" class="buttons" @click="pass(0,enterprisedata,'name_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(0,enterprisedata,'name_status')">不通过</el-button>-->
								</div>
								<i v-else-if="enterprisedata.name_status==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="13">
								<span class="spantext">注册地址</span>{{enterprisedata.address}}
							</el-col>
							<el-col :span="11" class="center">
								<div v-if="enterprisedata.address_status==0">
									<el-button size="mini" class="buttons" @click="pass(1,enterprisedata,'address_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(1,enterprisedata,'address_status')">不通过</el-button>
								</div>
								<i v-else-if="enterprisedata.address_status==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="13">
								<span class="spantext">营业执照注册号</span>{{enterprisedata.business_license_num}}
							</el-col>
							<el-col :span="11" class="center">
								<div v-if="enterprisedata.num_status==0">
									<span style="color:red">未审核</span>
									<!--<el-button size="mini" class="buttons" @click="pass(2,enterprisedata,'num_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(2,enterprisedata,'num_status')">不通过</el-button>-->
								</div>
								<i v-else-if="enterprisedata.num_status==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="13">
								<span class="spantext">营业期限</span>{{enterprisedata.start_time}}至{{enterprisedata.end_time}}
							</el-col>
							<el-col :span="11" class="center">
								<div v-if="enterprisedata.time_status==0">
									<el-button size="mini" class="buttons" @click="pass(3,enterprisedata,'time_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(3,enterprisedata,'time_status')">不通过</el-button>
								</div>
								<i v-else-if="enterprisedata.time_status==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>

						<el-row :gutter="24">
							<el-col :span="13">
								<el-col :span="9" style="padding-left: 0;">
									<span class="spantext">营业执照照片:</span>
								</el-col>

								<el-col class="idimg">
									<img :src="enterprisedata.business_license_img" /><br />
									<el-row class="showbutton">
										<el-button type="text" class="showimg" @click="seeimg(enterprisedata.business_license_img)">查看图片</el-button>
									</el-row>
								</el-col>
							</el-col>
							<el-col :span="11" class="center vercenter">
								<div v-if="enterprisedata.img_status==0">
									<el-button size="mini" class="buttons" @click="pass(4,enterprisedata,'img_status')">通过</el-button>
									<el-button size="mini" class="buttons" @click="nopass(4,enterprisedata,'img_status')">不通过</el-button>
								</div>
								<i v-else-if="enterprisedata.state4==-1" class="el-icon-error"></i>
								<i v-else class="el-icon-circle-check"></i>
							</el-col>
						</el-row>
					</template>
				</div>
				<template v-if="userdata!=null||enterprisedata!=null">
					<el-row :gutter="24">
						<el-col :span="21" style="text-align: right;">
							<el-button type="button" class="buttons" size="mini" @click="oneKey" v-if="nocheck==true">
								一键数据认证
							</el-button>
							<!--<el-button type="button" class="buttons" size="mini" @click="certified" :disabled="aa">
							通过认证
						</el-button>
						<el-button type="button" class="buttons" size="mini" @click="authFail" :disabled="bb">
							认证失败
						</el-button>-->
						</el-col>

					</el-row>
					<el-row :gutter="24" v-if="allRight==true">
						<el-col :span="18" style="text-align: right;">
							<el-button size="mini" class="success">
								已通过认证
							</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="24" v-if="authFail1==true">
						<el-col :span="18" style="text-align: right;">
							<el-button size="mini" class="error">
								认证未通过
							</el-button>
						</el-col>
					</el-row>
				</template>

			</div>
		</div>
		<!--未通过理由弹框-->
		<el-dialog class="borde" title="未通过理由" :visible.sync="dialogVisible">
			<el-row :gutter="24">
				<el-col :span="6">
					<span class="dialogspan">审核状态: </span>
				</el-col>
				<el-col :span="18">
					<span>{{status="未通过"}}</span>
				</el-col>
			</el-row>

			<el-row :gutter="24" style="margin-top: 32px;margin-bottom: 38px;">
				<el-col :span="6">
					<span class="dialogspan">未通过理由：</span>
				</el-col>
				<el-col :span="18">
					<el-select v-model="nopassvalue" placeholder="请选择未通过理由" size="small">
						<el-option v-for="item in nopassdata" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<div>
				<el-row class="center">
					<el-button size="mini" type="button" class="buttons" @click="submitReason">确定</el-button>
				</el-row>
			</div>
		</el-dialog>

		<!--一键数据认证  失败弹框-->
		<el-dialog class="borde" title="未通过理由" :visible.sync="dialogVisible1">
			<el-row :gutter="24">
				<el-col :span="6">
					<span class="dialogspan">审核状态: </span>
				</el-col>
				<el-col :span="18">
					<span>{{status="未通过"}}</span>
				</el-col>
			</el-row>

			<el-row :gutter="24" style="margin-top: 32px;margin-bottom: 38px;">
				<el-col :span="6">
					<span class="dialogspan">未通过理由：</span>
				</el-col>
				<el-col :span="18">
					<el-select v-model="nopassvalue" placeholder="请选择未通过理由" size="small">
						<el-option v-for="item in nopassdata" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<div>
				<el-row class="center">
					<el-button size="mini" type="button" class="buttons" @click="submitReason1">确定</el-button>
				</el-row>
			</div>
		</el-dialog>
		<!--查看图片弹框-->
		<el-dialog title="图片" :visible.sync="imgdialog" style="text-align: center;">
			<img :src="imgdialogsrc" alt="" />
		</el-dialog>

		<template v-if="tabeldata.length>0" v-loading="loading2">
			<p class="title"><em>|</em> 未通过原因</p>
			<hr class="line" />
			<template>
				<el-table :data="tabeldata">
					<template v-if="detailtype==0">
						<el-table-column prop="username" label="用户名" align="center"></el-table-column>
						<el-table-column prop="name" label="姓名" align="center"></el-table-column>
						<el-table-column prop="idCard" label="身份证号码" align="center"></el-table-column>

						<el-table-column prop="updateTime" label="生成时间" align="center"></el-table-column>
						<el-table-column prop="reason" label="原因" align="center">
							<template slot-scope="scope">
								<span style="color: red;">{{scope.row.reason}}</span>
							</template>
						</el-table-column>
					</template>
					<template v-if="detailtype==1">
						<el-table-column prop="username" label="用户名" align="center"></el-table-column>
						<el-table-column prop="name" label="姓名" align="center"></el-table-column>
						<el-table-column prop="companyName" label="企业名称" align="center"></el-table-column>

						<el-table-column prop="updateTime" label="生成时间" align="center"></el-table-column>
						<el-table-column prop="reason" label="原因" align="center">
							<template slot-scope="scope">
								<span style="color: red;">{{scope.row.reason}}</span>
							</template>
						</el-table-column>
					</template>
				</el-table>
			</template>
		</template>
	</div>
</template>
<script>
	import API from '@/api/api'
	import axios from 'axios'
	export default {
		data() {
			return {
				loading1: true,
				loading2: true,
				id: '', //接口返回的id
				detailtype: null, //认证类型    0代表个人认证    1代表企业认证
				nopassindex: '', //保存点击的是第几个不通过按钮
				dialogVisible: false, //未通过理由弹框
				dialogVisible1: false, //一键数据认证  理由 弹框
				imgdialog: false, //图片弹框
				imgdialogsrc: null, //图片弹框 src
				nopassvalue: null, //未通过理由
				userdata: null,
				enterprisedata: null,
				//未通过理由数组
				nopassdata: [{
					value: '理由1',
					label: '理由一'
				}, {
					value: '理由2',
					label: '理由二'
				}, {
					value: '理由3',
					label: '理由三'
				}, {
					value: '理由4',
					label: '理由四'
				}],
				//未通过原因 表格数据
				tabeldata: [],
				nopassvalue: '',
				Obj: {},
			}
		},
		computed: {
			//全部通过
			allRight: function() {
				if(this.$data.userdata != null) {
					let arr = ['back_status', 'card_status', 'front_status', 'hand_status', 'name_status']
					for(let value of arr) {
						if(this.$data.userdata[value] != 1) {
							return false
						}
					}
				} else if(this.$data.enterprisedata != null) {
					let arr = ['address_status', 'name_status', 'img_status', 'num_status', 'time_status']
					for(let value of arr) {
						if(this.$data.enterprisedata[value] != 1) {
							return false
						}
					}
				};

				return true;
			},
			//是否一键数据认证
			nocheck: function() {
				let userdata = this.$data.userdata;
				let enterprisedata = this.$data.enterprisedata;
				if(this.$data.detailtype == 0) { //个人
					return userdata['name_status'] == 0 || userdata['card_status'] == 0;
				} else if(this.$data.detailtype == 1) { //企业
					return enterprisedata['name_status'] == 0 || enterprisedata['num_status'] == 0;
				}
				return false;
			},
			//认证未通过
			authFail1: function() {
				let userdata = this.$data.userdata;
				let enterprisedata = this.$data.enterprisedata;
				if(this.$data.detailtype == 0) { //个人
					let arr = ['back_status', 'card_status', 'front_status', 'hand_status', 'name_status']
					for(let value of arr) {
						if(userdata[value] == 0) {
							return false;
						}
					}
					for(let value of arr) {
						if(userdata[value] == -1) {
							return true;
						}
					}
					return false;
				} else if(this.$data.detailtype == 1) { //企业
					let arr = ['address_status', 'name_status', 'img_status', 'num_status', 'time_status']
					for(let value of arr) {
						if(enterprisedata[value] == 0) {
							return false;
						}
					}
					for(let value of arr) {
						if(enterprisedata[value] == -1) {
							return true;
						}
					}
					return false;
				}
			},
			//			aa: function() {
			//				let userdata = this.$data.userdata;
			//				let enterprisedata = this.$data.enterprisedata;
			//				if(userdata != null) {
			//					return userdata.name_status == 1 && userdata.card_status == 1 && userdata.hand_status == 1 && userdata.front_status == 1 && userdata.back_status == 1 ? false : true;
			//				}
			//				if(enterprisedata != null) {
			//					return enterprisedata.name_status && enterprisedata.address_status && enterprisedata.num_status && enterprisedata.time_status && enterprisedata.state4 ? false : true;
			//				}
			//			},
			//			bb: function() {
			//				let userdata = this.$data.userdata;
			//				let enterprisedata = this.$data.enterprisedata;
			//				if(userdata != null) {
			//					return userdata.name_status == -1 || userdata.card_status == -1 || userdata.hand_status == -1 || userdata.front_status == -1 || userdata.back_status == -1 ? false : true;
			//				}
			//				if(enterprisedata != null) {
			//
			//					return userdata.name_status == -1 || userdata.card_status == -1 || userdata.hand_status == -1 || userdata.front_status == -1 || userdata.back_status == -1 ? false : true;
			//				}
			//			},
		},
		methods: {
			msg(type, txt) {
				this.$message[type]({
					showClose: true,
					message: txt,
					duration: 2000
				});
			},
			//判断企业还是个人
			enterOrperson(person, enter) {
				let type = this.$data.detailtype;
				if((type == 0) && (typeof person === 'function')) { //个人
					person();
				} else if((type == 1) && (typeof enter === 'function')) { //企业
					enter();
				}
			},
			//通过按钮  接口
			authPass(par,resdata,status) {
				let _this = this;
				enterOrperson(function() { //个人
					API.personPass(par).then(function(res) {
						if(res.data.code == 200) {
							resdata[status] = 1;
							_this.msg('success', `认证成功`);
							_this.panduan(function() {
								_this.certified();
								API.service(_this.$route.params.id.substring(1));
							}, null, null);
							return true;
						} else {
							_this.msg('error', `res.data.code`);
						}
					}, function(err) {
						_this.msg('error', `服务器错误`);
					});
					//个人
				}, function() { //企业
					API.enterprisePass(par).then(function(res) {
						if(res.data.code == 200) {
							resdata[status] = 1;
							_this.msg('success', `认证成功`);
							//判断是否全部通过
							_this.panduan(function() {
								console.log(777);
								_this.certified();
								API.service(_this.$route.params.id.substring(1));
							}, null, null);
						} else {
							_this.msg('error', `code:${res.data.code}`);
						}
					}, function(err) {
						_this.msg('error', `服务器错误`);
					});
				})
			},
			//一键数据认证
			oneKey() {
				let _this = this;
				if(this.$data.detailtype == 0) { //个人
					let par = `idCard=${this.$data.userdata.id_card_num}&name=${this.$data.userdata.name}`;
					API.personOneKeyDataPerson(par).then(function(res) {
						if(res.data.code == 201) { //个人 一键认证 通过
							let par = `id=${_this.$data.id}&certificationBy=${0}`;
							API.personPass(par).then(function(res) {
								if(res.data.code == 200) {
									let par = `id=${_this.$data.id}&certificationBy=${2}`;
									API.enterprisePass(par).then(function(res) {
										if(res.data.code == 200) {
											_this.$data.enterprisedata['name_status'] = 1;
											_this.$data.enterprisedata['card_status'] = 1;
											_this.msg('success', '一键数据认证成功');
										}
									})
								} else {
									_this.msg('error', '一键数据认证失败');
								}
							}, function(err) {
								_this.msg('error', '服务器错误')
							})
						} else {
							_this.dialogVisible1 = true; //一键认证 失败
						}
					}, function(err) {
						_this.msg('error', '服务器错误');
					});
				} else if(this.$data.detailtype == 1) { //企业
					let par = `id=&base=${this.$data.enterprisedata.address}&name=${this.$data.enterprisedata.company_name}&legalPersonName=${'需要填法人代表'}&creditCode=${this.$data.enterprisedata.business_license_num}&estiblishTime=`;
					API.enterpriseOneKeyDataPerson(par).then(function(res) {
						if(res.data.code == 200) { //企业 一键认证 通过
							let par = `id=${_this.$data.id}&certificationBy=${0}`;
							API.enterprisePass(par).then(function(res) {
								if(res.data.code == 200) {
									let par = `id=${_this.$data.id}&certificationBy=${2}`;
									API.enterprisePass(par).then(function(res) {
										if(res.data.code == 200) {
											_this.$data.enterprisedata['name_status'] = 1;
											_this.$data.enterprisedata['num_status'] = 1;
											_this.msg('success', '一键数据认证成功');
										}
									})
								}
							}, function(err) {
								_this.msg('error', '服务器错误');
							})
						} else {
							_this.dialogVisible1 = true;
						}
					}, function(err) {
						_this.msg('error', '服务器错误');
					});
				}
			},
			//通过认证   接口
			certified() {
				let _this = this;
				if(this.$data.detailtype == 0) { //个人
					let par = `id=${this.$route.params.id.substring(1)}&name=${this.$data.userdata.name}&nameStatus=1&cardStatus=1&handStatus=1&frontStatus=1&backStatus=1&status=1`;
					API.notByReason(par).then(function(res) {
						if(res.data == 1) {
							_this.$data.allRight = true;
						}
					});
				} else if(this.$data.detailtype == 1) { //企业
					let par = `id=${this.$route.params.id.substring(1)}&companyName=${_this.$data.enterprisedata.company_name}&nameStatus=1&addressStatus=1&numStatus=1&timeStatus=1&imgStatus=1&status=1`;
					API.enterpriseByReason(par).then(function(res) {
						if(res.data == 1) {
							_this.$data.allRight = true;
						}
					});
				}
			},
			//认证失败  接口
			authFail() {
				if(this.$data.detailtype == 0) { //个人
					let par = `id=${this.$route.params.id.substring(1)}&name=${this.$data.userdata.name}&nameStatus=-1&cardStatus=-1&handStatus=-1&frontStatus=-1&backStatus=-1&status=-1`;
					API.notByReason(par).then(function(res) {
						if(res.data == 1) {
							this.$data.allRight = false;
						}
					}.bind(this));
				} else if(this.$data.detailtype == 1) {
					//企业
					let par = `id=${_this.$data.id}&companyName=${this.$data.enterprisedata.company_name}&nameStatus=-1&addressStatus=-1&numStatus=-1&timeStatus=-1&imgStatus=-1&status=-1`;
					API.enterpriseByReason(par).then(function(res) {
						if(res.data == 1) {
							this.$data.allRight = false;
						}
					}.bind(this));
				}
			},
			//通过按钮
			pass(index, resdata, status) {
				let par = `id=${_this.$data.id}&certificationBy=${index}`;
				this.authPass(par,resdata, status);
			},
			panduan(success, fail, nocheck) {
				if(this.$data.detailtype == 0) { //个人
					let arr = ['back_status', 'card_status', 'front_status', 'hand_status', 'name_status'];
					for(let value of arr) {
						if(this.$data.userdata[value] == 0) { //未判断
							if(typeof nocheck == "function") {
								nocheck();
							}
							return false;
						}
					}
					for(let value of arr) {
						if(this.$data.userdata[value] == -1) { //失败
							if(typeof fail == "function") {
								fail();
							}
							return false;
						}
					}
					//成功
					if(typeof success == "function") {
						success();
					}
				} else if(this.$data.detailtype == 1) { //企业
					let arr = ['address_status', 'name_status', 'img_status', 'num_status', 'time_status'];

					console.log(this.$data.enterprisedata, 44, arr);
					for(let value of arr) {
						if(this.$data.enterprisedata[value] == 0) { //未判断
							if(typeof nocheck == "function") {
								nocheck();
							}
							return false;
						}
					}
					for(let value of arr) {
						if(this.$data.enterprisedata[value] == -1) { //失败
							if(typeof fail == "function") {
								nocheck();
							}
							return false;
						}
					}
					//成功
					if(typeof success == "function") {
						success();
					}
				};
			},
			//不通过按钮
			nopass(index, resdata, status) {
				this.nopassindex = index;
				this.$data.Obj.data = resdata;
				this.$data.Obj.status = status;
				this.dialogVisible = true;
			},
			//点击查看图片
			seeimg(src) {
				this.imgdialogsrc = src;
				this.imgdialog = true;
			},
			//未通过理由---提交按钮
			submitReason() {
				let _this = this;
				if(this.$data.detailtype == 0) { //个人
					let par = `id=${_this.$data.id}&delFlag=${this.nopassindex}&reason=${this.$data.nopassvalue}`;
					API.personNoPass(par).then(function(res) {
						if(res.data.code == 200) {
							_this.$data.dialogVisible = false;
							_this.$data.Obj.data[_this.$data.Obj.status] = -1;
							_this.msg('success', '未通过原因提交成功');
							_this.panduan(null, function() {
								//_this.authFail();
							}, null);
							return true;
						} else {
							_this.msg('error', `code:${res.data.code}`);
						}
					}, function(err) {
						_this.msg('error', '服务器错误')
					});
				} else if(this.$data.detailtype == 1) {
					//企业
					let par = `id=${_this.$data.id}&delFlag=${this.nopassindex}&reason=${this.$data.nopassvalue}`;
					API.enterpriseNoPass(par).then(function(res) {
						if(res.data.code == 200) {
							_this.$data.Obj.data[_this.$data.Obj.status] = -1;
							_this.panduan(null, function() {
								//_this.authFail();
							}, null);
							_this.$data.dialogVisible = false;
						} else {
							_this.msg('error', `code:${res.data.code}`);
						}
					}, function() {
						_this.msg('error', '服务器错误')
					});
				}
			},
			submitReason1() {
				let _this = this;
				if(this.$data.detailtype == 0) {
					//个人
					let par = `id=${_this.$data.id}&delFlag=0&reason=${this.$data.nopassvalue}`;
					API.personNoPass(par).then(function(res) {
						if(res.data.code == 200) {
							_this.$data.userdata['name_status'] = -1;
							let par = `id=${_this.$data.id}&delFlag=1&reason=${_this.$data.nopassvalue}`;
							API.personNoPass(par).then(function(res) {
								if(res.data.code == 200) {
									_this.$data.userdata['card_status'] = -1;
									_this.msg('success', '个人一键数据认证失败原因提交成功');

								} else {
									_this.msg('error', `code:${res.data.code}`)
								}
							}, function() {
								_this.msg('error', '服务器错误')
							});
						} else {
							_this.msg('error', `code:${res.data.code}`)
						}
					}, function(err) {
						_this.msg('error', `服务器错误`);
					});
					_this.dialogVisible1 = false;
				} else if(this.$data.detailtype == 1) {
					//企业
					let par = `id=${_this.$data.id}&delFlag=0&reason=${this.$data.nopassvalue}`;
					API.enterpriseNoPass(par).then(function(res) {
						if(res.data.code == 200) {
							_this.$data.enterprisedata['name_status'] = -1;
							let par = `id=${_this.$data.id}&delFlag=2&reason=${_this.$data.nopassvalue}`;
							API.enterpriseNoPass(par).then(function(res) {
								if(res.data.code == 200) {
									_this.$data.enterprisedata['num_status'] = -1;
									_this.msg('success', '企业一键认证失败--原因提交成功');
								} else {
									_this.msg('error', `code:${res.data.code}`)
								}
							}, function() {
								_this.msg('error', '服务器错误')
							});
						} else {
							_this.msg('error', `code:${res.data.code}`)
						}
					}, function(err) {
						_this.msg('error', '服务器错误');
					});
					_this.dialogVisible1 = false;
				}
			},
		},
		mounted() {
			let _this = this;
			setTimeout(function() {
				for(let i of _this.$store.state.options) {
					if(i.name == "认证管理-实名认证") {
						i.route = _this.$route.fullPath;
					}
				};
			}, 10);

			let type = this.$route.params.id[0];
			this.$data.detailtype = type;
			let userid = this.$route.params.id.substring(1);
			//数据初始化
			if(type == 0) {
				//个人
				API.personAuthDetail(userid).then(function(res) {
					if(res.code == 200) {
						_this.$data.userdata = res.data;
						_this.$data.id = res.data.id;
						_this.msg('success', `个人数据获取成功`);
					} else {
						_this.msg('error', `code:${res.code}`);
					}
					_this.loading1 = false;
				}, function(err) {
					_this.msg('error', `服务器错误`);
					_this.loading1 = false;
				});
				let par = {
					userId: userid
				};
				API.personFailReasonList(par).then(function(res) {
					if(res.code == 200) {
						_this.$data.tabeldata = res.data;
						_this.msg('success', `原因列表获取成功`);
					} else {
						_this.msg('error', `code:${res.code}`);
					}
					_this.$loading2 = false;
				}, function(err) {
					_this.msg('error', `服务器错误`);
					_this.$loading2 = false;
				})

			} else if(type == 1) {
				//企业
				API.enterpriseAuthDetail(userid).then(function(res) {
					if(res.code == 200) {
						_this.$data.enterprisedata = res.data;
						_this.$data.id = res.data.id;
						_this.msg('success', `个人数据获取成功`);
					} else {
						_this.msg('error', `code:${res.code}`);
					}
					_this.loading1 = false;
				}, function(err) {
					_this.msg('error', '服务器错误');
					_this.loading1 = false;
				});

				let par = {
					userId: userid
				};
				API.enterFailReasonList(par).then(function(res) {
					if(res.code == 200) {
						_this.$data.tabeldata = res.data;
					}
				});

			};

			if(this.$data.detailtype == 0) {
				this.$data.enterprisedata = null;
			} else if(this.$data.detailtype == 1) {
				this.$data.userdata = null;
			}
		},
	}
</script>
<style scope lang="scss">
	.detail {
		.title {
			/*title 提示区*/
			color: #858DAD;
			font-weight: bold;
			margin-top: 0;
			font-size: 16px;
			em {
				color: #556191;
				margin-right: 10px;
			}
		}
		.line {
			/*title  下面的横线*/
			height: 2px;
			background-color: #556191;
		}
		.con {
			/*实名认证内容区*/
			margin-top: 30px;
			.el-message-box__title span {
				font-size: 16px;
				color: #3388ff !important;
			}
			.el-message-box__btns {
				text-align: center;
			}
			button.confirmbutton {
				background-color: #4a4f63;
				width: 8em;
			}
			.con-1 {
				font-size: 18px;
				color: #333;
				.el-row {
					margin-bottom: 30px;
				}
				.el-row {
					margin-bottom: 36px;
				}
			}
		}
		i {
			font-size: 30px;
			vertical-align: middle;
		}
		.el-icon-circle-check {
			color: #4dc036;
		}
		.el-icon-error {
			color: #d81e06;
		}
		.el-col-15 {
			line-height: 30px;
		}
		.con-2 {
			color: #ccc;
		}
		/*黑色按钮*/
		.buttons {
			width: 40%;
			height: 35px;
			min-width: 126px;
			max-width: 126px;
			background-color: #4a4f63;
			color: #fff;
		}
		.idimg {
			width: 200px;
			overflow: hidden;
			img {
				width: 150px;
				height: 100px;
				border: 1px solid red;
			}
		}
		.showimg {
			color: #4c8fff;
		}
		.showbutton {
			text-align: center;
			width: 150px;
		}
		/*警告状态*/
		.warn {
			color: #ff9913;
		}
		.center {
			text-align: center;
			vertical-align: middle;
		}
		.vercenter {
			line-height: 100px;
		}
		.dialogspan {
			display: inline-block;
			width: 150px;
		}
		.person .spantext {
			display: inline-block;
			width: 110px;
		}
		.enterprise .spantext {
			display: inline-block;
			width: 150px;
			text-align: right;
			margin-right: 46px;
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
		/*成功按钮*/
		.success {
			background-color: #4dc036;
			color: #fff;
			width: 320px;
			height: 35px;
			font-size: 16px;
		}
		/*错误按钮*/
		.error {
			background-color: #df1f1f;
			color: #fff;
			width: 320px;
			height: 35px;
			font-size: 16px;
		}
		/*弹框*/
		.el-dialog__title {
			color: #3388ff;
		}
		/*未通过原因  表头*/
		.has-gutter>tr {
			background: #4a4f63;
			color: #fff;
		}
		.el-dialog__body>img {
			width: 100%;
		}
	}
</style>

<style type="text/css">
	body {
		background: #1F2D3D !important;
	}
</style>