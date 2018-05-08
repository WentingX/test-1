<template>
<div class="completeInformation">
    <div class="top">
        <div class="grid-content bg-purple-dark tit">| 全部意向信息</div>
        <el-row class="search">
            <el-col :span="6">
                <el-input v-model="text" placeholder="输入你想搜索的内容"></el-input>
            </el-col>
            <el-col :span="5">
                <el-button icon="el-icon-search" @click="search()">搜索</el-button>
            </el-col>
        </el-row>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="telephone" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select clearable v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间">
                <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <el-row class="btns">
            <el-button @click="inquire()">查询</el-button>
            <el-button @click="replacement()">重置</el-button>
        </el-row>
    </div>
    <div class="pad"></div>
    <div class="table">
        <el-row>
            <el-col :span="1.5">
                <div class="grid-content bg-purple" :class="{active:isActive}" @click="changeBgc()">投后管理</div>
            </el-col>
            <el-col :span="1.5">
                <div class="grid-content bg-purple-light" :class="{active:isActives}" @click="changeBgcs()">高端定制
                </div>
            </el-col>
            <el-col :span="1.5">
                <div class="grid-content all bg-purple" @click="intention()"><i class="el-icon-menu" style="margin-right: 5px;"></i>待处理信息
                </div>
            </el-col>
        </el-row>
        <div class="tab">
      <el-table
    ref="singleTable"
    v-loading="loading"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      min-width="6.49%">
    </el-table-column>
    <el-table-column
      property="name"
      label="姓名"
      align="center"
      min-width="8.43%">
    </el-table-column>
    <el-table-column
      property="telephone"
      label="联系电话"
      align="center"
      min-width="9.66%">
    </el-table-column>
    <el-table-column
      property="email"
      label="邮箱地址"
      align="center"
      min-width="14.76%">
    </el-table-column>
    <el-table-column
      property="create_time"
      label="时间"
      align="center"
      min-width="13.53%">
    </el-table-column>
    <el-table-column
      property="requirement"
      label="需求详情"
      align="center"
      min-width="34.83%"
      class-name="asas">
    </el-table-column>
    <el-table-column
     
      label="状态"
      align="center"
      min-width="12.3%">
      <template scope="scope">
            <span :class="{'tg': (scope.row.status === '已联系'),'shibai':(scope.row.status === '无效号码'),'without':(scope.row.status === '未联系')}">{{ scope.row.status}}</span>
      </template>
</el-table-column>
</el-table>
<el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
<el-pagination v-if="tableData!=''" background layout="prev, pager, next" :current-page="page" :total="total" :page-size="10" @current-change="handleCurrentChange">
</el-pagination>
</div>
</div>
</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data() {
            return {
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7: '',
                options: [{
                    value: '1',
                    label: '已联系'
                }, {
                    value: '-1',
                    label: '无效号码'
                }, {
                    value: '0',
                    label: '未联系'
                }],
                value: '',
                isActive: true,
                isActives: false,
                tableData: [],
                page: 1,
                total: 0,
                loading: true,
                list: null,
                downloadLoading: false,
                text: '',
                name: '',
                telephone: ''
            };
        },
        methods: {
            //分页切换
            handleCurrentChange(val) {
                this.page = val
                if (this.isActive) {
                    this.getInvestmentList()
                } else if (this.isActives) {
                    this.getCustomizationList()
                }
            },
            //投后管理列表
            getInvestmentList() {
                let vm = this
                let params = {
                    pageNum: this.page,
                    pageSize: 10,
                    text: '',
                    is: ''
                }
                vm.loading = true
                vm.tableData = []
                API.investment(params).then(function(result) {
                    if (result.code == 200) {
                        vm.total = parseInt(result.data.total)
                        vm.loading = false
                        result.data.list.forEach((item) => {
                            vm.tableData.push(item)
                            if (item.status == 1) {
                                item.status = '已联系'
                            } else if (item.status == -1) {
                                item.status = '无效号码'
                            } else if (item.status == 0) {
                                item.status = '未联系'
                            }
                        })
                    } else {
                        vm.errors('列表获取失败')
                    }
                }, function(error) {
                    vm.errors('列表获取失败')
                    //                    vm.loading = true
                    //                    vm.$message.error({
                    //                        showClose: true,
                    //                        message: '列表获取失败',
                    //                        duration: 2000
                    //                    })
                    //                    vm.loading = false
                })
            },
            //高端定制列表
            getCustomizationList() {
                let vm = this
                let params = {
                    pageNum: this.page,
                    pageSize: 10,
                    text: '',
                    is: ''
                }
                vm.loading = true
                vm.tableData = []
                API.customization(params).then(function(result) {
                    if (result.code == 200) {
                        vm.total = parseInt(result.data.total)
                        vm.loading = false
                        result.data.list.forEach((item) => {
                            vm.tableData.push(item)
                            if (item.status == 1) {
                                item.status = '已联系'
                            } else if (item.status == -1) {
                                item.status = '无效号码'
                            } else if (item.status == 0) {
                                item.status = '未联系'
                            }
                        })
                    } else {
                        vm.errors('列表获取失败')
                    }
                }, function(error) {
                    vm.errors('列表获取失败')
                })
            },
            //切换投后管理
            changeBgc() {
                this.isActive = true
                this.isActives = false
                this.page = 1
                this.name = ''
                this.telephone = ''
                this.value = ''
                this.value7 = ''
                this.text = ''
                this.getInvestmentList()
            },
            //切换高端定制
            changeBgcs() {
                this.isActives = true
                this.isActive = false
                this.page = 1
                this.name = ''
                this.telephone = ''
                this.value = ''
                this.value7 = ''
                this.text = ''
                this.getCustomizationList()
            },
            //未处理信息页面跳转
            intention() {
                this.$router.push({
                    path: `/showHomeManagement/intention`
                })
            },
            //导出Excel表格
            handleDownload() {
                this.downloadLoading = true
                import ('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['姓名', '联系电话', '邮箱地址', '时间', '需求详情', '状态']
                    const filterVal = ['name', 'telephone', 'email', 'create_time', 'requirement', 'status']
                    const data = this.formatJson(filterVal, this.tableData)
                    excel.export_json_to_excel(tHeader, data, '意向信息表格')
                    this.downloadLoading = false
                })
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
            //筛选
            inquire() {
                let vm = this;
                let params = {
                    pageNum: this.page,
                    pageSize: 10,
                    name: this.name,
                    telephone: this.telephone,
                    status: this.value,
                    startTime: this.value7[0],
                    endTime: this.value7[1]
                }
                vm.loading = true
                if (this.isActive) {
                    API.investmentInquire(params).then(function(result) {
                        if (result.code == 200) {
                            vm.total = parseInt(result.data.total)
                            vm.tableData = []
                            vm.loading = false
                            result.data.list.forEach((item) => {
                                vm.tableData.push(item)
                                if (item.status == 1) {
                                    item.status = '已联系'
                                } else if (item.status == -1) {
                                    item.status = '无效号码'
                                } else if (item.status == 0) {
                                    item.status = '未联系'
                                }
                            })
                        } else {
                            vm.errors('列表获取失败')
                        }
                    }, function(error) {
                        vm.errors('列表获取失败')
                    })
                } else if (this.isActives) {
                    API.customizationInquire(params).then(function(result) {
                        if (result.code == 200) {
                            vm.total = parseInt(result.data.total)
                            vm.tableData = []
                            vm.loading = false
                            result.data.list.forEach((item) => {
                                vm.tableData.push(item)
                                if (item.status == 1) {
                                    item.status = '已联系'
                                } else if (item.status == -1) {
                                    item.status = '无效号码'
                                } else if (item.status == 0) {
                                    item.status = '未联系'
                                }
                            })
                        } else {
                            vm.errors('列表获取失败')
                        }
                    }, function(error) {
                        vm.errors('列表获取失败')
                    })
                }

            },
            //搜索
            search() {
                let vm = this
                let params = {
                    pageNum: this.page,
                    pageSize: 10,
                    text: this.text,
                    is: ''
                }
                vm.loading = true
                if (this.isActive) {
                    API.investment(params).then(function(result) {
                        if (result.code == 200) {
                            vm.total = parseInt(result.data.total)
                            vm.tableData = []
                            vm.loading = false
                            result.data.list.forEach((item) => {
                                vm.tableData.push(item)
                                if (item.status == 1) {
                                    item.status = '已联系'
                                } else if (item.status == -1) {
                                    item.status = '无效号码'
                                } else if (item.status == 0) {
                                    item.status = '未联系'
                                }
                            })
                        } else {
                            vm.errors('列表获取失败')
                        }
                    }, function(error) {
                        vm.errors('列表获取失败')
                    })
                } else if (this.isActives) {
                    API.customization(params).then(function(result) {
                        if (result.code == 200) {
                            vm.total = parseInt(result.data.total)
                            vm.tableData = []
                            vm.loading = false
                            result.data.list.forEach((item) => {
                                vm.tableData.push(item)
                                if (item.status == 1) {
                                    item.status = '已联系'
                                } else if (item.status == -1) {
                                    item.status = '无效号码'
                                } else if (item.status == 0) {
                                    item.status = '未联系'
                                }
                            })
                        } else {
                            vm.errors('列表获取失败')
                        }
                    }, function(error) {
                        vm.errors('列表获取失败')
                    })
                }
            },
            //重置
            replacement() {
                if (this.isActive) {
                    this.getInvestmentList()
                } else if (this.isActives) {
                    this.getCustomizationList()
                }
                this.name = ''
                this.telephone = ''
                this.value = ''
                this.value7 = ''
                this.text = ''
            },
            //错误
            errors(cont) {
                this.loading = true
                this.$message.error({
                    showClose: true,
                    message: cont,
                    duration: 2000
                })
                this.loading = false
            }
        },
        mounted() {
            this.getInvestmentList()
        }
    };

</script>
<style lang="scss">
    .completeInformation {
        .top {
            .tit {
                color: #556191;
                margin-bottom: 15px;
            }
            .search {
                margin-bottom: 15px;
                .el-button {
                    background-color: #4A4F63;
                    color: #fff;
                    margin-left: 20px;
                    padding: 12px 20px;
                }
            }
            .el-form {
                .el-input {
                    width: 120px;
                }
                .el-select {
                    width: 120px;
                }
            }
            .btns {
                text-align: center;
                .el-button {
                    background-color: #4A4F63;
                    color: #fff;
                    margin-left: 20px;
                    padding: 11px 48px;
                }
            }
            padding-bottom: 38px;
        }
        .pad {
            background-color: #F3F4F7;
            height: 10px;
            margin: 0 -35px;
        }
        .table {
            padding-top: 30px;
            .el-row {
                line-height: 16px;
                background-color: #42485b;
                color: #fff;
                margin-bottom: 12px;
                .grid-content {
                    padding: 12px 18px;
                    cursor: pointer;
                    box-sizing: border-box;
                }
                .active {
                    background-color: #3388ff;
                }
                .all {
                    background-color: #3388ff;
                }
                .el-col:nth-child(1) {
                    /*                background-color: #3388ff;*/
                }
                .el-col:nth-child(3) {
                    float: right;
                }
                .table_1_column_35 {
                    color: #4dc036;
                }
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
                .tg {
                    color: #4dc036;
                }
                .shibai {
                    color: #df1f1f;
                }
                .without {
                    color: #3388ff;
                }
            }
            .el-table__body-wrapper {
                font-size: 12px;
                .asas {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                @-moz-document url-prefix() {
                        .asas {
                            overflow: hidden;
                            display: block;
                            text-overflow: ellipsis;
                            white-space: nowrap;

                        }
                    }
            }
            .el-pagination {
                text-align: right;
                font-weight: inherit;
                float: right;
                margin-top: 20px;
            }
            .filter-item {
                margin-top: 20px;
            }
        }
    }

</style>
