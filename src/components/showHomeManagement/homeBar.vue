<template>
<div class="homeBar">
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="grid-content bg-purple-dark">| 首页banner管理</div>
      </el-col>
      <el-col :span="12" style="text-align:right">
        <div class="grid-content bg-purple-dark">
          <el-button type="success" @click="onBtnDetailClick()" v-if="amend">新增</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="tab">
      <el-table
    ref="singleTable"
    v-loading="loading"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      property="sort"
      label="序号"
      align="center"
      min-width="6.16%">
    </el-table-column>
    <el-table-column
      property="name"
      label="名称"
      align="center"
      min-width="28.65%">
    </el-table-column>
    <el-table-column
      property="createTime"
      label="操作时间"
      align="center"
      min-width="43.33%">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      min-width="23.54%">
      <template class="buts" slot-scope="scope">
       <el-button
          size="mini"
          type="text"
          class="examine"
          @click="handleCheck(scope.row)" v-if="examine">查看</el-button>
        <el-button
          size="mini"
          type="text"
          class="amend"
          @click="handleEdit(scope.row)" v-if="amend">修改</el-button>
        <el-button
          size="mini"
          type="text"
          class="del"
          @click="handleDelete(scope.$index,scope.row)" v-if="del">删除</el-button>
      </template>
</el-table-column>
</el-table>
</div>
</div>
</template>

<style lang="scss">
    .homeBar {
        .el-row {
            line-height: 40px;
            color: #556191;
        }
        .tab {
            margin-top: 20px;
            .el-table__header-wrapper {
                font-size: 13px;
                th.is-leaf {
                    background: #f3f4f7;
                }
            }
            .el-table__body-wrapper{
                overflow: hidden;
            }
            .el-table--enable-row-hover .el-table__body tr>td {
                cursor: pointer;
            }
            .el-table--enable-row-hover .el-table__body tr:nth-child(even)>td {
                background: #f3f4f7;
            }
            .el-table--enable-row-hover .el-table__body tr:nth-child(odd):hover>td {
                background-color: #fff;
            }
            .examine {
                color: #3388ff;
            }
            .amend {
                color: #4dc036;
            }
            .del {
                color: #df1f1f;
            }
        }
    }
</style>

<script>
    import API from '@/api/api'
    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                loading: true,
                examine:true,
                amend:true,
                del:true,
            }
        },
        created() {
             let menu = JSON.parse(window.sessionStorage.getItem('menu'))
             console.log(menu)
//            menu.forEach((item)=>{
//                if(item.name == '首页展示管理'){
//                    item.children.forEach((item)=>{
//                        if(item.path == this.$route.path){
//                           item.operations.forEach((item)=>{
//                               if(item.operationName == '删除'){
//                                   this.del = true
//                               }else if(item.operationName == '查看'){
//                                   this.examine = true
//                               }else if(item.operationName == '修改'){
//                                   this.amend = true
//                               }
//                           })
//                        }
//                    })
//                }
//            })
            let list = this.tableData
            let vm = this
            let params = 1
            API.banner(params).then(function(result) {
                    if (result.code == 200) {
                        vm.loading = false
                        result.data.forEach((item) => {
                            list.push(item)
                        })
                    } else {
                        vm.loading = false
                        vm.$message.error({
                            showClose: true,
                            message: '列表获取失败',
                            duration: 2000
                        });
                    }
                },
                function(err) {
                    vm.loading = false
                    vm.$message.error({
                        showClose: true,
                        message: '列表获取失败',
                        duration: 2000
                    });
                });
        },
        methods: {
            handleEdit(row) {
                this.$store.commit('save_detail_info', row);
                this.$router.push({
                    path: `/showHomeManagement/modificationHomeBar/info/${row.id}`
                });
            },
            handleDelete(index, row) {
                let vm = this
                let parameter = {
                    id: row.id
                }
                let sign = null;
                this.$confirm('确定删除该项', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            API.deleteBanner(parameter).then(function(result) {
                                if (result.code == 200) {
                                    instance.confirmButtonLoading = false;
                                    sign = true
                                    done();
                                } else {
                                    instance.confirmButtonLoading = false;
                                    sign = false
                                    done();
                                }
                            }, (err) => {
                                instance.confirmButtonLoading = false;
                                sign = false
                                done();
                            })
                        }else{
                            done();
                        }
                    }
                }).then(() => {
                    if (sign) {
                        vm.tableData.splice(index, 1);
                        vm.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        vm.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                }).catch(() => {
                    
                });
            },
            handleCheck(row) {
                this.$store.commit('save_detail_info', row);
                this.$router.push({
                    path: `/showHomeManagement/examineHomeBar/info/${row.id}`
                });
            },
            onBtnDetailClick(row) {
                this.$router.push({
                    path: `/showHomeManagement/increasedHomeBar`
                });
            }
        }
    }

</script>
