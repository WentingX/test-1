<!--认证信息-->
<template>
	<div style="clear:both;">
			<el-tabs v-model="activeName" @tab-click="handleClick" class="authtabchanGe">
				<el-tab-pane label="个人实名认证" name="first" :model="idCard">
					<div v-if="isShow">
						<el-row :gutter="24" style="margin-right: 0px;margin-left:-75px;" class="authtabp">
							<el-col :span="6" class="authfleft">
								<div class="grid-content">真实姓名：</div>
							</el-col>
							<el-col :span="18" class="authfright">
								<div class="grid-content" v-model="idCard.name">{{idCard.name}}</div>
							</el-col>
							<el-col :span="6" class="authfleft">
								<div class="grid-content">身份证号：</div>
							</el-col>
							<el-col :span="18" class="authfright">
								<div class="grid-content" v-model="idCard.id_card_num">{{idCard.id_card_num}}</div>
							</el-col>
							<el-col :span="6" class="authfleft authhheight authlcolor">
								<div class="grid-content"><span>*</span>手持身份证：</div>
							</el-col>
							<el-col :span="18" class="authfright authhheight">
								<div class="grid-content">
									<el-button type="text" class="authbtnSt" @click="dialogVisible = true">查看图片</el-button>
								</div>
							</el-col>
						</el-row>
						<!--点击查看 显示图片-->
						<el-dialog title="图片" :visible.sync="dialogVisible" :close-on-click-modal="false" :lock-scroll="false" style="text-align: center;">
							<img :src="hand_held_img" />
						</el-dialog>
						<el-row :gutter="24" style="margin-right: 0px;margin-left:-75px;" class="authtabp">
							<el-col :span="6" class="authfleft authhheight authlcolor">
								<div class="grid-content"><span>*</span>身份证正面：</div>
							</el-col>
							<el-col :span="18" class="authfright authhheight">
								<div class="grid-content">
									<el-button type="text" class="authbtnSt" @click="dialogVisible2 = true">查看图片</el-button>
								</div>
							</el-col>
						</el-row>
						<!--点击查看 显示图片-->
						<el-dialog title="图片" :visible.sync="dialogVisible2" :close-on-click-modal="false" :lock-scroll="false" style="text-align: center;z-index:5000;">
							<img :src="front_img" />
						</el-dialog>
						<el-row :gutter="24" style="margin-right: 0px;margin-left:-75px;" class="authtabp">
							<el-col :span="6" class="authfleft authhheight authlcolor">
								<div class="grid-content"><span>*</span>身份证反面：</div>
							</el-col>
							<el-col :span="18" class="authfright authhheight">
								<div class="grid-content">
									<el-button type="text" class="authbtnSt" @click="dialogVisible3 = true">查看图片</el-button>
								</div>
							</el-col>
							<!--点击查看 显示图片-->
							<el-dialog title="图片" :visible.sync="dialogVisible3" :close-on-click-modal="false" :lock-scroll="false" style="text-align: center;z-index:5000;">
								<img :src="back_img" />
							</el-dialog>
						</el-row>
					</div>
					<div v-else v-model="fail">
						{{fail}}
					</div>
				</el-tab-pane>
				<el-tab-pane label="企业实名认证" name="second" :model="compAuth">
					<div v-if="isShow2">
						<el-row :gutter="24" style="margin-right: 0px;margin-left:-75px;" class="authtabe">
							<el-col :span="6" class="authfleft">
								<div class="grid-content">企业名称：</div>
							</el-col>
							<el-col :span="18" class="authfright">
								<div class="grid-content" v-model="compAuth.company_name">{{compAuth.company_name}}</div>
							</el-col>
							<el-col :span="6" class="authfleft">
								<div class="grid-content">注册地址：</div>
							</el-col>
							<el-col :span="18" class="authfright">
								<div class="grid-content" v-model="compAuth.address">{{compAuth.address}}</div>
							</el-col>
							<el-col :span="6" class="authfleft">
								<div class="grid-content">营业执照注册号：</div>
							</el-col>
							<el-col :span="18" class="authfright">
								<div class="grid-content" v-model="compAuth.business_license_num">{{compAuth.business_license_num}}</div>
							</el-col>
							<el-col :span="6" class="authfleft">
								<div class="grid-content">营业期限：</div>
							</el-col>
							<el-col :span="18" class="authfright">
								<div class="grid-content" v-model="compAuth.start_time">{{compAuth.start_time}}~~{{compAuth.end_time}}</div>
							</el-col>
							<el-col :span="6" class="authfleft authhheight">
								<div class="grid-content">营业执照照片：</div>
							</el-col>
							<el-col :span="18" class="authfright authhheight">
								<div class="grid-content">
									<el-button type="text" class="authbtnSt" @click="dialogVisible4 = true">查看图片</el-button>
								</div>
							</el-col>
						</el-row>
						<!--点击查看 显示图片-->
						<el-dialog title="图片" :visible.sync="dialogVisible4" style="text-align: center;" :close-on-click-modal="false" :lock-scroll="false">
							<img :src="business_license_img" />
						</el-dialog>
					</div>
					<div v-else v-model="fail2">
						{{fail2}}
					</div>
				</el-tab-pane>
			</el-tabs>
	</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data () {
            return {
                dialogVisible:false,
                dialogVisible2:false,
                dialogVisible3:false,
                dialogVisible4:false,
                activeName: 'first',
                idCard: {
                    name: '',
                    id_card_num: ''
                },
                hand_held_img: '',
                front_img: '',
                back_img: '',
                compAuth: {
                    company_name: '',
                    address: '',
                    business_license_num: '',
                    start_time: '',
                    end_time: ''
                },
                business_license_img: '',
                isShow: false,//个人是否验证通过
                fail:'',
                isShow2: false,//企业是否验证通过
                fail2:''
            }
        },
        created: function() {
            let vm = this
	        //个人认证
            API.idCardAuth(vm.$route.path.split('/')[4]).then(function (result) {
                if (result.code == 200 && result.data != null) {
	                //null 暂无数据  有一个为-1 认证失败 全部为1 展示
                    if(result.data.back_status && result.data.card_status && result.data.front_status
                        && result.data.hand_status && result.data.name_status == "1"){
                        vm.isShow = true
                        vm.idCard.name = result.data.name
                        vm.idCard.id_card_num = result.data.id_card_num
                        vm.hand_held_img = result.data.hand_held_img
                        vm.front_img = result.data.front_img
                        vm.back_img = result.data.back_img
	                }else if(result.data.back_status || result.data.card_status || result.data.front_status
                        || result.data.hand_status || result.data.name_status == "-1"){
                        vm.isShow = false
	                    vm.fail = "认证失败"
                    }
                }else if(result.code == 200 && result.data == null){
                    vm.isShow = false
	                vm.fail = "暂无数据"
                }
            });
            //企业认证
            API.companyAuth(vm.$route.path.split('/')[4]).then(function (result) {
                if (result.code == 200 && result.data != null) {
	                if(result.data.address_status && result.data.img_status && result.data.name_status
                        && result.data.num_status && result.data.time_status == "1"){
                        vm.isShow2 = true
                        vm.compAuth.company_name = result.data.company_name
                        vm.compAuth.address = result.data.address
                        vm.compAuth.business_license_num = result.data.business_license_num
                        vm.compAuth.start_time = result.data.start_time
                        vm.compAuth.end_time = result.data.end_time
                        vm.business_license_img = result.data.business_license_img
	                }else if(result.data.address_status || result.data.img_status || result.data.name_status
                        || result.data.num_status || result.data.time_status == "-1"){
                        vm.isShow2 = false
                        vm.fail2 = "认证失败"
                    }
                }else if(result.code == 200 && result.data == null){
                    vm.isShow2 = false
                    vm.fail2 = "暂无数据"
                }
            })
        },
        components: {},
        mounted () {},
        methods: {
            handleClick(tab, event) {
            }
        },
        computed: {},
        watch: {}
    }
</script>
<style scoped>
	/*右侧主体部分*/
	.authtabchanGe{
		margin-left:20px;
	}
	.authtabp,.authtabe{
		margin-left:-75px;
	}
	.authfleft {
		height: 30px;
		text-align: right;
	}
	.authfright {
		height: 30px;
	}
	.authlcolor{
		color: #AAAAAA;
	}
	.authlcolor span{
		color: #FFB871;
	}
	.authhheight{
		height:240px;
	}
	.authpColor{
		background:#333333;
		width:200px;
		height:200px;
		margin: 0px;
	}
	.authbtnSt{
		color: #3388FF;
		margin-left: 65px;
	}
	@media screen and (min-width: 1300px) {
		.boxRight{
			width:74%;
		}
		.authtabp{
			position: relative;
			left:-155px;
		}
		.authtabe{
			position: relative;
			left: -120px;
		}
	}
</style>
<style>
	/*处理tab标签切换的样式*/
	.authtabchanGe .el-tabs__header .el-tabs__item.is-active {
		background: transparent;
		color: #409EFF;
	}
	.authtabchanGe .el-tabs__header .el-tabs__item.is-active:hover {
		color: #409EFF;
	}
	.authtabchanGe .el-tabs__header .el-tabs__item {
		color: #373d41;
	}
	.authtabchanGe .el-tabs__header .el-tabs__item:hover {
		color: #409EFF;
	}
	.authtabchanGe .el-tabs__content{
		display: block;
	}
	@media screen and (min-width: 1300px) {
		.authtabchanGe{
			margin-left:10px;
		}
	}
</style>