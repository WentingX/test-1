<!--新建通知-->
<template>
	<div>
		<p class="increasedhtitle"><em>|</em> 新建通知</p>
		<el-row :gutter="24" style="margin-right:0;padding-top: 30px;">
			<el-col :span="6" class="increasedfleft">
				<div class="grid-content"></div>
			</el-col>
			<el-col :span="18" class="increasedfright">
				<div class="grid-content">
					<el-radio-group v-model="inform">
						<el-radio label="0">系统通知</el-radio>
						<el-radio label="1">交易通知</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			<el-col :span="6" class="increasedfleft">
				<div class="grid-content">标题：</div>
			</el-col>
			<el-col :span="18" class="increasedfright">
				<div class="grid-content">
					<el-input size="mini" class="increasedtextInput" v-model="notifytitle">{{notifytitle}}</el-input>
				</div>
			</el-col>
			<el-col :span="6" class="increasedfleft increasedhheight">
				<div class="grid-content">内容：</div>
			</el-col>
			<el-col :span="18" class="increasedfright increasedhheight">
				<div class="grid-content">
					<el-input type="textarea" :rows="9" class="increasedtextInput" v-model="notifycontent">{{notifycontent}}</el-input>
				</div>
			</el-col>
			<el-col :span="6" class="increasedfleft">
				<div class="grid-content">推送角色：</div>
			</el-col>
			<el-col :span="18" class="increasedfright">
				<div class="grid-content">
					<el-radio-group v-model="pushrole" :disabled="disabled">
						<el-radio label="0">所有用户</el-radio>
						<el-radio label="1">接单方</el-radio>
						<el-radio label="2">信息方</el-radio>
						<el-radio label="3">需求方</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			<el-col :span="6" class="increasedfleft increaseddheight">
				<div class="grid-content">定时发送：</div>
			</el-col>
			<el-col :span="18" class="increasedfright increaseddheight">
				<div class="grid-content">
					<el-radio-group v-model="radio">
						<el-radio :label="3" @change="ljTime">立即发送</el-radio>
						<el-radio :label="6" @change="ljTime2">定时发送</el-radio>
					</el-radio-group>
					<p v-if="zhans">{{aa}}</p>
					<el-date-picker v-else	v-model="publishDate" value-format="yyyy-MM-dd HH:mm:00"
					                placeholder="选择日期时间" :editable="false" type="datetime" style="display: block;"></el-date-picker>
				</div>
			</el-col>
			<div style="margin:0 auto;text-align:center;" class="increasedbtn">
				<el-button v-bind:class="{ 'disincreasedbuttonInput' : isA}" type="info" style="margin-right:50px;" @click="insertDa" :disabled="disabled">确定</el-button>
				<el-button @click="fn()">指定推送</el-button>
			</div>
		</el-row>
		<!--点击指定发送 展示内容-->
		<div class="increasedtaS" v-if="willShow">
			<p class="increasedhtitle"><em>|</em> 指定推送</p>
			<el-row>
				<el-col :span="9">
					<div class="grid-content">
						<el-form :model="form">
							<el-form-item label="手机号码" label-width="80px" class="increasedoInput">
								<el-input size="mini" v-model="form.telephone" placeholder="请输入手机号码查询"></el-input>
								<el-button icon="el-icon-search" size="mini" class="increasedbuInput" @click="dsearchInfo">搜索</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content">
						<el-form :model="formhh" name="ruleForm" ref="ruleForm">
							<el-form-item label="地区" prop="city" label-width="50px" class="increasedtInput">
								<el-cascader v-model="kk" :options="options2" change-on-select clearable @change="handleItemChange"></el-cascader>
							</el-form-item>
						</el-form>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content">
						<el-form :model="form" name="ruleForm" ref="ruleForm">
							<el-form-item label="企业名称" label-width="80px" prop="company_name">
								<el-input size="mini" v-model="form.company_name" placeholder="南京市某某某某有限公司"></el-input>
							</el-form-item>
						</el-form>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content">
						<el-form :model="form" class="increasedfo">
							<el-button size="mini" class="increasedbuInput" @click="searchData">查询</el-button>
							<el-button size="mini" class="increasedbuInput" @click="resetForm('ruleForm')">重置</el-button>
						</el-form>
					</div>
				</el-col>
			</el-row>
			<el-table v-loading="loading" :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange"
			          style="width: 100%;text-align:center;" :row-class-name="tableRowClassName" @row-click="rowClick">
				<el-table-column property="name" label="姓名" align="center"></el-table-column>
				<el-table-column property="sex" label="性别" align="center"></el-table-column>
				<el-table-column property="province" label="所在地区" align="center"></el-table-column>
				<el-table-column property="telephone" label="手机号码" align="center"></el-table-column>
				<el-table-column property="company_name" label="企业名称" align="center"></el-table-column>
				<el-table-column label="操作" align="center" type="selection">操作</el-table-column>
			</el-table>
			<div style="margin:0 auto;text-align:right;margin-top:20px;" class="increasedb">
				<el-button size="mini" class="increasedbuInput" @click="toggleSelection(tableData)">全选</el-button>
			</div>
			<div class="page block increasedpag">
				<el-pagination background layout="prev, pager, next"  :page-size="3" :total="total" :current-page.sync="currentPage1" @current-change="yy"></el-pagination>
			</div>
			<div style="margin:0 auto;text-align:center;clear:both;" class="increasedbt">
				<el-button class="increasedbuttInput" @click="sendDa">发送</el-button>
			</div>
		</div>
	</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data() {
            return {
                inform: '0',
                notifytitle: '',
                notifycontent: '',
                pushrole: '0',
                radio: 3,//立即发送、定时发送
                aa: '',
                zhans: true,
                publishDate: '',
                willShow: false,
                form: {
                    telephone: '',
                    company_name: ''
                },
                formhh: {
                    provincesId: '',
                    citiesId: ''
                },
                tableData: [],
                currentRow: null,
                total: 0,
                pageNum: 1,
                temp: '',
                flag: false,//根据点击不同的按钮 处理分页
                multipleSelection: [],
                options2: [],//联动菜单数据
                kk: [],
                loading: true,//加载
                disabled: false,
                isA: false,
                currentPage1: 1,//恢复第1页
            };
        },
        created (){
            //初始化加载地区接口
            API.area(this.$route.path.split('/')[2]).then( result => {
                if(result.code == 200 && result.data != null){
                    this.$data.options2 = result.data
                    this.$data.options2.forEach(item => {
                        item.label = item.province
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
            //默认展示立即发送
            if(this.$data.radio == 3){
                var d = new Date();
                var year = d.getFullYear()
                var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1)
                var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
                var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
                var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
                var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds()
                var aa =  year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
                this.aa = aa
                this.zhans = true
            }
        },
        methods: {
            //加载提示框
	        msg(type,txt){
                this.$message[type]({
                    message: txt,
                    showClose: true,
                    duration: 2000
                })
	        },
            //点击显示的表格数据中的某一行  进入 该行对应的详情页
            rowClick(row,event,column){
                this.$store.commit('save_detail_info', row)
                this.$router.push({
                    path: `/userManagement/userM/test/${row.id}`
                })
            },
           //联动菜单 动态加载
            handleItemChange(val) {
                console.log(val)
                if(val[0] === undefined ){
                    val[0] = ""
                }
                if(val[1] === undefined ){
                    val[1] = ""
                }
                this.$data.formhh.provincesId = val[0]
                this.$data.formhh.citiesId = val[1]
            },
            //立即发送、定时发送
            ljTime(){
                if(this.$data.radio == 3){
                    var d = new Date();
                    var year = d.getFullYear()
                    var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1)
                    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
                    var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
                    var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
                    var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds()
                    var aa =  year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
                    this.aa = aa
                    this.zhans = true
                    this.$data.publishDate = ''
                }
            },
            ljTime2(){
                if(this.$data.radio == 6){
                    this.zhans = false
                    this.aa = ''
                }
            },
	        //确定
            insertDa(){
                this.$data.disabled = false
	            //有值的情况下 可以操作
                if((this.$data.inform && this.$data.notifytitle && this.$data.notifycontent && this.$data.pushrole) != '' && (this.$data.publishDate || this.$data.aa) != ''){
	                var aa = '?inform='+parseInt(this.$data.inform)+'&notifytitle='+this.$data.notifytitle+'&notifycontent='+this.$data.notifycontent
	                        +'&notifysender=系统管理员&notifydate='+(this.$data.publishDate || this.$data.aa) + '&pushrole='+parseInt(this.$data.pushrole)
                    //判断选中的日期 是否大于等于当前日期
	                var d = new Date();
                    var year = d.getFullYear()
                    var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1)
                    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
                    var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
                    var sj =  year + '-' + month + '-' + day + ' ' + hour
                    if((this.$data.publishDate || this.$data.aa) >= sj){
                        this.$confirm("确定此操作吗",'提示',{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(_=>{
                            API.insertConditionSystemOrder(aa).then( result => {
                                if(result.data.code == "200"){
                                    this.$data.inform = ''
                                    this.$data.notifytitle = ''
                                    this.$data.notifycontent = ''
                                    this.$data.notifydate = ''
                                    this.$data.aa = ''
                                    this.$data.publishDate = ''
                                    this.$data.pushrole = ''
                                    this.$data.radio = ''
                                    this.$message({
                                        type: 'success',
                                        message: '操作成功!'
                                    });
                                }
                            })
                        }).catch(_=>{
                            this.$message({
                                type: 'info',
                                message: '已取消操作'
                            });
                        })
                    }else{
	                    this.msg('error','请选择正确的日期')
                    }
                }else{
                    this.msg('error','请填写完整信息')
                }
            },
	        //发送
            sendDa() {
                var qq = this.multipleSelection
                var aa = '?inform='+parseInt(this.$data.inform)+'&notifytitle='+this.$data.notifytitle+'&notifycontent='+this.$data.notifycontent
                    +'&notifysender=系统管理员&notifydate='+(this.$data.publishDate || this.$data.aa) + '&pushrole=5'
	            this.$confirm("确定此操作吗",'提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(_=>{
                    API.sendSystemOrder(aa,qq).then( result => {
                        if(result.data.code == "200"){
                            this.$data.inform = ''
                            this.$data.notifytitle = ''
                            this.$data.notifycontent = ''
                            this.$data.notifydate = ''
                            this.$data.aa = ''
                            this.$data.publishDate = ''
                            this.$data.pushrole = ''
                            this.$data.radio = ''
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                        }
                    })
                }).catch(_=>{
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                })
            },
            //搜索
            dsearchInfo() {
                this.$data.flag = true
                this.$data.currentPage1 = 1
                var searDa = '?pageNum='+this.pageNum+'&pageSize=3&telephone=' + this.$data.form.telephone
                API.selectCompanyUserTelephoneSystemOrder(searDa).then( result => {
                    this.total = parseInt(result.data.total)
                    if(result.data.list > 0){
                        result.data.list.forEach( (item) => {
                            if(item.province){
                                item.province = item.province + item.city
                            }
                            if(item.sex == "0"){
                                item.sex= "男"
                            }else{
                                item.sex = "女"
                            }
                            return item
                        })
                    }
                    this.tableData = result.data.list
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
	            this.formhh = {
                    provincesId: '',
                    citiesId: ''
	            }
	            this.kk = []
                this.$data.form.company_name= ''
	            this.$data.form.telephone = ""
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
            //表格控制全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //点击指定推送 表格数据展示隐藏
            fn:function(){
                //根据是否展示表格内容  进而判断 确定 按钮 和  单选按钮  是否可用
                if(this.willShow == false){
                    this.willShow=true;
                    this.$data.isA = true
                    this.$data.disabled = true
                    //查询
                    var o  = this.$data.pageNum + this.$data.temp
                    this.getInvestmentList(o)
                }else{
                    this.willShow=false
                    this.$data.isA = false
                    this.$data.disabled = false
                }
            },
            //按钮控制全选
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            //表格数据列表
            getInvestmentList (paramStr=this.pageNum) {
                let vm = this
                vm.loading = true
                if(this.$data.formhh.province != null && this.$data.formhh.province != undefined && this.$data.formhh.province != ""){
                    this.$data.formhh.province = this.$data.formhh.province
                }
                if(this.$data.formhh.city != null && this.$data.formhh.city != undefined && this.$data.formhh.city != ""){
                    this.$data.formhh.city =  this.$data.ruleForm.city
                }
                let deparam = '?pageNum='+paramStr+'&pageSize=3&provinces='+this.$data.formhh.provincesId+'&cities='+this.$data.formhh.citiesId+'&companyname='+this.$data.form.company_name
	            API.selectCompanyUserSystemOrder(deparam).then( result => {
                    vm.loading = false
                    if(result.code == "200"){
                        vm.total = parseInt(result.data.total)
                        result.data.list.forEach( (item) => {
                            if(item.province){
                                item.province = item.province + item.city
                            }
                            if(item.sex == "0"){
                                item.sex= "男"
                            }else{
                                item.sex = "女"
                            }
                        })
                        vm.tableData = result.data.list
                    }else{
                        vm.loading = false
                        vm.msg('error','数据列表获取失败')
                    }
                },function error() {
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
                }
                else{
                    this.pageNum = val
                    var searDa = '?pageNum='+this.pageNum+'&pageSize=3&telephone=' + this.$data.form.telephone
                    API.selectCompanyUserTelephoneSystemOrder(searDa).then( result => {
                        this.total = parseInt(result.data.total)
                        if(result.data.list > 0){
                            result.data.list.forEach( (item) => {
                                if(item.province){
                                    item.province = item.province + item.city
                                }
                                if(item.sex == "0"){
                                    item.sex= "男"
                                }else{
                                    item.sex = "女"
                                }
                            })
                        }
                        this.tableData = result.data.list
                    })
                }
            }
        },
        components: {},
        mounted() {},
        computed: {},
        watch: {}
    }
</script>
<style lang="scss" scope>
	.increasedhtitle {
		color: #717BA1;
		font-weight: bold;
		margin-top: 0;
		margin-left:10px;
		border-bottom:2px solid #8E95B6;
		padding-bottom:10px;
	}
	.increasedhtitle em {
		color: #99C1E4;
		margin-right: 10px;
	}
	.increasedfleft {
		height: 60px;
		text-align: right;
	}
	.increasedfright {
		height: 60px;
	}
	.increasedhheight{
		height:240px;
	}
	.el-textarea__inner{
		resize:none;
	}
	.increasedtextInput{
		width:70% !important;
	}
	.increaseddheight{
		height:85px;
	}
	.increasedtextInputt{
		width:30%;
	}
	.increasedbtn .el-button,
	.increasedbt .el-button{
		background: #4A4F63;
		color: white;
		padding: 16px 30px;
	}

	.increasedtaS{
		margin-top:10px;
		padding-bottom:40px;
	}
	.increasedoInput .el-input{
		width:67%;
	}
	.increasedtInput .el-select{
		width:48%;
	}
	.increasedoInput .el-button,
	.increasedb .el-button,
	.increasedfo .el-button{
		background: #4A4F63;
		color: white;
		margin-top: 6px;
		margin-left: 10px;
	}
	.increasedbt .el-button{
		padding:16px 100px;
	}
	.increasedpag {
		float: right;
		background: #fff;
		color: #E34E42;
		margin-top: 10px;
		margin-bottom:20px;
	}
	.has-gutter tr, .el-table .success-row {
		background: #F3F4F7;
	}
	/*点击指定发送时 确定按钮 禁用*/
	.disincreasedbuttonInput{
		color: #fff !important;
		background-color: #c8c9cc !important;
		border-color: #c8c9cc !important;
	}

	@media screen and (min-width: 1300px) {
		.boxRight{
			width:76%;
		}
	}
</style>