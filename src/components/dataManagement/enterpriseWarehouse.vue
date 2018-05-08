<!--企业库--全部信息-->
<template>
	<div>
		<el-form :inline="true" class="demo-form-inline docuform" @submit.native.prevent v-if="showOn">
			<img src="/src/assets/logo.png" style="display:block;margin:0 auto;margin-top:200px;"/>
			<el-form-item class="docuuu">
				<el-col :span="20">
					<el-input size="mini" v-model="impKeyWord" placeholder="输入你想搜索的内容" class="dddddd" clearable ></el-input>
				</el-col>
				<el-col :span="4">
					<el-button icon="el-icon-search" type="primary" size="mini" @click="dsearchInfo1">搜索</el-button>
				</el-col>
			</el-form-item>
		</el-form>
		<div v-else>
			<div class="taletaS">
				<p class="title"><em>|</em> 信息筛选</p>
				<el-form :inline="true" class="demo-form-inline taleform" @submit.native.prevent>
					<el-form-item class="taleuu">
						<el-input size="mini" v-model="keyWord" placeholder="输入你想搜索的内容"></el-input>
					</el-form-item>
					<el-form-item class="talebtn">
						<el-button icon="el-icon-search" size="mini" @click="dsearchInfo2">搜索</el-button>
					</el-form-item>
				</el-form>
				<el-date-picker v-model="value4" type="datetimerange" clearable range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :editable= false></el-date-picker>
				<em style="font-style:normal;word-spacing: 20px;">
					<span @click='todayT("1")' style="margin-left:20px;cursor:pointer;" :class="tj0 ? 'tod': '' ">今日</span> <span @click='todayT("2")' style="cursor:pointer;" :class="tj1 ? 'tod': '' ">昨日</span>
					<span @click='todayT("7")' style="cursor:pointer;" :class="tj2 ? 'tod': '' ">最近7天</span> <span @click='todayT("30")' style="cursor:pointer;" :class="tj3 ? 'tod': '' ">最近30天</span>
				</em>
				<el-form :inline="true" class="demo-form-inline" name="ruleForm" :model="ruleForm" ref="ruleForm" style="display: inline-block;vertical-align: top;margin-left: 10px;">
					<el-form-item class="regld" label="地区" prop="city">
						<el-cascader v-model="kk" :options="options2" change-on-select clearable @change="handleItemChange"></el-cascader>
					</el-form-item>
				</el-form>
				<div style="text-align:center;" class="talecent">
					<el-button size="mini" class="talebuttonInput talebuttonInput_left" @click="onSubmit">查询</el-button>
					<el-button size="mini" class="talebuttonInput" @click="resetForm('ruleForm')">重置</el-button>
				</div>
			</div>
			<hr class="hrLinek"/>
			<div class="listS">
				<p class="num" v-model="total">找到相关结果&nbsp;{{total}}&nbsp;个</p>
				<!--表格 updateTime  和 TIme -->
				<el-table :data="tableData" v-loading="loading" style="width: 100%;" class="taletableS" align="center" :show-header="false" @row-click="rowClick">
					<el-table-column prop="username" label="标题" width="560" align="left"></el-table-column>
					<el-table-column prop="time" label="时间" width="170" align="right"></el-table-column>
					<el-table-column prop="address" label="地区" width="120" align="right"></el-table-column>
				</el-table>
				<el-pagination background layout="prev, pager, next" :page-size="10" :total="total"  @current-change="yy" :current-page.sync="currentPage1" style="margin-top:20px;"></el-pagination>
			</div>
			<!--点击某一行 展示公司简介-->
			<el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false">
				<el-form>
					<el-form-item label="公司简介" label-width="120px">
						<p>{{togecontent}}</p>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data() {
            return {
                impKeyWord: '',//百度搜索
                keyWord: '',
                value4: [],//类似于联动菜单
                timeStart:'',//开始时间
                timeEnd:'',//结束时间
                num:'',
                tableData: [],//表格数据
                currentRow: null,
                total: 0,
                pageNum: 1,
                currentPage1: 1,//恢复第1页
                parm: '',//今天 昨天
                ruleForm:{
                    province: '',//省市 要传的 文字
                    city: ''
                },
	            searflag: false,//入口搜索 页面搜索
                flag:false,//页面 搜索 或 查询
                options2: [],//联动菜单数据
                kk:[],
                showOn: true,//展示与否
                dialogFormVisible: false,//点击任意行弹出对话框
                togecontent: '',
                loading: true,
                tj0: true,//给当前点击的按钮设置为真
                tj1: false,
                tj2: false,
                tj3: false,
            }
        },
        created () {
            //初始化加载地区接口
            API.area(this.$route.path.split('/')[2]).then( result => {
                if(result.code == 200 && result.data != null){
                    this.$data.options2 = result.data
                    this.$data.options2.forEach(item => {
                        item.label = item.province
                        item.value = item.province
                        if(item.children.length != 0){
                            item.children.forEach( itS =>{
                                itS.label = itS.city
                                itS.value = itS.city
                            })
                        }
                    })
                }
            })
        },
        computed:{

        },
        methods:{
            //加载消息提示框
            msg(type, txt) {
                this.$message[type]({
                    showClose: true,
                    message: txt,
                    duration: 2000
                });
            },
            //点击非弹框区域 取消关闭
            ai_dialog_close(){},
	        //查看弹框信息
            rowClick(row,event,column){//userId
		        this.dialogFormVisible = true
                let vm = this
                API.basicCompanyInfo(row.userId).then(function (result) {
                    if(result.code == 200  && result.data != null){
                        vm.togecontent = result.data.intro
                    }
                });
	        },
            //联动菜单 动态加载
            handleItemChange(val) {
                if(val[0] === undefined ){
                    val[0] = ""
                }
                if(val[1] === undefined ){
                    val[1] = ""
                }
                this.$data.ruleForm.province = val[0]
                this.$data.ruleForm.city = val[1]
            },
            //百度搜索
            dsearchInfo1(){
                //正则判断空格
                var regu = /^ +| +$/g; // 匹配空格
                if(regu.test(this.$data.impKeyWord)){
	                alert("请输入合理的字符")
                    return false;
                }
                this.$data.searflag = true
                if(this.$data.impKeyWord == "" || this.$data.impKeyWord == null){
                    alert("请输入要搜索的内容")
                }else{
                    this.$data.showOn = false
                    var talentDa = '?pageSize=10&pageNum='+this.pageNum+'&keyWord=' + this.$data.impKeyWord
                    API.talentLibrary(talentDa).then( result => {
                        this.loading = false
                        if(result.code == "200" && result.data != null){
                            this.total = parseInt(result.data.total)
                            this.tableData = result.data.list
                        }
                    })
                }
            },
            //搜索
            dsearchInfo2(){
                this.$data.flag = true
	            this.$data.searflag = false
                this.$data.currentPage1 = 1
                var talentDa = '?pageSize=10&pageNum='+this.pageNum+'&keyWord=' + this.$data.keyWord
                API.enterpriseLibrary(talentDa).then( result => {
                    if(result.code == "200" && result.data != null){
                        this.total = parseInt(result.data.total)
                        this.tableData = result.data.list
	                    result.data.list.forEach( item => {
		                    var res = item.test.split("，")
		                    var status = res[0].split(":")
							var username = res[1].split(":")
                            var address = res[5].split(":")
                            var timeY = res[6].split(":")
		                    var statusValue = status[1]
		                    var usernameValue = username[1]
                            var addressValue = address[1]
                            var timeYValue = timeY[1]
		                    item.status = statusValue //把取到的值 赋给 表格的字段
		                    item.username = usernameValue
		                    item.time = timeYValue
                            item.address = addressValue
		                    return
                        })
                    }
                })
            },
            //查询
            onSubmit(){
                this.$data.flag = false
                this.$data.currentPage1 = 1
                var o  =this.$data.pageNum
                this.getInvestmentList(o)
            },
            //重置
            resetForm(ruleForm){
                this.$data.flag = false
                this.$refs[ruleForm].resetFields();
                this.$data.keyWord = ""
                this.$data.ruleForm.province = ""//文字
                this.$data.ruleForm.city = ""
                this.$data.timeStart = ""
                this.$data.timeEnd = ""
                this.$data.value4 = ""
                this.$data.kk = []
                this.$data.currentPage1 = 1
                this.getInvestmentList()//回到初始状态
            },
            //开始时间  结束时间 数据列表
            getInvestmentList(paramStr=this.pageNum){
                if(this.$data.ruleForm.province != null && this.$data.ruleForm.province != undefined && this.$data.ruleForm.province != ""){
                    this.$data.ruleForm.province = this.$data.ruleForm.province
                }
                if(this.$data.ruleForm.city != null && this.$data.ruleForm.city != undefined && this.$data.ruleForm.city != ""){
                    this.$data.ruleForm.province = this.$data.ruleForm.province + this.$data.ruleForm.city
                }
                //对开始时间结束时间的处理
                if(this.$data.timeStart == 'NaN-NaN-NaN NaN:NaN:NaN' || this.$data.timeStart == undefined || this.$data.timeStart == null || this.$data.timeStart == false){
                    this.$data.timeStart = ''
                }
                if(this.$data.timeEnd == 'NaN-NaN-NaN NaN:NaN:NaN' || this.$data.timeEnd == undefined  || this.$data.timeEnd == null || this.$data.timeEnd == false){
                    this.$data.timeEnd = ''
                }
                let vm = this
                vm.loading = true
                let deparam2 = '?pageNum='+paramStr+'&pageSize=10&startTime='+ this.$data.timeStart +'&endTime='+this.$data.timeEnd+'&address='+this.$data.ruleForm.province
                API.resourceLibraryDateStartTimeEndTimeQiYe(deparam2).then( result => {
                    vm.loading = false
                    if(result.code == 200 && result.data != null){
                        this.total = parseInt(result.data.total)
                        this.tableData = result.data.list
                    }else{
                        vm.loading = false
                        vm.msg('error', '数据列表获取失败');
                    }
                },error => { //数据加载不出来时调用
                    vm.loading = false
                    vm.msg('error','服务器错误')
                })
            },
            //今天 昨天 最近7天 最近30天
            todayT(parm){
                this.$data.flag = true
                this.$data.parm = parm
                if(parm == "1"){
                    this.tj0 = true
                    this.tj1 = false
                    this.tj2 = false
                    this.tj3 = false
                }else if(parm == "2"){
                    this.tj1 = true
                    this.tj0 = false
                    this.tj2 = false
                    this.tj3 = false
                }else if(parm == "7"){
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
                this.getInvestmentList2()
            },
            //今天 昨天 数据列表
            getInvestmentList2(paramStr=this.pageNum){
                var parms = '?pageSize=10&pageNum='+paramStr+'&dateStateld=' + this.$data.parm
                API.resourceLibraryTimeSelectDataQiYe(parms).then( result =>{
                    if(result.code == 200 && result.data != null){
                        this.$data.total = parseInt(result.data.total)
                        this.$data.tableData = result.data.list
                    }
                })
            },
            //分页
            yy(val){
                if(this.$data.flag==false){
                    this.$data.pageNum = val
                    var o = this.$data.pageNum
                    this.getInvestmentList(o)
                }else {
                    this.pageNum = val
                    //搜索
                    var talentDa = '?pageSize=10&pageNum='+this.pageNum+'&keyWord=' + this.$data.keyWord
                    API.enterpriseLibrary(talentDa).then( result => {
                        if(result.code == "200" && result.data != null){
                            this.total = parseInt(result.data.total)
                            this.tableData = result.data.list
                            if(result.code == "200" && result.data != null){
                                this.total = parseInt(result.data.total)
                                this.tableData = result.data.list
                                result.data.list.forEach( item => {
                                    var res = item.test.split("，")
                                    var status = res[0].split(":")
                                    var username = res[1].split(":")
                                    var address = res[5].split(":")
                                    var timeY = res[6].split(":")
                                    var statusValue = status[1]
                                    var usernameValue = username[1]
                                    var addressValue = address[1]
                                    var timeYValue = timeY[1]
                                    item.status = statusValue //把取到的值 赋给 表格的字段
                                    item.username = usernameValue //把取到的值 赋给 表格的字段
                                    item.time = timeYValue
                                    item.address = addressValue
                                    return
                                })
                            }
                        }
                    })
                }
            },
        },
        //时间
        watch: {
            value4: function(newVal){
                if(newVal != null ){
                    this.$data.timeStart = this.$root.$options.filters.dateFormat(newVal[0])
                    this.$data.timeEnd = this.$root.$options.filters.dateFormat(newVal[1])
                    return
                }
            }
        }
    }
</script>
<style lang="scss" scope>
	/*今日 昨日点击切换颜色*/
	.tod{
		color:blue;cursor:pointer;
	}
	.docuform{
		background: #fff;
		.docuuu{
			margin-top:20px;
			margin-bottom:30px;
			display: block;
			margin:0 auto;
			width:500px;
		}
		.docuuu .el-form-item__content,
		.docubtn .el-form-item__content{
			line-height:normal;
		}
		.docuuu .el-input__inner{
			height: 35px;
			border: 1px solid #999999;
			border-radius: 0px;
		}
		.docubtn{
			margin-right:0px;
		}
		.docubtn .el-form-item__content button {
			width:100px;
			height:35px;
			border-radius:0px;
			margin-top:19px;
			margin-left: -4px
		}
		.el-form-item__content{
			width:500px;
		}
		button.el-button{
			padding: 10.5px 20px;
			border-radius:0px;
		}
	}
	.taletaS {
		background: #fff;
		.el-date-editor.el-input,
		.el-date-editor.el-input__inner{
			width:350px;
		}
		.taleuu{
			margin-top:20px;
			margin-bottom:30px;
			.el-form-item__content{
				line-height:normal;
			}
			.el-input__inner{
				width: 300px;
				height: 35px;
				border: 1px solid #999999;
				border-radius: 0px;
			}
		}
		.el-input__inner{
			border-radius: 0px;
		}
		.talebtn{
			margin-right:0px;
			.el-form-item__content{
				line-height:normal;
			}
			button {
				width:100px;
				height:35px;
				border:1px solid #999999;
				border-radius:0px;
				margin-top:19px;
				margin-left: -4px
			}
			button.el-button{
				background: #4A4F63;
				color: white;
				padding: 7px 20px;
			}
		}
		.title {
			color: #858DAD;
			margin-top: 0px;
			font-size:16px;
			margin-bottom:0px;
			em {
				color: #88B7E0;
				margin-right: 10px;
			}
		}
		/*地区*/
		.regld .el-form-item__content{
			width:200px;
		}
		.regla .el-form-item__content{
			width:250px;
		}
		.regla .el-select{
			width:120px;
		}

		.talecent{
			margin:0 auto;
			margin-top:40px;
			margin-bottom:20px;
			.el-button {
				background: #4A4F63;
				color: white;
				padding: 7px 20px;
			}
			.talebuttonInput{
				width:126px;
				height:35px;
			}
			.talebuttonInput_left{
				margin-right:70px;
			}
		}
	}
	//表单 与 表格  中间的分割线
	hr.hrLinek{
		height: 10px;
		background: #f3f4f7;
		border: none;
		margin-left: -35px;
		margin-right: -35px;
		margin-top: 20px;
	}
	.listS{
		.num{
			color:#A0A0A0;
			margin-top:0px;
			margin-bottom:0px;
		}
	}
	ul li{
		list-style: none;
		list-style-position:outside;
	}
</style>
<style>
	.el-table td, .el-table th.is-leaf{
		border-bottom:1px solid white!important;
	}
	.el-table__body-wrapper{
		border: 1px solid white;
		z-index: 999;
	}
	.el-table__row:hover{
		background:white!important;
	}
</style>