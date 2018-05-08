<template>
<div class="intention">
    <div class="grid-content bg-purple-dark tit">| 待处理意向信息</div>
    <div>
        <el-row>
            <el-col :span="1.5">
                <div class="grid-content bg-purple" :class="{active:isActive}" @click="changeBgc()">投后管理</div>
            </el-col>
            <el-col :span="1.5">
                <div class="grid-content bg-purple-light" :class="{active:isActives}" @click="changeBgcs()">高端定制
                </div>
            </el-col>
            <el-col :span="1.5">
                <div class="grid-content all bg-purple" @click="completeInformation()"><i class="el-icon-menu" style="margin-right: 5px;"></i>全部信息
                </div>
            </el-col>
        </el-row>
    </div>
    <div class="inList" v-loading="loading">
        <el-col class="item" v-for="(item, index) in investmentList" :offset="index > 0 ? 0.5 : 0" v-if="item!=''">
            <el-card :body-style="{ padding: '0px' }">
                <div style="">
                    <div class="card-top">
                        <div style="font-size:18px">{{item.name}}</div>
                        <div class="cont" style="font-size:14px">
                            <el-col :span="10">需求详情：</el-col>
                            <el-col class="asas" :span="14">{{item.requirement}}</el-col>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div class="card-bom">
                        <div class="mr"><i class="el-icon-phone"></i>{{item.telephone}}</div>
                        <div class="mr"><i class="el-icon-message"></i>{{item.email}}</div>
                        <div class="mr"><i class="el-icon-date"></i>{{item.create_time}}</div>
                        <div style="text-align: center">
                            <el-button type="success" icon="el-icon-check" @click="operation(item,1,index)"></el-button>
                            <el-button type="danger" icon="el-icon-close" @click="operation(item,-1,index)"></el-button>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-col>
        <div style="clear: both;"></div>
        <div v-if="investmentList==''" style="text-align:center">暂无数据</div>
        <el-pagination background layout="prev, pager, next" :current-page="page" :total="total" :page-size="10" @current-change="handleCurrentChange" v-if="total!=''">
        </el-pagination>
    </div>

</div>
</template>
<style lang="scss">
    .intention {
        .tit {
            color: #556191;
            margin-bottom: 15px;
        }
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
        }
        .inList {
            .item {
                max-width: 18%;
                margin-left: 10px;
                margin-right: 0;
                margin-bottom: 20px;
                min-height: 250px;
            }
            .card-top {
                background-color: #f6f6f6;
                padding: 14px 8px;
                .cont {
                    height: 55px;
                    background-color: #f6f6f6;
                    .asas {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                    }
                    @-moz-document url-prefix() {
                        .asas {
                            overflow: hidden;
                            display: block;
                            text-overflow: ellipsis;
                            white-space: nowrap;

                        }
                        .asas:after {
                            content: "...";
                            position: absolute;
                            right: 3px;
                            top: 30px;
                        }
                    }

                }
            }
            .card-bom {
                padding: 8px 8px 8px 8px;
                font-size: 14px;
                .mr {
                    line-height: 27px;
                    i {
                        margin-right: 10px;
                    }
                }

            }
        }
        .el-pagination {
            text-align: right;
            font-weight: inherit;
        }
        .el-loading-spinner {
            margin-top: 100px;
        }
    }

</style>
<script>
    import API from '@/api/api'

    export default {
        data() {
            return {
                isActive: true,
                isActives: false,
                investmentList: [],
                total: 0,
                page: 1,
                loading: true
            }
        },
        created() {

        },
        methods: {
            handleCurrentChange(val) {
                this.page = val
                if (this.isActive) {
                    this.getInvestmentList()
                } else if (this.isActives) {
                    this.getCustomizationList()
                }
            },
            getInvestmentList() {
                let vm = this
                let params = {
                    pageNum: this.page,
                    pageSize: 10,
                    text: '',
                    is: '1'
                }
                vm.loading = true
                vm.investmentList = []
                API.investment(params).then(function(result) {
                    if (result.code == 200) {
                        vm.total = parseInt(result.data.total)
                        vm.loading = false
                        result.data.list.forEach((item) => {
                            vm.investmentList.push(item)
                        })
                    } else {
                        vm.loading = true
                        vm.$message.error({
                            showClose: true,
                            message: '列表获取失败',
                            duration: 2000
                        })
                        vm.loading = false
                    }
                }, function(error) {
                    vm.loading = true
                    vm.$message.error({
                        showClose: true,
                        message: '列表获取失败',
                        duration: 2000
                    })
                    vm.loading = false
                })
            },
            getCustomizationList() {
                let vm = this
                let params = {
                    pageNum: this.page,
                    pageSize: 10,
                    text: '',
                    is: '1'
                }
                vm.loading = true
                vm.investmentList = []
                API.customization(params).then(function(result) {
                    if (result.code == 200) {
                        vm.total = parseInt(result.data.total)
                        vm.loading = false
                        result.data.list.forEach((item) => {
                            vm.investmentList.push(item)
                        })
                    } else {
                        vm.loading = true
                        vm.$message.error({
                            showClose: true,
                            message: '列表获取失败',
                            duration: 2000
                        })
                        vm.loading = false
                    }
                }, function(error) {
                    vm.loading = true
                    vm.$message.error({
                        showClose: true,
                        message: '列表获取失败',
                        duration: 2000
                    })
                    vm.loading = false
                })
            },
            changeBgc() {
                this.isActive = true
                this.isActives = false
                this.page = 1
                this.getInvestmentList()
            },
            changeBgcs() {
                this.isActives = true
                this.isActive = false
                this.page = 1
                this.getCustomizationList()
            },
            completeInformation() {
                this.$router.push({
                    path: `/showHomeManagement/completeInformation`
                })
            },
            operation(row, status, index) {
                let vm = this
                let is = null
                if (this.isActive) {
                    is = 0
                } else if (this.isActives) {
                    is = 1
                }
                let params = 'gtType=' + is + '&idnum=' + row.id + '&tf=' + status
                API.operation(params).then(function(result) {
                    if (result.code == 200) {
                        vm.investmentList.splice(index, 1);
                        vm.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                    } else {
                        vm.$message.error({
                            showClose: true,
                            message: '操作失败',
                            duration: 2000
                        })
                    }
                }, function error() {
                    vm.$message.error({
                        showClose: true,
                        message: '操作失败',
                        duration: 2000
                    })
                })
            }
        },
        mounted() {
            this.getInvestmentList()
        }

    }

</script>
