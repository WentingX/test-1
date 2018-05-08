<template>
<div class="about">
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="关于我们" name="first">关于我们</el-tab-pane>
            <el-tab-pane label="相关报道" name="second">相关报道</el-tab-pane>
            <el-tab-pane label="合作伙伴" name="third">合作伙伴</el-tab-pane>
        </el-tabs>
        <div class="grid-content bg-purple-dark" style="text-align:right">
            <el-button type="success" @click="onBtnDetailClick()">新增</el-button>
        </div>
    </div>
    <div class="tab">
        <el-table ref="singleTable" v-loading="loading" :data="tableData" border style="width: 100%">
            <el-table-column property="sort" label="序号" align="center" min-width="6.16%">
            </el-table-column>
            <el-table-column property="name" label="名称" align="center" min-width="28.65%">
            </el-table-column>
            <el-table-column property="createTime" label="操作时间" align="center" min-width="43.33%">
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="23.54%">
                <template class="buts" slot-scope="scope">
       <el-button
          size="mini"
          type="text"
          class="examine"
          @click="handleCheck(scope.row)">查看</el-button>
        <el-button
          size="mini"
          type="text"
          class="amend"
          @click="handleEdit(scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="text"
          class="del"
          @click="handleDelete(scope.$index,scope.row)">删除</el-button>
      </template>
</el-table-column>
</el-table>
</div>
</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data() {
            return {
                activeName: '',
                tableData: [],
                loading: true
            };
        },
        created() {
            this.activeName = window.sessionStorage.getItem('wz') ? window.sessionStorage.getItem('wz') : 'first'
        },
        methods: {
            handleClick(tab, event) {
                sessionStorage.setItem('wz', this.activeName)
                if (tab.name == 'first') {
                    this.tableData = []
                    this.first()
                } else if (tab.name == 'second') {
                    this.tableData = []
                    this.second()
                } else if (tab.name == 'third') {
                    this.tableData = []
                    this.third()
                }
            },
            first() {
                let vm = this
                let params = 6
                vm.tableData = []
                vm.loading = true
                API.banner(params).then(function(result) {
                        if (result.code == 200) {
                            vm.loading = false
                            result.data.forEach((item) => {
                                vm.tableData.push(item)
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
            second() {
                let vm = this
                let params = {
                    pageNum: 1,
                    pageSize: 10
                }
                vm.tableData = []
                vm.loading = true
                API.report(params).then(function(result) {
                    console.log(result)
                    if (result.code == 200) {
                        vm.loading = false
                        result.data.list.forEach((item) => {
                            vm.tableData.push(item)
                        })
                    } else {
                        vm.loading = false
                        vm.$message.error({
                            showClose: true,
                            message: '列表获取失败',
                            duration: 2000
                        });
                    }
                })
            },
            third() {
                let vm = this
                let params = 7
                vm.tableData = []
                vm.loading = true
                API.banner(params).then(function(result) {
                        if (result.code == 200) {
                            vm.loading = false
                            result.data.forEach((item) => {
                                vm.tableData.push(item)
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
            onBtnDetailClick(row) {
                if (this.activeName == 'first') {
                    this.$router.push({
                        path: `/showHomeManagement/increasedAboutFirst`
                    });
                } else if (this.activeName == 'second') {
                    this.$router.push({
                        path: `/showHomeManagement/increasedAboutSecond`
                    });
                } else if (this.activeName == 'third') {
                    this.$router.push({
                        path: `/showHomeManagement/increasedAboutThird`
                    });
                }
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
                            if (this.activeName == 'second') {
                                API.delReport(row.id).then(function(result) {
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
                            } else {
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
                            }
                        } else {
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
            handleEdit(row) {
                if (this.activeName == 'first') {
                    this.$store.commit('save_detail_info', row);
                    this.$router.push({
                        path: `/showHomeManagement/modificationAboutFirst/info/${row.id}`
                    });
                } else if (this.activeName == 'second') {
                    this.$store.commit('save_detail_info', row);
                    this.$router.push({
                        path: `/showHomeManagement/modificationAboutSecond/info/${row.id}`
                    });
                } else if (this.activeName == 'third') {
                    this.$store.commit('save_detail_info', row);
                    this.$router.push({
                        path: `/showHomeManagement/modificationAboutThird/info/${row.id}`
                    });
                }

            },
            handleCheck(row) {
                if (this.activeName == 'first') {
                    this.$store.commit('save_detail_info', row);
                    this.$router.push({
                        path: `/showHomeManagement/examineAboutFirst/info/${row.id}`
                    });
                } else if (this.activeName == 'second') {
                    this.$store.commit('save_detail_info', row);
                    this.$router.push({
                        path: `/showHomeManagement/examineAboutSecond/info/${row.id}`
                    });
                } else if (this.activeName == 'third') {
                    this.$store.commit('save_detail_info', row);
                    this.$router.push({
                        path: `/showHomeManagement/examineAboutThird/info/${row.id}`
                    });
                }

            },

        },
        mounted() {
            if (this.activeName == 'first') {
                this.first()
            } else if (this.activeName == 'second') {
                this.second()
            } else if (this.activeName == 'third') {
                this.third()
            }
        }
    };

</script>
<style lang="scss">
    .about {
        .el-tabs__item {
            margin-bottom: 2px;
        }
        .el-tabs .el-tabs__header .el-tabs__item.is-active {
            background-color: #fff;
            color: #000;
        }
        .tab {
            margin-top: 20px;
            .el-table__header-wrapper {
                font-size: 13px;
                th.is-leaf {
                    background: #f3f4f7;
                }
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
