<!--全部订单-->
<template>
	<div style="clear:both;">
			<el-tabs v-model="activeName" @tab-click="handleClick" class="comptabchanGe">
				<el-tab-pane label="发布订单" name="first">
					<el-form :inline="true" name="ruleForm" ref="ruleForm" :model="formInlinematch" class="demo-form-inline compform">
						<el-form-item class="compuu" prop="user">
							<el-input size="mini"  v-model="keyWord" placeholder="输入你想搜索的内容" class="compsearchInput"></el-input>
						</el-form-item>
						<el-form-item class="compss">
							<el-button icon="el-icon-search" size="mini" class="buttonInput" @click="dsearchInfo">搜索</el-button>
						</el-form-item><br/>
						<el-form-item class="compname" label="订单号" prop="orderNumber">
							<el-input size="mini" v-model="formInlinematch.orderNumber"></el-input>
						</el-form-item>
						<el-form-item class="compqq compcreateTime" label="创建时间" prop="publishDate">
							<el-date-picker	v-model="publishDate" type="date" :editable= false></el-date-picker>
						</el-form-item>
						<el-form-item class="compqq" label="类型" prop="orderType">
							<el-select size="mini" v-model="formInlinematch.orderType">
								<el-option label="投融信息" value="0"></el-option>
								<el-option label="尽职调查" value="1"></el-option>
								<el-option label="投后管理" value="2"></el-option>
								<el-option label="高端定制" value="3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="compqq comadd" label="地区" prop="provincesId">
							<el-cascader v-model="kk" :options="options2" change-on-select clearable @change="handleItemChange"></el-cascader>
						</el-form-item>
						<el-form-item class="compqq comadd" label="状态" prop="status">
							<el-select size="mini" v-model="formInlinematch.status">
								<el-option label="待审核" value="1001"></el-option>
								<el-option label="审核成功" value="1002"></el-option>
								<el-option label="审核失败" value="-1001"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="compqq comadd" label="行业" prop="industry">
							<el-select size="mini" v-model="formInlinematch.industry">
								<el-option label="金融" value="shanghai"></el-option>
								<el-option label="互联网" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<div style="text-align:center;" class="compbtn">
							<el-button size="mini" class="compbuttonInput compbuttonInput_left" @click="onSubmit">查询</el-button>
							<el-button size="mini" class="compbuttonInput" @click="resetForm('ruleForm')">重置</el-button>
						</div>
					</el-form>
					<div class="comptaS">
						<el-table :data="tableData" v-loading="loading" class="comptableSt" :row-class-name="tableRowClassName">
							<el-table-column property="publishDate" label="创建时间" align="center"></el-table-column>
							<el-table-column property="orderNumber" label="订单号" align="center"></el-table-column>
							<el-table-column property="projectName" label="标题" align="center"></el-table-column>
							<el-table-column property="typeName" label="类型" align="center"></el-table-column>
							<el-table-column property="city" label="地区" align="center"></el-table-column>
							<el-table-column property="industry" label="行业" align="center"></el-table-column>
							<el-table-column property="status" label="状态" align="center">
								<template slot-scope="scope">
									<span :class="{'success': (scope.row.status === '审核成功'),'warning': (scope.row.status === '待审核'),'danger': (scope.row.status === '审核失败')}">
										{{scope.row.status}}
									</span>
								</template>
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope"><!-- v-if="detai"-->
									<el-button size="mini" type="text" class="compview"
									           @click="onBtnDetailClick(scope.row)" property="id">详情
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="page block">
							<el-pagination background layout="prev, pager, next" :page-size="8" :total="total" :current-page.sync="currentPage1" @current-change="yy"></el-pagination>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="接单订单" name="second">
					<el-form :inline="true" name="ruleFormt" ref="ruleFormt"
					         :model="formInlinematcht" class="demo-form-inline compform">
						<el-form-item class="compuu" prop="user">
							<el-input size="mini" v-model="keyWordt" placeholder="输入你想搜索的内容" class="compsearchInput"></el-input>
						</el-form-item>
						<el-form-item class="compss">
							<el-button icon="el-icon-search" size="mini" @click="dsearchInfo2">搜索</el-button>
						</el-form-item><br/>
						<el-form-item class="compname" label="订单号" prop="orderNumber">
							<el-input size="mini" v-model="formInlinematcht.orderNumber"></el-input>
						</el-form-item>
						<el-form-item class="compqq compcreateTime" label="创建时间" prop="publishDate">
							<el-date-picker	v-model="publishDate" type="date" :editable= false></el-date-picker>
						</el-form-item>
						<el-form-item class="compqq" label="类型" prop="orderType">
							<el-select size="mini" v-model="formInlinematcht.orderType">
								<el-option label="投融信息" value="0"></el-option>
								<el-option label="尽职调查" value="1"></el-option>
								<el-option label="投后管理" value="2"></el-option>
								<el-option label="高端定制" value="3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="compqq comadd" label="地区" prop="provincesId">
							<el-cascader v-model="kk3" :options="options3" change-on-select clearable @change="handleItemChange3"></el-cascader>
						</el-form-item>
						<el-form-item class="compqq comadd" label="状态" prop="status">
							<el-select size="mini" v-model="formInlinematcht.status">
								<el-option label="待派单" value="1022"></el-option>
								<el-option label="派单中" value="1023"></el-option>
								<el-option label="超时" value="-10000"></el-option>
								<el-option label="已接单" value="1024"></el-option>
								<el-option label="待验收" value="1026"></el-option>
								<el-option label="验收通过" value="1027"></el-option>
								<el-option label="验收失败" value="-1020"></el-option>
								<el-option label="财务审批" value="1014"></el-option>
								<el-option label="交易完成" value="1030"></el-option>
								<el-option label="交易失败" value="-1030"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="compqq comadd" label="行业" prop="industry">
							<el-select size="mini" v-model="formInlinematcht.industry">
								<el-option label="金融" value="shanghai"></el-option>
								<el-option label="互联网" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<div style="text-align:center;" class="compbtn">
							<el-button size="mini" class="compbuttonInput compbuttonInput_left" @click="onSubmitt">查询</el-button>
							<el-button size="mini" class="compbuttonInput" @click="resetFormt('ruleFormt')">重置</el-button>
						</div>
					</el-form>
					<div class="comptaST">
						<el-table :data="tableDatat" v-loading="loading2" class="comptableSt" :row-class-name="tableRowClassName">
							<el-table-column property="publishDate" label="创建时间" align="center"></el-table-column>
							<el-table-column property="orderNumber" label="订单号" align="center"></el-table-column>
							<el-table-column property="projectName" label="标题" align="center"></el-table-column>
							<el-table-column property="typeName" label="类型" align="center"></el-table-column>
							<el-table-column property="city" label="地区" align="center"></el-table-column>
							<el-table-column property="industry" label="行业" align="center"></el-table-column>
							<el-table-column property="status" label="状态" align="center">
								<template slot-scope="scope">
									<span :class="{'hh': (scope.row.status === '验收通过（可撮合，待收益，审核成功）'),'warningt': (scope.row.status === ('待派单' || '派单中' || '已接单' || '待验收' || '验收通过（可撮合，待收益，审核成功）' || '验收失败' || '财务审批')),'dangert': (scope.row.status === ('超时' || '交易失败')),'successt': (scope.row.status === '交易完成')}">
										{{scope.row.status}}
									</span>
								</template>
							</el-table-column>
							<el-table-column property="day" label="状态存在时间" align="center"></el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope"><!-- v-if="detai"-->
									<el-button size="mini" type="text" class="compview"
									           @click="onBtnDetailClick(scope.row)" property="id">详情
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="page block">
							<el-pagination background layout="prev, pager, next" :page-size="8" :total="totalt" :current-page.sync="currentPage2" @current-change="yyt"></el-pagination>
						</div>
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
                activeName: 'first',
                keyWord: '',
                keyWordt: '',
                formInlinematch: {//发单
                    orderNumber: '',
                    uerName: '',
                    publishDate: '',
                    orderType: '',
                    provincesId: '',
                    cityId:'',
                    status: '',
                    industry: ''
                },
                //联动菜单数据
                options2: [],
                kk: [],
                formInlinematcht: {//接单
                    orderNumber: '',
                    uerName: '',
                    publishDate: '',
                    orderType: '',
                    // provincesId: '',
                    provincesId: '',
                    cityId:'',
                    status: '',
                    industry: ''
                },
                //联动菜单数据
                options3: [],
                kk3: [],
                publishDate: '',
                tableData: [],
                tableDatat: [],
                currentRow: null,
                total: 0,
                pageNum: 1,
                temp: '',
                flag:false,
                totalt: 0,
                pageNumt: 1,
                tempt: '',
	            flagt:false,
                detai:false,//操作权限
                loading: true,//发布
                currentPage1: 1,//发布 恢复第1页
                loading2: true,//接单
                currentPage2: 1,//接单 恢复第1页
            }
        },
        created: function() {
            let vm = this
            this.getInvestmentList()
            this.getInvestmentListt()
            //操作权限
            let menu = JSON.parse(window.sessionStorage.getItem('menu'))
            menu.forEach((item)=>{
                if(item.name == '用户管理'){
                    item.children.forEach((item)=>{
                        if(item.path == this.$route.path){
                            item.operations.forEach((item)=>{
                                if(item.operationName == '详情'){
                                    this.detai = true
                                }
                            })
                        }
                    })
                }
            });
            //初始化加载地区接口
            API.area(this.$route.path.split('/')[4]).then( result => {
                if(result.code == 200 && result.data != null){
                    //发单
                    this.$data.options2 = result.data
                    this.$data.options2.forEach(item => {
                        item.label = item.province //获取的数据
                        item.value = item.provinceid
                        if(item.children.length != 0){
                            item.children.forEach( itS =>{
                                itS.label = itS.city
                                itS.value = itS.cityid
                            })
                        }
                    })
                    //接单
                    this.$data.options3 = result.data
                    this.$data.options3.forEach(item => {
                        item.label = item.province //获取的数据
                        item.value = item.provinceid
                        if(item.children.length != 0){
                            item.children.forEach( itS =>{
                                itS.label = itS.city
                                itS.value = itS.cityid
                            })
                        }
                    })
                }
            })
        },
        components: {},
        mounted () {},
        methods: {
            //加载提示框
            msg(type,txt){
                this.$message[type]({
                    message: txt,
                    showClose: true,
                    duration: 200
                })
            },
            //联动菜单 动态加载
            handleItemChange(val) {
                if(val[0] === undefined ){
                    val[0] = ""
                }
                if(val[1] === undefined ){
                    val[1] = ""
                }
                this.$data.formInlinematch.provincesId = val[0]
                this.$data.formInlinematch.cityId = val[1]
            },
            //联动菜单 动态加载
            handleItemChange3(val) {
                if(val[0] === undefined ){
                    val[0] = ""
                }
                if(val[1] === undefined ){
                    val[1] = ""
                }
                this.$data.formInlinematcht.provincesId = val[0]
                this.$data.formInlinematcht.cityId = val[1]
            },
            //tab 切换
            handleClick(tab, event) {
                if(this.$data.activeName == "first"){
                    this.getInvestmentList()
                }else if(this.$data.activeName == "second"){
                    this.getInvestmentListt()
                }
            },
	        //发布-搜索
            dsearchInfo() {
                this.$data.flag = true
                this.$data.currentPage1 = 1
                var searDa = '&pageSize=8&pageNum='+this.pageNum+'&keyWord=' + this.$data.keyWord
                API.allRequirement("?userId=" + this.$route.path.split('/')[4] + searDa).then( result => {
                    if(result.code == 200 && result.data != null){
                        this.total = parseInt(result.data.total)
                        this.tableData = result.data.list
                    }
                })
            },
	        //发布-提交查询
            onSubmit () {
                this.$data.temp = ''
                this.$data.flag = false
                this.$data.currentPage1 = 1
                for(let item in this.formInlinematch){
                    if(this.formInlinematch[item]!='' && this.formInlinematch[item] != 'NaN-NaN-NaN NaN:NaN:NaN' ){
                        this.$data.temp +=`&${item}=${this.formInlinematch[item]}`
                    }
                }
                var o  =this.$data.pageNum + this.$data.temp
                this.getInvestmentList(o)
            },
	        //发布-重置
            resetForm (ruleForm) {
                this.$refs[ruleForm].resetFields();
                this.$data.publishDate=""
                this.$data.temp = ""
	            this.$data.keyWord = ""
	            this.$data.formInlinematch.provincesId = ""
                this.$data.formInlinematch.cityId = ""
	            this.kk = []
                this.$data.currentPage1 = 1
                this.getInvestmentList()
            },
	        //接单-搜索
            dsearchInfo2(){
                this.$data.flagt = true
                this.$data.currentPage2 = 1
                var searDat = '&pageSize=8&pageNum='+this.pageNumt+'&keyWord=' + this.$data.keyWordt
                API.allOrderByKeyWord("?userId=" + this.$route.path.split('/')[4] + searDat).then( result => {
                    if(result.code == 200 && result.data != null){
                        this.totalt = parseInt(result.data.total)
                        this.tableDatat = result.data.list
                        result.data.list.forEach( item => {
                            if(item.day == "0"){
                                item.day = item.hour + "小时"+ item.min + "分钟"
                            }else if(item.day != "0"){
                                item.day = item.day + "天" + item.hour + "小时" + item.min + "分钟"
                            }else if(item.hour == "0"){
                                item.day = item.day + "天" + item.min + "分钟"
                            }else if(item.min == "0"){
                                item.day = item.day + "天" + item.hour + "小时"
                            }else if(item.min != "0"){
                                item.day = item.day + "天" + item.hour + "小时" + item.min + "分钟"
                            }
                        })
                    }
                })
            },
	        //接单-提交查询
            onSubmitt () {
                this.$data.tempt = ''
                this.$data.flagt = false
                this.$data.currentPage2 = 1
                for(let item in this.formInlinematcht){
                    if(this.formInlinematcht[item]!='' && this.formInlinematcht[item] != 'NaN-NaN-NaN NaN:NaN:NaN' ){
                        this.$data.tempt +=`&${item}=${this.formInlinematcht[item]}`
                    }
                }
                var ot  =this.$data.pageNumt + this.$data.tempt
                this.getInvestmentListt(ot)
            },
	        //接单-重置
            resetFormt (ruleFormt) {
                this.$refs[ruleFormt].resetFields();
                this.$data.publishDate=""
                this.$data.tempt = ""
	            this.$data.keyWordt = ""
	            this.$data.formInlinematcht.provincesId = ""
                this.$data.formInlinematcht.cityId = ""
	            this.kk3 = []
                this.$data.currentPage2 = 1
                this.getInvestmentListt()
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
                //根据订单类型名称判断进行跳转
                if(row.typeName == "投融信息"){
                    this.$store.commit('save_detail_info', row)
                    this.$router.push({
                        path: `/orderManagement/message`
                    })
                }else if(row.typeName == "投后管理" || row.typeName == "高端定制" || row.typeName == "尽职调查"){
                    this.$store.commit('save_detail_info', row)
                    this.$router.push({
                        path: `/orderManagement/demand`
                    })
                }
            },
	        //发布-数据列表
            getInvestmentList (paramStr=this.pageNum) {
                let vm = this
	            vm.loading = true
	            API.allReleaseOrder("?userId=" + this.$route.path.split('/')[4] + "&pageSize=8&pageNum="+paramStr).then(result => {
                    vm.loading = false
		            if(result.code == 200 && result.data != null){
                        vm.total = parseInt(result.data.total)
                        vm.tableData = result.data.list
		            }else{
                        vm.loading = false
			            vm.msg('error','发布数据列表获取失败')
		            }
                },error => {
                    vm.loading = false
                    vm.msg('error','服务器错误')
	            });
                return true
            },
	        //接单-数据列表
            getInvestmentListt (paramStrt=this.pageNumt) {
                let vm = this
	            vm.loading2 = true
                API.allOrder(this.$route.path.split('/')[4] + "?pageSize=8&pageNum="+paramStrt).then( result => {
                    vm.loading2 = false
	                if(result.code == 200 && result.data != null){
                        vm.totalt = parseInt(result.data.total)
                        vm.tableDatat = result.data.list
		                result.data.list.forEach( item => {
		                    if(item.day == "0"){
		                        item.day = item.hour + "小时"+ item.min + "分钟"
		                    }else if(item.day != "0"){
                                item.day = item.day + "天" + item.hour + "小时" + item.min + "分钟"
		                    }else if(item.hour == "0"){
                                item.day = item.day + "天" + item.min + "分钟"
		                    }else if(item.min == "0"){
                                item.day = item.day + "天" + item.hour + "小时"
		                    }else if(item.min != "0"){
                                item.day = item.day + "天" + item.hour + "小时" + item.min + "分钟"
		                    }
		                })
	                }else{
                        vm.loading2 = false
		                vm.msg('error','接单数据列表加载失败')
	                }
                },error => {
                    vm.loading2 = false
                    vm.msg('error','服务器错误')
                });
                return true
            },
	        //发布-分页
            yy(val){
                if(this.$data.flag==false){
                    this.$data.pageNum = val
                    if(this.$data.temp === ""){
                        this.getInvestmentList(this.$data.pageNum)
                    }else{
                        var o = this.$data.pageNum + this.$data.temp
                        this.getInvestmentList(o)
                    }
                }else {
                    this.pageNum = val
                    var searDa = '&pageSize=8&pageNum='+this.pageNum+'&keyWord=' + this.$data.keyWord
                    API.allRequirement("?userId=" + this.$route.path.split('/')[4] + searDa).then( result => {
                        if(result.code == 200 && result.data != null){
                            this.total = parseInt(result.data.total)
                            this.tableData = result.data.list
                        }
                    })
                }
            },
	        //接单-分页
	        yyt(val){
                if(this.$data.flagt==false){
                    this.$data.pageNumt = val
                    if(this.$data.tempt ===""){
                        this.getInvestmentListt(this.$data.pageNumt)
                    }else{
                        var ot  =this.$data.pageNumt + this.$data.tempt
                        this.getInvestmentListt(ot)
                    }
                }else {
                    this.pageNumt = val
                    var searDat = '&pageSize=8&pageNum='+this.pageNumt+'&keyWord=' + this.$data.keyWordt
                    API.allOrderByKeyWord("?userId=" + this.$route.path.split('/')[4] + searDat).then( result => {
                        if(result.code == 200 && result.data != null){
                            this.totalt = parseInt(result.data.total)
                            this.tableDatat = result.data.list
                            result.data.list.forEach( item => {
                                if(item.day == "0"){
                                    item.day = item.hour + "小时"+ item.min + "分钟"
                                }else if(item.day != "0"){
                                    item.day = item.day + "天" + item.hour + "小时" + item.min + "分钟"
                                }else if(item.hour == "0"){
                                    item.day = item.day + "天" + item.min + "分钟"
                                }else if(item.min == "0"){
                                    item.day = item.day + "天" + item.hour + "小时"
                                }else if(item.min != "0"){
                                    item.day = item.day + "天" + item.hour + "小时" + item.min + "分钟"
                                }
                            })
                        }
                    })
                }
	        }
        },
        computed: {},
        watch: {
            publishDate : function(newVal){
                this.formInlinematch.publishDate = this.$root.$options.filters.dateFormat2(newVal)
                this.formInlinematcht.publishDate = this.$root.$options.filters.dateFormat2(newVal)
                return
            }
        }
    }
</script>
<style lang="scss">
	/*发布订单状态*/
	.comptaS{
		.success {
			color: #67C23A;
		}
		.warning {
			color: #E6A23C;
		}
		.danger {
			color: #F56C6C;
		}
	}
	/*接单订单状态*/
	.comptaST{
		.successt {
			color: #67C23A;
		}
		.warningt,.hh {
			color: #E6A23C;
		}
		.dangert {
			color: #F56C6C;
		}
	}
</style>
<style scoped>
	/*右侧主体部分*/
	.comptabchanGe{
		margin-left:20px;
		width:98%;
	}
	.compform {
		background: #fff;
	}
	.compuu{
		margin-top:5px;
		margin-bottom:30px;
	}
	.compss .el-form-item__content button {
		width:100px;
		height:35px;
		border:1px solid #999999;
		border-radius:0px;
		margin-top:8px;
		margin-left: -4px
	}
	.compname, .compqq, .compuserName,.compcreateTime {
		margin-bottom: 0px;
	}
	.compname{
		width:33%;
	}
	.compqq{
		width:20%;
	}
	.compuserName,.compcreateTime{
		width:30%;
	}
	.compss .el-button,.compbtn .el-button{
		background: #4A4F63;
		color: white;
		padding: 7px 20px;
	}
	.compbtn{
		margin:0 auto;
		margin-top:40px;
		margin-bottom:20px;
	}
	.compbuttonInput{
		width:126px;
		height:35px;
	}
	.compbuttonInput_left{
		margin-right:70px;
	}
	.comptaS,.comptaST {
		margin-top:10px;
		background: #fff;
		margin-bottom: 50px;
	}
	.comptableSt {
		width:100%;
	}
	.compview{
		color: #3388FF;
		padding: 0px;
	}
	.page {
		float: right;
		background: #fff;
		color: #E34E42;
		margin-top: 10px;
	}
	@media screen and (max-width:1299px) {
		.comadd{
			margin-top:30px;
		}
	}
	@media screen and (min-width: 1300px) {
		.boxRight{
			width:74%;
		}
		.compform{
			height:auto;
		}
		.compname{
			margin-bottom: 0px;
			width:20% !important;
		}
		.compuserName{
			width:15% !important;
		}
		.compqq{
			width:14% !important;
		}
		.compcreateTime{
			width:15% !important;
		}
		.compview{
			padding: 12px 20px;
		}
		.comptableSt {
			margin:0 auto;
			margin-top: 20px;
			width:98%;
		}
		.page{
			margin-right:10px;
		}
	}
</style>


<style>
	/*处理tab标签切换的样式*/
	.comptabchanGe .el-tabs__header .el-tabs__item.is-active {
		background: transparent;
		color: #409EFF;
	}
	.comptabchanGe .el-tabs__header .el-tabs__item.is-active:hover {
		color: #409EFF;
	}
	.comptabchanGe .el-tabs__header .el-tabs__item {
		color: #373d41;
	}
	.comptabchanGe .el-tabs__header .el-tabs__item:hover {
		color: #409EFF;
	}
	.comptabchanGe .el-tabs__content{
		display: block;
	}

	/*表单*/
	.compsearchInput .el-input__inner{
		width: 400px;
		height: 35px;
		border: 1px solid #999999;
		border-radius: 0px;
	}
	.compname .el-form-item__content{
		width:76%;
	}
	.compuserName .el-form-item__content{
		width:72%;
	}
	.compqq .el-form-item__content{
		width:67%;
	}
	.compform .el-input__inner{
		border-radius:0px;
	}
	.compform .el-date-editor.el-input,
	.compform .el-date-editor.el-input__inner{
		width:140px;
	}

	/*表格隔行换色*/
	.has-gutter tr, .el-table .success-row {
		background: #F3F4F7;
	}
</style>