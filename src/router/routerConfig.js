import Login from '@/components/login'
import Home from '@/components/home'
import API from '@/api/api'
import Index from '@/components/index'
import registered from '@/components/userManagement/registered'
import info from '@/components/userManagement/info'
//通知详情
import informDetails from '@/components/informManagement/informDetails'
//交易明细 待转账 详情
import transferredDetails from '@/components/financingManagement/transferredDetails'
//已转账 详情
import alreadyTransferred from '@/components/financingManagement/alreadyTransferred'
import refund from '@/components/fundManagement/refund'
import matchInformation from '@/components/userManagement/userM/matchInformation.vue'
//测试文件
import test from '@/components/userManagement/userM/test.vue'
//认证管理共用的详情页
import detail from '@/components/authenticationManagement/detail'
//发布订单管理中的  订单详情页
import orderdetails from '@/components/orderManagement/orderdetails'
import perfectorde from '@/components/orderManagement/perfectorde'
import test1 from '@/components/orderManagement/perfectorde'
//认证管理lls
import completeInformation from '@/components/showHomeManagement/complete.vue'
import _import from './lazyLoading'

let routes = [
    {
        path: '/login',
        name: '',
        component: Login,
        hidden: true
    }, {
        path: '/',
        name: '',
        component: Home,
        redirect: '/index',
        leaf: true, // 只有一个节点
        children: [
            {
                path: '/index',
                component: Index,
                name: '首页'
            }, {
                path: '/userManagement/info/:id',
                name: '详情',
                component: info
            }, {
                path: '/userManagement/registered/:id',
                name: '用户注册',
                component: _import('userManagement/registered')
            }, {
                path: '/userManagement/userM/test/:id',
                name: '用户详情',
                component: _import('userManagement/userM/test')
            },
                {
                path: '/matchInformationdetails/mone/mtwo/mthree/:id',
                name: '撮合详情',
                component: _import('userManagement/userM/matchInformationdetails')
            }, {
                path: '/projectExperiencedetails/mone/mtwo/mthree/:id', //路由位置
                name: '项目经验详情',
                component: _import('userManagement/userM/projectExperiencedetails') //物理位置
            }, {
                path: '/informManagement/informDetails/:id',
                name: '通知详情',
                component: informDetails
            }, {    
                path: '/financingManagement/transferredDetails/:id',
                name: '待转账详情',
                component: transferredDetails
            }, {
                path: '/financingManagement/alreadyTransferred/:id',
                name: '已转账详情',
                component: alreadyTransferred
            },

            //撮合管理
            {
                path: '/details/:id',
                name: '撮合管理-待撮合',
                component: _import('bringManagement/details')
            },
            {
                path: '/seterng/:id',
                name: '撮合管理-撮合中',
                component: _import('bringManagement/seterng'),
            },
            {
                path: '/matchfai/:id',
                name: '撮合管理-撮合失败',
                component:_import('bringManagement/matchfai')
            },
            {
                path: '/toberewarded/:id',
                name: '撮合管理-待收益',
                component: _import('bringManagement/toberewarded'),
            },
            {
                path: '/transaction/:id',
                name: '撮合管理-交易成功 ',
                component: _import('bringManagement/transaction'),
            },
            {
                path: '/financialapproval/:id',
                name: '撮合管理-财务审批',
                component: _import('bringManagement/financialapproval'),
            },
            {
                path: '/checkFile/:id',
                name: '资金管理-保证金管理',
                component: _import('fundManagement/checkFile')
            },
            {
                path: '/refund/:id',
                name: '提现管理-退款',
                component: refund
            }, {
                path: '/showHomeManagement/increasedHomeBar',
                name: '新增首页banner',
                component: _import('showHomeManagement/homeBar/increasedHomeBar')
            }, {
                path: '/showHomeManagement/modificationHomeBar/info/:id',
                name: '修改首页banner',
                component: _import('showHomeManagement/homeBar/modificationHomeBar')
            }, {
                path: '/showHomeManagement/examineHomeBar/info/:id',
                name: '查看首页banner',
                component: _import('showHomeManagement/homeBar/examineHomeBar')
            }, {
                path: '/showHomeManagement/increasedInformationBar',
                name: '新增信息共享banner',
                component: _import('showHomeManagement/informationBar/increased')
            }, {
                path: '/showHomeManagement/modificationInformationBar/info/:id',
                name: '修改信息共享banner',
                component: _import('showHomeManagement/informationBar/modification')
            }, {
                path: '/showHomeManagement/examineInformationBar/info/:id',
                name: '查看信息共享banner',
                component: _import('showHomeManagement/informationBar/examine')
            }, {
                path: '/showHomeManagement/increasedInvestigationBar',
                name: '新增尽职调查banner',
                component: _import('showHomeManagement/investigationBar/increased')
            }, {
                path: '/showHomeManagement/modificationInvestigationBar/info/:id',
                name: '修改尽职调查banner',
                component: _import('showHomeManagement/investigationBar/modification')
            }, {
                path: '/showHomeManagement/examineInvestigationBar/info/:id',
                name: '查看尽职调查banner',
                component: _import('showHomeManagement/investigationBar/examine')
            }, {
                path: '/showHomeManagement/increasedCustomFirst',
                name: '新增高端定制banner',
                component: _import('showHomeManagement/customBar/first/increased')
            }, {
                path: '/showHomeManagement/modificationCustomFirst/info/:id',
                name: '修改高端定制banner',
                component: _import('showHomeManagement/customBar/first/modification')
            }, {
                path: '/showHomeManagement/examineCustomFirst/info/:id',
                name: '查看高端定制banner',
                component: _import('showHomeManagement/customBar/first/examine')
            }, {
                path: '/showHomeManagement/increasedCustomSecond',
                name: '新增资深团队',
                component: _import('showHomeManagement/customBar/second/increased')
            }, {
                path: '/showHomeManagement/modificationCustomSecond/info/:id',
                name: '修改资深团队',
                component: _import('showHomeManagement/customBar/second/modification')
            }, {
                path: '/showHomeManagement/examineCustomSecond/info/:id',
                name: '查看资深团队',
                component: _import('showHomeManagement/customBar/second/examine')
            }, {
                path: '/showHomeManagement/increasedInvestmentBar',
                name: '新增投后管理banner',
                component: _import('showHomeManagement/investmentBar/increased')
            }, {
                path: '/showHomeManagement/modificationInvestmentBar/info/:id',
                name: '修改尽职调查banner',
                component: _import('showHomeManagement/investmentBar/modification')
            }, {
                path: '/showHomeManagement/examineInvestmentBar/info/:id',
                name: '查看尽职调查banner',
                component: _import('showHomeManagement/investmentBar/examine')
            }, {
                path: '/showHomeManagement/increasedAboutFirst',
                name: '新增关于我们banner',
                component: _import('showHomeManagement/about/first/increased')
            }, {
                path: '/showHomeManagement/modificationAboutFirst/info/:id',
                name: '修改关于我们banner',
                component: _import('showHomeManagement/about/first/modification')
            }, {
                path: '/showHomeManagement/examineAboutFirst/info/:id',
                name: '查看关于我们banner',
                component: _import('showHomeManagement/about/first/examine')
            }, {
                path: '/showHomeManagement/increasedAboutThird',
                name: '新增合作伙伴',
                component: _import('showHomeManagement/about/third/increased')
            }, {
                path: '/showHomeManagement/modificationAboutThird/info/:id',
                name: '修改合作伙伴',
                component: _import('showHomeManagement/about/third/modification')
            }, {
                path: '/showHomeManagement/examineAboutThird/info/:id',
                name: '查看合作伙伴',
                component: _import('showHomeManagement/about/third/examine')
            }, {
                path: '/showHomeManagement/increasedAboutSecond',
                name: '新增相关报道',
                component: _import('showHomeManagement/about/second/increased')
            }, {
                path: '/showHomeManagement/modificationAboutSecond/info/:id',
                name: '修改相关报道',
                component: _import('showHomeManagement/about/second/modification')
            }, {
                path: '/showHomeManagement/examineAboutSecond/info/:id',
                name: '查看相关报道',
                component: _import('showHomeManagement/about/second/examine')
            }, {
                path: '/showHomeManagement/completeInformation',
                name: '全部信息',
                component: _import('showHomeManagement/complete')
            },{
                path: '/checkStaffDetal/1/2/:id',
                name: '员工管理服务订单详情',
                component: _import('authorityManagement/checkStaffDetal')
            }, {
                path: '/detail/:id',
                name: '认证管理-实名认证',
                component: detail,
                hidden: true,
                user: true
            },
            {
                path: '/orderdetails/:id',
                name: '待审核订单-详情',
                component: orderdetails,
                hidden: true,
                user: true
            },
            {
                path: 'perfectorde',
                name: '完善订单',
                component: perfectorde,
                hidden: true,
                user: true
            }
            ,
            {
                path: '/fillinfo',
                name: '待审核订单详情',
                component: test1,
                hidden: true,
                user: true
            }
            , {
                path: '/detail/:id',
                name: '认证管理-实名认证',
                component: detail,
                hidden: true,
                user: true
            },
            {
                path: '/orderdetails/:id',
                name: '待审核订单-详情',
                component: orderdetails,
                hidden: true,
                user: true,
            },
            {
                path: 'perfectorde',
                name: '完善订单',
                component: perfectorde,
                hidden: true,
                user: true
            }
            ,
            {
                path: '/fillinfo',
                name: '待审核订单详情',
                component: test1,
                hidden: true,
                user: true
            }
            , {
                path: '/talentsInfo/:id',
                name: '人才库信息',
                component: _import('dataManagement/talentsInfo')
            }
        ]
    }, {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]
export default routes
//let data = JSON.parse(window.sessionStorage.getItem('access-user'));
//let id = data.userid;
//API.menu(id).then(function (result) {
//    console.log(result)
//})
