<template>
	<!--撮合管理-撮合中-->
	<div class="matchmanage">
		<el-row class="matchmanage_top" v-if="tableData.length > 0" v-loading="loading">
			<el-row class="cuoheixinxi">
				<h4>撮合信息</h4>
				<p>订单号：<span>{{tableData.length > 0?tableData[0].orderNumber:''}}</span></p>
			</el-row>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="infoClassification" label="信息分类" width="150"></el-table-column>
				<el-table-column prop="enterpriseName" label="企业名称" width="220"></el-table-column>
				<el-table-column prop="contact" label="联系人" width="150"></el-table-column>
				<el-table-column prop="typeName" label="订单类型" width="125"></el-table-column>
				<el-table-column prop="status" label="审核状态" width="125">
					<template slot-scope="scope">
						{{{'1000':'创建','1010':'待撮合','1002':'审核成功','-1001':'未通过审核','1003':'填写收益'}[tableData[0].status]}}
					</template>
				</el-table-column>
				<el-table-column prop="projectName" label="标题" width="300"></el-table-column>
				<el-table-column label="融资金额" width="140">
					<template slot-scope="scope">
						{{scope.row.financingVolumeStart}}{{scope.row.financingVolumeEnd}}元
					</template>
				</el-table-column>
				<el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
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
						<span>
							<a :href="i.annex_url">{{i.annex_url.split('/')[i.annex_url.split('/').length-1]}}</a>
						</span>
					</template>
				</div>
			</el-row>
		</el-row>
		<!-- 企业审核报告1 -->
		<el-row class="matchmanage_center">
			<el-row class="baogao">
				<span>企业审核报告</span>
			</el-row>
			<el-table :data="tableData2" border style="width: 100%" v-loading="loading2">
				<el-table-column prop="time" label="报告时间"></el-table-column>
				<el-table-column prop="reporEdition" label="报告版本"></el-table-column>
				<el-table-column prop="operating" label="操作">
					<template slot-scope="scope">
						<el-button type="text" style="color: #4d97ff;">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>

		<el-row class="matchmanage_buttom" v-if="tableData3.length > 0" v-loading="loading3">
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
					<span>{{tableData3[0].financingVolumeStart}}{{tableData3[0].financingVolumeEnd}}元</span>
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
					<template v-for="i in tableData3[0].annexList" >
						<span>
							<a :href="i.annex_url">{{i.annex_url.split('/')[i.annex_url.split('/').length-1]}}</a>
						</span>
					</template>
				</div>
			</el-row>
		</el-row>
		<!-- 企业审核报告2 -->
		<el-row class="matchmanage_footer">
			<el-row class="baogao">
				<span>企业审核报告</span>
			</el-row>
  				<el-table :data="tableData4" border style="width: 100%" v-loading="loading4">
    				<el-table-column prop="time" label="报告时间"></el-table-column>
    				<el-table-column prop="reporEdition" label="报告版本"></el-table-column>
    				<el-table-column prop="operating4" label="操作">
    					<template slot-scope="scope">
	    					<el-button type="text" style="color: #4d97ff;">查看</el-button>
	      				</template>
    				</el-table-column>
  				</el-table>
		</el-row>
		<!-- 项目文件 -->
		<el-row class="matchmanage_foo">
			<el-row class="baogao">
				<span>项目文件</span>
				<el-upload
						class="upload-demo"
						:action="importFileUrl"
						:headers='headers'
						name="file" :show-file-list = "false"
						:onError="uploadError"
						:onSuccess="uploadSuccess">
						<el-button size="small" type="primary">点击上传</el-button>
				</el-upload>
			</el-row>
			<el-table :data="tableData5" border style="width: 100%" v-loading="loading5">
				<el-table-column prop="fileName" label="文件名称"></el-table-column>
				<el-table-column prop="fileSize" label="文件大小"></el-table-column>
				<el-table-column prop="uploadTime" label="文件时间"></el-table-column>
				<el-table-column prop="operating5" label="操作">
					<template slot-scope="scope">
						<el-button type="text" style="color: #4d97ff;">查看</el-button>
						<el-button type="text" style="color: #4d97ff;" @click="fileDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<!-- 调查报告 -->
		<el-row class="matchmanage_dc">
			<el-row class="baogao">
				<span>调查报告</span>
			</el-row>
			<el-table :data="tableData6[0]" border style="width: 100%" v-loading="loading6">
				<el-table-column prop="type" label="需求类型"></el-table-column>
				<el-table-column prop="name" label="文件"></el-table-column>
				<el-table-column prop="time" label="时间"></el-table-column>
				<el-table-column prop="operating6" label="操作">
					<template slot-scope="scope">
						<el-button type="text" style="color: #4d97ff;">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<div class="but">
			<el-button class="matchsuccessful" @click="matchsuccessful">撮合成功</el-button>		
			<el-button type="text" @click="centerDialogVisible = true" class="matchfail">撮合失败</el-button>
			<el-dialog title="撮合失败" :visible.sync="centerDialogVisible" width="30%" 
						height="30%" :before-close="handleClose" :showClose = "false" 
						@close="visibleClose" :lock-scroll="false">
				<a href="javascript:;" @click.prevent="centerClose" class="el-icon-close icoClose"></a>
  				<el-row>
  					<div>
  						<p><span>*</span>撮合失败理由：</p>
						<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea5" resize="none"></el-input>
  					</div>
  				</el-row>
  				<span slot="footer" class="dialog-footer">
    				<el-button type="primary"  @click="matchfailed">提 交</el-button>
  				</span>
			</el-dialog>	
			<el-button type="text" @click="requirement = true" class="requirement">选择需求类型</el-button>
			<el-dialog title="选择业务类型" :visible.sync="requirement" width="30%" 
						:before-close="handlerequirement" :showClose = "false" 
						@close="requirClose('selecInf')" top="5vh" :lock-scroll="false">
				<a href="javascript:;" @click.prevent="requestClose()" class="el-icon-close icoClose"></a>
				<el-row class="businesstype">
					<el-form :inline="true" :model="selecInf" class="demo-form-inline form" ref="selecInf">
						<el-form-item label="需求类型："  :rules="[{ required: true, message: '必填', trigger: 'blur,change' }]" prop="type">
							<el-select v-model="selecInf.type" placeholder="请选择" clearable name="type" value="3">
								<el-option label="尽职调查" value="1" ></el-option>
								<el-option label="投后管理" value="2" ></el-option>
								<el-option label="高端定制" value="3" ></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="项目类型："  v-if="selecInf.type =='3'" prop="projectType">
							<el-select v-model="selecInf.projectType" placeholder="请选择" clearable name="projectType">
								<el-option label="尽职调查" value="1" ></el-option>
								<el-option label="投后管理" value="2" ></el-option>
								<el-option label="高端定制" value="3" ></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业名称：" :rules="[{ required: true, message: '必填', trigger: 'blur'}]" prop="name">
							<el-input placeholder="" v-model="selecInf.name" clearable name="name"></el-input>
						</el-form-item>
						<el-form-item label="联系人：" :rules="[{ required: true, message: '必填', trigger: 'blur'}]" prop="contact">
							<el-input placeholder="" v-model="selecInf.contact" clearable name="contact"></el-input>
						</el-form-item>
						<el-form-item label="联系电话：" :rules="telephone" prop="telephone">
							<el-input size="mini" v-model="selecInf.telephone" clearable name="telephone"></el-input>
						</el-form-item>
						<el-form-item label="所属行业：" prop="industry">
							<el-input size="mini" v-model="selecInf.industry" clearable name="industry"></el-input>
						</el-form-item>
						<el-form-item label="公司地址：" prop="address">
							<el-input size="mini" v-model="selecInf.address" clearable name="address"></el-input>
						</el-form-item>
						<el-form-item label="企业规模：" prop="scale">
							<el-input size="mini" v-model="selecInf.scale" clearable name="scale"></el-input>
						</el-form-item>
						<el-form-item label="描述内容：" prop="description">
							<el-input size="mini" v-model="selecInf.description" clearable name="description"></el-input>
						</el-form-item>
						<el-form-item label="附件：" prop="id" :rules="[{required:true, message:'请上传图片', trigger:'change'}]">
							<el-upload class="upload-demo"
									action="/api/api/v1/admin/manages/annexUpload"
									:headers='headers'
									:on-error="uploadError2"
									:on-success="uploadSuccess2" :on-remove="uploadRemove2">
								<el-button size="small" type="primary">上传附件</el-button>
							</el-upload>
							<el-input class="hidden" v-model="selecInf.id" name="id"></el-input>
						</el-form-item>
						<el-form-item label="人员建议：" :rules="[{ required: true, message: '必填', trigger: 'blur'}]" prop="staffSuggestion">
							<el-input size="mini" v-model="selecInf.staffSuggestion" clearable name="staffSuggestion" placeholder="财税经理1名，财税助理2名"></el-input>
						</el-form-item>
						<el-form-item label="期望完成时间：" :rules="[{ required: true, message: '必填', trigger: 'blur'}]" prop="targetDate">
							<el-date-picker v-model="selecInf.targetDate" type="date" placeholder="选择日期" style="line-height: 0px;" value-format="yyyy-MM-dd" :editable = "false"></el-date-picker>
						</el-form-item>
						<el-form-item label="预计总费用：" :rules="[{ required: true, message: '必填', trigger: 'blur'}]" prop="aggregateAmount">
							<el-input size="mini" v-model="selecInf.aggregateAmount" clearable name="aggregateAmount"></el-input>
						</el-form-item>
					</el-form>
				</el-row>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click.prevent="onsubmit('selecInf')">提 交</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<style>
	.content-wrap .content-vi{
		height: auto;
	}
	.matchmanage{
		width: 100%;
		height: 100%;
	} 
	.matchmanage .hidden{
		display: none;
	}
	.matchmanage .el-form-item__error{
		padding: 0px;
	}
	.matchmanage .el-table--enable-row-hover .el-table__body tr:hover>td{
		background: transparent;
	}
	.matchmanage .el-table--enable-row-hover .el-table__row:nth-of-type(even) {
		background: #f5f6fa;
	}
	.matchmanage .icoClose{
		text-decoration: none;
		color: #909399;
		position: absolute;
		right: 25px;
		top: 25px;
		z-index: 99;
	}
	.matchmanage .matchmanage_top{
		width: 100%;
	}
	.matchmanage .matchmanage_top .cuoheixinxi h4{
		color: #556191;
		border-left: 2px solid #88b7e0;
		padding-left: 20px;
	}
	.matchmanage .matchmanage_top p{
		color: #bcbcbc;
	}
	.matchmanage .matchmanage_top .el-table th{
		color:#FFFFFF;
		text-align:center;
		background: #4a4f63;
		border: none;
	}
	.matchmanage .matchmanage_top .el-table tr{
		text-align: center;
	}
	.matchmanage .matchmanage_top .zhuyaoxinxi{
		margin-top: 50px;
	}
	.matchmanage .matchmanage_buttom .zhuyaoxinxi2 .xinxi2 div,
	.matchmanage .matchmanage_top .zhuyaoxinxi .xinxi div{
		display: inline-block;
		width: 7%;
		text-align: right;
		margin-bottom: 30px;
		vertical-align: top;
		margin-right: 4%;
		color: #000000;
	}
	.matchmanage .matchmanage_buttom .zhuyaoxinxi2 .xinxi2 div span,
	.matchmanage .matchmanage_top .zhuyaoxinxi .xinxi div span{
		width: 200px;
		margin-left: 50px;
		color: #000000;
	}
	.matchmanage .matchmanage_top .zhuyaoxinxi .xinxi span{
		margin-right: 20px;
	}
	.matchmanage .matchmanage_top .zhuyaoxinxi .xinxi .el-textarea__inner{
		width: 400px;
		border: none;
		border: 1px solid #999999;
		border-radius: 0;
	}
	.matchmanage .matchmanage_center{
		width: 100%;
	}
	.matchmanage .matchmanage_center .baogao{
		border-bottom: 2px solid #556191;
		padding-bottom: 20px;
		margin-bottom: 30px;
	}
	.matchmanage .matchmanage_center .baogao span{
		color: #556191;
		border-left: 2px solid #88b7e0;
		padding-left: 20px;
		margin-bottom: 24px;
	}
	.matchmanage .matchmanage_center .el-table th{
		color:#FFFFFF;
		text-align:center;
		background: #4a4f63;
		border: none;
	}
	.matchmanage .matchmanage_center .el-table tr{
		text-align: center;
	}
	.matchmanage .matchmanage_buttom{
		width: 100%;
		margin-top: 50px;
	}
	.matchmanage .matchmanage_buttom .el-table th{
		color:#FFFFFF;
		text-align:center;
		background: #4a4f63;
		border: none;
	}
	.matchmanage .matchmanage_buttom .el-table tr{
		text-align: center;
	}
	.matchmanage .matchmanage_buttom .zhuyaoxinxi2{
		margin-top: 50px;
	}
	.matchmanage .matchmanage_buttom .zhuyaoxinxi2 .xinxi2 span{
		margin-right: 20px;
	}
	.matchmanage .matchmanage_buttom .zhuyaoxinxi2 .xinxi2 .el-textarea__inner{
		width: 400px;
		border: none;
		border: 1px solid #999999;
		border-radius: 0;
	}
	.matchmanage .matchmanage_footer{
		width: 100%;
		margin-top: 60px;
	}
	.matchmanage .matchmanage_footer .baogao{
		border-bottom: 2px solid #556191;
		padding-bottom: 20px;
		margin-bottom: 30px;
	}
	.matchmanage .matchmanage_foo .baogao>span,
	.matchmanage .matchmanage_footer .baogao>span{
		color: #556191;
		border-left: 2px solid #88b7e0;
		padding-left: 20px;
		margin-bottom: 24px;
	}
	.matchmanage .matchmanage_foo .baogao .upload-demo .el-button--primary{
		color: orange;
		background-color: #fff;
		border-color: orange;
	}
	.matchmanage .matchmanage_footer .el-table th{
		color:#FFFFFF;
		text-align:center;
		background: #4a4f63;
		border: none;
	}
	.matchmanage .matchmanage_footer .el-table tr{
		text-align: center;
	}
	.matchmanage .matchmanage_foo{
		width: 100%;
		margin-top: 60px;
	}
	.matchmanage .matchmanage_foo .baogao{
		border-bottom: 2px solid #556191;
		padding-bottom: 9px;
		margin-bottom: 30px;
	}
	.matchmanage .matchmanage_foo .baogao .upload-demo{
		float: right;
	}
	.matchmanage .matchmanage_foo .baogao span a{
		float: right;
		color: orange;
		text-decoration: none;
		border: 1px solid orange;
		padding: 5px;
	}
	.matchmanage .matchmanage_foo .el-table th{
		color:#FFFFFF;
		text-align:center;
		background: #4a4f63;
		border: none;
	}
	.matchmanage .matchmanage_foo .el-table tr{
		text-align: center;
	}
	.matchmanage .matchmanage_dc{
		width: 100%;
		margin-top: 60px;
	}
	.matchmanage .matchmanage_dc .baogao{
		border-bottom: 2px solid #556191;
		padding-bottom: 20px;
		margin-bottom: 30px;
	}
	.matchmanage .matchmanage_dc .baogao span{
		color: #556191;
		border-left: 2px solid #88b7e0;
		padding-left: 20px;
		margin-bottom: 24px;
	}
	.matchmanage .matchmanage_dc .el-table th{
		color:#FFFFFF;
		text-align:center;
		background: #4a4f63;
		border: none;
	}
	.matchmanage .matchmanage_dc .el-table tr{
		text-align: center;
	}
	.matchmanage .but{
		width: 100%;
		text-align: center;
		margin-top: 50px;
		margin-bottom: 50px;
	}
	.matchmanage .but .matchsuccessful{
		width: 170px;
		height: 60px;
		background: #4a4f63;
		border: none;
		font-size: 16px;
		color: #FFFFFF;
		margin-left: 35px;
		margin-right: 90px;
	}
	.matchmanage .but .matchfail{
		width: 170px;
		height: 60px;
		background: #4a4f63;
		border: none;
		font-size: 16px;
		color: #FFFFFF;
		margin-left: 35px;
		margin-right: 90px;
	}
	.matchmanage .but .requirement{
		width: 170px;
		height: 60px;
		background: #4a4f63;
		border: none;
		font-size: 16px;
		color: #FFFFFF;
		margin-left: 35px;
		margin-right: 90px;
	}
	.matchmanage .el-dialog .el-dialog__header{
		text-align: left;
		background: #4a4f63;
	}
	.matchmanage .el-dialog .el-dialog__header .el-dialog__close,
	.matchmanage .el-dialog__title{
		color: #ffffff;
		font-size: 16px;
	}
	.matchmanage .el-dialog .el-dialog__body{
		text-align: left;
	}
	.matchmanage .el-dialog .el-dialog__body div{
		vertical-align: top;
	}
	.matchmanage .el-dialog .el-dialog__body div p span{
		color: red;
	}
	.matchmanage .el-dialog .el-dialog__body div p{
		display: inline-block;
		margin-top: 0;
		color: #000000;
	}
	.matchmanage .el-dialog .el-dialog__body div .el-textarea{
		width: 76%;
		margin-left: 12px;
	}
	.matchmanage .el-dialog .el-dialog__body .el-textarea__inner{
		border-radius: 0;
		border: none;
		border: 1px solid #999999;
	}
	.matchmanage .el-dialog .el-dialog__footer{
		text-align: center;
	}
	.matchmanage .el-dialog .el-dialog__footer .dialog-footer .el-button{
		background: #4a4f63;
		border: none;
		border-radius: 0;
		width: 120px;
		height: 46px;
	}
	.matchmanage .el-dialog .el-dialog__footer .dialog-footer .el-button span{
		font-size: 16px;
	}
	.matchmanage .but .businesstype div{
		margin-bottom: 6px;
	}
	.matchmanage .but .businesstype .el-form--inline .el-form-item{
		display: block;
	}
	.matchmanage .but .businesstype .el-form--inline .el-form-item__label{
		width: 170px;
		padding-right: 50px;
	}
	.matchmanage .el-input__icon{
		line-height: 0;
	}
	.matchmanage .but .businesstype .el-input{
		width: 320px;
	}
	.matchmanage .but .businesstype .el-input .el-input__inner{
		border-radius: 0;
		height: 30px;
		display: inline-block;
	}
	.matchmanage .el-input__inner{
		border: 1px solid #999;
	}
	.matchmanage .but .businesstype .el-select .el-input{
		width: 135px;
	}
	.matchmanage .but .block .el-date-editor .el-input__prefix .el-input__icon{
		margin-right: 100px;
		margin-top: -5px;	
	}
	.matchmanage .but .block .el-date-editor .el-input__suffix{
		display: none;
	}
	.matchmanage .but .block  .el-date-editor{
		width: 140px;
	}

</style>

<script>
import API from '@/api/api.js'
export default {
    data() {
		//自定义电话号码验证规则
		var validatePass2 = (rule, value, callback) => {
			if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(value))) {
				callback(new Error('不是完整的11位手机号或者正确的手机号前七位'));
			}  else {
				callback();
        	}
		};
      return {
		telephone:[ { required: true, message: '必填', trigger: 'blur'},
					{validator:validatePass2,trigger: 'blur'}
			],
      	aa:'',
      	requirement: false,
      	centerDialogVisible: false,
        tableData: [],
        textarea5:'',
        tableData2: [],
        tableData3: [],
        tableData4: [],
        tableData5: [],
		tableData6: [],
		loading:false,
		loading2:false,
		loading3:false,
		loading4:false,
		loading5:false,
		loading6:false,
		selecInf:{//选择信息类型
			id:"",
			type:"",
			projectType:"",
			name:"",
			contact:"",
			userId:JSON.parse(window.sessionStorage.getItem("access-user")).userid,
			telephone:"",
			industry:"",
			scale:"",
			provincesId:"",
			citiesId:"",
			areasId:"",
			address:"",
			description:"",
			staffSuggestion:"",
			targetDate:"",
			aggregateAmount:""
		},
		importFileUrl: '/api/api/v1/admin/manages/fileUpload?matchingId='+ this.$route.params.id,//上传文件地址
		authorization:"",//上传文件头部信息
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
		handlerequirement() {},
		handleClose(){},
		matchsuccessful(){// 撮合成功
			let _this = this;
			this.$confirm("确认执行？",{
				type: 'warning',
				lockScroll:false,
				closeOnClickModal:false
			})
			.then(_=>{
				let id = `id=${_this.$route.params.id}`		
				API.matchsuccessfull(_this.$route.params.id,id).then((res) => {
					if(res.code == "200"){
						_this.$store.commit('delete_tabs', _this.$route.path)
						let a = {id:_this.$route.params.id}
						_this.$store.commit('save_detail_info',a)
						_this.$router.push({
							path: `/toberewarded/${a.id}`
						});	
					} else {
						_this.msg('error','操作失败')
						return
					}
				},
				(error)=>{
					_this.msg('error','服务器错误')
				})
			})
			.catch(_=>{return})
		},
		//撮合失败 提交
		matchfailed(){
			if (this.textarea5 != "") {
				this.$confirm("确认提交？",{
					type: 'warning',
					lockScroll:false,
					closeOnClickModal:false
				})
				.then(_=>{
					this.$data.centerDialogVisible = false
					let par2={
						id:this.$route.params.id,
						reason:this.textarea5,
						status:1
					}
					let vm = this
					API.failedclosetheorder(par2).then((res) => {
						if(res.code == "200"){
							vm.$store.commit('delete_tabs', vm.$route.path)//操作成功后从tab中关闭当前页面
							let paramS = {id:vm.$route.params.id}
							vm.$store.commit('save_detail_info',paramS)
							vm.$router.push({
								path: `/dafeated/${paramS.id}`
							})
						} else {
							vm.msg('error','操作失败')
						}
					},
					(error)=>{
						vm.msg('error','服务器错误')
					})
				})
				.catch(_=>{return})
			}else{
				this.$confirm("未填写任何理由是否放弃关闭订单并退出？",{
					type: 'warning',
					lockScroll:false,
					closeOnClickModal:false
				})
				.then(_=>{
					this.$data.centerDialogVisible = false
					return
				})
				.catch(_=>{
					return
				})
			}
		},
		centerClose(){//关闭订单弹窗 关闭弹窗按钮
			this.$confirm("确认关闭？",{
				lockScroll:false,
				closeOnClickModal:false
			})
			.then(_=>{
				this.centerDialogVisible = false
			})
			.catch(_=>{})
		},
		requestClose(){//选择需求类型弹窗 关闭弹窗按钮
			this.$confirm("确认关闭？",{
				lockScroll:false,
				closeOnClickModal:false
			})
			.then(_=>{
				this.requirement = false
			})
			.catch(_=>{})
		},
		visibleClose(){//关闭撮合订单弹窗 清空数据
			this.$data.textarea5 = ""
		},
		requirClose(selecInf){//关闭选择需求类型弹窗 清空数据
			this.$refs[selecInf].resetFields()
		},
		onsubmit(selecInf){//选择需求类型提交
			this.$refs[selecInf].validate((valid) => {
				if (valid) {
					this.$confirm("确认增加？",{
						type: 'warning',
						lockScroll:false,
						closeOnClickModal:false
					})
					.then(_=>{
						let temp = ""
						for(let item in this.$data.selecInf){
							if(this.$data.selecInf[item] != ""){
								temp += `&${item}=${this.$data.selecInf[item]}`
							}
						}
						let vm = this
						vm.loading6 = true
						API.backstage( vm.$route.params.id + temp ).then( res =>{
							if(res.data.code == "201"){
								this.requirement = false
								API.investigation(b).then((res) => {
									if(res.code == '200'){
										vm.$data.tableData6 = [res.data];
										vm.loading6 = false
									} else {
										vm.loading6 = false
										vm.msg('error','更新列表失败，请手动刷新。')
									}
								},
								(error) => {
									vm.loading6 = false
									vm.msg('error','服务器错误')
								})
							} else {
								vm.msg('error','操作失败')
							}
						},
						(error) => {
							vm.msg('error','服务器错误')
						})
						this.requirement = false
					})
					.catch(_=>{return})
				} else {
					return false;
				}
			});
		},
		// 上传成功后的回调
		uploadSuccess (response, file, fileList) {
			let vm = this
			vm.getTable5(vm.$route.params.id)
		},
		// 上传错误
		uploadError (response, file, fileList) {
			this.msg('error','上传失败')
		},
		// 选择需求类型 上传成功后的回调
		uploadSuccess2 (response, file, fileList) {
			this.selecInf.id = response.data.id
		},
		// 上传错误
		uploadError2 (response, file, fileList) {
			this.msg('error','上传失败')
		},
		//移除上传文件
		uploadRemove2(file, fileList){
			this.selecInf.id = ""
		},
		fileDelete(row){//删除项目文件
			this.$confirm("确认删除？",{
				type:"warning",
				lockScroll:false,
				closeOnClickModal:false
			})
			.then(_=>{
				let vm = this
				API.deleteProFile(row.id).then(res=>{
					if(res.code == "200"){
						vm.getTable5(vm.$data.aa)
					}else{
						vm.msg('error','操作失败')
					}
				},
				(error) => {
					vm.msg('error','服务器错误')
				})
			})
			.catch(_ => {return})
		},
		getTable5(par){//获取项目文件
			let _this = this
			API.projectfiles(par).then((res) => {
					if(res.code == "200"){
						_this.$data.tableData5 = res.data;
					}
					_this.$data.loading5 = false
				},
				(error)=>{
					_this.$data.loading5 = false
				})
		}
	},
    //接口
	created(){
		let data = JSON.parse(window.sessionStorage.getItem('access-user'));
        this.authorization = data.authorization;
		let _this = this;
		let aa = {
			pageNum:1,
			pageSize:1,
		}
		let a = "";
		let b = this.$route.params.id;
		this.$data.loading = true
		this.$data.loading2 = true
		this.$data.loading3 = true
		this.$data.loading4 = true
		this.$data.loading5 = true
		this.$data.loading6 = true
		API.tobematched4(this.$route.params.id).then((res) => {
			if(res.code == "200" && res.data){
				a = res.data.bePublishId;
				_this.$data.aa = a;
				_this.$data.tableData = [res.data];
				console.log("撮合信息", res)
				API.tobematched5(a).then((res) => {
					if(res.code == "200" && res.data){
						_this.$data.tableData3 = [res.data];
						console.log("企业审核报告1", res)
					}
					_this.$data.loading3 = false
				},
				(error)=>{
					_this.$data.loading3 = false
				})
				_this.getTable5(a)
				API.investigation(b).then((res) => {
					if(res.code == "200"){
						_this.$data.tableData6 = [res.data];
						console.log("调查报告",res)
					}
					_this.$data.loading6 = false
				},
				(error)=>{
					_this.$data.loading6 = false
				})
				API.BusinessReviewReport(b).then((res) => {
					if(res.code == "200"){
						_this.$data.tableData2 = res.data;
						console.log("企业审核报告1。表1", res)
					}
					_this.$data.loading2 = false
				},
				(error)=>{
					_this.$data.loading2 = false
				})	
				API.BusinessReviewReport(a).then((res) => {
					if(res.code == "200"){
						_this.$data.tableData4 = res.data;
						console.log("企业审核报告2", res)
					}
					_this.$data.loading4 = false
				},
				(error)=>{
					_this.$data.loading4 = false
				})
			} else {
				_this.msg('error',"获取列表失败")
				
			}
			_this.$data.loading = false
		},
		(error) => {
			_this.msg('error',"服务器错误")
			_this.$data.loading = false
		});
	},
	computed: {
		headers() {
			return {
				authorization: this.authorization
			}
		}
	},
  }
</script>