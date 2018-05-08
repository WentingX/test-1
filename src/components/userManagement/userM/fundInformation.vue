<!--资金信息 fundInformation-->
<template>
	<div style="clear:both;">
		<div class="fundtaS">
			<p class="filter">资金信息</p>
			<hr color="#556191" class="hrlineT"/>
			<el-table :data="tableData" v-loading="loading" class="fundtableSt" :row-class-name="tableRowClassName">
				<el-table-column property="time" label="创建时间" align="center"></el-table-column>
				<el-table-column property="tradeNumber" label="资金交易号" align="center"></el-table-column>
				<el-table-column property="money" label="金额" align="center"></el-table-column>
				<el-table-column property="status" label="状态" align="center"></el-table-column>
				<el-table-column property="orderType" label="类型" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="text" class="fundview"
						           @click="onBtnDetailClick(scope.row)" property="id">明细
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page block">
				<el-pagination background layout="prev, pager, next"  :page-size="10" :total="total" @current-change="yy"></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data () {
            return {
                tableData: [],
                currentRow: null,
                total: 0,
                pageNum: 1,

                remnant: 0,
                dialogFormVisible: false,
                form: {
                    desc: '',
                    intro:''
                },
                formLabelWidth: '120px',
                detai:false,//操作权限
                loading: true,
            }
        },
        created () {
            //操作权限
            let menu = JSON.parse(window.sessionStorage.getItem('menu'))
            menu.forEach((item)=>{
                if(item.name == '用户管理'){
                    item.children.forEach((item)=>{
                        if(item.path == this.$route.path){
                            item.operations.forEach((item)=>{
                                if(item.operationName == '明细'){
                                    this.detai = true
                                }
                            })
                        }
                    })
                }
            });
        },
        components: {},
        methods: {
            //隔行变色
            tableRowClassName ({row, rowIndex}) {
                if (rowIndex % 2 != 0) {
                    return 'success-row'
                }
                return ''
            },
	        //点击跳转
            onBtnDetailClick (row) {
                this.$store.commit('save_detail_info', row)
                this.$router.push({
                    path: `/refund/detail/checkFile/${row.id}`
                })
            },
	        //分页
            yy(val){
                this.pageNum = val
                this.getInvestmentList()
            },
	        //数据列表展示
            getInvestmentList () {
                let vm = this
                vm.loading = true
                let params = vm.$route.path.split('/')[4]+'?pageNum='+vm.pageNum+'&pageSize=10'
                API.deposit(params).then(function (result) {
                    vm.loading = false
                    vm.tableData = []
                    if (result.code == 200 && result.data != null) {
                        vm.total = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            vm.tableData.push(item)
                        })
                    }else{
                        vm.loading = false
                        vm.$message.error({
                            message: '数据列表获取失败',
                            showClose: true,
                            duration: 2000
                        })
                    }
                },(error) => {
                    vm.loading = false
                    vm.$message.error({
                        message: '服务器错误',
                        showClose: true,
                        duration: 2000
                    })
                });
            },
        },
        mounted () {
            this.getInvestmentList()
        },
        computed: {},
        watch: {}
    }
</script>
<style lang="scss" scope>
	.boxLeft {
		margin-right: 10px;
		padding-left: 10px;
		padding-right: 10px;
		height: 700px;
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
		height: 840px;
		position:absolute;
		left:444px;
		width:61%;
	}
	.el-menu-item{
		padding: 0px 38px !important;
		min-width: 0px !important;
	}
	.fundtaS {
		/*margin-top: 20px;*/
		background: #fff;
		margin-bottom: 50px;
		background: #fff;
		border:1px solid #fff;
	}
	.fundtaS .filter {
		width: 70px;
		margin-left: 10px;
		margin-top: 10px;
		position: absolute;
		z-index: 222;
		color: #3388FF;
		font-weight: bold;
		border-bottom: 5px solid #3388FF;
		padding-bottom: 10px;
	}
	.fundtaS .hrlineT{
		margin-top:42px;
		margin-left:14px;
		position: absolute;
		z-index: 111;
		width: 98%;
	}
	.fundtableSt {
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
			width:74%;
		}
		.boxRight .fundmenu{
			width:99.5%;
		}
		.fundtaS{
			width:99%;
		}
		.fundtableSt {
			margin:0 auto;
			margin-top: 80px;
			width:98%;
		}
		.fundtaS .hrlineT{
			width:97%;
			margin-left:12px;
		}
		.page{
			margin-right:10px;
		}
	}
</style>