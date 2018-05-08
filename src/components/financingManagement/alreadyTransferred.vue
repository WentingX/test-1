<!--已转账详情-->
<template>
	<div class="detail_info">
		<div class="alreadyTop">
			<el-row>
				<el-col :span="12">
					<div class="grid-content">
						<p class="title"><em>|</em> 交易详情</p>
					</div>
				</el-col>
				<el-col :span="12" class="already_right">
					<div class="grid-content">
						<p style="margin-top:0px;">(单位：元)</p>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<div class="grid-content">
						<p class="alreadymargLeft"><img src="/src/assets/already.png" style="margin-right:20px;">已转账</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<hr />
		<div class="alreadyBottom" v-for="(key,i) in aleadyData">
			<el-row style="color:#BCBCBC;">
				<el-col :span="8">
					<div class="grid-content">
						<span>交易号：{{aleadyData[i].order_number}}</span>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content">
						<span >订单号：{{aleadyData[i].order_number}}</span>
					</div>
				</el-col>
				<el-col :span="8" class="already_right">
					<div class="grid-content">
						<el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
					</div>
				</el-col>
			</el-row>
			<el-row style="background:#E8F5FE;padding:15px 0px;">
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">用户名</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">真实姓名</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">用户角色</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">身份证号</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">联系电话</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">收款人</div>
				</el-col>
				<hr color="#D9D9D9" style="margin:10px;"/>
				<el-col :span="4" class="alreadypaddInfo">
					<div class="grid-content" style="">{{aleadyData[i].username}}</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content" >{{aleadyData[i].name}}</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content" >{{aleadyData[i].zsType}}</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content" >{{aleadyData[i].id_number}}</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content" >{{aleadyData[i].telephone}}</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content" >{{aleadyData[i].payee}}</div>
				</el-col>
			</el-row>
			<el-row style="background:#E8F5FE;padding:15px 0px;margin-top:20px;">
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">开户行</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">银行账号</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">转账金额</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">转账审批</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">时间</div>
				</el-col>
				<el-col :span="4" class="alreadypaddBottom">
					<div class="grid-content">转账凭证</div>
				</el-col>
				<hr color="#D9D9D9" style="margin:10px;"/>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content">{{aleadyData[i].bank}}</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content" >{{aleadyData[i].account}}</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content">{{aleadyData[i].money}}</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content" v-model="voucher">
						<el-button type="text" @click="dialogVisible = true">查看图片</el-button>
					</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content">{{aleadyData[i].update_date}}</div>
				</el-col>
				<el-col :span="4" class="alreadypaddInfo" style="">
					<div class="grid-content">
						<el-button type="text" @click="dialogVisible = true">查看图片</el-button>
					</div>
				</el-col>
			</el-row>
			<!--点击查看 显示图片 同一个字段-->
			<el-dialog title="图片" :visible.sync="dialogVisible" :close-on-click-modal="false" :lock-scroll="false" style="text-align: center;">
				<img :src="voucher" />
			</el-dialog>
		</div>
	</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data() {
            return {
                dialogVisible:false,
                imgdialogsrc:'',
                order_number: '',
                username: '',
                name: '',
                zsType: '',
                id_number: '',
                telephone: '',
                payee: '',
                bank: '',
                account: '',
                money: '',
	            // url: '',
                update_date: '',
                voucher: '',
                downloadLoading:false,
                aleadyData: []
            };
        },
        created (){
            let vm = this
            let param = '?id='+ vm.$route.path.split('/')[2]
            API.earningsAccountById(param).then( result => {
	            if(result.code == "200"){
                    vm.aleadyData = result.data
	            }
            })
        },
        components: {},
        mounted() {},
        methods: {
            //导出Excel表格
            handleDownload() {
                this.downloadLoading = true
                import ('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['用户名', '真实姓名', '用户角色', '身份证号', '联系电话', '收款人','开户行','银行账号','转账金额','转账审批','时间','转账凭证']
                    const filterVal = ['username', 'name', 'zsType', 'id_number', 'telephone', 'payee','bank','account','money','voucher','update_date','url']
                    let vv = [
                        {
                            username:this.username,
                            name: this.name,
                            zsType:this.zsType,
                            id_number:this.id_number,
                            telephone:this.telephone,
                            payee:this.payee,
                            bank:this.bank,
                            account:this.account,
                            money:this.money,
                            voucher:this.voucher,
                            update_date:this.update_date,
                            url:this.url//?
                        }
                    ]
                    const data = this.formatJson(filterVal, this.aleadyData)//vv
                    excel.export_json_to_excel(tHeader, data, '已转账信息表格')
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
        },
        computed: {},
        watch: {}
    }
</script>
<style lang="scss" scope>
	/*下载按钮*/
	.filter-item {
		margin-top: 20px;
	}
	.alreadyTop{
	}
	.alreadyTop .title {
		font-weight: bold;
		margin-top: 0;
	}
	.alreadyTop .title em {
		color: #88B7E0;
		margin-right: 10px;
	}
	.already_right{
		text-align:right;
	}
	.alreadymargLeft{
		margin:0 0 0 20px;
		font-size:34px;
	}
	.alreadyBottom{
		margin-top:10px;
	}
	.alreadypaddBottom{
		padding-bottom:10px;
		text-align:center;
	}
	@media screen and (max-width:1299px) {
		.alreadypaddInfo{
			color: #BCBCBC;
			text-align:center;
			/*word-wrap:break-word;width:162px;height:25px;*/
		}
	}
	@media screen and (min-width:1300px) {
		.alreadypaddInfo{
			color: #BCBCBC;
			text-align:center;
			/*word-wrap:break-word;width:268px;height:25px;*/
		}
	}
	.bnInput, .bnInput:hover,.bnInput:active {
		background: #4A4F63;
		color: white;
		padding: 7px 40px;
	}
	//中间的分割线
	hr{
		height: 10px;
		background: #f3f4f7;
		border: none;
		margin-left: -35px;
		margin-right: -35px;
		margin-top: 20px;
	}
</style>