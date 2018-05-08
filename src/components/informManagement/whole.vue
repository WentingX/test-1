<!--全部通知-->
<template>
	<div>
		<el-form :inline="true" name="ruleForm" ref="ruleForm" class="demo-form-inline wholeform">
			<p class="title"><em>|</em> 信息筛选</p>
			<el-form-item class="wholeuu" prop="text">
				<el-input size="mini" v-model="text" placeholder="输入你想搜索的内容" class="wholesearchInput"></el-input>
			</el-form-item>
			<el-form-item  class="wholebtn">
				<el-button icon="el-icon-search" size="mini" class="wholebuttonInput_search" @click="dsearchInfo">搜索</el-button>
			</el-form-item><br/>
			<el-form-item class="wholename" label="发布时间" prop="date">
				<el-date-picker v-model="date" type="date" value-format="yyyy-MM-dd" :editable= false></el-date-picker>
			</el-form-item>
			<el-form-item class="wholeqq" label="角色" prop="sender">
				<el-select size="mini" v-model="sender">
					<el-option label="所有用户" value="所有用户"></el-option>
					<el-option label="接单方" value="接单方"></el-option>
					<el-option label="信息方" value="信息方"></el-option>
					<el-option label="需求方" value="需求方"></el-option>
				</el-select>
			</el-form-item>
			<div style="margin:0 auto;text-align:center;" class="wholecen">
				<el-button size="mini" class="wholebuttonInput wholebuttonInput_left" @click="searchData">查询</el-button>
				<el-button size="mini" class="wholebuttonInput" @click="resetForm('ruleForm')">重置</el-button>
			</div>
		</el-form>
		<hr>
		<div class="wholetaS">
			<p class="title"><em>|</em> 全部通知</p>
			<el-table :data="tableData" v-loading="loading" style="width: 100%;text-align:center;" :row-class-name="tableRowClassName">
				<el-table-column property="notify_title" label="标题" align="center"></el-table-column>
				<el-table-column property="inform" label="通知类型" align="center"></el-table-column>
				<el-table-column property="notify_date" label="发布时间" align="center"></el-table-column>
				<el-table-column property="fbjs" label="发布角色" align="center">
					<template slot-scope="scope">
						<span :class="{'black': (scope.row.fbjs === '所有用户'),'warning': (scope.row.fbjs === '接单方'),'info': (scope.row.fbjs === '信息方'),'success': (scope.row.fbjs === '需求方')}">
							{{scope.row.fbjs}}
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" property="state">
					<template slot-scope="scope">
						<el-button size="mini" type="text" class="wholeview"
						           @click="onBtnDetailClick(scope.row)" property="id">详情
						</el-button><!--原1 0 反了-->
						<el-button v-if="scope.row.state == 0" size="mini" type="text" class="wholedisabled"
						           @click="wholeDisa(scope.row)" property="id">禁用</el-button>
						<el-button v-if="scope.row.state == 1" size="mini" type="text" class="wholegreen"
						           @click="wholeDisa(scope.row)" property="id">启用</el-button>
					</template>

				</el-table-column>
			</el-table>
			<div class="page block">
				<el-pagination background layout="prev, pager, next"  :page-size="10" :total="total" :current-page.sync="currentPage1" @current-change="yy"></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data () {
            return {
                text: '',
                date: '',
                sender: '',
                tableData: [],
                currentRow: null,
                total: 0,
                pageNum: 1,
	            flag:false,//根据点击不同的按钮 处理分页
                loading: true,
                currentPage1: 1,//恢复第1页
            }
        },
        created (){
            this.getInvestmentList()
	    },
        methods: {
            //加载提示框
            msg(type,txt){
                this.$message[type]({
                    message: txt,
                    showClose: true,
                    duration: 200
                })
            },
            //搜索
            dsearchInfo() {
                this.$data.flag = true
                this.$data.currentPage1 = 1
	            var text = this.$data.text
	            if(!text){//如果搜索的数据为空  默认展示全部 否则 根据条件筛选
                    this.getInvestmentList()
	            }else{
                    var searDa = '?pageSize=10&pageNum='+this.pageNum+'&text=' + this.$data.text
                    API.selectOnlyConditionSystemOrder(searDa).then( result => {
                        this.total = parseInt(result.data.total)
                        this.tableData = result.data.list
                    })
	            }
            },
            // 查询
            searchData() {
                this.$data.flag = false
                this.$data.currentPage1 = 1
                var o  = this.$data.pageNum
                this.getInvestmentList(o)
            },
	        //重置
            resetForm (ruleForm) {
                this.$refs[ruleForm].resetFields();
                this.$data.text = ""
                this.$data.date = ""
	            this.$data.sender = ""
                this.$data.pageNum = 1
                this.$data.currentPage1 = 1
                this.getInvestmentList(this.pageNum)
            },
            //数据展示
            getInvestmentList (paramStr=this.pageNum) {
                let vm = this
                vm.loading = true
                let deparam = '?pageSize=10&pageNum='+paramStr+'&date='+vm.$data.date+'&sender='+vm.$data.sender
                API.selectMoreConditionSystemOrder(deparam).then( result => {
                    vm.loading = false
                    if(result.code == "200" && result.data != null){
                        vm.total = parseInt(result.data.total)
                        vm.tableData=result.data.list
                    }else{
                        vm.loading = false
                        vm.msg('error','数据列表获取失败')
                    }
                },error => {
                    vm.loading = false
                    vm.msg('error','服务器错误')
                })
            },
            //分页
            yy(val){
                if(this.$data.flag==false){
                    this.$data.pageNum = val
                    this.getInvestmentList(this.$data.pageNum)
                }else {
                    var text = this.$data.text
                    if(!text){//如果搜索的数据为空  默认展示全部 否则 根据条件筛选
                        this.getInvestmentList()
                    }else{
                        var searDa = '?pageSize=10&pageNum='+this.pageNum+'&text=' + this.$data.text
                        API.selectOnlyConditionSystemOrder(searDa).then( result => {
                            this.total = parseInt(result.data.total)
                            this.tableData = result.data.list
                        })
                    }
                }
            },
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
                    path: `/informDetails/${row.id}`
                })
            },
	        //禁用启用 系统通知  交易通知
            wholeDisa (row) {
                //禁用 启用
                if(row.state == 0){
                    row.state = 1
                }else{
                    row.state = 0
                }// 0 系统通知 启用 1 交易通知 禁用
	            //系统通知 交易通知 防止 闪跳
	            if(row.inform == "系统通知"){
                    API.deleteByIdAllSystemOrder('?id=' + row.id + '&inform=0' + '&state=' + row.state).then( result => {
                        if (result.code == 200 && result.data != null) {
	                        row.inform = "系统通知"
                        }
                    })
	            }else if(row.inform == "交易通知"){
                    API.deleteByIdAllSystemOrder('?id=' + row.id + '&inform=1' +'&state=' + row.state).then( result => {
                        if (result.code == 200 && result.data != null) {
	                        row.inform = "交易通知"
                        }
                    })
	            }
            }
        },
        mounted() {   },
        watch: {  }
    }
</script>
<style lang="scss">
	/*发布角色状态*/
	.wholetaS{
		.black{
			color:black;
		}
		.success {
			color: #67C23A;
		}
		.warning {
			color: #E6A23C;
		}
		.info {
			color: #5790D7;
		}
	}
</style>
<style lang="scss" scope>
	.wholeform {
		background: #fff;
	}
	.wholeform .title {
		color: #858DAD;
		font-weight: bold;
		margin-top: 0;
	}
	.wholeform .title em {
		color: #88B7E0;
		margin-right: 10px;
	}

	.wholeuu{
		margin-top:20px;
		margin-bottom:30px;
	}
	.wholeuu .el-form-item__content,
	.wholeuu .el-form-item__content{
		line-height:normal;
	}
	.wholeuu .el-input__inner{
		width: 400px;
		height: 35px;
		border: 1px solid #999999;
		border-radius: 0px;
	}
	.wholebtn{
		margin-right:0px;
		vertical-align:bottom;
	}
	.wholebtn .el-form-item__content button {
		width:100px;
		height:35px;
		border:1px solid #999999;
		border-radius:0px;
		margin-top:19px;
		margin-left: -4px
	}
	.wholeform .el-input__inner{
		border-radius:0px;
	}
	.wholebuttonInput{
		width:126px;
		height:35px;
	}
	.wholebuttonInput_left{
		margin-right:70px;
	}
	.wholeform .el-button,.wholecen .el-button{
		background: #4A4F63;
		color: white;
		padding: 7px 20px;
	}
	//表单 与 表格  中间的分割线
	hr{
		height: 10px;
		background: #f3f4f7;
		border: none;
		margin-left: -35px;
		margin-right: -35px;
		margin-top: 20px;
	}
	.wholetaS {
		margin-top: 20px;
		background: #fff;
		margin-bottom: 50px;
	}
	.page {
		float: right;
		background: #fff;
		color: #E34E42;
		margin-top: 10px;
	}
	.has-gutter tr, .el-table .success-row {
		background: #F3F4F7;
	}
	.wholeview {
		color: #4993FF;
		margin-right: 15px;
	}
	//启用 与 禁用
	.wholedisabled {
		color: #E42626;
	}
	.wholegreen{
		color:green;
	}

	@media screen and (min-width:1300px) {
		.wholename{
			width:25%;
		}
		.wholename .el-form-item__content{
			width:80%;
		}
		.wholeqq .el-form-item__content{
			width:55%;
		}
	}
</style>