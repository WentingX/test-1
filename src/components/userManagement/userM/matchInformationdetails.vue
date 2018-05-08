<!--撮合详情-->
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
		<el-dialog :visible.sync="dialogFormVisible" :show-close="false" :lock-scroll="false" :before-close="ai_dialog_close">
			<span  @click="dialogFormVisible = false" style="float:right;margin-top: -50px;font-size:24px;">X</span>
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
			<p class="matchInfofilter">撮合信息</p>
			<hr color="#556191" style="margin-top:42px;margin-left:10px;position: absolute;z-index: 111;width: 98%;"/>
			<el-row :gutter="24" :model="matDetail" class="matchInfomarginTab" style="margin-left:0;margin-right:0;padding-top: 55px;">
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">订单类型：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.typeName">{{matDetail.typeName}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">信息分类：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.infoClassification">
						{{matDetail.infoClassification}}
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="24" class="matchInfomarginTab" style="margin-left:0;margin-right:0;">
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">企业名称：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content email2" v-bind:title='title2' v-model="matDetail.enterpriseName">{{matDetail.enterpriseName}}</div>
				</el-col>
			</el-row>
			<el-row :gutter="24" class="matchInfomarginTab" style="margin-left:0;margin-right:0;">
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">联系人：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.contact">{{matDetail.contact}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">联系电话：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.phone">{{matDetail.phone}}</div>
				</el-col>
			</el-row>
			<el-row :gutter="24" class="matchInfomarginTab" style="margin-left:0;margin-right:0;">
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">标题：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.projectName">{{matDetail.projectName}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">所属行业：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.industry">{{matDetail.industry}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">所在地区：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.province">{{matDetail.province}}{{matDetail.city}}{{matDetail.area}}{{matDetail.address}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">投资行业：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.investmentIndustry">{{matDetail.investmentIndustry}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">投资地区：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.investmentArea">{{matDetail.investmentArea}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">去年营业额：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.lastYearBusinessVolume">{{matDetail.lastYearBusinessVolume}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">当前净资产：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.netAsset">{{matDetail.netAsset}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">投资金额：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.financingVolumeStart">{{matDetail.financingVolumeStart}}~{{matDetail.financingVolumeEnd}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">提供材料：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.material">
						{{matDetail.material}}
					</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">描述内容：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content" v-model="matDetail.description">{{matDetail.description}}</div>
				</el-col>
				<el-col :span="4" class="matchInfofleft">
					<div class="grid-content">附件：</div>
				</el-col>
				<el-col :span="20" class="matchInfofright">
					<div class="grid-content">
						<el-button type="text" v-for="z in zz" class="primebtnStt">&nbsp;{{z.annexList}}&nbsp;,</el-button>
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
                matDetail: {
                    typeName: '',
                    infoClassification: '',
                    enterpriseName: '',
                    contact: '',
                    phone: '',
                    projectName: '',
                    industry: '',
                    province: '',
                    city: '',
                    area: '',
                    address: '',
                    investmentIndustry: '',
                    investmentArea: '',
                    lastYearBusinessVolume: '',
                    netAsset: '',
                    financingVolumeStart: '',
                    financingVolumeEnd: '',
                    material: '',
                    description: ''
                },
                zz: [],
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
        created: function() {
            var parmsss=JSON.parse(window.sessionStorage.getItem("idch") || '[]');
            let vm = this
            let listo = this.zz
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
            //撮合详情
            API.matchDetail(vm.$route.path.split('/')[5]).then(function (result) {
                if(result.code == 200  && result.data != null){
	                vm.matDetail.typeName = result.data.typeName
                    vm.matDetail.infoClassification = result.data.infoClassification
                    vm.matDetail.enterpriseName = result.data.enterpriseName
                    vm.matDetail.contact = result.data.contact
                    vm.matDetail.phone = result.data.phone
                    vm.matDetail.projectName = result.data.projectName
                    vm.matDetail.industry = result.data.industry
                    vm.matDetail.province = result.data.province
                    vm.matDetail.city = result.data.city
                    vm.matDetail.area = result.data.area
                    vm.matDetail.address = result.data.address
                    vm.matDetail.investmentIndustry = result.data.investmentIndustry
                    vm.matDetail.investmentArea = result.data.investmentArea
                    vm.matDetail.lastYearBusinessVolume = result.data.lastYearBusinessVolume
                    vm.matDetail.netAsset = result.data.netAsset
                    vm.matDetail.financingVolumeStart = result.data.financingVolumeStart
                    vm.matDetail.financingVolumeEnd = result.data.financingVolumeEnd
                    vm.matDetail.material = result.data.material
                    vm.matDetail.description = result.data.description
                    result.data.annexList.forEach((i) => {
                        listo.push(i)
                    })
                }
            })
        },
        components: {},
        mounted () {},
        methods: {
            ai_dialog_close(){},
        },
        computed: {},
        watch: {}
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
		background: #fff;
		position:absolute;
		left:444px;
		width:61%;
	}
	.el-menu-item{
		padding: 0px 38px !important;
		min-width: 0px !important;
	}
	.matchInfofilter {
		width: 70px;
		margin-left: 10px;
		margin-top: 10px;
		color: #3388FF;
		font-weight: bold;
		border-bottom: 5px solid #3388FF;
		padding-bottom: 10px;
		position: absolute;
		z-index: 222;
	}
	.matchInfofleft {
		height: 30px;
		text-align: right;
		color: #c0c4cc;
	}
	.matchInfofright {
		height: 30px;
	}
	@media screen and (min-width: 1300px) {
		.boxRight{
			width:75.6% !important;
		}
		.matchInfomarginTab{
			position: relative;
			left:-100px;
		}
	}
</style>
