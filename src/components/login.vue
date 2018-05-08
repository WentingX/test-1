<template>
<el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
  <img class="logo" src="/src/assets/logo.png" alt="">
  <h2 class="title">看门狗后台管理系统</h2>

  <el-form-item prop="username">
    <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input type="password" v-model="account.password" auto-complete="off" placeholder="密码"></el-input>
  </el-form-item>
  <el-form-item style="width:100%;">
    <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
  </el-form-item>
</el-form>
</template>

<script>
    import API from '../api/api'
    import axios from 'axios'
    import MenuUtils from '@/utils/MenuUtils'
    var routers = []
    export default {
        data() {
            return {
                loading: false,
                account: {
                    username: '1001',
                    password: '123456'
                },
                rules: {
                    username: [{
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                        //{ validator: validaePass }
                    ],
                    password: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleLogin() {
                let that = this;
                this.$refs.AccountFrom.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let loginParams = {
                            username: this.account.username,
                            password: this.account.password
                        };
                        API.login(loginParams).then(function(result) {
                                let user = {
                                    userid: result.headers.userid,
                                    authorization: result.headers.authorization
                                }
                                if (result.data.code == 200) {
                                    sessionStorage.setItem('access-user', JSON.stringify(user))
                                    axios.get('/api/api/v1/admin/sys/user/isLogin', {
                                            headers: {
                                                Authorization: result.headers.authorization
                                            }
                                        })
                                        .then(function(response) {
                                            if (response.data.code == 200) {
                                                that.loading = false;
                                                console.log(response)
                                                var data = [];
                                                if (response.data.data.menu != null) {
                                                    response.data.data.menu.forEach((item) => {
                                                        if (item.type != '0') {
                                                            item.leaf = true
                                                        } else {
                                                            item.leaf = false
                                                        }
                                                        if (item.children != null) {
                                                            item.children.forEach((it) => {
                                                                if (it.type != '1') {
                                                                    it.leaf = true
                                                                } else {
                                                                    it.leaf = false
                                                                }
                                                                it.name = it.title
                                                            })
                                                        }
                                                        item.name = item.title
                                                        data.push(item)
                                                        sessionStorage.setItem('menu', JSON.stringify(data));
                                                    })
                                                }

                                                sessionStorage.setItem('user', JSON.stringify(response.data.data.user))
                                                MenuUtils(routers, JSON.parse(window.sessionStorage.getItem('menu')))
                                                that.$router.addRoutes(routers)
                                                that.$router.push({
                                                    path: '/'
                                                });
                                            } else {
                                                that.loading = false;
                                                that.$message.error({
                                                    showClose: true,
                                                    message: '登录失败',
                                                    duration: 2000
                                                });
                                            }
                                        }, function(error) {
                                            that.loading = false;
                                            that.$message.error({
                                                showClose: true,
                                                message: '登录失败',
                                                duration: 2000
                                            });
                                        });
                                }
                            },
                            function(err) {
                                that.loading = false;
                                that.$message.error({
                                    showClose: true,
                                    message: '登录失败',
                                    duration: 2000
                                });
                            }).catch(function(error) {
                            that.loading = false;
                            that.$message.error({
                                showClose: true,
                                message: '请求出现异常',
                                duration: 2000
                            });
                        });
                    }
                });
            },
        }
    }

</script>
<style>
    /*
    body {
        background: url(/src/assets/bg.png) !important;
    }
*/

</style>
<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 160px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        background: -ms-linear-gradient(top, #ace, #00C1DE);
        /* IE 10 */
        background: -moz-linear-gradient(top, #ace, #00C1DE);
        /*火狐*/
        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE));
        /*谷歌*/
        background: -webkit-linear-gradient(top, #ace, #00C1DE);
        /*Safari5.1 Chrome 10+*/
        background: -o-linear-gradient(top, #ace, #00C1DE);
        /*Opera 11.10+*/
        position: relative;
        .title {
            margin: 0 auto 40px;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0 0 35px;
        }
        .logo {
            position: absolute;
            left: 60px;
            top: 28px;
        }

    }

</style>
