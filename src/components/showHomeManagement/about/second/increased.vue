<template>

<div class="increasedHomeBar">
   <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="关于我们" name="first">关于我们</el-tab-pane>
            <el-tab-pane label="相关报道" name="second">相关报道</el-tab-pane>
            <el-tab-pane label="合作伙伴" name="third">合作伙伴</el-tab-pane>
        </el-tabs>
    </div>
  <div>    
    <div class="img-name">
      <el-form label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
        <el-form-item class="ml" label="名称：" prop="name">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item class="ml" label="排序：" prop="sort">
          <el-input v-model="formLabelAlign.sort"></el-input>
        </el-form-item>
        <el-form-item class="ml" label="编辑内容：" prop="desc">
    <el-input type="textarea" :rows="5" v-model="formLabelAlign.desc"></el-input>
  </el-form-item>
        <el-form-item class="ml" label="图片："  prop="url">
         <div class="img-file">
          <el-upload action="/api/api/v1/admin/banner/firstPageBannerImages" :headers='headers' list-type="picture" :on-error="handleError" :on-remove="handleRemove" :limit="1" :on-success="handleSuccess" style="margin-top:10px">
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
          <el-input class="hidden" v-model="formLabelAlign.url"></el-input>
    </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="btns">
         <el-button type="success" @click="onBtnPreserveClick('formLabelAlign')">保存</el-button>
          <el-button type="danger" @click="onBtnDetailClick()">取消</el-button>
    </div>
  </div>
</div>
</template>
<script>
    import API from '@/api/api'
    import E from 'wangeditor'
    export default {
        data() {
            return {
                formLabelAlign: {
                    name: '',
                    sort: '',
                    url: '',
                    desc: ''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                authorization: '',
                rules: {
                    name: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }],
                    sort: [{
                        required: true,
                        message: '请输入排序',
                        trigger: 'blur'
                    }],
                    url: [{
                        required: true,
                        message: '请上传图片',
                        trigger: 'change'
                    }],
                    desc: [{
                        required: true,
                        message: '请输入编辑内容',
                        trigger: 'blur'
                    }]
                },
                activeName: 'second',
            }
        },
        created() {
            let data = JSON.parse(window.sessionStorage.getItem('access-user'));
            this.authorization = data.authorization;
        },
        methods: {
            handleRemove(file, fileList) {
                this.formLabelAlign.url = ''
            },
            handleSuccess(res) {
                console.log(res)
                this.dialogImageUrl = res.data
                this.formLabelAlign.url = res.data
            },
            handleError() {
                this.$message.error({
                    showClose: true,
                    message: '上传失败',
                    duration: 2000
                });
            },
            onBtnDetailClick() {
                this.$router.push({
                    path: `/showHomeManagement/about`
                });
            },
            onBtnPreserveClick(formLabelAlign) {
                this.$refs[formLabelAlign].validate((valid) => {
                    if (valid) {
                        let vm = this
                        let parameter = 'content=' + this.formLabelAlign.name + '&imageUrl=' + this.dialogImageUrl + '&state='+this.formLabelAlign.desc+'&sort=' + this.formLabelAlign.sort
                        API.incresReport(parameter).then(function(result) {
                            console.log(result)
                            if (result.data.code == 201) {
                                vm.$message.success({
                                    message: '新增成功',
                                    showClose: true,
                                    duration: 2000
                                });
                                vm.$router.push({
                                    path: `/showHomeManagement/about`
                                });
                            }
                        }, function error() {
                            vm.$message.error({
                                message: '新增失败',
                                showClose: true,
                                duration: 2000
                            });
                        })
                    } else {
                        return false;
                    }
                });
            },
            handleClick(tab, event) {
                console.log(tab);
                sessionStorage.setItem('wz', this.activeName)
                if (tab.name == 'first') {
                    this.$router.push({
                        path: `/showHomeManagement/increasedAboutFirst`
                    });
                } else if (tab.name == 'second') {
                    this.$router.push({
                        path: `/showHomeManagement/increasedAboutSecond`
                    });
                } else if (tab.name == 'third') {
                    this.$router.push({
                        path: `/showHomeManagement/increasedAboutThird`
                    });
                }
            },
        },
        computed: {
            headers() {
                return {
                    authorization: this.authorization
                }
            }
        }
    }

</script>
<style lang="scss">
    .increasedHomeBar {
        .el-tabs__item {
            margin-bottom: 2px;
        }
        .el-tabs .el-tabs__header .el-tabs__item.is-active {
            background-color: #fff;
            color: #000;
        }
        .grid-content {
            color: #556191;
        }
        .img-name {
            margin-top: 50px;
            .el-form-item__label {
                margin-top: 12px;
                width: 93px !important;
            }
            .el-form-item:nth-child(3) .el-form-item__label {
                margin-top: 0;
            }
            .el-input {
                width: 350px;
                .el-input__inner {
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    border-radius: 0;
                }
            }
            .el-textarea {
                width: 350px;
                .el-textarea__inner {
                    width: 98%;
                }
            }
            .ml {
                .hidden {
                    display: none;
                }
                .el-form-item__error {
                    margin-left: 15px;
                }
            }

        }
        .img-file {
            .el-upload-list li {
                border: none;
                height: auto;
                img {
                    width: auto;
                    height: auto;
                    max-width: 67%;
                }
                .el-upload-list__item-name {
                    display: none;
                }
            }
        }
        .btns {
            margin-top: 150px;
            margin-left: 25px;
            .el-button+.el-button {
                margin-left: 200px;
            }
        }
    }

</style>
