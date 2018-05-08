<!--收藏-->
<template>
	<div style="clear:both;">
		<div class="colltaS">
			<p class="filter">收藏</p>
			<hr color="#556191" class="hrlineT"/>
			<el-table :data="tableData" v-loading="loading" class="colltableSt" :row-class-name="tableRowClassName">
				<el-table-column property="projectName" label="项目名称" align="center"></el-table-column>
				<el-table-column property="publishDate" label="发布时间" align="center"></el-table-column>
				<el-table-column property="industry" label="所属行业" align="center"></el-table-column>
				<el-table-column property="infoClassification" label="信息类型" align="center"></el-table-column>
				<el-table-column property="province" label="地区" align="center"></el-table-column>
				<el-table-column property="financiongVolumeStart" label="投融金额" align="center"></el-table-column>
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
                loading: true,
            }
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
                API.favoritesByUserId(params).then(function (result) {
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
			width:74%;
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
	.boxRight .el-tabs__content{
		display:block;
	}
	.boxRight .el-tabs .el-tabs__header .el-tabs__item.is-active {
		background: #fff;
		color: #373d41;
	}
	.boxRight .el-tabs .el-tabs__header .el-tabs__item.is-active:hover {
		color: #373d41;
	}
	.boxRight .el-tabs .el-tabs__header .el-tabs__item {
		color: #373d41;
	}
	.boxRight .el-tabs .el-tabs__header .el-tabs__item:hover {
		color: #373d41;
	}
</style>