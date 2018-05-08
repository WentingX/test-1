<template>
	<!--完善订单信息页面-->
	<div class="perfectorde">
		<p class="title"><em>|</em><span>完善订单信息</span></p>
		<hr />
		<el-row :gutter="24">

			<el-form ref="perfectorderform" :model="perfectorderform" label-width="100px">
				<el-col :span="10" style="min-width: 313px;">
					<el-form-item label="订单类型:">
						<el-select style="width:38%;min-width: 72px;">
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
						<el-select style="width:38%;min-width: 72px;">
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="企业名称:">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="联系人:">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="联系电话:">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="所属行业:">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="企业规模:">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="公司地址:">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="描述内容:">
						<el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="上传附件:">
						<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
							<el-button size="small" class="darkbutton">点击上传</el-button>
						</el-upload>
					</el-form-item>
				</el-col>
				<el-col :span="14" style="min-width:313px;">
					<el-form-item label="投资行业:">
						<el-select v-model="perfectorderform.investmentindustry">
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="投资地区:">
						<el-select v-model="perfectorderform.investmentarea">
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="去年营业额:">
						<el-select>
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
						<el-select>
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="当前净资产:">
						<el-select>
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
						<el-select>
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="融资资金:">
						<el-select>
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
						<el-select>
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="人员建议:">
						<el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="期望完成时间:" class="a">
						<el-select>
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
						至
						<el-select>
							<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="投资资金:">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="预计总费用:">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" style="text-align: center;">
					<el-button class="darkbutton" size="medium">提交</el-button>
				</el-col>
			</el-form>
		</el-row>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				perfectorderform: {

				},
			}
		}
	}
</script>

<style scope lang="scss">
	.darkbutton {
		background: #4A4F63 !important;
		color: #fff !important;
	}
	
	.title {
		color: #858DAD;
		font-weight: bold;
		margin-top: 0;
		font-size: 16px;
		em {
			color: #556191;
			margin-right: 10px;
		}
		span {
			vertical-align: middle;
		}
		hr {
			height: 2px;
			background-color: #556191;
			margin-bottom: 18px;
		}
	}
	
	hr {
		height: 2px;
		background-color: #556191;
	}
	
	.el-select__caret.el-icon-arrow-up {
		color: #999;
	}
	
	.el-icon-arrow-up:before {
		content: "\E60C";
	}
	
	.el-input__icon.el-icon-arrow-down:before {
		content: "\E60B";
		color: #999;
	}
	
	.el-input__prefix {
		right: 5px;
		left: inherit;
		.el-input__icon.el-icon-time:before {
			content: "\E60B";
			color: #999;
		}
	}
	
	.el-textarea__inner,
	.el-input__inner {
		border-radius: 0;
	}
</style>
<style type="text/css">
	.content-wrap .content-vi {
		min-width: 350px;
		overflow: scroll !important;
	}
	
	.el-select {
		display: inline-block;
		width: 44%;
	}
	
	#app .content-wrap {
		height: 100% !important;
	}
</style>