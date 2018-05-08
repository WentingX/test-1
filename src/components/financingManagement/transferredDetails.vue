<!--交易明细详情 待转账-->
<template>
	<div class="detail_info">
		<div class="earnTop">
			<el-row>
				<el-col :span="12">
					<div class="grid-content">
						<p class="title"><em>|</em> 交易详情</p>
					</div>
				</el-col>
				<el-col :span="12" class="trans_right">
					<div class="grid-content">
						<p style="margin-top:0px;">(单位：元)</p>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<div class="grid-content">
						<p class="transmargLeft"><img src="/src/assets/transfer.png" style="margin-right:20px;">待转账</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<hr />
		<div class="earnBottom" v-for="(key,i) in transfData">
			<el-row style="color:#BCBCBC;">
				<el-col :span="8">
					<div class="grid-content">
						<span>交易号：{{transfData[i].order_number}}</span>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content">
						<span>订单号：{{transfData[i].order_number}}</span>
					</div>
				</el-col>
				<el-col :span="8" class="trans_right">
					<div class="grid-content">
						<el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
					</div>
				</el-col>
			</el-row>
			<el-row style="background:#E8F5FE;padding:15px 0px;">
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">用户名</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">真实姓名</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">用户角色</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">身份证号</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">联系电话</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">收款人</div>
				</el-col>
				<hr color="#D9D9D9" style="margin:10px;"/>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">{{transfData[i].username}}</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">{{transfData[i].name}}</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">{{transfData[i].zsType}}</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">{{transfData[i].id_number}}</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">{{transfData[i].telephone}}</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">{{transfData[i].payee}}</div>
				</el-col>
			</el-row>
			<el-row style="background:#E8F5FE;padding:15px 0px;margin-top:20px;">
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">开户行</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">银行账号</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">转账金额</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">转账审批</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">时间</div>
				</el-col>
				<el-col :span="4" class="transpaddBottom">
					<div class="grid-content">转账凭证</div>
				</el-col>
				<hr color="#D9D9D9" style="margin:10px;"/>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">{{transfData[i].bank}}</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">{{transfData[i].account}}</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">￥{{transfData[i].money == null ? 0 : transfData[i].money}}</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content" v-model="voucher">
						<el-button type="text" @click="dialogVisible = true">查看图片</el-button>
					</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">{{transfData[i].update_date}}</div>
				</el-col>
				<el-col :span="4" class="transpaddInfo" style="">
					<div class="grid-content">
						<el-upload action="/api/api/v1/admin/banner/firstPageBannerImages" :headers='headers' list-type="picture"
						           :on-error="handleError" :on-remove="handleRemove" :limit="1" :on-success="handleSuccess">
							<el-button size="small" type="text">选择文件</el-button>
						</el-upload>
						<el-input class="hidden" v-model="url1"></el-input>
					</div>
				</el-col>
			</el-row>
			<!--点击查看 显示图片-->
			<el-dialog title="图片" :visible.sync="dialogVisible" :close-on-click-modal="false" :lock-scroll="false" style="text-align: center;">
				<img :src="voucher" />
			</el-dialog>
		</div>
		<div style="margin:0 auto;text-align:center;margin-top:20px;" class="transbtn">
			<el-button size="mini" class="transbnInput" @click="confDa">确认转账</el-button>
		</div>
	</div>
</template>
<script>
import API from '@/api/api'
export default {
    data() {
        return {
            dialogVisible:false,
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
            update_date: '',
            voucher: '',
            dialogImageUrl:'',//?
            url: '',//上传地址
            authorization: '',
            downloadLoading:false,
            transfData: [],//数据数组
	        a:[],
	        url1: '',
	        url2: '',
        };
    },
    created (){
        let data = JSON.parse(window.sessionStorage.getItem('access-user'));
        this.authorization = data.authorization;

        let vm = this
	    let param = '?id='+ vm.$route.path.split('/')[2]
	    API.earningsAccountById(param).then( result => {
		    if(result.code == "200"){
                vm.transfData = result.data
		    }
	    })
    },
    components: {},
    mounted() {},
    methods: {
        //确认转账
        confDa(){
            if(this.a.length >= this.transfData.length ){
                var inseOrd = confirm("确定此操作吗1111")
                if(inseOrd){
                    let vm = this
                    let parm = '?id='+ vm.$route.path.split('/')[2]+'&voucher='+ this.$data.voucher+'&stateId=1'
                    API.earningsAccountTransferTrue(parm).then( result => {
                        this.$store.commit('delete_tabs', vm.$route.path)//点击提交之后  删除当前窗口
                        this.$router.push({
                            path: `/alreadyTransferred/${vm.$route.path.split('/')[2]}`
                        })
                    })
                }
            }else {
                alert("请选择文件")
            }
        },
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
                const data = this.formatJson(filterVal, this.transfData)//vv
                excel.export_json_to_excel(tHeader, data, '待转账信息表格')
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
        },
	    //删除图片
        handleRemove(file, fileList) {
            // this.url1 = ''
	        file.response.data = ''
            this.url1 = file.response.data
            this.a.length--
        },
	    //上传成功 返回数据信息
        handleSuccess(res) {
            console.log(res)
	        if(res.code == "200" && res.data != null){
                this.voucher = res.data
                this.url1 = res.data
                this.a.length++
	        }
        },
	    //加载提示框
	    msg(type,txt){
            this.$message[type]({
                showClose: true,
                message: txt,
                duration: 2000
            });
	    },
        handleError() {
            this.msg('error','上传失败')
        },
    },
    computed: {
        headers() {
            return {
                authorization: this.authorization
            }
        }
    },
    watch: {}
}
</script>
<style lang="scss" scope>
	/*下载按钮*/
	.filter-item {
		margin-top: 20px;
	}
	/*待转账*/
	.earnTop{
	}
	.earnTop .title {
		font-weight: bold;
		margin-top: 0;
	}
	.earnTop .title em {
		color: #88B7E0;
		margin-right: 10px;
	}
	.trans_right{
		text-align:right;
	}
	.transmargLeft{
		margin:0 0 0 20px;
		font-size:34px;
	}
	.earnBottom{
		margin-top:10px;
		margin-bottom: 120px;
	}
	.transpaddBottom{
		padding-bottom:10px;
		text-align:center;
	}
	@media screen and (max-width:1299px) {
		.transpaddInfo{
			color: #BCBCBC;
			text-align:center;
			word-wrap:break-word;width:162px;height:25px;
		}
	}
	@media screen and (min-width:1300px) {
		.transpaddInfo{
			color: #BCBCBC;
			text-align:center;
			word-wrap:break-word;width:268px;height:25px;
		}
	}
	.transbtn .el-button{
		background: #4A4F63;
		color: white;
		padding: 7px 40px;
	}
	.hidden{
		display: none;
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
	.hidden{
		display: none;
	}
</style>