<template>
<div class="together">
    <div class="indicator">
        <div class="head">今日关键指标</div>
        <div class="cen">
            <ul>
                <li>
                    <div>
                        <span class="tit">全部撮合</span>
                        <span class="num">{{indicator.all}}</span>
                    </div>
                </li>
                <li>
                    <div class="tit">待撮合</div>
                    <div class="num">{{indicator.await}}</div>
                </li>
                <li>
                    <div class="tit">撮合中</div>
                    <div class="num">{{indicator.underway}}</div>
                </li>
                <li>
                    <div class="tit">待收益</div>
                    <div class="num">{{indicator.earnings}}</div>
                </li>
                 <li>
                    <div>
                        <span class="tit">撮合失败</span>
                        <span class="num">{{indicator.failing}}</span>
                    </div>
                </li>
                 <li>
                    <div>
                        <span class="tit">交易成功</span>
                        <span class="num">{{indicator.succeed}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="Statistics">
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
</div>
</template>
<style lang="scss">
    .together {
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
                        /*                        padding: 0 55px;*/
                        width: 16.6%;
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
            togetherIndicator() {
                API.togetherIndicator().then((result) => {
                    console.log(result)
                    if (result.code == 200) {
                        this.indicator.all = result.data.allMatch
                        this.indicator.await = result.data.wait
                        this.indicator.underway = result.data.going
                        this.indicator.earnings = result.data.waitMoney
                        this.indicator.failing = result.data.fail
                        this.indicator.succeed = result.data.success
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
                API.togetherView(params).then((result) => {
                    if (result.code == 200) {
                        let time = [];
                        let all = [];
                        let wait = [];
                        let underway = [];
                        let earnings = [];
                        let failing = [];
                        let succeed = [];
                        result.data.all.forEach((item) => {
                            time.push(item.time)
                            all.push(item.number)
                        })
                        result.data.wait.forEach((item) => {
                            wait.push(item.number)
                        })
                        result.data.going.forEach((item) => {
                            underway.push(item.number)
                        })
                        result.data.waitIn.forEach((item) => {
                            earnings.push(item.number)
                        })
                        result.data.fail.forEach((item) => {
                            failing.push(item.number)
                        })
                        result.data.success.forEach((item) => {
                            succeed.push(item.number)
                        })
                        this.chart.setOption({
                            color: color,
                            title: {
                                text: '撮合趋势图'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: [{
                                    name: '全部撮合',
                                    icon: 'roundRect',
                                }, {
                                    name: '待撮合',
                                    icon: 'roundRect',
                                }, {
                                    name: '撮合中',
                                    icon: 'roundRect',
                                }, {
                                    name: '待收益',
                                    icon: 'roundRect',
                                },{
                                    name: '撮合失败',
                                    icon: 'roundRect',
                                },{
                                    name: '交易成功',
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
                                    name: '全部撮合',
                                    type: 'line',
                                    stack: '总量',
                                    data: all,
                                    smooth: true,
                                },
                                {
                                    name: '待撮合',
                                    type: 'line',
                                    stack: '总量',
                                    data: wait,
                                    smooth: true,
                                },
                                {
                                    name: '撮合中',
                                    type: 'line',
                                    stack: '总量',
                                    data: underway,
                                    smooth: true,
                                },
                                {
                                    name: '待收益',
                                    type: 'line',
                                    stack: '总量',
                                    data: earnings,
                                    smooth: true,
                                },
                                {
                                    name: '撮合失败',
                                    type: 'line',
                                    stack: '总量',
                                    data: failing,
                                    smooth: true,
                                }, {
                                    name: '交易成功',
                                    type: 'line',
                                    stack: '总量',
                                    data: succeed,
                                    smooth: true,
                                }
                            ]
                        })
                    }
                })
            },
        },
        mounted() {
            this.togetherIndicator();
            this.initChart();
        }
    };

</script>
