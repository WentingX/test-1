<template>
  <div class="withdraw">

    <el-form :inline="true" :model="fundFormInline" class="demo-form-inline form">
      <p class="title">
        <em>|</em> 信息筛选</p>
      <el-form-item class="uu">
        <el-input size="mini" v-model="keyword" placeholder="输入你想搜索的内容" class="searchInput" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" size="mini" class="buttonInput" @click="refundByKeyWord">搜索</el-button>
      </el-form-item>

      <!-- 日期拾取 -->
      <div class="block">
        <el-date-picker v-model="value7" :editable = "false"
                        type="datetimerange" 
                        align="center" 
                        range-separator="~" start-placeholder="开始日期"
                        end-placeholder="结束日期" 
                        size="medium"
                        :default-time="['00:00:00', '23:59:59']" @change="change">
        </el-date-picker>
        <ul><li v-for="(item,$index) in items" @click="selectStyle (item, $index) " :class="{'active':item.active,'unactive':!item.active}" class="date">{{item.select}}</li></ul>
      </div>

      <br/>
      <!-- 筛选form表单内容 -->
      <el-form-item class="name" label="用户名">
        <el-input clearable size="mini" v-model="fundFormInline.uerName">
        </el-input>
      </el-form-item>
      <el-form-item class="name" label="姓名">
        <el-input clearable size="mini" v-model="fundFormInline.name">
        </el-input>
      </el-form-item>
      <el-form-item class="name company" label="公司名称">
        <el-input clearable size="mini" v-model="fundFormInline.company">
        </el-input>
      </el-form-item>
      <el-form-item class="name" label="状态">
        <el-select clearable size="mini" v-model="fundFormInline.status">
          <el-option label="待退款" value="1041"></el-option>
          <el-option label="退款成功" value="1040"></el-option>
          <el-option label="退款失败" value="1042"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="name" label="交易金额">
        <el-input clearable size="mini" v-model="fundFormInline.price">
        </el-input>
      </el-form-item>
      <div class="checkButton">
        <el-button size="mini" class="buttonInput" @click="inquire">查询</el-button>
        <el-button size="mini" class="buttonInput" @click="remove">重置</el-button>
      </div>
    </el-form>
    <div class="separation"></div>
    <!-- 数据展示区域 -->
    <div class="tabs">
      <p class="title">
      <em>|</em> 提现管理</p>
      <el-table stripe border :data="partTableData" style="width: 100%;text-align:center;" :cell-class-name="tableCellClassName"
                v-loading="loading">
        <template v-for="column in partTableColumns">
          <el-table-column :label="column.label" :prop="column.prop" align="center" :key="column.prop" :width="column.width" :type="column.type"></el-table-column>
        </template>
        <el-table-column label="操作" prop="" align="center" width="100">
          <template scope="scope">
            <a href="javascript:void(0);" class="view" @click.prevent="onDealDetailClick(scope.row)">查看</a>
          </template>
        </el-table-column>
      </el-table>
        <el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
        <el-pagination background layout="prev, pager, next" 
                        :total="total"
                        @current-change="pagination" :page-size="10"></el-pagination>
    </div>
  </div>
</template>

<script>
import API from '@/api/api'
export default {
  data() {
    return {
      active: false,
      //快捷时间按钮
      items: [{select:'今天',ptime:""},
              {select:'昨天',ptime:3600 * 1000 * 24},
              {select:'最近7天',ptime:3600 * 1000 * 24 * 7},
              {select:'最近30天',ptime: 3600 * 1000 * 24 * 30}
            ],
      //筛选form表单内容
      fundFormInline: {
        uerName: "",
        name: "",
        company: "",
        status: "",
        money: "",
        timeStart: "",
        timeEnd: ""
        
      },
      //表格内容
      partTableData: [],
      //表头
      partTableColumns: [
        {
          label: "序号",
          // prop: "id",
           type:"index",
          width: "100"
        },
        {
          label: "用户名",
          prop: "username"
        },
        {
          label: "姓名",
          prop: "name",
          width: "100"
        },
        {
          label: "订单号",
          prop: "orderNumber"
        },{
          label: "状态",
          prop: "status"
        },
        {
          label: "交易金额",
          prop: "money"
        },
        {
          label: "交易时间",
          prop: "time"
        }
      ],
      value7: "",
      total: 0,
      pageNum: 1,
      temp: "",//提供给分页的搜索参数
      downloadLoading:false,
      loading:false,
      keyword:"",
      flag:false,
      flag2:false,
      downloading:false,
			add:false,
			forbid:false,
			open:false,
			examine:false,
    };
  },
  created () {
    let menu = JSON.parse(window.sessionStorage.getItem('menu'))
		menu.forEach((item)=>{
			if(item.name == "资金管理"){
				item.children.forEach(item=>{
					if(item.name == '提现管理' && item.children){
						item.children.forEach((item)=>{
							if(item.path == this.$route.path){
								item.operations.forEach((item)=>{
									console.log(item)
									if(item.operationName == '下载'){
										this.downloading = true
									}else if(item.operationName == '添加'){
										this.add = true
									}else if(item.operationName == '禁用'){
										this.forbid = true
									}else if(item.operationName == '开启'){
										this.open = true
									}else if(item.operationName == '查看'){
										this.examine = true
									}
								})
							}
						})
					}
				})
			}
		})
    this.getData()
  },
  methods: {
    msg(type, txt) {
			this.$message[type]({
				showClose: true,
				message: txt,
				duration: 2000
			});
		},
    //给表格添加类名 
    tableCellClassName({ row }) {
      if (row.status == '待退款') {
        return "stay-cell";
      }else if(row.status == "退款成功"){
        return "success-cell";
      }else if(row.status == "退款失败"){
        return "failed-cell";
      }
    },
    //点击详情跳转
    onDealDetailClick(row) {
      // 1. 用户详情存vuex
      this.$store.commit("save_detail_info", row);
      // 2. 动态改变路由的指向
      this.$router.push({
        path: `/checkFile/${row.orderNumber}`
      });
    },
    getData(paramStr = this.pageNum){ //从后台获取数据
      let vm = this
      vm.loading = true
      vm.flag = false
      API.withdrawInquire(paramStr).then(result=>{
        if(result.code == 200 && result.data != null){
          vm.loading = false
          var res = result.data
          vm.total = parseInt(res.total)
          res.list.forEach(item => {
              item.money = "￥" + item.money
          })
          vm.partTableData = res.list
        }else {
         vm.msg('error','获取列表失败')
        }
      },
      function(error){
        vm.loading = false
        vm.msg('error','服务器错误')
      })
    },
    inquire(){//查询
      this.$data.temp = ""
      for( let item in this.fundFormInline){
        if( this.fundFormInline[item] != '' && this.fundFormInline[item] != 'NaN-NaN-NaN NaN:NaN:NaN' ){
          this.$data.temp += `&${item}=${this.fundFormInline[item]}`
        }
      }
      var o  = this.$data.pageNum + this.$data.temp
      this.getData(o)
    },
    remove(){ //重置
      this.keyword = ""
      this.$data.value7 = ""
      this.$data.temp = ""
      for(var item in this.fundFormInline){
        this.$data.fundFormInline[item]=''
      }
      this.getData()
    },
    pagination(currentPage){//分页
      this.$data.pageNum = currentPage
      if(this.flag){
        this.refundByKeyWord(this.keyword)
      }else{
        if(this.$data.temp ==""){
          this.getData(this.$data.pageNum)
        }else{
          var o = this.$data.pageNum + this.$data.temp
          this.getData(o)
        }
      }
    },
    //导出Excel表格
    handleDownload() {
      if(this.partTableData.length > 0){
        this.downloadLoading = true
        import ('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['用户名', '姓名', '订单号','状态','交易金额','交易时间']
          const filterVal = ['username','name', 'orderNumber', 'status', 'money','time']
          const data = this.formatJson(filterVal, this.partTableData)
          excel.export_json_to_excel(tHeader, data, '提现管理信息表')
          this.downloadLoading = false
        })
      } else {
        this.msg('error','表格无数据')
      }
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
    refundByKeyWord(){//关键字查询
      this.loading = true
      this.flag = true
      let vm = this
      API.refundByKeyWord(vm.keyword).then(result => {
        if(result.code == "200"){
          vm.loading = false
          var res = result.data
          vm.total = parseInt(res.total)
          res.list.forEach(item => {
              item.money = "￥" + item.money
          })
          vm.partTableData = res.list
        } else {
          vm.loading = false
          vm.msg('error','获取列表失败')
        }
      },
      function(error){
        vm.loading = false
        vm.msg('error','服务器错误')
      })
    },
    selectStyle(item, index){//日期快捷选择
      let vm = this
      if(this.flag2){
        this.$nextTick(function(){
          this.items.forEach(item =>{
            vm.$set(item,"active",false)
          })
        })
        this.flag2 = false
        return
      }
      const end = new Date();
      const start = new Date();
      if(index == 0){
        let time = end.getHours() * 3600 * 1000 + end.getMinutes() * 60000 + end.getSeconds() * 1000
        start.setTime(start.getTime() -  time);
        this.value7 = [start,end]
      }else{
        start.setTime(start.getTime() -  item.ptime);
         this.value7 = [start,end]
      }     
      this.$nextTick(function(){
        
        this.items.forEach(item =>{
          vm.$set(item,"active",false)
        })
        this.$set(item,"active",true)
      })
    },
    change(val){//日期选择器 值改变后移除快捷选择样式
      if(val){
        this.flag2 = true
        this.selectStyle()
      }
    },
  },
  watch: {
    value7 : function(newVal, oldVal){
      if(newVal) {
        this.fundFormInline.timeStart = this.$root.$options.filters.dateFormat(newVal[0])
        this.fundFormInline.timeEnd = this.$root.$options.filters.dateFormat(newVal[1])
      } else {
        this.flag2 = true
        this.selectStyle()
      }
      return 
    }
  }
};
</script>

<style lang="scss">
.withdraw {
  .date{
    float: left;
    list-style: none;
    width: 80px;
    line-height: 4px;
    cursor: pointer;
  }
  .active{
    color: #38f;
  }
  .unactive{
    color: #606266;
  }
  .content-wrap .content-vi{
    height: auto;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #fff;
  }
  .separation{
    margin: 0 -35px;
    background-color: #f3f4f7;
    width: auto;
    height: 10px;
  }
  p{
    padding: 0;
    margin: 0;
  }
  .tabs{
    background-color: #fff;
    padding-top: 20px;
    >.el-pagination{
      text-align: right;
      font-weight: inherit;
      float: right;
      margin-top: 20px;
    }
    >.filter-item{
      margin-top: 20px;
    }
  }
  .checkButton{
    // margin:18px auto 10px;
    text-align:center;
    padding-bottom: 20px;
  }
  .title {
    color: #556191;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 16px;
    em {
      color: #88b7e0;
      margin-right: 10px;
    }
  }
  .form {
    background-color: #fff;
    .uu {
      margin-right:10px;
      .searchInput{
        >.el-input__inner{
          width: 365px;
          height: 35px;            
        }
      }
    }
    .buttonInput{
      background: #4A4F63;
      color: white;
      padding: 7px 20px;
      width: 100px;
      height: 35px;
    }
    .checkButton .el-button+.el-button{
      margin-left: 80px;//查询，重置之间的间距
    }
    .name{
      margin-right: 40px
    }
  }
  .block{
    display: inline;
    margin-left: 30px;
    .el-input__inner{
      width: 356px;
      height: auto;
    }
    ul{
      display: inline-block;
      margin: 0 0 0 10px;
      padding: 0;
      width: auto;
      height: auto;
    }
  }

  .el-tabs {
    
    .el-tabs__header .el-tabs__item.is-active{
      background: none;
      color: #373d41;
    }
  }
  .downLoad{
    height: 20px;
    width: 20px;
    text-decoration: none;
    font-size: 40px;
    font-weight: 300;
    margin: 0 20px 20px 0;
    float: right;
    color: #606266;
    cursor: pointer;
  }
  .page{
    text-align: right;
    margin-top: 10px;
    .el-pager{
      border: none;
      li{
        min-width: 30px;
        min-height: 28px;
        font-weight: 700;
      }
    }
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color:rgb(243,244,247);
    
  }
  .el-table thead tr>th{
    background-color:rgb(243,244,247);
    color:rgb(85,97,145);
  }
  .cell>.view{
    color:rgb(51,135,255);
  }
  .el-table td:nth-of-type(5){
    &.stay-cell{
      color: #ffc731;
    }
    &.success-cell{
      color: #4dc036;
    }
    &.failed-cell{
      color: #df1f1f;
    }
  }
  .el-input__inner{
    border-radius: 0;
    border: 1px solid #999;
    width: 140px;
    height: 30px;
  }
  .company{
    .el-input__inner{
      width: 280px;
    }              
  }
  .el-form-item__label{
    padding-right: 20px;
  }
  .el-date-editor .el-range-input{
    height: 24px;
  }

}
</style>

