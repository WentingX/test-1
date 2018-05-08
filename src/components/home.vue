<template>
<div class="home">
    <el-container>
        <el-header id="headers">
            <el-row :gutter="20">
                <el-col :span="18">
                    <div class="grid-content bg-purple title">看门狗客服管理平台</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple">
                        <el-badge class="el-icon-message"></el-badge>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple"><span>{{username}}</span></div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple"><i class="fa fa-power-off" aria-hidden="true" @click="logout()"></i></div>
                </el-col>
            </el-row>
        </el-header>
        <el-container style="margin-top:60px">
            <el-aside width="180px">
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#42485b" text-color="#fff" active-text-color="#ffd04b" router :default-active="$route.path">
                    <template v-for="(item,index) in nodes" v-if="!item.hidden">
							<el-submenu :index="index+''" v-if="!item.leaf">
								<template slot="title"><i :class="item.icon"></i>{{item.name}}
								</template>
<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}
</el-menu-item>
</el-submenu>
<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}
</el-menu-item>
</template>
</el-menu>
</el-aside>
<el-main>
    <div class="template-tabs">
        <el-tabs v-model="activeIndex" type="border-card" closable @tab-click="tabClick" v-if="options.length" @tab-remove="tabRemove">
            <el-tab-pane v-for="(item, index) in options" :label="item.name" :name="item.route" :key="item.key">

            </el-tab-pane>
        </el-tabs>
    </div>
    <div class="content-wrap">
        <div class="content-vi">
            <router-view>
            </router-view>

        </div>
    </div>
</el-main>
</el-container>
</el-container>
</div>
</template>


<style lang="scss">
    .el-header {
        background-color: #373d41;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #42485b;
        color: #333;
        /*        text-align: center;*/
        height: auto;
        overflow: hidden;
        min-height: 1100px;
    }

    /*
	.el-aside:after {
		content: "";
		visibility: hidden;
		display: block;
		clear: both;
		height: 0px;
	}
*/

    .el-main {
        background-color: #f3f4f7;
        color: #333;
        text-align: left;
        padding: 0;
    }

    .el-menu {
        border: none;
    }

    #headers {
        color: #fff;
        width: 100%;
        position: fixed;
        z-index: 99999;
        .title {
            float: left;
        }
        .fa-power-off {
            cursor: pointer;
        }
    }

    .fa {
        vertical-align: middle;
        width: 40px;
        font-size: 18px;
    }

    .iconfont {
        vertical-align: middle;
        width: 40px;
        font-size: 18px !important;
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .el-submenu [class^=el-icon-] {
        vertical-align: middle;
        width: 40px;
        font-size: 18px;
        margin-right: 0;
        text-align: left;
    }

    .el-menu-item {
        text-align: left;
        padding-left: 60px !important;
        min-width: 179px !important;
        i {
            margin-right: 8px;
        }
    }

    .el-submenu__title {
        padding-left: 13px !important;
    }

    .el-menu-vertical-demo {
        height: 100%;
    }

    .item {
        margin-top: 10px;
        margin-right: 40px;
    }

    .el-tabs {
        border: none;
        .el-tabs__header {
            border: none;
            .el-tabs__item.is-active {
                background: #373d41;
                color: #fff;
            }
            .el-tabs__item.is-active:hover {
                color: #fff;
            }
            .el-tabs__item {
                color: #373d41;
            }
            .el-tabs__item:hover {
                color: #373d41;
            }
        }
        .el-tabs__content {
            display: none;
        }
    }

    .el-tabs__nav div:nth-child(1) span {
        display: none;
    }

    .el-message--success {
        z-index: 99999 !important;
    }

    .el-message--error {
        z-index: 99999 !important;
    }

    .content-wrap {
        height: 92%;
        padding: 20px;
        .content-vi {
            background: #fff;
            max-height: 100%;
            padding: 30px 35px;
        }
    }

</style>
<script>
    import API from '../api/api'
    import axios from 'axios'
    import MenuUtils from '@/utils/MenuUtils'

    var routers = []
    export default {
        data() {
            return {
                username: '',
                nodes: this.$router.options.routes,
                authorization: '',
                jobNumber: '',
                index: 0,
            }
        },
        created() {
            let menu = JSON.parse(window.sessionStorage.getItem('menu'))
            if (menu != null) {
                this.nodes.push(...menu)
            }
            console.log(this.options)
            let access_user = JSON.parse(window.sessionStorage.getItem('access-user'))
            axios.defaults.headers.common['Authorization'] = access_user.authorization;
            let user = JSON.parse(window.sessionStorage.getItem('user'))
            this.username = user.name
            this.jobNumber = user.jobNumber
            this.authorization = access_user.authorization;
        },
        methods: {
            // tab切换时，动态的切换路由
            tabClick(tab) {
                let path = this.activeIndex
                this.$router.push({
                    path: path
                })
            },
            tabRemove(targetName) {
                // 首页不可删除
                if (targetName == '/index') {
                    return
                }
                this.$store.commit('delete_tabs', targetName)
                if (this.activeIndex === targetName) {

                    // 设置当前激活的路由
                    if (this.options && this.options.length >= 1) {
                        this.$store.commit('set_active_index', this.options[this.options.length - 1].route)
                        this.$router.push({
                            path: this.activeIndex
                        })
                    } else {
                        this.$router.push({
                            path: '/'
                        })
                    }
                }
            },
            logout() {
                let vm = this
                let sign = null;
                this.$confirm('确定退出吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            axios.post('/api/api/v1/admin/manages/logout', '', {
                                    headers: {
                                        Authorization: vm.authorization,
                                        username: vm.jobNumber
                                    }
                                })
                                .then(function(response) {
                                    if (response.data.code == 0) {
                                        instance.confirmButtonLoading = false;
                                        sign = true
                                        done();
                                    } else {
                                        instance.confirmButtonLoading = false;
                                        sign = false
                                        done();
                                    }
                                }, (error) => {
                                    console.log(error)
                                    instance.confirmButtonLoading = false;
                                    sign = false
                                    done();
                                });
                        } else {
                            done();
                        }
                    }
                }).then(() => {
                    if (sign) {
                        sessionStorage.clear();
                        location.replace(`/login`);
                    } else {
                        vm.$message({
                            type: 'error',
                            message: '退出失败!'
                        });
                    }
                }).catch(() => {

                });
            },
        },
        mounted() {
            // 刷新时以当前路由做为tab加入tabs
            if (this.$route.path !== '/index') {
                this.$store.commit('add_tabs', {
                    route: '/index',
                    name: '首页',
                    key:'首页'
                })
                this.$store.commit('add_tabs', {
                    route: this.$route.path,
                    name: this.$route.name,
                    key:this.$route.name+this.index
                })
                this.$router.push(this.$route.path)
                this.$store.commit('set_active_index', this.$route.path)
            } else {
                this.$store.commit('add_tabs', {
                    route: '/index',
                    name: '首页',
                     key:'首页'
                })
                this.$store.commit('set_active_index', '/index')
                this.$router.push('/index')
            }

        },
        computed: {
            options() {
                return this.$store.state.options
            },
            activeIndex: {
                get() {
                    return this.$store.state.activeIndex
                },
                set(val) {
                    this.$store.commit('set_active_index', val)
                }
            },
            hidden: {
                get() {
                    return this.$store.state.hidden
                },
            }
        },
        watch: {
            '$route' (to) {
                let flag = false
                for (let option of this.options) {
                //    if (option.route === to.path) {
                    if (option.name === to.name) {
                        flag = true
                        this.$store.commit('set_active_index', to.path)

                        break
                    }
                }
                if (!flag) {
                    this.index++
                    this.$store.commit('add_tabs', {
                        route: to.path,
                        name: to.name,
                        key:to.name+this.index
                    })
                    
                    this.$store.commit('set_active_index', to.path)
                }
            }
        }
    }

</script>
