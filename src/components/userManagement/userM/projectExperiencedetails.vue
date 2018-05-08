<!--项目经验详情-->
<template>
	<div style="clear:both;">
		<div class="boxLeft">
			<div class="boxLeft_top">
				<p class="title"><em>|</em> 用户列表</p>
				<img :src="headPortrait" class="bgColor" alt="暂无图片"/>
			</div>
			<div class="boxLeft_middle">
				<p>个人资料</p>
				<el-row :gutter="24" :model="basInfo">
					<el-col :span="8" class="middle_left">
						<div class="grid-content">姓名：</div>
					</el-col>
					<el-col :span="16" class="middle_right">
						<div class="grid-content" v-model="basInfo.name">{{basInfo.name}}</div>
					</el-col>
					<el-col :span="8" class="middle_left">
						<div class="grid-content">手机：</div>
					</el-col>
					<el-col :span="16" class="middle_right">
						<div class="grid-content" v-model="basInfo.username">{{basInfo.username}}</div>
					</el-col>
					<el-col :span="8" class="middle_left expec">
						<div class="grid-content">邮箱：</div>
					</el-col>
					<el-col :span="16" class="middle_right expec">
						<div class="grid-content" v-model="basInfo.email">{{basInfo.email}}</div>
					</el-col>
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">居住地：</div>
					</el-col>
					<el-col :span="16" class="middle_right">
						<div class="grid-content email2" v-bind:title='title1' v-model="basInfo.province">{{basInfo.province}}{{basInfo.city}}</div>
					</el-col><!--下面三个没数据-->
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">信用：</div>
					</el-col>
					<el-col :span="16" class="middle_right">
						<div class="grid-content">黄金用户</div>
					</el-col>
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">积分：</div>
					</el-col>
					<el-col :span="16" class="middle_right">
						<div class="grid-content">2000分</div>
					</el-col>
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">账户：</div>
					</el-col>
					<el-col :span="16" class="middle_right">
						<div class="grid-content">500.00元</div>
					</el-col>
				</el-row>
			</div>
			<div class="boxLeft_bottom">
				<p class="info">企业资料</p>
				<el-row :gutter="24" :model="basCompInfo">
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">企业名称：</div>
					</el-col>
					<el-col :span="16" class="middle_right" style="padding-left:0px;">
						<div class="grid-content email2" v-bind:title='title2' v-model="basCompInfo.company_name">{{basCompInfo.company_name}}</div>
					</el-col>
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">职位：</div>
					</el-col>
					<el-col :span="16" class="middle_right" style="padding-left:0px;">
						<div class="grid-content" v-model="basCompInfo.position">{{basCompInfo.position}}</div>
					</el-col>
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">所属行业：</div>
					</el-col>
					<el-col :span="16" class="middle_right" style="padding-left:0px;">
						<div class="grid-content email2" v-bind:title='title3' v-model="basCompInfo.trade">{{basCompInfo.trade}}</div>
					</el-col>
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">所在地区：</div>
					</el-col>
					<el-col :span="16" class="middle_right" style="padding-left:0px;">
						<div class="grid-content email2" v-bind:title='title4' v-model="basCompInfo.city">{{basCompInfo.province}}{{basCompInfo.city}}</div>
					</el-col>
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">公司简介：</div>
					</el-col>
					<el-col :span="16" class="middle_right" style="padding-left:0px;">
						<div class="grid-content" v-model="basCompInfo.intro">
							<el-button type="text" @click="dialogFormVisible = true" style="padding:0px;">简介详情</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<!--公司简介弹框-->
		<el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" :lock-scroll="false">
			<el-form :model="form">
				<el-form-item label="公司简介" :label-width="formLabelWidth">
					<p>{{basCompInfo.intro}}</p>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<div class="boxRight">
			<p class="projectfilter">项目经验</p>
			<el-row :gutter="24" style="margin-left:0px;margin-right:0;padding-top: 55px;">
				<el-col :span="6" class="projectfleft">
					<div class="grid-content">项目名称：</div>
				</el-col>
				<el-col :span="18" class="projectfright">
					<div class="grid-content" v-model="projecName">{{projecName}}</div>
				</el-col>
				<el-col :span="6" class="projectfleft">
					<div class="grid-content">项目类型：</div>
				</el-col>
				<el-col :span="18" class="projectfright">
					<div class="grid-content" v-model="type">{{type}}</div>
				</el-col>
				<el-col :span="6" class="projectfleft">
					<div class="grid-content">项目时间：</div>
				</el-col>
				<el-col :span="18" class="projectfright">
					<div class="grid-content" v-model="startTime">{{startTime}}~~{{endTime}}</div>
				</el-col>
				<el-col :span="6" class="projectfleft">
					<div class="grid-content">所属行业：</div>
				</el-col>
				<el-col :span="18" class="projectfright">
					<div class="grid-content" v-model="trade">{{trade}}</div>
				</el-col>
				<el-col :span="6" class="projectfleft projecthheight">
					<div class="grid-content">项目描述：</div>
				</el-col>
				<el-col :span="18" class="projectfright projecthheight">
					<div class="grid-content" v-model="described">{{described}}</div>
				</el-col>
				<el-col :span="6" class="projectfleft projecthheight">
					<div class="grid-content">我的职责：</div>
				</el-col>
				<el-col :span="18" class="projectfright projecthheight">
					<div class="grid-content" v-model="duty">{{duty}}</div>
				</el-col>
				<el-col :span="6" class="projectfleft projecthheight">
					<div class="grid-content">附件：</div>
				</el-col>
				<el-col :span="18" class="projectfright projecthheight">
					<div class="grid-content">
						<span v-for="e in ee">&nbsp;{{e.annexList}}&nbsp;,</span>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data () {
            return {
                basInfo: {
                    name: '',
                    username: '',
                    email: '',
                    province: '',
                    city: ''
                },
                headPortrait: '',//个人头像
                basCompInfo: {
                    company_name: '',
                    position: '',
                    trade: '',
                    province: '',
                    city: '',
                    intro: ''
                },
                projecName: '',
                type: '',
                startTime: '',
                endTime: '',
                trade: '',
                described: '',
                duty: '',
                annexList: '',
                ee: [],
                dialogFormVisible: false,//弹框
                form: {
                    desc: ''
                },
                formLabelWidth: '120px',
                title1: '',//个人资料 居住地
                title2: '',//企业资料 企业名称
                title3: '',//企业资料 所属行业
                title4: '',//企业资料 所在地区
            }
        },
        created: function() {
            var parmsss=JSON.parse(window.sessionStorage.getItem("idjn") || '[]');
            let list = this.ee
            let vm = this
	        //个人资料
            API.basicInfo(parmsss).then(function(result) {
                if (result.code == 200  && result.data != null) {
                    vm.basInfo.name = result.data.name
                    vm.basInfo.username = result.data.username
                    vm.basInfo.email = result.data.email
                    vm.basInfo.province = result.data.province
                    vm.basInfo.city = result.data.city
                    vm.headPortrait = result.data.headPortrait//个人头像
                    vm.title1 = result.data.province + result.data.city
                }
            });
            //企业资料
            API.basicCompanyInfo(parmsss).then(function(result) {
                if(result.code == 200  && result.data != null){
                    vm.basCompInfo.company_name = result.data.company_name
                    vm.title2 = result.data.company_name
                    vm.basCompInfo.position = result.data.position
                    vm.basCompInfo.trade = result.data.trade
                    vm.basCompInfo.province = result.data.province
                    vm.basCompInfo.city = result.data.city
                    vm.basCompInfo.intro = result.data.intro
                    vm.title2 = result.data.company_name
                    vm.title3 = result.data.trade
                    vm.title4 = result.data.province + result.data.city
                }
            });
            //经验详情
            API.experience(vm.$route.path.split('/')[5]).then(function(result) {
                if (result.code == 200  && result.data != null) {
                    vm.projecName = result.data.projecName
                    vm.type = result.data.type
                    vm.startTime = result.data.startTime
                    vm.endTime = result.data.endTime
                    vm.trade = result.data.trade
                    vm.described = result.data.described
                    vm.duty = result.data.duty
                    result.data.annexList.forEach((i) => {
                        list.push(i)
                    })
                }
            })
        },
        components: {},
        mounted () {},
        methods: {},
        computed: {},
        watch: {}
    }
</script>
<style scoped>
	.boxLeft {
		margin-right: 10px;
		height: 1000px !important;
		position:absolute;
		padding-left: 0px !important;
		padding-right: 0px !important;
		left:202px !important;
	}
	.boxLeft_top {
		padding-top: 10px;
		width: 233px !important;
		height: 195px;
		background: #fff;
	}
	.title {
		color: #858DAD;
		font-weight: bold;
		margin-top: 0px;
		margin-bottom: 0px;

		padding-left:10px;
	}
	.title em {
		color: #88B7E0;
		margin-right: 10px;
	}
	.bgColor {
		background: transparent !important;
		width: 200px;
		height: 160px;
		margin-top: 5px;

		margin-left: 12px;
		display: block;
		line-height: 160px;
		text-align:center;
		border:1px solid red;
	}
	/*公司名称*/
	.email2{
		width: 130px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.boxLeft_middle .middle_left,
	.boxLeft_middle .middle_right{
		height:35px;
	}
	.boxLeft_bottom .middle_left,
	.boxLeft_bottom .middle_right{
		height:60px;
	}

	.boxLeft_middle, .boxLeft_bottom {
		margin-top: 10px;
		margin-bottom: 10px;
		padding: 10px 0;
		background: #fff;
	}
	.boxLeft_middle{
		width: 233px !important;
		height: 275px !important;
	}
	.boxLeft_bottom {
		width: 233px !important;
		height: 300px !important;
	}
	.boxLeft_middle p, .boxLeft_bottom .info {
		color: #858DAD;
		font-weight: bold;
		margin-top: 0px;
		padding-bottom: 10px;
		border-bottom: 1px solid #556191;
	}
	.middle_left {
		padding-right: 0px;
		height: 25px;
	}
	.middle_right {
		padding-left: 0px;
		height: 25px;
	}
	/*右侧主体部分*/
	.boxRight {
		background: #fff;
		position:absolute;
		left:444px;
		width:61%;
	}
	.projectfilter {
		width: 90%;
		margin-left: 30px;
		margin-top: 10px;
		color: #3388FF;
		font-weight: bold;
		border-bottom: 1px solid #EFEFEF;
		padding-bottom: 10px;
		position: absolute;
		z-index: 222;
	}
	.projectfleft {
		height: 40px;
		text-align: right;
		color: #c0c4cc;
	}
	.projectfright {
		height: 40px;
	}
	.projectfright .el-input{
		width:60%;
	}
	.projecthheight{
		height:110px;
	}
	.projecttextareaSt{
		width:75%;
	}
	.projectupload-demo{
		width:25%;
	}
	.projectel-upload__tip{
		width:300px;
	}
	.projectcen .el-button{
		background: #4A4F63;
		color: white;
		padding: 7px 20px;
		margin-top:20px;
	}
	@media screen and (min-width: 1300px) {
		.boxRight{
			width:75.6% !important;
		}
		.projectfilter{
			margin-left:60px;
		}
	}
</style>
<style>
	.projecthheight .el-textarea__inner{
		resize:none;
	}
</style>