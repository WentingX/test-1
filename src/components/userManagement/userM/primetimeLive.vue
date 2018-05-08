<!--技能展示-->
<template>
	<div style="clear:both;">
		<div class="primetime">
			<el-row :gutter="24" style="margin-left:60px;margin-right:0;padding-top: 30px;" class="primemargiTab">
				<el-col :span="6" class="primefleft">
					<div class="grid-content">擅长的工作类型：</div>
				</el-col>
				<el-col :span="18" class="primefright">
					<div class="grid-content" v-model="type">{{type}}</div>
				</el-col>
				<el-col :span="6" class="primefleft">
					<div class="grid-content">擅长的技能：</div>
				</el-col>
				<el-col :span="18" class="primefright">
					<div class="grid-content" v-model="demonstration">{{demonstration}}</div>
				</el-col>
				<el-col :span="6" class="primefleft">
					<div class="grid-content">擅长的行业/领域：</div>
				</el-col>
				<el-col :span="18" class="primefright">
					<div class="grid-content" v-model="trade">{{trade}}</div>
				</el-col>
				<el-col :span="6" class="primefleft">
					<div class="grid-content">个人资质：</div>
				</el-col>
				<el-col :span="18" class="primefright">
					<div class="grid-content"><span v-for="j in yy">&nbsp;{{j.naturalName}}&nbsp;</span></div>
				</el-col>
			</el-row>
			<el-row v-for="j in yy" style="margin-left:45px;" class="primemargiTab">
				<el-col :span="6" class="primefleft">
					<div class="grid-content">{{j.naturalName}}证书名称：</div>
				</el-col>
				<el-col :span="18" class="primefright primePadd">
					<div class="grid-content">{{j.certificateName}}</div>
				</el-col>
				<el-col :span="6" class="primefleft primehheight">
					<div class="grid-content">{{j.naturalName}}证书编号：</div>
				</el-col>
				<el-col :span="18" class="primefright primePadd primehheight">
					<div class="grid-content" >
						{{j.certificateNumber}}<br/>
						<el-button type="text" @click="dialogVisible = true">查看图片</el-button>
					</div>
				</el-col>
			</el-row>
			<!--点击查看 显示图片-->
			<el-dialog title="图片" style="text-align: center;" :visible.sync="dialogVisible" :lock-scroll="false" :close-on-click-modal="false">
				<img :src="image" />
			</el-dialog>
			<el-row style="margin-left:45px;" class="primemargiTab">
				<el-col :span="6" class="primefleft">
					<div class="grid-content">项目经验：</div>
				</el-col>
				<el-col :span="18" class="primefright primePadd">
					<div class="grid-content">
						<el-button type="text" v-for="z in zz" @click="experinfo(z)" class="primebtnStt">&nbsp;
							{{z.projecName}}&nbsp;
						</el-button>
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
                dialogVisible:false,
                type: '',
                demonstration: '',
                trade: '',
                naturalName: '',
                certificateName: '',
                certificateNumber: '',
                image: '',
                projecName: '',
	            yy: [],
	            zz: [],
	            cs: '',
                isA: true
            }
        },
        components:{},
        created: function() {
            let list = this.yy
            let listo = this.zz
            let vm = this
	        //个人能力
	        API.ability(vm.$route.path.split('/')[4]).then(function(result) {
                if(result.code == 200  && result.data != null){
                    vm.type = result.data.type
					vm.demonstration = result.data.demonstration
	                vm.trade = result.data.trade
                }
            });
            //擅长能力
            API.natural(vm.$route.path.split('/')[4]).then(function(result) {
                if(result.code == 200 && result.data != null){
                    result.data.forEach((i) => {
                        list.push(i)
	                    vm.image = i.image
                    })
                }
            });
            //项目经验
            API.experiences(vm.$route.path.split('/')[4]).then(function(result) {
                if(result.code == 200 && result.data != null){
                    result.data.forEach((i) => {
                        listo.push(i)
                    })
                }
            })
        },
        mounted () {},
        methods: {
	        //点击某个项目经验进入详情页
            experinfo (z){
                sessionStorage.setItem("idjn",JSON.stringify(this.$route.path.split('/')[4]));

                this.$store.commit('save_detail_info3', z)
                this.$router.push({
                    path: `/projectExperiencedetails/mone/mtwo/mthree/${z.id}`
                })
            }
        },
        computed: {},
        watch: {}
    }
</script>
<style>
	.primetime{
		height:700px;
		overflow-y: scroll;
	}
</style>
<style lang="scss" scope>
	.boxLeft {
		margin-right: 10px;
		padding-left: 10px;
		padding-right: 10px;
		position:absolute;
		left:220px;
	}
	.boxLeft_top {
		padding-top: 10px;
		width: 200px;
		height: 195px;
		background: #fff;
	}
	.title {
		color: #858DAD;
		font-weight: bold;
		margin-top: 0px;
		margin-bottom: 0px;
	}
	.title em {
		color: #88B7E0;
		margin-right: 10px;
	}
	.bgColor {
		background: #8F82BC;
		width: 200px;
		height: 160px;
		margin-top: 5px;
	}

	.boxLeft_bottom .middle_left,
	.boxLeft_bottom .middle_right{
		height:60px;
	}

	.boxLeft_middle, .boxLeft_bottom {
		width: 200px;
		height: 210px;
		margin-top: 10px;
		margin-bottom: 10px;
		padding: 10px 0;
		background: #fff;
	}
	.boxLeft_bottom {
		height: 180px;
	}
	.boxLeft_middle p, .boxLeft_bottom .info {
		color: #858DAD;
		font-weight: bold;
		margin-top: 0px;
		padding-bottom: 10px;
		border-bottom: 1px solid #556191;
	}
	.detail {
		margin-top: 0px;
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
	.primefleft {
		height: 30px;
		text-align: right;
	}
	.primefright {
		height: 30px;
	}
	.primehheight{
		height:240px;
	}
	.primepColor{
		background:#333333;
		width:200px;
		height:200px;
	}
	.primebtnSt {
		padding:0px;
		color:#333333;
	}
	.primebtnStt{
		color: #3388FF;
		padding:0px;
		padding-top:2px;
	}
	.primePadd{
		padding-left:25px;
	}
	@media screen and (min-width: 1300px) {
		.boxRight{
			width:74%;
		}
		.primemargiTab{
			position: relative;
			left: -150px;
		}
	}
</style>