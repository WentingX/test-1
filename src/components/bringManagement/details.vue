<template>
	<!--撮合管理-待撮合-->
	<div class="managein" >
		<el-row class="managein_top" v-if="tableData.length>0">
			<el-row class="cuoheixinxi">
				<h4>撮合信息</h4>
				<p>订单号：<span>
					{{tableData.length>0?tableData[0].orderNumber:''}}
				</span></p>
			</el-row>
  				<el-table :data="tableData" border style="width: 100%" v-loading='loading'>
    				<el-table-column prop="infoClassification" label="信息分类" width="150"></el-table-column>
    				<el-table-column prop="enterpriseName" label="企业名称" width="200"></el-table-column>
    				<el-table-column prop="contact" label="联系人" width="150"></el-table-column>
    				<el-table-column prop="typeName" label="订单类型" width="124"></el-table-column>
    				<el-table-column prop="status" label="审核状态" width="124">
    						<template slot-scope="scope">
    						{{{'1000':'创建','1010':'待撮合','1002':'审核成功','-1001':'未通过审核','1003':'填写收益'}[tableData[0].status]}}
    					</template>
    				</el-table-column>
    				<el-table-column prop="projectName" label="标题" width="350"></el-table-column>
    				<el-table-column label="融资金额" width="110">
    					<template slot-scope="scope">
    						{{scope.row.financingVolumeStart}}{{scope.row.financingVolumeEnd}}元
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
					<span>
						<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea1" resize="none"></el-input>
					</span>
				</div>
				<div class="xinxi">
					<div>附件：</div>
					<template v-for="i in tableData[0].annexList">
						<span>
							<a :href="i.annex_url">{{i.annex_url.split('/')[i.annex_url.split('/').length-1]}}</a>
						</span>
					</template>
				</div>
			</el-row>
		</el-row>
		<el-row class="managein_center">
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
		<el-row class="managein_buttom" v-if="tableData3.length>0" v-loading='loading3'>
			<el-table :data="tableData3" border style="width: 100%" >
				<el-table-column prop="infoClassification" label="信息分类" width="150"></el-table-column>
				<el-table-column prop="enterpriseName" label="企业名称" width="220"></el-table-column>
				<el-table-column prop="contact" label="联系人" width="160"></el-table-column>
				<el-table-column prop="typeName" label="订单类型" width="123"></el-table-column>
				<el-table-column prop="status" label="审核状态" width="123">
					<template slot-scope="scope">
						{{{'1000':'创建','1001':'审核','1002':'审核成功','-1001':'未通过审核'}[tableData3[0].status]}}
					</template>
				</el-table-column>
				<el-table-column prop="projectName" label="标题" width="350"></el-table-column>
				<el-table-column prop="phone" label="联系电话" width="170"></el-table-column>
				<el-table-column label="所在地区" width="150">
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
					<div>去年营业额：</div>
					<span>{{tableData3[0].lastYearBusinessVolume}}</span>
				</div>
				<div class="xinxi2">
					<div>当前净资产：</div>
					<span>{{tableData3[0].netAsset}}</span>
				</div>
				<div class="xinxi2">
					<div>提供材料：</div>
					<span>{{tableData3[0].material}}</span>
				</div>
				<div class="xinxi2">
					<div>提供内容：</div>
					<span>
						<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea2" resize="none"></el-input>
					</span>
				</div>
				<div class="xinxi2">
					<div>附件：</div>
						<template v-for="i in tableData3[0].annexList">
							<span>
								<a :href="i.annex_url">{{i.annex_url.split('/')[i.annex_url.split('/').length-1]}}</a>
							</span>
						</template>
				</div>
			</el-row>
		</el-row>
		<el-row class="managein_footer">
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
		<div class="but">
			<el-button @click="confirmmatch">确认撮合</el-button>			
		</div>
	</div>
</template>
<style>
.managein{
	width: 100%;
	height: 100%;
} 
.managein .el-table--enable-row-hover .el-table__body tr:hover>td{
  background: transparent;
}
.managein .el-table--enable-row-hover .el-table__row:nth-of-type(even) {
	background: #f5f6fa;
}
.content-wrap .content-vi{
	height: auto;
}
.managein .managein_top{
	width: 100%;
}
.managein .managein_top .cuoheixinxi h4{
	color: #556191;
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
}
.managein .managein_top p{
	color: #bcbcbc;
}
.managein .managein_top .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.managein .managein_top .el-table tr{
	text-align: center;
}
.managein .managein_top .zhuyaoxinxi{
	margin-top: 50px;
}
.managein .managein_buttom .zhuyaoxinxi2 .xinxi2 div,
.managein .managein_top .zhuyaoxinxi .xinxi div{
	display: inline-block;
	width: 7%;
	text-align: right;
	margin-bottom: 30px;
	vertical-align: top;
	margin-right: 4%;
	color: #000000;
}
.managein .managein_buttom .zhuyaoxinxi2 .xinxi2 div span,
.managein .managein_top .zhuyaoxinxi .xinxi div span{
	width: 200px;
	margin-left: 50px;
	color: #000000;
}
.managein .managein_top .zhuyaoxinxi .xinxi span{
	margin-right: 20px;
}
.managein .managein_top .zhuyaoxinxi .xinxi .el-textarea__inner{
	width: 400px;
    border: none;
    border: 1px solid #999999;
    border-radius: 0;
}
.managein .managein_center{
	width: 100%;
}
.managein .managein_center .baogao{
	border-bottom: 2px solid #556191;
	padding-bottom: 20px;
	margin-bottom: 30px;
}
.managein .managein_center .baogao span{
	color: #556191;
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
	margin-bottom: 24px;
}
.managein .managein_center .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.managein .managein_center .el-table tr{
	text-align: center;
}
.managein .managein_buttom{
	width: 100%;
	margin-top: 50px;
}
.managein .managein_buttom .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.managein .managein_buttom .el-table tr{
	text-align: center;
}
.managein .managein_buttom .zhuyaoxinxi2{
	margin-top: 50px;
}
.managein .managein_buttom .zhuyaoxinxi2 .xinxi2 span{
	margin-right: 20px;
}
.managein .managein_buttom .zhuyaoxinxi2 .xinxi2 .el-textarea__inner{
    width: 400px;
    border: none;
    border: 1px solid #999999;
    border-radius: 0;
}
.managein .managein_footer{
	width: 100%;
	margin-top: 30px;
}
.managein .managein_footer .baogao{
	border-bottom: 2px solid #556191;
	padding-bottom: 20px;
	margin-bottom: 30px;
}
.managein .managein_footer .baogao span{
	color: #556191;
	border-left: 2px solid #88b7e0;
	padding-left: 20px;
	margin-bottom: 24px;
}
.managein .managein_footer .el-table th{
	color:#FFFFFF;
	text-align:center;
	background: #4a4f63;
	border: none;
}
.managein .managein_footer .el-table tr{
	text-align: center;
}
.managein .but{
	width: 100%;
	text-align: center;
	margin-top: 50px;
	margin-bottom: 50px;
}
.managein .but button{
	width: 170px;
	height: 60px;
	background: #4a4f63;
	border: none;
	font-size: 16px;
	color: #FFFFFF;
}
</style>
<script>
import API from '@/api/api.js'
  export default {
    data() {
      return {
		loading : false,
		loading2 : false,
		loading3 : false,
		loading4 : false,
        tableData: [],
        textarea1: '',      
        textarea2: '',
        tableData2: [],
        tableData3: [],
        tableData4: [],
        bePublishId:0,
      }
	},
    //接口
	created(){
		let _this=this;
		let aa={
			pageNum:1,
			pageSize:1,
		}
		this.$data.bePublishId="";
		this.loading = true
		this.loading2 = true
		this.loading3 = true
		this.loading4 = true
		API.tobematched2(_this.$route.params.id).then((res)=>{
			if(res.code == "200" && res.data){
				_this.$data.bePublishId = res.data.bePublishId; 
				_this.$data.tableData = [res.data];
				if(res.data.bePublishId != ""){
					API.BusinessReviewReport(res.data.bePublishId).then((res)=>{
						if(res.code == "200" && res.data){
							_this.$data.tableData4 = res.data;
						}
						_this.loading4 = false
					},
					(error) => {
						_this.loading4 = false
					})
				}
				API.tobematched3(res.data.bePublishId).then((res)=>{
					if(res.code == "200" && res.data){
						_this.$data.tableData3 = [res.data];
					}
					_this.loading3 = false
				},
				(error) => {
					_this.loading3 = false
				})
			} else {
				_this.msg('error','列表获取失败')
			}
			_this.loading = false
		},
		(error) => {
			_this.loading = false
			_this.msg('error','服务器错误')
		});

		API.BusinessReviewReport(this.$route.params.id).then((res)=>{
			if(res.code == '200' && res.data){
				_this.$data.tableData2 = res.data;
			}
			_this.loading2 = false
		},
		(error) => {
			_this.loading = false
		})	
	},
	methods:{
		msg(type, txt) {
			this.$message[type]({
			showClose: true,
			message: txt,
			duration: 2000
			});
		},
		confirmmatch(){//确认撮合
			let vm = this
			this.$confirm("确认提交撮合订单？",{
				type: 'warning',
				lockScroll:false,
				closeOnClickModal:false
			})
			.then(_=>{
				let par1 = `id=${vm.$route.params.id}&description=${vm.textarea1}`
				let par2 = `id=${vm.$data.bePublishId}&beDescription=${vm.textarea2}`
				if (vm.textarea1 != "") {
					API.providecontent(vm.$route.params.id,par1).then((res)=>{
						if(res.code == '200'){

						} else {
							vm.msg('error','撮合信息提交内容失败')
						}
					})			
				}
				if (vm.textarea2 != "") {
					API.providecontent2(vm.$data.bePublishId,par2).then((res)=>{
						if(res.code == '200'){

						} else {
							vm.msg('error','企业审核信息提交内容失败')
						}
					})
				}
				//确认撮合
				let id = `id=${vm.$route.params.id}`
				API.confirmmatchor(vm.$route.params.id,id).then((res)=>{
					if(res.code == "200"){
						vm.$store.commit('delete_tabs', vm.$route.path)//操作成功后从tab中关闭当前页面
						let paramS = {id:vm.$route.params.id}
						vm.$store.commit('save_detail_info',paramS)
						vm.$router.push({
							path: `/seterng/${paramS.id}`
						})
					} else {
						vm.msg('error','操作失败')
					}
				},
				(error) => {
					vm.msg('error','服务器错误')
				})
			})
			.catch(_=>{})
		}
	}
}
</script>