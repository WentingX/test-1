<template>
<div class="orderStatistics">
   <div class="message">
       <div class="indicator">
        <div class="head">今日关键指标(信息订单)</div>
        <div class="cen">
            <ul>
                <li>
                    <div>
                        <span class="tit">全部订单</span>
                        <span class="num">{{indicator.all}}</span>
                    </div>
                    <div>
                        <span class="tit">交易成功</span>
                        <span class="num">{{indicator.succeed}}</span>
                    </div>
                </li>
                <li>
                    <div class="tit">审核订单</div>
                    <div class="num">{{indicator.audit}}</div>
                </li>
                <li>
                    <div class="tit">派单订单</div>
                    <div class="num">{{indicator.send}}</div>
                </li>
                <li>
                    <div class="tit">进行中订单</div>
                    <div class="num">{{indicator.underway}}</div>
                </li>
                <li>
                    <div class="tit">待验收订单</div>
                    <div class="num">{{indicator.wait}}</div>
                </li>
                <li>
                    <div class="tit">收益订单</div>
                    <div class="num">{{indicator.earnings}}</div>
                </li>
                <li>
                    <div class="tit">交易失败订单</div>
                    <div class="num">{{indicator.failing}}</div>
                </li>
            </ul>
        </div>
    </div>
    <div style="margin-top:50px;">
    <el-radio-group v-model="radio" @change="type(radio)">
      <el-radio-button label="01">审核订单</el-radio-button>
      <el-radio-button label="02">派单订单</el-radio-button>
      <el-radio-button label="03">进行中订单</el-radio-button>
      <el-radio-button label="04">待验收订单</el-radio-button>
      <el-radio-button label="05">收益订单</el-radio-button>
      <el-radio-button label="06">交易成功订单</el-radio-button>
      <el-radio-button label="07">交易失败订单</el-radio-button>
    </el-radio-group>
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
   <div class="demand">
       <div class="indicator">
        <div class="head">今日关键指标(需求订单)</div>
        <div class="cen">
            <ul>
                <li>
                    <div>
                        <span class="tit">全部订单</span>
                        <span class="num">{{indicator2.all}}</span>
                    </div>
                    <div>
                        <span class="tit">交易成功</span>
                        <span class="num">{{indicator2.succeed}}</span>
                    </div>
                </li>
                <li>
                    <div class="tit">审核订单</div>
                    <div class="num">{{indicator2.audit}}</div>
                </li>
                <li>
                    <div class="tit">派单订单</div>
                    <div class="num">{{indicator2.send}}</div>
                </li>
                <li>
                    <div class="tit">进行中订单</div>
                    <div class="num">{{indicator2.underway}}</div>
                </li>
                <li>
                    <div class="tit">待验收订单</div>
                    <div class="num">{{indicator2.wait}}</div>
                </li>
                <li>
                    <div class="tit">收益订单</div>
                    <div class="num">{{indicator2.earnings}}</div>
                </li>
                <li>
                    <div class="tit">交易失败订单</div>
                    <div class="num">{{indicator2.failing}}</div>
                </li>
            </ul>
        </div>
    </div>
    <div style="margin-top:50px;">
    <el-radio-group v-model="radio2" @change="type2()">
      <el-radio-button label="01">审核订单</el-radio-button>
      <el-radio-button label="02">派单订单</el-radio-button>
      <el-radio-button label="03">进行中订单</el-radio-button>
      <el-radio-button label="04">待验收订单</el-radio-button>
      <el-radio-button label="05">收益订单</el-radio-button>
      <el-radio-button label="06">交易成功订单</el-radio-button>
      <el-radio-button label="07">交易失败订单</el-radio-button>
    </el-radio-group>
  </div>
    <div class="Statistics">
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
              @change="time">
            </el-date-picker>
        </div>
        <div class="cen">
            <div class="chart1" ref="chart1"></div>
        </div>
    </div>
   </div>
</div>
</template>
<style lang="scss">
    .orderStatistics {
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
                        width: 40%;
                        div:nth-child(1) {
                            margin-left: 35px;
                            margin-right: 40px;
                        }
                    }
                }
            }
        }
        .Statistics,
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
        .demand {
            margin-top: 50px;
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
                    succeed: '',
                    audit: '',
                    send: '',
                    underway: '',
                    wait: '',
                    earnings: '',
                    failing: ''
                },
                indicator2: {
                    all: '',
                    succeed: '',
                    audit: '',
                    send: '',
                    underway: '',
                    wait: '',
                    earnings: '',
                    failing: ''
                },
                value: '02',
                value6: '',
                value2: '02',
                times: '',
                radio: '01',
                radio2: '01',
            };
        },
        methods: {
            type() {
                let params
                if (this.value6 != null && this.value6 != '') {
                    params = {
                        type: this.radio,
                        startTime: this.value6[0],
                        endTime: this.value6[1],
                    }
                } else {
                    params = {
                        type: this.radio,
                        timeType: this.value
                    }
                }
                this.initChart(params)
            },
            type2() {
                let params
                if (this.times != null && this.times != '') {
                    params = {
                        type: this.radio2,
                        startTime: this.times[0],
                        endTime: this.times[1],
                    }
                } else {
                    params = {
                        type: this.radio2,
                        timeType: this.value2
                    }
                }
                this.initChart2(params)
            },
            time() {
                let params
                if (this.value6 != null) {
                    params = {
                        type: this.radio,
                        startTime: this.value6[0],
                        endTime: this.value6[1],
                    }
                } else {
                    params = {
                        type: this.radio,
                        timeType: '02'
                    }
                }
                this.initChart(params)
            },
            timeType() {
                let params = {
                    type: this.radio,
                    timeType: this.value
                }
                this.initChart(params)
            },
            time2() {
                let params
                if (this.times != null) {
                    params = {
                        type: this.radio2,
                        startTime: this.times[0],
                        endTime: this.times[1],
                    }
                } else {
                    params = {
                        type: this.radio2,
                        timeType: '02'
                    }
                }
                this.initChart2(params)
            },
            timeType2() {
                let params = {
                    type: this.radio2,
                    timeType: this.value2
                }
                this.initChart2(params)
            },
            orderStatisticsIndicator() {
                API.orderStatisticsIndicator().then((result) => {
                    console.log(result)
                    if (result.code == 200) {
                        this.indicator.all = result.data.allInfo
                        this.indicator.succeed = result.data.success
                        this.indicator.audit = result.data.examine
                        this.indicator.send = result.data.assign
                        this.indicator.underway = result.data.going
                        this.indicator.wait = result.data.check
                        this.indicator.earnings = result.data.income
                        this.indicator.failing = result.data.fail

                    }
                })
            },
            orderStatisticsIndicator2() {
                API.orderStatisticsIndicator2().then((result) => {
                    console.log(result)
                    if (result.code == 200) {
                        this.indicator2.all = result.data.all
                        this.indicator2.succeed = result.data.success
                        this.indicator2.audit = result.data.examine
                        this.indicator2.send = result.data.dispatch
                        this.indicator2.underway = result.data.going
                        this.indicator2.wait = result.data.waitCheck
                        this.indicator2.earnings = result.data.profit
                        this.indicator2.failing = result.data.fail

                    }
                })
            },
            initChart(params) {
                this.chart = echarts.init(this.$refs.chart);
                this.chart.clear()
                let initial = {
                    type: this.radio,
                    timeType: this.value
                }
                if (params == undefined) {
                    params = initial
                }
                let color = ['#5793f3', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
                API.orderStatisticsView(params).then((result) => {
                    if (result.code == 200) {
                        let legendData = [];
                        let series = [];
                        let time = [];
                        let one = [];
                        let tow = [];
                        let three = [];
                        let fore = [];
                        if (result.data.type == '审核订单') {
                            legendData = [{
                                name: '待审核',
                                icon: 'roundRect',
                            }, {
                                name: '审核成功',
                                icon: 'roundRect',
                            }, {
                                name: '审核失败',
                                icon: 'roundRect',
                            }]
                            result.data.waiting.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            result.data.success.forEach((item) => {
                                tow.push(item.number)
                            })
                            result.data.fail.forEach((item) => {
                                three.push(item.number)
                            })
                            series = [{
                                    name: '待审核',
                                    type: 'line',
                                    stack: '总量',
                                    data: one,
                                    smooth: true,
                                },
                                {
                                    name: '审核成功',
                                    type: 'line',
                                    stack: '总量',
                                    data: tow,
                                    smooth: true,
                                },
                                {
                                    name: '审核失败',
                                    type: 'line',
                                    stack: '总量',
                                    data: three,
                                    smooth: true,
                                }
                            ]
                        } else if (result.data.type == '派单订单') {
                            legendData = [{
                                name: '已接单',
                                icon: 'roundRect',
                            }, {
                                name: '待派单',
                                icon: 'roundRect',
                            }, {
                                name: '派单中',
                                icon: 'roundRect',
                            }, {
                                name: '超时',
                                icon: 'roundRect',
                            }]
                            result.data.receipt.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            result.data.waitAssign.forEach((item) => {
                                tow.push(item.number)
                            })
                            result.data.assigning.forEach((item) => {
                                three.push(item.number)
                            })
                            result.data.outTime.forEach((item) => {
                                fore.push(item.number)
                            })
                            series = [{
                                    name: '已接单',
                                    type: 'line',
                                    stack: '总量',
                                    data: one,
                                    smooth: true,
                                },
                                {
                                    name: '待派单',
                                    type: 'line',
                                    stack: '总量',
                                    data: tow,
                                    smooth: true,
                                },
                                {
                                    name: '派单中',
                                    type: 'line',
                                    stack: '总量',
                                    data: three,
                                    smooth: true,
                                },
                                {
                                    name: '超时',
                                    type: 'line',
                                    stack: '总量',
                                    data: three,
                                    smooth: true,
                                }
                            ]
                        } else if (result.data.type == '进行中订单') {
                            legendData = [{
                                name: '进行中',
                                icon: 'roundRect',
                            }]
                            result.data.going.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            series = [{
                                name: '进行中',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }]
                        } else if (result.data.type == '待验收订单') {
                            legendData = [{
                                name: '待验收',
                                icon: 'roundRect',
                            }, {
                                name: '验收成功',
                                icon: 'roundRect',
                            }]
                            result.data.waitCheck.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            result.data.checkSuccess.forEach((item) => {
                                tow.push(item.number)
                            })
                            series = [{
                                name: '待验收',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }, {
                                name: '验收成功',
                                type: 'line',
                                stack: '总量',
                                data: tow,
                                smooth: true,
                            }]
                        } else if (result.data.type == '收益订单') {
                            legendData = [{
                                name: '待收益',
                                icon: 'roundRect',
                            }, {
                                name: '财务审批',
                                icon: 'roundRect',
                            }]
                            result.data.waitMoney.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            result.data.approval.forEach((item) => {
                                tow.push(item.number)
                            })
                            series = [{
                                name: '待收益',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }, {
                                name: '财务审批',
                                type: 'line',
                                stack: '总量',
                                data: tow,
                                smooth: true,
                            }]
                        } else if (result.data.type == '交易成功订单') {
                            legendData = [{
                                name: '交易成功',
                                icon: 'roundRect',
                            }]
                            result.data.tradeOk.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            series = [{
                                name: '交易成功',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }]
                        } else if (result.data.type == '交易失败订单') {
                            legendData = [{
                                name: '交易失败',
                                icon: 'roundRect',
                            }]
                            result.data.tradeFail.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            series = [{
                                name: '交易失败',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }]
                        }
                        this.chart.setOption({
                            color: color,
                            title: {
                                text: '信息订单趋势图'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: legendData,
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
                            series: series
                        })
                    }
                })
            },
            initChart2(params) {
                this.chart1 = echarts.init(this.$refs.chart1);
                this.chart1.clear()
                let initial = {
                    type: this.radio2,
                    timeType: this.value2
                }
                if (params == undefined) {
                    params = initial
                }
                let color = ['#5793f3', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
                API.orderStatisticsView2(params).then((result) => {
                    if (result.code == 200) {
                        let legendData = [];
                        let series = [];
                        let time = [];
                        let one = [];
                        let tow = [];
                        let three = [];
                        let fore = [];
                        if (result.data.type == '审核订单') {
                            legendData = [{
                                name: '待审核',
                                icon: 'roundRect',
                            }, {
                                name: '审核成功',
                                icon: 'roundRect',
                            }, {
                                name: '审核失败',
                                icon: 'roundRect',
                            }]
                            result.data.wait.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            result.data.success.forEach((item) => {
                                tow.push(item.number)
                            })
                            result.data.fail.forEach((item) => {
                                three.push(item.number)
                            })
                            series = [{
                                    name: '待审核',
                                    type: 'line',
                                    stack: '总量',
                                    data: one,
                                    smooth: true,
                                },
                                {
                                    name: '审核成功',
                                    type: 'line',
                                    stack: '总量',
                                    data: tow,
                                    smooth: true,
                                },
                                {
                                    name: '审核失败',
                                    type: 'line',
                                    stack: '总量',
                                    data: three,
                                    smooth: true,
                                }
                            ]
                        } else if (result.data.type == '派单订单') {
                            legendData = [{
                                name: '已接单',
                                icon: 'roundRect',
                            }, {
                                name: '待派单',
                                icon: 'roundRect',
                            }, {
                                name: '派单中',
                                icon: 'roundRect',
                            }, {
                                name: '超时',
                                icon: 'roundRect',
                            }]
                            result.data.order.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            result.data.dispatch.forEach((item) => {
                                tow.push(item.number)
                            })
                            result.data.waitDispatch.forEach((item) => {
                                three.push(item.number)
                            })
                            result.data.outTime.forEach((item) => {
                                fore.push(item.number)
                            })
                            series = [{
                                    name: '已接单',
                                    type: 'line',
                                    stack: '总量',
                                    data: one,
                                    smooth: true,
                                },
                                {
                                    name: '待派单',
                                    type: 'line',
                                    stack: '总量',
                                    data: tow,
                                    smooth: true,
                                },
                                {
                                    name: '派单中',
                                    type: 'line',
                                    stack: '总量',
                                    data: three,
                                    smooth: true,
                                },
                                {
                                    name: '超时',
                                    type: 'line',
                                    stack: '总量',
                                    data: three,
                                    smooth: true,
                                }
                            ]
                        } else if (result.data.type == '进行中订单') {
                            legendData = [{
                                name: '进行中',
                                icon: 'roundRect',
                            }]
                            result.data.going.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            series = [{
                                name: '进行中',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }]
                        } else if (result.data.type == '待验收订单') {
                            legendData = [{
                                name: '待验收',
                                icon: 'roundRect',
                            }, {
                                name: '验收成功',
                                icon: 'roundRect',
                            },{
                                name: '验收失败',
                                icon: 'roundRect',
                            }]
                            result.data.check.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            result.data.checkSuccess.forEach((item) => {
                                tow.push(item.number)
                            })
                            result.data.checkFail.forEach((item) => {
                                three.push(item.number)
                            })
                            series = [{
                                name: '待验收',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }, {
                                name: '验收成功',
                                type: 'line',
                                stack: '总量',
                                data: tow,
                                smooth: true,
                            }, {
                                name: '验收失败',
                                type: 'line',
                                stack: '总量',
                                data: three,
                                smooth: true,
                            }]
                        } else if (result.data.type == '收益订单') {
                            legendData = [{
                                name: '待收益',
                                icon: 'roundRect',
                            }, {
                                name: '财务审批',
                                icon: 'roundRect',
                            }]
                            result.data.waitMoney.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            result.data.approval.forEach((item) => {
                                tow.push(item.number)
                            })
                            series = [{
                                name: '待收益',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }, {
                                name: '财务审批',
                                type: 'line',
                                stack: '总量',
                                data: tow,
                                smooth: true,
                            }]
                        } else if (result.data.type == '交易成功订单') {
                            legendData = [{
                                name: '交易成功',
                                icon: 'roundRect',
                            }]
                            result.data.tradeOk.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            series = [{
                                name: '交易成功',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }]
                        } else if (result.data.type == '交易失败订单') {
                            legendData = [{
                                name: '交易失败',
                                icon: 'roundRect',
                            }]
                            result.data.tradeFail.forEach((item) => {
                                time.push(item.time)
                                one.push(item.number)
                            })
                            series = [{
                                name: '交易失败',
                                type: 'line',
                                stack: '总量',
                                data: one,
                                smooth: true,
                            }]
                        }
                        this.chart1.setOption({
                            color: color,
                            title: {
                                text: '需求订单趋势图'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: legendData,
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
                            series: series
                        })
                    }
                })
            },

        },
        mounted() {
            this.orderStatisticsIndicator();
            this.orderStatisticsIndicator2();
            this.initChart();
            this.initChart2();
        }
    };

</script>
