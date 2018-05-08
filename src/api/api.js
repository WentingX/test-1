/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
    //登录
    login: params => {
        return API.POST('/api/v1/admin/login', params)
    },
    //登出
    logout: params => {
        return API.GET('/api/v1/users/logout', params)
    },
    //菜单列表
    menu: params => {
        return API.GET('/api/v1/admin/sys/user/isLogin')
    },
    //banner列表
    banner: params => {
        return API.GET('/api/v1/admin/banner/firstPageBannerType/' + params)
    },
    //banner详情
    bannerInfo: params => {
        return API.GET('/api/v1/admin/banner/firstPageBannerByid', params)
    },
    //新增banner
    preserveBanner: params => {
        return API.POST('/api/v1/admin/banner/firstPageBannerInsert', params)
    },
    //修改banner
    amendBanner: params => {
        return API.PUT('/api/v1/admin/banner/firstPageBannerUpdate', params)
    },
    //删除banner
    deleteBanner: params => {
        return API.DELETE('/api/v1/admin/banner/firstPageBannerDeleteById', params)
    },
    //投后管理列表(搜索)
    investment: params => {
        return API.GET('/api/v1/admin/banner/selectConditionComplainInfoIntention', params)
    },
    //高端定制列表(搜索)
    customization: params => {
        return API.GET('/api/v1/admin/banner/selectNewHighEndInfoIntention', params)
    },
    //投后管理列表(筛选)
    investmentInquire: params => {
        return API.GET('/api/v1/admin/banner/selectConditionComplain', params)
    },
    //高端定制列表(筛选)
    customizationInquire: params => {
        return API.GET('/api/v1/admin/banner/selectNewHighEnd', params)
    },
    //意向信息操作
    operation: params => {
        return API.PUT('/api/v1/admin/banner/highEndConditionTF', params)
    },
    //相关报道列表
    report: params => {
        return API.GET('/api/v1/admin/banner/firstPageBannerRelatedFindByState', params)
    },
    //新增相关报道
    incresReport: params => {
        return API.POST('/api/v1/admin/banner/firstPageBannerRelatedInsert', params)
    },
    //相关报道详情
    reportInfo:params=>{
      return API.GET('/api/v1/admin/banner/firstPageBannerRelatedFindById/'+params)
    },
    //修改相关报道
    modiReport:params=>{
      return API.PUT('/api/v1/admin/banner/firstPageBannerRelatedUpdate',params)
    },
    //删除相关报道
    delReport:params=>{
      return API.DELETE('/api/v1/admin/banner/firstPageBannerRelatedDeleteState/'+params)
    },
    //资深团队列表
    teamList:params=>{
        return API.GET('/api/v1/admin/seniorteam/seniorTeamAll', params)
    },
    //资深团队详情
    teamInfo:params=>{
        return API.GET('/api/v1/admin/seniorteam/seniorTeamId/'+ params)
    },
    //删除资深团队
    delTeam:params=>{
       return API.DELETE('/api/v1/admin/seniorteam/deleteSeniorId/'+params)
    },
    //新增资深团队
    incresTeam:params=>{
        return API.POST('/api/v1/admin/seniorteam/addSeniorTeam',params)
    },
	//修改资深团队
	modiTeam:params=>{
	return API.PUT('/api/v1/admin/seniorteam/updateSeniorId',params)
	},
    //资金管理-保证金管理
    depositInquire: params => {
        return API.GET('/api/v1/admin/manages/deposit?pageSize=10&pageNum=' + params)
    },
    //资金管理-保证金管理-详情
    depositChilk: params => {
        return API.GET('/api/v1/admin/manages/deposit/' + params)
    },
    //资金管理-资金明细列表
    particularsInquire: params => {
        return API.GET('/api/v1/admin/manages/deposit/detailed?pageSize=10&pageNum=' + params)
    },
    //资金管理-提现管理（退款）
    withdrawInquire: params => {
        return API.GET('/api/v1/admin/manages/deposit/refund?pageSize=10&pageNum=' + params)
    },
    //资金管理-确认退款
    depositRefund: params => {
        return API.PUT('/api/v1/admin/manages/deposit/refund?id=' + params)
    },
    //资金管理-保证金退款
    cashRefund: params => {
        return API.POST('/api/v1/core/aliPay/refund?orderNo=' + params)
    },
    //保证金关键字查询
    allEnsure: params => {
        return API.GET('/api/v1/admin/manages/allEnsure?keyWord=' + params)
    },
    //保证金退款关键字查询
    refundByKeyWord: params => {
        return API.GET('/api/v1/admin/manages/refundByKeyWord?keyWord=' + params)
    },
    //资金明细列表关键字查询接口
    detailByKeyWord: params => {
        return API.GET('/api/v1/admin/manages/detailByKeyWord?keyWord=' + params)
    },
    //注册用户
    //注册用户-搜索
    userAll: params => {
        return API.GET('/api/v1/admin/manages/userAll' + params)
    },
    //注册用户-列表
    register: params => {
        return API.GET('/api/v1/admin/manages/lists?pageSize=10&pageNum='+ params)
    },
    //注册用户-禁用
    userDisables: params => {
        return API.PUT('/api/v1/admin/manages/userDisables/' + params)
    },
    //信息方管理-列表 用注册用户的接口
    message: params => {
        return API.GET('/api/v1/admin/manages/lists?pageSize=10&attribute=01&pageNum='+ params)
    },
    //需求方管理-列表 用注册用户的接口
    demand: params => {
        return API.GET('/api/v1/admin/manages/lists?pageSize=10&attribute=02&pageNum='+ params)
    },
    //服务商管理-列表 用注册用户的接口
    provide: params => {
        return API.GET('/api/v1/admin/manages/lists?pageSize=10&attribute=03&pageNum='+ params)
    },
    //需求方管理-列表 用注册用户的接口
    demand: params => {
        return API.GET('/api/v1/admin/manages/lists?pageSize=3&attribute=02&pageNum=' + params)
    },
    //服务商管理-列表 用注册用户的接口
    provide: params => {
        return API.GET('/api/v1/admin/manages/lists?pageSize=3&attribute=03&pageNum=' + params)
    },
    //个人资料
    basicInfo: params => {
        return API.GET('/api/v1/admin/manages/basicInfo/' + params)
    },
    //企业资料
    basicCompanyInfo: params => {
        return API.GET('/api/v1/admin/manages/basicCompanyInfo/' + params)
    },
    //个人认证
    idCardAuth: params => {
        return API.GET('/api/v1/admin/manages/idCardAuth/' + params)
    },
    //企业认证
    companyAuth: params => {
        return API.GET('/api/v1/admin/manages/companyAuth/' + params)
    },
    //技能展示 个人擅长能力
    ability: params => {
        return API.GET('/api/v1/admin/manages/ability/' + params)
    },
    //技能展示 个人资质
    natural: params => {
        return API.GET('/api/v1/admin/manages/natural/' + params)
    },
    //技能展示 项目经验
    experiences: params => {
        return API.GET('/api/v1/admin/manages/experiences/' + params)
    },
    //技能展示 项目经验详情
    experience: params => {
        return API.GET('/api/v1/admin/manages/experience/' + params)
    },
    //发布订单
    allReleaseOrder: params => {
        return API.GET('/api/v1/admin/manages/allReleaseOrder' + params)
    },
    //接单订单-搜索
    allOrderByKeyWord: params => {
        return API.GET('/api/v1/admin/manages/allOrderByKeyWord' + params)
    },
    //接单订单
    allOrder: params => {
        return API.GET('/api/v1/admin/manages/allOrder/' + params)
    },
    //收藏
    favoritesByUserId: params => {
        return API.GET('/api/v1/admin/manages/favoritesByUserId/' + params)
    },
    //资金信息
    deposit: params => {
        return API.GET('/api/v1/admin/manages/user/deposit/' + params)
    },
    //撮合信息
    matchInfo: params => {
        return API.GET('/api/v1/admin/manages/matchInfo/' + params)
    },
    //撮合详情
    matchDetail: params => {
        return API.GET('/api/v1/admin/manages/matchDetail/' + params)
    },
    //撮合信息--关闭订单
    ifClose: params => {
        return API.PUT('/api/v1/admin/manages/ifClose/' + params)
    },
    failMatching: params => {
        return API.POST('/api/v1/admin/manages/failMatching/' + params)
    },
    depositIncome: params => {
        return API.GET('api/v1/admin/manages/deposit/income/number?' + params)
    },
    //权限管理-菜单管理-菜单列表
    menuManager: params => {
        return API.GET('/api/v1/admin/sys/menu/menus', params)
    },
    //权限管理-菜单禁用开启
    menuOperation: params => {
        return API.POST('/api/v1/admin/sys/menu/ids', params)
    },
    //权限管理-一级菜单信息
    menuDetail: params => {
        return API.GET('/api/v1/admin/menus/detail/' + params)
    },
    //权限管理-二级菜单信息
    menuDetail2: params => {
        return API.GET('/api/v1/admin/sys/menu/nodes/' + params)
    },
    //权限管理-新增菜单
    AddMenu: (params) => {
        return API.POST('/api/v1/admin/sys/menu/menus', params)
    },
    //权限管理-新增二级菜单
    AddchildMenu: (list, params) => {
        return API.POST('/api/v1/admin/menus/secondLevel/' + list, params)
    },
    //权限管理-修改菜单
    rewriteMenu: (list, params) => {
        return API.PUT('/api/v1/admin/menus/menus/' + list, params)
    },
    //操作管理-操作列表
    operationList: params => {
        return API.GET('/api/v1/admin/sys/menu/buttons')
    },
    //操作管理 - 禁用/启用
    operationOffOn: params => {
        return API.PUT('/api/v1/admin/operations/operationBasic/' + params)
    },
    //操作修改查询
    operationModifyCheck: params => {
        return API.GET('/api/v1/admin/operations/operationBasic/' + params)
    },
    //操作修改
    operationBasic: (params, List) => {
        return API.PUT('/api/v1/admin/operations/operationBasic?' + params, List)
    },
    //操作信息新增
    operationBasicAdd: (params, List) => {
        return API.POST('/api/v1/admin/operations/operationBasic?' + params, List)
    },
    //删除操作
    operationsOperas: (params) => {
        return API.DELETE('/api/v1/admin/operations/operas?' + params)
    },
    //员工列表
    employeesList: params => {
        return API.GET('/api/v1/admin/employees/allEmployeeList?pageSize=3&pageNum=' + params)
    },
    //员工禁用和开启
    employeesOffOn: params => {
        return API.PUT('/api/v1/admin/employees/status/' + params)
    },
    //获取员工工号
    jobNumber: () => {
        return API.GET('/api/v1/admin/employees/jobNumber')
    },
    //获取员工权限信息
    role: () => {
        return API.GET('/api/v1/admin/sys/role/list')
    },
    //员工信息新增
    addEmployees: params => {
        return API.POST('/api/v1/admin/employees/addEmployee', params)
    },
    //员工详情
    employeeDetail: params => {
        return API.GET('/api/v1/admin/employees/employeeDetail/' + params)
    },
    //员工信息修改
    rewriteEmployee: params => {
        return API.PUT('/api/v1/admin/employees/updateEmployeeBasic', params)
    },
    //修改密码
    changePassword: params => {
        return API.PUT('/api/v1/admin/employees/password/' + params)
    },
    //员工删除
    deleteEmployee: params => {
        return API.DELETE('/api/v1/admin/employees/deleteEmployee?' + params)
    },
    //员工服务订单
    serverOrder: params => {
        return API.GET('/api/v1/admin/employees/server/' + params)
    },
    //转移-当前信息
    nowInfo: params => {
        return API.GET('/api/v1/admin/manages/nowInfo/' + params)
    },
    //员工列表
    employeeLists: (params) => {
        return API.GET('/api/v1/admin/employees/employeeLists' + params)
    },
    //派发-转移
    removePublish: params => {
        return API.POST('/api/v1/admin/manages/removePublish', params)
    },
    //全部通知-搜索
    selectOnlyConditionSystemOrder: params => {
        return API.GET('/api/v1/admin/systemOrderControllers/selectOnlyConditionSystemOrder' + params)
    },
    //全部通知-查询
    selectMoreConditionSystemOrder: params => {
        return API.GET('/api/v1/admin/systemOrderControllers/selectMoreConditionSystemOrder/' + params)
    },
    //全部通知-禁用
    deleteByIdAllSystemOrder: params => {
        return API.PUT('/api/v1/admin/systemOrderControllers/deleteByIdAllSystemOrder' + params)
    },
    //全部通知-详情
    selectByIdAllSystemOrder: params => {
        return API.GET('/api/v1/admin/systemOrderControllers/selectByIdAllSystemOrder/' + params)
    },
    //新建通知 点击指定发送 查询
    selectCompanyUserSystemOrder: params => {
        return API.GET('/api/v1/admin/systemOrderControllers/selectCompanyUserSystemOrder' + params)
    },
    //新建通知 搜索
    selectCompanyUserTelephoneSystemOrder: params => {
        return API.GET('/api/v1/admin/systemOrderControllers/selectCompanyUserTelephoneSystemOrder' + params)
    },
    //新建通知 确定
    insertConditionSystemOrder: params => {
        return API.POST('/api/v1/admin/systemOrderControllers/insertConditionSystemOrder' + params)
    },
    //新建通知 指定发送  发送 集合
    sendSystemOrder: (aa, params) => {
        return API.POST('/api/v1/admin/systemOrderControllers/sendSystemOrder' + aa, params)
    },
    //财务通知-查询
    //财务通知-收益管理-查询
    manyconditionsFinance: params => {
        return API.GET('/api/v1/information/earningsAccount/manyconditionsFinance/' + params)
    },
    //财务通知-查看
    earningsAccountById: params => {
        return API.GET('/api/v1/information/earningsAccount/earningsAccountById' + params)
    },
    //财务通知-搜索
    earningsAccountByText: params => {
        return API.GET('/api/v1/information/earningsAccount/earningsAccountByText' + params)
    },
    //财务通知-待转账-确认转账
    earningsAccountTransferTrue: params => {
        return API.PUT('/api/v1/information/earningsAccount/earningsAccountTransferTrue' + params)
    },
    //财务通知-交易明细-支出
    earningsAccountSum: params => {
        return API.GET('/api/v1/information/earningsAccount/earningsAccountSum' + params)
    },
    //财务通知-交易明细-时间  开始  结束
    earningsAccountDateStartTimeEndTime: params => {
        return API.GET('/api/v1/information/earningsAccount/earningsAccountDateStartTimeEndTime' + params)
    },
    //财务通知-交易明细-时间2 今天 昨天 最近7天 最近30天
    earningsAccountDateSelect: params => {
        return API.GET('/api/v1/information/earningsAccount/earningsAccountDateSelect' + params)
    },
    //撮合管理（全部信息）
    allinformation: params => {
        return API.GET('/api/v1/admin/manages/allMatching', params)
    },
     //撮合管理（搜索按钮）
    searchfor: params => {
        return API.GET('/api/v1/admin/manages/matchingInfo', params)
    },
    //撮合管理--待撮合--详情(并购)
    tobematched2: params => {
        return API.GET('/api/v1/admin/manages/matchDetail/' + params)
    },
    //撮合管理--待撮合--详情(被并购)
    tobematched3: params => {
        return API.GET('/api/v1/admin/manages/beMatchDetail/' + params)
    },
    //撮合管理--详情(并购)(提供内容)
    providecontent: (id, params) => {
        return API.PUT('/api/v1/admin/manages/matchingById/' + id, params)
    },
    //撮合管理--详情(被并购)(提供内容)
    providecontent2: (id, params) => {
        return API.PUT('/api/v1/admin/manages/beMatchingById/' + id, params)
    },
    //撮合管理--详情(调查报告)
    investigation: (id, params) => {
        return API.GET('/api/v1/admin/manages/researchReport/' + id, params)
    },
    //撮合管理--详情(未通过原因展示)
    roughthereasons: (id, params) => {
        return API.GET('/api/v1/admin/manages/failMatching/' + id, params)
    },
    //撮合管理--待撮合--当前信息
    distribution: (par) => {
    	return API.GET('/api/v1/admin/manages/nowInfo/'+par)
    },
    //撮合管理--待撮合--任务派发（转移任务）
    Transfertasks: (par) => {
    	return API.POST('/api/v1/admin/manages/removePublish'+par)
    },
     //撮合管理--地区查询
    Regionalinquiry: (par) => {
    	return API.GET(' /api/v1/admin/resourceLibrary/selectAddressProvince',par)
    },
    //撮合管理--待撮合--任务派发（员工列表）
    stafflist: (par) => {
        return API.GET('/api/v1/admin/employees/employeeLists', par)
    },
	//撮合管理--确认撮合
    confirmmatchor: (a,id) => {
    	return API.PUT('/api/v1/admin/manages/matchingOk/'+a, id)
    },
    //撮合管理(关闭订单/撮合失败)
    failedclosetheorder: (c, id) => {
        return API.POST('/api/v1/admin/manages/failMatching/' + c, id)
    },
    //撮合管理--撮合中(撮合成功)
    matchsuccessfull: (b, id) => {
        return API.PUT('/api/v1/admin/manages/waitMatching/' + b, id)
    },
	//撮合管理--撮合中--详情(并购)
    tobematched4: params => {
        return API.GET('/api/v1/admin/manages/matchDetail/' + params)
    },
    //撮合管理--撮合中--详情(被并购)
    tobematched5: params => {
        return API.GET('/api/v1/admin/manages/beMatchDetail/' + params)
    },
    //撮合管理--撮合中--选择信息类型接口
    backstage: params => {
        return API.POST('/api/v1/admin/manages/backstage?matchingId=' + params)
    },
    //撮合管理--撮合中--项目文件上传
    fileUpload: params => {
        return API.POST('/api/v1/admin/manages/fileUpload' , params)
    },
    //撮合管理--待收益--详情(并购)
    tobematched6: params => {
        return API.GET('/api/v1/admin/manages/matchDetail/' + params)
    },
    //撮合管理--待收益--详情(被并购)
    tobematched7: params => {
        return API.GET('/api/v1/admin/manages/beMatchDetail/' + params)
    },
    //撮合管理--待收益--详情(收益信息)
    revenueinformation: params => {
        return API.GET('/api/v1/admin/manages/earningsInfo/' + params)
    },
    //撮合管理--待收益--详情(被收益信息)
    revenueinformation2: params => {
        return API.GET('/api/v1/admin/manages/earningsBeInfo/' + params)
    },
    //撮合管理--撮合失败--详情(并购)
    tobematched8: params => {
        return API.GET('/api/v1/admin/manages/matchDetail/' + params)
    },
    //撮合管理--撮合失败--详情(被并购)
    tobematched9: params => {
        return API.GET('/api/v1/admin/manages/beMatchDetail/' + params)
    },
    //撮合管理--交易成功--详情(并购)
    tobematched10: params => {
        return API.GET('/api/v1/admin/manages/matchDetail/' + params)
    },
    //撮合管理--交易成功--详情(被并购)
    tobematched11: params => {
        return API.GET('/api/v1/admin/manages/beMatchDetail/' + params)
    },
    //撮合管理--项目文件
    projectfiles: params => {
        return API.GET('/api/v1/admin/manages/projectFileAll/' + params)
    },
    //撮合管理--项目文件删除
    deleteProFile: params => {
        return API.DELETE('/api/v1/admin/manages/deleteProFile/' + params)
    },

    //企业认证---查询
    enterpriseAuthQuery: params => {
        return API.GET('/api/v1/admin/enterCertification/enterCertifiLike', params);
    },
    //企业认证---详情
    enterpriseAuthDetail: params => {
        return API.GET('/api/v1/admin/manages/companyAuth/' + params);
    },
    //企业认证  不通过
    enterpriseNoPass: (params) => {
        return API.POST('/api/v1/admin/enterCertification/entCertification', params);
    },
    //企业认证  通过
    enterprisePass: params => {
        return API.POST(`/api/v1/admin/enterCertification/enterpriseCertificationBy`, params)
    },
    //企业一键数据认证
    enterpriseOneKeyDataPerson: params => {
        return API.POST(`/api/v1/admin/enterCertification/oneKeyDataPersons`, params);
    },
    //企业审核失败原因
    enterFailReasonList: params => {
        return API.GET(`/api/v1/admin/enterCertification/emterFailReasonList`, params);
    },
    //企业认证搜索
    Enterpriseauthenti: params => {
        return API.GET(`/api/v1/admin/enterCertification/allRequirement`, params);
    },
    //企业认证详情 ---通过认证按钮
    enterpriseByReason: (par) => {
        return API.PUT(`/api/v1/admin/enterCertification/enterpriseByReason`, par);
    },

    //个人认证---查询
    personAuthQuery: params => {
        return API.GET('/api/v1/admin/enterCertification/personCertifiLike', params);
    },
    //个人认证---详情
    personAuthDetail: params => {
        return API.GET('/api/v1/admin/manages/idCardAuth/' + params);
    },
    //个人认证   通过
    personPass: params => {
        return API.POST(`/api/v1/admin/enterCertification/personCertificationBy`, params)
    },
    // 个人认证  不通过
    personNoPass: params => {
        return API.POST('/api/v1/admin/enterCertification/personCertification', params);
    },
    //个人一键数据认证
    personOneKeyDataPerson: params => {
        return API.POST(`/api/v1/admin/enterCertification/oneKeyDataPerson`, params);
    },
    //个人审核失败原因
    personFailReasonList: params => {
        return API.GET(`/api/v1/admin/enterCertification/notByReasonListData`, params);
    },
    //个人认证搜索
    personalenterpriseau: params => {
        return API.GET(`/api/v1/admin/enterCertification/allRequirementPerson`, params);
    },
    //个人认证详情---通过认证按钮
    notByReason: (par) => {
        return API.PUT(`/api/v1/admin/enterCertification/notByReason`, par);
    },
    //更新用户属性
    service: userid => {
        return API.POST(`/api/v1/admin/manages/service/${userid}`);
    },
    //订单管理模块
    //全部订单大全
    allNewOrder: params => {
        return API.GET('/api/v1/admin/employeeOrdersNew/allNewOrder', params);
    },
    //信息订单大全
    messageOrder: params => {
        return API.GET('/api/v1/admin/employeeOrdersNew/allNewXXOrder', params);
    },
    //需求订单大全
    demandOrder: params => {
        return API.GET('/api/v1/admin/employeeOrdersNew/allNewXQOrder', params);
    },
    //关闭订单
    closeOrder: params => {
        return API.PUT(`/api/v1/admin/employeeOrdersNew/publish/closeOrder`, params);
    },
    //全部订单搜索
    selAllEmployeeOder: txt => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/selAllEmployeeOder/${txt}`);
    },
    //全部信息订单搜索
    selXXAllEmployeeOder: txt => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/selXXAllEmployeeOder/${txt}`);
    },
    //全部需求订单搜索
    selXXQAllEmployeeOder: txt => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/selXXQAllEmployeeOder/${txt}`);
    },
    //员工列表
    findListAllZP: params => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/findListAllZP`, params);
    },
    //待派单详情
    employeeOrdersNew: id => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/${id}`);
    },
    //订单信息
    auditBasicsInfo: id => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/auditBasicsInfo/${id}`);
    },
    //项目进度跟踪
    projectTail: id => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/projectTail/${id}`);
    },
    //审核失败详情
    defeatedInfo: id => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/defeatedInfo/${id}`);
    },
    //审核失败提交
    defeatedInfoUp: params => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/defeatedInfoUp`, params);
    },

    //审核通过
    passInfo: params => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/passInfo`, params);
    },
    //验收失败详情
    checkDefeated: params => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/checkDefeated`, params);
    },
    //验收失败提交或者验收通过提交
    checkDefeatedSubmit: params => {
        return API.GET(`/api/api/v1/admin/employeeOrdersNew/checkDefeatedSubmit`, params);
    },
    //完善订单信息
    perfectOrderInfo: params => {
        return API.PUT(`/api/api/v1/admin/employeeOrdersNew/perfectOrderInfo`, params);
    },
    //当前信息
    presentInfo: params => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/presentInfo`, params);
    },
    //订单指派转移
    orderDesignate: params => {
        return API.POST(`/api/v1/admin/employeeOrdersNew/orderDesignate?orderNumber=${params.orderNumber}&jobNumber=${params.jobNumber}&name=${params.name}&phone=${params.phone}&roleName=${params.roleName}`, params);
    },
    //未通过原因
    noPassCause: id => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/noPassCause/${id}`);
    },
    //上传版本
    insertVersions: params => {
        return API.POST(`/api/v1/admin/employeeOrdersNew/insertVersions`, params);
    },
    //指定内推列表加搜索
    assignInterior: params => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/assignInterior`, params);
    },
    //接单方全部信息搜索
    selOrder: params => {
        return API.GET(`/api/v1/admin/employeeOrdersNew/selOrder`, params);
    },
    //接单方多条件搜索
    selMuchOrder: params => {
        return API.GET(`/api/api/v1/admin/employeeOrdersNew/selMuchOrder`, params);
    },
    //接单方收益信息
    earningsInfo: id => {
        return API.GET(`/api/api/v1/admin/employeeOrdersNew/earningsInfo/${id}`);
    },
    //接单方收益信息新增
    insertEarningsInfo: params => {
        return API.POST(`/api/v1/admin/employeeOrdersNew/insertEarningsInfo`, params);
    },
    //企业认证---查询
    //?userId=11111&pageNum=1&pageSize=10&companyName&address&status&name=
    enterpriseAuthQuery: params => {
        return API.GET('/api/v1/admin/enterCertification/enterCertifiLike', params);
    },
    //企业认证---详情
    enterpriseAuthDetail: params => {
        return API.GET('/api/v1/admin/manages/companyAuth/' + params);
    },

    //个人认证---查询
    personAuthQuery: params => {
        return API.GET('/api/v1/admin/enterCertification/personCertifiLike', params);
    },
    //个人认证---详情
    personAuthDetail: params => {
        return API.GET('/api/v1/admin/manages/idCardAuth/' + params);
    },

    //关闭订单
    closeOrder: params => {
        return API.PUT(`/api/v1/admin/employeeOrdersNew/publish/closeOrder?ordernumber=${params.ordernumber}&failurereason=${params.failurereason}`)
    },
    //全局搜索
    orderSearch: params => {
        return API.GET('/api/v1/admin/employeeOrdersNew/selAllEmployeeOder/' + params);
    },
    //订单管理列表
    orderList: params => {
        return API.GET('/api/v1/admin/employeeOrdersNew/allOrders', params);
    },
    //订单详情
    orderDetail: params => {
        return API.GET('/api/v1/admin/employeeOrdersNew/' + params);
    },
    //员工列表
    staffList: params => {
        return API.GET('/api/v1/admin/employeeOrdersNew/findListAllZP', params);
    },
    //任务转移
    taskTransfer: (name, params) => {
        return API.PUT('/api/v1/admin/employeeOrdersNew/' + name, params);
    },
    //任务派发
    dispathTask: (name, params) => {
        return API.POST('/api/v1/admin/employeeOrdersNew/' + name, params);
    },
    //当前信息表格
    currentTable: (params) => {
        return API.GET('/api/v1/admin/employeeOrdersNew/' + params);
    },

    //不通过
    noPass: (params) => {
        return API.POST('/api/v1/admin/enterCertification/entCertification', params);
    },
    //撮合管理--收益信息插入
    incomeinserted: (id, params) => {
        return API.POST('/api/v1/admin/manages/earningsInfo/' + id, params)
    },
    //撮合管理--转账审批图片上传
    Transimageupload: params => {
        return API.POST('/zuul/api/v1/admin/manages/transferUpload', params)
    },
    //撮合管理--企业审核报告
    BusinessReviewReport: (id, params) => {
        return API.GET('/api/v1/admin/manages/report/' + id, params)
    },
    //个人认证页面    表格数据
    personAuth:(params) => {
        return API.GET('/api/v1/admin/manages/idCardAuth/' + params);
    },
    //首页财务管理列表
    financialList: params => {
        return API.GET('/api/v1/information/earningsAccount/earningsAccountDateSelect', params)
    },
    financialData: params => {
        return API.GET('/api/v1/information/earningsAccount/zfMoney' + params)
    },
    //首页资金收入及支出
    fundData: params => {
        return API.GET('api/v1/admin/manages/deposit/income/number', params)
    },
    //首页资金管理列表
    fundList: params => {
        return API.GET('/api/v1/admin/manages/refundList', params)
    },
    //首页通知
    inform: params => {
        return API.GET('/api/v1/admin/systemOrderControllers/selectXTSystemOrder', params)
    },
    //首页个人认证
    personage: params => {
        return API.GET('/api/v1/admin/enterCertification/homePersonFindAll', params)
    },
    enterprise: params => {
        return API.GET('/api/v1/admin/enterCertification/homeEnterFindAll', params)
    },
    //首页信息订单概览
    homeinfoorder: params => {
        return API.GET('/api/v1/admin/homeinfodemand/homeinfoorder' , params)
    },
    //首页信息订单 代办事项
    homeinfoorderwait: params => {
        return API.GET('/api/v1/admin/homeinfodemand/homeinfoorderwait' , params)
    },
    //首页需求订单 概览
    demandFindOrder: params => {
        return API.GET('/api/v1/admin/homeinfodemand/demandFindOrder' , params)
    },
    //首页需求订单 代办事项
    demandFindOrderAgency: params => {
        return API.GET('/api/v1/admin/homeinfodemand/demandFindOrderAgency' , params)
    },
    //首页撮合
    together: params => {
        return API.GET('/api/v1/admin/manages/count' , params)
    },
    //权限列表
    jurisdictionList: params => {
        return API.GET('/api/v1/admin/sys/role/all', params)
    },
    //首页注册数据
    loginData: params => {
        return API.GET('/api/v1/admin/manages/userNumber', params)
    },
    //首页时间段注册人数
    loginNum: params => {
        return API.GET('/api/v1/admin/manages/userStatistics', params)
    },
    aa: params => {
        return API.GET('/api/v1/admin/sys/user/isLogin')
    },
    //权限详情
    limits: params => {
        return API.GET('/api/v1/admin/sys/menu/roleMenus', params)
    },
    //权限-批量删除角色
    rolesDelete: params => {
        return API.DELETE('/api/v1/admin/roles/', params)
    },
    //增加权限
    oddRole: params => {
        return API.POST('/api/v1/admin/sys/role', params)
    },
    //修改权限
    amendRole: params => {
        return API.PUT('/api/v1/admin/sys/role', params)
    },
    enterprise:params=>{
        return API.GET('/api/v1/admin/enterCertification/homeEnterFindAll',params)
    },

    //资料库-人才库 搜索
    talentLibrary:params => {
        return API.GET('/api/v1/admin/resourceLibrary/talentLibrary' + params)
    },
    //资料库-人才库-时间 今天 昨天 最近7天 最近30天
    resourceLibraryTimeSelectDataRenCai:params => {
      return API.GET('/api/v1/admin/resourceLibrary/resourceLibraryTimeSelectDataRenCai' + params)
    },
    //资料库-人才库-时间 开始时间 结束时间
    resourceLibraryDateStartTimeEndTimeRenCai:params => {
        return API.GET('/api/v1/admin/resourceLibrary/resourceLibraryDateStartTimeEndTimeRenCai' + params)
    },
    //注册用户-地区 和   资料库-地区-统一的
    area: params => {
        return API.GET('/api/v1/admin/manages/area/', params)
    },
    //资料库-文件库-搜索
    fileLibrary : params => {
        return API.GET('/api/v1/admin/resourceLibrary/fileLibrary' + params)
    },
    //资料库-文件库-时间 今天 昨天 最近7天 最近30天
    resourceLibraryTimeSelectDataWenJian: params => {
        return API.GET('/api/v1/admin/resourceLibrary/resourceLibraryTimeSelectDataWenJian' + params)
    },
    //资料库-文件库-时间 开始时间  结束时间
    resourceLibraryDateStartTimeEndTimeWenJian: params =>{
        return API.GET('/api/v1/admin/resourceLibrary/resourceLibraryDateStartTimeEndTimeWenJian' + params)
    },
    //资料库-企业库  搜索
    enterpriseLibrary: params =>{
        return API.GET('/api/v1/admin/resourceLibrary/enterpriseLibrary' + params)
    },
    //资料库-企业库-时间 今天 昨天  最近7天  最近30天
    resourceLibraryTimeSelectDataQiYe: params => {
        return API.GET('/api/v1/admin/resourceLibrary/resourceLibraryTimeSelectDataQiYe' + params)
    },
    //资料库-企业库-时间 开始时间 结束时间
    resourceLibraryDateStartTimeEndTimeQiYe: params => {
        return API.GET('/api/v1/admin/resourceLibrary/resourceLibraryDateStartTimeEndTimeQiYe' + params)
    },
    //禁用/启用角色
    enableRole: (params, id) => {
        return API.PUT('/api/v1/admin/sys/role/' + id + '/status', params)
    },
    //统计分析-用户今日指标
    userIndicator: params => {
        return API.GET('/api/v1/admin/manages/userAllNumber')
    },
    //统计分析-用户折线图
    userView: params => {
        return API.GET('/api/v1/admin/manages/userView', params)
    },
    //统计分析-认证折线图
    authenticationView: params => {
        return API.GET('/api/v1/admin/manages/authentication', params)
    },
    //统计分析-撮合今日指标
    togetherIndicator: params => {
        return API.GET('/api/v1/admin/manages/matchNumToday', params)
    },
    //统计分析-撮合折线图
    togetherView: params => {
        return API.GET('/api/v1/admin/manages/matchNumStatus', params)
    },
    //统计分析-资金今日指标
    capitalIndicator: params => {
        return API.GET('/api/v1/admin/manages/capitalToday', params)
    },
    //统计分析-资金折线图
    capitalView: params => {
        return API.GET('/api/v1/admin/manages/capitalStatus', params)
    },
    //统计分析-财务今日指标
    financeIndicator: params => {
        return API.GET('/api/v1/admin/manages/financeToday', params)
    },
    //统计分析-财务折线图
    financeView: params => {
        return API.GET('/api/v1/admin/manages/financeType', params)
    },
    //统计分析-登录日志
    loggingList: params => {
        return API.GET('/api/v1/admin/sys/logs', params)
    },
    //统计分析-订单操作
    orderOperate: params => {
        return API.GET('/api/v1/admin/sys/log/orders/operations', params)
    },
    //统计分析-信息订单今日指标
    orderStatisticsIndicator: params => {
        return API.GET('/api/v1/admin/manages/findOrderInfoToday', params)
    },
    orderStatisticsIndicator2: params => {
        return API.GET('/api/v1/admin/manages/requirementsToday', params)
    },
    //统计分析-信息订单折线图
    orderStatisticsView: params => {
        return API.GET('/api/v1/admin/manages/findOrderInfoStatus', params)
    },
     //统计分析-信息订单折线图
    orderStatisticsView2: params => {
        return API.GET('/api/v1/admin/manages/requirementsByStatus', params)
    }
}
