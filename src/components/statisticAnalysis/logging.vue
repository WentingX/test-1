<template>
    <div class="logging">
        <div class="top">
            <div class="grid-content bg-purple-dark tit">| 登录日志</div>
            <el-row class="search">
                <el-col :span="6">
                    <el-input v-model="text" placeholder="输入你想搜索的内容"></el-input>
                </el-col>
                <el-col :span="5">
                    <el-button icon="el-icon-search" @click="search()">搜索</el-button>
                </el-col>
            </el-row>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="工号">
                    <el-input v-model="name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="IP地址">
                    <el-input v-model="IP" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="登录时间">
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
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
            <el-table :data="tableData" border v-loading="loading" style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="jobNumber" label="工号">
                </el-table-column>
                <el-table-column prop="loginIp" label="IP地址">
                </el-table-column>
                <el-table-column prop="loginSrc" label="登录来源">
                </el-table-column>
                <el-table-column prop="loginTime" label="登录时间">
                </el-table-column>
                <el-table-column prop="loginRemark" label="备注">
                </el-table-column>
            </el-table>
            <el-pagination v-if="tableData!=''" background layout="prev, pager, next" :current-page="page" :total="total" :page-size="10" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<style lang="scss">
    .logging {
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
                .el-form-item {
                    margin-right: 110px;
                }
                .el-input {
                    width: 230px;
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
            .el-pagination {
                text-align: right;
                font-weight: inherit;
                float: right;
                margin-top: 20px;
            }
        }
    }

</style>
<script>
    import API from '@/api/api'
    export default {
        data() {
            return {
                text: '',
                name: '',
                IP: '',
                value1: '',
                tableData: [],
                loading: true,
                page: 1,
                total: 0,
            };
        },
        methods: {
            //列表
            loggingList(parameter) {
                let params = {
                    pageNum: this.page,
                    pageSize: 10,
                }
                if (parameter == undefined) {
                    parameter = params
                }

                this.tableData = [];
                this.loading = true
                API.loggingList(parameter).then((result) => {
                    console.log(result)
                    if (result.code == 200) {
                        this.loading = false
                        this.total = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            this.tableData.push(item)
                        })
                    }
                })
            },
            //分页切换
            handleCurrentChange(val) {
                this.page = val
                this.loggingList()
            },
            //搜索
            search() {
                let params = {
                    pageNum: this.page,
                    pageSize: 10,
                    condition: this.text,
                }
                this.loggingList(params)
            },
            //查询
            inquire() {
                let params = {
                    pageNum: this.page,
                    pageSize: 10,
                    ip: this.IP,
                    jobNumber: this.name,
                    loginTime: this.value1
                }
                this.loggingList(params)
            },
            //重置
            replacement() {
                this.name = ''
                this.value1 = ''
                this.IP = ''
                this.text = ''
                this.loggingList()
            },
        },
        mounted() {
            this.loggingList()
        }
    };

</script>
