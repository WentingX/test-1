<!--撮合信息 左边样式 此页面改了 均没有改-->
<template>
	<div style="clear:both;">
			<el-form :inline="true" name="ruleForm" ref="ruleForm" :model="formInlinematch" class="demo-form-inline matchform">
				<p class="filter">筛选</p>
				<hr color="#556191" class="hrline" />
				<div class="matchinputText">
					<el-form-item class="matchuu" prop="user">
						<el-input size="mini" v-model="keyWord" placeholder="输入你想搜索的内容"
						          class="matchsearchInput"></el-input>
					</el-form-item>
					<el-form-item class="matchss">
						<el-button icon="el-icon-search" size="mini" @click="dsearchInfo">搜索</el-button>
					</el-form-item>
					<br/>
					<el-form-item class="matchqq" label="所属行业" prop="industry">
						<el-select size="mini" v-model="formInlinematch.industry">
							<el-option label="金融" value="shanghai"></el-option>
							<el-option label="互联网" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="matchqq" label="所在地区" prop="provincesId">
						<el-cascader v-model="kk" :options="options2" change-on-select clearable @change="handleItemChange"></el-cascader>
					</el-form-item>
					<el-form-item class="matchqq" label="订单状态" prop="orderStatus">
						<el-select size="mini" v-model="formInlinematch.orderStatus">
							<el-option label="待撮合" value="1010"></el-option>
							<el-option label="撮合中" value="1012"></el-option>
							<el-option label="等待收益" value="1013"></el-option>
							<el-option label="财务审批" value="1014"></el-option>
							<el-option label="交易成功" value="1015"></el-option>
							<el-option label="撮合失败" value="-1013"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="matchqq" label="订单类型" prop="orderType">
						<el-select size="mini" v-model="formInlinematch.orderType">
							<el-option label="投融信息" value="0"></el-option>
							<el-option label="尽职调查" value="1"></el-option>
							<el-option label="投后管理" value="2"></el-option>
							<el-option label="高端定制" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="matchqq matchqq_last" label="创建时间" prop="publishDate">
						<el-date-picker	v-model="publishDate" type="date" :editable= false></el-date-picker>
					</el-form-item>
					<div style="text-align:center;" class="matchcentr">
						<el-button size="mini" class="matchbuttonInput matchbuttonInput_left" @click="onSubmit">查询</el-button>
						<el-button size="mini" class="matchbuttonInput" @click="resetForm('ruleForm')">重置</el-button>
					</div>
				</div>
			</el-form>
			<div class="matchtaS">
				<p class="filter">撮合信息</p>
				<hr color="#556191" class="hrlineT"/>
				<el-table :data="tableData" v-loading="loading" class="matchtableSt" :row-class-name="tableRowClassName">
					<el-table-column property="orderNumber" label="订单号" align="center"></el-table-column>
					<el-table-column property="projectName" label="标题" align="center"></el-table-column>
					<el-table-column property="publishDate" label="生成时间" align="center"></el-table-column>
					<el-table-column property="industry" label="行业" align="center" width="80"></el-table-column>
					<el-table-column property="rzqy" label="融方企业" align="center"></el-table-column>
					<el-table-column property="tzqy" label="投方企业" align="center"></el-table-column>
					<el-table-column property="province" label="地区" align="center"></el-table-column>
					<el-table-column property="status" label="订单状态" align="center">
						<template slot-scope="scope">
							<span :class="{'success': (scope.row.status === '交易成功'),'warning': (scope.row.status === '待撮合'),'warning': (scope.row.status === '撮合中'),'warning': (scope.row.status === '等待收益'),'warning': (scope.row.status === '财务审批'),'danger': (scope.row.status === '撮合失败')}">
								{{scope.row.status}}
							</span>
						</template>
					</el-table-column>
					<el-table-column property="employeeName" label="跟单员" align="center"></el-table-column>
					<el-table-column label="操作" align="center" property="isClose">
						<template slot-scope="scope">
							<el-button size="mini" type="text" class="compview"
							           @click="onBtnDetailClick(scope.row)" property="id">详情
							</el-button>
							<div><!-- v-if=star, forb-->
								<el-button v-if="scope.row.isClose === null" size="mini" type="text" class="matchdisabled"
								           @click="matchclose(scope.row)"  property="id">关闭订单</el-button>
								<el-button type="text" disabled class="matchdisabled" v-else-if="scope.row.isClose==0">已关闭</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="page block">
					<el-pagination background layout="prev, pager, next" :page-size="4" :total="total" :current-page.sync="currentPage1" @current-change="yy"></el-pagination>
				</div>
			</div>
		<!--关闭订单理由弹框-->
		<el-dialog title="订单关闭理由" :visible.sync="dialogVisible" :lock-scroll="false" :close-on-click-modal="false">
			<el-row :gutter="24" style="margin-top: 32px;margin-bottom: 20px;">
				<el-col :span="15" style="margin-left:150px;">
					<el-input clearable type="textarea" v-model="reason" resize="none"></el-input>
				</el-col>
				<el-col :span="4">
					<span style="color:red;">*此处需填写</span>
				</el-col>
			</el-row>
			<div>
				<el-row style="text-align:right;">
					<el-button size="mini" type="primary" @click="submitReason()">确定</el-button>
				</el-row>
			</div>
		</el-dialog>
	</div>
</template>
<script>
    import API from '@/api/api' //ES6中的模块化  import和export
    export default {
        data () {
            return {
                keyWord: '',
                formInlinematch: {
                    industry: '',
                    provincesId: '',
	                cityId:'',
                    orderStatus: '',
                    orderType: '',
                    publishDate: ''
                },
                //联动菜单数据
                options2: [],
	            kk: [],
                publishDate: '',
                tableData: [],
                currentRow: null,
                total: 0,
                pageNum: 1,
                temp: '',
	            flag:false,
                dialogVisible: false,//关闭订单弹框
                closeOrderdialog:{
                    order: null,
                },
                reason:'',
                star:false,//操作权限
                forb:false,
                loading: true,
                currentPage1: 1,//恢复第1页
            }
        },
        created: function() {
            this.getInvestmentList()
            //操作权限
            let menu = JSON.parse(window.sessionStorage.getItem('menu'))
            menu.forEach((item)=>{
                if(item.name == '用户管理'){
                    item.children.forEach((item)=>{
                        if(item.path == this.$route.path){
                            item.operations.forEach((item)=>{
                                if(item.operationName == '关闭订单'){
                                    this.star = true
                                }else if(item.operationName == '已关闭'){
                                    this.forb = true
                                }
                            })
                        }
                    })
                }
            });
            //初始化加载地区接口
            API.area(this.$route.path.split('/')[4]).then( result => {
                if(result.code == 200 && result.data != null){
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
                }
            })
        },
        components: {},
        mounted () {},
        methods: {
            //加载数据提示框
            msg(type,txt){
				this.$message[type]({
                    showClose: true,
                    message: txt,
                    duration: 2000
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
            //搜索
            dsearchInfo() {
                this.$data.flag = true
                this.$data.currentPage1 = 1
                var searDa = "?userId="+this.$route.path.split('/')[4]+'&pageSize=4&pageNum='+this.pageNum+'&keyWord=' + this.$data.keyWord
                API.matchingInfo(searDa).then( result => {
                    if(result.code == 200 && result.data != null){
                        this.total = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            if(item.province){
                                item.province=item.province + item.city
                            }
                            return item
                        })
                        this.tableData = result.data.list
                    }
                })
            },
            //查询
            onSubmit () {
                this.$data.temp = ""//防止点击多次按钮出现拼接
                this.$data.flag = false
                this.$data.currentPage1 = 1
                for(let item in this.formInlinematch){
                    if(this.formInlinematch[item]!='' && this.formInlinematch[item] != 'NaN-NaN-NaN NaN:NaN:NaN' ){
                        this.$data.temp +=`&${item}=${this.formInlinematch[item]}` //ES6中的模版表达式
                    }
                }
                var o  =this.$data.pageNum + this.$data.temp
                this.getInvestmentList(o)
            },
            //重置
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
            //隔行换色
            tableRowClassName ({row, rowIndex}) {
                if (rowIndex % 2 != 0) {
                    return 'success-row'
                }
                return ''
            },
            //点击跳转
            onBtnDetailClick (row) {
                sessionStorage.setItem("idch",JSON.stringify(this.$route.path.split('/')[4]));
                this.$store.commit('save_detail_info2', row)
                this.$router.push({
                    path: `/matchInformationdetails/mone/mtwo/mthree/${row.id}`
                })
            },
	        //点击关闭订单
            matchclose(row){
                this.$data.dialogVisible = true
                this.$data.closeOrderdialog.order = row  //ES6中的拆包表达式
            },
            //提交关闭订单理由
            submitReason(){
                let paro = this.$data.closeOrderdialog.order.id+`?status=${0}&reason=${this.$data.reason}`
	            let vm = this
	            if(this.reason == false){
                    this.$data.dialogVisible = true
                    vm.msg('error','请填写理由')
	            }else{
                    this.$data.dialogVisible = false
                    API.failMatching(paro).then(function(res){
                        if(res.data.code == "200"){
                            vm.$data.closeOrderdialog.order.isClose= 0;
                            vm.$data.closeOrderdialog.order.status ="撮合失败"
                        }
                    })
                    this.$data.reason = '' //关闭弹框的同时  让里面的内容清空
	            }
            },
            //数据展示
            getInvestmentList (paramStr=this.pageNum) {//ES6中的默认参数
                let vm = this //ES6中的块级作用域的let和const
	            vm.loading = true
                API.matchInfo(this.$route.path.split('/')[4]+'?pageSize=4&pageNum='+paramStr).then(result => {//ES6中的箭头函数
                    vm.loading = false
	                if(result.code == 200 && result.data != null){
                        vm.total = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            if(item.province){
                                item.province=item.province + item.city
                            }
                        })
                        vm.tableData=result.data.list
	                }else{
                        vm.loading = false
	                    vm.msg('error','数据列表获取失败')
	                }
                },error => {
                    vm.loading = false
                    this.msg('error','服务器错误')
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
                    var searDa = '?pageSize=4&pageNum='+this.pageNum+'&keyWord=' + this.$data.keyWord
                    API.matchingInfo(searDa).then( result => {
                        this.total = parseInt(result.data.total)
                        this.tableData = result.data.list
                    })
                }
            },
        },
        computed: {},
        //时间
        watch: {
            publishDate : function(newVal){
                this.formInlinematch.publishDate = this.$root.$options.filters.dateFormat2(newVal)
                return
            }
        }
    }
</script>
<style lang="scss">
	/*撮合状态*/
	.matchtaS{
		.matchtableSt{
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
	}
</style>
<style lang="scss" scope>
	/*右侧主体部分*/
	.boxRight {
		height: 840px;
		position:absolute;
		left:444px;
		width:61%;
	}
	.matchform {
		/*height: 220px;*/
		background: #fff;
		padding: 20px 0 0px 10px;
	}
	.matchform .filter,.matchtaS .filter {
		width: 35px;
		color: #3388FF;
		font-weight: bold;
		margin-top: 0;
		border-bottom: 5px solid #3388FF;
		padding-bottom: 10px;
		position: absolute;
		z-index: 222;
	}
	.matchform .hrline{
		margin-top:32px;
		position: absolute;
		z-index: 111;
		width: 96%;
		margin-left: 14px;
	}
	.matchtaS .hrlineT{
		margin-top:42px;
		margin-left:14px;
		position: absolute;
		z-index: 111;
		width: 98%;
	}
	.matchinputText {
		margin-top: 40px;
		width:99%;
	}

	.matchuu{
		margin-top:20px;
		margin-bottom:30px;
	}
	.matchuu .el-form-item__content,
	.matchss .el-form-item__content{
		line-height:normal;
	}
	.matchuu .el-input__inner{
		width: 400px;
		height: 35px;
		border: 1px solid #999999;
		border-radius: 0px;
	}
	.matchss{
		 margin-right:0px;
		 vertical-align:bottom;
	 }
	.matchss .el-form-item__content button {
		width:100px;
		height:35px;
		border:1px solid #999999;
		border-radius:0px;
		margin-top:19px;
		margin-left: -4px
	}
	.matchqq,.el-form-item{
		margin-bottom:30px;
		margin-right:40px;
	}
	.matchqq label{
		margin-left:30px;
		margin-right:20px;
	}
	.matchqq input.el-input__inner{
		width:140px;
		height:30px;
		border-radius:0px;
		border:1px solid #999999;
	}
	.matchqq_last{
		margin-bottom:0px;
	}
	.matchqq_last .el-date-editor.el-input, .el-date-editor.el-input__inner{
		width:140px;
	}
	.matchss .el-button,.matchcentr .el-button{
		background: #4A4F63;
		color: white;
		padding: 7px 20px;
	}
	.matchcentr{
		margin:0 auto;
		margin-top:40px;
		margin-bottom:20px;
	}
	.matchbuttonInput{
		width:126px;
		height:35px;
	}
	.matchbuttonInput_left{
		 margin-right:70px;
	}
	.matchtaS {
		margin-top: 10px;
		background: #fff;
		margin-bottom: 50px;
		background: #fff;
	}
	.matchtaS .filter {
		width: 70px;
		margin-left: 10px;
		margin-top: 10px;
		position: absolute;
		z-index: 222;
	}
	.matchtableSt {
		padding-top: 55px;
		width:99%;
		margin:0 auto;
	}
	.matchview,.matchdisabled{
		color: #3388FF;
		padding: 0px;
	}
	.matchdisabled {
		color: #E42626;
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
		.matchform{
			height:auto;
		}
		.matchss .el-form-item__content button{
			margin-left:10px;
		}
		.matchqq{
			margin-bottom: 0px;
			width:19%;
		}
		.matchqq .el-form-item__content{
			width:55%;
		}
		.matchform .hrline{
			width:96%;
			margin-left:17px;
		}
		.matchtaS .hrlineT{
			width:98%;
			margin-left:12px;
		}
		.matchview,.matchdisabled{
			padding: 12px 20px;
		}
	}
</style>