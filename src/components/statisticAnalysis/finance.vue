<template>
    <div class="finance">
        <div class="indicator">
            <div class="head">今日关键指标</div>
            <div class="cen">
                <el-row>
                    <el-col :span="11" class="expend">
                        <div class="grid-content bg-purple">
                            <div class="tit">支出</div>
                            <div class="qian">-￥{{expend}}</div>
                            <div class="num">{{expendNum}}笔</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="Statistics">
            <div class="head">
                <el-select size="mini" v-model="value" @change="timeType">
                    <el-option label="今天" value="01"></el-option>
                    <el-option label="最近7天" value="02"></el-option>
                    <el-option label="最近30天" value="03"></el-option>
                </el-select>
                <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="time">
                </el-date-picker>
            </div>
            <div class="cen">
                <div class="chart" ref="chart"></div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .finance {
        .indicator {
            border: 1px solid #e6e7e8;
            .head {
                padding: 14px 0 14px 14px;
                font-size: 23px;
                background-color: #f4f5f9;
            }
            .cen {
                /*                height: 142px;*/
                background: #e8f5fe;
                border-bottom: 1px solid #ececed;
                .el-row {
                    padding: 20px 10px 0 20px;
                    .income,
                    .expend {
                        div {
                            margin-bottom: 20px;
                        }
                        .tit {
                            font-size: 15px;
                        }
                        .qian {
                            font-size: 23px;
                        }
                        .num {
                            color: #a4a6a8;
                            font-size: 15px;
                        }
                    }
                    .income .qian {
                        color: #4dc036;
                    }
                    .expend .qian {
                        color: #df1f1f;
                    }
                }
            }
        }
        .Statistics {
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
                .chart {
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
                    all: '',
                    await: '',
                    underway: '',
                    earnings: '',
                    failing: '',
                    succeed: ''
                },
                expend: '0',
                expendNum: '0',
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
            financeIndicator() {
                API.financeIndicator().then((result) => {
                    console.log(result)
                    if (result.code == 200) {
                        this.expend = result.data.money
                        this.expendNum = result.data.number
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
                API.financeView(params).then((result) => {
                    if (result.code == 200) {
                        let time = [];
                        let out = [];
                        let orderOut = [];
                        let infoOut = [];
                        let waitOut = [];
                        let match = [];
                        let info = [];
                        let need = [];
                        result.data.out.forEach((item) => {
                            time.push(item.time)
                            out.push(item.money)
                        })
                        result.data.orderOut.forEach((item) => {
                            orderOut.push(item.money)
                        })
                        result.data.infoOut.forEach((item) => {
                            infoOut.push(item.money)
                        })
                        result.data.waitOut.forEach((item) => {
                            waitOut.push(item.money)
                        })
                        result.data.match.forEach((item) => {
                            match.push(item.money)
                        })
                        result.data.info.forEach((item) => {
                            info.push(item.money)
                        })
                        result.data.need.forEach((item) => {
                            need.push(item.money)
                        })
                        this.chart.setOption({
                            color: color,
                            title: {
                                text: '财务趋势图'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: [{
                                    name: '支出(已转账)',
                                    icon: 'roundRect',
                                }, {
                                    name: '接单方转账',
                                    icon: 'roundRect',
                                }, {
                                    name: '信息方转账',
                                    icon: 'roundRect',
                                }, {
                                    name: '待转账',
                                    icon: 'roundRect',
                                }, {
                                    name: '撮合订单',
                                    icon: 'roundRect',
                                }, {
                                    name: '信息订单',
                                    icon: 'roundRect',
                                }, {
                                    name: '需求订单',
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
                                    name: '支出(已转账)',
                                    type: 'line',
                                    stack: '总量',
                                    data: out,
                                    smooth: true,
                                },
                                {
                                    name: '接单方转账',
                                    type: 'line',
                                    stack: '总量',
                                    data: orderOut,
                                    smooth: true,
                                },
                                {
                                    name: '信息方转账',
                                    type: 'line',
                                    stack: '总量',
                                    data: infoOut,
                                    smooth: true,
                                },
                                {
                                    name: '待转账',
                                    type: 'line',
                                    stack: '总量',
                                    data: waitOut,
                                    smooth: true,
                                },
                                     {
                                    name: '撮合订单',
                                    type: 'line',
                                    stack: '总量',
                                    data: match,
                                    smooth: true,
                                },
                                     {
                                    name: '信息订单',
                                    type: 'line',
                                    stack: '总量',
                                    data: info,
                                    smooth: true,
                                },
                                     {
                                    name: '需求订单',
                                    type: 'line',
                                    stack: '总量',
                                    data: need,
                                    smooth: true,
                                }
                            ]
                        })
                    }
                })
            },
        },
        mounted() {
            this.financeIndicator();
            this.initChart();
        }
    };

</script>
