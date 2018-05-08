<!--收藏-->
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
					<el-col :span="16" class="middle_right expec" style="padding-left:0px;">
						<div class="grid-content" v-model="basInfo.email">{{basInfo.email}}</div>
					</el-col>
					<el-col :span="8" class="middle_left" style="padding-right:0px;">
						<div class="grid-content">居住地：</div>
					</el-col>
					<el-col :span="16" class="middle_right ">
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
						<div class="grid-content email2"  v-bind:title='title2' v-model="basCompInfo.company_name">{{basCompInfo.company_name}}</div>
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
		<el-dialog :visible.sync="dialogFormVisible" :lock-scroll="false" :close-on-click-modal="false">
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
			<div class="collectTab">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="认证信息" name="authenticationInformation">
						<authenticationInformation></authenticationInformation></el-tab-pane>
					<el-tab-pane label="技能展示" name="primetimeLive">
						<primetimeLive></primetimeLive>
					</el-tab-pane>
					<el-tab-pane label="资金信息" name="fundInformation">
						<fundInformation></fundInformation></el-tab-pane>
					<el-tab-pane label="全部订单" name="completedOrderform">
						<completedOrderform></completedOrderform></el-tab-pane>
					<el-tab-pane label="撮合信息" name="matchInformation">
						<matchInformation></matchInformation></el-tab-pane>
					<el-tab-pane label="收藏" name="collect">
					<collect></collect></el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<script>
    import API from '@/api/api'
    import collect from '@/components/userManagement/userM/collect.vue'
    import matchInformation from '@/components/userManagement/userM/matchInformation.vue'
    import primetimeLive from '@/components/userManagement/userM/primetimeLive.vue'
    import completedOrderform from '@/components/userManagement/userM/completedOrderform.vue'
    import authenticationInformation from '@/components/userManagement/userM/authenticationInformation.vue'
    import fundInformation from '@/components/userManagement/userM/fundInformation.vue'
    export default {
        data () {
            return {
                basInfo: {
                    name: '',
                    username: '',
                    email: '',
                    province: '',
                    city: '',
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
                id: this.$route.params.id,
                activeName: 'matchInformation',
                remnant:0,
                dialogFormVisible: false,
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
        components:{
            "collect":collect,
            "fundInformation":fundInformation,//资金信息
            "authenticationInformation":authenticationInformation,
            "primetimeLive":primetimeLive,
            "completedOrderform":completedOrderform,
            "matchInformation":matchInformation
        },
        methods: {
            handleClick(tab, event) {}
        },
        created: function() {
            let vm = this
	        //个人资料
            API.basicInfo(vm.$route.path.split('/')[4]).then(function (result) {
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
            API.basicCompanyInfo(vm.$route.path.split('/')[4]).then(function (result) {
                if(result.code == 200  && result.data != null){
                    vm.basCompInfo.company_name = result.data.company_name
	                vm.title2 = result.data.company_name
                    vm.basCompInfo.position = result.data.position
                    vm.basCompInfo.trade = result.data.trade
					vm.title3 = result.data.trade
                    vm.basCompInfo.province = result.data.province
                    vm.basCompInfo.city = result.data.city
					vm.title4 = result.data.province + result.data.city
                    vm.basCompInfo.intro = result.data.intro
                }
            });
        }
    }
</script>
<style lang="scss" scope>
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
		height: 840px;
		position:absolute;
		left:444px;
		width:61%;
	}
	.colltaS {
		background: #fff;
		margin-bottom: 50px;
		background: #fff;
		border:1px solid #fff;
	}
	.colltaS .filter {
		width: 50px;
		margin-left: 10px;
		margin-top: 10px;
		position: absolute;
		z-index: 222;
		color: #3388FF;
		font-weight: bold;
		border-bottom: 5px solid #3388FF;
		padding-bottom: 10px;
		text-indent: 10px;
	}
	.colltaS .hrlineT{
		margin-top:42px;
		margin-left:14px;
		position: absolute;
		z-index: 111;
		width: 97%;
	}
	.colltableSt {
		margin-top: 80px;
		width:100%;
	}
	.page {
		float: right;
		background: #fff;
		color: #E34E42;
		margin-top: 10px;
	}
	/*表格隔行换色*/
	.has-gutter tr, .el-table .success-row {
		background: #F3F4F7;
	}
	@media screen and (min-width: 1300px) {
		.boxRight{
			width:75.6% !important;
		}
		.boxRight .collmenu{
			width:99.5%;
		}
		.colltaS{
			width:99%;
		}
		.colltableSt {
			margin:0 auto;
			margin-top: 80px;
			width:98%;
		}
		.colltaS .hrlineT{
			width:97%;
			margin-left:12px;
		}
		.page{
			margin-right:10px;
		}
	}
</style>
<style>
	@media screen and (min-width: 1300px) {
		.boxRight {
			width: 75.6%;
		}
	}
</style>
<style>
	.boxRight .el-tabs__item.is-active {
		color: #409EFF!important;
	}
	.boxRight .el-tabs__item{
		margin-bottom: 2px;
	}
</style>