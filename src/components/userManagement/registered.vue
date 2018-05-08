<!--注册用户-->
<template>
	<div>
		<el-form :inline="true" name="ruleForm" ref="ruleForm" :model="formInline" class="demo-form-inline regform">
			<p class="title"><em>|</em> 注册用户管理</p>
			<el-form-item class="reguu" prop="keyWord">
				<el-input size="mini" v-model="keyWord" placeholder="输入你想搜索的内容" class="regsearchInput"></el-input>
			</el-form-item>
			<el-form-item class="regbtn">
				<el-button icon="el-icon-search" size="mini" class="regbInput" @click="dsearchInfo">搜索</el-button>
			</el-form-item>
			<br/>
			<el-form-item class="regname" label="用户名" prop="uerName">
				<el-input size="mini" v-model="formInline.uerName"></el-input>
			</el-form-item>
			<el-form-item class="regname" label="真实姓名" prop="name">
				<el-input size="mini" v-model="formInline.name"></el-input>
			</el-form-item>
			<el-form-item class="regname" label="企业名称" prop="companyName">
				<el-input size="mini" v-model="formInline.companyName"></el-input>
			</el-form-item>
			<el-form-item class="regqq" label="用户类型" prop="type">
				<el-select size="mini" v-model="formInline.type">
					<el-option label="个人" value="01"></el-option>
					<el-option label="企业" value="02"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="regqq" label="信用等级" prop="level">
				<el-select size="mini" v-model="formInline.level">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="regqq" label="账户状态" prop="state">
				<el-select size="mini" v-model="formInline.state">
					<el-option label="个人认证" value="01"></el-option>
					<el-option label="企业认证" value="02"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="regqq" label="用户属性" prop="attribute">
				<el-select size="mini" v-model="formInline.attribute">
					<el-option label="全部" value=""></el-option>
					<el-option label="信息方" value="01"></el-option>
					<el-option label="需求方" value="02"></el-option>
					<el-option label="服务商" value="03"></el-option>
					<el-option label="其他" value="04"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="regqq regld" label="地区" prop="city">
				<el-cascader v-model="kk" :options="options2" change-on-select clearable @change="handleItemChange"></el-cascader>
			</el-form-item>
			<div style="text-align:center;" class="regcent">
				<el-button size="mini" class="regbuttonInput regbuttonInput_left" @click="onSubmit">查询</el-button>
				<el-button size="mini" class="regbuttonInput" @click="resetForm('ruleForm')">重置</el-button>
			</div>
		</el-form>
		<hr class="hrLinek"/>
		<div class="regtaS">
			<p class="title"><em>|</em> 用户列表</p>
			<el-table :data="tableData" v-loading="loading" style="width: 100%;text-align:center;color:#556191;" :row-class-name="tableRowClassName">
				<el-table-column property="username" label="用户名" align="center"></el-table-column>
				<el-table-column property="email" label="邮箱" align="center"></el-table-column>
				<el-table-column property="companyName" label="企业名称" align="center"></el-table-column>
				<el-table-column property="name" label="用户姓名" align="center"></el-table-column>
				<el-table-column property="province" label="地区" align="center"></el-table-column>
				<el-table-column property="userType" label="用户类型" align="center"></el-table-column>
				<el-table-column property="accountState" label="账号状态" align="center"></el-table-column>
				<el-table-column property="attribute" label="用户属性" align="center"></el-table-column>

				<el-table-column label="操作" align="center" property="status">
					<template slot-scope="scope">
						<el-button size="mini" type="text" class="regview"
						           @click="onBtnDetailClick(scope.row)" property="id">详情
						</el-button><!-- v-if="detai"  ,forb  ,star--><!--0启用 -1禁用 反了-->
						<el-button v-if="scope.row.status == '0'" size="mini" type="text" class="regdisabled"
						           @click="userDisa(scope.row)" property="id">禁用</el-button>
						<el-button v-if="scope.row.status == '-1'" size="mini" type="text" class="greendisabled"
						           @click="userDisa(scope.row)" property="id">启用</el-button>
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
                keyWord: '', //输入框搜索
                formInline: {
                    uerName: '',
                    name: '',
                    companyName: '',
                    type: '',
                    level: '',
                    state: '',
                    attribute: '',
                    provinceId: '',//省市 要传的
                    cityId: ''
                },
                searchQuery: '',//用于输入框搜索用
                tableData: [],
                currentRow: null,
                total: 0,
                pageNum: 1,
                temp: '',
                flag:false,
                detai:false,//操作权限
                forb:false,
                star:false,
                options2: [],//联动菜单数据
	            kk:[],
                loading: true,
                currentPage1: 1,//恢复第1页
            }
        },
        created () {
            //页面加载时渲染所有数据
            this.getInvestmentList()
            //操作权限
            // let menu = JSON.parse(window.sessionStorage.getItem('menu'))
            // menu.forEach((item)=>{
            //     if(item.name == '用户管理'){
            //         item.children.forEach((item)=>{
            //             if(item.path == this.$route.path){
            //                 item.operations.forEach((item)=>{
            //                     if(item.operationName == '详情'){
            //                         this.detai = true
            //                     }else if(item.operationName == '禁用'){
            //                         this.forb = true
            //                     }else if(item.operationName == '启用'){
            //                         this.star = true
            //                     }
            //                 })
            //             }
            //         })
            //     }
            // });
	        //初始化加载地区接口
            API.area(this.$route.path.split('/')[2]).then( result => {
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
        methods: {
            //加载消息提示框
            msg(type, txt) {
                this.$message[type]({
                    showClose: true,
                    message: txt,
                    duration: 2000
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
                this.$data.formInline.provinceId = val[0]
                this.$data.formInline.cityId = val[1]
            },
            //搜索
            dsearchInfo() {
                this.$data.flag = true
                this.$data.currentPage1 = 1
                var searDa = '?pageSize=10&pageNum='+this.pageNum+'&keyWord=' + this.$data.keyWord
                API.userAll(searDa).then( result => {
                    if(result.code == "200"){
                        this.total = parseInt(result.data.total)
                        this.tableData = result.data.list
                    }
                })
            },
            //重置
            resetForm (ruleForm) {
                this.$refs[ruleForm].resetFields();
                this.$data.temp = ""
                this.$data.keyWord = ""
                this.$data.formInline.provinceId = ""
                this.$data.formInline.cityId = ""
	            this.kk = []
                this.$data.currentPage1 = 1
                this.getInvestmentList()
            },
            //查询
            onSubmit () {
                this.$data.temp = ""//防止点击多次按钮出现拼接
                this.$data.flag = false
                this.$data.currentPage1 = 1
                for(let item in this.formInline){
                    if(this.formInline[item]!='' && this.formInline[item] != 'NaN-NaN-NaN NaN:NaN:NaN' ){
                        this.$data.temp +=`&${item}=${this.formInline[item]}`
                    }
                }
                var o  =this.$data.pageNum + this.$data.temp
                this.getInvestmentList(o)
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
                this.$store.commit('save_detail_info', row)
                this.$router.push({
                    path: `/userManagement/userM/test/${row.id}`
                })
            },
            //禁用 启用
            userDisa (row) {
                API.userDisables(row.id).then(function (result) {
                    if (result.code == 200) {
                        if(row.status == "-1"){
                            row.status = "0"
                        }else{
                            row.status = "-1"
                        }
                    }
                })
            },
            //数据列表
            getInvestmentList (paramStr=this.pageNum) {
                let vm = this
	            vm.loading = true
                API.register(paramStr).then( result => {
                    vm.loading = false
                    if(result.code == "200" && result.data != null){
                        vm.total = parseInt(result.data.total)
                        vm.tableData = result.data.list
                        result.data.list.forEach( item => {
                            if(item.province){
                                item.province = item.province + item.city
                            }
                        })
                    }else{
                        vm.loading = false
                        this.msg('error', '数据列表获取失败');
                    }
                },error => { //数据加载不出来时调用
                    vm.loading = false
                    vm.$message.error({
                        message: '服务器错误',
                        showClose: true,
                        duration: 2000
                    })
                });
            },
            //分页
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
                    var searDa = '?pageSize=10&pageNum='+this.pageNum+'&keyWord=' + this.$data.keyWord
                    API.userAll(searDa).then( result => {
                        this.total = parseInt(result.data.total)
                        this.tableData = result.data.list
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scope>
	.regform {
		background: #fff;
	}
	.regform .title{
		margin-bottom:0px;
		color:#556191;
	}
	.regform .title, .regtaS .title {
		color: #858DAD;
		margin-top: 0;
		font-size:16px;
	}
	.regform .title em, .regtaS .title em {
		color: #88B7E0;
		margin-right: 10px;
	}
	.regform .el-input__inner{
		border-radius:0px;
	}
	.reguu{
		margin-top:20px;
		margin-bottom:30px;
	}
	.reguu .el-form-item__content,
	.regbtn .el-form-item__content{
		line-height:normal;
	}
	.reguu .el-input__inner{
		width: 400px;
		height: 35px;
		border: 1px solid #999999;
		border-radius: 0px;
	}
	.regbtn{
		margin-right:0px;
		vertical-align:bottom;
	}
	.regbtn .el-form-item__content button {
		width:100px;
		height:35px;
		border:1px solid #999999;
		border-radius:0px;
		margin-top:19px;
		margin-left: -4px
	}
	.regname{
		margin-bottom:30px;
	}
	.regqq{
		margin-bottom:0px;
	}
	.regname .el-form-item__content {
		width: 140px;
	}

	.regqq .el-form-item__content {
		width: 120px;
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

	.regform .el-button, .regcent .el-button {
		background: #4A4F63;
		color: white;
		padding: 7px 20px;
	}
	.regcent{
		margin:0 auto;
		margin-top:40px;
		margin-bottom:20px;
	}
	.regform .regbuttonInput{
		width:126px;
		height:35px;
	}
	.regform .regbuttonInput_left{
		margin-right:70px;
	}
	.regtaS {
		margin-top: 10px;
		background: #fff;
		margin-bottom: 50px;
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
	.page {
		float: right;
		background: #fff;
		color: #E34E42;
		margin-top: 10px;
	}

	.has-gutter tr, .el-table .success-row {
		background: #F3F4F7;
	}

	.regview {
		color: #535458;
		margin-right: 15px;
	}
	/*禁用 启用*/
	.regdisabled {
		color: #E42626;
	}
	.greendisabled{
		color: green;
	}

	@media screen and (min-width: 1300px) {
		.regform {
			height: auto;
		}
		.regname .el-form-item__content {
			width: 180px;
		}
		.regtaS {
			margin-top: 10px;
		}
		.regcent {
			margin-top: 10px !important;
		}
	}
</style>