<!--交易明细-->
<template>
	<div>
		<el-form :inline="true" class="demo-form-inline transform">
			<p class="title"><em>|</em> 信息筛选</p>
			<el-date-picker v-model="value4" type="daterange" :picker-options="pickerOptions2"
			                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
			                align="right" @change="dsearchInfo" :editable= false></el-date-picker>
			<em style="font-style:normal;word-spacing: 20px;">
				<span @click='todayT("01")' style="margin-left:20px;cursor:pointer;" :class="tj0 ? 'tod': '' ">今日</span> <span @click='todayT("02")' style="cursor:pointer;" :class="tj1 ? 'tod': '' ">昨日</span>
				<span @click='todayT("07")' style="cursor:pointer;" :class="tj2 ? 'tod': '' ">最近7天</span> <span @click='todayT("30")' style="cursor:pointer;" :class="tj3 ? 'tod': '' ">最近30天</span>
			</em>
		</el-form>
		<hr>
		<div class="transS">
			<div style="background:#E8F5FE;padding-left:20px;border:1px solid #F3F4F7;">
				<p>支出</p>
				<p style="color: #DF1F1F;" v-model="sum">{{sum}}</p>
				<p style="color: #C3CACF;" v-model="count">{{count}}笔</p>
			</div>
			<el-row style="color:#BCBCBC;margin-top:15px;">
				<el-col :span="12">
					<div class="grid-content">
						<p class="title"><em>|</em> 全部</p>
					</div>
				</el-col>
				<el-col :span="12" class="transa_right">
					<div class="grid-content">
						<el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
					</div>
				</el-col>
			</el-row>
			<el-table v-loading="loading" :data="tableData" style="width: 100%;text-align:center;" :row-class-name="tableRowClassName">
				<el-table-column property="username" label="用户名" align="center"></el-table-column>
				<el-table-column property="name" label="姓名" align="center"></el-table-column>
				<el-table-column property="order_number" label="订单号" align="center"></el-table-column>
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
				<el-table-column label="操作" prop="" align="center">
					<template scope="scope">
						<el-button type="text" class="transview" @click="onBtnDetailClick(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page block">
				<el-pagination background layout="prev, pager, next" :page-size="10" :total="total2"  @current-change="yy"></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data () {
            return {
                pickerOptions2: {
                    shortcuts: [
                        {
	                        text: "今天",
	                        onClick(picker) {
	                            const end = new Date();
	                            const start = new Date();
	                            start.setTime(start.getTime()-24);
	                            picker.$emit("pick", [start, end]);
	                        }
	                    }, {
                            text: "昨天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                picker.$emit("pick", [start, end]);
                            }
                        },{
                            text: '最近7天',
                            onClick (picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        },{
                            text: '最近30天',
                            onClick (picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                value4: [],
                dateStateId: '',
                sum: '',
                count: '',
                tableData: [],
                currentRow: null,
                total2: 0,
                pageNum: 1,
                temp: '',
                loading: true,
                downloadLoading:false,//下载
	            parm :'',//传参
                tj0: true,//给当前点击的按钮设置为真
                tj1: false,
                tj2: false,
                tj3: false,
                flag: false,
            }
        },
        created (){
            if(this.$data.value4[0] == 'NaN-NaN-NaN NaN:NaN:NaN' || this.$data.value4[0] == undefined || this.$data.value4[0] == null){
                this.$data.value4[0] = ''
            }
            if(this.$data.value4[1] == 'NaN-NaN-NaN NaN:NaN:NaN' || this.$data.value4[1] == undefined  || this.$data.value4[1] == null){
                this.$data.value4[1] = ''
            }
            this.getInvestmentList2()
        },
        methods: {
            //导出Excel表格
            handleDownload() {
                this.downloadLoading = true
                import ('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['用户名', '姓名', '订单号', '角色类型', '收益金额', '生成时间','状态','转账时间']
                    const filterVal = ['username', 'name', 'order_number', 'zsType', 'money', 'create_date','state_id','update_date']
                    const data = this.formatJson(filterVal, this.tableData)
                    excel.export_json_to_excel(tHeader, data, '交易明细信息表格')
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
	        //时间组件
            dsearchInfo() {
                this.$data.flag = false
				var o  = this.$data.pageNum + this.$data.temp
				this.getInvestmentList2(o)
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
            //时间展示数据1 开始 结束
            getInvestmentList2 (paramStr=this.pageNum) {
	            let vm = this
                vm.loading = true
	            //对value4进行判断
                if(this.$data.value4 == null){
                    let deparam1 = '?pageNum='+paramStr+'&pageSize=10&startTime=&endTime='
                    API.earningsAccountDateStartTimeEndTime(deparam1).then( result => {
                        vm.loading = false
                        if(result.code == 200 && result.data != null){
                            this.loading = false//vm.loading
                            this.total2 = parseInt(result.data.total)
                            this.tableData=result.data.list
	                        //总支出
                            let vm = this
                            var parms = '?num=&startTime=&endTime='
                            API.earningsAccountSum(parms).then( result => {
                                if(result.code == 200 && result.data != null){
                                    vm.$data.count = result.data.count
                                    vm.$data.sum = result.data.sum
                                }
                            })

                            result.data.list.forEach((item) => {
                                if(item.money == null){
                                    item.money = "￥0"
                                }else{
                                    item.money = "￥" + item.money
                                }
                                if(item.state_id == "0"){
                                    item.state_id = "待转账"
                                }else{
                                    item.state_id = "已转账"
                                }
                                return item
                            })
                        }else{
                            vm.loading = false
                            vm.$message.error({
                                message: '数据列表获取失败',
                                showClose: true,
                                duration: 200
                            })
                        }
                    },error => {
                        vm.loading = false
                        vm.$message.error({
                            message: '服务器错误',
                            showClose: true,
                            duration: 200
                        })
                    })
                    return
                }else{
                    //有值时  调用
                    let deparam2 = '?pageNum='+paramStr+'&pageSize=10&startTime='+ this.$data.value4[0] +'&endTime='+this.$data.value4[1]
                    API.earningsAccountDateStartTimeEndTime(deparam2).then( result => {
                        vm.loading = false
                        if(result.code == 200 && result.data != null){
                            this.$data.loading = false//vm.loading
                            this.$data.total2 = parseInt(result.data.total)
                            this.$data.tableData=result.data.list
	                        //总支出
                            let vm = this
                            var parms = '?num=&startTime='+ this.$data.value4[0] +'&endTime='+this.$data.value4[1]
                            API.earningsAccountSum(parms).then( result => {
                                if(result.code == 200 && result.data != null){
                                    vm.$data.count = result.data.count
                                    vm.$data.sum = result.data.sum
                                }
                            })

                            result.data.list.forEach((item) => {
                                if(item.money == null){
                                    item.money = "￥0"
                                }else{
                                    item.money = "￥" + item.money
                                }
                                if(item.status == "0"){
                                    item.status = "待转账"
                                }else{
                                    item.status = "已转账"
                                }
                                return item
                            })
                        }else{
                            vm.loading = false
                            vm.$message.error({
                                message: '数据列表获取失败',
                                showClose: true,
                                duration: 200
                            })
                        }
                    },error => {
                        vm.loading = false
                        vm.$message.error({
                            message: '服务器错误',
                            showClose: true,
                            duration: 200
                        })
                    })
                }
            },
	        //时间方法  今天 昨天 最近7天 最近30天
            todayT(parm){//把参数 传到接口里面 通过全局变量data里面存储
                this.$data.parm = parm
                if(parm == "01"){
                    this.tj0 = true
                    this.tj1 = false
                    this.tj2 = false
                    this.tj3 = false
                }else if(parm == "02"){
                    this.tj1 = true
                    this.tj0 = false
                    this.tj2 = false
                    this.tj3 = false
                }else if(parm == "07"){
                    this.tj1 = false
                    this.tj0 = false
                    this.tj2 = true
                    this.tj3 = false
                }else if(parm == "30"){
                    this.tj1 = false
                    this.tj0 = false
                    this.tj3 = true
                    this.tj2 = false
                }
                this.$data.flag = true
                var o  = this.$data.pageNum + this.$data.temp
	            this.getInvestmentList3(o)
            },
            //时间展示数据2 今天 昨天 最近7天 最近30天
            getInvestmentList3 (paramStr=this.pageNum){
                let vm = this
                vm.loading = true
                let params = '?pageNum='+paramStr+'&pageSize=10&dateStateId='+vm.$data.parm
                API.earningsAccountDateSelect(params).then( result => {
                    vm.loading = false
                    if(result.code == 200 && result.data != null){
                        this.$data.loading = false//vm.loading
                        this.$data.total2 = parseInt(result.data.total)
                        this.$data.tableData=result.data.list
                        //总支出
                        var parms = '?num='+vm.$data.parm+'&startTime=&endTime='
                        API.earningsAccountSum(parms).then( result => {
                            if(result.code == 200 && result.data != null){
                                vm.$data.count = result.data.count
                                vm.$data.sum = result.data.sum
                            }
                        })

                        result.data.list.forEach((item) => {
                            if(item.money == null){
                                item.money = "￥0"
                            }else{
                                item.money = "￥" + item.money
                            }
                            if(item.status == "0"){
                                item.status = "待转账"
                            }else{
                                item.status = "已转账"
                            }
                            return item
                        })
                    }else{
                        vm.loading = false
                        vm.$message.error({
                            message: '数据列表获取失败',
                            showClose: true,
                            duration: 200
                        })
                    }
                },error => {
                    vm.loading = false
                    vm.$message.error({
                        message: '服务器错误',
                        showClose: true,
                        duration: 200
                    })
                })
            },
	        //分页
            yy(val){
                if(this.$data.flag==false){
                    this.$data.pageNum = val
                    if(this.$data.temp ===""){
                        this.getInvestmentList2(this.$data.pageNum)
                    }else{
                        var o = this.$data.pageNum + this.$data.temp
                        this.getInvestmentList2(o)
                    }
                }else {
                    this.pageNum = val
                    var params = '?pageNum='+this.pageNum+'&pageSize=10&dateStateId='+this.$data.parm
                    API.earningsAccountDateSelect(params).then( result => {
                        if(result.code == 200 && result.data != null){
                            this.total2 = parseInt(result.data.total)
                            this.tableData=result.data.list
                        }
                    })
                }
            }
        },
	    //时间
        watch: {
            value4: function(newVal){
                if(newVal != null && this.$data.value4 != null){
                    this.$data.value4[0] = this.$root.$options.filters.dateFormat2(newVal[0])
                    this.$data.value4[1] = this.$root.$options.filters.dateFormat2(newVal[1])
                    return
                }
            }
        }
    }
</script>
<style lang="scss">
	/*发是否转账状态*/
	.transS{
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
	.transform {
		height: 90px;
		background: #fff;
	}
	/*开始时间结束时间*/
	.transform .el-date-editor.el-input,
	.transform .el-date-editor.el-input__inner{
		width:350px !important;
		margin-top:10px;
	}
	.transform .title {
		color: #858DAD;
		font-weight: bold;
		margin-top: 0;
	}
	.transform .title em {
		color: #88B7E0;
		margin-right: 10px;
	}
	.transa_right{
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
	.transS {
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
	.transview {
		color: #4F95FF;
	}
	/*今日 昨日点击切换颜色*/
	.tod{
		color:blue;cursor:pointer;
	}
</style>