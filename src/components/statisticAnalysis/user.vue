<template>
<div class="userStatistics">
    <div class="indicator">
        <div class="head">今日关键指标</div>
        <div class="cen">
            <ul>
                <li>
                    <div>
                        <span class="tit">全部用户人数</span>
                        <span class="num">{{indicator.allUser}}</span>
                    </div>
                    <div>
                        <span class="tit">新增注册用户</span>
                        <span class="num">{{indicator.newUser}}</span>
                    </div>
                </li>
                <li>
                    <div class="tit">新增信息方</div>
                    <div class="num">{{indicator.newInfo}}</div>
                </li>
                <li>
                    <div class="tit">新增接单方</div>
                    <div class="num">{{indicator.newOrders}}</div>
                </li>
                <li>
                    <div class="tit">新增需求方</div>
                    <div class="num">{{indicator.newNeed}}</div>
                </li>
            </ul>
        </div>
    </div>
    <div class="user">
        <div class="head">
            <el-select size="mini" v-model="value" @change="timeType">
                <el-option label="今天" value="01"></el-option>
                <el-option label="最近7天" value="02"></el-option>
                <el-option label="最近30天" value="03"></el-option>
            </el-select>
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="time">
            </el-date-picker>
        </div>
        <div class="cen">
            <div class="chart" ref="chart"></div>
        </div>
    </div>
    <div class="authentication">
        <div class="head">
            <el-select size="mini" v-model="value2" @change="timeType2">
                <el-option label="今天" value="01"></el-option>
                <el-option label="最近7天" value="02"></el-option>
                <el-option label="最近30天" value="03"></el-option>
            </el-select>
            <el-date-picker
              v-model="times"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="time2">
            </el-date-picker>
        </div>
        <div class="cen">
            <div class="chart1" ref="chart1"></div>
        </div>
    </div>
</div>
</template>
<style lang="scss">
    .userStatistics {
        .indicator {
            border: 1px solid #e6e7e8;
            .head {
                padding: 14px 0 14px 14px;
                font-size: 23px;
                background-color: #f4f5f9;
            }
            .cen {
                padding: 22px 0 30px 0;
                ul {
                    display: flex;
                    padding: 0;
                    li {
                        list-style: none;
                        width: 25%;
                        text-align: center;
                        border-left: 1px solid #e6e7e8;
                        .tit {
                            font-size: 17px;
                            display: block;
                            margin-bottom: 20px;
                        }
                        .num {
                            font-size: 23px;
                            display: block;
                        }
                    }
                    li:nth-child(1) {
                        border: none;
                        display: flex;
                        div:nth-child(1) {
                            margin-left: 35px;
                            margin-right: 40px;
                        }
                    }
                }
            }
        }
        .user,
        .authentication {
            margin-top: 60px;
            border: 1px solid #e6e7e8;
            .head {
                background-color: #f4f5f9;
                .el-input__inner {
                    border: none;
                    background-color: rgba(255, 255, 255, 0);
                }
                .el-range-input {
                    background-color: rgba(255, 255, 255, 0);
                }
            }
            .cen {
                .chart,
                .chart1 {
                    width: 100%;
                    height: 300px;
                }
            }
        }
    }

</style>
<script>
    import API from '@/api/api'
    import echarts from 'echarts'
    export default {
        data() {
            return {
                indicator: {
                    newUser: '',
                    newInfo: '',
                    newOrders: '',
                    allUser: '',
                    newNeed: '',
                },
                value: '02',
                value6: '',
                value2: '02',
                times: ''
            };
        },
        methods: {
            time() {
                let params
                if (this.value6 != null) {
                    params = {
                        startTime: this.value6[0],
                        endTime: this.value6[1],
                    }
                } else {
                    params = {
                        timeType: '02'
                    }
                }
                this.initChart(params)
            },
            timeType() {
                let params = {
                    timeType: this.value
                }
                this.initChart(params)
            },
            time2() {
                let params
                if (this.times != null) {
                    params = {
                        startTime: this.times[0],
                        endTime: this.times[1],
                    }
                } else {
                    params = {
                        timeType: '02'
                    }
                }
                this.initChart2(params)
            },
            timeType2() {
                let params = {
                    timeType: this.value2
                }
                this.initChart2(params)
            },
            userIndicator() {
                API.userIndicator().then((result) => {
                    console.log(result)
                    if (result.code == 200) {
                        this.indicator.newUser = result.data.newUser
                        this.indicator.newInfo = result.data.newInfo
                        this.indicator.newOrders = result.data.newOrders
                        this.indicator.allUser = result.data.allUser
                        this.indicator.newNeed = result.data.newNeed
                    }
                })
            },
            initChart(params) {
                this.chart = echarts.init(this.$refs.chart);
                let initial = {
                    timeType: '02'
                }
                if (params == undefined) {
                    params = initial
                }
                let color = ['#5793f3', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
                API.userView(params).then((result) => {
                    if (result.code == 200) {
                        let time = [];
                        let newUserNum = [];
                        let newInfoNum = [];
                        let newOrdersNum = [];
                        let newNeedNum = [];
                        result.data.newUser.forEach((item) => {
                            time.push(item.time)
                            newUserNum.push(item.number)
                        })
                        result.data.newInfo.forEach((item) => {
                            newInfoNum.push(item.number)
                        })
                        result.data.newOrder.forEach((item) => {
                            newOrdersNum.push(item.number)
                        })
                        result.data.newNeed.forEach((item) => {
                            newNeedNum.push(item.number)
                        })
                        this.chart.setOption({
                            color: color,
                            title: {
                                text: '用户趋势图'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: [{
                                    name: '新增注册用户',
                                    icon: 'roundRect',
                                }, {
                                    name: '新增信息方',
                                    icon: 'roundRect',
                                }, {
                                    name: '新增接单方',
                                    icon: 'roundRect',
                                }, {
                                    name: '新增需求方',
                                    icon: 'roundRect',
                                }],
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            toolbox: {
                                feature: {
                                    saveAsImage: {}
                                }
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: time
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                    name: '新增注册用户',
                                    type: 'line',
                                    stack: '总量',
                                    data: newUserNum,
                                    smooth: true,
                                },
                                {
                                    name: '新增信息方',
                                    type: 'line',
                                    stack: '总量',
                                    data: newInfoNum,
                                    smooth: true,
                                },
                                {
                                    name: '新增接单方',
                                    type: 'line',
                                    stack: '总量',
                                    data: newOrdersNum,
                                    smooth: true,
                                },
                                {
                                    name: '新增需求方',
                                    type: 'line',
                                    stack: '总量',
                                    data: newNeedNum,
                                    smooth: true,
                                }
                            ]
                        })
                    }
                })
            },
            initChart2(params) {
                this.chart1 = echarts.init(this.$refs.chart1);
                let initial = {
                    timeType: '02'
                }
                if (params == undefined) {
                    params = initial
                }
                API.authenticationView(params).then((result) => {
                    if (result.code == 200) {
                        let time = [];
                        let companyAuthNum = [];
                        let idCardAuthNum = [];
                        result.data.companyAuth.forEach((item) => {
                            time.push(item.time)
                            companyAuthNum.push(item.number)
                        })
                        result.data.idCardAuth.forEach((item) => {
                            idCardAuthNum.push(item.number)
                        })
                         this.chart1.setOption({
                            title: {
                                text: '认证趋势图'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: [{
                                    name: '个人认证',
                                    icon: 'roundRect',
                                }, {
                                    name: '企业认证',
                                    icon: 'roundRect',
                                }],
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            toolbox: {
                                feature: {
                                    saveAsImage: {}
                                }
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: time
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                    name: '个人认证',
                                    type: 'line',
                                    stack: '总量',
                                    data: companyAuthNum,
                                    smooth: true,
                                },
                                {
                                    name: '企业认证',
                                    type: 'line',
                                    stack: '总量',
                                    data: idCardAuthNum,
                                    smooth: true,
                                }
                            ]
                        })

                    }
                })
            },

        },
        mounted() {
            this.userIndicator();
            this.initChart();
            this.initChart2();
        }
    };

</script>
