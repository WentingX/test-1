  <template>
    <div class="part">

      <el-form :inline="true" :model="fundFormInline" class="demo-form-inline form">
        <p class="title">
          <em>|</em> 信息筛选</p>
        <el-form-item class="uu">
          <el-input clearable size="mini" v-model="keyword" placeholder="输入你想搜索的内容" class="searchInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" class="buttonInput" @click="detailByKeyWord">搜索</el-button>
        </el-form-item>

        <!-- 日期拾取 -->
        <div class="block">
          <el-date-picker v-model="value7" :editable = "false"
                          type="datetimerange" align="center" 
                          range-separator="~" start-placeholder="开始日期"
                          end-placeholder="结束日期" 
                          format="yyyy-MM-dd HH:mm:ss" size="medium"
                          :default-time="['00:00:00', '23:59:59']"
                          @change="change">
          </el-date-picker>
          <ul><li v-for="(item,$index) in items" @click="selectStyle (item, $index) " :class="{'active':item.active,'unactive':!item.active}" class="date" :key="item.selected">{{item.select}}</li></ul>
        </div>
        <br/>
        <!-- 筛选form表单内容 -->
        <el-form-item class="name" label="用户名">
          <el-input size="mini" clearable v-model="fundFormInline.uerName">
          </el-input>
        </el-form-item>
        <el-form-item class="name" label="姓名">
          <el-input size="mini" clearable v-model="fundFormInline.name">
          </el-input>
        </el-form-item>
        <el-form-item class="name" label="交易方式">
          <el-select size="mini" clearable v-model="fundFormInline.mode">
            <el-option label="微信转入" value="01"></el-option>
            <el-option label="支付宝转入" value="02"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="name" label="交易类型">
          <el-select size="mini" clearable v-model="fundFormInline.tradeType">
            <el-option label="看门狗平台信息接单保证金" value="1"></el-option>
            <el-option label="看门狗平台保证金" value="2"></el-option>
            <el-option label="看门狗平台高端定制保证金" value="3"></el-option>
          </el-select>
        </el-form-item>      
        <el-form-item class="name" label="交易金额">
          <el-input size="mini" clearable v-model="fundFormInline.money">
          </el-input>
        </el-form-item>
        <el-form-item class="name" label="资金类别">
          <el-select size="mini" clearable v-model="fundFormInline.status">
            <el-option label="全部" value="00"></el-option>
            <el-option label="收入" value="01"></el-option>
            <el-option label="支出" value="02"></el-option>

          </el-select>
        </el-form-item>
        <div class="checkButton">
          <el-button size="mini" class="buttonInput" @click="inquire">查询</el-button>
          <el-button size="mini" class="buttonInput" @click="remove">重置</el-button>
        </div>
      </el-form>
      <div class="separation"></div>
      <div class="tabs">  
        <!-- 收和支出的展示区域 -->
        <div class="checkView" style="height:140px;">
          <div class="viewport">
            收入
            <p>+￥{{income.sum}}</p>
            <div>{{income.count}} 笔</div>
          </div>
          <div class="viewport">
            支出
            <p>-￥{{expend.sum}}</p>
            <div>{{expend.count}} 笔</div>
          </div>
        </div>
        
        <!-- 数据展示区域 -->
          <p class="title">
          <em>|</em> 资金明细</p>
          <el-table stripe border :data="partTableData" style="width: 100%;text-align:center;" 
                    :cell-class-name="tableCellClassName" v-loading="loading">
            <template v-for="column in partTableColumns">
              <el-table-column :label="column.label" :prop="column.prop" align="center" :key="column.No" :width="column.width" :type="column.type"></el-table-column>
            </template>
            <el-table-column label="操作" prop="" align="center" width="100">
              <template scope="scope">
                <a href="javascript:void(0);" class="view" @click.prevent="onDealDetailClick(scope.row)">详情</a>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
          <el-pagination background layout="prev, pager, next" :page-size="10" :total="total" @current-change="pagination"></el-pagination>
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
          tradeType: "",
          mode: "",
          status: "",
          money: '',
          timeStart:'',
          timeEnd:'',
          status:''
        },
        //表格内容
        partTableData: [],
        a:null,
        //表头
        partTableColumns: [
          {
            label: "序号",
            width:'100',
            type:"index"
          },
          {
            label: "用户名",
            prop: "username"
          },
          {
            label: "姓名",
            prop: "name",
            width: '100'
          },
          {
            label: "订单号",
            prop: "orderNumber",
            width:"225"
          },{
            label: "交易类型",
            prop: "orderType",
            width:"200"
          },
          {
            label: "交易金额",
            prop: "money"
          },
          {
            label: "交易方式",
            prop: "mode"
          },
          {
            label: "状态",
            prop: "status"
          },
          {
            label: "交易时间",
            prop: "time"
          }
        ],
        value7: "",
        //收和支出的展示区域
        income: {
          sum:"0",
          count:"0"
        },
        expend: {
          sum:'0',
          count:"0"
        },
        total: 0,
        pageNum:1,
        temp:"",//提供给分页的搜索参数
        downloadLoading:false,
        loading:false,
        flag2:false,
        flag:false,
        keyword:"",
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
            if(item.name == '资金明细' && item.children){
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
      this.getIncom()
      this.getExtend()
    },
    methods: {
      msg(type, txt) {
        this.$message[type]({
          showClose: true,
          message: txt,
          duration: 2000
        });
      },
      tableCellClassName(row) {//给交易金额添加不同的颜色
        if (row.row.status == "入账中" || row.row.status == "支付超时" || row.row.status == "即时到账") {
          return "success-cell";
        }
        return "";
      },
      change(val){//日期选择器 值改变后移除快捷选择样式
        if(val){
          this.flag2 = true
          this.selectStyle()
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
      //获得数据
      getData(paramStr = this.$data.pageNum){
        this.flag = false
        this.loading = true
        let vm = this
        API.particularsInquire(paramStr).then(result => {
          if(result.code == 200){
            let res = result.data
            vm.total = parseInt(res.total) 
            res.list.forEach(item => {
                item.money = "￥" + item.money
            });
            vm.partTableData = res.list 
          }else {
            vm.msg('error','获取列表失败')
          }
          vm.loading = false
        },
        (error) => {
          vm.loading = false
            vm.msg('error','服务器错误')
        })
      },
      //重置
      remove(){
        this.keyword = ""
        this.$data.value7 = ""
        this.$data.temp = ""
        for(let item in this.$data.fundFormInline){
          this.$data.fundFormInline[item]=''
        }
        this.getData()
      },
      //查询
      inquire(){
        this.$data.temp = ""
        for(let item in this.fundFormInline){
          if(this.fundFormInline[item] != '' && this.fundFormInline[item] != 'NaN-NaN-NaN NaN:NaN:NaN' ){
            this.$data.temp +=  `&${item}=${this.fundFormInline[item]}`
          }
        }
        var o =this.$data.pageNum + this.$data.temp
        this.getData(o)
      },
      pagination(currentPage){//点击分页事件
        this.$data.pageNum = currentPage
        if(this.flag){
          this.detailByKeyWord(this.keyword)
        }else{
          if(this.$data.temp==""){
            this.getData(this.$data.pageNum)
          } else {
            var o = this.$data.pageNum + this.$data.temp
            this.getData(o)
          }
        }
      },
      getIncom(paramStr = "status=01" ){//收入数据
        let vm = this
        API.depositIncome( paramStr).then(result=>{
          if(result.code == "200"){
            let res = result.data
            vm.$data.income.count = res[0].Number
            vm.$data.income.sum = res[0].Money
          }
        })     
      },
      getExtend(paramStr = "status=02"){//  支出数据
        let vm = this
        API.depositIncome(paramStr).then(result=>{
          if(result.code == "200"){
            let res = result.data
            vm.$data.expend.count = res[0].Number
            vm.$data.expend.sum = res[0].Money
          }
        })
      },
      //导出Excel表格
      handleDownload() {
        if(this.partTableData.length>0){
          this.downloadLoading = true
          import ('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['用户名', '姓名', '订单号','交易类型', '交易方式', '交易时间','交易金额','状态']
            const filterVal = ['username','name', 'orderNumber','refund', 'mode', 'time', 'money', 'status']
            const data = this.formatJson(filterVal, this.partTableData)
            excel.export_json_to_excel(tHeader, data, '资金明细信息表')
            this.downloadLoading = false
          })
        }else {
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
      detailByKeyWord(){//关键字查询
        this.flag = true
        this.loading = true
        let vm = this
        API.detailByKeyWord(vm.keyword).then(result =>{
          if(result.code == 200){
            let res = result.data
            vm.total = res.total-0
            vm.partTableData = res.list 
            vm.partTableData.forEach(item => {
              item.money = "￥" + item.money
            });
          } else {
            vm.msg('error','获取列表失败')
          }
          vm.loading = false
        },
        (error) => {
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
        } else {
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
        }
      }
    },
    watch: {
      value7 : function(newVal, oldVal){
        if(newVal){
          this.fundFormInline.timeStart = this.$root.$options.filters.dateFormat(newVal[0])
          this.fundFormInline.timeEnd = this.$root.$options.filters.dateFormat(newVal[1])
        }else{
          this.flag2 = true
          this.selectStyle()
        }
        return 
      }
    }
  };
  </script>

  <style lang="scss">
  .content-wrap .content-vi{
      height: auto;
    }
  .part {
    
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
      .el-button+.el-button{
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
    .el-tabs .el-tabs__header .el-tabs__item.is-active{
      background: none;
      color: #373d41;
    }
    .checkView{
      background-color: #e8f5fe;
      margin-bottom: 20px;
      padding: 20px 0 0 20px;
      border: 1px solid #eee;
      .viewport{
        float: left;
        padding: 10px 180px 0 10px;
        color: #000;
        >p{
          color: #4dc036;
          font-size: 22px;
          margin: 20px 0;
        }
        &:nth-of-type(2)>p{
          color: #df2020;
        }
        >div{
          color: #a4a6a8;
        }
      }
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
    .el-table td:nth-of-type(6){
      color: #df1f1f;
      &.success-cell{
        color: #4dc036;
      }
    }
    .el-input__inner{
      border-radius: 0;
      border: 1px solid #999;
      width: 140px;
      height: 30px;
    }
    .el-form-item__label{
      padding-right: 20px;
    }
    .el-date-editor .el-range-input{
      height: 24px;
    }
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
      
  }
  </style>

