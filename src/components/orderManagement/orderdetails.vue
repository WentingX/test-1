<template>
	<!--订单详情--页面   可以共用-->
	<div class="orderdetail">
		<div class="detail" v-if="orderDetailStatus==1022||orderDetailStatus==1020||orderDetailStatus==1026||orderDetailStatus==1030||orderDetailStatus==-1030||orderDetailStatus==1025||orderDetailStatus==-1020||orderDetailStatus==1014||orderDetailStatus==1029||orderDetailStatus==-1026" @click="$router.push('../checkFile/408707598114058241')">
			<p class="title"><em>|</em><span>
				{{orderDetailStatus==1022?'派单订单详情':''}}
				{{orderDetailStatus==1020?'审核订单详情':''}}
				{{orderDetailStatus==1026?'派单订单详情':''}}
				{{orderDetailStatus==-1030?'派单订单详情':''}}
			</span></p>
			<el-table :data="tabledata1" border style="width: 100%">
				<el-table-column prop="id" label="订单号" align="center">
				</el-table-column>
				<el-table-column prop="type" label="订单类型" align="center">
				</el-table-column>
				<el-table-column prop="userid" label="用户" align="center">
				</el-table-column>
				<el-table-column prop="createdate" label="生成时间" align="center">
				</el-table-column>
				<el-table-column prop="jdfy" label="接单方费用" align="center">
				</el-table-column>
				<el-table-column prop="contact" label="跟单员" align="center">
				</el-table-column>
			</el-table>
			<el-table :data="tabledata2" border style="width: 100%">
				<el-table-column prop="phone" label="联系人" align="center">
				</el-table-column>
				<el-table-column prop="province" label="所在地区" align="center">
				</el-table-column>
				<el-table-column prop="status" label="需求方账号状态" align="center">
				</el-table-column>
				<el-table-column prop="linkdate" label="沟通时间" align="center">
				</el-table-column>
				<el-table-column prop="contact" label="审核员" align="center">
				</el-table-column>
			</el-table>
		</div>
		<!--订单信息-->
		<div class="orderinfo" v-if="orderDetailStatus==1022||orderDetailStatus==1026||orderDetailStatus==1030||orderDetailStatus==-1030||orderDetailStatus==1025||orderDetailStatus==1014||orderDetailStatus==1029||orderDetailStatus==-1026">
			<p class="title"><em>|</em><span>订单信息</span></p>
			<hr />
			<el-form ref="orderform" :model="orderform" label-width="180px" :key="32">
				<el-form-item label="订单类型：">
					<!--{{orderformdata.orderType}}-->
					{{info1.type}}
				</el-form-item>
				<el-form-item label="信息类型：">
					<!--<span v-if="type==0">{{orderformdata.infotype}}</span>-->
					<span v-if="type==0">{{['并购/重组','被并购/被重组'][info1.infotype]}}</span>
					<el-select v-else v-model="orderform.infotype">
						<el-option :value="1">1</el-option>
						<el-option :value="2">2</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="联系人：">
					<!--{{orderformdata.contact}}-->
					{{info1.contact}}
				</el-form-item>
				<el-form-item label="联系电话：">
					<!--{{orderformdata.phone}}-->
					{{info1.phone}}
				</el-form-item>
				<el-form-item label="企业名称：">
					{{info1.qyname}}
				</el-form-item>
				<el-form-item label="所属行业：">
					<!--{{orderformdata.industrytype}}-->
					{{info1.industry}}
				</el-form-item>
				<el-form-item label="企业规模：">
					<!--{{orderformdata.enterprisescale}}-->
					{{info1.scale}}
				</el-form-item>
				<el-form-item label="公司地址：">
					<!--{{orderformdata.companyaddress}}-->
					{{info1.address}}
				</el-form-item>
				<el-form-item label="描述内容：">
					<div style="width: 300px;">
						{{info1.description}}
					</div>
				</el-form-item>
				<el-form-item label="上传附件：">
					{{info1.fj}}
					<a href="javascript:void(0)">附件附件.doc</a>
					<a href="javascript:void(0)">附件附件.doc</a>
				</el-form-item>
				<el-form-item label="人员建议：">
					<el-input type="textarea" style="width: 300px;" :rows="3" :placeholder="info1.ryjy"></el-input>
				</el-form-item>
				<el-form-item label="期望完成时间：" style="margin-top: 10px;">
					<el-select style="width: 100px;" v-model="orderform.begintime">
						<el-option :value="1">1</el-option>
						<el-option :value="2">2</el-option>
						<el-option :value="3">3</el-option>
					</el-select>
					<span style="margin: 0 2em;">至</span>
					<el-select style="width: 100px;" v-model="orderform.endtime">
						<el-option :value="1">1</el-option>
						<el-option :value="2">2</el-option>
						<el-option :value="3">3</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="预计总费用：">
					<!--{{orderformdata.totalcost}}-->
					{{info1.jdfy}}
				</el-form-item>
			</el-form>

		</div>
		<!--基本信息-->
		<div class="basicinfo" v-if="orderDetailStatus==1020||orderDetailStatus==-1020">
			<p class="title"><em>|</em><span>基本信息</span></p>
			<hr />

			<el-form ref="basicform" :model="basicform" label-width="180px" :key="22">
				<el-form-item label="订单类型：">
					{{info1.orderType}}
				</el-form-item>
				<el-form-item label="信息类型：">
					<span v-if="type==0">{{info1.infoClassification}}</span>
					<el-select v-else v-model="orderform.infotype">
						<el-option :value="1">1</el-option>
						<el-option :value="2">2</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="联系人：">
					{{basicformdata.contact}}
				</el-form-item>
				<el-form-item label="联系电话：">
					{{basicformdata.phone}}
				</el-form-item>
				<el-form-item label="企业名称：">
					{{basicformdata.enterprisename}}
				</el-form-item>
				<el-form-item label="所属行业：">
					{{basicformdata.industrytype}}
				</el-form-item>
				<el-form-item label="所在地区：">
					{{basicformdata.local}}
				</el-form-item>
				<el-form-item label="企业规模：">
					{{basicformdata.enterprisescale}}
				</el-form-item>
				<el-form-item label="公司地址：">
					{{basicformdata.companyaddress}}
				</el-form-item>
				<el-form-item label="描述内容：">
					<div style="width: 300px;">
						{{basicformdata.descontent}}
					</div>
				</el-form-item>
				<el-form-item label="上传附件：">
					<a href="javascript:void(0)">附件附件.doc</a>
					<a href="javascript:void(0)">附件附件.doc</a>
				</el-form-item>
				<!--<el-form-item label="人员建议：">
					<el-input type="textarea" style="width: 300px;" rows="3"></el-input>
				</el-form-item>
				<el-form-item label="期望完成时间：">
					<el-select style="width: 100px;">
						<el-option>1</el-option>
						<el-option>2</el-option>
						<el-option>3</el-option>
					</el-select>
					<span style="margin: 0 2em;">至</span>
					<el-select style="width: 100px;">
						<el-option>1</el-option>
						<el-option>2</el-option>
						<el-option>3</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="预计总费用：">
					{{orderformdata.totalcost}}
				</el-form-item>-->
			</el-form>

			<el-row style="text-align: center;">
				<el-button size="medium" class="darkbutton" @click="$router.push('/perfectorde')">完善信息</el-button>
				<el-button size="medium" class="darkbutton" @click="nopass">审核不通过</el-button>
			</el-row>
		</div>

		<!--完善订单信息-->
		<div class="perfectorde" v-if="orderDetailStatus==-1020">
			<p class="title"><em>|</em><span>完善订单信息</span></p>
			<hr />
			<el-row :gutter="24">

				<el-form ref="perfectorderform" :model="perfectorderform" label-width="100px">
					<el-col :span="10" style="min-width: 313px;">
						<el-form-item label="订单类型:">
							<el-select style="width:38%;min-width: 72px;">
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
							<el-select style="width:38%;min-width: 72px;">
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业名称:">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="联系人:">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="联系电话:">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="所属行业:">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="企业规模:">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="公司地址:">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="描述内容:">
							<el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="上传附件:">
							<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
								<el-button size="small" class="darkbutton">点击上传</el-button>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="14" style="min-width:313px;">
						<el-form-item label="投资行业:">
							<el-select v-model="perfectorderform.investmentindustry">
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="投资地区:">
							<el-select v-model="perfectorderform.investmentarea">
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="去年营业额:">
							<el-select>
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
							<el-select>
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="当前净资产:">
							<el-select>
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
							<el-select>
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="融资资金:">
							<el-select>
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
							<el-select>
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="人员建议:">
							<el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="期望完成时间:" class="a">
							<el-select>
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
							至
							<el-select>
								<el-option v-for="i in 3" :label="i" :value="i" :key="i"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="投资资金:">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="预计总费用:">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24" style="text-align: center;">
						<el-button class="successbutton" size="medium">已审核通过</el-button>
					</el-col>

				</el-form>
			</el-row>
		</div>

		<!--指定/内推   待派单详情页面-->
		<div class="appoint" v-if="orderDetailStatus==1022">
			<p class="title"><em>|</em><span>指定/内推</span></p>
			<hr />
			<el-form :inline="true" :model="search1Form" class="search">
				<el-form-item>
					<el-input class="searchinput" v-model="search1Form.content" placeholder="输入你想搜索的内容"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="darkbutton" icon="el-icon-search
" type="button" @click="" size="medium" @click="search1">搜索</el-button>
				</el-form-item>
			</el-form>

			<el-table :data="tabledata3" border style="width: 100%">
				<el-table-column prop="userid" label="用户名" align="center">
				</el-table-column>
				<el-table-column prop="qyname" label="企业名称" align="center">
				</el-table-column>
				<el-table-column prop="yqdj" label="企业等级" align="center">
				</el-table-column>
				<el-table-column prop="ecbj" label="二次报价" align="center">
				</el-table-column>
				<el-table-column prop="bzj" label="保证金" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" style="text-decoration: underline;">
							我要派单
						</el-button>
					</template>
				</el-table-column>

			</el-table>
			<hr style="margin: auto -35px;height: 10px;background: #F3F4F7;border: none;" />
		</div>
		<!--接单方  待派单详情页面-->
		<div class="getorder" v-if="orderDetailStatus==1022">
			<p class="title" style="margin-top: 30px;"><em>|</em><span>接单方</span></p>
			<hr />
			<el-form :inline="true" :model="search1Form" class="search">
				<el-form-item>
					<el-input class="searchinput" v-model="search1Form.search" placeholder="输入你想搜索的内容"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button icon="el-icon-search
" size="medium" class="darkbutton" type="button" @click="search2">搜索</el-button>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="query1Form">
				<el-form-item label="用户名">
					<el-input v-model="query1Form.username"></el-input>
				</el-form-item>
				<el-form-item label="用户等级">
					<el-input v-model="query1Form.userlevel"></el-input>
				</el-form-item>
				<el-form-item label="用户类型">
					<el-select v-model="query1Form.usertype">
						<el-option v-for="i in ['用户类型1','用户类型2']" :label="i" :value="i" :key="i"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所在地区">
					<el-select v-model="query1Form.address">
						<el-option v-for="i in ['地区1','地区2']" :label="i" :value="i" :key="i"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="擅长行业">
					<el-select v-model="query1Form.goodindustry">
						<el-option v-for="i in ['行业1','行业2','行业3']" :label="i" :value="i"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="综合排名">
					<el-select v-model="query1Form.rank">
						<el-option v-for="i in 6" :label="i" :value="i"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="企业等级">
					<el-select v-model="query1Form.enterpriselevel">
						<el-option v-for="i in ['红','橙']" :label="i" :value="i"></el-option>
					</el-select>
				</el-form-item>
				<el-row style="text-align: center;margin-bottom: 18px;">
					<el-button type="button" class="darkbutton" size="medium" @click="query1">查询</el-button>
					<el-button type="button" class="darkbutton" size="medium">重置</el-button>
				</el-row>
			</el-form>

			<el-table ref="tabledata4" :data="tabledata4" tooltip-effect="dark" style="width: 100%" @selection-change="" border>
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column prop="userid" label="用户名" align="center">
				</el-table-column>
				<el-table-column prop="contact" label="接单方" align="center">
				</el-table-column>
				<el-table-column prop="type" label="用户类型" align="center">
				</el-table-column>
				<el-table-column prop="qyname" label="企业名称" align="center">
				</el-table-column>
				<el-table-column prop="province" label="所在地区" align="center">
				</el-table-column>
				<el-table-column prop="industry" label="擅长行业" align="center">
				</el-table-column>
				<el-table-column prop="userDj" label="用户等级" align="center">
				</el-table-column>
				<el-table-column prop="pm" label="综合排名" align="center">
				</el-table-column>
				<el-table-column label="排名调整" align="center">
					<template slot-scope="scope">
						<div style="width: 60px;">
							<span @click="" class="down" @click="scope.row.rank++"></span>
							<span @click="" v-if="scope.row.rank!=1" class="up" @click="scope.row.rank--"></span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<div style="text-decoration: underline;" class="danger">
							已超时
						</div>
						<div style="" class="danger">
							<span class="warn">派单中</span>
							<br />
							<span style="text-decoration: underline;color: #999;">
								08:59:59
							</span>
						</div>
						<div style="" class="success">
							已接单
						</div>
						<div style="text-decoration: underline;color: #409EFF;">
							我要派单
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-row :gutter="24">
				<el-col :span="12">
					<el-button class="darkbutton" size="medium">
						一键推送
					</el-button>
					<el-button class="darkbutton" size="medium">多选</el-button>
					<el-button class="darkbutton" size="medium" @click="selectall(tabledata4)">全选</el-button>
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-pagination background layout="prev, pager, next" :total="1000">
					</el-pagination>
				</el-col>
			</el-row>
		</div>
		<!--接单方  表格-->
		<div v-if="orderDetailStatus==1026||orderDetailStatus==1030||orderDetailStatus==-1030||orderDetailStatus==1025||orderDetailStatus==1014||orderDetailStatus==1029||orderDetailStatus==-1026">
			<p class="title" style="margin-top: 30px;"><em>|</em><span>接单方</span></p>
			<hr />
			<el-table :data="tabledata5">
				<el-table-column prop="username" label="用户名" align="center">

				</el-table-column>
				<el-table-column prop="enterprisename" label="企业名称" align="center">

				</el-table-column>
				<el-table-column prop="level" label="用户等级" align="center">

				</el-table-column>
				<el-table-column prop="price" label="成交价格" align="center">

				</el-table-column>
				<el-table-column prop="rank" label="综合排名" align="center">

				</el-table-column>
			</el-table>
		</div>
		<!--项目进度跟踪>经理每周报告  表格-->
		<div v-if="orderDetailStatus==1026||orderDetailStatus==1030||orderDetailStatus==-1030||orderDetailStatus==1025||orderDetailStatus==1014||orderDetailStatus==1029||orderDetailStatus==-1026">
			<p class="title" style="margin-top: 30px;"><em>|</em><span>项目进度跟踪>经理每周报告</span></p>
			<hr />
			<el-table :data="tabledata6">
				<el-table-column prop="time" label="报告时间" align="center"></el-table-column>
				<el-table-column prop="version" label="报告版本" align="center"></el-table-column>
				<el-table-column prop="state" label="乙方状态" align="center"></el-table-column>
				<el-table-column prop="state" label="验收状态" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="" :class="scope.row.state==0?'danger':'success'">
							{{['未通过','通过'][scope.row.state]}}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="state" label="接单方状态" align="center">
					<template slot-scope="scope">
						{{['未提交','已提交'][scope.row.state]}}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="" v-for=" i in ['查看','通过','报告有误']">
							{{i}}
						</el-button>
						<el-button type="text">
							提醒乙方提交报告
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="reason" label="未通过理由" align="center"></el-table-column>
			</el-table>

			<el-row style="text-align: center;">
				<el-button class="darkbutton" style="width: 16em;">交易失败</el-button>
			</el-row>
			<el-row style="text-align: center;">
				<el-button class="dangerbutton" style="width: 16em;">交易失败</el-button>
			</el-row>
			<el-row style="text-align: center;">
				<el-button class="successbutton">已验收通过</el-button>
			</el-row>

			<el-row style="text-align: center;">
				<el-button class="dangerbutton">审核未通过</el-button>
			</el-row>
			<el-row style="text-align: center;">
				<el-button type="text" style="text-decoration: underline;">重新派单</el-button>
			</el-row>
		</div>

		<!--结案报告   表格-->

		<div v-if="orderDetailStatus==1026||orderDetailStatus==1014||orderDetailStatus==1029">
			<p class="title" style="margin-top: 30px;"><em>|</em><span>结案报告</span></p>
			<hr />
			<el-table :data="tabledata7">
				<el-table-column prop="date" label="报告日期" align="center"></el-table-column>
				<el-table-column prop="state" label="乙方状态" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text">
							查看
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-row style="text-align: center;">
				<el-button class="successbutton">已验收通过</el-button>
			</el-row>
			<el-row style="text-align: center;">
				<el-button class="darkbutton" @click="checkSuccess">验收通过</el-button>
				<el-button class="darkbutton" @click="checkFail">验收失败</el-button>
				<el-button class="darkbutton">交易失败</el-button>
			</el-row>
		</div>
		<!--接单方收益信息-->
		<div v-if="orderDetailStatus==1030">
			<p class="title" style="margin-top: 30px;"><em>|</em><span>接单方收益信息</span></p>
			<hr />
			<el-table :data="tabledata8">
				<el-table-column prop="username" label="用户名" align="center"></el-table-column>
				<el-table-column prop="realname" label="真实姓名" align="center"></el-table-column>
				<el-table-column prop="userrole" label="用户角色" align="center"></el-table-column>
				<el-table-column prop="userid" label="身份证号" align="center"></el-table-column>
				<el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
				<el-table-column prop="payee" label="收款人" align="center"></el-table-column>
			</el-table>
			<el-table :data="tabledata9">
				<el-table-column prop="data1" label="开户支行" align="center"></el-table-column>
				<el-table-column prop="data2" label="银行账号" align="center"></el-table-column>
				<el-table-column label="金额" align="center">
					<template slot-scope="scope">
						<el-button type="text">
							<span>￥{{scope.row.data3}}</span>
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="data2" label="转账凭证" align="center">
					<template slot-scope="scope">
						<el-button type="text">
							<span>查看</span>
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="data2" label="转账审批" align="center">
					<template slot-scope="scope">
						<el-button type="text">
							<span>上传图片</span>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="text-align: center;">
				<el-button class="successbutton">待收益</el-button>
			</el-row>
			<el-row style="text-align: center;">
				<el-button class="dangerbutton">确认无误 上传财务</el-button>
			</el-row>
			<el-row style="text-align: center;">
				<el-button class="successbutton">已转账，交易成功</el-button>
			</el-row>
		</div>

		<!--确认收益信息-->
		<div v-if="orderDetailStatus==1014||orderDetailStatus==1029">
			<p class="title" style="margin-top: 30px;"><em>|</em><span>确认收益信息</span></p>
			<hr />
			<el-table :data="tabledata8">
				<el-table-column prop="username" label="用户名" align="center"></el-table-column>
				<el-table-column prop="realname" label="真实姓名" align="center"></el-table-column>
				<el-table-column prop="userrole" label="用户角色" align="center"></el-table-column>
				<el-table-column prop="userid" label="身份证号" align="center"></el-table-column>
				<el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
				<el-table-column prop="payee" label="收款人" align="center"></el-table-column>
			</el-table>
			<el-table :data="tabledata9">
				<el-table-column prop="data1" label="开户支行" align="center"></el-table-column>
				<el-table-column prop="data2" label="银行账号" align="center"></el-table-column>
				<el-table-column label="金额" align="center">
					<template slot-scope="scope">
						<el-button type="text">
							<span>￥{{scope.row.data3}}</span>
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="data2" label="转账凭证" align="center">
					<template slot-scope="scope">
						<el-button type="text">
							<span>查看</span>
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="data2" label="转账审批" align="center">
					<template slot-scope="scope">
						<el-button type="text">
							<span>上传图片</span>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="text-align: center;">
				<el-button class="successbutton">待收益</el-button>
			</el-row>
			<el-row style="text-align: center;">
				<el-button class="dangerbutton">确认无误 上传财务</el-button>
			</el-row>
			<el-row style="text-align: center;">
				<el-button class="successbutton">已转账，交易成功</el-button>
			</el-row>
		</div>

		<!--未通过原因-->
		<div v-if="orderDetailStatus==-1020">
			<p class="title" style="margin-top: 30px;"><em>|</em><span>未通过原因</span></p>
			<hr />
			<el-table :data="tabledata10">
				<el-table-column prop="id" label="订单号" align="center"></el-table-column>
				<el-table-column prop="type" label="订单类型" align="center"></el-table-column>
				<el-table-column prop="userid" label="用户" align="center"></el-table-column>
				<el-table-column prop="createdate" label="生成时间" align="center"></el-table-column>
				<el-table-column prop="description" label="未通过原因" align="center"></el-table-column>
			</el-table>
			<el-row style="text-align: center;">
				<el-button class="dangerbutton">审核未通过</el-button>
			</el-row>
		</div>

		<!--审核失败弹框-->
		<el-dialog title="审核失败" :visible.sync="faildialog">
			<el-table :data="tabledata11">
				<el-table-column prop="id" label="订单号" align="center"></el-table-column>
				<el-table-column prop="userid" label="用户名" align="center"></el-table-column>
				<el-table-column prop="contact" label="审核员" align="center"></el-table-column>
				<el-table-column prop="merchandiser" label="验收状态" align="center">
					<template slot-scope="scope">
						<el-button type="text" style="text-decoration: underline;" class="danger">
							审核未通过
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-form v-model="failform" label-width="95px">
				<el-form-item label="*未通过理由:">
					<br />
					<el-input v-model="failform.reason" type="textarea" placeholder="请填写未通过理由" :rows="6"></el-input>
				</el-form-item>
				<div style="text-align: center;">
					<el-button size="medium" class="darkbutton" @click="submit">提交</el-button>
				</div>
			</el-form>
		</el-dialog>
		<!--验收订单   验收失败  弹框-->
		<el-dialog title="验收失败" :visible.sync="checkfailflag">
			<el-table :data="tabledata12">
				<el-table-column prop="repor_edition" label="报告名称"></el-table-column>
				<el-table-column prop="state_name" label="接单方状态"></el-table-column>
				<el-table-column prop="contact" label="审核人"></el-table-column>
				<el-table-column prop="checkstate" label="验收状态">
					<template slot-scope="scope">
						<span>验收未通过</span>
					</template>
				</el-table-column>

			</el-table>
			<el-form label-width="95px">
				<el-form-item label="*未通过理由:">
					<br />
					<el-input type="textarea" placeholder="请填写未通过理由" :rows="6" v-model="reason1"></el-input>
				</el-form-item>
				<div style="text-align: center;">
					<el-button size="medium" class="darkbutton" @click="submit1">提交</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	//共用方法
	import LLS from '@/lls/lls'
	import API from '@/api/api'
	export default {
		data() {
			return {
				reason1:'',
				//1  代表  信息订单
				//2 代表   需求订单
				orderType: '',
				//				1022  待派单
				//				1020  待审核
				//				1026  待验收
				//				1030  交易成功
				//			   -1030  交易失败
				//				1025  进行中订单
				//			   -1020  审核失败
				//			    1014  财务审批
				//			    1029  待收益
				//			   -1026  验收失败
				orderDetailStatus: '1026',
				basicform: {},
				//订单号
				orderNum: "",
				type: "0",
				orderform: {
					infotype: "2",
					begintime: "",
					endtime: ""
				},
				//未通过弹窗 form
				failform: {
					reason: ""
				},
				//订单信息
				orderformdata: {
					ordertype: "投融信息",
					infotype: "并购/重组",
					contact: "张三三",
					phone: "15518725781",
					enterprisename: "南京资金有限公司",
					industrytype: "金融",
					enterprisescale: "500人",
					companyaddress: "江苏省南京市某某某路110号1818",
					descontent: "描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容",
					totalcost: "20000万元"
				},
				//基本信息
				basicformdata: {
					ordertype: "投融信息",
					infotype: "并购/重组",
					contact: "张三三",
					phone: "15518725781",
					enterprisename: "南京资金有限公司",
					industrytype: "金融",
					local: "南京",
					enterprisescale: "500人",
					companyaddress: "江苏省南京市某某某路110号1818",
					descontent: "描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容",
					//					totalcost:"20000万元"
				},
				//订单详情   tabledata1  tabledata2
				tabledata1: [],
				tabledata2: [{
					contacts: "20171113",
					address: "金融信息",
					accstate: "个人（个人+企业）",
					communicationtime: '2017-11-13',
					merchandiser: "李晓明"
				}],
				//指定/内推   tabledata3
				tabledata3: [{
					username: "15518725781",
					enterprisename: "南京资金有限公司",
					enterpriselevel: "6",
					quotations2: "￥180",
					bond: "￥100.00元",
				}],
				//接单方   带筛选   tabledata4
				tabledata4: [],
				//接单方  无筛选  tabledata5
				tabledata5: [{
					username: "15518725781",
					enterprisename: "南京资金有限公司",
					level: "钻石",
					price: "18000",
					rank: "1"
				}],
				//项目进度跟踪>经理每周报告  tabledata6
				tabledata6: [{
						time: "2017.11.15",
						version: "2017.11.15-v1",
						state: "1",
						reason: "报告信息有误"
					},
					{
						time: "2017.11.15",
						version: "2017.11.15-v1",
						state: "0",
						reason: "报告信息有误"
					}
				],
				//结案报告  tabledata7
				tabledata7: [{
					date: "2017.11.22",
					state: "已提交"

				}],
				//确认收益  tabledata8  tabledata9
				tabledata8: [{
					username: "15518725781",
					realname: "张三三",
					userrole: "接单方",
					userid: "34134321434243243",
					phone: "15518725781",
					payee: "张三三"
				}],
				tabledata9: [],
				//未通过原因  tabledata10
				tabledata10: [],
				//审核失败弹框   tabledata11
				tabledata11: [],
				//验收订单  tabledata12
				tabledata12: [{

					reportname: "2017.11.15-v1",
					orderstate: "已提交",
					auditor: "工号001王小明",
					checkstate: "验收未通过"
				}],
				//完善信息表单
				perfectorderform: {},
				//确认收益信息  栏目下 的表格数据
				//表格1
				tabeldata3: [{
					username: "15518725781",
					realname: "张三三",
					userrole: "接单方",
					userid: "214324321434324324324",
					phone: "15518725781",
					payee: "张三三"

				}],
				//表格1
				tabeldata4: [{
					data1: "建设银行南京白下路支行",
					data2: "6217 2132 2321 2323 2132",
					data3: "2000.00"
				}],
				faildialog: false,
				//订单类型
				//-1----待派单
				//0 ----待审核
				//1 ----待验收
				//2 ----交易成功
				//3 ----交易失败
				//4 ----进行中订单
				//5 ----审核成功
				//6 ----审核失败
				//7 ----收益详情
				ordertype: "-1",
				//指定/内推-表单
				search1Form: {
					content: ''
				},
				//接单方-表单
				getorderform: {},
				checkfailflag: false,
				query1Form: {

				},
				info1: {},
			}
		},
		methods: {
			msg(type, txt) {
				this.$message[type]({
					showClose: true,
					message: txt,
					duration: 2000
				});
			},
			//指定、内推  接口
			assignInterior(par) {
				let _this = this;
				API.assignInterior(par).then(function(res) {
					console.log(212, res);
					if(res.code == 200) {
						_this.$data.tabledata3 = res.data.list;
					} else {
						_this.$message.error({
							showClose: true,
							message: '列表获取失败',
							duration: 2000
						});
					}
				}, function(err) {
					_this.$message.error({
						showClose: true,
						message: '服务器错误',
						duration: 2000
					});
				})
			},
			//接单方  接口
			selOrder(par) {
				API.selOrder(par).then(function(res) {
					if(res.code == 200) {

					} else {

					}
				}, function(err) {

				})
			},
			//接单方全部信息搜索   接口
			selOrder(par) {
				let _this = this;
				API.selOrder(par).then(function(res) {
					if(res.code == 200) {
						_this.tabledata4 = res.data.list;
					} else {
						_this.$message.error({
							showClose: true,
							message: '接单方列表获取失败',
							duration: 2000
						});
					}
				}, function(err) {
					_this.$message.error({
						showClose: true,
						message: '服务器错误',
						duration: 2000
					});
				})
			},
			//项目进度跟踪
			projectTail(id) {
				let _this = this;
				API.projectTail(id).then(function(res) {
					if(res.code == 200) {
						_this.$data.tabledata6 = res.data
					}
					console.log(res, 89)
				}, function(err) {

				})
			},
			//内推   搜索按钮
			search1() {
				let par = {
					pageNum: 1,
					pageSize: 2,
					text: this.$data.search1Form.content
				}
				this.assignInterior(par);
			},
			//接单方  搜索按钮
			search2() {
				let par = {
					pageNum: 1,
					pageSize: 2,
					orderNumber: this.$data.id,
					text: this.$data.search1Form.content
				}
				this.selOrder(par);
			},
			//接单方   查询按钮
			query1() {

			},
			//全选切换
			selectall(tabledata4) {
				tabledata4.forEach(row => {
					this.$refs['tabledata4'].toggleRowSelection(row)
				});
			},
			fillinfo() {},
			//审核失败提交
			submit() {
				let _this = this;
				let par = {
					orderNumber: this.$data.orderNum,
					cause: this.$data.failform.reason,
					type: this.$data.orderType,
				};
				API.defeatedInfoUp(par).then(function(res) {
					if(res.code == 200) {
						_this.msg('success', '审核失败提交成功');
					} else {
						_this.msg('error', `code:${res.code}`);
					}
					_this.$data.faildialog = false;
				}, function(err) {
					_this.msg('error', '服务器错误');
					_this.$data.faildialog = false;
				})
			},
			submit1(){
				//27
				let par={
					orderNumber:this.$data.orderNum,
					type:this.$data.orderType,
					cause:this.$data.reason,
					stateid:'-1026',
					statename:'验收失败',
				};
				API.checkDefeatedSubmit(par)
			},
			//验证通过
			checkSuccess() {
				console.log(this.$data.orderType)
				let par = {
					orderNumber: this.$route.params.id,
					type: this.$data.orderType,
				}
				API.passInfo(par).then(function(res) {

				})
			},
			//验收失败
			checkFail() {
				this.checkDefeated();
			},
			//待派单详情  接口
			employeeOrdersNew(orderNum) {
				let _this = this;
				API.employeeOrdersNew(orderNum).then(function(res) {
					if(res.code == 200) {
						_this.$data.tabledata1 = res.data;
						_this.$data.tabledata2 = res.data;
						_this.msg('success', 'employeeOrdersNew')
					} else {
						_this.msg('error', `code:${res.code}`)
					}
				}, function(err) {
					_this.msg('error', '服务器错误')
				});
			},
			//订单信息   接口
			auditBasicsInfo(orderNum) {
				let _this = this;
				API.auditBasicsInfo(orderNum).then(function(res) {
					if(res.code == 200) {
						_this.$data.info1 = res.data;
						_this.msg('success', 'auditBasicsInfo');
					} else {
						_this.msg('error', `code:${res.code}`);
					}
				}, function(err) {
					_this.msg('error', '服务器错误');
				})
			},
			//审核失败详情   接口
			defeatedInfo(orderNum) {
				let _this = this;
				API.defeatedInfo(orderNum).then(function(res) {
					if(res.code == 200) {
						_this.$data.tabledata11 = [res.data];
						_this.$data.faildialog = true;
					}
				});
			},
			//验收失败详情
			checkDefeated() {
				let _this = this;
				let par = {
					orderNumber: this.$data.orderNum,
					type: this.$data.orderType,
				};
				API.checkDefeated(par).then(function(res) {
					if(res.code == 200) {
						_this.$data.tabledata12 = [res.data];
						_this.$data.checkfailflag = true;
					} else {
						_this.msg('error', `code:${res.code}`);
					}
				}, function(err) {
					_this.msg('error', '服务器错误');
				})
			},
			nopass() {
				this.defeatedInfo(this.$data.orderNum);
			},
		},
		mounted() {
			let _this = this;
			this.$data.orderNum = this.$route.params.id; //订单号
			let orderNum = this.$data.orderNum;
			//订单类型
			if(JSON.parse(sessionStorage.getItem('temp1')).type == 0) {
				this.$data.orderType = '01'; //信息类型
			} else {
				this.$data.orderType = '02' //需求类型
			};

			this.employeeOrdersNew(orderNum);

			this.auditBasicsInfo(orderNum);

			//未通过原因
			API.noPassCause(orderNum).then(function(res) {
				_this.$data.tabledata10 = res.data;
			})

			//内推  搜索按钮
			this.search1();

			this.projectTail(orderNum);
		}
	}
</script>

<style scope lang="scss">
	.content-vi {
		height: 98%;
	}
	
	.el-dialog {
		width: 66%;
	}
	
	.blue {
		color: #409EFF;
	}
	
	.success {
		color: #67C23A;
	}
	
	.warn {
		color: #E6A23C;
	}
	
	.danger {
		color: #F56C6C;
	}
	
	.el-button.successbutton {
		background: #67C23A;
		color: #fff;
		width: 16em;
	}
	
	.el-button.warnbutton {
		background: #E6A23C;
		color: #fff;
		width: 16em;
	}
	
	.el-button.dangerbutton {
		background: #f56c6c;
		color: #fff;
		width: 16em;
	}
	
	.el-input__inner {
		height: 36px;
		border-radius: 0;
	}
	
	.darkbutton {
		background: #4A4F63 !important;
		color: #fff !important;
	}
	
	.searchinput {
		width: 400px;
	}
	
	.content-vi {
		padding-top: 25px;
	}
	
	.el-table {
		margin-bottom: 18px;
		.has-gutter tr {
			background: #4a4f63;
			color: #fff;
			th {
				border: none;
			}
		}
	}
	
	.orderdetail {
		.title {
			color: #858DAD;
			font-weight: bold;
			margin-top: 0;
			font-size: 16px;
			em {
				color: #556191;
				margin-right: 10px;
			}
			span {
				vertical-align: middle;
			}
			hr {
				height: 2px;
				background-color: #556191;
			}
		}
	}
	
	.el-table .el-button {
		text-decoration: underline;
	}
	
	.orderinfo {
		margin-bottom: 50px
	}
	
	.basicinfo .el-form-item,
	.orderinfo .el-form-item {
		margin-bottom: 0;
		.el-form-item__label {
			padding-right: 5em;
		}
		a {
			color: #409EFF;
		}
	}
	
	.down {
		cursor: pointer;
		float: right;
		width: 27px;
		height: 33px;
		background: url(../../assets/down.png) no-repeat center center;
	}
	
	.up {
		cursor: pointer;
		float: left;
		width: 27px;
		height: 33px;
		background: url(../../assets/up.png) no-repeat center center;
	}
</style>

<style>
	/*.content-wrap,
	.content-wrap .content-vi {
		height: 100% !important;
	}*/
	
	body {
		background: rgb(66, 72, 91) !important;
	}
</style>