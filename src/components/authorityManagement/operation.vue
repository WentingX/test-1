<template>
  <!--操作管理-->
  <div class="operation">
	  <!-- 标题 -->
    <el-row class="operation_top">
      <div class="operation_list">
        操作列表
      </div>
    </el-row>

    <el-row class="operation_buttom">
      <template>
        <el-table :data="tableData" border v-loading="loading" stripe>
		      <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="title" label="操作名称"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template scope="scope">
              <span :class="{'close':(scope.row.status === '已关闭'),'open':(scope.row.status === '已开启')}">{{scope.row.status}}</span>
            </template>
</el-table-column>
<el-table-column prop="address" label="操作">
    <template slot-scope="scope">
              <a href="javascript:;" size="small" class="disabled close" v-if="scope.row.status == '已开启'" @click.prevent="clickOffOn(scope.row.ID)">禁用</a>
              <a href="javascript:;" size="small" class="disabled open" v-if="scope.row.status == '已关闭'" @click.prevent="clickOffOn(scope.row.ID)">开启</a>

              <a href="javascript:;" size="small" class="view open" @click.prevent="dialogView = true,examineMenu(scope.row)">查看</a>
              <el-dialog title="查看操作列表" :visible.sync="dialogView" width="75%" :before-close="handleView" :showClose = "false" @close="viewClose">
                <a href="javascript:;" @click.prevent="dialogView = false" class="el-icon-close icoClose"></a>
                <el-row>
                  <el-col class="name_one">
                    <span>菜单名称：</span>
                    <span>{{checkMenu.menuName}}</span>
                  </el-col>
                  <el-col class="name_one">
                    <span>菜单状态：</span>
                    <span>{{checkMenu.available}}</span>
                  </el-col>
                  <el-col class="name_one">
                    <span>创建时间：</span>
                    <span>{{checkMenu.createDate}}</span>
                  </el-col>
                  <el-col class="name_one">
                    <span>最后修改时间：</span>
                    <span>{{checkMenu.updateDate}}</span>
                  </el-col>
                </el-row>
                
                <div class="main" v-loading="loading2">
                  <div class="dify">
                    <span class="miss">操作列表</span>
                  </div>
                  <div class="main_div">
                    <p><span class="close">*</span>{{checkMenu.menuName}}：</p>
                    <div v-for=" (item,index) in checkData" style="display:flex;margin: 0 0 14px 14px;">
                      <span style="flex:1">{{checkData[index].menuName}}</span> 
                      <el-tree :data="checkData[index].operations" :props="defaultProps" default-expand-all style="display:flex;flex:7"></el-tree>
                    </div>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogView = false">退 出</el-button>
                </span>
              </el-dialog>

              <a href="javascript:;" size="small" class="operating open" @click.prevent="dialogoperating = true,modificationMenu(scope.row)">操作</a>
              <el-dialog title="操作信息" :visible.sync="dialogoperating" width="75%" :before-close="handleoperating" :showClose = "false" top="10vh" @close="viewClose">
                <a href="javascript:;" @click.prevent="dialogoperating = false" class="el-icon-close icoClose"></a>
                <el-row>
                  <el-col class="name_one">
                    <span>菜单名称：</span>
                    <span>{{checkMenu.menuName}}</span>
                  </el-col>
                  <el-col class="name_one">
                    <span>菜单状态：</span>
                    <span>{{checkMenu.available}}</span>
                  </el-col>
                  <el-col class="name_one">
                    <span>创建时间：</span>
                    <span>{{checkMenu.createDate}}</span>
                  </el-col>
                  <el-col class="name_one">
                    <span>最后修改时间：</span>
                    <span>{{checkMenu.updateDate}}</span>
                  </el-col>
                </el-row>
                
                <div class="main" v-loading="loading2" >
                  <div class="dify">
                    <span class="miss">操作列表</span>
                  </div>
                  <div class="main_div">
                    <p><span class="close">*</span>{{checkMenu.menuName}}：</p>
                    <div v-for=" (item,index) in checkData" style="display:flex;margin: 0 0 14px 14px;flex-wrap:wrap;">
                      <span style="flex:1">{{checkData[index].menuName}}</span> 
                      <el-tree :data="checkData[index].operations" 
                                :props="defaultProps" 
                                default-expand-all style="display:flex;flex:7"
                                highlight-current></el-tree>
                      <a href="javascript:;" @click.prevent="dialogxg = true,operationModifyCheck(checkData[index].menuId)" v-if="checkData[index].flag">修改</a>
                      <el-dialog title="修 改" :visible.sync="dialogxg" width="35%" :before-close="handlexg" class="modify" :showClose = "false" @close="modifyClose">
                        <a href="javascript:;" @click.prevent="dialogxg = false" class="el-icon-close icoClose"></a>
                        <el-row style="display:block;" v-loading="loading3">
                          <div class="toubu">
                            <p>
                              <i class="close">*</i>
                              <span>二级菜单名称：</span>
                              <span>{{modifyName}}</span>
                            </p>
                          </div>
                          <div class="cenyter">
                            <div>
                              <i class="close">*</i>
                              <span>权限名称：</span>
                            </div>
                            <div  v-if="rewriteList.length == 0" style="text-align: center;">无数据</div>
                            <div style="margin: 4px 0 0 40px;">
                              <div v-for="(v,i) in rewriteList">
                                <span>{{ numberList[i] }}）</span>
                                <input type="text" v-model="rewriteList[i].operationName" placeholder="请填入一级权限名" name="operationName1"/>
                                <input type="text" v-model="rewriteList[i].url" placeholder="请填入一级url"  style="width:150px;" name="url"/>
                                  <a href="javascript:void(0);" @click="aaa(i)" v-if="i>0">
                                    <img src="../../assets/shangyi.png"  style="width:17px;"/>
                                  </a>
                                <div v-for="(x,y) in rewriteList[i].children" style="margin: 4px 0 0 40px;" >
                                  <span>{{ y+1 }}.</span>
                                  <input type="text" v-model="rewriteList[i].children[y].operationName" placeholder="请填入二级权限名" name="operationName2"/>
                                  <input type="text" v-model="rewriteList[i].children[y].childUrl" placeholder="请填入二级url"  style="width:150px;" name="childUrl"/>
                                  <a href="javascript:void(0);" @click="bbb(i,y)" v-if="y>0">
                                    <img src="../../assets/shangyi.png"  style="width:17px;"/>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </el-row>
                        <el-button type="primary" @click="operationBasic()">保 存</el-button>
                      </el-dialog>
                    </div>
                  </div>
                </div>
                <el-button @click="dialogdelete=true, deleteAll(scope.row)">删 除</el-button>
                <el-dialog title="操作信息" :visible.sync="dialogdelete" width="75%" :before-close="handledelete" v-loading="loading2" element-loading-spinner="el-icon-loading">
                  <el-row>
                    <el-col class="name_one">
                      <span>菜单名称：</span>
                      <span>{{checkMenu.menuName}}</span>
                    </el-col>
                    <el-col class="name_one">
                      <span>菜单状态：</span>
                      <span>{{checkMenu.available}}</span>
                    </el-col>
                    <el-col class="name_one">
                      <span>创建时间：</span>
                      <span>{{checkMenu.createDate}}</span>
                    </el-col>
                    <el-col class="name_one">
                      <span>最后修改时间：</span>
                      <span>{{checkMenu.updateDate}}</span>
                    </el-col>
                  </el-row>
                  <div class="main">
                    <div class="dify">
                      <span class="miss">操作列表</span>
                    </div>
                    <div class="main_div">
                      <p><span class="close">*</span>{{checkMenu.menuName}}：</p>
                        <el-tree  :data="checkData1" 
                                  :props="defaultProps" 
                                  default-expand-all 
                                  show-checkbox node-key="id" ref="tree"></el-tree>
                      <el-button type="primary" @click="getCheckedKeys">确定删除</el-button>
                      <el-button type="primary" @click="selectAll">全选</el-button>
                    </div>
                  </div>
                </el-dialog>

                <el-button type="primary" @click="dialogxz = true,clearAll()">新 增</el-button>
                <el-dialog title="新 增" :visible.sync="dialogxz" width="35%" :before-close="handlexz" :showClose = "false">
                  <a href="javascript:;" @click.prevent="dialogxz = false" class="el-icon-close icoClose"></a>
                  <el-row style="display:block;">
                    <div class="toubu">
                      <p>
                        <i class="close">*</i>
                        <span>二级菜单名称:</span>
                        <el-select v-model="value" placeholder="请选择" @change="change">
                          <el-option
                            v-for="item in checkData"
                            :key="item.menuId"
                            :label="item.menuName"
                            :value="item.menuId">
                          </el-option>
                        </el-select>
                      </p>
                    </div>
                    <div class="cenyter">
                      <div>
                        <i class="close">*</i>
                        <span>权限名称:</span>
                      </div>
                      <div>
                        <div v-for="(v,i) in increasedList" style="margin: 4px 0 0 40px;">
                          <span>{{ numberList[i] }}）</span>
                          <input v-model="increasedList[i].operationName" placeholder="请填入一级权限名" name="operationName"/>
                          <input v-model="increasedList[i].url" placeholder="请填入一级url"  style="width:150px;" name="url"/>
                          <span @click="AddSecond(i)" class="el-icon-plus plus"></span>
                          <div v-for="(z,y) in increasedList[i].children" style="margin: 4px 0 0 40px;">
                            <span>{{ y + 1 }}.</span>
                            <input v-model="increasedList[i].children[y].childName" placeholder="请填入二级权限名" name="childName"/>
                            <input v-model="increasedList[i].children[y].childUrl" placeholder="请填入二级url"  style="width:150px;" name="childUrl"/>
                          </div>
                        </div>
                        <div style="text-align:center;margin:40px 0 100px 0">
                          <span class="el-icon-plus plus" @click="Add">新建权限</span>
                        </div>
                        
                      </div>
                    </div>
                  </el-row>

                  <el-button type="primary" @click="save()">保 存</el-button>
                  <el-button type="primary" @click="clearAll()">重 置</el-button>
                </el-dialog>
                
              </el-dialog>
            </template>
</el-table-column>
</el-table>
</template>
</el-row>

<!-- 分页部分 -->
<div class="fenye">
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="pagination"></el-pagination>
</div>

</div>
</template>

<style lang="scss">
    .v-modal {
        z-index: 2000 !important;
    }

    .operation .open {
        color: #38f;
    }

    .operation .close {
        color: #df1f1f;
    }

    .operation .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color: transparent;
    }

    .operation {

        .operation_top {
            border-left: 2px solid #88b7e0;
            padding-left: 20px;
            margin-left: 32px;
            margin-top: 30px;
            color: #556191;
            .operation_list {
                font-size: 18px;
            }
        }
        .operation_buttom {
            width: 95%;
            margin-left: 32px;
            margin-top: 28px;
            text-align: center;
            >.el-table th {
                background: #f5f6fa;
                width: 33%;
                text-align: center;
                color: #556191;
            }
            .el-table--striped .el-table__body tr.el-table__row--striped td {
                background: #f5f6fa;
            }
            tr {
                >td {
                    .cell {
                        a {
                            display: inline-block;
                            padding: 0 25px;
                        }
                    }
                }
            }
            .el-dialog {
                margin: 0 auto
            }
            .el-dialog__header {
                background: #4a4f63;
                text-align: left;
                .el-dialog__title {
                    color: #fff;
                }
            }
            .el-dialog__body {
                text-align: left;
                .el-row {
                    display: flex;
                }
                .main {
                    .dify {
                        height: 36px;
                        border-bottom: 2px solid #556191;
                        margin-bottom: 0px;
                        margin-top: 10px;
                        .miss {
                            border-left: 2px solid #3385ff;
                            padding-left: 20px;
                            color: #556191;
                        }
                    }
                }
                .main_div {
                    .el-tree {
                        .el-tree-node {
                            flex: 1;
                        }
                    }
                    .modify {
                        >.el-row {
                            display: block;
                        }
                    }
                }
            }
        }
        .fenye {
            margin: 10px 15px 0 0;
            text-align: right;
        }
    }

</style>

<script>
    import API from '@/api/api'
    import index from '../../../node_modules/_vue@2.5.13@vue';
    export default {
        data() {
            return {
                tableData: [],
                dialogView: false,
                dialogoperating: false,
                dialogdelete: false,
                dialogxz: false,
                dialogxg: false,
                loading: false,
                loading2: false,
                loading3: false,
                pageNum: 1,
                total: 0,
                offOn: '',
                checkMenu: {
                    menuName: "",
                    available: null,
                    createDate: '',
                    updateDate: ''
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                checkData: [],
                checkData1: [],
                modifyName: '',
                rewriteList: [],
                numberList: ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ"],
                second: [],
                increasedName: '',
                //增加菜单
                increasedList: [{
                    operationName: "",
                    sort: "",
                    url: "",
                    children: [{
                        childName: "",
                        childSort: "",
                        childUrl: ""
                    }]
                }, ],
                downloading: false,
                add: false,
                forbid: false,
                open: false,
                examine: false,
                id: "", //操作时的id
                id2: "", //修改时的id
                value: "", //select中的参数
                val: "", //多选框参数
            }
        },
        created() {
            // let menu = JSON.parse(window.sessionStorage.getItem('menu'))
            // menu.forEach((item)=>{
            //   if(item.name == '权限管理'){
            //     item.children.forEach((item)=>{
            //       if(item.path == this.$route.path){
            //         item.operations.forEach((item)=>{
            //           if(item.operationName == '下载'){
            //             this.downloading = true
            //           }else if(item.operationName == '添加'){
            //             this.add = true
            //           }else if(item.operationName == '禁用'){
            //             this.forbid = true
            //           }else if(item.operationName == '开启'){
            //             this.open = true
            //           }else if(item.operationName == '查看'){
            //             this.examine = true
            //           }
            //         })
            //       }
            //     })
            //   }
            // })
            this.getData()
        },
        methods: {
            handleView(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handledelete(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleoperating(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handlexz(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handlexg(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            getData(paramStr = this.pageNum) { //请求菜单列表数据
                this.loading = true
                let vm = this
                vm.tableData = []
                API.operationList().then(result => {
                        if (result.code == 200) {
                            console.log(result)
                            vm.loading = false
                            var res = result.data
                            vm.total = parseInt(res.total)
                            vm.tableData = res.list
                            console.log(vm.tableData)
                        }
                    },
                    function(err) {
                        vm.loading = false
                        vm.$message.error({
                            showClose: true,
                            message: '列表获取失败',
                            duration: 2000
                        });
                    })
            },
            pagination(currentPage) { //点击分页事件
                this.pageNum = currentPage
                this.getData(currentPage)
            },
            examineMenu(row) { //查看
                for (let item in this.$data.checkMenu) {
                    this.$data.checkMenu[item] = '暂无数据'
                }
                for (let item in this.$data.table) {
                    this.$data.table[item] = '暂无数据'
                }
                this.getMenuData(row)
            },
            getMenuData(row) { //获取操作列表数据
                this.loading2 = true
                let vm = this
                console.log(row)
                API.menuDetail(row.id).then(result => {
                    if (result.code == 200) {
                        vm.loading2 = false
                        vm.checkMenu = result.data
                        if (result.data.available == '0') {
                            vm.checkMenu.available = '已禁用'
                        } else {
                            vm.checkMenu.available = '已开启'
                        }
                    }
                })
//                API.operationList(row.id).then(result => {
//                    if (result.code == 200) {
//                        vm.loading2 = false
//                        console.log(result)
//                        vm.checkData = result.data
//                        vm.checkData.forEach(item => {
//                            if (item.operations.length != 0) {
//                                item.operations.forEach(i => {
//                                    i.label = i.operationName
//                                    if (i.children.length != 0) {
//                                        i.children.forEach(o => {
//                                            o.label = o.operationName
//                                        })
//                                    }
//                                })
//                            }
//                        })
//                    }
//                })

            },
            clickOffOn(id) { //菜单禁用、开启
                let vm = this
                API.operationOffOn(id).then(result => {
                    // console.log(result)
                    if (result.data == 1) {
                        vm.getData(vm.pageNum)
                    } else if (result.data == 0) {
                        vm.$message.error({
                            showClose: true,
                            message: '操作失败',
                            duration: 2000
                        })
                        return
                    }
                })
            },
            modificationMenu(row) { //修改
                this.id = row
                for (let item in this.$data.checkMenu) {
                    this.$data.checkMenu[item] = '暂无数据'
                }
                for (let item in this.$data.table) {
                    this.$data.table[item] = '暂无数据'
                }
                this.getMenuData(row)
            },
            deleteAll() { //初始化删除页面
                let vm = this
                API.operationList(vm.id.ID).then(result => {
                    if (result.code == 200) {
                        vm.checkData1 = result.data
                        vm.checkData1.forEach(item => {
                            item.label = item.menuName
                            item.id = item.menuId
                            item.children = item.operations
                            if (item.children.length != 0) {
                                item.children.forEach(i => {
                                    i.label = i.operationName
                                    if (i.children.length != 0) {
                                        i.children.forEach(o => {
                                            o.label = o.operationName
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
                // console.log(row)
            },
            getCheckedKeys() { //删除
                let vm = this;
                var ids = this.$refs.tree.getCheckedKeys().filter(item => {
                    return item.length === 18
                })
                var paramStr = "ids=" + ids
                this.$confirm("确认删除？")
                    .then(_ => {
                        API.operationsOperas(paramStr).then(result => {
                            if (result.code == "200") {
                                vm.getMenuData(vm.id)
                                vm.dialogdelete = false
                            }
                        })
                    })
                    .catch(_ => {

                    })
            },
            operationModifyCheck(id) { //初始化修改菜单的数据
                this.$data.id2 = id
                var vm = this
                vm.loading3 = true
                API.operationModifyCheck(id).then(result => {
                    if (result.code == "200") {
                        console.log(result)
                        vm.loading3 = false
                        vm.$data.modifyName = result.data.menuName
                        vm.$data.rewriteList = result.data.operations
                    } else {
                        return
                    }
                })
            },
            operationBasic(id) { //修改
                let vm = this
                var paramStr = "id=" + this.id2 + "&userId=" + JSON.parse(window.sessionStorage.getItem('access-user')).userid
                var List = this.rewriteList
                List.forEach(item => {
                    if (item.children.length != 0) {
                        item.children.forEach(i => {
                            i.childName = i.operationName
                            i.childSort = i.sort
                        })
                    } else {
                        return item
                    }
                })
                this.$confirm("确认修改？")
                    .then(_ => {
                        API.operationBasic(paramStr, List).then(result => {
                            if (result.code == "200") {
                                vm.getMenuData(vm.id)
                                vm.dialogxg = false
                            }
                        })
                    })
                    .catch(_ => {

                    })
            },
            Add() { //增加一行二级菜单
                this.increasedList.push({
                    operationName: "",
                    sort: "",
                    url: "",
                    children: [{
                        childName: "",
                        childSort: "",
                        childUrl: ""
                    }]
                })
            },
            AddSecond(i) { //增加一行三级菜单
                this.increasedList[i].children.push({
                    childName: "",
                    childSort: "",
                    childUrl: ""
                })
            },
            save() { //新增
                var paramStr = this.getAddParams(this.increasedList)
                if (paramStr == undefined) {
                    return
                }
                let vm = this
                vm.$confirm('确认添加？')
                    .then(_ => {
                        API.operationBasicAdd(paramStr, vm.increasedList).then(result => {
                            if (result.data.code == "200") {
                                vm.getMenuData(vm.id)
                                vm.clearAll()
                                vm.dialogxz = false
                            }
                        })
                    })
                    .catch(_ => {

                    })
            },
            getAddParams(paramL) { //获取添加菜单的参数
                var flag = true
                paramL.forEach((item, index) => {
                    item.sort = index + 1
                    item.children.forEach((i, ind) => {
                        i.childSort = ind + 1
                        if (i.childName == "" || i.childUrl == "") {
                            this.$message.error({
                                showClose: true,
                                message: '权限名，url不可为空',
                                duration: 2000
                            })
                            return flag = false
                        }
                    })
                    if (item.operationName == "" || item.url == "") {
                        this.$message.error({
                            showClose: true,
                            message: '权限名，url不可为空',
                            duration: 2000
                        })
                        return flag = false
                    }
                })
                if (flag == false) {
                    return
                }
                var o = "id=" + this.val + "&userId=" + JSON.parse(sessionStorage.getItem('access-user')).userid
                return o
            },
            change(val) { //新增二级菜单下拉框改变事件
                this.val = val
            },
            clearAll() { //重置新增
                this.increasedList.forEach(item => {
                    item.operationName = ""
                    item.sort = ""
                    item.url = ""
                    item.children.forEach(i => {
                        i.childName = ""
                        i.childSort = ""
                        i.childUrl = ""
                    })
                })
                this.increasedList.splice(1)
                this.increasedList.forEach(item => {
                    item.children.splice(1)
                })
                this.value = ""
            }
        }
    }

</script>
