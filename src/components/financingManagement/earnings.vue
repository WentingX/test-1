<!--转账管理-->
<template>
	<div>
		<el-form :inline="true" :model="formInline"  name="ruleForm" ref="ruleForm" class="demo-form-inline earnform">
			<p class="title"><em>|</em> 信息筛选</p>
			<el-form-item class="earnuu" prop="text">
				<el-input size="mini" v-model="text" placeholder="输入你想搜索的内容" class="searchInput" clearable></el-input>
			</el-form-item>
			<el-form-item class="earnbtn">
				<el-button icon="el-icon-search" size="mini" class="earnbuttonInput"  @click="dsearchInfo">搜索</el-button>
			</el-form-item>
			<br/>
			<el-form-item label="用户名" class="earnsta" prop="username">
				<el-input size="mini" v-model="formInline.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名" class="earnsta" prop="name">
				<el-input size="mini" v-model="formInline.name"></el-input>
			</el-form-item>
			<el-form-item label="转账时间" class="earnsta earnstat" prop="updatedate">
				<el-date-picker v-model="updatedate" type="date" value-format="yyyy-MM-dd" :editable= false></el-date-picker>
			</el-form-item>
			<el-form-item label="生成时间" class="earnsta earnstat" prop="createdate">
				<el-date-picker  v-model="createdate" type="date" value-format="yyyy-MM-dd" :editable= false></el-date-picker>
			</el-form-item>
			<el-form-item label="角色类型" class="earnsta earnrole" prop="attribute">
				<el-select v-model="formInline.attribute" placeholder="请选择" clearable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="状态" class="earnsta earnrole" prop="stateId">
				<el-select size="mini" v-model="formInline.stateId" clearable>
					<el-option label="已转账" value="1"></el-option>
					<el-option label="待转账" value="0"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="订单号" class="earnsta earnrole ddhao" prop="orderNumber">
				<el-input size="mini" v-model="formInline.orderNumber"></el-input>
			</el-form-item>
			<el-form-item label="订单类型" class="earnsta earnrole" prop="orderType">
				<el-select v-model="formInline.orderType" placeholder="请选择" clearable>
					<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="跟单员" class="earnsta earnrole" prop="merchandiser">
				<el-input size="mini" v-model="formInline.merchandiser"></el-input>
			</el-form-item>
			<div style="margin:0 auto;text-align:center;" class="earncen">
				<el-button size="mini" class="earnbuttonInput earnbuttonInput_left" @click="searchData">查询</el-button>
				<el-button size="mini" class="earnbuttonInput" @click="resetForm('ruleForm')">重置</el-button>
			</div>
		</el-form>
		<hr />
		<div class="taS">
			<el-col :span="12">
				<div class="grid-content">
					<p class="title"><em>|</em> 转账管理</p>
				</div>
			</el-col>
			<el-col :span="12" class="earn_right">
				<div class="grid-content">
					<el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
				</div>
			</el-col>
			<el-table v-loading="loading" :data="tableData" style="width: 100%;text-align:center;" :row-class-name="tableRowClassName">
				<el-table-column property="order_number" label="订单号" align="center"></el-table-column>
				<el-table-column property="order_type" label="订单类型" align="center"></el-table-column>
				<el-table-column property="zsType" label="角色类型" align="center"></el-table-column>
				<el-table-column property="money" label="转账金额" align="center"></el-table-column>
				<el-table-column property="publish_date" label="生成时间" align="center"></el-table-column>
				<el-table-column property="status" label="状态" align="center">
					<template slot-scope="scope">
						<span :class="{'success': (scope.row.status === '已转账'),'warning': (scope.row.status === '待转账')}">
							{{scope.row.status}}
						</span>
					</template>
				</el-table-column>
				<el-table-column property="pay_date" label="转账时间" align="center"></el-table-column>
				<el-table-column property="merchandiser" label="跟单员" align="center"></el-table-column>
				<el-table-column label="操作" prop="" align="center">
					<template scope="scope">
						<el-button type="text" class="view" @click="onBtnDetailClick(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page block">
				<el-pagination background layout="prev, pager, next" :page-size="10" :total="total" :current-page.sync="currentPage1" @current-change="yy"></el-pagination>
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
                formInline: {
                    username: '',
                    name: '',
                    attribute: '',
                    money: '',
                    stateId: '',
                    orderNumber: '',
                    orderType: '',
                    merchandiser: ''
                },
                //角色类型
                options: [
                    {
	                    value: '01',
	                    label: '信息方'
	                }, {
	                    value: '02',
	                    label: '需求方'
	                }, {
	                    value: '03',
	                    label: '服务商'
	                },{
	                    value: '04',
		                label: '所有用户'
	                }
                ],
	            //订单类型
                options2: [
                    {
	                    value: '01',
	                    label: '信息订单'
	                }, {
	                    value: '02',
	                    label: '需求订单'
	                }, {
	                    value: '03',
	                    label: '撮合订单'
                    }
                ],
                createdate: '',
                updatedate: '',
                tableData: [],
                currentRow: null,
                total: 0,
                pageNum: 1,
	            temp: '',
                downloadLoading:false,//下载
                loading: true,
	            flag: false,
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
            //导出Excel表格
            handleDownload() {
                this.downloadLoading = true
                import ('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['用户名', '姓名', '公司名称', '角色类型', '收益金额', '生成时间','状态','转账时间']
                    const filterVal = ['username', 'name', 'enterprise_name', 'zsType', 'money', 'create_date','state_id','update_date']
                    const data = this.formatJson(filterVal, this.tableData)
                    excel.export_json_to_excel(tHeader, data, '收益管理信息表格')
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
            //搜索
            dsearchInfo() {
                this.$data.flag = true
                this.$data.currentPage1 = 1
                var searDa = '?pageSize=10&pageNum='+this.pageNum+'&text=' + this.$data.text
                API.earningsAccountByText(searDa).then( result => {
                    if(result.code == 200 && result.data != null){
                        this.total = parseInt(result.data.total)
                        this.tableData = result.data.list
	                    result.data.list.forEach( (item) => {
                            if(item.order_type == "01"){
                                item.order_type = "信息订单"
                            }else if(item.order_type == "02"){
                                item.order_type = "需求订单"
                            }else if(item.order_type == "03"){
                                item.order_type = "撮合订单"
                            }
                            if(item.status == "0"){
                                item.status = "待转账"
                            }else{
                                item.status = "已转账"
                            }
	                    })
                    }
                })
            },
            //查询
            searchData() {
                this.$data.flag = false
                this.$data.currentPage1 = 1
                var o  = this.$data.pageNum + this.$data.temp
                this.getInvestmentList(o)
            },
	        //重置
            resetForm (ruleForm) {
                this.$refs[ruleForm].resetFields();
                this.$data.createdate = ""
	            this.$data.updatedate = ''
	            this.$data.text = ""
                this.$data.currentPage1 = 1
                this.getInvestmentList()
            },
	        //隔行换色
            tableRowClassName ({row, rowIndex}) {
                if (rowIndex % 2 != 0) {
                    return 'success-row'
                }
                return ''
            },
            onBtnDetailClick (row) {
                //根据 状态 跳转到对应的页面
                if(row.status == "已转账"){
                    this.$store.commit('save_detail_info', row)
                    this.$router.push({
                        path: `/alreadyTransferred/${row.id}`
                    })
                }else{
                    this.$store.commit('save_detail_info', row)
                    this.$router.push({
                        path: `/transferredDetails/${row.id}`
                    })
                }
            },
            //数据展示
            getInvestmentList (paramStr=this.pageNum) {
                let vm = this
                vm.loading = true
	            if(this.$data.createdate == null){
                    this.$data.createdate = ''
	            }
	            if(this.$data.updatedate == null){
                    this.$data.updatedate = ''
	            }
                let deparam = '?pageNum='+paramStr+'&pageSize=10&usernames='+ this.$data.formInline.username + '&name=' + this.$data.formInline.name +
                    '&createdate=' + this.$data.createdate + '&updatedate='+ this.$data.updatedate + '&money=' + this.$data.formInline.money +
                    '&stateId=' + this.$data.formInline.stateId + '&attribute=' + this.$data.formInline.attribute +
	                '&orderNumber=' + this.$data.formInline.orderNumber + '&orderType=' + this.$data.formInline.orderType + '&merchandiser=' + this.$data.formInline.merchandiser
                API.manyconditionsFinance(deparam).then( result => {
                    if(result.code == "200" && result.data != null){
                        vm.loading = false
                        vm.total = parseInt(result.data.total)
                        vm.tableData=result.data.list
                        result.data.list.forEach((item) => {
	                        if(item.money < 0){
	                            item.money = "￥" + item.money.slice(1)
	                        }else if(item.money == null){
                                item.money = "￥0"
	                        }else{
                                item.money = "￥" + item.money
	                        }
                            if(item.status == "0"){
                                item.status = "待转账"
                            }else{
                                item.status = "已转账"
                            }
                            if(item.order_type == "01"){
	                            item.order_type = "信息订单"
                            }else if(item.order_type == "02"){
	                            item.order_type = "需求订单"
                            }else if(item.order_type == "03"){
	                            item.order_type = "撮合订单"
                            }
                            return item
                        })
                    }else{
                        vm.loading = false
                        vm.msg('error','数据列表获取失败')
                    }
                },(error) => {
                    vm.loading = false
                    vm.msg('error','服务器错误')
                });
            },
	        //分页
            yy(val){
                if(this.$data.flag==false){
                    this.$data.pageNum = val
                    if(this.$data.temp ===""){
                        this.getInvestmentList(this.$data.pageNum)
                    }else{
                        var o = this.$data.pageNum + this.$data.temp
                        this.getInvestmentList(o)
                    }
                }else {
                    this.pageNum = val
                    var searDa = '?pageSize=10&pageNum='+this.pageNum+'&text=' + this.$data.text
                    API.earningsAccountByText(searDa).then( result => {
                        if(result.code == 200 && result.data != null){
                            this.total = parseInt(result.data.total)
                            this.tableData = result.data.list
                            result.data.list.forEach( (item) => {
                                if(item.order_type == "01"){
                                    item.order_type = "信息订单"
                                }else if(item.order_type == "02"){
                                    item.order_type = "需求订单"
                                }else if(item.order_type == "03"){
                                    item.order_type = "撮合订单"
                                }
                                if(item.status == "0"){
                                    item.status = "待转账"
                                }else{
                                    item.status = "已转账"
                                }
                            })
                        }
                    })
                }
            }
        },
	    watch: {

	    }
    }
</script>
<style lang="scss">
	/*是否转账状态*/
	.taS{
		.success {
			color: #67C23A;
		}
		.warning {
			color: #E6A23C;
		}
	}
</style>
<style lang="scss" scope>
	/*下载按钮*/
	.filter-item {
		margin-top: 20px;
	}
	.earnform {
		background: #fff;
	}
	.earnform .title,.taS .title{
		color: #858DAD;
		font-weight: bold;
		margin-top: 0;
	}
	.earnform .title em, .taS .title em{
		color: #88B7E0;
		margin-right: 10px;
	}
	.earnuu{
		margin-top:20px;
		margin-bottom:30px;
	}
	.earnuu .el-form-item__content,
	.earnbtn .el-form-item__content{
		line-height:normal;
	}
	.earnuu .el-input__inner{
		width: 400px;
		height: 35px;
		border: 1px solid #999999;
		border-radius: 0px;
	}
	.earnbtn{
		margin-right:0px;
		vertical-align:bottom;
	}
	.earnbtn .el-form-item__content button {
		width:100px;
		height:35px;
		border:1px solid #999999;
		border-radius:0px;
		margin-top:19px;
		margin-left: -4px
	}
	.earnform .el-input__inner{
		border-radius:0px;
	}
	.earnsta .el-form-item__content{
		width:140px;
	}
	/*订单号*/
	.ddhao .el-form-item__content{
		width:200px;
	}
	.earnform .el-date-editor.el-input,
	.earnform .el-date-editor.el-input__inner{
		width:140px;
	}
	.earncen .el-button,.earnbtn .el-button{
		background: #4A4F63;
		color: white;
		padding: 7px 20px;
	}
	.earnbuttonInput{
		width:126px;
		height:35px;
	}
	.earnbuttonInput_left{
		margin-right:70px;
	}
	.earn_right{
		text-align:right;
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
	.taS {
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
	//表格颜色
	.has-gutter tr, .el-table .success-row {
		background: #F3F4F7;
	}
	.view {
		color: #4F95FF;
	}
	.disabled {
		color: #E42626;
	}
	@media screen and (max-width:1299px) {
		.earnrole{
			margin-bottom:40px;
		}
	}
	@media screen and (min-width:1300px) {
		.earncen{
			margin-top:20px !important;
		}
		.earnbtn .el-form-item__content button{
			margin-left:10px;
		}
		.earnbtn{
			margin-bottom: 0px;
			width:13%;
		}
	}
</style>
