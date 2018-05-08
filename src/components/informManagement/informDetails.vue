<!--informDetails通知详情-->
<template>
	<div class="detail_info">
		<p class="informhtitle"><em>|</em> 通知详情</p>
		<el-row :gutter="24" style="margin-right:0;padding-top: 30px;">
			<el-col :span="6" class="informfleft">
				<div class="grid-content"></div>
			</el-col>
			<el-col :span="18" class="informfright">
				<div class="grid-content">
					<el-radio  v-model="inform" :label="inform">{{inform}}</el-radio>
				</div>
			</el-col>
			<el-col :span="6" class="informfleft">
				<div class="grid-content">标题：</div>
			</el-col>
			<el-col :span="18" class="informfright">
				<div class="grid-content" v-model="notify_title">
					{{notify_title}}
				</div>
			</el-col>
			<el-col :span="6" class="informfleft informhheight">
				<div class="grid-content">内容：</div>
			</el-col>
			<el-col :span="18" class="informfright informhheight">
				<div class="grid-content" v-model="notify_content">
					{{notify_content}}
				</div>
			</el-col>
			<el-col :span="6" class="informfleft">
				<div class="grid-content">推送角色：</div>
			</el-col>
			<el-col :span="18" class="informfright">
				<div class="grid-content">
					<el-checkbox-group v-model="fbjs" disabled>
						<el-checkbox label="所有用户"></el-checkbox>
						<el-checkbox label="信息方"></el-checkbox>
						<el-checkbox label="接单方"></el-checkbox>
						<el-checkbox label="需求方"></el-checkbox>
					</el-checkbox-group>
				</div>
			</el-col>
			<el-col :span="6" class="informfleft informdheight">
				<div class="grid-content">定时发送：</div>
			</el-col>
			<el-col :span="18" class="informfright informdheight">
				<div class="grid-content">
					{{notify_date}}
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data() {
            return {
                inform: '',
                notify_title: '',
                notify_content: '',
                fbjs: [],
                notify_date: '',
            };
        },
        created (){
            let vm = this
            API.selectByIdAllSystemOrder('?id='+vm.$route.path.split('/')[2]).then(result => {
                if(result.code == 200 && result.data != null){
                    vm.inform = result.data.inform
                    vm.notify_title = result.data.notify_title
                    vm.notify_content = result.data.notify_content
                    vm.fbjs = [result.data.fbjs]
                    vm.notify_date = result.data.notify_date
                }
            })
        },
        components: {},
        mounted() {},
        methods: {

        },
        computed: {}
    }
</script>
<style lang="scss" scope>
	.informhtitle {
		color: #717BA1;
		font-weight: bold;
		margin-top: 0;
		margin-left:10px;
		border-bottom:2px solid #8E95B6;
		padding-bottom:10px;
	}
	.informhtitle .htitle em {
		color: #99C1E4;
		margin-right: 10px;
	}
	.informfleft {
		height: 60px;
		text-align: right;
	}
	.informfright {
		height: 60px;
	}
	.informhheight{
		height:240px;
	}
	.informtextInput{
		width:70% !important;
	}
	.informdheight{
		height:85px;
	}
	.informtextInputt{
		width:30%;
	}
	.informcen .el-button{
		background: #92949A;
		color: white;
		padding: 16px 30px;
	}
	@media screen and (min-width: 1300px) {
		.boxRight{
			width:76%;
		}
	}
</style>