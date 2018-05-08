<template>
	<!--撮合管理-财务审批-->
	<div class="berewarded">
		<el-row class="berewarded_top" v-if="tableData.length > 0" :loading='loading'>
			<el-row class="cuoheixinxi">
				<h4>撮合信息</h4>
				<p>订单号：<span>{{tableData.length > 0?tableData[0].orderNumber:''}}</span></p>
			</el-row>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="infoClassification" label="信息分类" width="150"></el-table-column>
				<el-table-column prop="infoClassification" label="企业名称" width="220"></el-table-column>
				<el-table-column prop="contact" label="联系人" width="150"></el-table-column>
				<el-table-column prop="typeName" label="订单类型" width="120"></el-table-column>
				<el-table-column prop="status" label="审核状态" width="120">
					<template slot-scope="scope">
						{{{'1000':'创建','1010':'待撮合','1002':'审核成功','-1001':'未通过审核','1003':'填写收益'}[tableData[0].status]}}
					</template>
				</el-table-column>
				<el-table-column prop="projectName" label="标题" width="290"></el-table-column>
				<el-table-column label="融资金额" width="140">
					<template slot-scope="scope">
						{{scope.row.financingVolumeStart}}-{{scope.row.financingVolumeEnd}}元
					</template>
				</el-table-column>
				<el-table-column prop="phone" label="联系电话" width="140"></el-table-column>
				<el-table-column label="所在地区" width="150">
					<template slot-scope="scope">
						{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}
					</template>
				</el-table-column>
				<el-table-column prop="employeeName" label="审核员"></el-table-column>
			</el-table>
			<el-row class="zhuyaoxinxi">
				<div class="xinxi">
					<div>所在地区：</div>
					<span>
						{{tableData[0].province}}{{tableData[0].city}}{{tableData[0].area}}
					</span>
				</div>
				<div class="xinxi">
					<div>去年营业额：</div>
					<span>{{tableData[0].lastYearBusinessVolume}}</span>
				</div>
				<div class="xinxi">
					<div>当前净资产：</div>
					<span>{{tableData[0].netAsset}}</span>
				</div>
				<div class="xinxi">
					<div>提供材料：</div>
					<span>{{tableData[0].material}}</span>
				</div>
				<div class="xinxi">
					<div>提供内容：</div>
					<span>{{tableData[0].description}}</span>
				</div>
				<div class="xinxi">
					<div>附件：</div>
					<template v-for="i in tableData[0].annexList">
						<span :key="i.id">
							<a :href="i.annex_url">{{i.annex_url.split('/')[i.annex_url.split('/').length-1]}}</a>
						</span>
					</template>
				</div>
			</el-row>
		</el-row>
		<el-row class="berewarded_center">
			<el-row class="baogao">
				<span>企业审核报告</span>
			</el-row>
			<el-table :data="tableData2" border style="width: 100%" v-loading='loading2'>
				<el-table-column prop="time" label="报告时间"></el-table-column>
				<el-table-column prop="reporEdition" label="报告版本"></el-table-column>
				<el-table-column prop="operating" label="操作">
					<template slot-scope="scope">
						<el-button type="text" style="color: #4d97ff;">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row class="berewarded_buttom" v-if="tableData3.length > 0" v-loading='loading3'>
			<el-table :data="tableData3" border style="width: 100%">
				<el-table-column prop="infoClassification" label="信息分类" width="150"></el-table-column>
				<el-table-column prop="enterpriseName" label="企业名称" width="220"></el-table-column>
				<el-table-column prop="contact" label="联系人" width="160"></el-table-column>
				<el-table-column prop="typeName" label="订单类型" width="130"></el-table-column>
				<el-table-column prop="status" label="审核状态" width="130">
					<template slot-scope="scope">
						{{{'1000':'创建','1010':'待撮合','1002':'审核成功','-1001':'未通过审核','1003':'填写收益'}[tableData[0].status]}}
					</template>
				</el-table-column>
				<el-table-column prop="projectName" label="标题" width="350"></el-table-column>
				<el-table-column prop="phone" label="联系电话" width="150"></el-table-column>
				<el-table-column label="所在地区" width="170">
					<template slot-scope="scope">
						{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}
					</template>
				</el-table-column>
				<el-table-column prop="employeeName" label="审核员"></el-table-column>
			</el-table>
			<el-row class="zhuyaoxinxi2">
				<div class="xinxi2">
					<div>所在地区：</div>
					<span>{{tableData3[0].province}}{{tableData3[0].city}}{{tableData3[0].area}}</span>
				</div>
				<div class="xinxi2">
					<div>投资行业：</div>
					<span>{{tableData3[0].investmentIndustry}}</span>
				</div>
				<div class="xinxi2">
					<div>投资地区：</div>
					<span>{{tableData3[0].investmentArea}}</span>
				</div>
				<div class="xinxi2">
					<div>去年营业额：</div>
					<span>{{tableData3[0].lastYearBusinessVolume}}元</span>
				</div>
				<div class="xinxi2">
					<div>当前净资产：</div>
					<span>{{tableData3[0].netAsset}}元</span>
				</div>
				<div class="xinxi2">
					<div>投资资金：</div>
					<span>{{tableData3[0].financingVolumeStart}}-{{tableData3[0].financingVolumeEnd}}元</span>
				</div>
				<div class="xinxi2">
					<div>提供材料：</div>
					<span>{{tableData3[0].material}}</span>
				</div>
				<div class="xinxi2">
					<div>提供内容：</div>
					<span>{{tableData3[0].description}}</span>
				</div>
				<div class="xinxi2">
					<div>附件：</div>
					<template v-for="i in tableData3[0].annexList">
						<span :key="i.id">
							<a :href="i.annex_url">{{i.annex_url.split('/')[i.annex_url.split('/').length-1]}}</a>
						</span>
					</template>
				</div>
			</el-row>
		</el-row>
		<el-row class="berewarded_footer">
			<el-row class="baogao">
				<span>企业审核报告</span>
			</el-row>
			<el-table :data="tableData4" border style="width: 100%" v-loading='loading4'>
				<el-table-column prop="time" label="报告时间"></el-table-column>
				<el-table-column prop="reporEdition" label="报告版本"></el-table-column>
				<el-table-column prop="operating4" label="操作">
					<template slot-scope="scope">
						<el-button type="text" style="color: #4d97ff;">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row class="berewarded_foo">
			<el-row class="baogao">
				<span>项目文件</span>
			</el-row>
			<el-table :data="tableData5" border style="width: 100%" v-loading='loading5'>
				<el-table-column prop="fileName" label="文件名称"></el-table-column>
				<el-table-column prop="fileSize" label="文件大小"></el-table-column>
				<el-table-column prop="operating5" label="操作">
					<template slot-scope="scope">
						<el-button type="text" style="color: #4d97ff;">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row class="berewarded_dc">
			<el-row class="baogao">
				<span>调查报告</span>
			</el-row>
			<el-table :data="tableData6" border style="width: 100%" :loading='loading6'>
				<el-table-column prop="type" label="需求类型"></el-table-column>
				<el-table-column prop="name" label="文件"></el-table-column>
				<el-table-column prop="time" label="结果"></el-table-column>
				<el-table-column prop="operating6" label="操作">
					<template slot-scope="scope">
						<el-button type="text" style="color: #4d97ff;">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<div class="but">
			<el-button class="matfailed">撮合成功</el-button>				
		</div>
		<el-row class="berewarded_wtgyy" >
			<el-row class="baogao">
				<span>收益信息</span>
			</el-row>
			<el-table :data="tableData7" border style="width: 100%" v-loading='loading7'>
				<el-table-column prop="username" label="用户名"></el-table-column>
				<el-table-column prop="name" label="真实姓名"></el-table-column>
				<el-table-column prop="userType" label="用户角色"></el-table-column>
				<el-table-column prop="idNumber" label="身份证号"></el-table-column>
				<el-table-column prop="infoClassification" label="信息分类"></el-table-column>
				<el-table-column prop="telephone" label="联系电话 "></el-table-column>
				<el-table-column prop="payee" label="收款人"></el-table-column>
			</el-table>
			<el-table :data="tableData7" border style="width: 100%" v-loading='loading7'>
				<el-table-column prop="orderNumber" label="订单号"></el-table-column>
				<el-table-column prop="bank" label="开户支行"></el-table-column>
				<el-table-column prop="account" label="银行账号"></el-table-column>
				<el-table-column label="金额">
					<template slot-scope="scope">
						<a href="javasrcipt:;" style="color: #3388ff;">{{tableData7.money}}</a>    						
					</template>
				</el-table-column>
				<el-table-column prop="transferapproval" label="转账审批">
					<template slot-scope="scope">
						<a href="javasrcipt:;" style="color: #3388ff;"></a>
					</template>
				</el-table-column>
			</el-table>
			<el-table :data="tableData9" border style="width: 100%" v-loading='loading9'>
				<el-table-column prop="username" label="用户名"></el-table-column>
				<el-table-column prop="name" label="真实姓名"></el-table-column>
				<el-table-column prop="userType" label="用户角色"></el-table-column>
				<el-table-column prop="idNumber" label="身份证号"></el-table-column>
				<el-table-column prop="infoClassification" label="信息分类"></el-table-column>
				<el-table-column prop="telephone" label="联系电话 "></el-table-column>
				<el-table-column prop="payee" label="收款人"></el-table-column>
				
			</el-table>
			<el-table :data="tableData9" border style="width: 100%" v-loading='loading9'>
				<el-table-column prop="orderNumber" label="订单号"></el-table-column>
				<el-table-column prop="bank" label="开户支行"></el-table-column>
				<el-table-column prop="account" label="银行账号"></el-table-column>
				<el-table-column label="金额">
					<template slot-scope="scope">
						<a href="javasrcipt:;" style="color: #3388ff;">{{tableData9.money}}</a>    						
					</template>
				</el-table-column>
				<el-table-column prop="transferapproval" label="转账审批">
					<template slot-scope="scope">
						<a href="javasrcipt:;" style="color: #3388ff;">{{tableData9.voucher}}</a>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<div class="but2">
			<el-button class="matfailed">财务审批中</el-button>				
		</div>
	</div>
</template>
<style>
.content-wrap .content-vi{
	height: auto;
}
.berewarded{
	width: 100%;
	height: 100%;
} 
.berewarded .el-table--enable-row-hover .el-table__body tr:hover>td{
  background: transparent;
}
.berewarded .el-table--enable-row-hover .el-table__row:nth-of-type(even) {
	background: #f5f6fa;
}
.berewarded .berewarded_top{
	width: 100%;
}
.berewarded .berewarded_top .cuoheixinxi h4{
	color: #556191;
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
}
.berewarded .berewarded_top p{
	color: #bcbcbc;
}
.berewarded .berewarded_top .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.berewarded .berewarded_top .el-table tr{
	text-align: center;
}
.berewarded .berewarded_top .zhuyaoxinxi{
	margin-top: 50px;
}
.berewarded .berewarded_buttom .zhuyaoxinxi2 .xinxi2 div,
.berewarded .berewarded_top .zhuyaoxinxi .xinxi div{
	display: inline-block;
	width: 7%;
	text-align: right;
	margin-bottom: 30px;
	vertical-align: top;
	margin-right: 4%;
	color: #000000;
}
.berewarded .berewarded_buttom .zhuyaoxinxi2 .xinxi2 div span,
.berewarded .berewarded_top .zhuyaoxinxi .xinxi div span{
	width: 200px;
	margin-left: 50px;
	color: #000000;
}
.berewarded .berewarded_top .zhuyaoxinxi .xinxi span{
	margin-right: 20px;
}
.berewarded .berewarded_center{
	width: 100%;
}
.berewarded .berewarded_center .baogao{
	border-bottom: 2px solid #556191;
	padding-bottom: 20px;
	margin-bottom: 30px;
}
.berewarded .berewarded_center .baogao span{
	color: #556191;
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
	margin-bottom: 24px;
}
.berewarded .berewarded_center .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.berewarded .berewarded_center .el-table tr{
	text-align: center;
}
.berewarded .berewarded_buttom{
	width: 100%;
	margin-top: 50px;
}
.berewarded .berewarded_buttom .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.berewarded .berewarded_buttom .el-table tr{
	text-align: center;
}
.berewarded .berewarded_buttom .zhuyaoxinxi2{
	margin-top: 50px;
}
.berewarded .berewarded_buttom .zhuyaoxinxi2 .xinxi2 span{
	margin-right: 20px;
}

.berewarded .berewarded_footer{
	width: 100%;
	margin-top: 60px;
}
.berewarded .berewarded_footer .baogao{
	border-bottom: 2px solid #556191;
	padding-bottom: 20px;
	margin-bottom: 30px;
}
.berewarded .berewarded_footer .baogao span{
	color: #556191;
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
	margin-bottom: 24px;
}
.berewarded .berewarded_footer .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.berewarded .berewarded_footer .el-table tr{
	text-align: center;
}
.berewarded .berewarded_foo{
	width: 100%;
	margin-top: 60px;
}
.berewarded .berewarded_foo .baogao{
	border-bottom: 2px solid #556191;
	padding-bottom: 20px;
	margin-bottom: 30px;
}
.berewarded .berewarded_foo .baogao span{
	color: #556191;
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
	margin-bottom: 24px;
}
.berewarded .berewarded_foo .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.berewarded .berewarded_foo .el-table tr{
	text-align: center;
}
.berewarded .berewarded_dc,
.berewarded_wtgyy
{
	width: 100%;
	margin-top: 60px;
}
.berewarded .berewarded_dc .baogao{
	border-bottom: 2px solid #556191;
	padding-bottom: 20px;
	margin-bottom: 30px;
}
.berewarded .berewarded_dc .baogao span{
	color: #556191;
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
	margin-bottom: 24px;
}
.berewarded .berewarded_dc .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.berewarded .berewarded_dc .el-table tr{
	text-align: center;
}
.berewarded .berewarded_wtgyy .el-table{
	margin-top: 50px;
}
.berewarded .berewarded_wtgyy .baogao{
	border-bottom: 2px solid #556191;
	padding-bottom: 20px;
	margin-bottom: 30px;
}
.berewarded .berewarded_wtgyy .baogao span{
	color: #556191;
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
	margin-bottom: 24px;
}
.berewarded .berewarded_wtgyy .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.berewarded .berewarded_wtgyy .el-table tr{
	text-align: center;
}

.berewarded .but{
	width: 100%;
	text-align: center;
	margin-top: 60px;
    margin-bottom: 100px;
}
.berewarded .but .el-button {
	background: #4dc036;
	width: 300px;
	height: 50px;
	color: #FFFFFF;
	border-radius: 0px;
	border: none;
	cursor: auto;
}
.berewarded .but2{
	width: 100%;
	text-align: center;
	margin-top: 60px;
    margin-bottom: 100px;
}
.berewarded .but2 .el-button {
	background: red;
	width: 300px;
	height: 50px;
	color: #FFFFFF;
	border-radius: 0px;
	border: none;
	cursor: auto;
}
</style>
<script>
import API from '@/api/api.js'
  export default {
    data() {
      return {
		loading:false,
		loading2:false,
		loading3:false,
		loading4:false,
		loading5:false,
		loading6:false,
		loading7:false,
		loading9:false,
        tableData: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        tableData5: [],
        tableData6: [],
        tableData7: [],
        tableData9: [],
      }
    },
	methods:{
		msg(type, txt) {
			this.$message[type]({
			showClose: true,
			message: txt,
			duration: 2000
			});
		},
		getdata(){
			let _this = this;
			let a = "";
			let b = this.$route.params.id;
			
			API.tobematched6(this.$route.params.id)
			.then((res) => {
				if(res.code == "200" && res.data){
					a = res.data.bePublishId;
					_this.tableData = [res.data];
					console.log("撮合信息",res);
					API.tobematched7(a).then((res) => {
						if(res.code == "200" && res.data){
							_this.tableData3 = [res.data];
							console.log("企业审核报告1,表二",res);
						} 
						_this.loading3 = false
					},
					(error)=>{
						_this.loading3 = false
					})
					API.revenueinformation(b).then((res) => {
						if(res.code == "200" && res.data){
							console.log("收益信息1",res)
							_this.tableData7 = [res.data];
						} 
						_this.loading7 = false
					},
					(error)=>{
						_this.loading7 = false
					})	
					API.revenueinformation2(a).then((res) => {
						if(res.code == "200" && res.data){
							_this.tableData9 = [res.data];
							console.log("收益信息2",res)
						}
						_this.loading9 = false
					},
					(error)=>{
						_this.loading9 = false
					})
					API.projectfiles(b).then((res) => {
						if(res.code == "200" && res.data){
							_this.tableData5 = res.data;
							console.log("项目文件",res)
						} 
						_this.loading5 = false
					},
					(error)=>{
						_this.loading5 = false
					})	
					API.investigation(b).then((res) => {
						if(res.code == "200" && res.data){
							_this.tableData6 = [res.data];
							console.log("调查报告",res)
						}
						_this.loading6 = false
					},
					(error)=>{
						_this.loading6 = false
					})
					API.BusinessReviewReport(b).then((res) => {
						if(res.code == "200" && res.data){
							console.log("企业审核报告",res)
							_this.tableData2 = res.data;
						} 
						_this.loading2 = false
					},
					(error)=>{
						_this.loading2 = false
					})	
					API.BusinessReviewReport(a).then((res) => {
						if(res.code == "200" && res.data){
							console.log("企业审核报告2",res)
							_this.tableData4 = res.data;
						} 
						_this.loading4 = false
					},
					(error)=>{
						_this.loading4 = false
					})
				} else {
					_this.msg('error',"获取列表失败")
				}
				_this.loading = false
			},(error) => {
				console.log("没有写function")
				_this.loading = false
				console.log(_this.loading)
				_this.msg('error',"服务器错误")
			});
		}
	},
    //接口
	created (){
		this.loading = true
		this.loading2 = true
		this.loading3 = true
		this.loading4 = true
		this.loading5 = true
		this.loading6 = true
		this.loading7 = true
		this.loading9 = true
		this.getdata()
	},
  }
  
</script>