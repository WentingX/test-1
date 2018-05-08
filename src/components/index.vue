<template>
<div class="index">
    <el-row :gutter="4" class="top">
        <el-col :span="6">
            <div class="grid-content bg-purple statistics">
                <div class="top">
                    <span class="title">用户统计</span>
                    <span class="day">今日</span>
                </div>
                <div class="cen">
                    <el-row>
                        <el-col :span="12" style="text-align:center" v-for="(item,index) in enrollment">
                            <div class="grid-content bg-purple all">
                                <div>{{item.user}}:</div>
                                <div>{{item.number}}人</div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="tb">
                        <el-row class="tit">
                            <el-col :span="12">
                                <div class="grid-content bg-purple">今日</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple-light" style="text-align:right">{{daylogin}}人</div>
                            </el-col>
                        </el-row>
                        <div class="chart" ref="chart"></div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="11">
            <div class="grid-content bg-purple money">
                <div class="top">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="财务管理" name="first">财务管理</el-tab-pane>
                        <el-tab-pane label="资金管理" name="second">资金管理</el-tab-pane>
                    </el-tabs>
                    <span>今日</span>
                </div>
                <div class="cen">
                    <el-row>
                        <el-col :span="11" class="income">
                            <div class="grid-content bg-purple">
                                <div class="tit">收入</div>
                                <div class="qian">+￥{{income}}</div>
                                <div class="num">{{incomeNum}}笔</div>
                            </div>
                        </el-col>
                        <el-col :span="11" class="expend">
                            <div class="grid-content bg-purple">
                                <div class="tit">支出</div>
                                <div class="qian">-￥{{expend}}</div>
                                <div class="num">{{expendNum}}笔</div>
                            </div>
                        </el-col>
                        <el-col :span="2" style="text-align:right;margin-top:-25px;">
                           <el-button type="text" size="small" @click="moneyDetailed()">详细</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="food" v-loading="loading">
                    <el-row :gutter="4" v-for="(item,index) in financialList">
                        <el-col :span="2">
                            <div class="grid-content bg-purple">{{item.name}}</div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple">{{item.order_number?item.order_number:item.orderNumber}}</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">{{item.order_type?item.order_type:item.orderType}}</div>
                        </el-col>
                        <el-col :span="3.5">
                            <div class="grid-content bg-purple">{{item.username}}</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple" style="color:#3388ff">￥{{item.money}}</div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple">{{item.create_date?item.create_date:item.time}}</div>
                        </el-col>
                        <el-col :span="2.5">
                            <div class="grid-content bg-purple" style="color:#ffc731;cursor: pointer;" @click="operate(item,index)">待转账</div>
                        </el-col>
                    </el-row>
                    <div v-if="financialList ==''" style="text-align:center">暂无数据</div>
                    <el-pagination background layout="prev, pager, next" :current-page="page" page-size="4" :total="total" @current-change="handleCurrentChange" :page-size="5" v-if="financialList !=''">
                    </el-pagination>
                </div>
            </div>
        </el-col>
        <el-col :span="7">
            <div class="grid-content bg-purple inform">
                <div class="top">全部通知</div>
                <div class="center" v-loading="loading2">
                    <el-row v-for="(item,index) in informList">
                      <el-col :span="6"><div class="grid-content bg-purple">【{{item.inform}}】</div></el-col>
                      <el-col :span="18"><div class="grid-content bg-purple-light">{{item.notify_content}}</div></el-col>
                    </el-row>
                    <div v-if="informList ==''" style="text-align:center;line-height:230px">暂无数据</div>
                </div>
                <div class="foot">
                    <el-button type="text" size="small" @click="allInform()">更多</el-button>
                </div>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="4" class="center">
        <el-col :span="17">
	        <div class="grid-content bg-purple order">
		        <div class="top">
			        <el-tabs v-model="activeName4" @tab-click="handleClick4" class="tabchangestyle">
			            <el-tab-pane label="信息订单" name="first">
				            <div class="center" v-loading="loading4"><!--v-loading="loading4"-->
					            <el-row>
						            <el-col :span="8">
							            <div class="grid-content bg-purple left">
								            <div class="lefttop">
									            <span class="title">信息订单概览</span>
									            <span class="day">全部</span>
								            </div>
								            <div class="leftcen">
									            <el-row class="lefttop2">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="informationOrderinfo">审核成功：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple leftleft" @click="informationOrderinfo" v-model="auditsuccess">{{auditsuccess}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="lefttop2">
										            <el-col :span="12">
											            <div class="grid-content bg-purple">审核失败：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple leftleft" @click="informationOrderinfo" v-model="auditfailure">{{auditfailure}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="lefttop2">
										            <el-col :span="12">
											            <div class="grid-content bg-purple">交易成功：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple leftleft" @click="informationOrderinfo" v-model="ordertranssuccess">{{ordertranssuccess}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="lefttop2">
										            <el-col :span="12">
											            <div class="grid-content bg-purple">交易失败：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple leftleft" @click="informationOrderinfo" v-model="ordertransfaled">{{ordertransfaled}}</div>
										            </el-col>
									            </el-row>
								            </div>
							            </div>
						            </el-col>
						            <el-col :span="8">
							            <div class="grid-content bg-purple middle">
								            <div class="middletop">
									            <span class="title">代办事项</span>
								            </div>
								            <div class="middlecen">
									            <el-row class="middlecenheight">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="informationwaitinfo">待审核：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple middlecenright" @click="informationwaitinfo" v-model="ordertranswait">{{ordertranswait}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="middlecenheight">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="informationwaitinfo">待派单：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple middlecenright" @click="informationwaitinfo" v-model="ordertransing">{{ordertransing}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="middlecenheight middlecenheightlast">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="informationwaitinfo">待验收：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple middlecenright" @click="informationwaitinfo" v-model="orderaccepted">{{orderaccepted}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="middlecenheight middlecenheightlast">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="informationwaitinfo">待收益：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple middlecenright" @click="informationwaitinfo" v-model="orderearnwait">{{orderearnwait}}</div>
										            </el-col>
									            </el-row>
								            </div>
							            </div>
						            </el-col>
						            <el-col :span="8">
							            <div class="grid-content bg-purple right">
								            <div class="middletop">
									            <span class="title">已办事项</span>
								            </div>
								            <el-row class="righttop righttop2">
									            <el-col :span="12">
										            <div class="grid-content bg-purple" @click="informationwaitinfo">审核成功：</div>
									            </el-col>
									            <el-col :span="12">
										            <div class="grid-content bg-purple rightright" @click="informationwaitinfo" v-model="auditsuccess">{{auditsuccess}}</div>
									            </el-col>
								            </el-row>
								            <el-row class="righttop">
									            <el-col :span="12">
										            <div class="grid-content bg-purple" @click="informationwaitinfo">审核失败：</div>
									            </el-col>
									            <el-col :span="12">
										            <div class="grid-content bg-purple rightright" @click="informationwaitinfo" v-model="auditfailure">{{auditfailure}}</div>
									            </el-col>
								            </el-row>
								            <el-row class="righttop">
									            <el-col :span="12">
										            <div class="grid-content bg-purple" @click="informationwaitinfo">交易成功：</div>
									            </el-col>
									            <el-col :span="12">
										            <div class="grid-content bg-purple rightright" @click="informationwaitinfo" v-model="ordertranssuccess">{{ordertranssuccess}}</div>
									            </el-col>
								            </el-row>
								            <el-row class="righttop">
									            <el-col :span="12">
										            <div class="grid-content bg-purple" @click="informationwaitinfo">交易失败：</div>
									            </el-col>
									            <el-col :span="12">
										            <div class="grid-content bg-purple rightright" @click="informationwaitinfo" v-model="ordertransfaled">{{ordertransfaled}}</div>
									            </el-col>
								            </el-row>
							            </div>
						            </el-col>
					            </el-row>
				            </div>
			            </el-tab-pane>
			            <el-tab-pane label="需求订单" name="second">
				            <div class="center" v-loading="loading5"><!--v-loading="loading4"-->
					            <el-row>
						            <el-col :span="8">
							            <div class="grid-content bg-purple left">
								            <div class="lefttop">
									            <span class="title">需求订单概览</span>
									            <span class="day">全部</span>
								            </div>
								            <div class="leftcen">
									            <el-row class="lefttop2">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="informationOrderinfo">审核成功：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple leftleft" @click="informationOrderinfo" v-model="reauditsuccess">{{reauditsuccess}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="lefttop2">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="informationOrderinfo">审核失败：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple leftleft" @click="informationOrderinfo" v-model="reauditfailure">{{reauditfailure}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="lefttop2">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="informationOrderinfo">交易成功：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple leftleft" @click="informationOrderinfo" v-model="reordertranssuccess">{{reordertranssuccess}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="lefttop2">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="informationOrderinfo">交易失败：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple leftleft" @click="informationOrderinfo" v-model="reordertransfaled">{{reordertransfaled}}</div>
										            </el-col>
									            </el-row>
								            </div>
							            </div>
						            </el-col>
						            <el-col :span="8">
							            <div class="grid-content bg-purple middle">
								            <div class="middletop">
									            <span class="title">代办事项</span>
								            </div>
								            <div class="middlecen">
									            <el-row class="middlecenheight">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="demandOrderinfo">待审核：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple middlecenright" @click="demandOrderinfo" v-model="reordertranswait">{{reordertranswait}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="middlecenheight">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="demandOrderinfo">待派单：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple middlecenright" @click="demandOrderinfo" v-model="reordertransing">{{reordertransing}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="middlecenheight middlecenheightlast">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="demandOrderinfo">待验收：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple middlecenright" @click="demandOrderinfo" v-model="reorderaccepted">{{reorderaccepted}}</div>
										            </el-col>
									            </el-row>
									            <el-row class="middlecenheight middlecenheightlast">
										            <el-col :span="12">
											            <div class="grid-content bg-purple" @click="demandOrderinfo">待收益：</div>
										            </el-col>
										            <el-col :span="12">
											            <div class="grid-content bg-purple middlecenright" @click="demandOrderinfo" v-model="reorderearnwait">{{reorderearnwait}}</div>
										            </el-col>
									            </el-row>
								            </div>
							            </div>
						            </el-col>
						            <el-col :span="8">
							            <div class="grid-content bg-purple right">
								            <div class="middletop">
									            <span class="title">已办事项</span>
								            </div>
								            <el-row class="righttop righttop2">
									            <el-col :span="12">
										            <div class="grid-content bg-purple" @click="demandOrderinfo">审核成功：</div>
									            </el-col>
									            <el-col :span="12">
										            <div class="grid-content bg-purple rightright" @click="demandOrderinfo" v-model="reauditsuccess">{{reauditsuccess}}</div>
									            </el-col>
								            </el-row>
								            <el-row class="righttop">
									            <el-col :span="12">
										            <div class="grid-content bg-purple" @click="demandOrderinfo">审核失败：</div>
									            </el-col>
									            <el-col :span="12">
										            <div class="grid-content bg-purple rightright" @click="demandOrderinfo" v-model="reauditfailure">{{reauditfailure}}</div>
									            </el-col>
								            </el-row>
								            <el-row class="righttop">
									            <el-col :span="12">
										            <div class="grid-content bg-purple" @click="demandOrderinfo">交易成功：</div>
									            </el-col>
									            <el-col :span="12">
										            <div class="grid-content bg-purple rightright" @click="demandOrderinfo" v-model="reordertranssuccess">{{reordertranssuccess}}</div>
									            </el-col>
								            </el-row>
								            <el-row class="righttop">
									            <el-col :span="12">
										            <div class="grid-content bg-purple" @click="demandOrderinfo">交易失败：</div>
									            </el-col>
									            <el-col :span="12">
										            <div class="grid-content bg-purple rightright" @click="demandOrderinfo" v-model="reordertransfaled">{{reordertransfaled}}</div>
									            </el-col>
								            </el-row>
							            </div>
						            </el-col>
					            </el-row>
				            </div>
			            </el-tab-pane>
			        </el-tabs>
		        </div>
	        </div>
        </el-col>
        <el-col :span="7">
            <div class="grid-content bg-purple attestation">
                <div class="top">
                    <el-tabs v-model="activeName2" @tab-click="handleClick2">
                        <el-tab-pane label="个人认证" name="first">个人认证</el-tab-pane>
                        <el-tab-pane label="企业认证" name="second">企业认证</el-tab-pane>
                    </el-tabs>
                    <span>今日</span>
                </div>
                <div class="center"  v-loading="loading3">
                    <el-row v-for="(item,index) in identification">
                      <el-col :span="4"><div class="grid-content bg-purple">{{item.name}}</div></el-col>
                      <el-col :span="9"><div class="grid-content bg-purple-light">{{item.idCard?item.idCard:item.companyName}}</div></el-col>
                      <el-col :span="8"><div class="grid-content bg-purple-light">{{item.createDate?item.createDate:item.createTime}}</div></el-col>
                      <el-col :span="3"><div class="grid-content bg-purple-light" style="color:#ffc731;cursor: pointer;" >待审核</div></el-col>
                    </el-row>
                    <div v-if="identification ==''" style="text-align:center">暂无数据</div>
                </div>
                <div class="foot">
                    <el-pagination background layout="prev, pager, next" :current-page="page1" page-size="10" :total="total1" @current-change="handleCurrentChange1" :page-size="10" v-if="identification !=''">
                    </el-pagination>
                </div>
            </div>
        </el-col>
        <el-col :span="17">
            <div class="grid-content bg-purple together">
	            <div class="top">撮合信息管理</div>
	            <div class="center" v-loading="loading6"><!--v-loading="loading2"-->
		            <el-row>
			            <el-col :span="8">
				            <div class="grid-content bg-purple left">
					            <div class="lefttop">
						            <span class="title">信息概览</span>
						            <span class="day">全部</span>
					            </div>
					            <div class="leftcen">
									<span class="succtransaction">交易成功（笔）</span>
						            <div class="num" v-model="transsuccess">{{transsuccess}}</div>
						            <el-button type="primary" class="info" @click="togetherinfo">查看详情</el-button>
					            </div>
				            </div>
			            </el-col>
			            <el-col :span="8">
				            <div class="grid-content bg-purple middle">
								<div class="middletop">
									<span class="title">代办事项</span>
								</div>
					            <div class="middlecen">
						            <el-row class="middlecenheight">
							            <el-col :span="12">
								            <div class="grid-content bg-purple" @click="transwaitinfo('1')">待撮合：</div>
							            </el-col>
							            <el-col :span="12">
								            <div class="grid-content bg-purple middlecenright" @click="transwaitinfo('1')" v-model="transwait">{{transwait}}</div>
							            </el-col>
						            </el-row>
						            <el-row class="middlecenheight">
							            <el-col :span="12">
								            <div class="grid-content bg-purple" @click="transwaitinfo('2')">撮合中：</div>
							            </el-col>
							            <el-col :span="12">
								            <div class="grid-content bg-purple middlecenright" @click="transwaitinfo('2')" v-model="transing">{{transing}}</div>
							            </el-col>
						            </el-row>
						            <el-row class="middlecenheight middlecenheightlast">
							            <el-col :span="12">
								            <div class="grid-content bg-purple" @click="transwaitinfo('3')">待收益：</div>
							            </el-col>
							            <el-col :span="12">
								            <div class="grid-content bg-purple middlecenright" @click="transwaitinfo('3')" v-model="earnwait">{{earnwait}}</div>
							            </el-col>
						            </el-row>
					            </div>
				            </div>
			            </el-col>
			            <el-col :span="8">
				            <div class="grid-content bg-purple centertop right">
					            <div class="middletop">
						            <span class="title">已办事项</span>
					            </div>
					            <el-row class="righttop">
						            <el-col :span="12">
							            <div class="grid-content bg-purple">交易成功：</div>
						            </el-col>
						            <el-col :span="12">
							            <div class="grid-content bg-purple rightright" v-model="transsuccess">{{transsuccess}}</div>
						            </el-col>
					            </el-row>
					            <el-row class="righttop">
						            <el-col :span="12">
							            <div class="grid-content bg-purple">撮合失败：</div>
						            </el-col>
						            <el-col :span="12">
							            <div class="grid-content bg-purple rightright" v-model="transfaled">{{transfaled}}</div>
						            </el-col>
					            </el-row>
				            </div>
			            </el-col>
		            </el-row>
	            </div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<style lang="scss">
    .index {
        height: 100%;
        background-color: #f3f4f7;
        margin: -30px -35px;
        padding-bottom: 64px;
        .top {
            .statistics {
                height: 310px;
                background-color: #fff;
                border: 1px solid #ececed;
                .top {
                    border-bottom: 1px solid #ececed;
                    padding: 10px 19px;
                    .title {
                        font-size: 16px;
                    }
                    .day {
                        color: #d0d0d0;
                        font-size: 12px;
                        text-align: right;
                        float: right;
                        margin-top: 3px;
                    }
                }
                .cen {
                    margin-top: 9px;
                    .all,
                    .register {
                        div:nth-child(1) {
                            color: #556191;
                        }
                        div:nth-child(2) {
                            color: #3388ff;
                        }
                    }
                    .tb {
                        margin: 10px;
                        height: 190px;
                        background-color: #fbfbfb;
                        border: 1px solid #ececed;
                        .tit {
                            margin: 15px 24px;
                            margin-bottom: 0;
                        }
                        .chart {
                            width: 100%;
                            height: 200px;
                            canvas {
                                margin-top: -52px !important;
                            }
                        }
                    }
                }
            }
            .money {
                height: 310px;
                background-color: #fff;
                border: 1px solid #ececed;
                .top {
                    .el-tabs__item {
                        margin-bottom: 2px;
                    }
                    .el-tabs__nav-wrap {
                        padding-left: 12px;
                    }
                    .el-tabs__header {
                        margin: 0;
                    }
                    .el-tabs .el-tabs__header .el-tabs__item.is-active {
                        background-color: #fff;
                        color: #3388ff;
                    }
                    span {
                        float: right;
                        margin-top: -31px;
                        margin-right: 10px;
                        color: #d0d0d0;
                        font-size: 12px;
                    }
                }
                .cen {
                    height: 142px;
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
                .food {
                    font-size: 12px;
                    margin-top: 10px;
                    margin-left: 5px;
                    .el-col {
                        text-align: center;
                        .grid-content {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .el-pagination {
                        text-align: right;
                        margin-top: 10px;
                        button,
                        li {
                            height: 20px;
                            line-height: 20px;
                            margin: 0 3px;
                        }
                    }
                }
            }
            .inform {
                height: 310px;
                background-color: #fff;
                border: 1px solid #ececed;
                .top {
                    border-bottom: 1px solid #ececed;
                    padding: 11px 19px;
                    background-color: #e8f5fe;
                }
                .center {
                    padding: 0px 10px;
                    height: 230px;
                    .el-row {
                        line-height: 40px;
                        .el-col {
                            .grid-content {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
                .foot {
                    margin-left: 15px;
                }
            }
        }
        .center {
            margin-top: 4px;
            .order {/*订单*/
                height: 300px;
                background-color: #fff;
                border: 1px solid #ececed;
	            .top {
		            /*tab 类 样式*/
		            .tabchangestyle{
			            margin-left:20px;
			            width:98%;
		            }
		            .tabchangestyle .el-tabs__header .el-tabs__item.is-active {
			            background: transparent;
			            color: #409EFF;
		            }
		            .tabchangestyle .el-tabs__header .el-tabs__item.is-active:hover {
			            color: #409EFF;
		            }
		            .tabchangestyle .el-tabs__header .el-tabs__item {
			            color: #373d41;
		            }
		            .tabchangestyle .el-tabs__header .el-tabs__item:hover {
			            color: #409EFF;
		            }
		            .tabchangestyle .el-tabs__content{
			            display: block;
		            }

		            .el-tabs__item {
			            margin-bottom: 2px;
		            }
		            .el-tabs__nav-wrap {
			            padding-left: 12px;
		            }
		            .el-tabs__header {
			            margin: 0;
		            }
		            .el-tabs .el-tabs__header .el-tabs__item.is-active {
			            background-color: #fff;
			            color: #3388ff;
		            }
	            }
	            .center {
		            font-size: 12px;
		            padding: 5px 10px;
		            /*height: 410px;*/
		            .left{
			            .lefttop {
				            .title {
					            color:#409eff;
					            padding:11px 19px;
				            }
				            .day {
					            color: #5C6485;
					            font-size: 12px;
					            text-align: right;
					            float: right;
					            margin-top: 3px;
				            }
			            }
			            .leftcen {
				            margin-left: 15px;
				            margin-top: 15px;
				            /*padding:0 18px 0 8px;*/
				            .lefttop2:hover{
					            cursor:pointer;
				            }
				            .lefttop2{
					            height:40px;
					            line-height: 40px;
					            background-color: #F5F5F7;
					            margin-bottom: 15px;
					            padding: 0 18px 0 8px;
					            .leftleft{
						            text-align:right;
					            }
				            }
			            }
		            }
		            .middle{
			            .middletop{
				            .title{
					            color:#409eff;
					            padding:11px 19px;
					            font-size:14px;
				            }
			            }
			            .middlecen{
				            padding:16px;
				            padding-bottom:0px;
				            .middlecenheight:hover{
					            cursor:pointer;
				            }
				            .middlecenheight{
					            height:40px;
					            line-height:40px;
					            background-color:#F5F5F7;
					            margin-bottom: 15px;
					            padding: 0 18px 0 8px;
					            .middlecenright{
						            text-align:right;
					            }
				            }
				            .middlecenheightlast{
					            margin-bottom:10px;
				            }
			            }
		            }
		            .right{
			            padding:0 18px 0 8px;
			            .middletop{
				            .title{
					            color:#409eff;
					            font-size:14px;
				            }
			            }
			            .righttop2{
				            margin-top:13px;
			            }
			            .righttop{
				            cursor:pointer;
			            }
			            .righttop{
				            height:40px;
				            line-height:40px;
				            background-color:#F5F5F7;
				            margin-bottom: 15px;
				            padding: 0 18px 0 8px;
				            .rightright{
					            text-align:right;
				            }
			            }
		            }
	            }
            }
            .attestation {
                height: 520px;
                background-color: #fff;
                border: 1px solid #ececed;
                .top {
                    .el-tabs__item {
                        margin-bottom: 2px;
                    }
                    .el-tabs__nav-wrap {
                        padding-left: 12px;
                    }
                    .el-tabs__header {
                        margin: 0;
                    }
                    .el-tabs .el-tabs__header .el-tabs__item.is-active {
                        background-color: #fff;
                        color: #3388ff;
                    }
                    span {
                        float: right;
                        margin-top: -31px;
                        margin-right: 10px;
                        color: #d0d0d0;
                        font-size: 12px;
                    }
                }
                .center {
                    font-size: 12px;
                    padding: 5px 10px;
                    height: 410px;
                    .el-row {
                        line-height: 40px;
                        .el-col {
                            .grid-content {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }

                }
                .foot {
                    .el-pagination {
                        text-align: right;
                    }
                }
            }
            .together {/*撮合*/
                height: 300px;
                background-color: #fff;
                border: 1px solid #ececed;
                margin-top: -216px;
	            .top {
		            border-bottom: 1px solid #ececed;
		            padding: 11px 19px;
	            }
	            .center {
		            .left{
			            .lefttop {
				            .title {
					            color:#409eff;
					            padding:11px 19px;
				            }
				            .day {
					            color: #5C6485;
					            font-size: 12px;
					            text-align: right;
					            float: right;
					            margin-top: 3px;
				            }
			            }
			            .leftcen {
				            background-color:#F5F5F7;
				            margin-left: 15px;
				            margin-top: 15px;
				            .succtransaction{
					            padding: 10px;
					            display: inline-block;
				            }
				            .num{
								color:#67B556;
					            font-size: 40px;
					            text-align: center;
					            padding-top: 40px;
					            padding-bottom: 40px;
				            }
				            .info {
					            display: inline-block;
								width:100%;
					            border-radius:0px;
				            }
			            }
		            }
		            .middle{
			            .middletop{
				            .title{
					            color:#409eff;
					            padding:11px 19px;
					            font-size:14px;
				            }
			            }
			            .middlecen{
				            padding:16px;
				            padding-bottom:0px;
				            .middlecenheight:hover{
					            cursor:pointer;
				            }
				            .middlecenheight{
					            height:47px;
					            line-height:47px;
					            background-color:#F5F5F7;
					            margin-bottom: 30px;
					            padding: 0 18px 0 8px;
					            .middlecenright{
						            text-align:right;
					            }
				            }
				            .middlecenheightlast{
					            margin-bottom:10px;
				            }
			            }
		            }
		            .centertop{
			            margin-top:3px;
		            }
		            .right{
			            padding:0 18px 0 8px;
			            .middletop{
				            margin-bottom:13px;
				            .title{
					            color:#409eff;
					            font-size:14px;
				            }
			            }
			            .righttop:hover{
				            cursor:pointer;
			            }
			            .righttop{
				            height:47px;
				            line-height:47px;
				            background-color:#F5F5F7;
				            margin-bottom: 30px;
				            padding: 0 18px 0 8px;
				            .rightright{
					            text-align:right;
				            }
			            }
		            }
	            }
            }
        }
    }

</style>
<script>
    import echarts from 'echarts'
    import API from '../api/api'
    export default {
        data() {
            return {
                chart: null,
                activeName: '',
                activeName2: 'first',
                financialList: [],
                informList: [],
                page: 1,
                page1: 1,
                total: 0,
                total1: 0,
                loading: true,
                income: '0',
                incomeNum: '0',
                expend: '0',
                expendNum: '0',
                loading2: true,
                identification: [],
                loading3: true,
                enrollment: [],
                daylogin: '',
                activeName4: 'first',//订单
                loading4: true,//true
                orderInformation: [],
                loading5: true,
                auditsuccess: '',   //信息订单 审核成功
                auditfailure: '',//审核失败
                ordertranssuccess: '',//交易成功
                ordertransfaled: '',//交易失败
                ordertranswait: '',//待审核
                ordertransing: '',//待派单
                orderaccepted: '',//待验收
                orderearnwait: '',//待收益
                reauditsuccess: '',    //需求订单 审核成功
                reauditfailure: '',//审核失败
                reordertranssuccess: '',//交易成功
                reordertransfaled: '',//交易失败
                reordertranswait: '',//待审核
                reordertransing: '',//待派单
                reorderaccepted: '',//待验收
                reorderearnwait: '',//待收益
                loading6: true,
                transsuccess: '',//撮合
                transwait: '',//待撮合
                transing: '',//撮合中
                earnwait: '',
                transfaled: '',
            }
        },
        created() {
            this.activeName = window.sessionStorage.getItem('cworzj') ? window.sessionStorage.getItem('cworzj') : 'first'
            this.activeName2 = window.sessionStorage.getItem('grorqy') ? window.sessionStorage.getItem('grorqy') : 'first'
			this.activeName4 = window.sessionStorage.getItem('xxorxq') ? window.sessionStorage.getItem('xxorxq') : 'first' //订单
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null;
        },
        methods: {
            //注册人数
            loginData() {
                let vm = this;
                API.loginData().then((result) => {
                    // console.log(result)
                    if (result.code == 200) {
                        result.data.forEach((item) => {
                            vm.enrollment.push(item)
                            if (item.user == '新注册用户') {
                                vm.daylogin = item.number
                            }
                        })
                    }
                })
            },
            //图表
            initChart() {
                this.chart = echarts.init(this.$refs.chart);
                let vm = this
                let time = [];
                let number = [];
                API.loginNum().then((result) => {
                    // console.log(result)
                    if (result.code == 200) {
                        result.data.forEach((item) => {
                            number.push(item.number)
                            time.push(item.timeSlot)
                        })
                        // 把配置和数据放这里
                        this.chart.setOption({
                            color: ['#3398DB'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: time,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: [{
                                name: '新注册用户',
                                type: 'bar',
                                barWidth: '60%',
                                data: number
                            }]
                        })
                    }
                })
            },
            //财务管理(今日)
            financial() {
                let params = {
                    dateStateId: 1,
                    pageNum: this.page,
                    pageSize: 5,
                };
                let vm = this
                vm.financialList = [];
                vm.loading = true
                API.financialList(params).then((result) => {
                    vm.loading = false
                    if (result.code == 200) {
                        vm.total = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            vm.financialList.push(item)
                            if (item.state_id == 1) {
                                item.state_id = '已转账'
                            } else if (item.state_id == 0) {
                                item.state_id = '待转账'
                            }
                            if (item.order_type == 0) {
                                item.order_type = '投融信息'
                            } else if (item.order_type == 1) {
                                item.order_type = '尽职调查'
                            } else if (item.order_type == 2) {
                                item.order_type = '投后管理'
                            } else if (item.order_type == 3) {
                                item.order_type = '高端定制'
                            }
                        })
                    } else {
                        vm.$message.error({
                            showClose: true,
                            message: '财务加载失败',
                            duration: 2000
                        });
                    }
                }, (error) => {
                    vm.loading = false
                    vm.$message.error({
                        showClose: true,
                        message: '财务加载失败',
                        duration: 2000
                    });
                })
            },
            //财务分页切换
            handleCurrentChange(val) {
                this.page = val
                this.loading = true
                this.financial()
                if (this.activeName == 'first') {
                    this.financial();
                } else if (this.activeName == 'second') {
                    this.fundList();
                }
            },
            //财务收入支出情况
            financialData() {
                let vm = this
                var qq = JSON.parse(window.sessionStorage.getItem('access-user')).userid
                var par = '?userId=' + qq
                API.financialData(par).then((result) => {
                    // console.log("财务")
                    // console.log(result)
                    if (result.code == 200) {
	                    vm.income = result.data.zMoney
                        vm.incomeNum = result.data.znum
                        vm.expend = result.data.fMoney
                        vm.expendNum = result.data.fnum
                    }
                })
            },
            //资金收入及支出
            fundData() {
                let vm = this
                let date = this.$root.$options.filters.dateFormat(new Date()).split(' ')[0];
                let params = {
                    status: '01',
                    timeStart: date,
                    timeEnd: date
                }
                //收入
                API.fundData(params).then((result) => {
                    if (result.code == 200) {
                        vm.income = result.data[0].Money
                        vm.incomeNum = result.data[0].Number
                    }
                })
                //支出
                let params1 = {
                    status: '02',
                    timeStart: date,
                    timeEnd: date
                }
                API.fundData(params1).then((result) => {
                    if (result.code == 200) {
                        vm.expend = result.data[0].Money
                        vm.expendNum = result.data[0].Number
                    }
                })
            },
            //资金管理(今日)
            fundList() {
                let vm = this;
                let date = this.$root.$options.filters.dateFormat(new Date()).split(' ')[0];
                let params = {
                    pageNum: this.page,
                    pageSize: 5,
                }
                vm.loading = true;
                vm.financialList = [];
                API.fundList(params).then((result) => {
                    vm.loading = false
                    if (result.code == 200) {
                        vm.total = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            vm.financialList.push(item)
                            item.status = '待退款'
                        })
                    } else {
                        vm.$message.error({
                            showClose: true,
                            message: '资金加载失败',
                            duration: 2000
                        });
                    }
                }, error => {
                    vm.loading = false
                    vm.$message.error({
                        showClose: true,
                        message: '资金加载失败',
                        duration: 2000
                    });
                })

            },
            //资金财务切换
            handleClick(tab, event) {
                sessionStorage.setItem('cworzj', this.activeName)
                if (tab.name == 'first') {
                    this.financial();
                    this.financialData();
                } else if (tab.name == 'second') {
                    this.fundData();
                    this.fundList();
                }
            },
            //通知
            inform() {
                let vm = this;
                vm.informList = [];
                let params = {
                    pageSize: 5,
                }
                API.inform(params).then((result) => {
                    vm.loading2 = false
                    if (result.code == 200) {
                        result.data.list.forEach((item) => {
                            vm.informList.push(item);
                        })
                    } else {
                        vm.$message.error({
                            showClose: true,
                            message: '通知加载失败',
                            duration: 2000
                        });
                    }
                }, (error) => {
                    vm.loading2 = false
                    vm.$message.error({
                        showClose: true,
                        message: '通知加载失败',
                        duration: 2000
                    });
                })
            },
            //更多通知
            allInform() {
                this.$router.push({
                    path: `/informManagement/whole`
                });
            },
            //财务资金详细
            moneyDetailed() {
                if (this.activeName == 'first') {
                    this.$router.push({
                        path: `/financingManagement/transaction`
                    });
                } else if (this.activeName == 'second') {
                    this.$router.push({
                        path: `/fundManagement/particulars`
                    });
                }
            },
            //财务资金待处理详细
            operate(row, index) {
                if (this.activeName == 'first') {
                    this.$store.commit('save_detail_info', row);
                    this.$router.push({
                        path: `/financingManagement/transferredDetails/${row.id}`
                    });
                } else if (this.activeName == 'second') {
                    this.$store.commit('save_detail_info', row);
                    this.$router.push({
                        path: `/refund/detail/checkFile/${row.id}`
                    });
                }
            },
            //个人认证企业认证切换
            handleClick2(tab, event) {
                sessionStorage.setItem('grorqy', this.activeName2)
                if (tab.name == 'first') {
                    this.personage();
                } else if (tab.name == 'second') {
                    this.enterprise();
                }
            },
            //个人认证列表
            personage() {
                let vm = this;
                let params = {
                    pageNum: this.page1,
                    pageSize: 10,
                };
                vm.identification = [];
                vm.loading2 = true;
                API.personage(params).then((result) => {
                    // console.log("个人")
                    // console.log(result)
                    vm.loading3 = false
                    if (result.code == 200) {
                        vm.total1 = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            vm.identification.push(item)
                        })
                    } else {
                        vm.$message.error({
                            showClose: true,
                            message: '个人认证加载失败',
                            duration: 2000
                        });
                    }
                }, error => {
                    vm.loading3 = false
                    vm.$message.error({
                        showClose: true,
                        message: '个人认证加载失败',
                        duration: 2000
                    });
                })
            },
            //企业认证列表
            enterprise() {
                let vm = this;
                let params = {
                    pageNum: this.page1,
                    pageSize: 10,
                };
                vm.identification = [];
                vm.loading3 = true;
                API.enterprise(params).then((result) => {
                    // console.log("企业")
                    // console.log(result)
                    vm.loading3 = false
                    if (result.code == 200) {
                        vm.total1 = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            vm.identification.push(item)
                        })
                    } else {
                        vm.$message.error({
                            showClose: true,
                            message: '企业认证加载失败',
                            duration: 2000
                        });
                    }
                }, error => {
                    vm.loading3 = false
                    vm.$message.error({
                        showClose: true,
                        message: '企业认证加载失败',
                        duration: 2000
                    });
                })
            },
            //认证分页
            handleCurrentChange1(val) {
                this.page1 = val
                this.loading3 = true
                if (this.activeName2 == 'first') {
                    this.personage();
                } else if (this.activeName2 == 'second') {
                    this.enterprise();
                }
            },
	        //信息订单需求订单切换
            handleClick4(tab,event){
                sessionStorage.setItem('xxorxq',this.activeName4)
	            if(tab.name == 'first'){
                    this.informationOrder();//信息订单
                }else if(tab.name == 'second'){
                    this.demandOrder();//需求订单
                }
            },
	        //信息订单列表概览
            informationOrder(){
                let vm = this
                vm.loading4 = true;
	            //信息订单概览
                API.homeinfoorder().then( result => {
                    vm.loading4 = false
                    if(result.code == "200" && result.data != null){
                        vm.auditsuccess = result.data[0].a5
                        vm.auditfailure = result.data[0].a6
                        vm.ordertranssuccess = result.data[0].a7
                        vm.ordertransfaled = result.data[0].a8
                    }else{
                        vm.loading4 = false
                        vm.$message.error({
                            showClose: true,
                            message: '信息订单概览加载失败',
                            duration: 2000
                        });
                    }
                })
                //信息订单代办事项
                API.homeinfoorderwait().then( result => {
                    vm.loading4 = false
                    if(result.code == "200" && result.data != null){
                        vm.ordertranswait = result.data[0].a1
                        vm.ordertransing = result.data[0].a2
                        vm.orderaccepted = result.data[0].a3
                        vm.orderearnwait = result.data[0].a4
                        vm.auditsuccess = result.data[0].a5
                        vm.auditfailure = result.data[0].a6
                        vm.ordertranssuccess = result.data[0].a7
                        vm.ordertransfaled = result.data[0].a8
                    }else{
                        vm.loading4 = false
                        vm.$message.error({
                            showClose: true,
                            message: '信息订单代办事项加载失败',
                            duration: 2000
                        });
                    }
                })
            },
	        //需求订单列表
            demandOrder(){
                let vm = this
                vm.loading5 = true;
                API.demandFindOrder().then( result => {
                    vm.loading5 = false
                    if(result.code == "200" && result.data != null){
                        vm.reauditsuccess = result.data[0].a5
                        vm.reauditfailure = result.data[0].a6
                        vm.reordertranssuccess = result.data[0].a7
                        vm.reordertransfaled = result.data[0].a8
                    }else{
                        vm.loading5 = false
                        vm.$message.error({
                            showClose: true,
                            message: '需求订单概览加载失败',
                            duration: 2000
                        });
                    }
                })
				API.demandFindOrderAgency().then(result => {
                    vm.loading5 = false
                    if(result.code == "200" && result.data != null){
                        vm.reordertranswait = result.data[0].a1
                        vm.reordertransing = result.data[0].a2
                        vm.reorderaccepted = result.data[0].a3
                        vm.reorderearnwait = result.data[0].a4
                        vm.reauditsuccess = result.data[0].a5
                        vm.reauditfailure = result.data[0].a6
                        vm.reordertranssuccess = result.data[0].a7
                        vm.reordertransfaled = result.data[0].a8
                    }else{
                        vm.loading5 = false
                        vm.$message.error({
                            showClose: true,
                            message: '需求订单代办事项加载失败',
                            duration: 2000
                        });
                    }
				})
            },
	        //左订单跳转  订单统计分析
            informationOrderinfo(){
                let row = {}
                this.$store.commit('save_detail_info', row);
                this.$router.push({
                    path: '/statisticAnalysis/orderStatistics'//跳转到订单统计分析
                });
            },
	        //中 右  信息订单 跳转
	        informationwaitinfo(){
                let row = {}
                this.$store.commit('save_detail_info', row);
                this.$router.push({
                    path: `/orderManagement/message`
                });
	        },
	        //中 右  需求订单 跳转
            demandOrderinfo(){
                let row = {}
                this.$store.commit('save_detail_info', row);
                this.$router.push({
                    path: `/orderManagement/demand`
                });
            },
	        //撮合信息管理
            together(){
                let vm = this
                vm.loading6 = true;
                API.together().then( result => {
                    vm.loading6 = false
                    if(result.code == "200" && result.data != null){
                        vm.transsuccess = result.data.success
                        vm.transwait = result.data.wait
                        vm.transing = result.data.going
                        vm.earnwait = result.data.waitMoney
                        vm.transfaled = result.data.fail
                    }else{
                        vm.loading6 = false
                        vm.$message.error({
                            showClose: true,
                            message: '撮合信息管理加载失败',
                            duration: 2000
                        });
                    }
                })
            },
	        //撮合查看详情
            togetherinfo(){
                let row = {}
                this.$store.commit('save_detail_info', row);
                this.$router.push({
	                path: '/statisticAnalysis/together'//跳转到撮合统计分析
                });
            },
	        //撮合状态跳转
            transwaitinfo(transparm){
                let row = {}
                this.$store.commit('save_detail_info', row);
                switch (transparm){
	                case '1':
	                    this.$router.push({
	                        path: `/bringManagement/await`
	                    });
	                    break;
	                case '2':
                        this.$router.push({
                            path: `/bringManagement/underway`
                        });
                        break;
	                case '3':
                        this.$router.push({
                            path: `/bringManagement/earnings`
                        });
                        break;
	                case '4':
                        this.$router.push({
                            path: `/bringManagement/succeed`
                        });
                        break;
	                case '5':
                        this.$router.push({
                            path: `/bringManagement/defeated`
                        });
                        break;
                }
            },
        },
        mounted() {
            //            this.loginNum();
            this.initChart();
            this.inform();
            this.loginData();
	        this.together();//撮合
            if (this.activeName == 'first') {
                this.financial();
                this.financialData();
            } else if (this.activeName == 'second') {
                this.fundList();
                this.fundData();
            }
            if (this.activeName2 == 'first') {
                this.personage();
            } else if (this.activeName2 == 'second') {
                this.enterprise();
            }
            if(this.activeName4 == 'first'){
                this.informationOrder();//信息订单
            }else if(this.activeName4 == 'second'){
                this.demandOrder();//需求订单
            }

        }
    }

</script>